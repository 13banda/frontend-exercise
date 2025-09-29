import React from "react";

interface GameStatCardProps {
  label: string;
  value: string | number;
}

export const GameStatCard: React.FC<GameStatCardProps> = ({ label, value }) => {
  return (
    <div className="min-w-[160px] bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center border border-white/20 shadow-md hover:shadow-lg transition-shadow">
      <span className="text-3xl font-extrabold text-white mb-1">{value}</span>
      <span className="text-sm font-medium text-white/70 tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
};
