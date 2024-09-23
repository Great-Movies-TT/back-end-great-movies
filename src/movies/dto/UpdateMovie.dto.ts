import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString({ each: true })
  actors?: string[];

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @Type(() => Date)
  releaseDate?: Date;

  
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
