import express from 'express'
import { z } from 'zod'
import { validateRequest } from '../middleware/validateRequest.js'
import { signUp, signIn, requestPhoneOtp, googleOAuth, getUser } from '../controllers/authController.js'

const router = express.Router()

const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const phoneSchema = z.object({
  phone: z.string().min(10),
})

router.post('/signup', validateRequest(emailPasswordSchema), signUp)
router.post('/signin', validateRequest(emailPasswordSchema), signIn)
router.post('/otp', validateRequest(phoneSchema), requestPhoneOtp)
router.get('/oauth/google', googleOAuth)
router.get('/user', getUser)

export default router
