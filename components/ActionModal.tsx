
import React, { useState, FormEvent, useEffect } from 'react';
import { TransactionType } from '../types';
import { useBankData } from '../hooks/useBankData';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: TransactionType;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, type }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const { addTransaction } = useBankData();

  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setDescription('');
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    addTransaction({
      amount: numericAmount,
      description: description || `${type} action`,
      type: type,
    });
    
    onClose();
  };

  const modalTitle = {
    [TransactionType.DEPOSIT]: 'Make a Deposit',
    [TransactionType.WITHDRAWAL]: 'Make a Withdrawal',
    [TransactionType.TRANSFER]: 'Make a Transfer',
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="relative bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-slate-700 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">{modalTitle[type]}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-slate-400 mb-1">
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">$</span>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                className="w-full pl-7 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1">
              Description / Recipient
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={type === TransactionType.TRANSFER ? 'e.g., Jane Doe' : 'e.g., Online Purchase'}
              required
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors"
            >
              Confirm {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionModal;
