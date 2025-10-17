
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { settings } = useAppContext();

  const getTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };
  
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-gray-200">
      <h1 className="text-3xl font-bold text-text-main">{getTitle()}</h1>
      <div className="flex items-center">
        <div className="text-right mr-4">
            <p className="font-semibold text-text-main">{settings.companyName}</p>
            <p className="text-sm text-text-secondary">Administrator</p>
        </div>
        <img className="h-12 w-12 rounded-full object-cover" src="https://picsum.photos/100" alt="User" />
      </div>
    </header>
  );
};

export default Header;
