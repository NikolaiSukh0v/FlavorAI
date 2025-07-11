
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX, HiSearch } from 'react-icons/hi';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results or filter recipes
    // e.g. router.push(`/recipes?search=${encodeURIComponent(query)}`);
    console.log('Search for:', query);
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            FlavorAI
          </Link>

          {/* Search (desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search recipes..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </form>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/recipes" className="text-gray-700 hover:text-indigo-600">
              All Recipes
            </Link>
            <Link href="/my-recipes" className="text-gray-700 hover:text-indigo-600">
              My Recipes
            </Link>
          </nav>

          {/* Actions (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX className="w-6 h-6 text-gray-800" /> : <HiMenu className="w-6 h-6 text-gray-800" />}
          </button>
        </div>

        {/* Mobile Menu & Search */}
        {open && (
          <div className="md:hidden mt-2 mb-4 space-y-2">
            <form onSubmit={handleSearch} className="flex items-center px-4">
              <div className="relative w-full">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </form>
            <Link
              href="/recipes"
              className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              All Recipes
            </Link>
            <Link
              href="/my-recipes"
              className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              My Recipes
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 rounded text-indigo-600 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="block px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
