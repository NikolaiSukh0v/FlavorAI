import { IsString, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class UpdateRecipeDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  ingredients?: string[];

  @IsString()
  @IsOptional()
  instructions?: string;
}