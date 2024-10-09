import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import configReducer from './configSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        config: configReducer,
    },
})