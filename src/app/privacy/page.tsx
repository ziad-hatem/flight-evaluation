'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          At Flight Evaluation, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We collect several types of information from and about users of our platform, including:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, and profile information you provide when creating an account.</li>
            <li><strong>User Content:</strong> Reviews, ratings, and comments you submit to the platform.</li>
            <li><strong>Usage Data:</strong> Information about how you access and use our platform, including your IP address, browser type, device information, and pages you visit.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our platform and hold certain information.</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may use the information we collect from you for various purposes, including to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Provide, maintain, and improve our platform</li>
            <li>Process and complete transactions</li>
            <li>Send administrative information, such as updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Personalize your experience on our platform</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our platform</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Protect the safety, integrity, and security of our platform, users, and others</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">3. Disclosure of Your Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may disclose personal information that we collect or you provide:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>To Service Providers:</strong> We may share your information with third-party vendors, service providers, and other third parties who perform services on our behalf.</li>
            <li><strong>For Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
            <li><strong>For Legal Purposes:</strong> We may disclose your information to comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
            <li><strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described above.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our platform. Any transmission of personal information is at your own risk.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">5. Your Rights and Choices</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You have certain rights and choices regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Account Information:</strong> You can review and change your personal information by logging into your account and visiting your profile page.</li>
            <li><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject browser cookies.</li>
            <li><strong>Communications:</strong> You can opt out of receiving promotional emails from us by following the instructions in those emails.</li>
            <li><strong>Data Access and Portability:</strong> You may request access to your personal data or request that we transfer your personal data to another company.</li>
            <li><strong>Deletion:</strong> You may request that we delete your personal information.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">6. Children's Privacy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us so that we can take necessary actions.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">7. Changes to Our Privacy Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may update our privacy policy from time to time. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the platform.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            The date the privacy policy was last revised is identified at the top of the page. You are responsible for periodically visiting our platform and this privacy policy to check for any changes.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions or concerns about this privacy policy or our privacy practices, please contact us at:
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