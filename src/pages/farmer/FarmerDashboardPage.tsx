import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CloudRain,
  Radio,
  Satellite,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Calendar,
  CreditCard,
  ChevronRight,
  Activity,
  Droplets,
  Thermometer,
} from 'lucide-react';

import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';

import { FarmMap } from '../../components/maps/FarmMap';
import { GaugeChart } from '../../components/ui/GaugeChart';
import { NDVIChart } from '../../components/charts/NDVIChart';
import { WeatherChart } from '../../components/charts/WeatherChart';
import { TelemetryStreamChart } from '../../components/charts/TelemetryStreamChart';
import { MultiSourceVerification } from '../../components/risk/MultiSourceVerification';
import { PayoutSimulationModal } from '../../components/payout/PayoutSimulationModal';

export const FarmerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    farmer,
    farm,
    weather,
    iot,
    satellite,
    aiRisk,
    policy,
    triggers,
    payouts,
    activeScenario,
  } = useApp();

  const [selectedPayoutModal, setSelectedPayoutModal] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          {/* Header Greeting Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-white">Good morning, {farmer.name.split(' ')[0]}</h1>
                <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  FARM PROTECTED
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>Farm: <strong className="text-slate-200">{farm.name}</strong></span>
                <span>•</span>
                <span>Location: <strong className="text-slate-200">{farm.location.district}, {farm.location.state}</strong></span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/demo')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> Climate Simulator
              </button>
              <button
                onClick={() => navigate('/farmer/policy')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                View Policy
              </button>
            </div>
          </div>

          {/* Alert Callout Banner if Simulation Active */}
          {activeScenario !== 'Normal' && (
            <div className="bg-gradient-to-r from-amber-950 via-rose-950 to-slate-900 border border-amber-500/40 p-4 rounded-2xl flex items-center justify-between shadow-xl animate-pulse">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm text-white">
                    Simulated Climate Anomaly Active: {activeScenario}
                  </h4>
                  <p className="text-xs text-amber-200">
                    Telemetry values & AI risk score updated reactively across all dashboard widgets.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/demo')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg whitespace-nowrap"
              >
                Manage Simulation
              </button>
            </div>
          )}

          {/* 4 Main KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-400 font-semibold">Crop Health</span>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-emerald-400">{farm.healthScore}%</p>
              <p className="text-[10px] text-slate-500 mt-1">Paddy (Cauvery Delta)</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-400 font-semibold">AI Risk Score</span>
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <p className={`text-3xl font-extrabold ${aiRisk.score >= 50 ? 'text-rose-400' : 'text-white'}`}>
                {aiRisk.score} <span className="text-sm font-normal text-slate-400">/ 100</span>
              </p>
              <p className="text-[10px] font-bold text-emerald-400 mt-1 uppercase tracking-wide">
                {aiRisk.level} RISK ({aiRisk.confidence}% CONF.)
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-400 font-semibold">Soil Moisture</span>
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Droplets className="w-4 h-4" />
                </div>
              </div>
              <p className={`text-3xl font-extrabold ${iot.soilMoisture < 25 ? 'text-amber-400' : 'text-cyan-400'}`}>
                {iot.soilMoisture}%
              </p>
              <p className="text-[10px] text-slate-500 mt-1">ESP32 Sensor Stream</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-400 font-semibold">Policy Coverage</span>
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-white">₹{policy.coverageAmount.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-emerald-400 font-bold mt-1">STATUS: ACTIVE</p>
            </div>
          </div>

          {/* Main Farm Map + Weather Panel Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Interactive Farm Boundary & Risk Map
                </h3>
                <span className="text-xs text-slate-400">4.2 Acres Paddy Plot</span>
              </div>
              <FarmMap farm={farm} iot={iot} riskScore={aiRisk.score} />
            </div>

            {/* AI Risk Console Gauge Card */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <h3 className="font-bold text-sm text-white">AI Farm Risk Engine</h3>
                  <span className="text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded">
                    MULTI-FACTOR
                  </span>
                </div>

                <div className="flex justify-center my-2">
                  <GaugeChart score={aiRisk.score} size={170} />
                </div>

                <div className="space-y-2 mt-4 text-xs">
                  {aiRisk.contributions.map((c) => (
                    <div key={c.factor} className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-400">{c.factor} ({c.weight}%):</span>
                      <span className="font-bold text-slate-200">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate('/farmer/climate')}
                className="w-full text-center text-xs font-bold text-emerald-400 hover:underline pt-3 border-t border-slate-800 flex items-center justify-center gap-1"
              >
                Explore Risk Factors <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Telemetry Panels: Weather, IoT ESP32, Satellite NDVI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Weather Panel */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-sm text-white">Weather Telemetry</h3>
                </div>
                <span className="text-xs text-blue-400 font-bold">{weather.temperature}°C</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Rainfall</span>
                  <span className="font-bold text-white text-sm">{weather.rainfall} mm</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Humidity</span>
                  <span className="font-bold text-white text-sm">{weather.humidity}%</span>
                </div>
              </div>

              <WeatherChart forecast={weather.forecast7Days} />
            </div>

            {/* IoT Panel */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-sm text-white">ESP32 IoT Sensor</h3>
                </div>
                <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  {iot.sensorStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Soil Moisture</span>
                  <span className="font-bold text-cyan-400 text-sm">{iot.soilMoisture}%</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Water Level</span>
                  <span className="font-bold text-white text-sm">{iot.waterLevel} cm</span>
                </div>
              </div>

              <TelemetryStreamChart moisture={iot.soilMoisture} />
            </div>

            {/* Satellite Panel */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Satellite className="w-5 h-5 text-purple-400" />
                  <h3 className="font-bold text-sm text-white">Sentinel Satellite</h3>
                </div>
                <span className="text-xs font-bold text-purple-400">NDVI {satellite.ndvi.toFixed(2)}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">Vegetation Health Status:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {satellite.ndviStatus}
                </span>
              </div>

              <NDVIChart data={satellite.historicalNDVI} />
            </div>
          </div>

          {/* Multi-Source Cross Validation Component */}
          <MultiSourceVerification
            weather={weather}
            iot={iot}
            satellite={satellite}
            aiRisk={aiRisk}
          />

          {/* Active Triggers & Payout Section */}
          {payouts.length > 0 && (
            <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Parametric Payout Eligible
                </h3>
                <span className="text-xs font-mono text-slate-400">Demo Payout Engine</span>
              </div>

              {payouts.map((p) => (
                <div key={p.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-white">Eligible Parametric Claim: ₹{p.calculatedPayout.toLocaleString('en-IN')}</h4>
                    <p className="text-xs text-slate-400">
                      Policy Coverage: ₹{p.coverageAmount.toLocaleString('en-IN')} ({p.severityPercentage}% Severity)
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedPayoutModal(p)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow flex items-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" /> Simulate Sandbox Payout
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Payout Simulation Modal */}
      {selectedPayoutModal && (
        <PayoutSimulationModal
          payout={selectedPayoutModal}
          onClose={() => setSelectedPayoutModal(null)}
        />
      )}

      <Footer />
    </div>
  );
};
