// Mock data for development and testing
export const mockData = {
  users: [
    {
      id: '0',
      email: 'superadmin@imaryza.com',
      role: 'superadmin',
      name: 'Super Admin'
    },
    {
      id: '1',
      email: 'admin@imaryza.com',
      role: 'admin',
      name: 'Admin User'
    },
    {
      id: '2',
      email: 'accounting@imaryza.com',
      role: 'accounting',
      name: 'Accounting User'
    },
    {
      id: '3',
      email: 'frontdesk@imaryza.com',
      role: 'frontdesk',
      name: 'Front Desk User'
    },
    {
      id: '4',
      email: 'cleaner@imaryza.com',
      role: 'cleaner',
      name: 'Cleaner User'
    }
  ],

  staff: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Cleaner',
      email: 'sarah.j@imaryza.com',
      phone: '(555) 123-4567',
      status: 'active',
      rating: 4.8,
      completedJobs: 156,
      joinDate: '2023-06-15',
      certifications: ['Deep Clean', 'Bio-hazard', 'Window Specialist']
    }
  ],

  inventory: [
    {
      id: '1',
      name: 'Professional Vacuum Cleaner',
      category: 'Equipment',
      totalQuantity: 10,
      inUse: 7,
      available: 3,
      assignedTo: ['Sarah J.', 'Michael C.', 'Emma R.'],
      lastMaintenance: '2024-03-01',
      condition: 'good'
    }
  ],

  scheduleEvents: [
    {
      id: '1',
      staffId: '1',
      staffName: 'Sarah Johnson',
      location: '123 Main St',
      date: '2024-03-20',
      startTime: '09:00',
      endTime: '11:00',
      type: 'cleaning'
    }
  ],

  customerData: [
    {
      month: 'Jan',
      newCustomers: 45,
      recurring: 120,
      revenue: 28500,
      satisfaction: 4.8
    },
    {
      month: 'Feb',
      newCustomers: 52,
      recurring: 135,
      revenue: 32000,
      satisfaction: 4.9
    },
    {
      month: 'Mar',
      newCustomers: 48,
      recurring: 142,
      revenue: 30500,
      satisfaction: 4.7
    }
  ],

  revenueData: [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Feb', revenue: 52000, expenses: 34000, profit: 18000 },
    { month: 'Mar', revenue: 48000, expenses: 31000, profit: 17000 },
    { month: 'Apr', revenue: 61000, expenses: 35000, profit: 26000 },
    { month: 'May', revenue: 55000, expenses: 33000, profit: 22000 },
    { month: 'Jun', revenue: 67000, expenses: 38000, profit: 29000 }
  ],

  servicePerformance: [
    { name: 'Deep Clean', revenue: 28500, growth: 15, margin: 42 },
    { name: 'Basic Clean', revenue: 22000, growth: 8, margin: 38 },
    { name: 'Window Clean', revenue: 12500, growth: 12, margin: 45 },
    { name: 'Carpet Clean', revenue: 18000, growth: -3, margin: 40 },
    { name: 'Move Out', revenue: 15000, growth: 18, margin: 44 }
  ]
} as const;