import { Body, Controller, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/CreateMovie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    console.log(createMovieDto);
    return this.moviesService.createMovie(createMovieDto);
  }
}
