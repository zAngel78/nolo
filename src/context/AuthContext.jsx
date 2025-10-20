import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Credenciales estáticas
const STATIC_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated')
    const savedUser = localStorage.getItem('user')
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = (username, password) => {
    // Validar credenciales estáticas
    if (username === STATIC_CREDENTIALS.username && password === STATIC_CREDENTIALS.password) {
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify({ username }))
      return { success: true }
    }
    return { success: false, error: 'Credenciales inválidas' }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
