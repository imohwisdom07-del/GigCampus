import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

const AuthCallback = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Checking authentication...')

  useEffect(() => {
    async function handleCallback() {
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true })
        if (error) {
          setStatus('Callback failed. Please return to login and try again.')
          console.error(error)
          return
        }

        const session = data?.session
        if (session?.user) {
          setStatus('Authentication successful. Redirecting to dashboard...')
          window.setTimeout(() => navigate('/dashboard'), 1200)
          return
        }

        const { data: currentSession } = await supabase.auth.getSession()
        if (currentSession?.session?.user) {
          setStatus('Authentication successful. Redirecting to dashboard...')
          window.setTimeout(() => navigate('/dashboard'), 1200)
          return
        }

        setStatus('Completed. Please return to login if you are not redirected automatically.')
      } catch (error) {
        setStatus('Authentication callback failed. Please try again.')
        console.error(error)
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-dark-surface border border-white/5 rounded-3xl p-8 shadow-2xl text-center">
        <h1 className="text-2xl font-black text-white mb-4">Completing authentication</h1>
        <p className="text-white/60 text-sm leading-relaxed">{status}</p>
      </div>
    </div>
  )
}

export default AuthCallback
