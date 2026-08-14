import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { AlertTriangle, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RiskEventsPage: React.FC = () => {
  const { triggers, aiRisk, activeScenario } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Parametric Trigger Center</h1>
              <p className="text-xs text-slate-400">Automated Parametric Event Triggers & Verification Engine</p>
            </div>
            <button
              onClick={() => navigate('/demo')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl"
            >
              Trigger Event in Simulator
            </button>
          </div>

          {triggers.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Climate Disasters Triggered</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Current farm parameters are healthy. Launch the Demo Simulator to trigger a Drought or Flood scenario live.
              </p>
              <button
                onClick={() => navigate('/demo')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow"
              >
                Launch Simulator
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {triggers.map((t) => (
                <div key={t.id} className="bg-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-white">⚠ {t.eventType.toUpperCase()} EVENT VERIFIED</h3>
                        <p className="text-xs text-slate-400">Trigger ID: {t.id} | Severity: {t.severity}</p>
                      </div>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-lg">
                      ✓ TRIGGER VERIFIED
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-xs text-slate-300">Conditions Checklist:</h4>
                    {t.conditionsChecklist.map((c, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> {c.condition}
                        </span>
                        <span className="font-mono text-slate-400">{c.detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => navigate('/farmer/payouts')}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow"
                    >
                      View Eligible Payout →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};
