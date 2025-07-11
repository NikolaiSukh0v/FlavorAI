import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string): Promise<({
        ratings: {
            id: number;
            stars: number;
            userId: number;
            recipeId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        authorId: number;
    })[]>;
    findOne(id: number): Promise<{
        ratings: {
            id: number;
            stars: number;
            userId: number;
            recipeId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        authorId: number;
    }>;
    create(dto: CreateRecipeDto, userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        authorId: number;
    }>;
    update(id: number, dto: UpdateRecipeDto, userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        authorId: number;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        authorId: number;
    }>;
}
