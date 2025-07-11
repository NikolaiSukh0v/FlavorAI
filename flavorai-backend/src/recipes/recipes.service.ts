import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(search?: string) {
    return this.prisma.recipe.findMany({
      where: search ? { title: { contains: search } } : {},
      include: { ratings: true },
    });
  }

  async findOne(id: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: { ratings: true },
    });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async create(dto: CreateRecipeDto, userId: number) {
    return this.prisma.recipe.create({
      data: { ...dto, authorId: userId },
    });
  }

  async update(id: number, dto: UpdateRecipeDto, userId: number) {
    const existing = await this.prisma.recipe.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Recipe not found');
    if (existing.authorId !== userId) throw new ForbiddenException();
    return this.prisma.recipe.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number, userId: number) {
    const existing = await this.prisma.recipe.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Recipe not found');
    if (existing.authorId !== userId) throw new ForbiddenException();
    return this.prisma.recipe.delete({ where: { id } });
  }
}
