import React from 'react';
import AdminNav from '../components/admin/AdminNav';
import AccountingDashboard from '../components/admin/AccountingDashboard';

export default function AccountingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <AccountingDashboard />
    </div>
  );
}