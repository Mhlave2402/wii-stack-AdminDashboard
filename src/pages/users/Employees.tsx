import React, { useState } from 'react';
import { 
  Users, Briefcase, DollarSign, Clock, Search, Filter, 
  Plus, Download, Upload, Mail, Phone, MapPin, Calendar,
  Building, Shield, MoreVertical
} from 'lucide-react';
import { format } from 'date-fns';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  role: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'on_leave' | 'inactive';
  avatar?: string;
  manager: string;
  workHours: {
    scheduled: number;
    actual: number;
  };
  performance: {
    rating: number;
    lastReview: string;
  };
  permissions: string[];
}

const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    name: 'Robert Chen',
    email: 'robert@example.com',
    phone: '+1 234-567-8900',
    address: '123 Office St, New York, NY 10001',
    department: 'Operations',
    role: 'Operations Manager',
    joinDate: '2023-03-15T10:00:00Z',
    salary: 85000,
    status: 'active',
    manager: 'Sarah Williams',
    workHours: {
      scheduled: 40,
      actual: 42
    },
    performance: {
      rating: 4.8,
      lastReview: '2024-01-15T10:00:00Z'
    },
    permissions: ['manage_drivers', 'view_reports', 'manage_zones']
  },
  {
    id: 'EMP002',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    phone: '+1 234-567-8901',
    address: '456 Corp Ave, New York, NY 10002',
    department: 'Customer Support',
    role: 'Support Team Lead',
    joinDate: '2023-05-20T14:30:00Z',
    salary: 65000,
    status: 'active',
    manager: 'Robert Chen',
    workHours: {
      scheduled: 40,
      actual: 39
    },
    performance: {
      rating: 4.6,
      lastReview: '2024-01-20T10:00:00Z'
    },
    permissions: ['manage_tickets', 'view_customers']
  }
];

export const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const stats = [
    {
      title: 'Total Employees',
      value: '156',
      change: '+5 this month',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Average Performance',
      value: '4.6/5.0',
      change: '+0.2 from last quarter',
      icon: Briefcase,
      trend: 'up'
    },
    {
      title: 'Payroll (Monthly)',
      value: '$485.2K',
      change: '+3.5% from last month',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Avg. Work Hours',
      value: '39.5h',
      change: '-0.5h from last month',
      icon: Clock,
      trend: 'down'
    }
  ];

  const handleExportData = () => {
    console.log('Exporting employee data...');
  };

  const handleImportData = () => {
    console.log('Importing employee data...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Employee Management</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleImportData}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Employee
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
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="operations">Operations</option>
              <option value="support">Customer Support</option>
              <option value="hr">Human Resources</option>
              <option value="tech">Technology</option>
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
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role & Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
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
              {mockEmployees.map((employee) => (
                <tr 
                  key={employee.id}
                  className="hover:bg-gray-50"
                  onClick={() => setSelectedEmployee(employee.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {employee.avatar ? (
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <span className="text-blue-600 font-medium text-lg">
                            {employee.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {employee.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {employee.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Building className="h-4 w-4" />
                        {employee.department}
                      </div>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4" />
                        {employee.permissions.length} permissions
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        Rating: {employee.performance.rating}/5.0
                      </p>
                      <p className="text-sm text-gray-600">
                        {employee.workHours.actual}h worked this week
                      </p>
                      <p className="text-xs text-gray-500">
                        Last review: {format(new Date(employee.performance.lastReview), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusColor(employee.status)
                      }`}>
                        {employee.status.replace('_', ' ')}
                      </span>
                      <p className="text-xs text-gray-500">
                        Joined {format(new Date(employee.joinDate), 'MMM d, yyyy')}
                      </p>
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
              Showing {mockEmployees.length} of {mockEmployees.length} employees
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