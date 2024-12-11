import React from 'react';
import { Gift, Copy, Eye, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface GiftCard {
  id: string;
  code: string;
  balance: number;
  initialAmount: number;
  status: string;
  createdAt: string;
  expiresAt: string;
  lastUsed?: string;
  recipientEmail?: string;
  recipientName?: string;
  purchaserName: string;
  purchaserEmail: string;
  template: string;
  usageHistory: Array<{
    date: string;
    amount: number;
    location: string;
  }>;
}

interface GiftCardListProps {
  giftCards: GiftCard[];
  onCopyCode: (code: string) => void;
}

export const GiftCardList: React.FC<GiftCardListProps> = ({
  giftCards,
  onCopyCode
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'redeemed':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTemplateIcon = (template: string) => {
    switch (template) {
      case 'birthday':
        return '🎂';
      case 'corporate':
        return '🏢';
      case 'holiday':
        return '🎄';
      default:
        return '🎁';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gift Card Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Balance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Recipient
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usage History
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {giftCards.map((card) => (
            <tr key={card.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-xl">
                    {getTemplateIcon(card.template)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{card.code}</p>
                      <button
                        onClick={() => onCopyCode(card.code)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">{card.id}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created {format(new Date(card.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    ${card.balance.toFixed(2)}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${(card.balance / card.initialAmount) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Initial: ${card.initialAmount.toFixed(2)}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                  {card.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    {card.recipientName || 'Not assigned'}
                  </p>
                  {card.recipientEmail && (
                    <p className="text-sm text-gray-500">{card.recipientEmail}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    Purchased by: {card.purchaserName}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  {card.usageHistory.length > 0 ? (
                    card.usageHistory.map((usage, index) => (
                      <div key={index} className="text-sm">
                        <p className="text-gray-900">
                          ${usage.amount.toFixed(2)} at {usage.location}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(usage.date), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No usage history</p>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};