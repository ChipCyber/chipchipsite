import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { message, Pagination, Modal } from "antd";
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { shortenString, parseTime }  from "../../utils";
import { DestructionAddress, InscriptionNumberStart, InscriptionNumberEnd } from "../../constants";

import { exchangeBtcbalanceApi, exchangeExchangeinfoApi, exchangeRegistApi, exchangeCommitHashApi } from "../../api/exchange";
import { showLoading, hideLoading } from '../../utils/loading';

const WalletType = Object.freeze({
    UNISAT: 'UNISAT',
    OKX: 'OKX',
});

export default function Index() {
    const { t } = useTranslation();
    const [showHistory, setShowHistory] = useState(false);
    const [showChooseWallet, setShowChooseWallet] = useState(false);
    const [walletType, setWalletType] = useState(WalletType.UNISAT);
    const currentWalletInstance = useRef(null);

    const [accounts, setAccounts] = useState([]);
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState("");
    const shouldRender = useBreakpointCheck();

    const [balance, setBalance] = useState(null);
    const [historyList, setHistoryList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [count, setCount] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    const [btnEnabled, setBtnEnabled] = useState(false);
    const inscriptionsIdArr = useRef([]);

    const handleAccountsChanged = (_accounts) => {
        const account = _accounts[0];
        if (accounts[0] === account) {
            return;
        }
        setAccounts(_accounts);
        if (_accounts.length > 0) {
            setConnected(true);
            setAddress(account);
        } else {
            setConnected(false);
        }
    };
    const showConnectWallet = () => {
        if(!connected) {
            setShowChooseWallet(true);
        }else{
            disconnectWallet();
        }
    }
    const disconnectWallet = () => {
        if(connected) {
            setConnected(false);
            setAccounts([]);
            setAddress("");
            setBalance(null);
            setWalletType(null);
            if(currentWalletInstance.current) {
                currentWalletInstance.current.disconnect();
                currentWalletInstance.current.removeListener("accountsChanged", handleAccountsChanged);
            }
            currentWalletInstance.current = null;
        }
    }
    useEffect(()=>{
        return () => {
            disconnectWallet();
        };
    },[])
    const connectWallet = async (walletType = WalletType.UNISAT) => {
        if(connected) return;
        try{
            currentWalletInstance.current = getWalletInstance(walletType);
            if(currentWalletInstance.current) {
                setWalletType(walletType);
                currentWalletInstance.current.on("accountsChanged", handleAccountsChanged);
                const result = await currentWalletInstance.current.requestAccounts();
                handleAccountsChanged(result);
                setShowChooseWallet(false);
            }else{
                message.error("Not Installed");
            }
        }catch(err) {
            if(err.message) {
                message.error(err.message);
            }
        }
    }
    const getWalletInstance = (walletType) => {
        let walletInstanceObj = null;
        switch (walletType) {
            case WalletType.UNISAT:
                walletInstanceObj = window.unisat;
                break;
            case WalletType.OKX:
                walletInstanceObj = window.okxwallet&&window.okxwallet.bitcoin;
                break;
        }
        return walletInstanceObj;
    }
    useEffect(() => {
        setBalance(null);
        if(address) {
            exchangeBtcbalanceApi({btc_address:address}).then(({data})=>{
                setBalance(data);
            });
        }
    }, [address]);
    const getHistory = () => {
        if(address) {
            setPage(1);
            setHistoryList([]);
            setTotal(0);
            exchangeExchangeinfoApi({btc_address:address,page:1,page_size:10}).then(({data})=>{
                setHistoryList([...(data.o_lit_wait_info ?? []), ...(data.o_lit_ex_info ?? [])]);
                setTotal(data.total);
                setShowHistory(true);
            });
        }else{
            showConnectWallet();
        }
    }
    const loadMoreHistory = (page) => {
        setPage(page);
        exchangeExchangeinfoApi({btc_address:address,page:page,page_size:10}).then(({data})=>{
            setHistoryList(data.o_lit_ex_info);
            setTotal(data.total);
        });
    }
    // useEffect(() => {
    //     async function checkWallet() {
    //         let wallet = currentWalletInstance.current;
    //         for (let i = 1; i < 10 && !wallet; i += 1) {
    //             await new Promise((resolve) => setTimeout(resolve, 100*i));
    //             wallet = getWalletInstance(walletType);
    //         }
    //         if (!wallet)
    //             return;
    //         // wallet.getAccounts().then((accounts) => {
    //         //     handleAccountsChanged(accounts);
    //         // });
    //         wallet.current.removeListener("accountsChanged", handleAccountsChanged);
    //     }
    //     checkWallet().then();
    //     return () => {
    //         disconnectWallet();
    //     };
    // }, []);
    useEffect(() => {
        if(count>0 && inputAddress) {
            setBtnEnabled(true);
        }else{
            setBtnEnabled(false);
        }
    }, [count, inputAddress]);
    const handleChange = (event) => {
        const newValue = event.target.value;
        if (newValue === '' || /^[1-9]\d*$/.test(newValue)) {
            setCount(newValue);
        }
    };
    const sureAction = async () => {
        if(address) {
            const signMsg = inputAddress;
            const publicKey = await currentWalletInstance.current.getPublicKey();
            currentWalletInstance.current.signMessage(signMsg).then((signature)=>{
                requestRegist(publicKey,signature);
            });
        }else{
            showConnectWallet();
        }
    }
    const requestRegist = (publicKey,signature,force=0) => {
        exchangeRegistApi({
            btc_address:address,
            publicKey,
            solana_address:inputAddress,
            signature,
            count:Number(count),
            force,
        }).then(({res})=>{
            sendWalletNFT(Number(count),{
                btc_address:address,
                publicKey,
                solana_address:inputAddress,
                signature,
                count:Number(count),
            });
            setInputAddress('');
            setCount('');
            message.success("Success");
        }).catch(({res})=>{
            if(res.code==-1) {
                Modal.confirm({
                    title: `${t('613')} ${res.msg}`,
                    content: `${t('614')} ${inputAddress}`,
                    onOk() {
                        requestRegist(publicKey,signature,1);
                    },
                });
            }
        });
    }
    const getInscriptions = async (cursor=0,count,callback) => {
        try {
            if(cursor<=0) {
                inscriptionsIdArr.current = [];
            }
            let res = await currentWalletInstance.current.getInscriptions(cursor,100);
            if(res.total>0){
                res.list.forEach(item => {
                    if(item.inscriptionNumber>=InscriptionNumberStart&&item.inscriptionNumber<=InscriptionNumberEnd) {
                        inscriptionsIdArr.current.push(item.inscriptionId);
                    }
                });
            }
            if(inscriptionsIdArr.current.length<res.total&&inscriptionsIdArr.current.length<count) {
                getInscriptions(cursor+1,count,callback);
            }else{
                callback&&callback(true);
            }
        } catch (err) {
            callback&&callback(false);
            if(err.message) {
                message.error(err.message);
            }
        }
    }
    const sendWalletNFT = (count,registParams) => {
        showLoading();
        getInscriptions(0,count,async (done)=>{
            if(!done) {
                hideLoading();
                return;
            }
            const inscriptionIds = inscriptionsIdArr.current;
            const submitIds = inscriptionIds.slice(0, Math.min(count,inscriptionIds.length));
            if(submitIds.length==0) {
                message.error("No Inscription");
                hideLoading();
                return;
            }
            if(walletType==WalletType.OKX) {
                currentWalletInstance.current.transferNft({
                    from: address,
                    to: DestructionAddress,
                    data: submitIds,
                }).then(data=>{
                    const txhash = data.txhash;
                    exchangeCommitHashApi({...registParams,hash:txhash}).then(()=>{});
                }).catch(err => {
                    if(err.message) {
                        message.error(err.message);
                    }
                }).finally(()=>{
                    hideLoading();
                });
                return;
            }
            const publicKey = await currentWalletInstance.current.getPublicKey();
            const result = await (await fetch("https://mempool.space/api/v1/fees/recommended")).json();
            let params = {
                payment_from:address,
                payment_from_pub_key:publicKey,
                ordinals_from:address,
                ordinals_from_pub_key:publicKey,
                inscription_ids:submitIds,
                fee_rate:result.fastestFee,
                to_address:DestructionAddress,
            };
            fetch("https://api-1.brc420.io/api/v1/market/batch_transfer_v3", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(params),
            })
            .then(response => response.json())
            .then(response => {
                if(response.code==0) {
                    const psbtHex = response.data.psbt_hex;
                    signPsbtHex(psbtHex,registParams);
                }else{
                    message.error(response.msg);
                }
            }).catch(err => {
                if(err.message) {
                    message.error('brc420:'+err.message);
                }
            }).finally(()=>{
                hideLoading();
            });
        });
    }
    const signPsbtHex = async (psbtHex,registParams={}) => {
        try {
            let signPsbtHex = await currentWalletInstance.current.signPsbt(psbtHex);
            let txid = await currentWalletInstance.current.pushPsbt(signPsbtHex);
            message.success(txid);
            console.log(txid);
            exchangeCommitHashApi({...registParams,hash:txid}).then(()=>{});
        } catch (err) {
            if(err.message) {
                message.error('push:'+err.message);
            }
        }
    }
    const renderNoData = () => (
        <NoData>
            <img src={require('../../assets/noData.png').default}/>
            <span>{t('375')}</span>
        </NoData>
    );
    const renderWeb = () => (
        <Root>
            <img className='bg' src={require('../../assets/displacement/bg.png').default}/>
            <Content>
                <div className='t_title'>{t('600')}</div>
                <div className='t_desc'>{t('601')}</div>
                <Btn className='custom' onClick={()=>showConnectWallet()}>
                    <span>{address?shortenString(address):t('602')}</span>
                    <img src={require('../../assets/nav/login_arrow.png').default}/>
                </Btn>
                {connected&&<Coin>
                    <img src={require('../../assets/displacement/coin.png').default}/>
                    <span>{t('603')} {balance ?? '--'} CHIPCHIPBOX</span>
                </Coin>}
                <Card>
                    <div className='title'>{t('604')}</div>
                    <Row>
                        <div className='title'>{t('605')}</div>
                        <div className='input'>
                            <input type='number' min={1} value={count} onChange={handleChange} placeholder={t('605')}/>
                            <span>CHIPCHIPBOX</span>
                        </div>
                    </Row>
                    <Row>
                        <div className='title'>{t('606')}</div>
                        <div className='input'>
                            <input type='text' value={inputAddress} onChange={e=>setInputAddress(e.target.value)} placeholder={t('606')}/>
                        </div>
                        <ul className='tip'>
                            <li>{t('607')}</li>
                            <li>{t('615')}</li>
                        </ul>
                    </Row>
                    <Sure disabled={!btnEnabled} className='custom' onClick={()=>sureAction()} type='button'>{address?t('608'):t('602')}</Sure>
                    <History onClick={()=>getHistory()}>{t('609')}</History>
                </Card>
                <ExplainAddress>
                    <div>{t('612')}</div>
                    <div className='d'>{DestructionAddress}</div>
                </ExplainAddress>
            </Content>
            <DialogOverlay
                    style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                    isOpen={showHistory}
                    onDismiss={()=>setShowHistory(false)}
                >
                <DialogM aria-label='list'>
                    <ModalHeader>
                        <div className='title'>{t('609')}</div>
                        <img className='close' onClick={()=>setShowHistory(false)} src={require('../../assets/nav/close.png').default}/>
                    </ModalHeader>
                    <ModalTableHeader>
                        <span>{t('610')}</span>
                        <span>{t('605')}</span>
                        <span>{t('611')}</span>
                    </ModalTableHeader>
                    <ModalTableContent>
                        {
                            historyList&&historyList.length>0?
                            historyList.map((item,idx)=>(
                                <ModalTableRow key={idx}>
                                    <span>{parseTime(item.time)}</span>
                                    <span>{item.count} <span className={item.status==1?'g_success':'g_wait'}>{item.status==1?t('616'):t('617')}</span></span>
                                    <span>{item.sol_addr}</span>
                                </ModalTableRow>
                            ))
                            :
                            renderNoData()
                        }
                        <Pagination
                            total={total}
                            // showSizeChanger
                            // pageSizeOptions={["10", "20", "50"]}
                            // showTotal={(total) => t("title_pagination_tip", { total: total })}
                            onChange={(page)=>loadMoreHistory(page)}
                            current={page}
                            pageSize={10}
                            showQuickJumper
                            hideOnSinglePage
                        />
                    </ModalTableContent>
                </DialogM>
            </DialogOverlay>
        </Root>
    )
    const renderH5 = () => (
        <RootH5>
            <img className='bg' src={require('../../assets/displacement/h5/bg.png').default}/>
            <ContentH5>
                <ContentH5Header>
                    <div className='title'>{t('600')}</div>
                    <div className='desc'>{t('601')}</div>
                    <Btn className='custom' onClick={()=>showConnectWallet()}>
                        <span>{address?shortenString(address):t('602')}</span>
                        <img src={require('../../assets/nav/login_arrow.png').default}/>
                    </Btn>
                    {connected&&<Coin>
                        <img src={require('../../assets/displacement/coin.png').default}/>
                        <span>{t('603')} {balance ?? '--'} CHIPCHIPBOX</span>
                    </Coin>}
                </ContentH5Header>
                <Card>
                    <div className='title'>{t(604)}</div>
                    <Row>
                        <div className='title'>{t('605')}</div>
                        <div className='input'>
                            <input type='number' min={1} value={count} onChange={handleChange} placeholder={t('605')}/>
                            <span>CHIPCHIPBOX</span>
                        </div>
                    </Row>
                    <Row>
                        <div className='title'>{t('606')}</div>
                        <div className='input'>
                            <input type='text' value={inputAddress} onChange={e=>setInputAddress(e.target.value)} placeholder={t('606')}/>
                        </div>
                        <ul className='tip'>
                            <li>{t('607')}</li>
                            <li>{t('615')}</li>
                        </ul>
                    </Row>
                    <Sure disabled={!btnEnabled} className='custom' onClick={()=>sureAction()} type='button'>{address?t('608'):t('602')}</Sure>
                    <History onClick={()=>getHistory()}>{t('609')}</History>
                </Card>
                <ExplainAddress>
                    <div>{t('612')}</div>
                    <div className='d'>{DestructionAddress}</div>
                </ExplainAddress>
            </ContentH5>
            <DialogOverlay
                    style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                    isOpen={showHistory}
                    onDismiss={()=>setShowHistory(false)}
                >
                <DialogM>
                    <ModalHeader>
                        <div className='title'>{t('609')}</div>
                        <img className='close' onClick={()=>setShowHistory(false)} src={require('../../assets/nav/close.png').default}/>
                    </ModalHeader>
                    <ModalTableHeader>
                        <span>{t('605')}</span>
                        <span>{t('611')}</span>
                    </ModalTableHeader>
                    <ModalTableContent>
                        {
                            historyList&&historyList.length>0?
                            historyList.map((item,idx)=>(
                                <ModalTableRowH5 key={idx}>
                                    <div className='left'>
                                        <span>{item.count} <span className={item.status==1?'g_success':'g_wait'}>{item.status==1?t('616'):t('617')}</span></span>
                                        <span>{parseTime(item.time)}</span>
                                    </div>
                                    <span className='right'>{item.sol_addr}</span>
                                </ModalTableRowH5>
                            ))
                            :
                            renderNoData()
                        }
                        <Pagination
                            total={total}
                            // showSizeChanger
                            // pageSizeOptions={["10", "20", "50"]}
                            // showTotal={(total) => t("title_pagination_tip", { total: total })}
                            onChange={(page)=>loadMoreHistory(page)}
                            current={page}
                            pageSize={10}
                            showQuickJumper
                            hideOnSinglePage
                        />
                    </ModalTableContent>
                </DialogM>
            </DialogOverlay>
        </RootH5>
    )
    return <div>
        {shouldRender?renderWeb():renderH5()}
        <DialogOverlay
                style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                isOpen={showChooseWallet}
                onDismiss={()=>setShowChooseWallet(false)}
            >
            <DialogM aria-label='modal'>
                <ModalHeader>
                    <div className='title'>{t('602')}</div>
                    <img className='close' onClick={()=>setShowChooseWallet(false)} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                <ConnectWalletContent>
                    <ConnectWalletItem onClick={()=>connectWallet(WalletType.UNISAT)}>
                        <ConnectWalletBtn src={require('../../assets/nav/unisat.png').default}/>
                        <ConnectWalletTitle>UNISAT</ConnectWalletTitle>
                    </ConnectWalletItem>
                    <ConnectWalletItem onClick={()=>connectWallet(WalletType.OKX)}>
                        <ConnectWalletBtn src={require('../../assets/nav/okx.png').default}/>
                        <ConnectWalletTitle>OKX</ConnectWalletTitle>
                    </ConnectWalletItem>
                </ConnectWalletContent>
            </DialogM>
        </DialogOverlay>
    </div>
}

