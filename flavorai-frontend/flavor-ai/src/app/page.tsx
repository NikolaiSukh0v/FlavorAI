'use client';
import Image from "next/image";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  return (
   <div>
    <div className="flex justify-center mb-8">
<RecipeCard RecipeName="Soup" RecipeDescription="loremipsum"/>
    </div>
   </div>
  );
}
