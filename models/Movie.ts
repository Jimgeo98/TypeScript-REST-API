import { model, Schema, Model } from 'mongoose'
import { MovieInterface } from '../interfaces/Model'

const MovieSchema: Schema = new Schema({
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

const Movie: Model<MovieInterface> = model('Movie', MovieSchema)

export default Movie