const NoData = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 25px 0 16px;
min-height: 280px;
img {
width: 40px;
}
span {
margin-top: 13px;
font-size: 16px;
font-weight: 600;
line-height: 18.933px;
opacity: 0.2;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 32px 0 16px;
img {
width: 60px;
}
span {
margin-top: 16px;
font-size: 21px;
line-height: 37.867px;
}
};
`

const RootH5 = styled.div`
padding: 75px 10px;
position: relative;
.bg {
pointer-events: none;
position: absolute;
top: 64px;
left: 0;
width: 100%;
}
`
const ContentH5 = styled.div`
position: relative;
padding: 26px 14px;
border-radius: 18px;
background: radial-gradient(146.87% 146.86% at 50% 50%, rgba(36, 31, 45, 0.00) 0%, #936486 100%);
`
const ContentH5Header = styled.div`
padding: 0 34px;
.title {
text-align: center;
font-size: 21px;
font-weight: 700;
}
.desc {
margin-top: 28px;
text-align: center;
font-size: 16px;
opacity: 0.7;
}
`

const Root = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
padding: 208px 0 200px;
.bg {
pointer-events: none;
position: absolute;
top: 108px;
left: 0;
width: 100%;
}
`
const Content = styled.div`
position: relative;
width: 522px;
text-align: center;
.t_title {
font-size: 34px;
font-weight: 700;
padding: 0 12px;
}
.t_desc {
margin-top: 36px;
font-size: 24px;
opacity: 0.7;
padding: 0 12px;
}
`
const Btn = styled.button`
margin-top: 24px;
position: relative;
font-size: 16px;
font-weight: 600;
width: 100%;
height: 40px;
padding: 0 25px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
color: ${({theme})=>theme.colors.text};
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
img {
width: 20px;
height: 20px;
}
${({ theme }) => theme.mediaQueries.sm}{
margin: 0 auto;
margin-top: 32px;
font-size: 18px;
width: auto;
height: 53px;
padding: 0 55px;
};
`
const Coin = styled.div`
margin-top: 20px;
border-radius: 8px;
background: rgba(48, 41, 60, 0.7);
padding: 5px;
font-size: 14px;
font-weight: 600;
text-align: center;
img {
width: 30px;
height: 30px;
margin-right: 15px;
}
`
const ExplainAddress = styled.div`
margin-top: 20px;
font-size: 16px;
text-align: center;
color: ${({ theme }) => theme.colors.failure};
word-break: break-all;
.d {
font-size: 14px;
}
`
const Card = styled.div`
margin-top: 20px;
border-radius: 12px;
background: #241F2D;
padding: 15px 22px;
.title {
margin-left: 5px;
text-align: left;
font-size: 16px;
font-weight: 600;
line-height: 21px;
}
${({ theme }) => theme.mediaQueries.sm}{
border-radius: 4px;
padding: 22px 40px;
.title {
margin-left: 0;
font-size: 24px;
line-height: 32px;
}
};
`
const Row = styled.div`
margin-top: 16px;
.title {
margin-left: 5px;
margin-bottom: 10px;
font-size: 14px;
font-weight: 400;
opacity: 0.8;
}
.tip {
text-align: left;
margin-top: 10px;
margin-left: 5px;
color: #FF8A8A;
font-size: 12px;
font-weight: 600;
}
.input {
border-radius: 4px;
background: #121212;
padding: 0 14px;
height: 40px;
display: flex;
align-items: center;
gap: 10px;
input {
flex: 1;
height: 100%;
font-size: 14px;
font-weight: 500;
}
span {
font-size: 13px;
}
}
${({ theme }) => theme.mediaQueries.sm}{
.title {
margin-left: 14px;
font-size: 16px;
font-weight: 500;
}
.tip {
margin-left: 14px;
font-size: 14px;
opacity: 0.9;
}
.input {
padding: 0 20px;
height: 50px;
span {
font-size: 14px;
}
}
};
`
const Sure = styled.button`
margin-top: 28px;
height: 40px;
font-size: 15px;
font-weight: 600;
border-radius: 20px;
width: 100%;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 18px;
height: 53px;
border-radius: 32px;
font-size: 18px;
};
`
const History = styled.div`
cursor: pointer;
margin: 0 auto;
display: block;
margin-top: 22px;
font-size: 15px;
font-weight: 500;
text-decoration-line: underline;
text-align: center;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 26px;
font-size: 16px;
};
`
const DialogM = styled(DialogContent)`
width: calc(100% - 50px) !important;
padding: 16px 20px !important;
border-radius: 12px !important;
background: #362F42 !important;
color: ${({ theme }) => theme.colors.text} !important;
${({ theme }) => theme.mediaQueries.sm}{
    width: 600px !important;
    padding: 26px 40px !important;
};
`
const ModalHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 30px;
.title {
font-size: 21px;
font-weight: 600;
line-height: 32px;
}
.close {
cursor: pointer;
width: 17.5px;
height: 17.5px;
}
${({ theme }) => theme.mediaQueries.sm}{
.title {
font-size: 24px;
}
};
`
const ModalTableHeader = styled.div`
border-radius: 8px;
background: rgba(255, 255, 255, 0.1);
padding: 0 12px;
height: 30px;
display: flex;
align-items: center;
font-size: 12px;
font-weight: 500;
line-height: 19px;
span {
opacity: 0.6;
&:first-child {
flex: 1;
}
&:nth-child(2) {
flex: 2;
text-align: right;
}
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 0 22px;
height: 50px;
font-size: 16px;
font-weight: 600;
line-height: 32px;
span {
&:first-child {
flex: 2;
}
&:nth-child(2) {
flex: 2;
text-align: left;
}
&:nth-child(3) {
flex: 4;
text-align: right;
}
}
};
`
const ModalTableContent = styled.div`
margin-top: 4px;
max-height: 50vh;
min-height: 280px;
overflow-y: auto;
`
const ModalTableRow = styled.div`
display: flex;
align-items: center;
border-bottom: 1px solid #514664;
padding: 16px 22px 18px;
font-size: 14px;
font-weight: 600;
line-height: 20px;
span {
word-break: break-word;
&:first-child {
flex: 2;
}
&:nth-child(2) {
flex: 2;
}
&:nth-child(3) {
flex: 4;
text-align: right;
font-weight: 400;
}
}
`
const ModalTableRowH5 = styled.div`
display: flex;
align-items: center;
gap: 20px;
border-bottom: 1px solid #514664;
padding: 14px 12px;
font-size: 14px;
font-weight: 600;
line-height: 19px;
span {
word-break: break-word;
font-size: 12px;
}
.left {
display: flex;
flex-direction: column;
flex: 1;
    span{
        &:first-child {
        flex: 2;
        font-weight: 600;
        }
        &:nth-child(2) {
        width: 70px;
        opacity: 0.6;
        }
    }
}
.right {
flex: 2;
text-align: right;
opacity: 0.8;
}
`
const ConnectWalletContent = styled.div`
padding: 50px 0;
display: flex;
align-items: center;
justify-content: space-around;
`
const ConnectWalletItem = styled.div`
cursor: pointer;
display: flex;
align-items: center;
flex-direction: column;
gap: 10px;
background-color: ${({ theme }) => theme.colors.inputSecondary};
padding: 10px;
border-radius: 20px;
width: 120px;
height: 120px;
${({ theme }) => theme.mediaQueries.sm}{
width: 140px;
height: 140px;
};
`
const ConnectWalletBtn = styled.img`
width: 60px;
height: 60px;
${({ theme }) => theme.mediaQueries.sm}{
width: 80px;
height: 80px;
};
`
const ConnectWalletTitle = styled.span`
font-size: 16px;
font-weight: bold;
`
