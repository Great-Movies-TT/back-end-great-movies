import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from 'src/schemas/Movie.schema';
import { CreateMovieDto } from './dto/CreateMovie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  createMovie(createMovieDto: CreateMovieDto) {
    const newMovie = new this.movieModel(createMovieDto);

    return newMovie.save();
  }
}
