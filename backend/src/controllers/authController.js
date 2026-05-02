import { authClient, supabase } from '../config/supabaseClient.js'

export async function signUp(req, res) {
  const { email, password } = req.body

  const { data, error } = await authClient.auth.signUp({
    email,
    password,
  })

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.status(201).json(data)
}

export async function signIn(req, res) {
  const { email, password } = req.body

  const { data, error } = await authClient.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.json(data)
}

export async function requestPhoneOtp(req, res) {
  const { phone } = req.body

  const { data, error } = await authClient.auth.signInWithOtp({
    phone,
    options: {
      provider: 'sms',
    },
  })

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.json(data)
}

export async function googleOAuth(req, res) {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const redirectTo = `${protocol}://${host}/auth/callback`

  const { data, error } = await authClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  })

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.json(data)
}

export async function getUser(req, res) {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' })
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    return res.status(401).json({ error: 'Invalid or expired session token' })
  }

  return res.json(data.user)
}
