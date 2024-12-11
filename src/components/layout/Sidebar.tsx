import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, ChevronDown, ChevronRight, LayoutDashboard, Users, Map, 
  Car, Package, Tag, Gift, Brain, Settings, TrendingUp, Users2, 
  UserCog, Image, Ticket, FileText, Truck
} from 'lucide-react';

interface NavItem {
  icon: React.FC<any>;
  label: string;
  path?: string;
  children?: {
    label: string;
    path: string;
  }[];
}

interface SidebarProps {
  items: NavItem[];
  currentPath: string;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Map, label: 'Zones', path: '/zones' },
  { icon: TrendingUp, label: 'Trips', path: '/trips' },
  { 
    icon: Gift, 
    label: 'Promotions',
    children: [
      { label: 'Banner Ads', path: '/promotions/banners' },
      { label: 'Coupons', path: '/promotions/coupons' },
      { label: 'Gift Cards', path: '/promotions/gift-cards' }
    ]
  },
  { 
    icon: Users,
    label: 'Users',
    children: [
      { label: 'Customers', path: '/users/customers' },
      { label: 'Drivers', path: '/users/drivers' },
      { label: 'Employees', path: '/users/employees' }
    ]
  },
  { icon: Package, label: 'Packages', path: '/packages' },
  { icon: Car, label: 'Vehicles', path: '/vehicles' },
  { icon: Truck, label: 'Fleet Management', path: '/fleet' },
  { icon: Tag, label: 'Fares', path: '/fares' },
  { icon: Brain, label: 'ML Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path: string) => currentPath === path;
  const isExpandedOrActive = (item: NavItem) => {
    if (item.path && isActive(item.path)) return true;
    if (item.children) {
      return item.children.some(child => isActive(child.path)) || 
             expandedItems.includes(item.label);
    }
    return false;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200">
      <div className="flex items-center gap-2 px-6 h-16 border-b border-gray-200">
        <Box className="h-8 w-8 text-blue-600" />
        <span className="font-bold text-xl">Wii Stack</span>
      </div>
      
      <nav className="p-4">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <div className="mb-1">
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isExpandedOrActive(item)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {expandedItems.includes(item.label) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {expandedItems.includes(item.label) && (
                  <div className="ml-11 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-4 py-2 rounded-lg text-sm ${
                          isActive(child.path)
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path!}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  isActive(item.path!)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};