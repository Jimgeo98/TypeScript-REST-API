import { model, Schema } from 'mongoose'
import { MovieInterface } from '../interfaces/MovieInterface'

const MovieSchema = new Schema<MovieInterface>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  kind: {
    type: String,
    required: true,
  },
  release_date: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
})

const Movie = model<MovieInterface>('Movie', MovieSchema)

export default Movie
