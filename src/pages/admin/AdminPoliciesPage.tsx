import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { ShieldCheck } from 'lucide-react';

export const AdminPoliciesPage: React.FC = () => {
  const { policy, farmer } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Active Insurance Policies</h1>
              <p className="text-xs text-slate-400">Parametric Underwriting & Rule Threshold Registry</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              1,106 Active Policies
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400">Policy ID: {policy.id}</span>
                <h3 className="font-extrabold text-base text-white">{farmer.name} — {policy.cropType} Coverage</h3>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-lg">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div><span className="text-slate-500 block">Coverage Amount</span><span className="font-extrabold text-emerald-400 text-sm">₹{policy.coverageAmount.toLocaleString('en-IN')}</span></div>
              <div><span className="text-slate-500 block">Annual Premium</span><span className="font-bold text-white text-sm">₹{policy.premiumAmount.toLocaleString('en-IN')}</span></div>
              <div><span className="text-slate-500 block">Period</span><span className="font-semibold text-slate-300">{policy.startDate} to {policy.endDate}</span></div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
