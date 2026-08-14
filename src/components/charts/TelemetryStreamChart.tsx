import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface TelemetryStreamChartProps {
  moisture: number;
}

export const TelemetryStreamChart: React.FC<TelemetryStreamChartProps> = ({ moisture }) => {
  // Generate sample 12-hour sensor stream points
  const streamData = [
    { time: '08:00', value: moisture + 4 },
    { time: '09:00', value: moisture + 3 },
    { time: '10:00', value: moisture + 2 },
    { time: '11:00', value: moisture + 1 },
    { time: '12:00', value: moisture },
    { time: '13:00', value: moisture - 1 },
    { time: '14:00', value: moisture - 2 },
    { time: '15:00', value: moisture },
  ];

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={streamData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
          <YAxis domain={[0, 100]} stroke="#64748B" fontSize={11} unit="%" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F8FAFC',
            }}
            formatter={(value: number) => [`${value}%`, 'Soil Moisture']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#06B6D4"
            strokeWidth={3}
            dot={{ fill: '#06B6D4', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
