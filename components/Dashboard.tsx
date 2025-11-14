
import React, { useState } from 'react';
import { useBankData } from '../hooks/useBankData';
import BalanceCard from './BalanceCard';
import TransactionHistory from './TransactionHistory';
import ActionModal from './ActionModal';
import FinancialSummary from './FinancialSummary';
import { TransactionType } from '../types';
import ArrowUpIcon from './icons/ArrowUpIcon';
import ArrowDownIcon from './icons/ArrowDownIcon';
import ArrowRightLeftIcon from './icons/ArrowRightLeftIcon';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { account } = useBankData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TransactionType>(TransactionType.DEPOSIT);

  const openModal = (type: TransactionType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full animate-fade-in space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h2 className="text-3xl font-bold text-slate-100">Welcome, {account.accountHolder}</h2>
            <p className="text-slate-400">Here's your account overview for today.</p>
        </div>
        <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
            Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <BalanceCard balance={account.balance} />
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => openModal(TransactionType.DEPOSIT)} className="flex flex-col items-center justify-center p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors aspect-square">
                  <ArrowUpIcon className="w-6 h-6 mb-2 text-green-400"/>
                  <span className="text-sm">Deposit</span>
              </button>
              <button onClick={() => openModal(TransactionType.WITHDRAWAL)} className="flex flex-col items-center justify-center p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors aspect-square">
                  <ArrowDownIcon className="w-6 h-6 mb-2 text-red-400"/>
                  <span className="text-sm">Withdraw</span>
              </button>
              <button onClick={() => openModal(TransactionType.TRANSFER)} className="flex flex-col items-center justify-center p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors aspect-square">
                  <ArrowRightLeftIcon className="w-6 h-6 mb-2 text-blue-400"/>
                  <span className="text-sm">Transfer</span>
              </button>
            </div>
          </div>
          <FinancialSummary />
        </div>
        <div className="lg:col-span-2">
            <TransactionHistory transactions={account.transactions} />
        </div>
      </div>
      
      <ActionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </div>
  );
};

export default Dashboard;
