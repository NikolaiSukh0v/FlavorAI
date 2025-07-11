'use client';

import Link from 'next/link';
import { useState, useContext } from 'react';
import Rating from '@mui/material/Rating';
import api from '@/lib/api';
import { AuthContext } from '@/context/AuthContext';

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
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [value, setValue] = useState<number>(recipe.averageRating ?? 0);
  const [hover, setHover] = useState<number>(-1);

  const handleRatingChange = async (_: any, newValue: number | null) => {
    if (!user || newValue === null) return;
    setValue(newValue);
    try {
      await api.post(`/recipes/${recipe.id}/rate`, { stars: newValue });
    } catch (error) {
      console.error('Failed to update rating', error);
    }
  };

  return (
    <div className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <Link href={`/recipes/${recipe.id}`}> 
        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="p-6">
        <Link href={`/recipes/${recipe.id}`}> 
          <h3 className="mb-2 text-xl font-semibold text-gray-800 transition-colors duration-200 group-hover:text-blue-600">
            {recipe.title}
          </h3>
        </Link>

        <p className="mb-4 text-gray-600 line-clamp-3">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between">
          <Rating
            name={`rating-${recipe.id}`}
            value={value}
            precision={1}
            onChange={handleRatingChange}
            onChangeActive={(_, newHover) => setHover(newHover)}
          />
          <span className="text-sm font-medium text-gray-500">
            {hover !== -1 ? hover : value}
          </span>
        </div>
      </div>
    </div>
  );
}
