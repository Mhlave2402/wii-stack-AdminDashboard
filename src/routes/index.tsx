import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Zones } from '../pages/Zones';
import { Trips } from '../pages/Trips';
import { BannerAds } from '../pages/promotions/BannerAds';
import { Coupons } from '../pages/promotions/Coupons';
import { GiftCards } from '../pages/promotions/GiftCards';
import { Customers } from '../pages/users/Customers';
import { Drivers } from '../pages/users/Drivers';
import { Employees } from '../pages/users/Employees';
import { Packages } from '../pages/Packages';
import { Vehicles } from '../pages/Vehicles';
import { Fares } from '../pages/Fares';
import { Reports } from '../pages/Reports';
import { Settings } from '../pages/Settings';
import { Profile } from '../pages/profile/Profile';
import { FleetManagement } from '../pages/fleet/FleetManagement';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/zones" element={<Zones />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/promotions/banners" element={<BannerAds />} />
      <Route path="/promotions/coupons" element={<Coupons />} />
      <Route path="/promotions/gift-cards" element={<GiftCards />} />
      <Route path="/users/customers" element={<Customers />} />
      <Route path="/users/drivers" element={<Drivers />} />
      <Route path="/users/employees" element={<Employees />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/fares" element={<Fares />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/fleet" element={<FleetManagement />} />
    </Routes>
  );
};