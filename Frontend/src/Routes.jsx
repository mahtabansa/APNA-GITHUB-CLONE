import { useEffect, useState } from 'react'
import { Dashboard } from './components/dashboard/Dashboard'
import { Profile } from './components/user/Profile'
import { Signup } from './components/auth/Signup'
import { Login } from './components/auth/Login'
import { useAuth } from './AuthProvider.jsx'
import {useNavigate} from 'react-router-dom'
import { useRoutes } from 'react-router-dom'

export const ProjectRoutes = () => {
      const navigate = useNavigate();
      const {currentUser, setCurrentUser} = useAuth();

      useEffect(() => {

            const userIdFromStorage = localStorage.getItem("userId");

            if (userIdFromStorage && !currentUser) {
                  setCurrentUser(userIdFromStorage);
            }
            if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) { navigate("/auth") };

            if (userIdFromStorage && window.location.pathname == "/auth") {
                  navigate("/")
            }
      }, [currentUser, setCurrentUser, navigate]);

      const element = useRoutes([
            { path: "/", element: <Dashboard /> },
              { path: "/auth", element: <Login /> },
                { path: "/signup", element: <Signup /> },
                  { path: "/profile", element: <Profile /> }
      ]);
     return element

}
