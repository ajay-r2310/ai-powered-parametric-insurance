import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  Sparkles,
  CloudRain,
  Radio,
  Satellite,
  CheckCircle2,
  Lock,
  Activity,
  Layers,
  Zap,
  Clock,
  ChevronRight,
  Cpu,
  BarChart2,
} from 'lucide-react';

import { GaugeChart } from '../../components/ui/GaugeChart';
import { Footer } from '../../components/layout/Footer';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-forest-900 to-slate-950 text-emerald-300 text-xs py-2 px-4 text-center border-b border-emerald-500/20 font-medium">
        <span className="bg-emerald-500 text-slate-950 font-extrabold px-2 py-0.5 rounded text-[10px] uppercase mr-2">
          Hackathon National Demo
        </span>
        Detect climate risk before financial loss. Powered by Weather + IoT + Satellite AI Fusion.
      </div>

      {/* Hero Header Nav */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-forest-900 flex items-center justify-center p-0.5 shadow-lg shadow-emerald-950/50">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-xl text-white tracking-tight">CROPSHIELD</span>
            <span className="font-extrabold text-xl text-emerald-400 tracking-tight ml-1">AI</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Farmer Login
          </button>
          <button
            onClick={() => navigate('/demo')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Explore Live Demo
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5" /> Next-Gen Parametric Crop Insurance
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            AI-Powered Protection <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              For Every Acre.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            CropShield AI combines weather intelligence, ESP32 field sensors, and Sentinel-2 satellite vegetation data to automatically detect climate risks and trigger transparent parametric insurance payouts.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('/onboarding')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-emerald-950/50 transition-all flex items-center gap-2 group"
            >
              Protect My Farm <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> Launch Judge Simulator
            </button>
          </div>

          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs">
            <div>
              <p className="font-extrabold text-white text-lg">0 Days</p>
              <p className="text-slate-400">Claim Approval Wait</p>
            </div>
            <div>
              <p className="font-extrabold text-emerald-400 text-lg">94%+</p>
              <p className="text-slate-400">AI Signal Confidence</p>
            </div>
            <div>
              <p className="font-extrabold text-purple-400 text-lg">100%</p>
              <p className="text-slate-400">Blockchain Auditability</p>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visualization Card */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>

          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold text-xs text-white">Green Valley Estate (4.2 Acres)</span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                ● PROTECTED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block">Crop Health</span>
                <span className="text-xl font-extrabold text-emerald-400">87%</span>
                <span className="text-[9px] text-slate-500 block">Paddy (Thanjavur)</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block">Soil Moisture</span>
                <span className="text-xl font-extrabold text-cyan-400">42%</span>
                <span className="text-[9px] text-slate-500 block">ESP32 Live Stream</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">AI Risk Score</span>
                <span className="text-2xl font-extrabold text-white">21 / 100</span>
                <span className="text-[10px] text-emerald-400 font-bold block">LOW RISK (94% Conf.)</span>
              </div>
              <GaugeChart score={21} size={110} />
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Active Policy Coverage:</span>
              <span className="font-bold text-white">₹75,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — The Problem */}
      <section className="bg-slate-900/60 py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-extrabold text-emerald-400 tracking-wider uppercase">The Problem</h2>
            <h3 className="text-3xl font-extrabold text-white">Why Traditional Crop Insurance Fails Smallholder Farmers</h3>
            <p className="text-slate-400 text-sm">
              Manual inspections, lengthy paperwork, and delayed claim approvals force farmers into severe debt cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Pipeline */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-rose-500/20 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Traditional Insurance Workflow
                </h4>
                <span className="text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded">
                  30 – 90 Days Delay
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                {['Disaster Strikes', 'Manual Loss Report', 'Physical Inspector Visit', 'Paperwork Processing', 'Claim Dispute / Delayed Payout'].map((step, idx) => (
                  <div key={step} className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-slate-300 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CropShield Pipeline */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" /> CropShield AI Parametric Workflow
                </h4>
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Automated (&lt; 5 Mins)
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  'Disaster Detected by 3 Telemetry Sources',
                  'AI Risk Engine Cross-Validates Anomaly',
                  'Parametric Policy Threshold Crossed',
                  'Automatic Sandbox UPI Payout Triggered',
                  'Cryptographic Blockchain Audit Recorded',
                ].map((step, idx) => (
                  <div key={step} className="flex items-center gap-2 p-2 bg-emerald-950/30 rounded-lg border border-emerald-500/30 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — How CropShield Works 5-Step Visual Pipeline */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold text-emerald-400 tracking-wider uppercase">How It Works</h2>
          <h3 className="text-3xl font-extrabold text-white">5-Step Parametric Intelligence Pipeline</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'MONITOR', desc: 'Weather + ESP32 IoT + Sentinel Satellite', icon: CloudRain, color: 'text-blue-400' },
            { step: '02', title: 'ANALYZE', desc: 'AI Risk Engine computes score & confidence', icon: Cpu, color: 'text-purple-400' },
            { step: '03', title: 'VERIFY', desc: 'Cross-source signal validation', icon: Shield, color: 'text-emerald-400' },
            { step: '04', title: 'TRIGGER', desc: 'Parametric threshold automatically crossed', icon: Activity, color: 'text-amber-400' },
            { step: '05', title: 'PROTECT', desc: 'Instant UPI payout & blockchain audit', icon: Lock, color: 'text-teal-400' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 relative hover:border-emerald-500/40 transition-colors">
                <span className="text-3xl font-extrabold text-slate-800 block mb-2">{item.step}</span>
                <Icon className={`w-6 h-6 mb-3 ${item.color}`} />
                <h4 className="font-bold text-sm text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3 — Multi-Source Intelligence Cards */}
      <section className="bg-slate-900/40 py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-extrabold text-emerald-400 tracking-wider uppercase">Multi-Source Intelligence</h2>
            <h3 className="text-3xl font-extrabold text-white">Three Independent Telemetry Layers</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit">
                <CloudRain className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white">WEATHER INTELLIGENCE</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time OpenWeather updates tracking rainfall deficits, extreme precipitation events, thermal heatwaves, and humidity indexes.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Radio className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white">ESP32 FIELD IoT INTELLIGENCE</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct in-situ soil moisture, root-zone water level, and micro-climate temperature sensor stream installed directly in the farm plot.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
                <Satellite className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white">SENTINEL-2 SATELLITE NDVI</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                10-meter resolution Sentinel-2 spectral imagery computing Normalized Difference Vegetation Index (NDVI) to detect crop canopy stress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Experience CropShield AI in Action
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          Launch our Climate Event Simulator to test Drought, Flood, or Heatwave scenarios live.
        </p>
        <button
          onClick={() => navigate('/demo')}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base px-8 py-4 rounded-xl shadow-2xl transition-all transform hover:scale-105"
        >
          Launch Hackathon Simulator Now
        </button>
      </section>

      <Footer />
    </div>
  );
};
