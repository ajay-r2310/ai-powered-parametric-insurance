import { Policy, WeatherReading, IoTReading, SatelliteReading, ParametricTrigger, Payout, RiskEventType, EventSeverity } from '../../types';

export interface EvaluationResult {
  triggered: boolean;
  trigger?: ParametricTrigger;
  payout?: Payout;
}

export const evaluateParametricPolicy = (
  policy: Policy,
  weather: WeatherReading,
  iot: IoTReading,
  satellite: SatelliteReading,
  farmerName: string,
  farmName: string
): EvaluationResult => {
  const { thresholds } = policy;

  // Drought trigger condition check
  const isDroughtRainfallMet = weather.rainfall < (thresholds.minRainfallMm ?? 15);
  const isDroughtSoilMet = iot.soilMoisture < (thresholds.minSoilMoisturePercentage ?? 25);
  const isDroughtNDVIMet = satellite.ndvi < 0.62;

  // Flood trigger condition check
  const isFloodRainfallMet = weather.rainfall > 90;
  const isFloodWaterMet = iot.waterLevel > (thresholds.maxWaterLevelCm ?? 50);

  // Heatwave trigger condition check
  const isHeatMet = weather.temperature > (thresholds.maxTemperatureCelsius ?? 36);

  let eventType: RiskEventType = 'Normal';
  let severity: EventSeverity = 'Low';
  let conditions: { condition: string; met: boolean; detail: string }[] = [];
  let isTriggered = false;

  if (isDroughtRainfallMet && isDroughtSoilMet && isDroughtNDVIMet) {
    eventType = 'Drought';
    isTriggered = true;
    severity = iot.soilMoisture < 15 ? 'Critical' : 'High';
    conditions = [
      { condition: 'Rainfall Below Threshold', met: true, detail: `${weather.rainfall} mm < ${thresholds.minRainfallMm ?? 15} mm` },
      { condition: 'Soil Moisture Depleted', met: true, detail: `${iot.soilMoisture}% < ${thresholds.minSoilMoisturePercentage ?? 25}%` },
      { condition: 'NDVI Vegetation Stress', met: true, detail: `NDVI ${satellite.ndvi.toFixed(2)} < 0.62` },
      { condition: 'Event Duration Requirement', met: true, detail: `Sustained anomaly for ${thresholds.minDurationDays} consecutive days` },
    ];
  } else if (isFloodRainfallMet && isFloodWaterMet) {
    eventType = 'Flood';
    isTriggered = true;
    severity = weather.rainfall > 120 ? 'Critical' : 'High';
    conditions = [
      { condition: 'Extreme Rainfall Threshold Crossed', met: true, detail: `${weather.rainfall} mm > 90 mm` },
      { condition: 'Field Water Level Exceeded', met: true, detail: `${iot.waterLevel} cm > ${thresholds.maxWaterLevelCm ?? 50} cm` },
      { condition: 'Sensor Submersion Risk', met: true, detail: `Water level elevated in paddy field` },
    ];
  } else if (isHeatMet && isDroughtSoilMet) {
    eventType = 'Heatwave';
    isTriggered = true;
    severity = weather.temperature > 39 ? 'Critical' : 'Medium';
    conditions = [
      { condition: 'Extreme Thermal Stress', met: true, detail: `${weather.temperature}°C > ${thresholds.maxTemperatureCelsius ?? 36}°C` },
      { condition: 'Soil Transpiration Loss', met: true, detail: `${iot.soilMoisture}% < ${thresholds.minSoilMoisturePercentage ?? 25}%` },
    ];
  }

  if (!isTriggered) {
    return { triggered: false };
  }

  const triggerId = `TRIG-${Date.now().toString().slice(-6)}`;
  const payoutId = `PAY-${Date.now().toString().slice(-6)}`;

  // Severity percentage mapping for payout calculation
  const severityPercentage = severity === 'Critical' ? 40 : severity === 'High' ? 25 : 15;
  const calculatedPayout = Math.round(policy.coverageAmount * (severityPercentage / 100));

  const trigger: ParametricTrigger = {
    id: triggerId,
    policyId: policy.id,
    farmId: policy.farmId,
    farmerId: policy.farmerId,
    eventType,
    severity,
    confidence: 94,
    detectedAt: new Date().toISOString(),
    conditionsChecklist: conditions,
    status: 'VERIFIED',
  };

  const payout: Payout = {
    id: payoutId,
    triggerId,
    policyId: policy.id,
    farmerId: policy.farmerId,
    farmName,
    coverageAmount: policy.coverageAmount,
    severityPercentage,
    calculatedPayout,
    status: 'SIMULATED',
    paymentMethod: 'Sandbox UPI',
    transactionId: `UPI-SANDBOX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    timestamp: new Date().toISOString(),
  };

  return {
    triggered: true,
    trigger,
    payout,
  };
};
