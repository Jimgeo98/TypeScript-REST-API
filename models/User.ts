import { model, Schema, Model } from 'mongoose'
import { UserInterface } from '../interfaces/UserInterface'

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User: Model<UserInterface> = model('User', userSchema)

export default User
