import React, { useState } from 'react';
import { 
  Package, TrendingUp, Clock, AlertCircle, Search, Filter,
  Plus, Download, Upload, Truck, MapPin, User, Phone,
  MoreVertical, CheckCircle, XCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface PackageItem {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'failed';
  type: string;
  weight: string;
  dimensions: string;
  sender: {
    name: string;
    phone: string;
    address: string;
  };
  recipient: {
    name: string;
    phone: string;
    address: string;
  };
  driver?: {
    name: string;
    phone: string;
    vehicleId: string;
  };
  timeline: {
    created: string;
    pickup?: string;
    delivery?: string;
    completed?: string;
  };
  priority: 'standard' | 'express' | 'same_day';
  price: number;
}

const mockPackages: PackageItem[] = [
  {
    id: 'PKG001',
    trackingNumber: 'TRK123456789',
    status: 'in_transit',
    type: 'Standard Box',
    weight: '5.2 kg',
    dimensions: '30x20x15 cm',
    sender: {
      name: 'John Smith',
      phone: '+1 234-567-8900',
      address: '123 Sender St, New York, NY 10001'
    },
    recipient: {
      name: 'Jane Doe',
      phone: '+1 234-567-8901',
      address: '456 Recipient Ave, New York, NY 10002'
    },
    driver: {
      name: 'Mike Wilson',
      phone: '+1 234-567-8902',
      vehicleId: 'VH001'
    },
    timeline: {
      created: '2024-03-15T09:00:00Z',
      pickup: '2024-03-15T10:30:00Z'
    },
    priority: 'express',
    price: 45.99
  },
  {
    id: 'PKG002',
    trackingNumber: 'TRK987654321',
    status: 'delivered',
    type: 'Large Box',
    weight: '8.7 kg',
    dimensions: '45x35x25 cm',
    sender: {
      name: 'Alice Johnson',
      phone: '+1 234-567-8903',
      address: '789 Sender Rd, New York, NY 10003'
    },
    recipient: {
      name: 'Bob Williams',
      phone: '+1 234-567-8904',
      address: '321 Recipient Blvd, New York, NY 10004'
    },
    driver: {
      name: 'Sarah Davis',
      phone: '+1 234-567-8905',
      vehicleId: 'VH002'
    },
    timeline: {
      created: '2024-03-14T14:00:00Z',
      pickup: '2024-03-14T15:30:00Z',
      delivery: '2024-03-14T17:45:00Z',
      completed: '2024-03-14T17:50:00Z'
    },
    priority: 'standard',
    price: 35.50
  }
];

export const Packages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const stats = [
    {
      title: 'Total Packages',
      value: '1,234',
      change: '+12.5% from last month',
      icon: Package,
      trend: 'up'
    },
    {
      title: 'In Transit',
      value: '456',
      change: '+8.3% from last month',
      icon: Truck,
      trend: 'up'
    },
    {
      title: 'Average Delivery Time',
      value: '45 mins',
      change: '-5.2% from last month',
      icon: Clock,
      trend: 'down'
    },
    {
      title: 'Failed Deliveries',
      value: '0.8%',
      change: '-0.3% from last month',
      icon: AlertCircle,
      trend: 'down'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'express':
        return 'text-orange-600';
      case 'same_day':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Package Management</h1>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Package
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
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
                placeholder="Search by tracking number, sender, or recipient..."
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
              <option value="pending">Pending</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
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
                  Package Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPackages.map((pkg) => (
                <tr 
                  key={pkg.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {pkg.trackingNumber}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{pkg.type}</p>
                      <p className="text-sm text-gray-500">
                        {pkg.weight} • {pkg.dimensions}
                      </p>
                      <p className={`text-sm font-medium ${getPriorityColor(pkg.priority)}`}>
                        {pkg.priority.replace('_', ' ').toUpperCase()}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <User className="h-4 w-4" />
                        {pkg.sender.name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {pkg.sender.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {pkg.sender.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <User className="h-4 w-4" />
                        {pkg.recipient.name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {pkg.recipient.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {pkg.recipient.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {pkg.driver ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <User className="h-4 w-4" />
                          {pkg.driver.name}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          {pkg.driver.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Truck className="h-4 w-4" />
                          Vehicle: {pkg.driver.vehicleId}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusColor(pkg.status)
                      }`}>
                        {pkg.status.replace('_', ' ')}
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-500">
                          Created: {format(new Date(pkg.timeline.created), 'MMM d, h:mm a')}
                        </p>
                        {pkg.timeline.pickup && (
                          <p className="text-xs text-gray-500">
                            Pickup: {format(new Date(pkg.timeline.pickup), 'MMM d, h:mm a')}
                          </p>
                        )}
                        {pkg.timeline.delivery && (
                          <p className="text-xs text-gray-500">
                            Delivery: {format(new Date(pkg.timeline.delivery), 'MMM d, h:mm a')}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {mockPackages.length} of {mockPackages.length} packages
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