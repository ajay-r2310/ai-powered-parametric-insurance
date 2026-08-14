import { WeatherReading, IoTReading, SatelliteReading, AIRiskAssessment, RiskEventType } from '../../types';

export const calculateAIRisk = (
  weather: WeatherReading,
  iot: IoTReading,
  satellite: SatelliteReading
): AIRiskAssessment => {
  // 1. Rainfall deficit / surplus calculation
  // Baseline healthy paddy rainfall: ~40-60mm. Deficit < 15mm, Extreme > 100mm
  let rainfallScore = 0;
  if (weather.rainfall < 15) {
    rainfallScore = Math.min(100, Math.round(((15 - weather.rainfall) / 15) * 100));
  } else if (weather.rainfall > 80) {
    rainfallScore = Math.min(100, Math.round(((weather.rainfall - 80) / 70) * 100));
  }

  // 2. Soil moisture risk calculation (Optimal 35-50%, Critical < 20%)
  let soilMoistureScore = 0;
  if (iot.soilMoisture < 35) {
    soilMoistureScore = Math.min(100, Math.round(((35 - iot.soilMoisture) / 25) * 100));
  } else if (iot.soilMoisture > 65) {
    soilMoistureScore = Math.min(100, Math.round(((iot.soilMoisture - 65) / 25) * 100));
  }

  // 3. NDVI Vegetation decline (Healthy > 0.70, Stressed < 0.60)
  let ndviScore = 0;
  if (satellite.ndvi < 0.70) {
    ndviScore = Math.min(100, Math.round(((0.70 - satellite.ndvi) / 0.35) * 100));
  }

  // 4. Heat stress score (> 35°C)
  let tempScore = 0;
  if (weather.temperature > 35) {
    tempScore = Math.min(100, Math.round(((weather.temperature - 35) / 10) * 100));
  }

  // Weighted composite score calculation
  const compositeScore = Math.min(
    100,
    Math.round(
      rainfallScore * 0.35 +
      soilMoistureScore * 0.30 +
      ndviScore * 0.25 +
      tempScore * 0.10
    )
  );

  // Sub-type risk metrics
  const droughtRisk = Math.min(
    100,
    Math.round(rainfallScore * 0.4 + soilMoistureScore * 0.4 + ndviScore * 0.2)
  );

  const floodRisk = Math.min(
    100,
    Math.round(
      (weather.rainfall > 80 ? (weather.rainfall - 80) * 1.2 : 0) * 0.6 +
      (iot.waterLevel > 40 ? (iot.waterLevel - 40) * 1.5 : 0) * 0.4
    )
  );

  const heatRisk = Math.min(100, Math.round(tempScore * 0.7 + (100 - iot.soilMoisture) * 0.3));
  const cropStressRisk = Math.min(100, Math.round(ndviScore * 0.6 + soilMoistureScore * 0.4));

  // Determine primary risk type
  let primaryRisk: RiskEventType = 'Normal';
  if (compositeScore >= 45) {
    if (droughtRisk >= floodRisk && droughtRisk >= heatRisk) {
      primaryRisk = 'Drought';
    } else if (floodRisk >= droughtRisk && floodRisk >= heatRisk) {
      primaryRisk = 'Flood';
    } else {
      primaryRisk = 'Heatwave';
    }
  }

  // Determine risk level category
  let level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
  if (compositeScore >= 75) level = 'CRITICAL';
  else if (compositeScore >= 50) level = 'HIGH';
  else if (compositeScore >= 30) level = 'MEDIUM';

  // Cross-source agreement confidence score
  const isAllSignalsHigh = rainfallScore > 40 && soilMoistureScore > 40 && ndviScore > 30;
  const isAllSignalsSafe = rainfallScore < 30 && soilMoistureScore < 30 && ndviScore < 30;
  const confidence = isAllSignalsHigh || isAllSignalsSafe ? 94 : 86;

  return {
    score: compositeScore,
    level,
    primaryRisk,
    confidence,
    trend: compositeScore > 40 ? 'UP' : 'DOWN',
    droughtRisk,
    floodRisk,
    heatRisk,
    cropStressRisk,
    contributions: [
      {
        factor: 'Rainfall Deficit',
        weight: 35,
        value: weather.rainfall < 15 ? `Deficit (${weather.rainfall}mm)` : `Normal (${weather.rainfall}mm)`,
        impact: rainfallScore > 50 ? 'HIGH' : rainfallScore > 25 ? 'MEDIUM' : 'LOW',
      },
      {
        factor: 'Soil Moisture',
        weight: 30,
        value: iot.soilMoisture < 25 ? `Depleted (${iot.soilMoisture}%)` : `Adequate (${iot.soilMoisture}%)`,
        impact: soilMoistureScore > 50 ? 'HIGH' : soilMoistureScore > 25 ? 'MEDIUM' : 'LOW',
      },
      {
        factor: 'NDVI Decline',
        weight: 25,
        value: satellite.ndvi < 0.60 ? `Stress (${satellite.ndvi.toFixed(2)})` : `Healthy (${satellite.ndvi.toFixed(2)})`,
        impact: ndviScore > 50 ? 'HIGH' : ndviScore > 25 ? 'MEDIUM' : 'LOW',
      },
      {
        factor: 'Temperature',
        weight: 10,
        value: `${weather.temperature}°C`,
        impact: tempScore > 50 ? 'HIGH' : tempScore > 25 ? 'MEDIUM' : 'LOW',
      },
    ],
    crossSourceValidation: {
      weatherSignal:
        weather.rainfall < 15
          ? `Severe rainfall deficit detected (${weather.rainfall}mm vs 40mm expected)`
          : `Rainfall within safe agricultural thresholds`,
      iotSignal:
        iot.soilMoisture < 25
          ? `Root-zone soil moisture depleted (${iot.soilMoisture}%)`
          : `Soil moisture optimal at root depth (${iot.soilMoisture}%)`,
      satelliteSignal:
        satellite.ndvi < 0.60
          ? `Sentinel-2 canopy greenness declining (NDVI ${satellite.ndvi.toFixed(2)})`
          : `NDVI canopy index stable (NDVI ${satellite.ndvi.toFixed(2)})`,
      aiAgreementScore: confidence,
    },
    lastEvaluated: new Date().toLocaleTimeString(),
  };
};
