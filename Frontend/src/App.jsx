import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Login'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { setSocket } from './store/slices/socketSlice'
import { setOnlineUsers } from './store/slices/useSlice'

const router = createHashRouter([
  {
    path: '/chat',
    element: <HomePage />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/',
    element: <Login />
  }
])

function App() {
  const { authUser } = useSelector(store => store.user)
  const { socket } = useSelector(store => store.socket)
  const dispatch = useDispatch()
  useEffect(() => {
    if (authUser) {
      const socketio = io('https://temp-7grl.onrender.com', {
        query: {
          userId: authUser.id
        }
      })
      dispatch(setSocket(socketio))

      socketio?.on('onlineUser', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      })
      return () => socketio.close()
    }
    else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [authUser])
  return (
    <div className='h-screen flex md:items-center justify-center py-4 md:p-4'>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </div>
  )
}

export default App
