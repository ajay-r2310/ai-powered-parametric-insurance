import React from 'react';
import { AuditBlock } from '../../types';
import { Layers, ShieldCheck, Hash, Clock, ArrowDown, FileText } from 'lucide-react';

interface BlockchainLedgerProps {
  logs: AuditBlock[];
}

export const BlockchainLedger: React.FC<BlockchainLedgerProps> = ({ logs }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Immutable Event Ledger</h3>
            <p className="text-xs text-slate-400">Hash-Chained Cryptographic Audit Trail Prototype</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-lg">
          {logs.length} Blocks Verified
        </span>
      </div>

      <div className="space-y-4">
        {logs.map((block, idx) => (
          <React.Fragment key={block.blockHash}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-purple-500/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5" /> BLOCK #{block.blockNumber}
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-wide">
                    {block.eventType}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(block.timestamp).toLocaleString()}</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 text-[10px]">
                    <ShieldCheck className="w-3 h-3" /> IMMUTABLE
                  </span>
                </div>
              </div>

              {/* Hashes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-[11px] font-mono">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-0.5">Block Hash:</span>
                  <span className="text-purple-300 break-all">{block.blockHash}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-0.5">Previous Hash:</span>
                  <span className="text-slate-400 break-all">{block.previousHash}</span>
                </div>
              </div>

              {/* Payload */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <FileText className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-0.5">{block.payload.details}</p>
                  {block.payload.amount && (
                    <p className="text-emerald-400 font-bold">
                      Amount: ₹{block.payload.amount.toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {idx < logs.length - 1 && (
              <div className="flex justify-center my-1">
                <ArrowDown className="w-5 h-5 text-purple-500/50 animate-bounce" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
