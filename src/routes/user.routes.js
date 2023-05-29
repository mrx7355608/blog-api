import { Router } from "express";
import UserControllers from "../controllers/user.controllers.js";
import makeRequestHandler from '../utils/makeRequestHandler.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const router = Router()
const userControllers = UserControllers()

router.use(isAuthenticated)
router.get('/profile', makeRequestHandler(userControllers.getMe))
router.patch('/update', makeRequestHandler(userControllers.update))
router.delete('/delete', makeRequestHandler(userControllers.deleteUser))

export default router
