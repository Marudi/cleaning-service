import React from 'react';
import AdminNav from '../components/admin/AdminNav';
import StaffScheduling from '../components/admin/StaffScheduling';

export default function CleanerSchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <StaffScheduling />
    </div>
  );
}