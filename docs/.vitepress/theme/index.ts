import DefaultTheme from 'vitepress/theme'
import './custom.css'

// Re-export everything from the default theme
export default DefaultTheme

// Allow named exports too (some VitePress versions import named components)
export * from 'vitepress/theme'
