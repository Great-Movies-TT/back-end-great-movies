import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  actors: string[];

  @IsString()
  director: string;

  @IsString()
  genre: string;

  @IsNumber()
  rating: number;

  @IsDate()
  @Type(() => Date)
  releaseDate: Date;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
