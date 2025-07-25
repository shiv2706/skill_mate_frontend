import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import axios from 'axios';
import App from './App.jsx'

axios.defaults.baseURL = 'https://skill-mate.onrender.com/api/v1';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </StrictMode>,
)
