import { Document, ObjectId } from 'mongoose'

export interface M extends Document {
  _id: ObjectId
  title: string
  kind: string
  release_date: number
  director: string
  rate: number
}
