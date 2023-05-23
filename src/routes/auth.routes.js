import { Router } from 'express'
import AuthControllers from '../controllers/auth.controllers.js'
import makeRequestHandler from '../utils/makeRequestHandler.js'

const router = Router()
const authControllers = AuthControllers()

router.post('/signup', makeRequestHandler(authControllers.signup))
router.post('/login', authControllers.login)
router.post('/logout', authControllers.logout)

export default router
