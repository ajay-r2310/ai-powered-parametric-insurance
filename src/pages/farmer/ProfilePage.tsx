import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { User, ShieldCheck, CheckCircle2, CreditCard, Lock, Phone, Mail } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { farmer, farm } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-extrabold text-white">{farmer.name}</h1>
                <p className="text-xs text-slate-400">Farmer ID: {farmer.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Identity Verified
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Farm Verified
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" /> Account Details
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Mobile Number:</span>
                  <span className="font-semibold text-white">{farmer.phone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-semibold text-white">{farmer.email}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Farm Plot Name:</span>
                  <span className="font-semibold text-white">{farm.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Farm Location:</span>
                  <span className="font-semibold text-white">{farm.location.district}, Tamil Nadu</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" /> Masked Payout Accounts
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Masked UPI ID:</span>
                  <span className="font-mono text-emerald-400 font-bold">{farmer.upiIdMasked}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Bank Account:</span>
                  <span className="font-mono text-slate-300">{farmer.bankAccountMasked}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IFSC Code:</span>
                  <span className="font-mono text-slate-300">{farmer.ifscMasked}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                Sensitive banking information is masked in compliance with fintech security guidelines.
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
