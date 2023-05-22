import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    blogs: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    bio: {
        type: String,
        default: ''
    }
})


const UserModel = mongoose.model('User', userSchema)
export default UserModel

