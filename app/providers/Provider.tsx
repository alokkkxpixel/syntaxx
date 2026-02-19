"use client"
import React from 'react'
import { ThemeProvider } from './theme-provider'
import { TechProvider } from '@/context/TechContext'
import AppInit from '@/components/AppInit'
import { store } from '../redux/store/store'
import { Provider as ReduxProvider } from "react-redux";

const Provider = ({children}: {children: React.ReactNode}) => {
  return (

    <ReduxProvider store={store} >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    > 

      <AppInit />
        {children}
    </ThemeProvider>
    </ReduxProvider>
  )
}

export default Provider