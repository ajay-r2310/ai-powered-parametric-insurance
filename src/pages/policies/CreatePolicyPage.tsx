import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export const CreatePolicyPage: React.FC = () => {
  const navigate = useNavigate();
  const { updatePolicy } = useApp();

  const [step, setStep] = useState(1);
  const [crop, setCrop] = useState('Paddy');
  const [coverage, setCoverage] = useState(75000);
  const [rainfallThreshold, setRainfallThreshold] = useState(15);
  const [soilThreshold, setSoilThreshold] = useState(22);

  const handleFinish = () => {
    updatePolicy({
      cropType: crop as any,
      coverageAmount: Number(coverage),
      thresholds: {
        minRainfallMm: Number(rainfallThreshold),
        minSoilMoisturePercentage: Number(soilThreshold),
        minDurationDays: 3,
      },
    });
    navigate('/farmer/policy');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h1 className="text-xl font-extrabold text-white">Parametric Policy Creation Wizard</h1>
                <p className="text-xs text-slate-400">Step {step} of 4</p>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-7 h-2 rounded-full ${step >= i ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-white">Step 1: Select Target Crop</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['Paddy', 'Cotton', 'Groundnut', 'Sugarcane', 'Maize', 'Vegetables'].map((c) => (
                    <div
                      key={c}
                      onClick={() => setCrop(c)}
                      className={`p-4 rounded-xl border text-center font-bold cursor-pointer transition-colors ${
                        crop === c ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-white">Step 2: Coverage Amount Setup</h3>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Max Policy Coverage Amount (₹)</label>
                  <input
                    type="number"
                    value={coverage}
                    onChange={(e) => setCoverage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-extrabold text-lg text-emerald-400"
                  />
                </div>
                <p className="text-[11px] text-slate-500">Calculated Annual Premium: ₹{(coverage * 0.03).toLocaleString('en-IN')} (3% Rate)</p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-white">Step 3: Configure Parametric Drought Thresholds</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Min Drought Rainfall Trigger (mm)</label>
                    <input
                      type="number"
                      value={rainfallThreshold}
                      onChange={(e) => setRainfallThreshold(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Min Soil Moisture Trigger (%)</label>
                    <input
                      type="number"
                      value={soilThreshold}
                      onChange={(e) => setSoilThreshold(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 text-xs text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-extrabold text-xl text-white">Ready to Deploy Parametric Policy</h3>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-left">
                  <div className="flex justify-between"><span className="text-slate-400">Crop:</span><span className="font-bold text-white">{crop}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Coverage:</span><span className="font-bold text-emerald-400">₹{coverage.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Drought Threshold:</span><span className="font-bold text-slate-300">Rain &lt; {rainfallThreshold}mm, Soil &lt; {soilThreshold}%</span></div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-slate-800">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl">
                  Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button onClick={() => setStep(step + 1)} className="bg-emerald-500 text-slate-950 font-extrabold text-xs px-6 py-2 rounded-xl">
                  Next
                </button>
              ) : (
                <button onClick={handleFinish} className="bg-emerald-500 text-slate-950 font-extrabold text-xs px-6 py-2 rounded-xl">
                  Deploy Policy
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
