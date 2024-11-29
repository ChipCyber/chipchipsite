import Store from "@/store";
import { NetworkType } from "@/wallet";
import { solana_getBalance, solana_sendSOL, solana_getSPLTokenBalance } from "@/wallet/solana";

export function getBalance(address) {
    const networktype = Store.getState().user.networkType;
    return getBalanceNetworkType(address, networktype);
}
export function getBalanceNetworkType(address, networktype) {
    if(networktype==NetworkType.Solana) {
        return solana_getBalance(address);
    }
    return Promise.reject(`${networktype} is not supported yet`);
}
export function getTokenBalance(address, tokenAddress) {
    const networktype = Store.getState().user.networkType;
    return getTokenBalanceNetworkType(address, tokenAddress, networktype);
}
export function getTokenBalanceNetworkType(address, tokenAddress, networktype) {
    if(networktype==NetworkType.Solana) {
        return solana_getSPLTokenBalance(address, tokenAddress);
    }
    return Promise.reject(`${networktype} is not supported yet`);
}