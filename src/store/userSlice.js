import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setData, removeData, getData } from "../utils/user";
import { removeLocalReConnect } from "@/wallet";
// import { getBalance }  from "@/wallet/methods";
const data = getData() ?? {};

export const refreshBalance = createAsyncThunk(
    'user/refreshBalance',
    async (currentWalletAddress, { rejectWithValue }) => {
        try {
            if(!currentWalletAddress) {
                return rejectWithValue('Invalid wallet address'); 
            }
            return null;
            // const balance = await getBalance(currentWalletAddress);
            // return balance;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const removeWalletInfo = () => async (dispatch) => {
    dispatch(removeWalletData());
    dispatch(refreshBalance());
};
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {...data},
        currentWalletAddress: null,
        currentWalletBalance: null,
        walletType: null,
        networkType: null,
    },
    reducers: {
        setWalletInfo: (state, action) => {
            state.currentWalletAddress = action.payload.address;
            state.walletType = action.payload.walletType;
            state.networkType = action.payload.networkType;
            refreshBalance();
        },
        removeWalletData: (state, action) => {
            state.currentWalletAddress = null;
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
    extraReducers: (builder) => {
        builder
            .addCase(refreshBalance.pending, (state) => {
                state.currentWalletBalance = null;
            })
            .addCase(refreshBalance.fulfilled, (state, action) => {
                if(state.currentWalletAddress) {
                    state.currentWalletBalance = action.payload;
                }else{
                    state.currentWalletBalance = null;
                }
            })
            .addCase(refreshBalance.rejected, (state, action) => {
                console.error('refreshBalance failed:', action.payload);
            })
    }
})

export const { setUserInfo, removeUserInfo, setWalletInfo } = userSlice.actions

export default userSlice.reducer