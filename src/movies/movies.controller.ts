import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/CreateMovie.dto';
import mongoose from 'mongoose';
import { UpdateMovieDto } from './dto/UpdateMovie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Get()
  getMovies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('genre') genre?: string,
    @Query('minRating') minRating?: number,
  ) {
    const paginationOptions = {
      page: page && page > 0 ? page : 1,
      limit: limit && limit > 0 && limit <= 20 ? limit : 10,
    };

    return this.moviesService.getMovies(paginationOptions, genre, minRating);
  }

  @Get('count')
  async getTotalCount() {
    return this.moviesService.getTotalCount();
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) throw new HttpException('Movie not found', 404);

    const movie = await this.moviesService.getMovieById(id);

    if (!movie) throw new HttpException('Movie not found', 404);

    return movie;
  }

  @Patch(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) throw new HttpException('Invalid Id', 400);

    const updatedMovie = await this.moviesService.updateMovie(
      id,
      updateMovieDto,
    );

    if (!updatedMovie) throw new HttpException('Movie not found', 404);

    return updatedMovie;
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) throw new HttpException('Invalid Id', 400);

    const deletedMovie = await this.moviesService.deleteMovie(id);

    if (!deletedMovie) throw new HttpException('Movie not found', 404);

    return;
  }
}
