
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ArrowsRightLeftIcon, ChartPieIcon, Cog6ToothIcon, CircleStackIcon } from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const navLinkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-sidebar-hover hover:text-white transition-colors duration-200 rounded-lg";
  const activeNavLinkClasses = "bg-primary text-white";

  return (
    <div className="flex flex-col w-64 bg-sidebar text-white">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <CircleStackIcon className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold ml-2">BookkeepAI</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink to="/dashboard" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
          <HomeIcon className="h-6 w-6 mr-3" />
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
          <ArrowsRightLeftIcon className="h-6 w-6 mr-3" />
          Transactions
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
          <ChartPieIcon className="h-6 w-6 mr-3" />
          Reports
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
          <Cog6ToothIcon className="h-6 w-6 mr-3" />
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
