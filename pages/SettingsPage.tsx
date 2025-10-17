
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAppContext();
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ companyName, currencySymbol });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const commonInputClasses = "w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-text-main mb-6">Application Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-text-secondary">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={commonInputClasses}
            />
          </div>
          <div>
            <label htmlFor="currencySymbol" className="block text-sm font-medium text-text-secondary">Currency Symbol</label>
            <input
              type="text"
              id="currencySymbol"
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              className={commonInputClasses}
              maxLength={2}
            />
          </div>
          <div className="flex items-center justify-end pt-4">
             {showSuccess && (
              <div className="flex items-center text-green-600 mr-4 transition-opacity duration-300">
                <CheckCircleIcon className="h-5 w-5 mr-1" />
                <span>Settings saved!</span>
              </div>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
