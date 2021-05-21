import mongoose, {  Document } from 'mongoose'
export interface MovieInterface extends Document {
  _id: mongoose.Types.ObjectId
  title: string
  kind: string
  release_date: number
  director: string
  rate: number
}
