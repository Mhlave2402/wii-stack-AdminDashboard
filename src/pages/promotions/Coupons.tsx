import React, { useState } from 'react';
import { Ticket, TrendingUp, Users, DollarSign, Plus, Search, Filter } from 'lucide-react';
import { CouponStats } from '../../components/coupons/CouponStats';
import { CouponList } from '../../components/coupons/CouponList';
import { CreateCouponModal } from '../../components/coupons/CreateCouponModal';

const mockCoupons = [
  {
    id: 'COUP001',
    code: 'SUMMER2024',
    description: 'Summer season special discount',
    discountType: 'percentage' as const,
    discountValue: 20,
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z',
    usageLimit: 1000,
    usageCount: 450,
    status: 'active' as const,
    minOrderValue: 50,
    maxDiscount: 100
  },
  {
    id: 'COUP002',
    code: 'NEWUSER50',
    description: 'New user welcome discount',
    discountType: 'fixed' as const,
    discountValue: 50,
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    usageLimit: 500,
    usageCount: 123,
    status: 'active' as const,
    minOrderValue: 100
  }
];

export const Coupons = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleCreateCoupon = (data: any) => {
    console.log('Creating coupon:', data);
    // Implement coupon creation logic
  };

  const handleEditCoupon = (coupon: any) => {
    console.log('Editing coupon:', coupon);
    // Implement coupon editing logic
  };

  const handleDeleteCoupon = (id: string) => {
    console.log('Deleting coupon:', id);
    // Implement coupon deletion logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Coupons</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <CouponStats
          title="Total Coupons"
          value="15"
          change="+3 this month"
          trend="up"
          icon={Ticket}
        />
        <CouponStats
          title="Active Users"
          value="2,543"
          change="+12.5% from last month"
          trend="up"
          icon={Users}
        />
        <CouponStats
          title="Total Savings"
          value="$12,234"
          change="+8.3% from last month"
          trend="up"
          icon={DollarSign}
        />
        <CouponStats
          title="Redemption Rate"
          value="68%"
          change="+5.2% from last month"
          trend="up"
          icon={TrendingUp}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search coupons..."
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
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>

        <CouponList
          coupons={mockCoupons}
          onEdit={handleEditCoupon}
          onDelete={handleDeleteCoupon}
        />

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing 1 to {mockCoupons.length} of {mockCoupons.length} coupons
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                Previous
              </button>
              <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded-lg">
                1
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateCouponModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCoupon}
        />
      )}
    </div>
  );
};