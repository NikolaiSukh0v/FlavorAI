"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecipesService = class RecipesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(search) {
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
    async findOne(id) {
        const r = await this.prisma.recipe.findUnique({
            where: { id },
            include: { ratings: { select: { stars: true } } },
        });
        if (!r)
            throw new common_1.NotFoundException('Recipe not found');
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
    async create(dto, userId) {
        return this.prisma.recipe.create({ data: { ...dto, authorId: userId } });
    }
    async update(id, dto, userId) {
        const existing = await this.prisma.recipe.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Recipe not found');
        if (existing.authorId !== userId)
            throw new common_1.ForbiddenException();
        return this.prisma.recipe.update({ where: { id }, data: dto });
    }
    async remove(id, userId) {
        const existing = await this.prisma.recipe.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Recipe not found');
        if (existing.authorId !== userId)
            throw new common_1.ForbiddenException();
        await this.prisma.rating.deleteMany({ where: { recipeId: id } });
        return this.prisma.recipe.delete({ where: { id } });
    }
    async rate(recipeId, stars, userId) {
        const recipe = await this.prisma.recipe.findUnique({ where: { id: recipeId } });
        if (!recipe)
            throw new common_1.NotFoundException('Recipe not found');
        return this.prisma.rating.upsert({
            where: { userId_recipeId: { userId, recipeId } },
            update: { stars },
            create: { stars, userId, recipeId },
        });
    }
    async setImageUrl(id, imageUrl, userId) {
        const existing = await this.prisma.recipe.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Recipe not found');
        if (existing.authorId !== userId)
            throw new common_1.ForbiddenException();
        return this.prisma.recipe.update({ where: { id }, data: { imageUrl } });
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map