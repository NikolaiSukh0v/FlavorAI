
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import RecipeCard from '@/components/RecipeCard';
import { useSearchParams } from 'next/navigation';

interface Recipe {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  averageRating?: number;
}

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get('search') || '';
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get<Recipe[]>(`/recipes${q ? `?search=${encodeURIComponent(q)}` : ''}`)
      .then(res => setRecipes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">All Recipes</h1>
        {loading ? (
          <p>Loading recipes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map(r => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
