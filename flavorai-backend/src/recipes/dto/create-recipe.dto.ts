import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsArray()
  @ArrayNotEmpty()
  ingredients: string[];

  @IsString()
  @IsNotEmpty()
  instructions: string;
}