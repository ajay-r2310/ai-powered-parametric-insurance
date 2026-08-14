import React from 'react';

interface GaugeChartProps {
  score: number; // 0 - 100
  size?: number;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ score, size = 180 }) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const fillPercentage = Math.min(Math.max(score, 0), 100) / 100;
  const strokeDashoffset = circumference * (1 - fillPercentage);

  let colorClass = '#10B981'; // Green
  if (score >= 75) colorClass = '#EF4444'; // Red
  else if (score >= 45) colorClass = '#F59E0B'; // Amber
  else if (score >= 25) colorClass = '#3B82F6'; // Blue

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size / 1.6 }}>
      <svg width={size} height={size / 1.5} className="overflow-visible">
        {/* Background Track */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="#1E293B"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Animated Progress Arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={colorClass}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute bottom-1 text-center">
        <span className="text-3xl font-extrabold text-white tracking-tight">{score}</span>
        <span className="text-xs text-slate-400 font-semibold block">/ 100</span>
      </div>
    </div>
  );
};
