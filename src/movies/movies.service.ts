import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from 'src/schemas/Movie.schema';
import { CreateMovieDto } from './dto/CreateMovie.dto';
import { UpdateMovieDto } from './dto/UpdateMovie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  createMovie(createMovieDto: CreateMovieDto) {
    const newMovie = new this.movieModel(createMovieDto);

    return newMovie.save();
  }

  getTotalCount(genre?: string, minRating?: number) {
    const query: any = {};

    if (genre) {
      query.genre = genre;
    }

    if (minRating !== undefined) {
      query.rating = { $gte: minRating };
    }

    return this.movieModel.countDocuments(query).exec();
  }

  getMovies(
    paginationOptions: { page: number; limit: number },
    genre?: string,
    minRating?: number,
  ) {
    const { page, limit } = paginationOptions;

    const query: any = {};

    if (genre) {
      query.genre = genre;
    }

    if (minRating) {
      query.rating = { $gte: minRating };
    }

    return this.movieModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  getMovieById(id: string) {
    return this.movieModel.findById(id);
  }

  updateMovie(id: string, updateMovieDto: UpdateMovieDto) {
    return this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true });
  }

  deleteMovie(id: string) {
    return this.movieModel.findByIdAndDelete(id);
  }
}
