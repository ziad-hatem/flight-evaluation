'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    category: '',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // In a real application, this would send data to an API endpoint
      // For now, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form after successful submission
      setFormData({
        category: '',
        rating: 5,
        comment: ''
      });
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError('Failed to submit feedback. Please try again later.');
      console.error('Feedback form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We value your feedback! Please let us know how we can improve the Flight Evaluation platform.
          Your suggestions help us make the platform better for everyone.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your feedback has been submitted successfully. We appreciate your input!
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Another Feedback
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Submit Your Feedback</h2>
            
            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{submitError}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Feedback Category</label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select a category</option>
                  <option value="ui">User Interface</option>
                  <option value="features">Features</option>
                  <option value="bugs">Bug Report</option>
                  <option value="content">Content</option>
                  <option value="performance">Performance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Overall Rating</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="text-2xl focus:outline-none"
                    >
                      <span className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    ({formData.rating} of 5)
                  </span>
                </div>
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-1">Your Feedback</label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={5}
                  required
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Please share your thoughts, suggestions, or report issues..."
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you prefer to contact us directly or have specific questions, you can also:
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>
              Visit our <Link href="/contact" className="text-blue-600 hover:underline">Contact Page</Link> to send us a message
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>
              Email us directly at <span className="font-medium">feedback@flightevaluation.com</span>
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>
              Follow us on social media for updates and to send us direct messages
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}