import React from 'react';
import AdminNav from '../components/admin/AdminNav';
import FrontDeskDashboard from '../components/admin/FrontDeskDashboard';

export default function FrontDeskPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <FrontDeskDashboard />
    </div>
  );
}