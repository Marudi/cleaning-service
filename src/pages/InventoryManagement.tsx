import React from 'react';
import AdminNav from '../components/admin/AdminNav';
import InventoryManager from '../components/admin/InventoryManagement';

export default function InventoryManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <InventoryManager />
    </div>
  );
}