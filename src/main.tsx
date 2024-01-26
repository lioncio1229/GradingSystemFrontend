import React from 'react'
import ReactDOM from 'react-dom/client'
import router from 'router'
import { Provider } from 'react-redux'
import { store } from 'store'
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme'
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from 'notistack'
import ShowErrorModal from 'common/ShowErrorModal'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <ShowErrorModal />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
