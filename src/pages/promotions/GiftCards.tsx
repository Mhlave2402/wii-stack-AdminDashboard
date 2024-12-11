import React, { useState } from 'react';
import { 
  Gift, TrendingUp, DollarSign, Users, Plus, Search, Filter, 
  RefreshCw, Copy, Download, Upload, LayoutTemplate, Mail
} from 'lucide-react';
import { GiftCardTemplates } from '../../components/gift-cards/GiftCardTemplates';
import { GiftCardBulkUpload } from '../../components/gift-cards/GiftCardBulkUpload';
import { GiftCardAnalytics } from '../../components/gift-cards/GiftCardAnalytics';
import { CreateGiftCardModal } from '../../components/gift-cards/CreateGiftCardModal';
import { GiftCardList } from '../../components/gift-cards/GiftCardList';
import { GiftCardStats } from '../../components/gift-cards/GiftCardStats';

const mockGiftCards = [
  {
    id: 'GC001',
    code: 'GIFT-2024-ABCD',
    balance: 75.50,
    initialAmount: 100,
    status: 'active',
    createdAt: '2024-03-01T10:00:00Z',
    expiresAt: '2025-03-01T10:00:00Z',
    lastUsed: '2024-03-15T14:30:00Z',
    recipientEmail: 'john@example.com',
    recipientName: 'John Doe',
    purchaserName: 'Jane Smith',
    purchaserEmail: 'jane@example.com',
    template: 'birthday',
    usageHistory: [
      { date: '2024-03-15T14:30:00Z', amount: 24.50, location: 'Online Store' }
    ]
  },
  {
    id: 'GC002',
    code: 'GIFT-2024-EFGH',
    balance: 200,
    initialAmount: 200,
    status: 'active',
    createdAt: '2024-03-10T15:00:00Z',
    expiresAt: '2025-03-10T15:00:00Z',
    purchaserName: 'Mike Johnson',
    purchaserEmail: 'mike@example.com',
    template: 'corporate',
    usageHistory: []
  }
];

const stats = [
  {
    title: 'Total Value',
    value: '$15,750',
    change: '+12.5% from last month',
    trend: 'up',
    icon: DollarSign
  },
  {
    title: 'Active Cards',
    value: '234',
    change: '+8.3% from last month',
    trend: 'up',
    icon: Gift
  },
  {
    title: 'Redemption Rate',
    value: '78.5%',
    change: '+5.2% from last month',
    trend: 'up',
    icon: TrendingUp
  },
  {
    title: 'Recipients',
    value: '189',
    change: '+15.2% from last month',
    trend: 'up',
    icon: Users
  }
];

export const GiftCards = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleCreateGiftCard = (data: any) => {
    console.log('Creating gift card:', data);
    setShowCreateModal(false);
  };

  const handleBulkUpload = (file: File) => {
    console.log('Processing bulk upload:', file);
    setShowBulkUpload(false);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowTemplates(false);
    setShowCreateModal(true);
  };

  const handleExportData = () => {
    // Implement CSV export logic
    console.log('Exporting gift card data...');
  };

  const handleSendReminders = () => {
    // Implement reminder email logic
    console.log('Sending balance reminders...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Gift Cards</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTemplates(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <LayoutTemplate className="h-4 w-4" />
            Templates
          </button>
          <button
            onClick={() => setShowBulkUpload(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Bulk Upload
          </button>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={handleSendReminders}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Mail className="h-4 w-4" />
            Send Reminders
          </button>
          <button
            onClick={() => setShowAnalytics(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <TrendingUp className="h-4 w-4" />
            Analytics
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Gift Card
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <GiftCardStats key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search gift cards..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="redeemed">Redeemed</option>
              <option value="expired">Expired</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>

        <GiftCardList 
          giftCards={mockGiftCards}
          onCopyCode={(code) => {
            navigator.clipboard.writeText(code);
            // Show toast notification
          }}
        />
      </div>

      {showCreateModal && (
        <CreateGiftCardModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateGiftCard}
          selectedTemplate={selectedTemplate}
        />
      )}

      {showBulkUpload && (
        <GiftCardBulkUpload
          onClose={() => setShowBulkUpload(false)}
          onUpload={handleBulkUpload}
        />
      )}

      {showTemplates && (
        <GiftCardTemplates
          onClose={() => setShowTemplates(false)}
          onSelect={handleTemplateSelect}
        />
      )}

      {showAnalytics && (
        <GiftCardAnalytics
          onClose={() => setShowAnalytics(false)}
          giftCards={mockGiftCards}
        />
      )}
    </div>
  );
};