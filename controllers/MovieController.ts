import mongoose from 'mongoose'
import Movie from '../models/Movie'
import { MovieInterface } from '../interfaces/MovieInterface'
import { Request, Response } from 'express'
import { MovieValidInfo } from '../validation/validation'

//Home
export const home = (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'API running...',
    URL: 'Go to /movies to see the List',
    status: res.statusCode,
  })
}

// Get all Movies
export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find()
    return res.status(200).json({
      message: res.statusCode,
      data: movies,
    })
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}

// Get Movie by id
export const getGameById = async (req: Request, res: Response) => {
  const _id: string = req.params.id
  try {
    const movies = await Movie.find({ _id })
    return res.status(200).json({
      message: res.statusCode,
      data: movies,
    })
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}

// Create new Movie
export const CreateMovie = async (req: Request, res: Response) => {
  const _id = mongoose.Types.ObjectId()
  const title: string = req.body.title
  const kind: string = req.body.kind
  const release_date: number = req.body.release_date
  const director: string = req.body.director
  const rate: number = req.body.rate

  // Validation Movie Input
  const { error } = MovieValidInfo.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const movie: MovieInterface = new Movie({ _id, title, kind, release_date, director, rate })

  try {
    await movie.save()
    return res.status(200).json({
      message: `Movie with title ${req.body.title} Created successfully !`,
      data: movie,
      status: res.statusCode,
    })
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}

//Update Movie
export const updateMovieById = async (req: Request, res: Response) => {
  const title: string = req.body.title
  const kind: string = req.body.kind
  const release_date: number = req.body.release_date
  const director: string = req.body.director
  const rate: number = req.body.rate
  const _id: string = req.params.id

  // Validation Movie Input
  const { error } = MovieValidInfo.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      { _id },
      { $set: { title, kind, release_date, director, rate } },
      { new: true },
    )

    if (updatedMovie) {
      return res.status(200).json({
        message: `Movie with title: '${req.body.title}' Successfully updated`,
        data: updatedMovie,
        status: res.statusCode,
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}

// Delete Movie
export const deleteGame = async (req: Request, res: Response) => {
  const _id = req.params.id
  try {
    const deletedMovie = await Movie.findByIdAndDelete({ _id })
    if (deletedMovie) {
      return res.status(200).json({
        message: `Movie Deleted successfully`,
        status: res.statusCode,
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}
