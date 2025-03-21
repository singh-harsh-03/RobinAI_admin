import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Video from './components/Video'
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Robin AI - Smart Navigation",
  description: "Optimize your indoor navigation experience with AI-powered tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        
        {/* Navbar */}
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
            
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3">
              <span className="text-2xl font-semibold text-gray-900">
                Robin AI
              </span>
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-6">
              <a href="https://path-navigato-ritorno.vercel.app/?position=v35" className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-700"> View Maps</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center h-screen px-4 bg-gray-100">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4 animate-dance">
            Step into the Future of Navigation
          </h1>
          <p className="text-xl text-gray-600 max-w-5xl animate-dance-slow">
            AI-powered solutions for seamless indoor navigation, helping you find your way with precision.
          </p>
          <div className="mt-6 space-x-4">
            <Link href="/upload">
              <button className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg text-lg hover:bg-pink-700">
                Upload Video
              </button>
            </Link>
          </div>
        </section>

        {/* Inject Page Content */}
        <section className="max-w-6xl bg-gray-50 mx-auto px-6 py-12">
          {children}
        </section>

      </body>
    </html>
  );
}
