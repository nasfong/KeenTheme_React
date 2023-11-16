import { createTheme } from '@mui/material'
import { createPalette } from './components/create-palette'
import { createComponents } from './components/create-components'
import { createShadows } from './components/create-shadows'
import { createTypography } from './components/create-typography'

const palette = createPalette()
const components = createComponents({ palette })
const shadows = createShadows()
const typography = createTypography()

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  components,
  palette,
  shadows,
  shape: {
    borderRadius: 8,
  },
  typography,
})
