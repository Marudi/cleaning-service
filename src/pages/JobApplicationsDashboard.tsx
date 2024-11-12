import React from 'react';
import AdminNav from '../components/admin/AdminNav';
import JobApplicationsDashboard from '../components/admin/JobApplicationsDashboard';

export default function JobApplicationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <JobApplicationsDashboard />
    </div>
  );
}