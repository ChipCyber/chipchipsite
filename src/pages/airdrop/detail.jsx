import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { message, InputNumber } from 'antd';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { useSelector, useDispatch } from 'react-redux';
import { setShowConnectWallet } from '@/store/userSlice';
import {
    airdropGetDetailApi,
    airdropGetWalletInfoApi,
    airdropQueryBoxApi,
    airdropGetRewardApi,
} from "@/api/mint.js";
import { _saveToTwoWei,_getValueDivided } from '@/constants/constantsFunction';
import {
    openUrl,
    OKX_BUY_CHIPBOX_URL,
    JOIN_GOKU_COMMUNITY,
    FOLLOW_GOKU_X,
} from "@/constants";
import { shortenAddress, formatNumberWithCommas } from "@/utils";
import { getWalletProvider } from "@/wallet/walletProvider.js";
import useLanguageChange from '@/hooks/useLanguageChange.js';

export default function Index() {
    const { t } = useTranslation();
    const currentWalletAddress = useSelector((state) => state.user.currentWalletAddress);
    const dispatch = useDispatch();
    const shouldRender = useBreakpointCheck();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let aValue = searchParams.get('id');
    const [data, setData] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [chipBoxId, setChipBoxId] = useState(null);
    const [id, _] = useState(aValue);
    const [walletInfo, setWalletInfo] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const fetchData = () => {
        airdropGetDetailApi({active_id:Number(id)}).then(({data})=>{
            setData(data);
            refreshData();
        });
    }
    useLanguageChange(fetchData);
    useEffect(() => {
        if(id) {
            fetchData();
        }
    }, [id]);
    useEffect(() => {
        if(currentWalletAddress) {
            getWalletInfo();
        }else{
            setWalletInfo(null);
        }
    }, [currentWalletAddress]);
    const getWalletInfo = () => {
        airdropGetWalletInfoApi({active_id:Number(id),address:currentWalletAddress}).then(({data})=>{
            setWalletInfo(data);
        });
    }
    const receiveAirdrop = async () => {
        try {
            const encodedMessage = new TextEncoder().encode(`${id}_${currentWalletAddress}`);
            const { signature, publicKey } = await getWalletProvider().signMessage(encodedMessage, 'utf8');
            const decodedSignature = Buffer.from(signature, 'base64');
            const hexSignature = decodedSignature.toString('hex');
            airdropGetRewardApi({
                "active_id": Number(id),
                "address": publicKey,
                "signature": hexSignature,
            }).then(({data})=>{
                message.success(`${t('218')} ${_saveToTwoWei(data.airdrop_amount,6)} ${data.symbol}`);
                getWalletInfo();
            });
        } catch (error) {
            message.error(error.message);
        }
    }
    const closeSearch = () => {
        setShowSearch(false);
        setChipBoxId(null);
        setSearchResult(null);
    }
    const searchAirdrop = () => {
        setSearchResult(null);
        airdropQueryBoxApi({active_id:Number(id),box_id:`${chipBoxId}`}).then(({data})=>{
            setSearchResult(data);
        });
    }
    useEffect(() => {
        const timer = setInterval(() => {
            refreshData();
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const refreshData = () => {
        setData((prevData) => {
            if(!prevData) {
                return null;
            }
            const now = new Date();
            const startTime = new Date(prevData.start_time);
            const endTime = new Date(prevData.end_time);
            let startDiff = startTime - now;
            let endDiff = endTime - now;
            const formatTime = (diff) => {
                if (diff <= 0) return { days: '0', hours: '00', minutes: '00', seconds: '00' };
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
                const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
                const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
                return { days: days.toString(), hours, minutes, seconds };
            };
            const isBegin = startDiff<=0;
            const isEnd = endDiff<=0;
            return {
                ...prevData,
                isBegin,
                isEnd,
                remaining: isBegin||isEnd?formatTime(endDiff):formatTime(startDiff),
            };
        });
    }
    if(!data) {
        return null;
    }
    return (
        <Root>
            <Content>
                <Header>
                    <Icon src={data.head_image} alt='icon' />
                    <HeaderContent>
                        <InfoLeftHeader>
                            <div>{data.name}</div>
                            {!shouldRender&&<InfoTag className={data.isEnd?'end':(data.isBegin?'ing':'')}>{data.isEnd?t('2006'):(data.isBegin?t('2007'):t('2008'))}</InfoTag>}
                        </InfoLeftHeader>
                        <div>{data.token_overview}</div>
                    </HeaderContent>
                </Header>
                <Info>
                    <InfoLeft>
                        <InfoLeftHeader>
                            <div>{data.name}</div>
                            {shouldRender&&<InfoTag className={data.isEnd?'end':(data.isBegin?'ing':'')}>{data.isEnd?t('2006'):(data.isBegin?t('2007'):t('2008'))}</InfoTag>}
                        </InfoLeftHeader>
                        <InfoTipList>
                            {data.slogan&&data.slogan.split(data.slogan.indexOf('\\n')>=0?'\\n':'\n').map((line, index) => (<React.Fragment key={index}>{line&&<InfoTip>{line}</InfoTip>}</React.Fragment>))}
                        </InfoTipList>
                        <InfoAirdrop>
                            <div>{t('2009')}</div>
                            <span>{formatNumberWithCommas(_saveToTwoWei(data.airdrop_total,6))} {data.symbol}</span>
                        </InfoAirdrop>
                    </InfoLeft>
                    <InfoRight>
                        <InfoTimeTip>{data.isEnd?t('2011'):(data.isBegin?t('2011'):t('2012'))}</InfoTimeTip>
                        <Time>
                            <TimeItem>
                                <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                <span>{data.remaining?.days ?? 0}D</span>
                            </TimeItem>
                            <span>:</span>
                            <TimeItem>
                                <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                <span>{data.remaining?.hours ?? 0}</span>
                            </TimeItem>
                            <span>:</span>
                            <TimeItem>
                                <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                <span>{data.remaining?.minutes ?? 0}</span>
                            </TimeItem>
                            <span>:</span>
                            <TimeItem>
                                <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                <span>{data.remaining?.seconds ?? 0}</span>
                            </TimeItem>
                        </Time>
                        <InfoProgressTip>
                            <div>{t('2010')}</div>
                            <div>{formatNumberWithCommas(_saveToTwoWei(data.airdrop_current,6))} / <span>{formatNumberWithCommas(_saveToTwoWei(data.airdrop_total,6))}</span></div>
                        </InfoProgressTip>
                        <InfoProgress style={{'--progress': _getValueDivided(data.airdrop_current,data.airdrop_total)+'%'}}></InfoProgress>
                        <InfoAccountInfo>{t('2015')}：{currentWalletAddress?shortenAddress(currentWalletAddress):'--'}<br/>{walletInfo&&walletInfo.claiming==1?t('215'):t('2016')}：{walletInfo?`${formatNumberWithCommas(_saveToTwoWei(walletInfo.airdrop_amount,6))} ${walletInfo.symbol}`:'--'}<br/>{t('2010')}：{walletInfo?`${formatNumberWithCommas(_saveToTwoWei(walletInfo.claimed_amount,6))} ${walletInfo.symbol}`:'--'}</InfoAccountInfo>
                        <InfoBtnRow>
                            <SmallBtn className='custom' disabled={currentWalletAddress?(!data.isBegin||data.isEnd||!walletInfo||walletInfo.claiming==1||walletInfo.airdrop_amount<=0):false} onClick={()=>{currentWalletAddress?receiveAirdrop():dispatch(setShowConnectWallet())}}>
                                <span>{currentWalletAddress?(walletInfo&&walletInfo.claiming==1?t('215'):(data.isEnd?t('2006'):(data.isBegin?t('2013'):t('2014')))):t('602')}</span>
                                {shouldRender?<img src={require('@/assets/home/arrow_enter.png').default}/>:
                                <img src={require('@/assets/nav/login_arrow.png').default}/>}
                            </SmallBtn>
                            <SmallBtn className='custom' onClick={()=>setShowSearch(true)}>
                                <span>{t('2017')}</span>
                                {shouldRender?<img src={require('@/assets/home/arrow_enter.png').default}/>:
                                <img src={require('@/assets/nav/login_arrow.png').default}/>}
                            </SmallBtn>
                        </InfoBtnRow>
                    </InfoRight>
                </Info>
                <Introduction>
                    <IntroductionHeader>
                        <img src={data.logo} alt='coin'/>
                        <div>
                            <div>{data.symbol}</div>
                            <div>{data.token_slogan}</div>
                        </div>
                    </IntroductionHeader>
                    <Title>{t('2018')}</Title>
                    <IntroductionDesc dangerouslySetInnerHTML={{__html:data.token_introduce}}></IntroductionDesc>
                    <IntroductionContact>
                        <div onClick={()=>openUrl(data.token_website)}>
                            <img src={require('@/assets/airdrop/website.png').default}/>
                            <span>{t('2019')}</span>
                        </div>
                        <div onClick={()=>openUrl(data.token_telegram)}>
                            <img src={require('@/assets/airdrop/telegram.png').default}/>
                            <span>Telegram</span>
                        </div>
                    </IntroductionContact>
                    <Title>{t('2020')}</Title>
                    <TokenInfo>{t('342')}：{data.symbol}</TokenInfo>
                    <TokenInfo>{t('2021')}</TokenInfo>
                    <TokenInfo>{t('344')}：{data.chain_name}</TokenInfo>
                    <TokenInfo>{t('2022')}：${_saveToTwoWei(data.token_price,6)}</TokenInfo>
                    <Title>{t('2023')}</Title>
                    <IntroductionDesc dangerouslySetInnerHTML={{__html:data.community_reviews}}></IntroductionDesc>
                </Introduction>
                <Leader>
                    <LeaderHeader>
                        <img src={require('@/assets/airdrop/leader_avatar.png').default} alt='icon'/>
                        <span>{t('2024')}</span>
                    </LeaderHeader>
                    <LeaderBtnRow>
                        <SmallBtn className='custom' onClick={()=>openUrl(OKX_BUY_CHIPBOX_URL)}>
                            <span>{t('2002')}</span>
                            {shouldRender?<img src={require('@/assets/home/arrow_enter.png').default}/>:
                                <img src={require('@/assets/nav/login_arrow.png').default}/>}
                        </SmallBtn>
                        <SmallBtn className='custom' onClick={()=>openUrl(JOIN_GOKU_COMMUNITY)}>
                            <span>{t('176')}</span>
                            {shouldRender?<img src={require('@/assets/home/arrow_enter.png').default}/>:
                                <img src={require('@/assets/nav/login_arrow.png').default}/>}
                        </SmallBtn>
                        <SmallBtn className='custom' onClick={()=>openUrl(FOLLOW_GOKU_X)}>
                            <span>{t('2025')}</span>
                            {shouldRender?<img src={require('@/assets/home/arrow_enter.png').default}/>:
                                <img src={require('@/assets/nav/login_arrow.png').default}/>}
                        </SmallBtn>
                    </LeaderBtnRow>
                    <LeaderContent>
                        <div>
                            <Title>{t('2026')}</Title>
                            <LeaderContentLeftDesc>{t('2027')}</LeaderContentLeftDesc>
                            <LeaderContentLeftDesc>{t('2028')}</LeaderContentLeftDesc>
                        </div>
                        <div>
                            <Title>{t('2029')}</Title>
                            <LeaderTipList>
                                <LeaderTip>{t('2030')}</LeaderTip>
                                <LeaderTip>{t('2031')}</LeaderTip>
                                <LeaderTip>{t('2032')}</LeaderTip>
                                <LeaderTip>{t('2033')}</LeaderTip>
                                <LeaderTip>{t('2034')}</LeaderTip>
                                <LeaderTip>{t('2035')}</LeaderTip>
                            </LeaderTipList>
                        </div>
                    </LeaderContent>
                </Leader>
                {shouldRender?<img className='bg_bottom' src={require('../../assets/airdrop/bg_bottom.png').default}/>:
                <img className='bg_bottom' src={require('../../assets/airdrop/h5/bottom_bg.png').default}/>}
            </Content>
            <DialogOverlay
                style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                isOpen={showSearch}
                onDismiss={()=>closeSearch()}
            >
                <Dialog aria-label='search'>
                    <DialogHeader>
                        <div className='title'>{t('2017')}</div>
                        <img className='close' onClick={()=>closeSearch()} src={require('@/assets/nav/close.png').default}/>
                    </DialogHeader>
                    <DialogTip>{t('2036')}</DialogTip>
                    <DialogInput
                        min={1}
                        max={10000}
                        value={chipBoxId}
                        onChange={(value)=>setChipBoxId(value)}
                        placeholder={t('2037')}
                        parser={(value) => value.replace(/[^\d]/g, "")}
                        formatter={(value) => (value ? Number(value).toString() : "")}
                    />
                    <Btn disabled={!chipBoxId} className='custom' onClick={()=>searchAirdrop()}>{t('2017')}</Btn>
                    {searchResult&&<DialogResult>{t('335')}： {formatNumberWithCommas(_saveToTwoWei(searchResult.airdrop_amount,6))} {searchResult.symbol}</DialogResult>}
                </Dialog>
            </DialogOverlay>
        </Root>
    )
}

const Root = styled.div`
position: relative;
overflow: hidden;
min-height: 100vh;
`
const Content = styled.div`
min-height: 100vh;
padding: 80px 15px 50px;
position: relative;
.bg_bottom {
position: absolute;
left: 0;
bottom: 0;
width: 100%;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 180px 120px 100px;
};
`
const Header = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
${({ theme }) => theme.mediaQueries.sm}{
flex-direction: row;
gap: 52px;
}
`
const Icon = styled.img`
width: 100%;
border-radius: 12px;
${({ theme }) => theme.mediaQueries.sm}{
width: 50%;
border-radius: 18px;
}
`
const HeaderContent = styled.div`
> div {
    &:first-child {
    font-size: 21px;
    font-weight: 600;
    }
    &:nth-child(2) {
    margin-top: 15px;
    font-size: 13px;
    line-height: 21px;
    opacity: 0.8;
    }
}
${({ theme }) => theme.mediaQueries.sm}{
> div {
    &:first-child {
    font-size: 32px;
    }
    &:nth-child(2) {
    margin-top: 30px;
    font-size: 18px;
    line-height: 32px;
    }
}
}
`
const Info = styled.div`
margin-top: 20px;
border-radius: 12px;
border: 1px solid #2B292E;
padding: 14px 10px 25px;
display: flex;
flex-direction: column;
gap: 18px;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 30px;
border-radius: 18px;
padding: 26px 35px;
flex-direction: row;
gap: 50px;
}
`
const InfoLeft = styled.div`
${({ theme }) => theme.mediaQueries.sm}{
width: 50%;
}
`
const InfoLeftHeader = styled.div`
display: flex;
align-items: center;
gap: 20px;
font-size: 21px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 32px;
gap: 30px;
}
`
const InfoTag = styled.div`
border-radius: 6px;
background: rgba(239, 34, 34, 0.50);
font-size: 14px;
font-weight: 600;
padding: 0 15px;
line-height: 25px;
&.ing {
background: rgba(119, 228, 171, 0.50);
}
&.end {
background: rgba(149, 149, 149, 0.50);
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 16px;
padding: 0 15px;
line-height: 32px;
}
`
const InfoTipList = styled.ul`
margin-top: 10px;
margin-left: 10px;
opacity: 0.8;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 16px;
}
`
const InfoTip = styled.li`
font-size: 13px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
}
`
const InfoAirdrop = styled.div`
margin-left: 5px;
margin-top: 12px;
font-size: 13px;
opacity: 0.8;
div {
margin-bottom: 5px;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-left: 10px;
margin-top: 16px;
font-size: 18px;
div {
margin-bottom: 10px;
}
}
`
const InfoRight = styled.div`
padding: 0 5px;
${({ theme }) => theme.mediaQueries.sm}{
flex: 1;
padding: 0;
};
`
const InfoTimeTip = styled.div`
font-size: 12px;
opacity: 0.8;
line-height: 32px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 14px;
};
`
const Time = styled.div`
display: flex;
align-items: center;
gap: 9px;
& > span {
font-size: 16px;
opacity: 0.3;
}
${({ theme }) => theme.mediaQueries.sm}{
& > span {
font-size: 24px;
}
};
`
const TimeItem = styled.div`
position: relative;
width: 28px;
height: 28px;
text-align: center;
line-height: 28px;
font-size: 16px;
font-weight: 700;
img {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
span {
position: relative;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
${({ theme }) => theme.mediaQueries.sm}{
width: 35px;
height: 35px;
line-height: 35px;
font-size: 20px;
};
`
const InfoProgressTip = styled.div`
margin-top: 18px;
display: flex;
justify-content: space-between;
align-items: center;
opacity: 0.8;
font-size: 12px;
span {
color: #A3A3A3;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 25px;
font-size: 14px;
}
`
const InfoProgress = styled.div`
position: relative;
margin-top: 5px;
border-radius: 4px;
background: #494949;
height: 7px;
&::before {
content: "";
position: absolute;
left: 0;
top: 0;
width: var(--progress);
height: 100%;
border-radius: 4px;
background: #78DDAF;
}
`
const InfoAccountInfo = styled.div`
margin-top: 22px;
font-size: 12px;
opacity: 0.8;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 16px;
}
`
const InfoBtnRow = styled.div`
margin-top: 22px;
display: flex;
align-items: center;
justify-content: space-between;
`
const SmallBtn = styled.button`
width: fit-content;
min-width: 136px;
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
min-width: 154px;
height: 52px;
border-radius: 32px;
}
`
const Introduction = styled.div`
margin-top: 15px;
padding: 18px 15px;
border-radius: 12px;
border: 1px solid #2B292E;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 30px;
padding: 20px 66px 40px 25px;
border-radius: 18px;
}
`
const IntroductionHeader = styled.div`
display: flex;
align-items: center;
gap: 12px;
img {
width: 45px;
height: 45px;
}
> div {
    > div {
        &:first-child {
        font-size: 21px;
        font-weight: 600;
        line-height: 32px;
        }
        &:nth-child(2) {
        font-size: 14px;
        line-height: 20px;
        }
    }
}
${({ theme }) => theme.mediaQueries.sm}{
img {
width: 65px;
height: 65px;
}
> div {
    > div {
        &:first-child {
        font-size: 28px;
        line-height: 45px;
        }
        &:nth-child(2) {
        font-size: 16px;
        line-height: 32px;
        }
    }
}
}
`
const Title = styled.div`
margin-top: 20px;
position: relative;
font-size: 14px;
font-weight: 600;
line-height: 45px;
padding-left: 16px;
&:before {
content: "";
position: absolute;
left: 0;
top: 50%;
width: 7.6px;
height: 16px;
transform: translateY(-50%);
border-radius: 2px;
background: #3F3C43;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 26px;
font-size: 20px;
padding-left: 22px;
&:before {
width: 10px;
height: 22px;
}
}
`
const IntroductionDesc = styled.div`
font-size: 13px;
line-height: 21px;
opacity: 0.8;
margin-left: 0;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
line-height: 32px;
margin-left: 22px;
}
`
const IntroductionContact = styled.div`
padding-left: 0;
margin-top: 20px;
display: flex;
align-items: center;
gap: 12px;
> div {
cursor: pointer;
display: flex;
align-items: center;
gap: 8px;
img {
width: 18px;
height: 18px;
}
span {
font-size: 12px;
opacity: 0.8;
}
}
${({ theme }) => theme.mediaQueries.sm}{
padding-left: 22px;
gap: 20px;
> div {
    gap: 10px;
    img {
    width: 26px;
    height: 26px;
    }
    span {
    font-size: 18px;
    }
}
}
`
const TokenInfo = styled.div`
margin-top: 0;
margin-left: 0;
font-size: 13px;
font-weight: 500;
line-height: 32px;
opacity: 0.6;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 14px;
margin-left: 22px;
font-size: 18px;
}
`
const Leader = styled.div`
position: relative;
z-index: 1;
margin-top: 20px;
border-radius: 12px;
border: 1px solid #2B292E;
padding: 16px 15px 20px;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 30px;
border-radius: 18px;
padding: 34px 38px 50px 25px;
}
`
const LeaderHeader = styled.div`
display: flex;
gap: 8px;
align-items: center;
font-size: 21px;
font-weight: 600;
img {
width: 30px;
height: 30px;
}
${({ theme }) => theme.mediaQueries.sm}{
gap: 10px;
font-size: 32px;
font-weight: 600;
line-height: 45px;
img {
width: 45px;
height: 45px;
}
}
`
const LeaderBtnRow = styled.div`
margin-top: 32px;
display: flex;
align-items: center;
flex-wrap: wrap;
justify-content: space-between;
gap: 15px;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 46px;
gap: 34px;
justify-content: unset;
}
`
const LeaderContent = styled.div`
margin-top: 0;
display: flex;
flex-direction: column;
gap: 0;
> div {
flex: 1;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 58px;
flex-direction: row;
gap: 60px;
}
`
const LeaderContentLeftDesc = styled.div`
margin-top: 14px;
font-size: 13px;
line-height: 21px;
opacity: 0.8;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 25px;
font-size: 18px;
line-height: 32px;
}
`
const LeaderTipList = styled.ul`
margin-top: 0;
margin-left: 0;
opacity: 0.8;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 26px;
margin-left: 15px;
}
`
const LeaderTip = styled.li`
font-size: 13px;
line-height: 21px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
line-height: 32px;
}
`
const Dialog = styled(DialogContent)`
width: calc(100% - 50px) !important;
padding: 12px 16px 20px !important;
border-radius: 12px;
background: #362F42 !important;
${({ theme }) => theme.mediaQueries.sm}{
    width: 475px !important;
    padding: 25px 38px 40px !important;
};
`
const DialogHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 14px;
.title {
font-size: 18px;
font-weight: 600;
line-height: 32px;
}
.close {
cursor: pointer;
width: 17.5px;
height: 17.5px;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-bottom: 20px;
.title {
font-size: 24px;
}
};
`
const DialogTip = styled.div`
font-size: 12px;
font-weight: 500;
opacity: 0.8;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 16px;
}
`
const DialogInput = styled(InputNumber)`
margin-top: 12px;
border-radius: 4px;
background: #121212;
height: 40px;
padding: 0 10px;
width: 100%;
input {
height: 40px;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 15px;
height: 50px;
input, input[disabled] {
    font-size: 21px;
    height: 50px;
}
}
`
const DialogResult = styled.div`
margin-top: 20px;
font-size: 14px;
font-weight: 500;
opacity: 0.8;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 32px;
font-size: 16px;
}
`
const Btn = styled.button`
margin-top: 20px;
width: 100%;
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
margin-top: 40px;
font-size: 18px;
min-width: 154px;
height: 52px;
border-radius: 32px;
}
`
