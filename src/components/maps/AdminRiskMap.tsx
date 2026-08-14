import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { ClusterFarmData } from '../../types';

interface AdminRiskMapProps {
  clusters: ClusterFarmData[];
  onSelectCluster?: (cluster: ClusterFarmData) => void;
}

const getClusterIcon = (status: string) => {
  let color = '#10B981';
  if (status === 'TRIGGERED') color = '#EF4444';
  else if (status === 'WARNING') color = '#F59E0B';

  return L.divIcon({
    className: 'custom-admin-marker',
    html: `<div style="background-color: ${color}; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 16px ${color}; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: black;"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
};

export const AdminRiskMap: React.FC<AdminRiskMapProps> = ({ clusters, onSelectCluster }) => {
  // Center around Tamil Nadu agriculture belt
  const centerLat = 10.8;
  const centerLng = 78.8;

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      <div className="absolute top-3 left-3 z-[1000] bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-semibold flex items-center gap-3 text-white">
        <span className="text-emerald-400 font-extrabold">Tamil Nadu Live Agritech Operations</span>
        <span className="text-slate-400">({clusters.length} Monitored Clusters)</span>
      </div>

      <MapContainer
        center={[centerLat, centerLng]}
        zoom={8}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; Esri, Earthstar Geographics"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {clusters.map((c) => {
          let circleColor = '#10B981';
          if (c.status === 'TRIGGERED') circleColor = '#EF4444';
          else if (c.status === 'WARNING') circleColor = '#F59E0B';

          return (
            <React.Fragment key={c.id}>
              <Circle
                center={[c.lat, c.lng]}
                radius={15000}
                pathOptions={{
                  color: circleColor,
                  fillColor: circleColor,
                  fillOpacity: 0.25,
                }}
              />
              <Marker
                position={[c.lat, c.lng]}
                icon={getClusterIcon(c.status)}
                eventHandlers={{
                  click: () => onSelectCluster && onSelectCluster(c),
                }}
              >
                <Popup>
                  <div className="text-xs text-slate-900 font-sans p-1">
                    <p className="font-bold">{c.farmName}</p>
                    <p>District: {c.district}</p>
                    <p>Farmer: {c.farmerName}</p>
                    <p>Crop: {c.crop} ({c.acres} Acres)</p>
                    <p className="font-extrabold text-amber-700">Risk Score: {c.riskScore}/100</p>
                    <p className="font-semibold text-emerald-800">Status: {c.status}</p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};
