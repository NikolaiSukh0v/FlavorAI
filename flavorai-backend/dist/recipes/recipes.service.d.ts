import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        imageUrl: string | undefined;
        authorId: number;
        averageRating: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        imageUrl: string | undefined;
        authorId: number;
        averageRating: number;
    }>;
    create(dto: CreateRecipeDto, userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        imageUrl: string | null;
        instructions: string;
        authorId: number;
    }>;
    update(id: number, dto: UpdateRecipeDto, userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        imageUrl: string | null;
        instructions: string;
        authorId: number;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        imageUrl: string | null;
        instructions: string;
        authorId: number;
    }>;
    rate(recipeId: number, stars: number, userId: number): Promise<{
        id: number;
        stars: number;
        userId: number;
        recipeId: number;
    }>;
    setImageUrl(id: number, imageUrl: string, userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        imageUrl: string | null;
        instructions: string;
        authorId: number;
    }>;
}
