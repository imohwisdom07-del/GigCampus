import { supabase } from '../config/supabaseClient.js'

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' })
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    return res.status(401).json({ error: 'Invalid or expired session token' })
  }

  req.user = data.user
  next()
}
