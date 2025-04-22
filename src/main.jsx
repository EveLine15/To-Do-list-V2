import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import './style/index.scss'
import App from './app/App.jsx'
import { store } from './store/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App /> 
      </Provider>  
    </BrowserRouter>
  </StrictMode>,
)
