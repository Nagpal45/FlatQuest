import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/home'
import Listing from './pages/listing/listing'
import Layout from './pages/layout/layout'
import SinglePage from './pages/singlePage/singlePage'
import Profile from './pages/profile/profile'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <HomePage/>
        },
        {
          path: '/listings',
          element: <Listing/>
        },
        {
          path: '/listing/:id',
          element: <SinglePage/>
        },
        {
          path: '/profile',
          element: <Profile/>
        }
      ]
    }
  ])

  return (
    
    <RouterProvider router={router}/>
  )
}

export default App