import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Rate Your Flight Experience
              </h1>
              <p className="text-xl mb-8">
                Share your flight experiences and help others make informed
                travel decisions. Rate various aspects of your journey and
                provide valuable feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/flights"
                  className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                >
                  Browse Flights
                </Link>
                <Link
                  href="/login"
                  className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                >
                  Sign In to Rate
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/globe.svg"
                alt="Flight Evaluation"
                width={400}
                height={400}
                className="dark:invert"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Find Your Flight</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Search for your recent flight by airline, route, or flight
                number to get started.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">
                Rate Your Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rate different aspects of your flight experience from check-in
                to landing.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Share Your Review</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Write a detailed review to help other travelers make informed
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Airlines Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Airlines
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              "Emirates",
              "Qatar Airways",
              "Singapore Airlines",
              "Lufthansa",
            ].map((airline) => (
              <div
                key={airline}
                className="p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{airline}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  View ratings & reviews
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/airlines"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Airlines →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Share Your Flight Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of travelers and help improve the flying
            experience for everyone.
          </p>
          <Link
            href="/register"
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold inline-block transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
