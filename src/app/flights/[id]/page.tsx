'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface Rating {
  id: string;
  userId: string;
  flightId: string;
  checkIn: number;
  boardingExp: number;
  cabinCrew: number;
  seatComfort: number;
  foodQuality: number;
  entertainment: number;
  flightPerf: number;
  valueForMoney: number;
  overallRating: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  flight: Flight;
}

interface Review {
  id: string;
  userId: string;
  flightId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  flight: Flight;
}

export default function FlightDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState({
    checkIn: 0,
    boardingExp: 0,
    cabinCrew: 0,
    seatComfort: 0,
    foodQuality: 0,
    entertainment: 0,
    flightPerf: 0,
    valueForMoney: 0,
    overallRating: 0,
  });
  const [reviewContent, setReviewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [session, setSession] = useState<{ user?: { id: string } } | null>(null);
  const [userHasRated, setUserHasRated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const sessionData = await res.json();
        setSession(sessionData);
      } catch (err) {
        console.error('Failed to fetch session:', err);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (params.id) {
      fetchFlightDetails();
      fetchRatings();
      fetchReviews();
    }
  }, [params.id]);

  useEffect(() => {
    if (session?.user?.id && ratings.length > 0) {
      const existingRating = ratings.find(r => r.userId === session.user?.id);
      if (existingRating) {
        setUserHasRated(true);
        setUserRating({
          checkIn: existingRating.checkIn,
          boardingExp: existingRating.boardingExp,
          cabinCrew: existingRating.cabinCrew,
          seatComfort: existingRating.seatComfort,
          foodQuality: existingRating.foodQuality,
          entertainment: existingRating.entertainment,
          flightPerf: existingRating.flightPerf,
          valueForMoney: existingRating.valueForMoney,
          overallRating: existingRating.overallRating,
        });
      }
    }
  }, [session, ratings]);

  const fetchFlightDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/flights?id=${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch flight details');
      }
      
      const data = await response.json();
      if (data.length > 0) {
        setFlight(data[0]);
      } else {
        setError('Flight not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await fetch(`/api/ratings?flightId=${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ratings');
      }
      
      const data = await response.json();
      setRatings(data);
    } catch (err) {
      console.error('Error fetching ratings:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?flightId=${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleRatingChange = (category: string, value: number) => {
    setUserRating(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value);
  };

  const submitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightId: params.id,
          ...userRating
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      // Refresh ratings
      fetchRatings();
      setUserHasRated(true);
    } catch (err) {
      console.error('Error submitting rating:', err);
      alert('Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }

    if (!reviewContent.trim()) {
      alert('Please enter a review');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightId: params.id,
          content: reviewContent
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Refresh reviews and clear form
      fetchReviews();
      setReviewContent('');
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  const calculateAverageRating = (category: keyof typeof userRating) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating[category], 0);
    return (sum / ratings.length).toFixed(1);
  };

  const StarRating = ({ value, onChange, readOnly = false }: { value: number, onChange?: (value: number) => void, readOnly?: boolean }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readOnly && onChange && onChange(star)}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} ${star <= value ? 'text-yellow-400' : 'text-gray-300'} text-2xl focus:outline-none`}
            disabled={readOnly}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2">Loading flight details...</p>
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Flight not found'}
        </div>
        <div className="mt-4">
          <Link href="/flights" className="text-blue-600 hover:underline">
            ← Back to flights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/flights" className="text-blue-600 hover:underline">
          ← Back to flights
        </Link>
      </div>

      {/* Flight Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{flight.airline.name} {flight.flightNumber}</h1>
            <p className="text-gray-600 dark:text-gray-400">{flight.origin} to {flight.destination}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-yellow-500 mr-2">{calculateAverageRating('overallRating')}</div>
              <StarRating value={parseFloat(calculateAverageRating('overallRating'))} readOnly />
              <span className="ml-2 text-gray-600 dark:text-gray-400">({ratings.length} ratings)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Flight Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Departure</p>
                <p className="font-semibold">{formatDate(flight.departureTime)}</p>
                <p className="text-lg font-bold">{flight.origin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Arrival</p>
                <p className="font-semibold">{formatDate(flight.arrivalTime)}</p>
                <p className="text-lg font-bold">{flight.destination}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Airline Information</h2>
            <p>{flight.airline.description || 'No description available.'}</p>
          </div>
        </div>
      </div>

      {/* Ratings Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Ratings Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Check-in Experience</p>
            <div className="flex items-center">
              <span className="font-bold mr-2">{calculateAverageRating('checkIn')}</span>
              <StarRating value={parseFloat(calculateAverageRating('checkIn'))} readOnly />
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Boarding Experience</p>
            <div className="flex items-center">
              <span className="font-bold mr-2">{calculateAverageRating('boardingExp')}</span>
              <StarRating value={parseFloat(calculateAverageRating('boardingExp'))} readOnly />
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Cabin Crew</p>
            <div className="flex items-center">
              <span className="font-bold mr-2">{calculateAverageRating('cabinCrew')}</span>
              <StarRating value={parseFloat(calculateAverageRating('cabinCrew'))} readOnly />
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Seat Comfort</p>
            <div className="flex items-center">
              <span className="font-bold mr-2">{calculateAverageRating('seatComfort')}</span>
              <StarRating value={parseFloat(calculateAverageRating('seatComfort'))} readOnly />
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Food Quality</p>
            <div className="flex items-center">
              <span className="font-bold mr-2">{calculateAverageRating('foodQuality')}</span>
              <StarRating value={parseFloat(calculateAverageRating('foodQuality'))} readOnly />
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Entertainment</p>
            <div className="flex items-center">
              <span className="font-bold mr-2">{calculateAverageRating('entertainment')}</span>
              <StarRating value={parseFloat(calculateAverageRating('entertainment'))} readOnly />
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Flight Performance</p>
            <div className="flex items-center">
              <span className="font-bold mr-2">{calculateAverageRating('flightPerf')}</span>
              <StarRating value={parseFloat(calculateAverageRating('flightPerf'))} readOnly />
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Value for Money</p>
            <div className="flex items-center">
              <span className="font-bold mr-2">{calculateAverageRating('valueForMoney')}</span>
              <StarRating value={parseFloat(calculateAverageRating('valueForMoney'))} readOnly />
            </div>
          </div>
        </div>
      </div>

      {/* Rate This Flight */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Rate This Flight</h2>
        {!session ? (
          <div className="text-center py-4">
            <p className="mb-4">Please sign in to rate this flight</p>
            <Link 
              href={`/login?callbackUrl=/flights/${params.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={submitRating}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Check-in Experience</label>
                <StarRating 
                  value={userRating.checkIn} 
                  onChange={(value) => handleRatingChange('checkIn', value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Boarding Experience</label>
                <StarRating 
                  value={userRating.boardingExp} 
                  onChange={(value) => handleRatingChange('boardingExp', value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cabin Crew</label>
                <StarRating 
                  value={userRating.cabinCrew} 
                  onChange={(value) => handleRatingChange('cabinCrew', value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Seat Comfort</label>
                <StarRating 
                  value={userRating.seatComfort} 
                  onChange={(value) => handleRatingChange('seatComfort', value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Food Quality</label>
                <StarRating 
                  value={userRating.foodQuality} 
                  onChange={(value) => handleRatingChange('foodQuality', value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Entertainment</label>
                <StarRating 
                  value={userRating.entertainment} 
                  onChange={(value) => handleRatingChange('entertainment', value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Flight Performance</label>
                <StarRating 
                  value={userRating.flightPerf} 
                  onChange={(value) => handleRatingChange('flightPerf', value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Value for Money</label>
                <StarRating 
                  value={userRating.valueForMoney} 
                  onChange={(value) => handleRatingChange('valueForMoney', value)} 
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Overall Rating</label>
              <StarRating 
                value={userRating.overallRating} 
                onChange={(value) => handleRatingChange('overallRating', value)} 
              />
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : userHasRated ? 'Update Rating' : 'Submit Rating'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Reviews */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Reviews ({reviews.length})</h2>
        
        {/* Add Review Form */}
        {session && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <form onSubmit={submitReview}>
              <div className="mb-4">
                <textarea
                  value={reviewContent}
                  onChange={handleReviewChange}
                  className="w-full p-3 border rounded-md"
                  rows={4}
                  placeholder="Share your experience with this flight..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review this flight!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="font-semibold">{review.user.name || 'Anonymous'}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}