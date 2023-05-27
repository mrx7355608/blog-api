import { Router } from 'express'
import AuthControllers from '../controllers/auth.controllers.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import makeRequestHandler from '../utils/makeRequestHandler.js'

const router = Router()
const authControllers = AuthControllers()

router.post('/signup', makeRequestHandler(authControllers.signup))
router.post('/login', authControllers.login)

router.use(isAuthenticated)
router.post('/logout', authControllers.logout)

export default router
