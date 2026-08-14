export type CropType = 'Paddy' | 'Cotton' | 'Groundnut' | 'Sugarcane' | 'Maize' | 'Vegetables';

export type RiskEventType = 'Drought' | 'Flood' | 'Extreme Rainfall' | 'Heatwave' | 'Normal';

export type EventSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  address: string;
  district: string;
  state: string;
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  bankAccountMasked: string;
  ifscMasked: string;
  upiIdMasked: string;
  identityVerified: boolean;
  farmVerified: boolean;
}

export interface Farm {
  id: string;
  farmerId: string;
  name: string;
  cropType: CropType;
  sizeAcres: number;
  location: LocationCoordinates;
  boundaryPolygon: [number, number][];
  sensorId: string;
  healthScore: number;
  establishedDate: string;
}

export interface WeatherReading {
  timestamp: string;
  temperature: number; // °C
  rainfall: number; // mm
  humidity: number; // %
  windSpeed: number; // km/h
  pressure: number; // hPa
  forecast7Days: { day: string; rainfall: number; tempMax: number; tempMin: number }[];
}

export interface IoTReading {
  timestamp: string;
  soilMoisture: number; // %
  waterLevel: number; // cm
  fieldTemperature: number; // °C
  sensorStatus: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  batteryLevel: number; // %
  signalStrength: number; // dBm
  lastUpdated: string;
}

export interface SatelliteReading {
  timestamp: string;
  ndvi: number; // 0.00 - 1.00
  ndviStatus: 'EXCELLENT' | 'HEALTHY' | 'STRESSED' | 'CRITICAL';
  historicalNDVI: { date: string; value: number }[];
  changePercentage: number;
  cloudCoverPercentage: number;
  resolutionMeters: number;
}

export interface RiskContribution {
  factor: string;
  weight: number; // percentage e.g. 35
  value: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface AIRiskAssessment {
  score: number; // 0 - 100
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  primaryRisk: RiskEventType;
  confidence: number; // percentage e.g. 94
  trend: 'UP' | 'DOWN' | 'STABLE';
  droughtRisk: number;
  floodRisk: number;
  heatRisk: number;
  cropStressRisk: number;
  contributions: RiskContribution[];
  crossSourceValidation: {
    weatherSignal: string;
    iotSignal: string;
    satelliteSignal: string;
    aiAgreementScore: number;
  };
  lastEvaluated: string;
}

export interface ParametricThreshold {
  maxRainfallMm?: number;
  minRainfallMm?: number;
  minSoilMoisturePercentage?: number;
  maxWaterLevelCm?: number;
  maxNDVIDeclinePercentage?: number;
  maxTemperatureCelsius?: number;
  minDurationDays: number;
}

export interface Policy {
  id: string;
  farmerId: string;
  farmId: string;
  cropType: CropType;
  coverageAmount: number; // ₹
  premiumAmount: number; // ₹
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'PENDING' | 'EXPIRED' | 'CLAIMED';
  coveredRisks: RiskEventType[];
  thresholds: ParametricThreshold;
}

export interface ParametricTrigger {
  id: string;
  policyId: string;
  farmId: string;
  farmerId: string;
  eventType: RiskEventType;
  severity: EventSeverity;
  confidence: number;
  detectedAt: string;
  conditionsChecklist: { condition: string; met: boolean; detail: string }[];
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
}

export interface Payout {
  id: string;
  triggerId: string;
  policyId: string;
  farmerId: string;
  farmName: string;
  coverageAmount: number;
  severityPercentage: number;
  calculatedPayout: number;
  status: 'SIMULATED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  paymentMethod: 'Sandbox UPI' | 'Direct Bank Transfer';
  transactionId: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  severity: 'INFO' | 'WARNING' | 'ALERT' | 'SUCCESS';
  timestamp: string;
  read: boolean;
  channel: 'SMS' | 'IVR' | 'IN_APP';
}

export interface AuditBlock {
  blockNumber: number;
  blockHash: string;
  previousHash: string;
  timestamp: string;
  eventType: string;
  payload: {
    policyId?: string;
    triggerId?: string;
    payoutId?: string;
    farmerName?: string;
    amount?: number;
    riskScore?: number;
    details: string;
  };
  verifiedStatus: 'VERIFIED_IMMUTABLE';
}

export interface ClusterFarmData {
  id: string;
  farmerName: string;
  farmName: string;
  district: string;
  lat: number;
  lng: number;
  crop: CropType;
  acres: number;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PROTECTED' | 'WARNING' | 'TRIGGERED';
  soilMoisture: number;
  ndvi: number;
}
