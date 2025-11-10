import React, { createContext, useContext, useState, useEffect } from 'react'

interface SidebarContextType {
  isMinimized: boolean
  toggleSidebar: () => void
  setMinimized: (minimized: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar debe usarse dentro de un SidebarProvider')
  }
  return context
}

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(() => {
    const saved = localStorage.getItem('sidebar-minimized')
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('sidebar-minimized', isMinimized.toString())
  }, [isMinimized])

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized)
  }

  const setMinimized = (minimized: boolean) => {
    setIsMinimized(minimized)
  }

  return (
    <SidebarContext.Provider value={{ isMinimized, toggleSidebar, setMinimized }}>
      {children}
    </SidebarContext.Provider>
  )
}

