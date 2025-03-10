'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Welcome to Flight Evaluation. By accessing or using our platform, you agree to be bound by these Terms of Service.
          Please read these terms carefully before using our services.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            By accessing or using the Flight Evaluation platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to modify these terms at any time. Your continued use of the platform following the posting of changes constitutes your acceptance of such changes.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To access certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, not current, or incomplete.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">3. User Content</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our platform allows users to post reviews, ratings, and other content. By submitting content to our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content in any existing or future media.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li>You own the content or have the right to use and authorize us to use it</li>
            <li>The content is accurate and not misleading</li>
            <li>The content does not violate these Terms of Service</li>
            <li>The content does not infringe upon the rights of any third party</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to remove any content that violates these terms or that we find objectionable for any reason.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">4. Prohibited Activities</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You agree not to engage in any of the following activities:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Violating any applicable laws or regulations</li>
            <li>Posting false, misleading, or defamatory content</li>
            <li>Impersonating any person or entity</li>
            <li>Interfering with or disrupting the platform or servers</li>
            <li>Attempting to gain unauthorized access to any part of the platform</li>
            <li>Using the platform for any commercial purpose without our consent</li>
            <li>Harassing, threatening, or intimidating other users</li>
            <li>Posting spam or engaging in phishing activities</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            Violation of these prohibitions may result in the termination of your account and potential legal action.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">5. Intellectual Property</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The Flight Evaluation platform, including its logo, design, text, graphics, and other content, is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, modify, distribute, or create derivative works based on our platform without our express permission.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The Flight Evaluation platform is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that the platform will be uninterrupted, secure, or error-free.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            We do not endorse or verify the accuracy of user-generated content, and we are not responsible for any errors or omissions in such content.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            To the maximum extent permitted by law, Flight Evaluation and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">8. Governing Law</h2>
          <p className="text-gray-700 dark:text-gray-300">
            These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any dispute arising from these terms shall be resolved exclusively in the courts located within the United States.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">9. Contact Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}