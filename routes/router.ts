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
import { createUser } from '../controllers/SignUpController'
import { userLogin } from '../controllers/LogInController'
import { authenticateToken } from '../middleware/auth'


//-------Movies Routes---------------

// Home route
router.get('/', home)

// Get All Movies Route
router.get('/movies', getAllMovies)

// Get Specific Movie by id
router.get('/movies/:id', getGameById)

// Create Movie
router.post('/movies', authenticateToken, CreateMovie)

// Edit Specific Movie by id
router.patch('/movies/:id', authenticateToken, updateMovieById)

// Delete Specific Movie by id
router.delete('/movies/:id', authenticateToken, deleteGame)



//-------User Routes---------------

router.post('/movies/signup', createUser)

router.post('/movies/login', userLogin)
