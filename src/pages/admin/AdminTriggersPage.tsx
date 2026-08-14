import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { BarChart3 } from 'lucide-react';

export const AdminTriggersPage: React.FC = () => {
  const { triggers } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Parametric Trigger Registry</h1>
              <p className="text-xs text-slate-400">Automated Parametric Event Triggers Log</p>
            </div>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {triggers.length} Verified Triggers
            </span>
          </div>

          {triggers.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center text-xs text-slate-400">
              No active triggers. Launch the Demo Simulator to trigger a Drought event.
            </div>
          ) : (
            <div className="space-y-3">
              {triggers.map((t) => (
                <div key={t.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-white text-sm">Trigger ID: {t.id} ({t.eventType})</span>
                    <span className="text-emerald-400 font-bold">✓ VERIFIED</span>
                  </div>
                  <p className="text-slate-400">Severity: {t.severity} | AI Confidence: {t.confidence}%</p>
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
