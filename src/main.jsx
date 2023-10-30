import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import './styles/styles.css'
import './styles/main.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/countdown",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
