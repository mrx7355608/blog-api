import BlogServices from '../services/blog.services.js';

const blogServices = BlogServices();

export default function BlogControllers() {
    async function getBlogs(httpRequestObject) {
        const blogs = await blogServices.listAllBlogs();
        return {
            statusCode: 200,
            body: {
                results: blogs.length,
                blogs,
            },
        };
    }

    async function getOneBlog(httpRequestObject) {
        const blogId = httpRequestObject.params.id;
        const blog = await blogServices.listOneBlog(blogId);
        return {
            statusCode: 200,
            body: { blog },
        };
    }

    async function postBlog(httpRequestObject) {
        const blogData = httpRequestObject.body;
        const filteredBlogData = filterData(blogData);
        const userId = String(httpRequestObject.user._id);
        const newBlog = await blogServices.addBlog(userId, filteredBlogData);
        return {
            statusCode: 201,
            body: { newBlog },
        };
    }

    async function deleteBlog(httpRequestObject) {
        const userId = String(httpRequestObject.user._id);
        const blogId = httpRequestObject.params.blogId;
        await blogServices.removeBlog(userId, blogId);
        return {
            statusCode: 204,
            body: null,
        };
    }

    function filterData(data) {
        const allowedFields = ['title', 'body', 'tags', 'coverPhoto'];
        Object.keys(data).forEach((elem) => {
            if (!allowedFields.includes(elem)) delete data[elem];
        });

        return data;
    }

    return {
        getBlogs,
        getOneBlog,
        postBlog,
        deleteBlog,
    };
}
