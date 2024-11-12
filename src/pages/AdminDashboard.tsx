import React from 'react';
import AdminNav from '../components/admin/AdminNav';
import Dashboard from '../components/admin/Dashboard';
import ConfigPanel from '../components/admin/ConfigPanel';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <Dashboard />
      <ConfigPanel />
    </div>
  );
}