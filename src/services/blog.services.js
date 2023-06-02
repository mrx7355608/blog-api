import blogsDB from '../data-access/blog.data.js';
import validator from 'validator';
import blogDataValidator from '../validators/blog.validators.js';
import slugify from 'slugify';
import ApiError from '../utils/ApiError.js';
import blogDB from '../data-access/blog.data.js';

export default function BlogServices() {
    // GET ALL BLOGS
    async function listAllBlogs() {
        const blogs = await blogsDB.findAll();
        return blogs;
    }

    // GET ONE BLOG
    async function listOneBlog(id) {
        // Validate blog id
        if (!validator.isMongoId(id))
            throw new ApiError('Invalid Blog id', 400)
        const blog = await blogsDB.findById(id);
        if (!blog) throw new ApiError('Blog not found', 404);
        return blog;
    }

    // CREATE NEW BLOG
    async function addBlog(userId, data) {
        const blogData = {
            ...data,
            author: userId,
            slug: slugify(data.title),
        };

        // Validate blog data
        blogDataValidator(blogData);

        const newBlog = await blogsDB.insert(blogData);
        return newBlog;
    }

    // UPDATE BLOG
    async function editBlog(userId, id, changes) {
        // // Validate blog id
        // validator.isMongoId(id);
        // // Verify ownership of blog
        // if (userId !== id) throw new ApiError('You cannot edit this blog', 403);
    }


    // DELETE BLOG
    async function removeBlog(userId, blogId) {
        // Validate blogId
        if (!validator.isMongoId(blogId)) 
            throw new ApiError('Invalid blog id', 400)
 
        // Check if blog exists or not
        const blog = await blogDB.findById(blogId)
        if (!blog) 
            throw new ApiError('Blog not found', 404)

        // Check ownership of blog
        if (String(blog.author._id) !== userId) 
            throw new ApiError('You cannot remove this blog', 403)

        await blogDB.deleteBlog(blogId)
        return null
    }

    // SEARCH BLOG
    async function searchBlog() {}

    return {
        listAllBlogs,
        listOneBlog,
        addBlog,
        editBlog,
        removeBlog,
        searchBlog,
    };
}
