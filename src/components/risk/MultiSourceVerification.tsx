import React, { useState } from 'react';
import { CloudRain, Radio, Satellite, ShieldCheck, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { AIRiskAssessment, WeatherReading, IoTReading, SatelliteReading } from '../../types';

interface MultiSourceVerificationProps {
  weather: WeatherReading;
  iot: IoTReading;
  satellite: SatelliteReading;
  aiRisk: AIRiskAssessment;
}

export const MultiSourceVerification: React.FC<MultiSourceVerificationProps> = ({
  weather,
  iot,
  satellite,
  aiRisk,
}) => {
  const [activeTab, setActiveTab] = useState<'WEATHER' | 'IOT' | 'SATELLITE' | 'AI'>('AI');

  const { crossSourceValidation } = aiRisk;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">Multi-Source Cross-Source Intelligence</h3>
          </div>
          <p className="text-xs text-slate-400">
            "One signal can be wrong. Three independent signals create unshakeable confidence."
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400">AI Confidence:</span>
          <span className="font-extrabold text-emerald-400 text-sm">{aiRisk.confidence}%</span>
        </div>
      </div>

      {/* 3-Source Flowchart Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {/* Source 1: Weather */}
        <div
          onClick={() => setActiveTab('WEATHER')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'WEATHER'
              ? 'bg-blue-950/30 border-blue-500 text-white shadow-lg'
              : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <CloudRain className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-blue-400">Signal #1</span>
          </div>
          <h4 className="font-bold text-xs text-white mb-1">Weather Telemetry</h4>
          <p className="text-[11px] text-slate-400 leading-tight">
            Rainfall: {weather.rainfall} mm | {weather.temperature}°C
          </p>
        </div>

        {/* Source 2: IoT Field Sensors */}
        <div
          onClick={() => setActiveTab('IOT')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'IOT'
              ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-lg'
              : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-emerald-400">Signal #2</span>
          </div>
          <h4 className="font-bold text-xs text-white mb-1">ESP32 IoT Node</h4>
          <p className="text-[11px] text-slate-400 leading-tight">
            Soil Moisture: {iot.soilMoisture}% | Status: {iot.sensorStatus}
          </p>
        </div>

        {/* Source 3: Sentinel-2 Satellite */}
        <div
          onClick={() => setActiveTab('SATELLITE')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'SATELLITE'
              ? 'bg-purple-950/30 border-purple-500 text-white shadow-lg'
              : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Satellite className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-purple-400">Signal #3</span>
          </div>
          <h4 className="font-bold text-xs text-white mb-1">Sentinel Satellite</h4>
          <p className="text-[11px] text-slate-400 leading-tight">
            NDVI: {satellite.ndvi.toFixed(2)} ({satellite.ndviStatus})
          </p>
        </div>

        {/* Cross Validation Output */}
        <div
          onClick={() => setActiveTab('AI')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'AI'
              ? 'bg-amber-950/30 border-amber-500 text-white shadow-lg'
              : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-400">Result</span>
          </div>
          <h4 className="font-bold text-xs text-white mb-1">AI Fusion Engine</h4>
          <p className="text-[11px] text-amber-300 font-semibold leading-tight">
            {aiRisk.primaryRisk} Risk ({aiRisk.score}/100)
          </p>
        </div>
      </div>

      {/* Detail Inspector Box */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Cross-Source Signal Verification Analysis
        </h4>

        <div className="space-y-2 text-slate-300">
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold w-24 shrink-0">OpenWeather:</span>
            <span>{crossSourceValidation.weatherSignal}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold w-24 shrink-0">ESP32 IoT:</span>
            <span>{crossSourceValidation.iotSignal}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-400 font-bold w-24 shrink-0">Sentinel-2:</span>
            <span>{crossSourceValidation.satelliteSignal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
