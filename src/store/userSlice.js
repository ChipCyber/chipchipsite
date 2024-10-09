import { createSlice } from '@reduxjs/toolkit'
import { setData, removeData, getData } from "../utils/user";
const data = getData() ?? {};
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {...data},
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            setData(action.payload);
        },
        removeUserInfo: (state) => {
            state.userInfo = {};
            removeData();
        },
    },
})

export const { setUserInfo, removeUserInfo } = userSlice.actions

export default userSlice.reducer