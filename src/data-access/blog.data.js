import BlogModel from '../models/blog.model.js'

async function findAll() {
    return await BlogModel.find({}).populate('author', 'fname lname photo')
}

async function findById(id) {
    return await BlogModel.findById(id).populate('author', 'fname lname photo')

}

async function insert(data) {
    const newBlog = await BlogModel.create(data)
    return newBlog
}

async function update(id, changes) {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
        id, 
        changes, 
        { new: true }
    )
    return updatedBlog
}

async function deleteBlog(id) {
    await BlogModel.findByIdAndDelete(id)
    return null
}

const blogDB = {
    findAll,
    findById,
    insert,
    update,
    deleteBlog
}

export default blogDB
