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
        return this.prisma.recipe.findMany({
            where: search ? { title: { contains: search } } : {},
            include: { ratings: true },
        });
    }
    async findOne(id) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { id },
            include: { ratings: true },
        });
        if (!recipe)
            throw new common_1.NotFoundException('Recipe not found');
        return recipe;
    }
    async create(dto, userId) {
        return this.prisma.recipe.create({
            data: { ...dto, authorId: userId },
        });
    }
    async update(id, dto, userId) {
        const existing = await this.prisma.recipe.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Recipe not found');
        if (existing.authorId !== userId)
            throw new common_1.ForbiddenException();
        return this.prisma.recipe.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id, userId) {
        const existing = await this.prisma.recipe.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Recipe not found');
        if (existing.authorId !== userId)
            throw new common_1.ForbiddenException();
        return this.prisma.recipe.delete({ where: { id } });
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map