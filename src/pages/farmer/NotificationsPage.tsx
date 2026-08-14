import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/layout/Header';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { JudgeDemoBar } from '../../components/layout/JudgeDemoBar';
import { Bell, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <JudgeDemoBar />
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar mode="farmer" />

        <main className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Notification Center</h1>
              <p className="text-xs text-slate-400">Multi-Channel Alerts: SMS, IVR & In-App Telemetry Feeds</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {notifications.length} Alerts Logged
            </span>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-5 rounded-2xl border transition-colors cursor-pointer ${
                  n.read
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-emerald-950/20 border-emerald-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold flex items-center gap-2 ${
                    n.severity === 'ALERT' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {n.severity === 'ALERT' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    {n.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">{n.message}</p>
                <span className="text-[10px] font-bold bg-slate-950 text-slate-400 border border-slate-800 px-2 py-0.5 rounded uppercase">
                  Channel: {n.channel}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
