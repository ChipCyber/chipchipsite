import Store from "@/store";
import { NetworkType } from "@/wallet";
import { solana_getBalance } from "@/wallet/solana";

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