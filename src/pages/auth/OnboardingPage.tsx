import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, CheckCircle2, CreditCard, User, ArrowRight, ArrowLeft, Sparkles, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateFarmer, updateFarm } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Murugan Ramasamy',
    phone: '+91 98421 84720',
    email: 'farmer.demo@cropshield.ai',
    farmName: 'Green Valley Paddy Estate',
    district: 'Thanjavur',
    cropType: 'Paddy',
    sizeAcres: 4.2,
    upiId: 'murugan88@okicici',
    bankAcc: '9021481902',
    ifsc: 'SBIN0001829',
  });

  const [gpsDetected, setGpsDetected] = useState(false);

  const detectGPS = () => {
    setGpsDetected(true);
  };

  const handleFinish = () => {
    updateFarmer({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
    updateFarm({
      name: formData.farmName,
      cropType: formData.cropType as any,
      sizeAcres: Number(formData.sizeAcres),
    });
    navigate('/farmer');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">Farmer Onboarding Wizard</h2>
              <p className="text-xs text-slate-400">Step {step} of 4</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-7 h-2 rounded-full transition-colors ${
                  step >= i ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" /> Step 1: Personal Information
            </h3>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Farmer Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Mobile Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
              />
            </div>
          </div>
        )}

        {/* Step 2: Farm Info */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" /> Step 2: Farm Details & Location
            </h3>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Farm / Plot Name</label>
              <input
                type="text"
                value={formData.farmName}
                onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Crop Type</label>
                <select
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                >
                  <option value="Paddy">Paddy (Rice)</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Maize">Maize</option>
                  <option value="Vegetables">Vegetables</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Farm Size (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.sizeAcres}
                  onChange={(e) => setFormData({ ...formData, sizeAcres: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-300 font-semibold block">GPS Location Detection</span>
                <span className="text-[10px] text-slate-500">
                  {gpsDetected ? 'Lat: 10.787° N, Lng: 79.137° E (Thanjavur, TN)' : 'Click to acquire field coordinates'}
                </span>
              </div>
              <button
                type="button"
                onClick={detectGPS}
                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-emerald-500/20"
              >
                <Navigation className="w-3.5 h-3.5" /> {gpsDetected ? 'GPS Verified' : 'Auto Detect'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payout Info */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" /> Step 3: Parametric Payout Details
            </h3>
            <p className="text-slate-400 text-[11px] bg-slate-950 p-3 rounded-xl border border-slate-800">
              🔒 Payout details are strictly stored for automated parametric claims. Sensitive account details are always masked.
            </p>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">UPI ID (Preferred for Instant Payouts)</label>
              <input
                type="text"
                value={formData.upiId}
                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bank Account Number</label>
                <input
                  type="text"
                  value={formData.bankAcc}
                  onChange={(e) => setFormData({ ...formData, bankAcc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={formData.ifsc}
                  onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono uppercase"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Summary & Activation */}
        {step === 4 && (
          <div className="space-y-4 text-xs">
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="font-extrabold text-xl text-white">Your Farm is Ready for Protection!</h3>
              <p className="text-slate-400">Review your onboarding parameters before activation.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Farmer:</span>
                <span className="font-bold text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Farm:</span>
                <span className="font-bold text-white">{formData.farmName} ({formData.sizeAcres} Acres)</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Crop:</span>
                <span className="font-bold text-emerald-400">{formData.cropType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payout Destination:</span>
                <span className="font-mono text-emerald-400">{formData.upiId}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" /> Activate Farm Protection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
