import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { MultiSourceVerification } from '../../components/risk/MultiSourceVerification';
import { WeatherChart } from '../../components/charts/WeatherChart';
import { NDVIChart } from '../../components/charts/NDVIChart';
import { TelemetryStreamChart } from '../../components/charts/TelemetryStreamChart';
import { Cpu, Clock, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ClimateIntelligencePage: React.FC = () => {
  const { weather, iot, satellite, aiRisk, activeScenario } = useApp();

  const timelineEvents = [
    { time: '08:30 AM', title: 'OpenWeather Anomaly Detected', desc: `Rainfall reading ${weather.rainfall} mm vs seasonal expectation 40 mm`, type: 'WEATHER' },
    { time: '09:10 AM', title: 'ESP32 Soil Moisture Depletion', desc: `Root-zone soil moisture level down to ${iot.soilMoisture}%`, type: 'IOT' },
    { time: '10:00 AM', title: 'Sentinel-2 Vegetation Stress Confirmed', desc: `Spectral canopy index NDVI ${satellite.ndvi.toFixed(2)} (${satellite.ndviStatus})`, type: 'SATELLITE' },
    { time: '10:15 AM', title: 'AI Fusion Risk Engine Recalculated', desc: `Composite Risk Score calculated at ${aiRisk.score}/100 (${aiRisk.level} RISK)`, type: 'AI' },
    { time: '10:30 AM', title: 'Parametric Policy Threshold Evaluated', desc: 'Condition checklist matched with 94% AI cross-source confidence', type: 'TRIGGER' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-5 h-5 text-purple-400" />
                <h1 className="text-2xl font-extrabold text-white">Farm Climate Intelligence</h1>
              </div>
              <p className="text-xs text-slate-400">
                Unified 3-Source Telemetry: OpenWeather + ESP32 IoT Sensors + Sentinel-2 NDVI Satellite
              </p>
            </div>
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-extrabold px-3 py-1 rounded-full">
              94% AI Signal Fusion
            </span>
          </div>

          <MultiSourceVerification
            weather={weather}
            iot={iot}
            satellite={satellite}
            aiRisk={aiRisk}
          />

          {/* Telemetry Visualizations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="font-bold text-sm text-white mb-3">7-Day Rainfall Forecast</h3>
              <WeatherChart forecast={weather.forecast7Days} />
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="font-bold text-sm text-white mb-3">ESP32 12h Moisture Stream</h3>
              <TelemetryStreamChart moisture={iot.soilMoisture} />
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="font-bold text-sm text-white mb-3">Sentinel-2 NDVI History</h3>
              <NDVIChart data={satellite.historicalNDVI} />
            </div>
          </div>

          {/* Chronological Anomaly Detection Timeline */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" /> Chronological Telemetry Anomaly Timeline
            </h3>

            <div className="space-y-3">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="font-mono text-emerald-400 font-bold w-20 shrink-0 pt-0.5">{evt.time}</span>
                  <div>
                    <h4 className="font-bold text-white mb-0.5">{evt.title}</h4>
                    <p className="text-slate-400">{evt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
