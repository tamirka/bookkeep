
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center transform hover:scale-105 transition-transform duration-300">
      <div className={`p-4 rounded-full ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-lg font-semibold text-text-secondary">{title}</p>
        <p className="text-3xl font-bold text-text-main">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
