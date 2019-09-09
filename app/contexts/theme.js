import React from 'react'

const { Consumer, Provider } = React.createContext('dark')

export const ThemeProvider = Provider
export const ThemeConsumer = Consumer
