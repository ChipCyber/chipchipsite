import { createSlice } from '@reduxjs/toolkit'

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        showLogin: false,
    },
    reducers: {
        setShowLogin: (state) => {
            state.showLogin = true;
        },
        setCloseLogin: (state) => {
            state.showLogin = false;
        },
    },
})

export const { setShowLogin, setCloseLogin } = configSlice.actions

export default configSlice.reducer