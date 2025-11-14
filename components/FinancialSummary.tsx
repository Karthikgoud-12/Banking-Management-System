
import React, { useState } from 'react';
import { getFinancialSummary } from '../services/geminiService';
import { useBankData } from '../hooks/useBankData';
import SparklesIcon from './icons/SparklesIcon';

const FinancialSummary: React.FC = () => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { account } = useBankData();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await getFinancialSummary(account.transactions, account.balance, account.accountHolder);
      setSummary(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate summary: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-slate-100 flex items-center gap-2">
        <SparklesIcon className="w-6 h-6 text-cyan-400"/>
        AI Financial Summary
      </h3>
      
      {summary && !isLoading && (
        <div className="text-slate-300 text-sm whitespace-pre-wrap bg-slate-700/30 p-4 rounded-lg">
          {summary}
        </div>
      )}

      {isLoading && (
         <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}
      
      <button
        onClick={handleGenerateSummary}
        disabled={isLoading}
        className="w-full mt-4 py-2 px-4 bg-cyan-600/50 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <SparklesIcon className="w-5 h-5"/>
        {isLoading ? 'Analyzing...' : 'Generate Summary'}
      </button>
    </div>
  );
};

export default FinancialSummary;
