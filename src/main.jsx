import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Antd + React19: https://ant-design.antgroup.com/docs/react/v5-for-19
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')).render(
  <App />
)
