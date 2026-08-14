import { IoTReading } from '../../types';

export const fetchIoTTelemetry = async (sensorId: string): Promise<IoTReading> => {
  // Simulating ESP32 telemetry node polling
  await new Promise((res) => setTimeout(res, 150));
  return {
    timestamp: new Date().toISOString(),
    soilMoisture: 42,
    waterLevel: 18,
    fieldTemperature: 29.5,
    sensorStatus: 'ONLINE',
    batteryLevel: 94,
    signalStrength: -68,
    lastUpdated: 'Just now',
  };
};
