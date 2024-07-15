import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/home'
import Listing from './pages/listing/listing'
import {Layout, RequireAuth } from './pages/layout/layout'
import SinglePage from './pages/singlePage/singlePage'
import Profile from './pages/profile/profile'
import Login from './pages/login/login'
import Register from './pages/register/register'
import NewPostPage from './pages/newPost/newPost'
import ProfileUpdatePage from './pages/profileUpdate/profileUpdate'
import { listPageLoader, singlePageLoader } from './lib/loaders'


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
          element: <Listing/>,
          loader: listPageLoader,
        },
        {
          path: '/listing/:id',
          element: <SinglePage/>,
          loader: singlePageLoader,
        },
        {
          path:"/login",
          element: <Login/>
        },
        {
          path:"/register",
          element: <Register/>
        },
      ]
    },
    {
      path:"/",
      element: <RequireAuth/>,
      children: [
        {
          path: '/profile',
          element: <Profile/>
        },
        {
          path:"/updateProfile",
          element: <ProfileUpdatePage/>
        },
        {
          path:"/newPost",
          element: <NewPostPage/>
        },
      ]
    }
  ])

  return (
    
    <RouterProvider router={router}/>
  )
}

export default App