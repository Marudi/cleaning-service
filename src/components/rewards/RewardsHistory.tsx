import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'EARNED' | 'REDEEMED' | 'EXPIRED';
  points: number;
  description: string;
  date: string;
}

interface RewardsHistoryProps {
  transactions: Transaction[];
}

export default function RewardsHistory({ transactions }: RewardsHistoryProps) {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'EARNED':
        return <ArrowUpRight className="h-5 w-5 text-green-500" />;
      case 'REDEEMED':
        return <ArrowDownRight className="h-5 w-5 text-blue-500" />;
      case 'EXPIRED':
        return <ArrowDownRight className="h-5 w-5 text-red-500" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'EARNED':
        return 'text-green-600';
      case 'REDEEMED':
        return 'text-blue-600';
      case 'EXPIRED':
        return 'text-red-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Points History</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              {getTransactionIcon(transaction.type)}
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <span className={`font-medium ${getTransactionColor(transaction.type)}`}>
              {transaction.type === 'EARNED' ? '+' : '-'}{transaction.points} points
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}