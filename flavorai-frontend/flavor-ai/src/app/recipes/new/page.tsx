'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';


export default function NewRecipePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {

      const { data: created } = await api.post('/recipes', {
        title,
        description,
        ingredients: ingredients.split(',').map(i => i.trim()),
        instructions,
      });


      if (image) {
        setUploading(true);
        const form = new FormData();
        form.append('image', image);
        await api.post(`/recipes/${created.id}/image`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUploading(false);
      }


      router.push(`/recipes/${created.id}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create recipe');
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold">Create New Recipe</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Ingredients (comma-separated)</label>
            <input
              type="text"
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Instructions */}
          <div>
            <label className="block font-medium mb-1">Instructions</label>
            <textarea
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => e.target.files && setImage(e.target.files[0])}
              className="block"
            />
          </div>
 
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Submit Recipe'}
          </button>
        </form>
      </main>
    </div>
  );
}
