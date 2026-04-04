// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account, databases, DATABASE_ID, RESIDENCES_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

interface PropertyData {
  name: string;
  location: string;
  price: string;
  description: string;
  // Add other fields as needed
}

export default function DashboardPage() {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    name: '',
    location: '',
    price: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        router.push('/login');
      }
    };
    
    getUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await databases.createDocument(
        DATABASE_ID,
        RESIDENCES_COLLECTION_ID,
        ID.unique(),
        {
          ...propertyData,
          price: parseFloat(propertyData.price) // Convert string to number if your DB expects number
        }
      );

      setMessage('Property uploaded successfully!');
      setPropertyData({ name: '', location: '', price: '', description: '' });
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPropertyData({
      ...propertyData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF6EF" }}>
        <div className="text-[#1C1610]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100" style={{ background: "#FAF6EF", fontFamily: "'Montserrat', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />

      <header className="bg-white shadow" style={{ background: "rgba(245,237,224,0.70)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold" style={{ color: "#1C1610", fontFamily: "'Cormorant Garamond', serif" }}>
            LODHA Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm" style={{ color: "#1C1610" }}>Welcome, {user.name || user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded text-xs tracking-wide uppercase"
              style={{ background: "#B8952A", color: "white" }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="p-6 rounded-lg" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(184,149,42,0.15)" }}>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: "#1C1610", fontFamily: "'Cormorant Garamond', serif" }}>
              Upload New Property
            </h2>
            
            {message && (
              <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium" style={{ color: "#1C1610" }}>
                  Property Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={propertyData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium" style={{ color: "#1C1610" }}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  value={propertyData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium" style={{ color: "#1C1610" }}>
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  value={propertyData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium" style={{ color: "#1C1610" }}>
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={propertyData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 rounded text-sm tracking-wide uppercase flex items-center gap-2"
                style={{ background: "linear-gradient(90deg,#B8952A,#D4B96A,#B8952A)", color: "white", opacity: isLoading ? 0.7 : 1 }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : 'Upload Property'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
