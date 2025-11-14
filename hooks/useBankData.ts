
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Account, Transaction, TransactionType } from '../types';

const initialAccountData: Account = {
  accountHolder: 'Alex Johnson',
  balance: 5432.10,
  transactions: [
    { id: '1', date: '2024-07-21', description: 'Salary Deposit', amount: 3000, type: TransactionType.DEPOSIT },
    { id: '2', date: '2024-07-20', description: 'Grocery Store', amount: 154.25, type: TransactionType.WITHDRAWAL },
    { id: '3', date: '2024-07-19', description: 'Online Shopping', amount: 89.99, type: TransactionType.WITHDRAWAL },
    { id: '4', date: '2024-07-18', description: 'Transfer to Jane Doe', amount: 200, type: TransactionType.TRANSFER },
    { id: '5', date: '2024-07-17', description: 'Gas Station', amount: 55.40, type: TransactionType.WITHDRAWAL },
  ],
};

const BANK_DATA_KEY = 'gemini-bank-data';

interface BankDataContextType {
  account: Account;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const BankDataContext = createContext<BankDataContextType | undefined>(undefined);

export const BankDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<Account>(() => {
    try {
      const savedData = localStorage.getItem(BANK_DATA_KEY);
      return savedData ? JSON.parse(savedData) : initialAccountData;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return initialAccountData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BANK_DATA_KEY, JSON.stringify(account));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [account]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    setAccount(prevAccount => {
      let newBalance = prevAccount.balance;
      if (transaction.type === TransactionType.DEPOSIT) {
        newBalance += transaction.amount;
      } else {
        newBalance -= transaction.amount;
      }

      if (newBalance < 0) {
        alert("Insufficient funds for this transaction.");
        return prevAccount;
      }

      const newTransaction: Transaction = {
        ...transaction,
        id: new Date().toISOString() + Math.random(),
        date: new Date().toISOString().split('T')[0],
      };

      return {
        ...prevAccount,
        balance: newBalance,
        transactions: [newTransaction, ...prevAccount.transactions],
      };
    });
  }, []);

  // Fix: Replaced JSX with React.createElement to be compatible with a .ts file.
  // The original JSX syntax caused parsing errors because this file does not have a .tsx extension.
  return React.createElement(BankDataContext.Provider, { value: { account, addTransaction } }, children);
};

export const useBankData = (): BankDataContextType => {
  const context = useContext(BankDataContext);
  if (!context) {
    throw new Error('useBankData must be used within a BankDataProvider');
  }
  return context;
};
