import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './utilsh/Store.js'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
    

<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
    
  
)
