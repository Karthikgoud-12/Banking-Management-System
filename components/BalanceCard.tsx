
import React from 'react';
import CardIcon from './icons/CardIcon';

interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balance);

  return (
    <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white overflow-hidden">
        <div className="relative z-10">
            <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Current Balance</span>
                <CardIcon className="w-8 h-8 opacity-80"/>
            </div>
            <p className="text-4xl font-bold mt-4">{formattedBalance}</p>
            <p className="text-sm opacity-80 mt-6">Account: •••• 1234</p>
        </div>
    </div>
  );
};

export default BalanceCard;
