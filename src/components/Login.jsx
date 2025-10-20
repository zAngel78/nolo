import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'
import BackgroundPattern from './BackgroundPattern'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Please complete all fields')
      return
    }

    const result = login(username, password)
    if (!result.success) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 relative">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 dark:bg-slate-900 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
              <Lock className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h1 className="text-xl font-light text-white tracking-tight">Research</h1>
              <p className="text-xs text-slate-400">Documentation Portal</p>
            </div>
          </div>
          
          <div className="space-y-8 max-w-md">
            <div>
              <h2 className="text-4xl font-light text-white mb-4 leading-tight">
                Access your research<br />documentation
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Centralized platform for managing and accessing institutional research data, 
                analytics, and comprehensive documentation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-slate-500">
          © 2025 YU Research. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-sm flex items-center justify-center">
              <Lock className="w-5 h-5 text-white dark:text-slate-900" />
            </div>
            <div>
              <h1 className="text-xl font-light text-slate-900 dark:text-slate-100 tracking-tight">Research</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Documentation Portal</p>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-light text-slate-900 dark:text-slate-100 mb-2">Sign in</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Enter your credentials to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100 focus:border-slate-900 dark:focus:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 dark:border-slate-800 rounded focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100 focus:border-slate-900 dark:focus:border-slate-100 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2.5 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-medium py-3 px-4 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:ring-offset-2 dark:focus:ring-offset-slate-950 text-sm flex items-center justify-center gap-2 group"
            >
              Sign in
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Demo credentials: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-900 dark:text-slate-100 font-mono">admin</code> / <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-900 dark:text-slate-100 font-mono">admin123</code>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8 lg:hidden">
          © 2025 YU Research. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login
