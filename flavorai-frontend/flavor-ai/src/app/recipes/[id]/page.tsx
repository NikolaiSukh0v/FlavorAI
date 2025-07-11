'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Rating from '@mui/material/Rating';

interface RecipeDetail {
  id: number;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  averageRating?: number;
}

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

  useEffect(() => {
    api.get<RecipeDetail>(`/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(console.error);
  }, [id]);

  if (!recipe) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10">

      <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded"
          />
        )}
        {recipe.description && <p className="text-gray-700">{recipe.description}</p>}
        <section>
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Instructions</h2>
          <p className="whitespace-pre-wrap">{recipe.instructions}</p>
        </section>
        <section className="flex items-center space-x-2">
          <Rating
            name="read-only"
            value={recipe.averageRating ?? 0}
            precision={0.5}
          />
          <span className="text-sm font-medium text-gray-500">
            {(recipe.averageRating ?? 0).toFixed(1)}
          </span>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Personal Notes</h2>
          <textarea
            placeholder="Add personal notes..."
            className="w-full p-2 border rounded"
          />
        </section>
      </main>
    </div>
  );
}
