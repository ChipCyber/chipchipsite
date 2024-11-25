import { createSlice } from '@reduxjs/toolkit'
import { setData, removeData, getData } from "../utils/user";
import { removeLocalReConnect } from "@/wallet";
const data = getData() ?? {};
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {...data},
        currentAddress: null,
        walletType: null,
        networkType: null,
    },
    reducers: {
        setWalletInfo: (state, action) => {
            state.currentAddress = action.payload.address;
            state.walletType = action.payload.walletType;
            state.networkType = action.payload.networkType;
        },
        removeWalletInfo: (state, action) => {
            state.currentAddress = null;
            state.walletType = null;
            state.networkType = null;
            removeLocalReConnect();
        },
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

export const { setUserInfo, removeUserInfo, setWalletInfo, removeWalletInfo } = userSlice.actions

export default userSlice.reducer