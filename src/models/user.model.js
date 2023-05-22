import mongoose from 'mongoose'

const socialSchema = new mongoose.Schema({
    facebook: {
        type: String,
        default: ''
    },
    twitter: {
        type: String,
        default: ''
    },
    instagram: {
        type: String,
        default: ''
    },
    linkedIn: {
        type: String,
        default: ''
    },
})

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: ''
    },
    password: {
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
    },
    writingCategories: {
        type: [String],
        default: []
    },
    socialLinks: socialSchema
})


const UserModel = mongoose.model('User', userSchema)
export default UserModel

