import express from 'express'
export const router = express.Router()
import {
  home,
  getAllMovies,
  getGameById,
  CreateMovie,
  updateMovieById,
  deleteGame,
} from '../controllers/MovieController'

// Home route
router.get('/', home)

// Get All Movies Route
router.get('/api/movies', getAllMovies)

// Get Specific Movie by id
router.get('/api/movies/:id', getGameById)

// Create Movie
router.post('/api/movies', CreateMovie)

// Edit Specific Movie by id
router.patch('/api/movies/:id', updateMovieById)

// Delete Specific Movie by id
router.delete('/api/movies/:id', deleteGame)
