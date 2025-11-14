
import React from 'react';
import { Transaction, TransactionType } from '../types';
import ArrowUpIcon from './icons/ArrowUpIcon';
import ArrowDownIcon from './icons/ArrowDownIcon';
import ArrowRightLeftIcon from './icons/ArrowRightLeftIcon';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionIcon: React.FC<{ type: TransactionType }> = ({ type }) => {
    switch(type) {
        case TransactionType.DEPOSIT:
            return <div className="p-2 bg-green-500/10 rounded-full"><ArrowUpIcon className="w-5 h-5 text-green-400" /></div>;
        case TransactionType.WITHDRAWAL:
            return <div className="p-2 bg-red-500/10 rounded-full"><ArrowDownIcon className="w-5 h-5 text-red-400" /></div>;
        case TransactionType.TRANSFER:
            return <div className="p-2 bg-blue-500/10 rounded-full"><ArrowRightLeftIcon className="w-5 h-5 text-blue-400" /></div>;
        default:
            return null;
    }
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 h-full">
      <h3 className="text-lg font-semibold mb-4 text-slate-100">Transaction History</h3>
      <div className="overflow-auto max-h-[600px] pr-2">
        <div className="space-y-1">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-700/50 rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <TransactionIcon type={tx.type} />
                <div>
                  <p className="font-medium text-slate-200">{tx.description}</p>
                  <p className="text-sm text-slate-400">{tx.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${tx.type === TransactionType.DEPOSIT ? 'text-green-400' : 'text-slate-200'}`}>
                {tx.type === TransactionType.DEPOSIT ? '+' : '-'} ${tx.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
