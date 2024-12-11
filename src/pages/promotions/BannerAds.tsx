import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Image as ImageIcon, TrendingUp, Eye, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface BannerAd {
  id: string;
  title: string;
  image: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'ended' | 'draft';
  placement: 'home' | 'search' | 'checkout';
  clicks: number;
  impressions: number;
  ctr: number;
}

const mockBannerAds: BannerAd[] = [
  {
    id: 'BA001',
    title: 'Summer Sale Promotion',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&auto=format&fit=crop&q=60',
    startDate: '2024-03-15T00:00:00Z',
    endDate: '2024-04-15T23:59:59Z',
    status: 'active',
    placement: 'home',
    clicks: 1250,
    impressions: 25000,
    ctr: 5
  },
  {
    id: 'BA002',
    title: 'New User Discount',
    image: 'https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=800&auto=format&fit=crop&q=60',
    startDate: '2024-04-01T00:00:00Z',
    endDate: '2024-04-30T23:59:59Z',
    status: 'scheduled',
    placement: 'checkout',
    clicks: 0,
    impressions: 0,
    ctr: 0
  }
];

export const BannerAds = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState<BannerAd | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Banner Ads</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Banner Ad
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-semibold mt-2">1,250</p>
              <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Impressions</p>
              <p className="text-2xl font-semibold mt-2">25,000</p>
              <p className="text-sm text-green-600 mt-2">+8.3% from last month</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average CTR</p>
              <p className="text-2xl font-semibold mt-2">5.0%</p>
              <p className="text-sm text-green-600 mt-2">+2.1% from last month</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ExternalLink className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Banners</p>
              <p className="text-2xl font-semibold mt-2">4</p>
              <p className="text-sm text-red-600 mt-2">-1 from last month</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ImageIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search banner ads..."
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
              <option value="scheduled">Scheduled</option>
              <option value="ended">Ended</option>
              <option value="draft">Draft</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Banner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockBannerAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="h-12 w-20 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{ad.title}</p>
                        <p className="text-sm text-gray-500">{ad.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(ad.startDate), 'MMM d')} -{' '}
                        {format(new Date(ad.endDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 capitalize">{ad.placement}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Clicks</span>
                        <span className="font-medium">{ad.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">CTR</span>
                        <span className="font-medium">{ad.ctr}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing 1 to {mockBannerAds.length} of {mockBannerAds.length} banner ads
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
    </div>
  );
};