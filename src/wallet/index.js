import { setWalletProvider }  from "@/wallet/walletProvider";
import { message } from "antd";

export const WalletType = {
    OKX: 'OKX',
    Phantom: 'Phantom',
};
export const NetworkType = {
    Solana: 'Solana',
}
export const NetworkSupprtWallet = {
    Solana: [WalletType.Phantom,WalletType.OKX],
}
export const AllNetworkType = [NetworkType.Solana];

const saveLocalKey = "recentConnectorId";
export function removeLocalReConnect() {
    localStorage.removeItem(saveLocalKey);
}
export function recentConnector() {
    const value = localStorage.getItem(saveLocalKey);
    if(value) {
        const valueArr = `${value}`.split('_');
        if(valueArr.length==2) {
            const wallet = valueArr[0];
            const network = valueArr[1];
            if(AllNetworkType.indexOf(network)>=0) {
                return runConnectWallet(wallet, network);
            }
        }
    }
    return Promise.resolve(null);
}
export function runConnectWallet(wallet, network) {
    return new Promise((resolve, reject) => {
        getProviderAddress(wallet, network).then(res=>{
            setWalletProvider(res.provider);
            localStorage.setItem(saveLocalKey, `${wallet}_${network}`);
            resolve({...res, wallet, network, provider: undefined});
        }).catch(error=>{
            reject(error);
        });
    });
}
async function getProviderAddress(wallet, network) {
    console.log('wallet :>> ', wallet);
    console.log('network :>> ', network);
    let provider;
    let address;
    let accounts;
    let notInstalled = false;
    try {
        if(wallet===WalletType.Phantom) {
            if(network===NetworkType.Solana) {
                if(window.phantom&&window.phantom.solana&&window.phantom.solana.isPhantom) {
                    provider = window.phantom.solana;
                    address = (await provider.connect()).publicKey.toString()
                    accounts = [address];
                    return {provider, address, accounts};
                }else{
                    notInstalled = true;
                }
            }
        }else if(wallet===WalletType.OKX) {
            if(network===NetworkType.Solana) {
                if(window.okxwallet&&window.okxwallet.solana&&window.okxwallet.solana.isOkxWallet) {
                    provider = window.okxwallet.solana;
                    address = (await provider.connect()).publicKey.toString()
                    accounts = [address];
                    return {provider, address, accounts};
                }else{
                    notInstalled = true;
                }
            }
        }
        if(notInstalled) {
            message.error('Not installed or not allowed');
        }else{
            message.error(`${wallet} Invalid network type: ${network}`);
        }
        return Promise.reject(`${wallet} Invalid network type: ${network}`);
    } catch (error) {
        // console.error('Failed to connect wallet:', error.message);
        message.error(error.message);
        return Promise.reject(error.message);
    }
}