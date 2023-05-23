import BlogModel from '../models/blog.model.js'

async function findAll() {
    return await BlogModel.find({})
}

async function findById(id) {
    return await BlogModel.findById(id)
}

async function insert(data) {
    const newBlog = await BlogModel.create(data)
    return newBlog
}

async function update(id, changes) {
    const updatedBlog = await BlogModel.findById(id)
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
