
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import { BankDataProvider } from './hooks/useBankData';
import BankIcon from './components/icons/BankIcon';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BankDataProvider>
      <div className="min-h-screen bg-slate-900 font-sans text-slate-200 flex flex-col items-center justify-center p-4">
        <header className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BankIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-xl md:text-2xl font-bold text-slate-100">Gemini Bank</h1>
          </div>
        </header>
        <main className="w-full max-w-7xl mx-auto">
          {isAuthenticated ? (
            <Dashboard onLogout={handleLogout} />
          ) : (
            <LoginScreen onLogin={handleLogin} />
          )}
        </main>
      </div>
    </BankDataProvider>
  );
};

export default App;
