'use client';
import Rating from '@mui/material/Rating';

export default function RecipeCard({RecipeName, RecipeDescription, rate}: {RecipeName?: string, RecipeDescription?: string, rate?: number}) {


  return (
   <div>
    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-500 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{RecipeName}</h5>
<p className="font-normal text-gray-700 dark:text-gray-400">{RecipeDescription}</p>
<Rating
  name="read-only"
  value={4}
  readOnly
  precision={0.5}
/>
</a>
   </div>
  );
}
