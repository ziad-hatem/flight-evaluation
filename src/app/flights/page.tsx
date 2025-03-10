'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Airline {
  id: string;
  name: string;
  logo?: string;
}

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  airline: Airline;
  _count: {
    ratings: number;
    reviews: number;
  };
}

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    airline: '',
    date: '',
  });
  const router = useRouter();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      let url = '/api/flights';
      
      // Add filters if they exist
      const params = new URLSearchParams();
      if (filters.origin) params.append('origin', filters.origin);
      if (filters.destination) params.append('destination', filters.destination);
      if (filters.airline) params.append('airline', filters.airline);
      if (filters.date) params.append('date', filters.date);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      
      const data = await response.json();
      setFlights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFlights();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Flights</h1>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter Flights</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium mb-1">Origin</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={filters.origin}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              placeholder="e.g. New York"
            />
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium mb-1">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={filters.destination}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              placeholder="e.g. London"
            />
          </div>
          <div>
            <label htmlFor="airline" className="block text-sm font-medium mb-1">Airline</label>
            <input
              type="text"
              id="airline"
              name="airline"
              value={filters.airline}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              placeholder="e.g. Emirates"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="md:col-span-4 flex justify-end">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
      
      {/* Flights List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2">Loading flights...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : flights.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg">No flights found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {flights.map((flight) => (
            <div key={flight.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <span className="font-bold text-lg mr-2">{flight.airline.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{flight.flightNumber}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Departure</p>
                        <p className="font-semibold">{formatDate(flight.departureTime)}</p>
                        <p className="text-lg font-bold">{flight.origin}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-600 relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-600"></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Arrival</p>
                        <p className="font-semibold">{formatDate(flight.arrivalTime)}</p>
                        <p className="text-lg font-bold">{flight.destination}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <div className="flex items-center mb-2">
                      <span className="text-sm mr-2">
                        {flight._count.ratings} ratings • {flight._count.reviews} reviews
                      </span>
                    </div>
                    <Link 
                      href={`/flights/${flight.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}