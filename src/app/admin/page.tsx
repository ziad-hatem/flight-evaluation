"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
}

// Helper function to format date and time
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"airlines" | "flights">(
    "airlines"
  );
  const [airlineFormData, setAirlineFormData] = useState({
    name: "",
    logo: "",
    description: "",
  });
  const [flightFormData, setFlightFormData] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    airlineId: "",
  });
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    id: string;
    type: "airline" | "flight";
  } | null>(null);

  // Check authentication and admin status
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
      return;
    }

    // Check if user has admin role

    // if (session?.user?.role !== "ADMIN") {
    //   setError("You don't have permission to access this page");
    //   return;
    // }

    fetchAirlines();
    fetchFlights();
  }, [status, router, session]);

  const fetchAirlines = async () => {
    try {
      const response = await fetch("/api/airlines", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch airlines");
      const data = await response.json();
      setAirlines(data);
    } catch (err) {
      setError("Failed to load airlines");
      console.error(err);
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await fetch("/api/flights", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch flights");
      const data = await response.json();
      setFlights(data);
    } catch (err) {
      setError("Failed to load flights");
      console.error(err);
    }
  };

  const handleAirlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let url = "/api/airlines";
      let method = "POST";
      let successMessage = "Airline created successfully";

      // If editing, use PUT method and include ID in URL
      if (isEditing && editingId) {
        url = `/api/airlines/${editingId}`;
        method = "PUT";
        successMessage = "Airline updated successfully";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(airlineFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process airline");
      }

      setSuccess(successMessage);
      setAirlineFormData({ name: "", logo: "", description: "" });
      setIsEditing(false);
      setEditingId(null);
      fetchAirlines();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process airline"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFlightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validate form data
    if (
      !flightFormData.flightNumber ||
      !flightFormData.origin ||
      !flightFormData.destination ||
      !flightFormData.departureTime ||
      !flightFormData.arrivalTime ||
      !flightFormData.airlineId
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    // Validate departure and arrival times
    const departureTime = new Date(flightFormData.departureTime);
    const arrivalTime = new Date(flightFormData.arrivalTime);

    if (arrivalTime <= departureTime) {
      setError("Arrival time must be after departure time");
      setLoading(false);
      return;
    }

    try {
      let url = "/api/flights";
      let method = "POST";
      let successMessage = "Flight created successfully";

      // If editing, use PUT method and include ID in URL
      if (isEditing && editingId) {
        url = `/api/flights/${editingId}`;
        method = "PUT";
        successMessage = "Flight updated successfully";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(flightFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process flight");
      }

      setSuccess(successMessage);
      setFlightFormData({
        flightNumber: "",
        origin: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        airlineId: "",
      });
      setIsEditing(false);
      setEditingId(null);
      fetchFlights();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process flight");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: "airline" | "flight") => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setConfirmDelete(null);

    try {
      const url =
        type === "airline" ? `/api/airlines/${id}` : `/api/flights/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to delete ${type}`);
      }

      setSuccess(
        `${type === "airline" ? "Airline" : "Flight"} deleted successfully`
      );
      if (type === "airline") {
        fetchAirlines();
      } else {
        fetchFlights();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to delete ${type}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("airlines")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "airlines"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Airlines
        </button>
        <button
          onClick={() => setActiveTab("flights")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "flights"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Flights
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{success}</span>
        </div>
      )}

      {/* Airlines Management */}
      {activeTab === "airlines" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Airline" : "Add New Airline"}
            </h2>
            <form onSubmit={handleAirlineSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Airline Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={airlineFormData.name}
                  onChange={(e) =>
                    setAirlineFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="logo"
                  className="block text-sm font-medium mb-1"
                >
                  Logo URL
                </label>
                <input
                  type="url"
                  id="logo"
                  name="logo"
                  value={airlineFormData.logo}
                  onChange={(e) =>
                    setAirlineFormData((prev) => ({
                      ...prev,
                      logo: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={airlineFormData.description}
                  onChange={(e) =>
                    setAirlineFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {isEditing ? "Update Airline" : "Add Airline"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                      setAirlineFormData({
                        name: "",
                        logo: "",
                        description: "",
                      });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Airlines List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Logo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {airlines.map((airline) => (
                    <tr key={airline.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {airline.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {airline.logo && (
                          <img
                            src={airline.logo}
                            alt={airline.name}
                            className="h-8 w-8 object-contain"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4">{airline.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setEditingId(airline.id);
                              setAirlineFormData({
                                name: airline.name,
                                logo: airline.logo || "",
                                description: airline.description || "",
                              });
                              setActiveTab("airlines");
                              // Scroll to the form
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              setConfirmDelete({
                                id: airline.id,
                                type: "airline",
                              })
                            }
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Flights Management */}
      {activeTab === "flights" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Flight" : "Add New Flight"}
            </h2>
            <form onSubmit={handleFlightSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="flightNumber"
                    className="block text-sm font-medium mb-1"
                  >
                    Flight Number
                  </label>
                  <input
                    type="text"
                    id="flightNumber"
                    name="flightNumber"
                    value={flightFormData.flightNumber}
                    onChange={(e) =>
                      setFlightFormData((prev) => ({
                        ...prev,
                        flightNumber: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="airlineId"
                    className="block text-sm font-medium mb-1"
                  >
                    Airline
                  </label>
                  <select
                    id="airlineId"
                    name="airlineId"
                    value={flightFormData.airlineId}
                    onChange={(e) =>
                      setFlightFormData((prev) => ({
                        ...prev,
                        airlineId: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                    <option value="">Select an airline</option>
                    {airlines.map((airline) => (
                      <option key={airline.id} value={airline.id}>
                        {airline.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="origin"
                    className="block text-sm font-medium mb-1"
                  >
                    Origin
                  </label>
                  <input
                    type="text"
                    id="origin"
                    name="origin"
                    value={flightFormData.origin}
                    onChange={(e) =>
                      setFlightFormData((prev) => ({
                        ...prev,
                        origin: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium mb-1"
                  >
                    Destination
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={flightFormData.destination}
                    onChange={(e) =>
                      setFlightFormData((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="departureTime"
                    className="block text-sm font-medium mb-1"
                  >
                    Departure Time
                  </label>
                  <input
                    type="datetime-local"
                    id="departureTime"
                    name="departureTime"
                    value={flightFormData.departureTime}
                    onChange={(e) =>
                      setFlightFormData((prev) => ({
                        ...prev,
                        departureTime: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="arrivalTime"
                    className="block text-sm font-medium mb-1"
                  >
                    Arrival Time
                  </label>
                  <input
                    type="datetime-local"
                    id="arrivalTime"
                    name="arrivalTime"
                    value={flightFormData.arrivalTime}
                    onChange={(e) =>
                      setFlightFormData((prev) => ({
                        ...prev,
                        arrivalTime: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {isEditing ? "Update Flight" : "Add Flight"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                      setFlightFormData({
                        flightNumber: "",
                        origin: "",
                        destination: "",
                        departureTime: "",
                        arrivalTime: "",
                        airlineId: "",
                      });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Flights List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Flight Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Airline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Origin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Departure
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Arrival
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {flights.map((flight) => (
                    <tr key={flight.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {flight.flightNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {flight.airline.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {flight.origin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {flight.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDateTime(flight.departureTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDateTime(flight.arrivalTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setEditingId(flight.id);
                              setFlightFormData({
                                flightNumber: flight.flightNumber,
                                origin: flight.origin,
                                destination: flight.destination,
                                departureTime: new Date(flight.departureTime)
                                  .toISOString()
                                  .slice(0, 16),
                                arrivalTime: new Date(flight.arrivalTime)
                                  .toISOString()
                                  .slice(0, 16),
                                airlineId: flight.airline.id,
                              });
                              setActiveTab("flights");
                              // Scroll to the form
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              setConfirmDelete({
                                id: flight.id,
                                type: "flight",
                              })
                            }
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this {confirmDelete.type}? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const response = await fetch(
                      `/api/${confirmDelete.type}s/${confirmDelete.id}`,
                      {
                        method: "DELETE",
                      }
                    );

                    if (!response.ok) {
                      const data = await response.json();
                      throw new Error(
                        data.error || `Failed to delete ${confirmDelete.type}`
                      );
                    }

                    setSuccess(
                      `${
                        confirmDelete.type.charAt(0).toUpperCase() +
                        confirmDelete.type.slice(1)
                      } deleted successfully`
                    );

                    // Refresh the appropriate list
                    if (confirmDelete.type === "airline") {
                      fetchAirlines();
                    } else {
                      fetchFlights();
                    }
                  } catch (err) {
                    setError(
                      err instanceof Error
                        ? err.message
                        : `Failed to delete ${confirmDelete.type}`
                    );
                  } finally {
                    setLoading(false);
                    setConfirmDelete(null);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
