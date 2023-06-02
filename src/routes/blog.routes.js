import { Router } from 'express';
import makeRequestHandler from '../utils/makeRequestHandler.js';
import BlogControllers from '../controllers/blog.controllers.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const blogRouter = Router();
const blogControllers = BlogControllers();

blogRouter.get('/', makeRequestHandler(blogControllers.getBlogs));
blogRouter.get('/:id', makeRequestHandler(blogControllers.getOneBlog));

blogRouter.use(isAuthenticated);
blogRouter.post('/', makeRequestHandler(blogControllers.postBlog));
blogRouter.delete(
    '/remove/:blogId',
    makeRequestHandler(blogControllers.deleteBlog)
);

export default blogRouter;
