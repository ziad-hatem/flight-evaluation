'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Flight Evaluation</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Flight Evaluation is dedicated to improving air travel by providing a platform where passengers can share their
          experiences and insights. We believe that transparent, honest reviews help airlines improve their services and
          assist travelers in making informed decisions.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Our goal is to create the most comprehensive and reliable flight review platform, empowering travelers
          worldwide to voice their opinions and helping airlines to understand their customers better.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">For Travelers</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Find detailed reviews of flights and airlines</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Share your own flight experiences</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Rate various aspects of your journey</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Make informed decisions for future travel</span>
            </li>
          </ul>
          <div className="mt-4">
            <Link 
              href="/flights"
              className="text-blue-600 hover:underline"
            >
              Browse Flights →
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">For Airlines</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Gain valuable customer feedback</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Identify areas for service improvement</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Showcase your airline's strengths</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Engage with customer reviews</span>
            </li>
          </ul>
          <div className="mt-4">
            <Link 
              href="/airlines"
              className="text-blue-600 hover:underline"
            >
              View Airlines →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Find Your Flight</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Search for your recent flight by airline, route, or flight number.
            </p>
          </div>
          
          <div className="p-4">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Rate Your Experience</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Rate different aspects of your flight from check-in to landing.
            </p>
          </div>
          
          <div className="p-4">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Share Your Review</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Write a detailed review to help other travelers make informed decisions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Our Team</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Flight Evaluation was created by a team of passionate travelers and aviation enthusiasts who believe in the power of
          community-driven reviews. Our diverse team brings together expertise in aviation, technology, and customer experience.
        </p>
        
        <div className="flex justify-center">
          <Link 
            href="/contact"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}