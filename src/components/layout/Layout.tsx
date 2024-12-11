import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { 
  LayoutDashboard, Users, Map, Car, Package, Tag, 
  Gift, Brain, Settings, TrendingUp, Users2, UserCog,
  Image, Ticket, FileText
} from 'lucide-react';

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
  { icon: Tag, label: 'Fares', path: '/fares' },
  { icon: Brain, label: 'ML Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar items={navItems} currentPath={location.pathname} />
      <div className="ml-64 min-h-screen">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};