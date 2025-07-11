import { Request } from 'express';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
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
    findOne(id: string): Promise<{
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
    create(dto: CreateRecipeDto, req: Request): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        authorId: number;
    }>;
    update(id: string, dto: UpdateRecipeDto, req: Request): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        authorId: number;
    }>;
    remove(id: string, req: Request): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        authorId: number;
    }>;
}
