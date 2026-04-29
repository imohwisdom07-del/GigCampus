import { z } from 'zod'

const dateString = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: 'Invalid date format. Use YYYY-MM-DD.',
})

export const jobCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  pay_rate: z.number().nonnegative(),
  category: z.string().min(1),
  deadline: dateString,
  is_remote: z.boolean(),
  location: z.string().min(1),
})

export const jobQuerySchema = z.object({
  category: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  is_remote: z.preprocess((value) => {
    if (typeof value === 'string') {
      return value === 'true'
    }
    return value
  }, z.boolean().optional()),
  min_pay: z.preprocess((value) => {
    if (typeof value === 'string' && value.length > 0) {
      return Number(value)
    }
    return value
  }, z.number().nonnegative().optional()),
  max_pay: z.preprocess((value) => {
    if (typeof value === 'string' && value.length > 0) {
      return Number(value)
    }
    return value
  }, z.number().nonnegative().optional()),
  limit: z.preprocess((value) => {
    if (typeof value === 'string' && value.length > 0) {
      return Number(value)
    }
    return value
  }, z.number().int().positive().max(100).optional()),
  offset: z.preprocess((value) => {
    if (typeof value === 'string' && value.length > 0) {
      return Number(value)
    }
    return value
  }, z.number().int().nonnegative().optional()),
})
