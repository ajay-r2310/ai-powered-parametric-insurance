import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Farmer,
  Farm,
  WeatherReading,
  IoTReading,
  SatelliteReading,
  AIRiskAssessment,
  Policy,
  ParametricTrigger,
  Payout,
  Notification,
  AuditBlock,
  RiskEventType,
  EventSeverity,
  ClusterFarmData,
} from '../types';

import {
  DEMO_FARMER,
  DEMO_FARM,
  INITIAL_WEATHER,
  INITIAL_IOT,
  INITIAL_SATELLITE,
  INITIAL_AI_RISK,
  DEMO_POLICY,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  ADMIN_FARM_CLUSTERS,
} from '../data/demo';

import { calculateAIRisk } from '../services/risk/riskEngine';
import { evaluateParametricPolicy } from '../services/payout/payoutEngine';
import { createAuditBlock } from '../services/blockchain/blockchainService';
import { createNotification } from '../services/notifications/notificationService';

interface AppContextType {
  farmer: Farmer;
  farm: Farm;
  weather: WeatherReading;
  iot: IoTReading;
  satellite: SatelliteReading;
  aiRisk: AIRiskAssessment;
  policy: Policy;
  triggers: ParametricTrigger[];
  payouts: Payout[];
  notifications: Notification[];
  auditLogs: AuditBlock[];
  adminClusters: ClusterFarmData[];
  isDemoMode: boolean;
  activeScenario: RiskEventType;
  activeSeverity: EventSeverity;

