import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Providers from "./providers";
import NavMenu from "./components/NavMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flight Evaluation Platform",
  description: "Rate and review your flight experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                  Flight Evaluation
                </Link>
                <nav className="hidden md:flex space-x-6">
                  <Link href="/flights" className="hover:text-blue-600 transition-colors">
                    Flights
                  </Link>
                  <Link href="/airlines" className="hover:text-blue-600 transition-colors">
                    Airlines
                  </Link>
                  <Link href="/about" className="hover:text-blue-600 transition-colors">
                    About
                  </Link>
                </nav>
                <NavMenu />
              </div>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-gray-100 dark:bg-gray-900 py-8">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Flight Evaluation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Share your flight experiences and help others make informed travel decisions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link href="/flights" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Browse Flights</Link></li>
                    <li><Link href="/airlines" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Airlines</Link></li>
                    <li><Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">About Us</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Legal</h3>
                  <ul className="space-y-2">
                    <li><Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Connect</h3>
                  <ul className="space-y-2">
                    <li><Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Contact Us</Link></li>
                    <li><Link href="/feedback" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Feedback</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
                <p>© {new Date().getFullYear()} Flight Evaluation Platform. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
