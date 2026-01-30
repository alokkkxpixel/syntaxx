"use client"
import React from 'react'
import { ThemeProvider } from './theme-provider'
import { TechProvider } from '@/context/TechContext'

const Provider = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TechProvider>

      {children}
      </TechProvider>
    </ThemeProvider>
  )
}

export default Provider