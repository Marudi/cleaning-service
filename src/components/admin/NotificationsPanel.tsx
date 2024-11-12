import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'success' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationsPanel() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'alert',
      message: 'Sarah Johnson reported equipment malfunction',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      type: 'success',
      message: 'All scheduled cleanings completed for today',
      timestamp: new Date(Date.now() - 3600000),
      read: true
    }
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Clock className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        </div>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {notifications.filter(n => !n.read).length} new
        </span>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {!notification.read && (
                  <div className="ml-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700">
          View All Notifications
        </button>
      </div>
    </div>
  );
}