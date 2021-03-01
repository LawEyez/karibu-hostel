import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    permissionLevel: {
        type: Number,
        default: 1
    }
})

const User = mongoose.model('Users', UserSchema)

export default User