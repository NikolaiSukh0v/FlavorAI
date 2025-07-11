'use client';

import NavBar from '@/components/NavBar';
import RecipeCard from '@/components/RecipeCard';

export default function HomePage() {
  const recipes = [
    { id: 1, title: 'Tomato Soup', description: 'A warm and comforting tomato soup.', averageRating: 4.2, imageUrl: '/images/tomato-soup.jpg' },
    { id: 2, title: 'Avocado Toast', description: 'Crispy bread topped with fresh avocado.', averageRating: 3.8, imageUrl: '/images/avocado-toast.jpg' },
    { id: 3, title: 'Berry Pancakes', description: 'Fluffy pancakes loaded with berries.', averageRating: 4.5, imageUrl: '/images/berry-pancakes.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      <NavBar />
      <main className="max-w-7xl mx-auto px-6 py-10 pt-24">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Discover Delicious Recipes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}
