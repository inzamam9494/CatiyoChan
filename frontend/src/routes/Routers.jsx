import App from '../App'
import HomeScreen from '../pages/HomeScreen'
import { createBrowserRouter } from 'react-router-dom'

// Industrial Standard: Export the router directly instead of a function
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // Default route for '/'
        element: <HomeScreen />
      },
      {
        path: 'home',
        element: <HomeScreen />
      }
    ]
  }
])

// Alternative: Keep the function approach but fix it properly
const Routers = () => {
  return router
}

export default Routers
