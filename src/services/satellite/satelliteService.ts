import { SatelliteReading } from '../../types';

export const fetchSatelliteNDVI = async (lat: number, lng: number): Promise<SatelliteReading> => {
  // Simulating Sentinel-2 satellite imagery analysis
  await new Promise((res) => setTimeout(res, 200));
  return {
    timestamp: new Date().toISOString(),
    ndvi: 0.74,
    ndviStatus: 'HEALTHY',
    historicalNDVI: [
      { date: 'Jul 01', value: 0.81 },
      { date: 'Jul 08', value: 0.80 },
      { date: 'Jul 15', value: 0.79 },
      { date: 'Jul 22', value: 0.78 },
      { date: 'Jul 29', value: 0.76 },
      { date: 'Aug 05', value: 0.75 },
      { date: 'Aug 12', value: 0.74 },
    ],
    changePercentage: -2.6,
    cloudCoverPercentage: 4.2,
    resolutionMeters: 10,
  };
};
