import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import StaffLogin from './pages/StaffLogin';
import SuperAdminLogin from './pages/SuperAdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AccountingDashboard from './pages/AccountingDashboard';
import FrontDeskDashboard from './pages/FrontDeskDashboard';
import CleanerSchedule from './pages/CleanerSchedule';
import StaffManagement from './pages/StaffManagement';
import InventoryManagement from './pages/InventoryManagement';
import JobApplicationsDashboard from './pages/JobApplicationsDashboard';
import RewardsPage from './pages/RewardsPage';
import Unauthorized from './pages/Unauthorized';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/rewards" element={<RewardsPage />} />
      
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin/accounting"
        element={
          <ProtectedRoute allowedRoles={['admin', 'accounting']}>
            <AccountingDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin/frontdesk"
        element={
          <ProtectedRoute allowedRoles={['admin', 'frontdesk']}>
            <FrontDeskDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/staff"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <StaffManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/inventory"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <InventoryManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/applications"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <JobApplicationsDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/staff/schedule"
        element={
          <ProtectedRoute allowedRoles={['admin', 'cleaner']}>
            <CleanerSchedule />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;