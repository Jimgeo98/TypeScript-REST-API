import mongoose from 'mongoose'
import Movie from '../models/Movie'
import { MovieInterface } from '../interfaces/Model'
import { Request, Response } from 'express'

//Home
export const home = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'API running...',
    URL: 'Go to /api/movies',
    status: res.statusCode,
  })
}

// Get all Movies
export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find()
    res.status(200).json({
      message: res.statusCode,
      data: movies,
    })
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}

// Get Movie by id
export const getGameById = async (req: Request, res: Response) => {
  const _id = mongoose.Types.ObjectId(req.params.id)

  try {
    const movies = await Movie.find({ _id })
    res.status(200).json({
      message: res.statusCode,
      data: movies,
    })
  } catch (error) {
    res.status(500).json({
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

  const movie: MovieInterface = new Movie({ _id, title, kind, release_date, director, rate })

  try {
    await movie.save()
    res.status(200).json({
      message: `Movie with title ${req.body.title} Created successfully !`,
      data: movie,
      status: res.statusCode,
    })
  } catch (error) {
    res.status(500).json({
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

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      { _id },
      { $set: { title, kind, release_date, director, rate } },
      { new: true },
    )

    if (updatedMovie) {
      res.status(200).json({
        message: `Movie with title: '${req.body.title}' Successfully updated`,
        data: updatedMovie,
        status: res.statusCode,
      })
    }
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}

// Delete Movie
export const deleteGame = async (req: Request, res: Response) => {
  const _id = mongoose.Types.ObjectId(req.params.id)
  try {
    const deletedMovie = await Movie.findByIdAndDelete({ _id })
    if (deletedMovie) {
      res.status(200).json({
        message: `Movie Deleted successfully`,
        status: res.statusCode,
      })
    }
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}
