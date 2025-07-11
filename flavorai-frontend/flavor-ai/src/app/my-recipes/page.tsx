'use client';

import { useEffect, useState, useContext } from 'react';
import api from '@/lib/api';
import RecipeCard from '@/components/RecipeCard';
import { AuthContext } from '@/context/AuthContext';

interface Recipe {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  averageRating?: number;
  authorId: number;
}

export default function MyRecipesPage() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!user) return;
    api.get<Recipe[]>('/recipes')
      .then(res => {
        const mine = res.data.filter(r => r.authorId === user.id);
        setRecipes(mine);
      })
      .catch(console.error);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen pt-24 p-6">
        <p className="text-center text-gray-700">Please log in to view your recipes.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}
