import { CssBaseline } from '@mui/material'
import Router from './Router'
import Loader from './SharedComponents/Loader'
import SnackBar from './SharedComponents/SnackBar'
import { Provider } from 'react-redux'
import Store from './Redux/Store'
import { ThemeProvider } from '@mui/material/styles'
import { ThemeProvider as ThemeProviderStyle } from '@mui/styles'
import theme from './Theme'

const App = () => {

  return (
    <>
    
      <ThemeProvider theme={theme}>
        <ThemeProviderStyle theme={theme}>
          <Provider store={Store}>
            <Loader />
            <SnackBar />
            <CssBaseline />
            <Router />
          </Provider>
        </ThemeProviderStyle>
      </ThemeProvider>
    </>
  )
}

export default App
