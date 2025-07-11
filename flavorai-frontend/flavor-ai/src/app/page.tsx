'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import RecipeCard from '@/components/RecipeCard';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Recipe {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  averageRating?: number;
}

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get<Recipe[]>('/recipes')
      .then(res => setRecipes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...recipes].sort(
    (a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0)
  );
  const top3 = sorted.slice(0, 3);
  const next5 = sorted.slice(3, 8);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        <section>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            Top Rated Recipes
          </h1>
          {loading ? (
            <p>Loading top recipes...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {top3.map(r => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            More Recipes
          </h2>
          {loading ? (
            <p>Loading recipes...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {next5.map(r => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          )}
        </section>

        <div className="text-center">
          <Link
            href="/recipes"
            className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition"
          >
            View All Recipes
          </Link>
        </div>
      </main>
    </div>
  );
}
