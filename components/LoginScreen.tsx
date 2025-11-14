
import React, { useState, FormEvent, useRef, useEffect } from 'react';
import BankIcon from './icons/BankIcon';

interface LoginScreenProps {
  onLogin: () => void;
}

const CORRECT_PIN = '1234';

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const pinInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    pinInputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (pin === CORRECT_PIN) {
        onLogin();
      } else {
        setError('Invalid PIN. Please try again.');
        setPin('');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <div className="w-full max-w-sm p-8 space-y-6 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700">
        <div className="text-center">
            <BankIcon className="w-16 h-16 mx-auto text-cyan-400 mb-4" />
          <h2 className="text-3xl font-bold text-slate-100">Welcome Back</h2>
          <p className="text-slate-400 mt-2">Enter your PIN to access your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pin" className="sr-only">
              PIN
            </label>
            <input
              ref={pinInputRef}
              id="pin"
              name="pin"
              type="password"
              inputMode="numeric"
              maxLength={4}
              autoComplete="off"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-4 border border-slate-600 bg-slate-900 placeholder-slate-500 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-center text-2xl tracking-[1rem]"
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading || pin.length !== 4}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Verifying...' : 'Unlock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
