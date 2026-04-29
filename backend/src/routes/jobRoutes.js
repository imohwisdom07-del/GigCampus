import express from 'express'
import { validateRequest } from '../middleware/validateRequest.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { createJob, listJobs } from '../controllers/jobController.js'
import { jobCreateSchema, jobQuerySchema } from '../schemas/jobSchema.js'

const router = express.Router()

router.get('/', validateRequest(jobQuerySchema, 'query'), listJobs)
router.post('/', requireAuth, validateRequest(jobCreateSchema), createJob)

export default router
