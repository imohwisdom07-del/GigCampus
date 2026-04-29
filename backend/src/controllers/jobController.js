import { supabase } from '../config/supabaseClient.js'

export async function createJob(req, res) {
  const jobPayload = {
    ...req.body,
    user_id: req.user.id,
    created_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from('jobs').insert(jobPayload).select().single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(201).json(data)
}

export async function listJobs(req, res) {
  const filters = req.query

  let builder = supabase
    .from('jobs')
    .select('id, title, description, pay_rate, category, deadline, is_remote, location, user_id, created_at')

  if (filters.category) {
    builder = builder.eq('category', filters.category)
  }

  if (filters.location) {
    builder = builder.ilike('location', `%${filters.location}%`)
  }

  if (typeof filters.is_remote === 'boolean') {
    builder = builder.eq('is_remote', filters.is_remote)
  }

  if (filters.min_pay != null) {
    builder = builder.gte('pay_rate', filters.min_pay)
  }

  if (filters.max_pay != null) {
    builder = builder.lte('pay_rate', filters.max_pay)
  }

  builder = builder.order('created_at', { ascending: false })

  if (filters.limit != null) {
    const offset = filters.offset ?? 0
    const end = offset + filters.limit - 1
    builder = builder.range(offset, end)
  }

  const { data, error } = await builder

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json(data)
}
