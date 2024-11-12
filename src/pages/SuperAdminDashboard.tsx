import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Settings, Database, Shield, 
  LogOut, Activity, Server
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold">SuperAdmin Dashboard</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/superadmin/login');
              }}
              className="flex items-center text-gray-300 hover:text-white"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Server Status</span>
                <span className="text-green-600">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Database</span>
                <span className="text-green-600">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Backup</span>
                <span className="text-gray-900">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Manage Administrators
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                User Permissions
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Access Logs
              </button>
            </div>
          </div>

          {/* System Configuration */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">System Config</h2>
              <Settings className="h-5 w-5 text-purple-500" />
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Global Settings
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Email Configuration
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Security Settings
              </button>
            </div>
          </div>

          {/* Database Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Database</h2>
              <Database className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Backup Management
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Data Migration
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Query Console
              </button>
            </div>
          </div>

          {/* Server Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Servers</h2>
              <Server className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Server Status
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Performance Metrics
              </button>
              <button className="w-full text-left px-4 py-2 rounded bg-gray-50 hover:bg-gray-100">
                Error Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}