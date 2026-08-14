import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { BlockchainLedger } from '../../components/blockchain/BlockchainLedger';

export const AdminBlockchainPage: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="admin" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Blockchain Audit Trail Ledger</h1>
              <p className="text-xs text-slate-400">Cryptographic SHA-256 Hash-Chained Tamper-Proof Event Log</p>
            </div>
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {auditLogs.length} Immutable Blocks
            </span>
          </div>

          <BlockchainLedger logs={auditLogs} />
        </main>
      </div>

      <Footer />
    </div>
  );
};
