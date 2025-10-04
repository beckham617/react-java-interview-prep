import { Client } from '@/types/client';

// Mock client data
const mockClients: Client[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    company: 'Smith Enterprises',
    trustType: 'Family Trust',
    accountValue: '$2,450,000',
    status: 'Active',
    joinDate: '2023-01-15',
    lastContact: '2024-01-10',
    riskProfile: 'Conservative'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 234-5678',
    company: 'TechCorp Solutions',
    trustType: 'Charitable Trust',
    accountValue: '$5,200,000',
    status: 'Active',
    joinDate: '2022-08-22',
    lastContact: '2024-01-08',
    riskProfile: 'Moderate'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'm.chen@globalfinance.com',
    phone: '+1 (555) 345-6789',
    company: 'Global Finance Ltd',
    trustType: 'Investment Trust',
    accountValue: '$8,750,000',
    status: 'Active',
    joinDate: '2021-12-05',
    lastContact: '2024-01-12',
    riskProfile: 'Aggressive'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    email: 'emily.r@healthcare.org',
    phone: '+1 (555) 456-7890',
    company: 'Healthcare Foundation',
    trustType: 'Charitable Trust',
    accountValue: '$12,300,000',
    status: 'Active',
    joinDate: '2020-06-18',
    lastContact: '2024-01-05',
    riskProfile: 'Conservative'
  },
  {
    id: 5,
    name: 'David Thompson',
    email: 'david.t@realestate.com',
    phone: '+1 (555) 567-8901',
    company: 'Thompson Real Estate',
    trustType: 'Family Trust',
    accountValue: '$3,800,000',
    status: 'Pending',
    joinDate: '2023-11-30',
    lastContact: '2023-12-28',
    riskProfile: 'Moderate'
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    email: 'lisa.a@consulting.com',
    phone: '+1 (555) 678-9012',
    company: 'Anderson Consulting',
    trustType: 'Investment Trust',
    accountValue: '$6,500,000',
    status: 'Active',
    joinDate: '2022-03-14',
    lastContact: '2024-01-09',
    riskProfile: 'Moderate'
  },
  {
    id: 7,
    name: 'Robert Wilson',
    email: 'robert.w@manufacturing.com',
    phone: '+1 (555) 789-0123',
    company: 'Wilson Manufacturing',
    trustType: 'Family Trust',
    accountValue: '$4,200,000',
    status: 'Inactive',
    joinDate: '2021-09-08',
    lastContact: '2023-10-15',
    riskProfile: 'Conservative'
  },
  {
    id: 8,
    name: 'Jennifer Brown',
    email: 'jennifer.b@retail.com',
    phone: '+1 (555) 890-1234',
    company: 'Brown Retail Group',
    trustType: 'Charitable Trust',
    accountValue: '$7,100,000',
    status: 'Active',
    joinDate: '2022-01-20',
    lastContact: '2024-01-11',
    riskProfile: 'Moderate'
  },
  // Additional clients for better chart visualization
  {
    id: 9,
    name: 'Alex Martinez',
    email: 'alex.m@techstartup.com',
    phone: '+1 (555) 111-2222',
    company: 'TechStartup Inc',
    trustType: 'Investment Trust',
    accountValue: '$1,500,000',
    status: 'Active',
    joinDate: '2024-01-15',
    lastContact: '2024-01-15',
    riskProfile: 'Aggressive'
  },
  {
    id: 10,
    name: 'Maria Garcia',
    email: 'maria.g@familyoffice.com',
    phone: '+1 (555) 333-4444',
    company: 'Garcia Family Office',
    trustType: 'Family Trust',
    accountValue: '$9,200,000',
    status: 'Active',
    joinDate: '2024-01-10',
    lastContact: '2024-01-10',
    riskProfile: 'Conservative'
  },
  {
    id: 11,
    name: 'James Wilson',
    email: 'james.w@philanthropy.org',
    phone: '+1 (555) 555-6666',
    company: 'Wilson Philanthropy',
    trustType: 'Charitable Trust',
    accountValue: '$15,000,000',
    status: 'Active',
    joinDate: '2023-12-20',
    lastContact: '2024-01-12',
    riskProfile: 'Moderate'
  },
  {
    id: 12,
    name: 'Sarah Davis',
    email: 'sarah.d@investment.com',
    phone: '+1 (555) 777-8888',
    company: 'Davis Investment Group',
    trustType: 'Investment Trust',
    accountValue: '$6,800,000',
    status: 'Active',
    joinDate: '2023-12-05',
    lastContact: '2024-01-08',
    riskProfile: 'Aggressive'
  }
];

// LocalStorage key for client data
const CLIENTS_STORAGE_KEY = 'trust_company_clients';

// Client data service class
export class ClientDataService {
  // Get all clients from localStorage or return mock data if none exists
  static getClients(): Client[] {
    if (typeof window === 'undefined') {
      // Server-side rendering fallback
      return mockClients;
    }

    try {
      const storedData = localStorage.getItem(CLIENTS_STORAGE_KEY);
      if (storedData) {
        const clients = JSON.parse(storedData);
        return Array.isArray(clients) ? clients : mockClients;
      }
    } catch (error) {
      console.error('Error loading clients from localStorage:', error);
    }

    // If no data in localStorage, initialize with mock data
    this.saveClients(mockClients);
    return mockClients;
  }

  // Save clients to localStorage
  static saveClients(clients: Client[]): void {
    if (typeof window === 'undefined') {
      return; // Skip on server-side
    }

    try {
      localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
    } catch (error) {
      console.error('Error saving clients to localStorage:', error);
    }
  }

  // Add a new client
  static addClient(client: Omit<Client, 'id'>): Client {
    const clients = this.getClients();
    const newClient: Client = {
      ...client,
      id: Math.max(...clients.map(c => c.id), 0) + 1
    };
    
    const updatedClients = [...clients, newClient];
    this.saveClients(updatedClients);
    return newClient;
  }

  // Update an existing client
  static updateClient(id: number, updates: Partial<Client>): Client | null {
    const clients = this.getClients();
    const clientIndex = clients.findIndex(c => c.id === id);
    
    if (clientIndex === -1) {
      return null;
    }

    const updatedClient = { ...clients[clientIndex], ...updates };
    const updatedClients = [...clients];
    updatedClients[clientIndex] = updatedClient;
    
    this.saveClients(updatedClients);
    return updatedClient;
  }

  // Delete a client
  static deleteClient(id: number): boolean {
    const clients = this.getClients();
    const updatedClients = clients.filter(c => c.id !== id);
    
    if (updatedClients.length === clients.length) {
      return false; // Client not found
    }

    this.saveClients(updatedClients);
    return true;
  }

  // Get a client by ID
  static getClientById(id: number): Client | null {
    const clients = this.getClients();
    return clients.find(c => c.id === id) || null;
  }

  // Reset to mock data (useful for development/testing)
  static resetToMockData(): void {
    this.saveClients(mockClients);
  }

  // Clear all client data
  static clearAllData(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.removeItem(CLIENTS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing client data:', error);
    }
  }

  // Get client statistics
  static getClientStats() {
    const clients = this.getClients();
    
    return {
      total: clients.length,
      active: clients.filter(c => c.status === 'Active').length,
      pending: clients.filter(c => c.status === 'Pending').length,
      inactive: clients.filter(c => c.status === 'Inactive').length,
      totalAUM: clients.reduce((sum, client) => {
        const value = parseFloat(client.accountValue.replace(/[$,]/g, ''));
        return sum + (isNaN(value) ? 0 : value);
      }, 0)
    };
  }
}

// Export mock data for direct access if needed
export { mockClients };
