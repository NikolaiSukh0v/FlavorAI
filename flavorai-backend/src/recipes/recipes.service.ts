import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(search?: string) {
    const recipes = await this.prisma.recipe.findMany({
      where: search
        ? { title: { contains: search, mode: 'insensitive' } }
        : {},
      include: { ratings: { select: { stars: true } } },
    });

    return recipes.map(r => {
      const allStars = r.ratings.map(rt => rt.stars);
      const avg = allStars.length
        ? allStars.reduce((sum, s) => sum + s, 0) / allStars.length
        : 0;
      return {
        id: r.id,
        title: r.title,
        description: r.description,
        ingredients: r.ingredients,
        instructions: r.instructions,
        imageUrl: r.imageUrl || undefined,
        authorId: r.authorId,
        averageRating: parseFloat(avg.toFixed(1)),
      };
    });
  }

  async findOne(id: number) {
    const r = await this.prisma.recipe.findUnique({
      where: { id },
      include: { ratings: { select: { stars: true } } },
    });
    if (!r) throw new NotFoundException('Recipe not found');

    const allStars = r.ratings.map(rt => rt.stars);
    const avg = allStars.length
      ? allStars.reduce((sum, s) => sum + s, 0) / allStars.length
      : 0;

    return {
      id: r.id,
      title: r.title,
      description: r.description,
      ingredients: r.ingredients,
      instructions: r.instructions,
      imageUrl: r.imageUrl || undefined,
      authorId: r.authorId,
      averageRating: parseFloat(avg.toFixed(1)),
    };
  }

  async create(dto: CreateRecipeDto, userId: number) {
    return this.prisma.recipe.create({ data: { ...dto, authorId: userId } });
  }

  async update(id: number, dto: UpdateRecipeDto, userId: number) {
    const existing = await this.prisma.recipe.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Recipe not found');
    if (existing.authorId !== userId) throw new ForbiddenException();
    return this.prisma.recipe.update({ where: { id }, data: dto });
  }

 async remove(id: number, userId: number) {
    const existing = await this.prisma.recipe.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Recipe not found');
    if (existing.authorId !== userId) throw new ForbiddenException();
    await this.prisma.rating.deleteMany({ where: { recipeId: id } });
    return this.prisma.recipe.delete({ where: { id } });
  }

  async rate(recipeId: number, stars: number, userId: number) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id: recipeId } });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return this.prisma.rating.upsert({
      where: { userId_recipeId: { userId, recipeId } },
      update: { stars },
      create: { stars, userId, recipeId },
    });
  }


  async setImageUrl(id: number, imageUrl: string, userId: number) {
    const existing = await this.prisma.recipe.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Recipe not found');
    if (existing.authorId !== userId) throw new ForbiddenException();
    return this.prisma.recipe.update({ where: { id }, data: { imageUrl } });
  }
}
