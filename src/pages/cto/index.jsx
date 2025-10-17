import React, { useEffect, useMemo, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { message, Pagination } from 'antd';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { setShowConnectWallet } from '@/store/userSlice';
import { disConnectWallet } from "@/wallet/index.js";
import { useSelector, useDispatch } from 'react-redux';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import DirectDividends from "./directDividends";
import OperationAlert from "./operationAlert";
import InputNumber from "@/components/inputNumber";
import { solana_sendSOL, solana_signMsg } from '@/wallet/solana.js';
import { getProjectListApi, getProjectApi, bindContractAddressApi, transferoutApi, communitytreasuryWithdrawApi } from "@/api/cto.js";
import { toDateStrWithSeconds, shortenString } from "@/utils";
import { sub, mul, div, formatLargeNumber } from '@/utils/number.js';
import { showLoading, hideLoading } from '@/utils/loading.js';

export default function Index() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentWalletAddress = useSelector((state) => state.user.currentWalletAddress);
    const shouldRender = useBreakpointCheck();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const [data, setData] = useState(null);
    const [showBind, setShowBind] = useState(false);
    const [showTransferIn, setShowTransferIn] = useState(false);
    const [transferInAddress, setTransferInAddress] = useState(null);
    const [showTransferOut, setShowTransferOut] = useState(false);
    const [showTreasuryTransferOut, setShowTreasuryTransferOut] = useState(false);
    const [showDirect, setShowDirect] = useState(false);
    const [showOperation, setShowOperation] = useState(false);
    const [address, setAddress] = useState('');
    const [signLoading, setSignLoading] = useState(false);
    const [transferInCount, setTransferInCount] = useState("");
    const [transferInLoading, setTransferInLoading] = useState(false);
    const [transferOutCount, setTransferOutCount] = useState("");
    const [transferOutLoading, setTransferOutLoading] = useState(false);
    const [treasuryTransferOutCount, setTreasuryTransferOutCount] = useState("");
    const [treasuryTransferOutLoading, setTreasuryTransferOutLoading] = useState(false);
    const handleInChange = (event) => {
        const newValue = event.target.value;
        if (/^(?:0(\.\d+)?|[1-9]\d*(\.\d+)?)$/.test(newValue) || newValue === '') {
            setTransferInCount(newValue);
        }
    }
    const handleOutChange = (event) => {
        const newValue = event.target.value;
        if (/^(?:0(\.\d+)?|[1-9]\d*(\.\d+)?)$/.test(newValue) || newValue === '') {
            setTransferOutCount(newValue);
        }
    }
    const handleTreasuryOutChange = (event) => {
        const newValue = event.target.value;
        if (/^(?:0(\.\d+)?|[1-9]\d*(\.\d+)?)$/.test(newValue) || newValue === '') {
            setTreasuryTransferOutCount(newValue);
        }
    }
    const connectWallet = () => {
        if(currentWalletAddress) {
            disConnectWallet();
        }else{
            dispatch(setShowConnectWallet());
        }
    }
    const showTransferInFunc = (address) => {
        setShowTransferIn(true);
        setTransferInAddress(address);
    }
    const transferIn = async () => {
        setTransferInLoading(true);
        showLoading();
        try {
            await solana_sendSOL(currentWalletAddress, transferInAddress, transferInCount);
            message.success(t('616'));
            setTransferInCount('');
            setShowTransferIn(false);
        } catch (error) {
            message.error(error);
        } finally {
            setTransferInLoading(false);
            hideLoading();
        }
    }
    const transferOut = async () => {
        setTransferOutLoading(true);
        transferoutApi({
            ctoProjId:data?data.id:null,
            ownerAddr:currentWalletAddress,
            amount:transferOutCount,
        }).then(()=>{
            message.success(t('616'));
            setTransferOutCount('');
            setShowTransferOut(false);
        }).finally(()=>{
            setTransferOutLoading(false);
        });
    }
    const treasuryTransferOut = () => {
        setTreasuryTransferOutLoading(true);
        communitytreasuryWithdrawApi({
            ctoProjId:data?data.id:null,
            ownerAddr:currentWalletAddress,
            amount:treasuryTransferOutCount,
        }).then(()=>{
            message.success(t('616'));
            setTreasuryTransferOutCount('');
            setShowTreasuryTransferOut(false);
        }).finally(()=>{
            setTreasuryTransferOutLoading(false);
        });
    }
    const bindAddress = async () => {
        try {
            setSignLoading(true);
            showLoading();
            const sign = await solana_signMsg(currentWalletAddress);
            hideLoading();
            bindContractAddressApi({creatorAddr:currentWalletAddress,tokenContractAddr:address,sign}).then(()=>{
                message.success(t('616'));
                setShowBind(false);
                refreshData();
            });
        } catch (error) {
            message.error(error);
        } finally {
            setSignLoading(false);
        }
    }
    const refreshData = () => {
        if(currentWalletAddress) {
            getProjectApi({creatorAddr:currentWalletAddress}).then(data=>{
                setData(data.data);
            });
        }else{
            setData(null);
        }
    }
    useEffect(()=>{
        refreshData();
    },[currentWalletAddress]);
    useEffect(()=>{
        getProjectListApi({page, pageSize}).then(data=>{
            setList(data.data);
            setTotal(data.total);
        });
    },[page, pageSize]);
    const loadMore = (page) => {
        setPage(page);
    }
    const statusText = useMemo(()=>{
        if(data) {
            if(data.status==='not_started') {
                return t('2008');
            }else if(data.status==='in_progress') {
                return t('2007');
            }else if(data.status==='closed') {
                return t('21075');
            }else if(data.status==='completed') {
                return t('21074');
            }
            return data.status;
        }
        return '--';
    },[data]);
    const isBind = useMemo(()=>{
        return !!data?.tokenContractAddr;
    },[data]);
    const renderWeb = () => (
        <Root>
            <Top>
                <img className='topImg' src={require('../../assets/cto/top.png').default} />
                <div className='topCenter'>
                    <div className='topTitle'>{t('21000').split('\n').map((line, index) => (<React.Fragment key={index}>{line&&<div className='desc'>{line}</div>}</React.Fragment>))}</div>
                    <div className="topTxt">{t('21001')}</div>
                </div>
            </Top>
            <div style={{ overflow: 'hidden', height: 96 }}>
                <img style={{ objectFit: 'unset', width: '100%', height: '100%' }} src={require('../../assets/home/logo_row.png').default} />
            </div>
            <Why>
                <img className='bg' src={require('../../assets/cto/why_bg.png').default} />
                <WhyContent>
                    <WhyTitle>{t('21002')}</WhyTitle>
                    <WhyRow>
                        <WhyItem>
                            <img className='icon' src={require('../../assets/cto/why_1.png').default} />
                            <div className='title'>{t('21003')}</div>
                            <div className='desc'>{t('21004')}</div>
                        </WhyItem>
                        <WhyItem>
                            <img className='icon' src={require('../../assets/cto/why_2.png').default} />
                            <div className='title'>{t('21005')}</div>
                            <div className='desc'>{t('21006')}</div>
                        </WhyItem>
                        <WhyItem>
                            <img className='icon' src={require('../../assets/cto/why_3.png').default} />
                            <div className='title'>{t('21007')}</div>
                            <div className='desc'>{t('21008')}</div>
                        </WhyItem>
                    </WhyRow>
                </WhyContent>
            </Why>
            {list&&list.map((item)=><Info key={item.id}>
                <img className='bg' src={require('../../assets/cto/info_icon.png').default} />
                <InfoBg1/>
                <InfoBg2/>
                <InfoBg3/>
                <InfoContent>
                    <InfoTitle>{item.name}<SmallBgBtn className='custom' onClick={()=>showTransferInFunc(item.buybackPoolAddr)}>{t('21019')}</SmallBgBtn></InfoTitle>
                    <InfoRow>
                        <InfoItem>
                            <div className='title'>{t('21009')}</div>
                            <div className='desc'>{toDateStrWithSeconds(item.startTime)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21010')}</div>
                            <div className='desc'>{shortenString(item.creatorAddr)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21011')}</div>
                            <div className='desc'>{mul(div(item.totalDividend,item.totalRepurchase),100)}%</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21012')}</div>
                            <div className='desc'>{mul(div(item.totalBurn,item.totalRepurchase),100)}%</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21018')}</div>
                            <div className='desc'>{formatLargeNumber(item.baseTokenBalance)}</div>
                        </InfoItem>
                    </InfoRow>
                    <InfoRow>
                        <InfoItem>
                            <div className='title'>{t('21013')}</div>
                            <div className='desc'>{formatLargeNumber(item.totalRepurchase)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21014')}</div>
                            <div className='desc'>{formatLargeNumber(item.totalDividend)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21015')}</div>
                            <div className='desc'>{formatLargeNumber(item.totalBurn)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21016')}</div>
                            <div className='desc' style={{ color: '#FEAD1D' }}>{mul(div(sub(0,item.startPrice,6),item.startPrice,6),100)}%</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21028')}</div>
                            <div className='desc'>{formatLargeNumber(item.availableBalance)} {item.symbol}</div>
                        </InfoItem>
                    </InfoRow>
                </InfoContent>
            </Info>)}
            {list&&list.length>0&&<Pagination
                total={total}
                onChange={(page)=>loadMore(page)}
                current={page}
                pageSize={pageSize}
                showQuickJumper
            />}
            <Content>
                <img className='bg_bottom' src={require('../../assets/airdrop/bg_bottom.png').default}/>
                <NoConnect>
                    <SmallBtn className='custom' onClick={connectWallet}>
                        <span>{currentWalletAddress?shortenString(currentWalletAddress):t('602')}</span>
                        <img src={require('../../assets/home/arrow_enter.png').default}/>
                    </SmallBtn>
                </NoConnect>
                {currentWalletAddress&&<Item>
                    <ItemStatus>
                        <img className='bg' src={require('../../assets/cto/icon_status_bg.png').default}/>
                        <div>{statusText}</div>
                    </ItemStatus>
                    <ItemTopIcon src={require('../../assets/cto/icon_item.png').default}/>
                    <ItemTop>
                        <ItemTopTitle>
                            <div>{data?.name ?? '--'}</div>
                            <div className='tag'>{data?.symbol ?? '--'}</div>
                        </ItemTopTitle>
                        <ItemTopAddress>
                            <div>{t('21017')}</div>
                            <div>{data?.tokenContractAddr ?? '--'}</div>
                        </ItemTopAddress>
                        <ItemTopBalance>
                            <div>{t('21018')}</div>
                            <div>{data?formatLargeNumber(data.baseTokenBalance):'--'} SOL</div>
                        </ItemTopBalance>
                        {isBind?<ItemTopRow>
                            <SmallBtn className='custom' onClick={()=>showTransferInFunc(data?.buybackPoolAddr)}>
                                <span>{t('21019')}</span>
                                <img src={require('../../assets/home/arrow_enter.png').default}/>
                            </SmallBtn>
                            <SmallBorderBtn className='custom' onClick={()=>setShowTransferOut(true)}>{t('21020')}</SmallBorderBtn>
                        </ItemTopRow>:
                        <ItemTopRow>
                            <SmallBtn className='custom' onClick={()=>setShowBind(true)}>
                                <span>{t('21031')}</span>
                                <img src={require('../../assets/home/arrow_enter.png').default}/>
                            </SmallBtn>
                        </ItemTopRow>}
                    </ItemTop>
                    <ItemBottom>
                        <ItemBottomLeft>
                            <ItemBottomTitle>
                                <img src={require('../../assets/cto/icon_overview.png').default}/>
                                <span>{t('21021')}</span>
                            </ItemBottomTitle>
                            <ItemBottomLeftRow>
                                <ItemBottomLeftItem>
                                    <div>{t('21022')}</div>
                                    <div>{data?.symbol ?? '--'}</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21013')}</div>
                                    <div>{data?formatLargeNumber(data.totalRepurchase):'--'}</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21014')}</div>
                                    <div>{data?formatLargeNumber(data.totalDividend):'--'}</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21015')}</div>
                                    <div>{data?formatLargeNumber(data.totalBurn):'--'}</div>
                                </ItemBottomLeftItem>
                            </ItemBottomLeftRow>
                            {isBind?<ItemBottomLeftBtnRow>
                                <SmallBgBtn className='custom' onClick={()=>setShowDirect(true)}>{t('21026')}</SmallBgBtn>
                                <SmallBgBtn className='custom' onClick={()=>setShowOperation(true)}>{t('21027')}</SmallBgBtn>
                            </ItemBottomLeftBtnRow>:
                            <ItemBottomLeftBtnRow>
                                <SmallBgBtn className='custom' onClick={()=>setShowBind(true)}>{t('21031')}</SmallBgBtn>
                            </ItemBottomLeftBtnRow>}
                        </ItemBottomLeft>
                        <ItemBottomLine/>
                        <ItemBottomRight>
                            <ItemBottomTitle>
                                <img src={require('../../assets/cto/icon_treasury.png').default}/>
                                <span>{t('21028')}</span>
                            </ItemBottomTitle>
                            <ItemBottomRightItem>
                                <div>{t('21029')}</div>
                                <div>{data?formatLargeNumber(data.availableBalance):'--'} {data?.symbol ?? '--'}</div>
                            </ItemBottomRightItem>
                            {isBind?<SmallBorderBtn className='custom' onClick={()=>setShowTreasuryTransferOut(true)}>{t('21020')}</SmallBorderBtn>:
                            <SmallBorderBtn className='custom' onClick={()=>setShowBind(true)}>{t('21031')}</SmallBorderBtn>}
                            <ItemBottomRightInfo>
                                <img src={require('../../assets/cto/icon_info.png').default}/>
                                <span>{t('21030')}</span>
                            </ItemBottomRightInfo>
                        </ItemBottomRight>
                    </ItemBottom>
                </Item>}
            </Content>
        </Root>
    )
    const renderH5 = () => (
        <Root>
            <TopH5>
                <img className='topImg' src={require('../../assets/cto/h5/top.png').default} />
                <div className='topCenter'>
                    <div className='topTitle'>{t('21000').split('\n').map((line, index) => (<React.Fragment key={index}>{line&&<div className='desc'>{line}</div>}</React.Fragment>))}</div>
                    <div className="topTxt">{t('21001')}</div>
                </div>
                <div style={{ overflow: 'hidden', height: 30, width: '100%', }}>
                    <img style={{ objectFit: 'cover', verticalAlign: 'top', height: '100%', width: '100%', }} src={require('../../assets/home/h5/logo_row.png').default} />
                </div>
            </TopH5>
            <WhyH5>
                <img className='bg' src={require('../../assets/cto/h5/why_bg.png').default} />
                <WhyH5Content>
                    <WhyTitle>{t('21002')}</WhyTitle>
                    <WhyRow>
                        <WhyItemH5>
                            <img className='icon' src={require('../../assets/cto/why_1.png').default} />
                            <div>
                                <div className='title'>{t('21003')}</div>
                                <div className='desc'>{t('21004')}</div>
                            </div>
                        </WhyItemH5>
                        <WhyItemH5>
                            <img className='icon' src={require('../../assets/cto/why_2.png').default} />
                            <div>
                                <div className='title'>{t('21005')}</div>
                                <div className='desc'>{t('21006')}</div>
                            </div>
                        </WhyItemH5>
                        <WhyItemH5>
                            <img className='icon' src={require('../../assets/cto/why_3.png').default} />
                            <div>
                                <div className='title'>{t('21007')}</div>
                                <div className='desc'>{t('21008')}</div>
                            </div>
                        </WhyItemH5>
                    </WhyRow>
                </WhyH5Content>
            </WhyH5>
            {list&&list.map((item)=><Info key={item.id}>
                <img className='bg' src={require('../../assets/cto/info_icon.png').default} />
                <InfoBg1/>
                <InfoBg2/>
                <InfoBg3/>
                <InfoContent>
                    <InfoTitle>{item.name}<SmallBgBtn className='custom' onClick={()=>showTransferInFunc(item.buybackPoolAddr)}>{t('21019')}</SmallBgBtn></InfoTitle>
                    <InfoRow>
                        <InfoItem>
                            <div className='title'>{t('21009')}</div>
                            <div className='desc'>{toDateStrWithSeconds(item.startTime)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21010')}</div>
                            <div className='desc'>{shortenString(item.creatorAddr)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21011')}</div>
                            <div className='desc'>{mul(div(item.totalDividend,item.totalRepurchase),100)}%</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21012')}</div>
                            <div className='desc'>{mul(div(item.totalBurn,item.totalRepurchase),100)}%</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21013')}</div>
                            <div className='desc'>{formatLargeNumber(item.totalRepurchase)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21014')}</div>
                            <div className='desc'>{formatLargeNumber(item.totalDividend)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21015')}</div>
                            <div className='desc'>{formatLargeNumber(item.totalBurn)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21016')}</div>
                            <div className='desc' style={{ color: '#FEAD1D' }}>{mul(div(sub(0,item.startPrice,6),item.startPrice,6),100)}%</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21018')}</div>
                            <div className='desc'>{formatLargeNumber(item.baseTokenBalance)}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21028')}</div>
                            <div className='desc'>{formatLargeNumber(item.availableBalance)} {item.symbol}</div>
                        </InfoItem>
                    </InfoRow>
                </InfoContent>
            </Info>)}
            {list&&list.length>0&&<Pagination
                total={total}
                onChange={(page)=>loadMore(page)}
                current={page}
                pageSize={pageSize}
                showQuickJumper
            />}
            <ContentH5>
                <NoConnect>
                    <SmallBtn className='custom' onClick={connectWallet}>
                        <span>{currentWalletAddress?shortenString(currentWalletAddress):t('602')}</span>
                        <img src={require('../../assets/home/arrow_enter.png').default}/>
                    </SmallBtn>
                </NoConnect>
                {currentWalletAddress&&<Item>
                    <ItemStatus>
                        <img className='bg' src={require('../../assets/cto/icon_status_bg.png').default}/>
                        <div>{statusText}</div>
                    </ItemStatus>
                    <ItemTopIcon src={require('../../assets/cto/h5/icon_item.png').default}/>
                    <ItemTop>
                        <ItemTopTitle>
                            <div>{data?.name ?? '--'}</div>
                            <div className='tag'>{data?.symbol ?? '--'}</div>
                        </ItemTopTitle>
                        <ItemTopAddress>
                            <div>{t('21017')}</div>
                            <div>{data?.tokenContractAddr ?? '--'}</div>
                        </ItemTopAddress>
                        <ItemTopBalance>
                            <div>{t('21018')}</div>
                            <div>{data?formatLargeNumber(data.baseTokenBalance):'--'} SOL</div>
                        </ItemTopBalance>
                        {isBind?<ItemTopRow>
                            <SmallBtn className='custom' onClick={()=>showTransferInFunc(data?.buybackPoolAddr)}>
                                <span>{t('21019')}</span>
                                <img src={require('../../assets/nav/login_arrow.png').default}/>
                            </SmallBtn>
                            <SmallBorderBtn className='custom' onClick={()=>setShowTransferOut(true)}>{t('21020')}</SmallBorderBtn>
                        </ItemTopRow>:
                        <ItemTopRow>
                            <SmallBtn className='custom' onClick={()=>setShowBind(true)}>
                                <span>{t('21031')}</span>
                                <img src={require('../../assets/nav/login_arrow.png').default}/>
                            </SmallBtn>
                        </ItemTopRow>}
                    </ItemTop>
                    <ItemBottom>
                        <ItemBottomLeft>
                            <ItemBottomTitle>
                                <img src={require('../../assets/cto/icon_overview.png').default}/>
                                <span>{t('21021')}</span>
                            </ItemBottomTitle>
                            <ItemBottomLeftRow>
                                <ItemBottomLeftItem>
                                    <div>{t('21022')}</div>
                                    <div>{data?.symbol ?? '--'}</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21013')}</div>
                                    <div>{data?formatLargeNumber(data.totalRepurchase):'--'}</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21014')}</div>
                                    <div>{data?formatLargeNumber(data.totalDividend):'--'}</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21015')}</div>
                                    <div>{data?formatLargeNumber(data.totalBurn):'--'}</div>
                                </ItemBottomLeftItem>
                            </ItemBottomLeftRow>
                            {isBind?<ItemBottomLeftBtnRow>
                                <SmallBgBtn className='custom' onClick={()=>setShowDirect(true)}>{t('21026')}</SmallBgBtn>
                                <SmallBgBtn className='custom' onClick={()=>setShowOperation(true)}>{t('21027')}</SmallBgBtn>
                            </ItemBottomLeftBtnRow>:
                            <ItemBottomLeftBtnRow>
                                <SmallBgBtn className='custom' onClick={()=>setShowBind(true)}>{t('21031')}</SmallBgBtn>
                            </ItemBottomLeftBtnRow>}
                        </ItemBottomLeft>
                        <ItemBottomRight>
                            <ItemBottomTitle>
                                <img src={require('../../assets/cto/icon_treasury.png').default}/>
                                <span>{t('21028')}</span>
                            </ItemBottomTitle>
                            <ItemBottomRightItem>
                                <div>{t('21029')}</div>
                                <div>{data?formatLargeNumber(data.availableBalance):'--'} {data?.symbol ?? '--'}</div>
                            </ItemBottomRightItem>
                            {isBind?<SmallBorderBtn className='custom' onClick={()=>setShowTreasuryTransferOut(true)}>{t('21020')}</SmallBorderBtn>:
                            <SmallBorderBtn className='custom' onClick={()=>setShowBind(true)}>{t('21031')}</SmallBorderBtn>}
                            <ItemBottomRightInfo>
                                <img src={require('../../assets/cto/icon_info.png').default}/>
                                <span>{t('21030')}</span>
                            </ItemBottomRightInfo>
                        </ItemBottomRight>
                    </ItemBottom>
                </Item>}
            </ContentH5>
        </Root>
    )
    return <>
        {shouldRender?renderWeb():renderH5()}
        <DialogOverlay
            style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
            isOpen={showBind}
            onDismiss={()=>setShowBind(false)}
        >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>{t('21031')}</div>
                    <img className='close' onClick={()=>setShowBind(false)} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                <ModalContent>
                    <Row>
                        <div className='title'>{t('21032')}</div>
                        <div className='input'>
                            <input type='text' value={address} onChange={e=>setAddress(e.target.value)} placeholder={t('21033')}/>
                        </div>
                    </Row>
                    <LargeBtn disabled={signLoading||!address} className='custom' onClick={bindAddress}>{t('21034')}</LargeBtn>
                </ModalContent>
            </DialogC>
        </DialogOverlay>
        <DialogOverlay
            style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
            isOpen={showTransferIn}
            onDismiss={()=>setShowTransferIn(false)}
        >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>{t('21019')}</div>
                    <img className='close' onClick={()=>setShowTransferIn(false)} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                <ModalContent>
                    <Row>
                        <div className='title'>{t('605')}</div>
                        <InputNumber value={transferInCount} unit="SOL" onChange={handleInChange} placeholder={t('21023')}/>
                    </Row>
                    <LargeBtn disabled={transferInCount<=0||transferInLoading||!data?.buybackPoolAddr} className='custom' onClick={transferIn}>{t('21034')}</LargeBtn>
                </ModalContent>
            </DialogC>
        </DialogOverlay>
        <DialogOverlay
            style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
            isOpen={showTransferOut}
            onDismiss={()=>setShowTransferOut(false)}
        >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>{t('21020')}</div>
                    <img className='close' onClick={()=>setShowTransferOut(false)} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                <ModalContent>
                    <Row>
                        <div className='title'>{t('605')}</div>
                        <InputNumber value={transferOutCount} unit="SOL" onChange={handleOutChange} placeholder={t('21023')}/>
                    </Row>
                    <LargeBtn disabled={transferOutCount<=0||transferOutLoading||!data?.buybackPoolAddr} className='custom' onClick={transferOut}>{t('21034')}</LargeBtn>
                </ModalContent>
            </DialogC>
        </DialogOverlay>
        <DialogOverlay
            style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
            isOpen={showTreasuryTransferOut}
            onDismiss={()=>setShowTreasuryTransferOut(false)}
        >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>{t('21020')}</div>
                    <img className='close' onClick={()=>setShowTreasuryTransferOut(false)} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                <ModalContent>
                    <Row>
                        <div className='title'>{t('605')}</div>
                        <InputNumber value={treasuryTransferOutCount} unit={data?data.symbol:''} onChange={handleTreasuryOutChange} placeholder={t('21023')}/>
                    </Row>
                    <Tip className="g_wait">{t('21078')}</Tip>
                    <LargeBtn disabled={treasuryTransferOutCount<=0||treasuryTransferOutLoading||!data?.buybackPoolAddr} className='custom' onClick={treasuryTransferOut}>{t('21034')}</LargeBtn>
                </ModalContent>
            </DialogC>
        </DialogOverlay>
        <DirectDividends ctoProjId={data?data.id:null} show={showDirect} onClose={()=>setShowDirect(false)}/>
        <OperationAlert ctoProjId={data?data.id:null} tokenContractAddr={data?data.tokenContractAddr:null} show={showOperation} onClose={()=>setShowOperation(false)}/>
    </>
}

const Root = styled.div`
position: relative;
overflow: hidden;
width: 100%;   
`
const Top = styled.div`
padding: 208px 0px 50px;
position: relative;
min-height: 700px;
.topImg {
pointer-events: none;
position: absolute;
top: 0;
right: 0;
height: 700px;
}
.topCenter {
  margin-left: 155px;
  .topTitle {
    width: 50%;   
    font-size: 62px;
    font-weight: 700;
    .desc {
        line-height: 1.1;
    }
  }
  .topTxt {
    margin-top: 20px;
    width: 43%;
    font-size: 24px; 
    line-height:28px;
    opacity: 0.6;
  }
}
`
const TopH5 = styled.div`
position: relative;
.topImg {
pointer-events: none;
width: 100%;
}
.topCenter {
width:100%;
padding: 0 35px 16px;
display: flex;
flex-direction:column;
align-items: center;
text-align: center;
  .topTitle {
    padding:0px 12px;
    font-size: 32px;
    font-weight: 700;
    .desc {
        line-height: 1.2;
    }
  }
  .topTxt {
    margin-top: 28px;
    font-size: 12px; 
    line-height:22px;
    opacity: 0.8;
  }
}
`
const Why = styled.div`
position: relative;
height: 580px;
.bg {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
object-fit: cover;
}
`
const WhyContent = styled.div`
position: relative;
padding: 62px 0 100px;
display: flex;
gap: 60px;
flex-direction: column;
align-items: center;
`
const WhyTitle = styled.div`
font-size: 24px;
font-weight: 600;
background: linear-gradient(90deg, #FFF, #6F53FC);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 48px;
};
`
const WhyRow = styled.div`
position: relative;
display: flex;
gap: 15px;
justify-content: center;
flex-direction: column;
${({ theme }) => theme.mediaQueries.sm}{
gap: 35px;
flex-direction: row;
};
`
const WhyItem = styled.div`
width: 390px;
border-radius: 18px;
border: 1px solid #F1ACFF;
background: #200F4B;
box-shadow: 0 0 20px 0 #B190ED inset;
padding: 40px 35px;
.icon {
width: 58px;
height: 58px;
}
.title {
font-size: 24px;
font-weight: 500;
margin-top: 15px;
}
.desc {
font-size: 18px;
opacity: 0.8;
margin-top: 30px;
}
`
const Info = styled.div`
margin-bottom: 20px;
background: #8D52F6;
position: relative;
.bg {
pointer-events: none;
position: absolute;
z-index: 1;
top: 0;
right: 0;
width: 230px;
mix-blend-mode: lighten;
}
`
const InfoBg1 = styled.div`
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
background: radial-gradient(63.77% 63.26% at 51.84% 122.51%, #75F6A3 0%, #8E52F6 100%);
`
const InfoBg2 = styled.div`
position: absolute;
left: 50%;
top: 0;
width: 70%;
height: 100%;
transform: translateX(-50%);
background: radial-gradient(63.77% 63.26% at 51.84% 122.51%, #75F6A3 0%, #8E52F6 100%);
${({ theme }) => theme.mediaQueries.sm}{
width: 50%;
};
`
const InfoBg3 = styled.div`
position: absolute;
left: 50%;
top: 0;
width: 32%;
height: 100%;
transform: translateX(-50%);
background: radial-gradient(63.77% 63.26% at 51.84% 122.51%, #75F6A3 0%, #8E52F6 100%);
${({ theme }) => theme.mediaQueries.sm}{
width: 210px;
};
`
const InfoContent = styled.div`
position: relative;
padding: 48px 28px;
${({ theme }) => theme.mediaQueries.sm}{
padding: 42px 10px 68px 140px;
};
`
const InfoTitle = styled.div`
font-size: 42px;
font-weight: 600;
line-height: 32px;
margin-bottom: 42px;
display: flex;
align-items: center;
gap: 20px;
${({ theme }) => theme.mediaQueries.sm}{
margin-bottom: 60px;
font-size: 56px;
line-height: 60px;
};
`
const InfoRow = styled.div`
padding-left: 8px;
display: flex;
align-items: center;
flex-wrap: wrap;
row-gap: 18px;
& + & {
    margin-top: 32px;
}
${({ theme }) => theme.mediaQueries.sm}{
flex-wrap: nowrap;
};
`
const InfoItem = styled.div`
width: 50%;
.title {
font-size: 14px;
}
.desc {
margin-top: 5px;
font-size: 18px;
font-weight: 600;
}
${({ theme }) => theme.mediaQueries.sm}{
flex: 1;
.title {
font-size: 18px;
}
.desc {
margin-top: 10px;
font-size: 32px;
}
};
`
const Content = styled.div`
width: 100%;
position: relative;
padding: 80px 170px 180px;
.bg_bottom {
position: absolute;
left: 0;
bottom: 0;
width: 100%;
}
`
const NoConnect = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding-bottom: 30px;
position: relative;
z-index: 1;
`
const Item = styled.div`
position: relative;
margin-bottom: 20px;
${({ theme }) => theme.mediaQueries.sm}{
margin-bottom: 50px;
};
`
const ItemStatus = styled.div`
position: absolute;
z-index: 2;
top: -6px;
left: 20px;
width: 57px;
height: 28px;
font-size: 12px;
font-weight: 500;
color: #000;
display: flex;
align-items: center;
justify-content: center;
> img {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
> div {
position: relative;
}
${({ theme }) => theme.mediaQueries.sm}{
width: 125px;
height: 65px;
top: -10px;
left: unset;
right: 57px;
font-size: 21px;
font-weight: 800;
};
`
const ItemTop = styled.div`
position: relative;
padding: 92px 20px 24px;
background: #241F2D;
border-radius: 12px 12px 0 0;
${({ theme }) => theme.mediaQueries.sm}{
padding: 56px 94px 62px;
border-radius: 22px 22px 0 0;
};
`
const ItemTopIcon = styled.img`
pointer-events: none;
position: absolute;
z-index: 1;
top: 0;
right: 0;
width: 100%;
${({ theme }) => theme.mediaQueries.sm}{
width: unset;
height: 460px;
};
`
const ItemTopTitle = styled.div`
position: relative;
z-index: 1;
display: flex;
align-items: center;
gap: 15px;
font-size: 21px;
font-weight: 600;
margin-bottom: 15px;
.tag {
display: flex;
padding: 2px 5px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 32px;
background: rgba(255, 255, 255, 0.30);
font-size: 12px;
font-weight: 500;
}
${({ theme }) => theme.mediaQueries.sm}{
gap: 25px;
font-size: 36px;
margin-bottom: 30px;
.tag {
padding: 8px 15px;
font-size: 16px;
font-weight: 700;
}
};
`
const ItemTopAddress = styled.div`
position: relative;
z-index: 1;
font-size: 14px;
font-weight: 600;
margin-bottom: 15px;
> div {
    &:nth-child(2) {
        margin-top: 6px;
        font-weight: 400;
        opacity: 0.6;
    }
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
margin-bottom: 22px;
};
`
const ItemTopBalance = styled.div`
font-size: 14px;
font-weight: 600;
margin-bottom: 20px;
> div {
    &:nth-child(2) {
        margin-top: 6px;
        font-size: 21px;
    }
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
margin-bottom: 30px;
> div {
    &:nth-child(2) {
        font-size: 24px;
    }
}
};
`
const ItemTopRow = styled.div`
display: flex;
align-items: center;
gap: 20px;
`
const ItemBottom = styled.div`
background: #383144;
padding: 20px;
display: flex;
flex-direction: column;
gap: 22px;
border-radius: 0 0 12px 12px;
${({ theme }) => theme.mediaQueries.sm}{
flex-direction: row;
gap: 66px;
padding-top: 25px;
padding-left: 75px;
padding-right: 40px;
padding-bottom: 32px;
border-radius: 0 0 22px 22px;
};
`
const ItemBottomTitle = styled.div`
display: flex;
gap: 8px;
align-items: center;
font-size: 15px;
font-weight: 600;
> img {
width: 15px;
height: 15px;
}
${({ theme }) => theme.mediaQueries.sm}{
gap: 14px;
padding-left: 16px;
font-size: 24px;
> img {
width: 22px;
height: 22px;
}
};
`
const ItemBottomLeft = styled.div`
flex: 2;
`
const ItemBottomLeftRow = styled.div`
margin-top: 20px;
display: flex;
align-items: center;
justify-content: space-between;
${({ theme }) => theme.mediaQueries.sm}{
padding-left: 20px;
};
`
const ItemBottomLeftItem = styled.div`
font-size: 14px;
> div {
&:nth-child(2) {
margin-top: 6px;
font-size: 18px;
font-weight: 600;
}
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
> div {
&:nth-child(2) {
margin-top: 10px;
font-size: 21px;
}
}
};
`
const ItemBottomLeftBtnRow = styled.div`
margin-top: 25px;
display: flex;
gap: 10px;
flex-wrap: wrap;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 32px;
gap: 20px;
};
`
const ItemBottomLine = styled.div`
width: 1px;
opacity: 0.2;
background: #FFF;
`
const ItemBottomRight = styled.div`
flex: 1;
`
const ItemBottomRightItem = styled.div`
margin-top: 8px;
margin-bottom: 16px;
font-size: 14px;
font-weight: 600;
> div {
&:nth-child(2) {
margin-top: 6px;
font-size: 18px;
}
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
margin-top: 12px;
margin-bottom: 30px;
padding-left: 20px;
> div {
&:nth-child(2) {
font-size: 24px;
}
}
};
`
const ItemBottomRightInfo = styled.div`
margin-top: 14px;
display: flex;
align-items: center;
gap: 4px;
font-size: 12px;
opacity: 0.6;
> img {
width: 12px;
height: 12px;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 18px;
font-size: 14px;
};
`
const ContentH5 = styled.div`
padding: 30px 15px;
`
const SmallBtn = styled.button`
width: fit-content;
padding-left: 25px;
padding-right: 25px;
height: 40px;
border-radius: 20px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
height: 52px;
border-radius: 32px;
padding-left: 55px;
padding-right: 55px;
}
`
const LargeBtn = styled(SmallBtn)`
margin-top: 28px;
width: 100%;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 40px;
};
`
const SmallBorderBtn = styled.button`
width: fit-content;
padding-left: 25px;
padding-right: 25px;
height: 40px;
border-radius: 20px;
background: transparent;
border: 1px solid #FFF;
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
height: 52px;
border-radius: 32px;
padding-left: 55px;
padding-right: 55px;
}
`
const SmallBgBtn = styled.button`
flex-shrink: 0;
width: fit-content;
padding-left: 25px;
padding-right: 25px;
height: 40px;
border-radius: 20px;
background: #FFF;
color: #000;
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
height: 52px;
border-radius: 32px;
padding-left: 55px;
padding-right: 55px;
}
`
const WhyH5 = styled.div`
position: relative;
padding: 30px 15px 70px;
.bg {
position: absolute;
top: 0;
left: 0;
width: 100%;
}
`
const WhyH5Content = styled.div`
position: relative;
display: flex;
gap: 25px;
flex-direction: column;
`
const WhyItemH5 = styled.div`
border-radius: 12px;
border: 0.26px solid #F1ACFF;
background: #200F4B;
box-shadow: 0 0 5.208px 0 #B190ED inset;
padding: 10px 15px;
display: flex;
align-items: center;
gap: 10px;
.icon {
width: 30px;
height: 30px;
}
.title {
font-size: 14px;
font-weight: 500;
}
.desc {
font-size: 12px;
opacity: 0.8;
margin-top: 5px;
}
`
const DialogC = styled(DialogContent)`
width: calc(100% - 50px) !important;
padding: 16px 20px 32px !important;
border-radius: 12px !important;
background: #362F42 !important;
color: ${({ theme }) => theme.colors.text} !important;
${({ theme }) => theme.mediaQueries.sm}{
    width: 600px !important;
    padding: 26px 40px 55px !important;
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
const ModalContent = styled.div`

`
const Tip = styled.div`
margin-top: 15px;
font-size: 12px;
font-weight: 500;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 14px;
};
`
const Row = styled.div`
margin-top: 16px;
.title {
margin-bottom: 15px;
font-size: 14px;
font-weight: 400;
opacity: 0.4;
}
.tip {
text-align: left;
margin-top: 10px;
margin-bottom: 0;
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
font-size: 16px;
font-weight: 500;
opacity: 0.8;
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
