'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Airline {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  airline: Airline;
  _count?: {
    ratings: number;
    reviews: number;
  };
}

export default function AirlineDetailPage() {
  const params = useParams();
  const [airline, setAirline] = useState<Airline | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchAirlineDetails();
      fetchAirlineFlights();
    }
  }, [params.id]);

  const fetchAirlineDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/airlines?id=${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch airline details');
      }
      
      const data = await response.json();
      if (data.length > 0) {
        setAirline(data[0]);
      } else {
        setError('Airline not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAirlineFlights = async () => {
    try {
      const response = await fetch(`/api/flights?airlineId=${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch airline flights');
      }
      
      const data = await response.json();
      setFlights(data);
    } catch (err) {
      console.error('Error fetching flights:', err);
    }
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2">Loading airline details...</p>
      </div>
    );
  }

  if (error || !airline) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Airline not found'}
        </div>
        <div className="mt-4">
          <Link href="/airlines" className="text-blue-600 hover:underline">
            ← Back to airlines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/airlines" className="text-blue-600 hover:underline">
          ← Back to airlines
        </Link>
      </div>

      {/* Airline Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{airline.name}</h1>
            {airline.logo && (
              <img 
                src={airline.logo} 
                alt={airline.name} 
                className="h-16 w-auto object-contain mb-4"
              />
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">About {airline.name}</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {airline.description || 'No description available.'}
          </p>
        </div>
      </div>

      {/* Flights List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Flights ({flights.length})</h2>
        
        {flights.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No flights found for this airline.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {flights.map((flight) => (
              <div key={flight.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <span className="font-bold text-lg mr-2">{flight.flightNumber}</span>
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
                        {flight._count?.ratings || 0} ratings • {flight._count?.reviews || 0} reviews
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}