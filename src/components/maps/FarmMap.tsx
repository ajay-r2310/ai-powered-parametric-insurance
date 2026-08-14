import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Farm, IoTReading } from '../../types';
import { Radio, Shield, AlertTriangle } from 'lucide-react';

interface FarmMapProps {
  farm: Farm;
  iot: IoTReading;
  riskScore: number;
}

// Fix default Leaflet icon URLs in React bundler
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 12px ${color};"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

export const FarmMap: React.FC<FarmMapProps> = ({ farm, iot, riskScore }) => {
  const centerLat = farm.location.lat;
  const centerLng = farm.location.lng;

  const polyCoords: [number, number][] = farm.boundaryPolygon;

  let riskColor = '#10B981'; // Green
  if (riskScore >= 75) riskColor = '#EF4444'; // Red
  else if (riskScore >= 45) riskColor = '#F59E0B'; // Amber

  return (
    <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold flex items-center gap-2 text-white">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{farm.name}</span>
        <span className="text-slate-400">({farm.sizeAcres} Acres)</span>
      </div>

      <div className="absolute top-3 right-3 z-[1000] bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2">
        <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span>Node: {farm.sensorId}</span>
      </div>

      <MapContainer
        center={[centerLat, centerLng]}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* Dark Mode Esri World Imagery Satellite Tiles */}
        <TileLayer
          attribution="&copy; Esri, Maxar, Earthstar Geographics"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Farm Boundary Polygon */}
        <Polygon
          positions={polyCoords}
          pathOptions={{
            color: riskColor,
            fillColor: riskColor,
            fillOpacity: 0.3,
            weight: 3,
            dashArray: '6, 6',
          }}
        />

        {/* ESP32 Sensor Marker */}
        <Marker position={[centerLat, centerLng]} icon={createCustomIcon(riskColor)}>
          <Popup>
            <div className="text-xs text-slate-900 font-sans p-1">
              <p className="font-bold">{farm.name}</p>
              <p>Soil Moisture: {iot.soilMoisture}%</p>
              <p>Status: {iot.sensorStatus}</p>
              <p className="font-semibold text-emerald-700">Risk Score: {riskScore}/100</p>
            </div>
          </Popup>
        </Marker>

        {/* Risk Heatmap Radius Circle */}
        <Circle
          center={[centerLat, centerLng]}
          radius={300}
          pathOptions={{
            color: riskColor,
            fillColor: riskColor,
            fillOpacity: 0.15,
          }}
        />
      </MapContainer>
    </div>
  );
};
