import { NextRequest, NextResponse } from 'next/server';
import { ClientDataService } from '@/data/clientData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    if (!query || query.length < 2) {
      return NextResponse.json({
        clients: [],
        totalCount: 0,
        page,
        limit,
        totalPages: 0
      });
    }

    // Get all clients (in real app, this would be a database query)
    const allClients = ClientDataService.getClients();

    // Filter clients based on search query
    const filteredClients = allClients.filter(client => {
      const searchLower = query.toLowerCase();
      const matchesSearch = 
        client.name.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.company.toLowerCase().includes(searchLower) ||
        client.trustType.toLowerCase().includes(searchLower);

      const matchesStatus = !status || status === 'All' || client.status === status;

      return matchesSearch && matchesStatus;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    return NextResponse.json({
      clients: paginatedClients,
      totalCount: filteredClients.length,
      page,
      limit,
      totalPages: Math.ceil(filteredClients.length / limit)
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
