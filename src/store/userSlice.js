import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setData, removeData, getData } from "../utils/user";
import { getBalance }  from "@/wallet/methods";
const data = getData() ?? {};

export const refreshWalletBalance = createAsyncThunk(
    'user/refreshWalletBalance',
    async (currentWalletAddress, { rejectWithValue }) => {
        try {
            if(!currentWalletAddress) {
                return rejectWithValue('Invalid wallet address'); 
            }
            const balance = await getBalance(currentWalletAddress);
            return balance;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const removeWalletInfo = () => (dispatch) => {
    dispatch(removeWalletData());
};
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {...data},
        currentWalletAddress: null,
        currentWalletBalance: null,
        walletType: null,
        networkType: null,
        showConnectWallet: false,
    },
    reducers: {
        setWalletInfo: (state, action) => {
            state.currentWalletAddress = action.payload.address;
            state.walletType = action.payload.walletType;
            state.networkType = action.payload.networkType;
        },
        removeWalletData: (state, action) => {
            state.currentWalletAddress = null;
            state.currentWalletBalance = null;
            state.walletType = null;
            state.networkType = null;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            setData(action.payload);
        },
        removeUserInfo: (state) => {
            state.userInfo = {};
            removeData();
        },
        setShowConnectWallet: (state) => {
            state.showConnectWallet = true;
        },
        setCloseConnectWallet: (state) => {
            state.showConnectWallet = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshWalletBalance.pending, (state) => {
                state.currentWalletBalance = null;
            })
            .addCase(refreshWalletBalance.fulfilled, (state, action) => {
                if(state.currentWalletAddress) {
                    state.currentWalletBalance = action.payload;
                }else{
                    state.currentWalletBalance = null;
                }
            })
            .addCase(refreshWalletBalance.rejected, (state, action) => {
                console.error('refreshWalletBalance failed:', action.payload);
                state.currentWalletBalance = null;
            })
    }
})

export const { setUserInfo, removeUserInfo, setWalletInfo, removeWalletData, setShowConnectWallet, setCloseConnectWallet } = userSlice.actions

export default userSlice.reducer