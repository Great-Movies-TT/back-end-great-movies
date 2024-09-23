import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Movie {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  actors: string[];

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  imageUrl: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
