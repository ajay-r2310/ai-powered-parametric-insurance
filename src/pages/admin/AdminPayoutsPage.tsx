import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { CreditCard } from 'lucide-react';

export const AdminPayoutsPage: React.FC = () => {
  const { payouts } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Payout Settlements Ledger</h1>
              <p className="text-xs text-slate-400">Sandbox UPI Payout Execution Audit</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {payouts.length} Active Settlements
            </span>
          </div>

          {payouts.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center text-xs text-slate-400">
              No active payouts. Launch the Climate Simulator to simulate a Drought payout.
            </div>
          ) : (
            <div className="space-y-3">
              {payouts.map((p) => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-emerald-400 text-sm">Payout ID: {p.id} — ₹{p.calculatedPayout.toLocaleString('en-IN')}</span>
                    <span className="text-slate-400 font-mono">Tx: {p.transactionId}</span>
                  </div>
                  <p className="text-slate-400">Beneficiary: {p.farmerName} ({p.farmName})</p>
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
