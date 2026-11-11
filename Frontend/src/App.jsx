import {Signup} from './components/auth/Signup'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import { ProjectRoutes } from './Routes'

function App() {
   

  return (
    <>
    <Routes>
      {/* <Route path='/' element={<Signup/>}> */}
       
      {/* </Route> */}
      <Route>
        <ProjectRoutes/>
      </Route>
    </Routes>

    </>
  )
}

export default App
