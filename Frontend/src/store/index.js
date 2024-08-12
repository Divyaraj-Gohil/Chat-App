import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/useSlice.js'
import messageReducer from './slices/messageSlice.js'
import socketReducer from './slices/socketSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        socket: socketReducer
    }
})

export default store