'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';

export default function EditRecipePage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    if (!id) return;
    api.get(`/recipes/${id}`)
      .then(res => {
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description || '');
        setIngredients(data.ingredients.join(', '));
        setInstructions(data.instructions);
      })
      .catch(() => setError('Failed to load recipe'));
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {

      await api.put(`/recipes/${id}`, {
        title,
        description,
        ingredients: ingredients.split(',').map(i => i.trim()),
        instructions,
      });


      if (image) {
        setUploading(true);
        const form = new FormData();
        form.append('image', image);
        await api.post(`/recipes/${id}/image`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUploading(false);
      }


      router.push(`/recipes/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Update failed');
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold">Edit Recipe</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Ingredients (comma-separated)</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Instructions</label>
            <textarea
              className="w-full p-2 border rounded"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Replace Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => e.target.files && setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {uploading ? 'Updating…' : 'Save Changes'}
          </button>
        </form>
      </main>
    </div>
  );
}
