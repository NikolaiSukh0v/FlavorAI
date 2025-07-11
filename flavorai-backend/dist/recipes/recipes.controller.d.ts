import { Request } from 'express';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
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
    findOne(id: string): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        instructions: string;
        imageUrl: string | undefined;
        authorId: number;
        averageRating: number;
    }>;
    create(dto: CreateRecipeDto, req: Request): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        imageUrl: string | null;
        instructions: string;
        authorId: number;
    }>;
    update(id: string, dto: UpdateRecipeDto, req: Request): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        imageUrl: string | null;
        instructions: string;
        authorId: number;
    }>;
    remove(id: string, req: Request): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        imageUrl: string | null;
        instructions: string;
        authorId: number;
    }>;
    uploadImage(id: string, file: Express.Multer.File, req: Request): Promise<{
        id: number;
        title: string;
        description: string | null;
        ingredients: import("@prisma/client/runtime/library").JsonValue;
        imageUrl: string | null;
        instructions: string;
        authorId: number;
    }>;
    suggest(id: string): Promise<{
        suggestion: any;
    }>;
}
