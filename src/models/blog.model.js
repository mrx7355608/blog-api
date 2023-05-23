import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags: [String],
    coverPhoto: String,
}, { 
    timestamps: true 
})

const BlogModel = mongoose.model('Blog', blogSchema)
export default BlogModel

