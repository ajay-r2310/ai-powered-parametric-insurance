import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { PayoutSimulationModal } from '../../components/payout/PayoutSimulationModal';
import { CreditCard, CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PayoutsPage: React.FC = () => {
  const { payouts, farmer } = useApp();
  const navigate = useNavigate();
  const [selectedPayout, setSelectedPayout] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Parametric Payout Center</h1>
              <p className="text-xs text-slate-400">Sandbox UPI Payout Execution & Settlement Ledger</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              Demo Sandbox Environment
            </span>
          </div>

          {payouts.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
              <CreditCard className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Payout Claims Triggered Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No active climate disaster has crossed policy thresholds. Launch the Climate Simulator to simulate a Drought payout.
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
              {payouts.map((p) => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Payout ID: {p.id}</span>
                      <h3 className="text-xl font-extrabold text-emerald-400">
                        ₹{p.calculatedPayout.toLocaleString('en-IN')} Payout Eligible
                      </h3>
                      <p className="text-xs text-slate-400">
                        Coverage: ₹{p.coverageAmount.toLocaleString('en-IN')} ({p.severityPercentage}% Event Severity)
                      </p>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                      p.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {p.status === 'COMPLETED' ? '✓ SIMULATED PAYOUT EXECUTED' : 'READY FOR SANDBOX EXECUTION'}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Beneficiary:</span>
                      <span className="font-semibold text-white">{farmer.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Masked UPI Destination:</span>
                      <span className="font-mono text-emerald-400">{farmer.upiIdMasked}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Transaction ID:</span>
                      <span className="font-mono text-slate-300">{p.transactionId}</span>
                    </div>
                  </div>

                  {p.status !== 'COMPLETED' && (
                    <button
                      onClick={() => setSelectedPayout(p)}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" /> Simulate Payout Execution Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {selectedPayout && (
        <PayoutSimulationModal
          payout={selectedPayout}
          onClose={() => setSelectedPayout(null)}
        />
      )}

      <Footer />
    </div>
  );
};
