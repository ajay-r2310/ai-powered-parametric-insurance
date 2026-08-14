import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface NDVIChartProps {
  data: { date: string; value: number }[];
}

export const NDVIChart: React.FC<NDVIChartProps> = ({ data }) => {
  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
          <YAxis domain={[0.4, 1.0]} stroke="#64748B" fontSize={11} tickCount={4} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F8FAFC',
            }}
            formatter={(value: number) => [`${value.toFixed(2)} (NDVI)`, 'Vegetation Index']}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10B981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#ndviGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
