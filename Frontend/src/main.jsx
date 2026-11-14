import { createRoot } from 'react-dom/client'
import './App.css'
import { AuthProvider } from './AuthProvider.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectRoutes } from './Routes.jsx'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    
    <Router>
     <ProjectRoutes/>
    </Router>

  </AuthProvider>


)
