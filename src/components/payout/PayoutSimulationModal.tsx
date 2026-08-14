import React, { useState, useEffect } from 'react';
import { Payout } from '../../types';
import { CheckCircle2, Loader2, ArrowRight, ShieldCheck, Sparkles, CreditCard, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PayoutSimulationModalProps {
  payout: Payout;
  onClose: () => void;
}

export const PayoutSimulationModal: React.FC<PayoutSimulationModalProps> = ({ payout, onClose }) => {
  const { executePayoutSimulation, farmer } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const startSimulation = async () => {
    setIsExecuting(true);
    // Step 1: Policy Check
    setStep(1);
    await new Promise((r) => setTimeout(r, 800));
    // Step 2: Trigger Validation
    setStep(2);
    await new Promise((r) => setTimeout(r, 800));
    // Step 3: Payout Amount Computation
    setStep(3);
    await new Promise((r) => setTimeout(r, 800));
    // Step 4: Sandbox UPI Transfer
    setStep(4);
    await executePayoutSimulation(payout.id);
    await new Promise((r) => setTimeout(r, 600));
    // Step 5: Complete & Audit Logged
    setStep(5);
    setIsExecuting(false);
    setIsDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Parametric Sandbox UPI Payout</h3>
            <p className="text-xs text-slate-400">Simulation Environment — Hackathon Demo</p>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl mb-6">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Farmer:</span>
            <span className="font-semibold text-white">{farmer.name}</span>
          </div>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Masked UPI ID:</span>
            <span className="font-mono text-emerald-400">{farmer.upiIdMasked}</span>
          </div>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Policy Coverage:</span>
            <span className="font-semibold text-white">₹{payout.coverageAmount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800 font-bold">
            <span className="text-slate-300">Eligible Payout:</span>
            <span className="text-lg text-emerald-400">₹{payout.calculatedPayout.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Animated 5-step Progress Pipeline */}
        <div className="space-y-3 mb-6">
          {[
            { id: 1, label: 'Parametric Policy Verified', desc: 'Active Paddy Coverage POL-TN-8809 verified' },
            { id: 2, label: '3-Source Threshold Validated', desc: 'Rainfall & soil moisture thresholds crossed' },
            { id: 3, label: 'Severity Payout Calculated', desc: `${payout.severityPercentage}% Severity → ₹${payout.calculatedPayout.toLocaleString('en-IN')}` },
            { id: 4, label: 'Sandbox UPI Transaction Initiated', desc: `Tx ID: ${payout.transactionId}` },
            { id: 5, label: 'Notification Sent & Blockchain Block Minted', desc: 'Immutable audit hash logged to ledger' },
          ].map((s) => {
            const isCompleted = step > s.id || isDone;
            const isCurrent = step === s.id && isExecuting;

            return (
              <div
                key={s.id}
                className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs transition-colors ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                    : isCurrent
                    ? 'bg-amber-950/20 border-amber-500/50 text-amber-300'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="pt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 text-[10px] flex items-center justify-center font-bold text-slate-500">
                      {s.id}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold">{s.label}</p>
                  <p className="text-[10px] text-slate-400">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trigger Button */}
        {!isDone ? (
          <button
            onClick={startSimulation}
            disabled={isExecuting}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Processing Sandbox Payout...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Simulate Payout Execution Now
              </>
            )}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="bg-emerald-950/50 border border-emerald-500/40 p-3 rounded-xl text-center text-xs text-emerald-300">
              ✓ ₹{payout.calculatedPayout.toLocaleString('en-IN')} simulated payout transferred successfully!
            </div>
            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
