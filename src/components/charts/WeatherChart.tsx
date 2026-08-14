import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface WeatherChartProps {
  forecast: { day: string; rainfall: number; tempMax: number; tempMin: number }[];
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ forecast }) => {
  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
          <YAxis stroke="#64748B" fontSize={11} unit="mm" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F8FAFC',
            }}
            formatter={(value: number) => [`${value} mm`, 'Rainfall']}
          />
          <Bar dataKey="rainfall" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
