'use client';

import { useState, useContext, FormEvent } from 'react';
import Link from 'next/link';
import { HiMenu, HiX, HiSearch, HiPlus } from 'react-icons/hi';
import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const handleLogout = () => {
    auth?.logout();
    setOpen(false);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    window.location.href = `/recipes?search=${encodeURIComponent(query)}`;
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link href="/" className="text-2xl font-bold text-indigo-600">
            FlavorAI
          </Link>


          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/recipes" className="text-gray-700 hover:text-indigo-600">
              All Recipes
            </Link>
            {user && (
              <Link href="/my-recipes" className="text-gray-700 hover:text-indigo-600">
                My Recipes
              </Link>
            )}

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                className="pl-8 pr-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <HiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>

            {user && (
              <Link
                href="/recipes/new"
                className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
              >
                <HiPlus />
              </Link>
            )}
          </nav>


          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>


          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX className="w-6 h-6 text-gray-800" /> : <HiMenu className="w-6 h-6 text-gray-800" />}
          </button>
        </div>


        {open && (
          <div className="md:hidden mt-2 mb-4 space-y-2">
            <form onSubmit={handleSearch} className="px-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <HiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            <Link
              href="/recipes"
              className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              All Recipes
            </Link>
            {user && (
              <Link
                href="/my-recipes"
                className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                My Recipes
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-50"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 rounded text-indigo-600 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
            {user && (
              <Link
                href="/recipes/new"
                className="block px-4 py-2 rounded text-indigo-600 hover:bg-gray-100 flex items-center"
                onClick={() => setOpen(false)}
              >
                <HiPlus className="mr-2" /> New Recipe
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
