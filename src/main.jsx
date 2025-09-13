import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import axios from 'axios';
import App from './App.jsx'


//axios.defaults.baseURL = 'http://localhost:8080/api/v1';
 axios.defaults.baseURL = 'https://skill-mate.onrender.com/api/v1';
//axios.defaults.baseURL = 'https://skillmate-env.eba-3eqmq2xb.ap-south-1.elasticbeanstalk.com/api/v1';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </StrictMode>,
)
