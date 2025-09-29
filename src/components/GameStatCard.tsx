import React from "react";

interface GameStatCardProps {
  label: string;
  value: string | number;
}

export const GameStatCard: React.FC<GameStatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center border border-white/20">
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-white">{label}</span>
      </div>
      <span className="text-2xl font-bold text-white">{value}</span>
    </div>
  );
};