  // Actions
  runSimulation: (eventType: RiskEventType, severity: EventSeverity) => void;
  resetSimulation: () => void;
  executePayoutSimulation: (payoutId: string) => Promise<void>;
  markNotificationRead: (id: string) => void;
  updatePolicy: (updated: Partial<Policy>) => void;
  updateFarmer: (updated: Partial<Farmer>) => void;
  updateFarm: (updated: Partial<Farm>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmer, setFarmer] = useState<Farmer>(DEMO_FARMER);
  const [farm, setFarm] = useState<Farm>(DEMO_FARM);
  const [weather, setWeather] = useState<WeatherReading>(INITIAL_WEATHER);
  const [iot, setIot] = useState<IoTReading>(INITIAL_IOT);
  const [satellite, setSatellite] = useState<SatelliteReading>(INITIAL_SATELLITE);
  const [aiRisk, setAiRisk] = useState<AIRiskAssessment>(INITIAL_AI_RISK);
  const [policy, setPolicy] = useState<Policy>(DEMO_POLICY);
  const [triggers, setTriggers] = useState<ParametricTrigger[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditBlock[]>(INITIAL_AUDIT_LOGS);
  const [adminClusters, setAdminClusters] = useState<ClusterFarmData[]>(ADMIN_FARM_CLUSTERS);

  const [activeScenario, setActiveScenario] = useState<RiskEventType>('Normal');
  const [activeSeverity, setActiveSeverity] = useState<EventSeverity>('Low');
  const [isDemoMode] = useState<boolean>(true);

  // Recalculate AI Risk whenever telemetry changes
  useEffect(() => {
    const newRisk = calculateAIRisk(weather, iot, satellite);
    setAiRisk(newRisk);
  }, [weather, iot, satellite]);

  // Master Simulation Dispatcher
  const runSimulation = (eventType: RiskEventType, severity: EventSeverity) => {
    setActiveScenario(eventType);
    setActiveSeverity(severity);

    let newWeather = { ...weather };
    let newIot = { ...iot };
    let newSatellite = { ...satellite };

    if (eventType === 'Drought') {
      const rainfallVal = severity === 'Critical' ? 2 : severity === 'High' ? 8 : 14;
      const soilVal = severity === 'Critical' ? 12 : severity === 'High' ? 18 : 24;
      const ndviVal = severity === 'Critical' ? 0.48 : severity === 'High' ? 0.59 : 0.64;

      newWeather.rainfall = rainfallVal;
      newWeather.temperature = 37.8;
      newIot.soilMoisture = soilVal;
      newIot.waterLevel = 4;
      newSatellite.ndvi = ndviVal;
      newSatellite.ndviStatus = ndviVal < 0.50 ? 'CRITICAL' : 'STRESSED';
    } else if (eventType === 'Flood') {
      const rainfallVal = severity === 'Critical' ? 140 : severity === 'High' ? 98 : 75;
      const waterVal = severity === 'Critical' ? 85 : severity === 'High' ? 62 : 45;

      newWeather.rainfall = rainfallVal;
      newWeather.humidity = 95;
      newIot.waterLevel = waterVal;
      newIot.soilMoisture = 98;
      newSatellite.cloudCoverPercentage = 45;
    } else if (eventType === 'Heatwave') {
      const tempVal = severity === 'Critical' ? 41.5 : severity === 'High' ? 38.8 : 36.5;

      newWeather.temperature = tempVal;
      newWeather.humidity = 40;
      newIot.fieldTemperature = tempVal - 2;
      newIot.soilMoisture = 22;
    } else {
      // Normal scenario
      newWeather = { ...INITIAL_WEATHER };
      newIot = { ...INITIAL_IOT };
      newSatellite = { ...INITIAL_SATELLITE };
    }

    setWeather(newWeather);
    setIot(newIot);
    setSatellite(newSatellite);

    // Compute updated risk
    const updatedRisk = calculateAIRisk(newWeather, newIot, newSatellite);
    setAiRisk(updatedRisk);

    // Evaluate Parametric Policy
    const evalResult = evaluateParametricPolicy(
      policy,
      newWeather,
      newIot,
      newSatellite,
      farmer.name,
      farm.name
    );

    if (evalResult.triggered && evalResult.trigger && evalResult.payout) {
      setTriggers((prev) => [evalResult.trigger!, ...prev]);
      setPayouts((prev) => [evalResult.payout!, ...prev]);

      // Push Notification
      const notif = createNotification(
        `⚠ ${eventType.toUpperCase()} EVENT DETECTED`,
        `Parametric threshold crossed for ${farm.name}. Eligible payout ₹${evalResult.payout.calculatedPayout.toLocaleString('en-IN')}`,
        'ALERT',
        'IN_APP'
      );
      setNotifications((prev) => [notif, ...prev]);

      // Mint Blockchain Audit Block
      const lastBlock = auditLogs[0];
      const newBlock = createAuditBlock(lastBlock, 'PARAMETRIC_TRIGGER_VERIFIED', {
        policyId: policy.id,
        triggerId: evalResult.trigger.id,
        payoutId: evalResult.payout.id,
        farmerName: farmer.name,
        amount: evalResult.payout.calculatedPayout,
        riskScore: updatedRisk.score,
        details: `${eventType} trigger verified. Condition checklist passed with ${updatedRisk.confidence}% AI confidence.`,
      });
      setAuditLogs((prev) => [newBlock, ...prev]);
    }

    // Update Admin Clusters view for demo responsiveness
    setAdminClusters((prev) =>
      prev.map((c) => {
        if (c.id === 'FARM-THJ-01') {
          return {
            ...c,
            riskScore: updatedRisk.score,
            riskLevel: updatedRisk.level,
            status: evalResult.triggered ? 'TRIGGERED' : updatedRisk.score > 40 ? 'WARNING' : 'PROTECTED',
            soilMoisture: newIot.soilMoisture,
            ndvi: newSatellite.ndvi,
          };
        }
        return c;
      })
    );
  };

  const resetSimulation = () => {
    runSimulation('Normal', 'Low');
    setTriggers([]);
    setPayouts([]);
  };

  const executePayoutSimulation = async (payoutId: string) => {
    await new Promise((res) => setTimeout(res, 1200));

    setPayouts((prev) =>
      prev.map((p) => (p.id === payoutId ? { ...p, status: 'COMPLETED' } : p))
    );

    const targetPayout = payouts.find((p) => p.id === payoutId);
    if (targetPayout) {
      // Create notification
      const notif = createNotification(
        '₹' + targetPayout.calculatedPayout.toLocaleString('en-IN') + ' Simulated UPI Payout Sent',
        `Transaction ID: ${targetPayout.transactionId}. Funds credited to ${farmer.name} (${farmer.upiIdMasked}).`,
        'SUCCESS',
        'SMS'
      );
      setNotifications((prev) => [notif, ...prev]);

      // Create Blockchain Audit Block
      const lastBlock = auditLogs[0];
      const newBlock = createAuditBlock(lastBlock, 'PAYOUT_EXECUTED_SANDBOX', {
        payoutId: targetPayout.id,
        farmerName: farmer.name,
        amount: targetPayout.calculatedPayout,
        details: `Simulated UPI Payout executed successfully via Tx ${targetPayout.transactionId}`,
      });
      setAuditLogs((prev) => [newBlock, ...prev]);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const updatePolicy = (updated: Partial<Policy>) => {
    setPolicy((prev) => ({ ...prev, ...updated }));
  };

  const updateFarmer = (updated: Partial<Farmer>) => {
    setFarmer((prev) => ({ ...prev, ...updated }));
  };

  const updateFarm = (updated: Partial<Farm>) => {
    setFarm((prev) => ({ ...prev, ...updated }));
  };

  return (
    <AppContext.Provider
      value={{
        farmer,
        farm,
        weather,
        iot,
        satellite,
        aiRisk,
        policy,
        triggers,
        payouts,
        notifications,
        auditLogs,
        adminClusters,
        isDemoMode,
        activeScenario,
        activeSeverity,
        runSimulation,
        resetSimulation,
        executePayoutSimulation,
        markNotificationRead,
        updatePolicy,
        updateFarmer,
        updateFarm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
