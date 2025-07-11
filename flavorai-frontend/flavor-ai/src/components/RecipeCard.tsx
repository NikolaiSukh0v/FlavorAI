'use client';

import Link from 'next/link';
import Rating from '@mui/material/Rating';

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    description?: string;
    averageRating?: number;
    imageUrl?: string;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-800 transition-colors duration-200 group-hover:text-blue-600">
          {recipe.title}
        </h3>

        <p className="mb-4 text-gray-600 line-clamp-3">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between">
          <Rating
            name="read-only"
            value={recipe.averageRating ?? 0}
            precision={0.5}
            readOnly
          />
          <span className="text-sm font-medium text-gray-500">
            {(recipe.averageRating ?? 0).toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
);
}