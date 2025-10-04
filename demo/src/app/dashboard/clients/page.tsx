'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import ClientDetailModal from '@/components/modals/clients/ClientDetailModal';
import AddClientModal from '@/components/modals/clients/AddClientModal';
import ClientSearchInput from '@/components/search/ClientSearchInput';
import { ClientDataService } from '@/data/clientData';
import { Users, UserPlus, FileText, Mail, Search, Filter, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Client } from '@/types/client';


export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [displayedClients, setDisplayedClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Load clients from localStorage on component mount
  useEffect(() => {
    const loadedClients = ClientDataService.getClients();
    setClients(loadedClients);
    setDisplayedClients(loadedClients);
  }, []);

  // Handle search results from API
  const handleSearchResults = useCallback((searchResults: Client[], loading: boolean, error: string | null, currentSearchTerm: string) => {
    if (!loading && !error) {
      // Only show all clients when search term is completely empty
      if (currentSearchTerm.length === 0) {
        setDisplayedClients(clients);
        setIsSearchMode(false);
        setSearchTerm('');
        setShowNoResults(false);
      } else {
        // For any search term (even if no results), show search results
        setDisplayedClients(searchResults);
        setIsSearchMode(true);
        setSearchTerm(currentSearchTerm);
        
        // Reset no results state when new search results come in
        setShowNoResults(false);
      }
    }
  }, [clients]);

  // Reset to show all clients when search is cleared
  const handleClearSearch = useCallback(() => {
    setDisplayedClients(clients);
    setIsSearchMode(false);
    setSearchTerm('');
    setShowNoResults(false);
  }, [clients]);

  // Handle delayed "no results" display
  useEffect(() => {
    if (isSearchMode && displayedClients.length === 0 && searchTerm.length > 0) {
      const timer = setTimeout(() => {
        setShowNoResults(true);
      }, 1000); // 1 second delay before showing "no results"

      return () => clearTimeout(timer);
    } else {
      setShowNoResults(false);
    }
  }, [isSearchMode, displayedClients.length, searchTerm.length]);

  // Filter displayed clients based on status (search results are already filtered by API)
  const filteredClients = displayedClients.filter(client => {
    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
    return matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm, recordsPerPage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Conservative': return 'text-green-600';
      case 'Moderate': return 'text-yellow-600';
      case 'Aggressive': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  function handleViewClient(id: number): void {
    const client = clients.find(c => c.id === id);
    if (client) {
      setSelectedClient(client);
      setIsModalOpen(true);
    }
  }

  function closeModal(): void {
    setIsModalOpen(false);
    setSelectedClient(null);
  }

  function handleEditClient(client: Client): void {
    console.log('Editing client:', client);
    // TODO: Implement edit functionality
  }

  function handleSendMessage(client: Client): void {
    console.log('Sending message to client:', client);
    // TODO: Implement send message functionality
  }

  function handleAddClient(newClient: Omit<Client, 'id'>): void {
    const addedClient = ClientDataService.addClient(newClient);
    setClients(ClientDataService.getClients());
    console.log('Added new client:', addedClient);
  }

  function handleDeleteClient(id: number): void {
    if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      const success = ClientDataService.deleteClient(id);
      if (success) {
        // Update local state
        const updatedClients = clients.filter(client => client.id !== id);
        setClients(updatedClients);
        setDisplayedClients(updatedClients);
        
        // Close modal if the deleted client was selected
        if (selectedClient && selectedClient.id === id) {
          closeModal();
        }
        
        console.log('Client deleted successfully');
      } else {
        console.error('Failed to delete client');
        alert('Failed to delete client. Please try again.');
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600">Manage trust company clients and their accounts</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="theme-button px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Client</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total Clients</h3>
                <p className="text-2xl font-bold text-blue-600">{clients.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-50 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active Clients</h3>
                <p className="text-2xl font-bold text-green-600">
                  {clients.filter(c => c.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-50 p-3 rounded-full">
                <Mail className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {clients.filter(c => c.status === 'Pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-50 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total AUM</h3>
                <p className="text-2xl font-bold text-purple-600">$50.3M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <ClientSearchInput
                onResultsChange={handleSearchResults}
                placeholder="Search clients by name, email, company, or trust type..."
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
              {/* <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Search Mode Indicator */}
        {/* {isSearchMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Showing search results for "{searchTerm}"
                </span>
              </div>
              <button
                onClick={handleClearSearch}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Show all clients
              </button>
            </div>
          </div>
        )} */}

        {/* Loading State */}
        {isSearchMode && !showNoResults && paginatedClients.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Searching...</h3>
            <p className="text-gray-600">
              Looking for clients matching "{searchTerm}"
            </p>
          </div>
        )}

        {/* No Results Message */}
        {isSearchMode && showNoResults && paginatedClients.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600 mb-4">
              No clients match your search criteria for "{searchTerm}"
            </p>
            <button
              onClick={handleClearSearch}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Show all clients
            </button>
          </div>
        )}

        {/* Data Table */}
        {(!isSearchMode || paginatedClients.length > 0) && (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trust Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Profile
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Contact
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.company}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">{client.email}</div>
                            <div className="text-sm text-gray-500">{client.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {client.trustType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {client.accountValue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${getRiskColor(client.riskProfile)}`}>
                            {client.riskProfile}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.lastContact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900" onClick={() => handleViewClient(client.id)}>
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDeleteClient(client.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(endIndex, filteredClients.length)}</span> of{' '}
                    <span className="font-medium">{filteredClients.length}</span> results
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Show:</span>
                    <select
                      value={recordsPerPage}
                      onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={100}>100</option>
                    </select>
                    <span className="text-sm text-gray-700">per page</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-[#726acf] text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      if (pageNum > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 text-sm rounded ${
                            currentPage === pageNum
                              ? 'bg-[#271e76] text-white'
                              : 'border border-gray-300 hover:bg-[#726acf] text-gray-900'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-[#726acf] text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Client Detail Modal */}
        <ClientDetailModal
          client={selectedClient}
          isOpen={isModalOpen}
          onClose={closeModal}
          onEdit={handleEditClient}
          onSendMessage={handleSendMessage}
        />

        {/* Add Client Modal */}
        <AddClientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddClient={handleAddClient}
        />
      </div>
    </DashboardLayout>
  );
}
