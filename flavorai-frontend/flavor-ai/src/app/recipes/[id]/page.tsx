
'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import Rating from '@mui/material/Rating';
import { AuthContext } from '@/context/AuthContext';

interface RecipeDetail {
  id: number;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  averageRating?: number;
  authorId: number;
}

export default function RecipeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [value, setValue] = useState<number>(0);
  const [hover, setHover] = useState<number>(-1);
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState<string>('');

  useEffect(() => {
    api.get<RecipeDetail>(`/recipes/${id}`)
      .then(res => {
        setRecipe(res.data);
        setValue(res.data.averageRating ?? 0);
      })
      .catch(console.error);

    const saved = localStorage.getItem(`recipe-notes-${id}`);
    if (saved) setNotes(JSON.parse(saved));
  }, [id]);

  const saveNote = () => {
    if (!currentNote.trim()) return;
    const updated = [...notes, currentNote.trim()];
    setNotes(updated);
    localStorage.setItem(`recipe-notes-${id}`, JSON.stringify(updated));
    setCurrentNote('');
  };

  const handleRatingChange = async (_: any, newValue: number | null) => {
    if (!user || newValue === null) return;
    setValue(newValue);
    try {
      await api.post(`/recipes/${id}/rate`, { stars: newValue });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      try {
        await api.delete(`/recipes/${id}`);
        router.push('/my-recipes');
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  if (!recipe) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10">
      <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          {user?.id === recipe.authorId && (
            <div className="space-x-2">
              <button
                onClick={() => router.push(`/recipes/${id}/edit`)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {recipe.imageUrl && (
          <img
            src={`${api.defaults.baseURL}${recipe.imageUrl}`}
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
            name="recipe-rating"
            value={value}
            precision={1}
            onChange={handleRatingChange}
            onChangeActive={(_, newHover) => setHover(newHover)}
          />
          <span className="text-sm font-medium text-gray-500">
            {hover !== -1 ? hover : value}
          </span>
        </section>

        {/* Personal Notes Section */}
        <section>
          <h2 className="text-xl font-semibold">Personal Notes</h2>
          <ul className="space-y-2 mb-4">
            {notes.map((note, idx) => (
              <li key={idx} className="p-2 bg-gray-100 rounded text-gray-800 whitespace-pre-wrap">
                {note}
              </li>
            ))}
          </ul>
          <textarea
            placeholder="Add personal notes..."
            className="w-full p-2 border rounded"
            value={currentNote}
            onChange={e => setCurrentNote(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={saveNote}
          >
            Save Note
          </button>
        </section>
      </main>
    </div>
  );
}
