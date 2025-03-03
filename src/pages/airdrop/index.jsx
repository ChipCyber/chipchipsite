import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { useHistory } from 'react-router-dom';
import { _saveToTwoWei,_getValueDivided } from "@/constants/constantsFunction";
import {
    openUrl,
    OKX_BUY_CHIPBOX_URL,
    JOIN_GOKU_COMMUNITY,
    FOLLOW_GOKU_X,
    FOLLOW_GOKU_YOUTUBE,
} from "@/constants";
import { airdropGetHomeApi } from "@/api/mint.js";
import useLanguageChange from '@/hooks/useLanguageChange.js';

export default function Index() {
    const { t } = useTranslation();
    const history = useHistory();
    const shouldRender = useBreakpointCheck();
    const [list, setList] = useState([]);
    useEffect(() => {
        const timer = setInterval(() => {
            refreshList();
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const refreshList = () => {
        setList((prevList) =>
            prevList.map((item) => {
                const now = new Date();
                const startTime = new Date(item.start_time);
                const endTime = new Date(item.end_time);
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
                    ...item,
                    isBegin,
                    isEnd,
                    remaining: isBegin||isEnd?formatTime(endDiff):formatTime(startDiff),
                };
            })
        );
    }
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = () => {
        airdropGetHomeApi({}).then(({data})=>{
            setList(data.active);
            refreshList();
        });
    }
    useLanguageChange(fetchData);
    if (shouldRender) {
        return (
            <Root>
                <Top>
                    <div className='content'>
                        <div className='left'>
                            <div>
                                <div className='title'>{t('2000')}</div>
                                <div className='desc'>{t('2001')}</div>
                            </div>
                            <TopBtnRow>
                                <LargeBtn className='custom' onClick={()=>openUrl(OKX_BUY_CHIPBOX_URL)}>
                                    <span>{t('2002')}</span>
                                    <img src={require('@/assets/home/arrow_enter.png').default}/>
                                </LargeBtn>
                                <Btn className='custom' onClick={()=>openUrl(JOIN_GOKU_COMMUNITY)}>
                                    <span>{t('2003')}</span>
                                    <img src={require('@/assets/home/arrow_enter.png').default}/>
                                </Btn>
                                <LargeBtn className='custom' onClick={()=>openUrl(FOLLOW_GOKU_X)}>
                                    <span>{t('2004')}</span>
                                    <img src={require('@/assets/home/arrow_enter.png').default}/>
                                </LargeBtn>
                                <Btn className='custom' onClick={()=>openUrl(FOLLOW_GOKU_YOUTUBE)}>
                                    <span>{t('2005')}</span>
                                    <img src={require('@/assets/home/arrow_enter.png').default}/>
                                </Btn>
                            </TopBtnRow>
                        </div>
                        <img className='right' src={require('../../assets/airdrop/top_icon.png').default}/>
                    </div>
                </Top>
                <div style={{overflow:'hidden',height:96}}>
                    <img style={{objectFit:'unset',width:'100%',height:'100%'}} src={require('../../assets/home/logo_row.png').default}/>
                </div>
                <Content>
                    <img className='bg' src={require('../../assets/airdrop/bg.png').default}/>
                    <img className='bg_bottom' src={require('../../assets/airdrop/bg_bottom.png').default}/>
                    {
                        list.map(item=>(
                            <Item key={item.id} onClick={()=>history.push('/airdropDetail?id='+item.id)}>
                                <ItemTag className={item.isEnd?'end':(item.isBegin?'ing':'')}>{item.isEnd?t('2006'):(item.isBegin?t('2007'):t('2008'))}</ItemTag>
                                <ItemImg src={item.head_image} alt='icon'/>
                                <ItemContent>
                                    <ItemHeader>
                                        <ItemName>{item.name}</ItemName>
                                        <ItemDesc>{item.symbol}</ItemDesc>
                                    </ItemHeader>
                                    <ItemTipList>
                                        {item.slogan.split('\n').map((line, index) => (<React.Fragment key={index}>{line&&<ItemTip>{line}</ItemTip>}</React.Fragment>))}
                                    </ItemTipList>
                                    <ItemAirdrop>{t('2009')} {_saveToTwoWei(item.airdrop_total,6)} {item.symbol}</ItemAirdrop>
                                    <ItemInfo>
                                        <div>{t('2010')}</div>
                                        <div>{_saveToTwoWei(item.airdrop_current,6)} / <span>{_saveToTwoWei(item.airdrop_total,6)}</span></div>
                                    </ItemInfo>
                                    <ItemProgress style={{'--progress': _getValueDivided(item.airdrop_current,item.airdrop_total)+'%'}}></ItemProgress>
                                    <ItemEndTip>{item.isEnd?t('2011'):(item.isBegin?t('2011'):t('2012'))}</ItemEndTip>
                                    <ItemBottom>
                                        <Time>
                                            <TimeItem>
                                                <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                                <span>{item.remaining?.days ?? 0}D</span>
                                            </TimeItem>
                                            <span>:</span>
                                            <TimeItem>
                                                <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                                <span>{item.remaining?.hours ?? 0}</span>
                                            </TimeItem>
                                            <span>:</span>
                                            <TimeItem>
                                                <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                                <span>{item.remaining?.minutes ?? 0}</span>
                                            </TimeItem>
                                            <span>:</span>
                                            <TimeItem>
                                                <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                                <span>{item.remaining?.seconds ?? 0}</span>
                                            </TimeItem>
                                        </Time>
                                        <SmallBtn className='custom'>
                                            <span>{item.isEnd?t('2006'):(item.isBegin?t('2013'):t('2014'))}</span>
                                            <img src={require('@/assets/home/arrow_enter.png').default}/>
                                        </SmallBtn>
                                    </ItemBottom>
                                </ItemContent>
                            </Item>
                        ))
                    }
                </Content>
            </Root>
        )
    }
    return (
        <Root>
            <TopH5>
                <img className='icon' src={require('../../assets/airdrop/h5/top_icon.png').default}/>
                <div className='title'>{t('2000')}</div>
                <div className='desc'>{t('2001')}</div>
                <TopBtnRow>
                    <H5Btn className='custom' onClick={()=>openUrl(OKX_BUY_CHIPBOX_URL)}>
                        <span>{t('2002')}</span>
                        <img src={require('@/assets/home/arrow_enter.png').default}/>
                    </H5Btn>
                    <H5Btn className='custom' onClick={()=>openUrl(JOIN_GOKU_COMMUNITY)}>
                        <span>{t('2003')}</span>
                        <img src={require('@/assets/home/arrow_enter.png').default}/>
                    </H5Btn>
                    <H5Btn className='custom' onClick={()=>openUrl(FOLLOW_GOKU_X)}>
                        <span>{t('2004')}</span>
                        <img src={require('@/assets/home/arrow_enter.png').default}/>
                    </H5Btn>
                    <H5Btn className='custom' onClick={()=>openUrl(FOLLOW_GOKU_YOUTUBE)}>
                        <span>{t('2005')}</span>
                        <img src={require('@/assets/home/arrow_enter.png').default}/>
                    </H5Btn>
                </TopBtnRow>
            </TopH5>
            <div style={{overflow:'hidden',height:30}}>
                <img style={{objectFit:'contain',verticalAlign:'top',height:'100%'}} src={require('../../assets/home/h5/logo_row.png').default}/>
            </div>
            <ContentH5>
                {
                    list.map(item=>(
                        <Item key={item.id} onClick={()=>history.push('/airdropDetail?id='+item.id)}>
                            <ItemTag className={item.isEnd?'end':(item.isBegin?'ing':'')}>{item.isEnd?t('2006'):(item.isBegin?t('2007'):t('2008'))}</ItemTag>
                            <ItemImg src={item.head_image} alt='icon'/>
                            <ItemContent>
                                <ItemHeader>
                                    <ItemName>{item.name}</ItemName>
                                    <ItemDesc>{item.symbol}</ItemDesc>
                                </ItemHeader>
                                <ItemTipList>
                                    {item.slogan.split('\n').map((line, index) => (<React.Fragment key={index}>{line&&<ItemTip>{line}</ItemTip>}</React.Fragment>))}
                                </ItemTipList>
                                <ItemAirdrop>{t('2009')} {_saveToTwoWei(item.airdrop_total,6)} {item.symbol}</ItemAirdrop>
                                <ItemInfo>
                                    <div>{t('2010')}</div>
                                    <div>{_saveToTwoWei(item.airdrop_current,6)} / <span>{_saveToTwoWei(item.airdrop_total,6)}</span></div>
                                </ItemInfo>
                                <ItemProgress style={{'--progress': _getValueDivided(item.airdrop_current,item.airdrop_total)+'%'}}></ItemProgress>
                                <ItemEndTip>{item.isEnd?t('2011'):(item.isBegin?t('2011'):t('2012'))}</ItemEndTip>
                                <ItemBottom>
                                    <Time>
                                        <TimeItem>
                                            <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                            <span>{item.remaining?.days ?? 0}D</span>
                                        </TimeItem>
                                        <span>:</span>
                                        <TimeItem>
                                            <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                            <span>{item.remaining?.hours ?? 0}</span>
                                        </TimeItem>
                                        <span>:</span>
                                        <TimeItem>
                                            <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                            <span>{item.remaining?.minutes ?? 0}</span>
                                        </TimeItem>
                                        <span>:</span>
                                        <TimeItem>
                                            <img src={require('@/assets/airdrop/time_bg.png').default} alt='bg'/>
                                            <span>{item.remaining?.seconds ?? 0}</span>
                                        </TimeItem>
                                    </Time>
                                    <SmallBtn className='custom'>
                                        <span>{item.isEnd?t('2006'):(item.isBegin?t('2013'):t('2014'))}</span>
                                        <img src={require('@/assets/home/arrow_enter.png').default}/>
                                    </SmallBtn>
                                </ItemBottom>
                            </ItemContent>
                        </Item>
                    ))
                }
            </ContentH5>
        </Root>
    )
}

const Root = styled.div`
position: relative;
overflow: hidden;
`
const TopBtnRow = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
row-gap: 15px;
column-gap: 18px;
margin-top: 40px;
${({ theme }) => theme.mediaQueries.sm}{
width: fit-content;
row-gap: 30px;
column-gap: 36px;
margin-top: 0;
};
`
const LargeBtn = styled.button`
line-height: 1.2;
width: fit-content;
min-width: 292px;
padding-left: 35px;
padding-right: 35px;
height: 53px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 18px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
`
const Btn = styled.button`
line-height: 1.2;
width: fit-content;
min-width: 292px;
padding-left: 35px;
padding-right: 35px;
height: 53px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 18px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
`
const SmallBtn = styled.button`
line-height: 1.2;
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
const H5Btn = styled.button`
height: 32px;
border-radius: 16px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 12px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 5px;
width: 20px;
height: 20px;
}
`

const TopH5 = styled.div`
padding: 358px 30px 45px;
position: relative;
.icon {
position: absolute;
top: 68px;
left: 0;
width: 100%;
}
.title {
position: relative;
text-align: center;
font-size: 20px;
font-weight: 700;
}
.desc {
margin-top: 20px;
position: relative;
text-align: center;
font-size: 16px;
font-weight: 300;
}
`
const ContentH5 = styled.div`
padding: 0 15px 20px;
position: relative;
`

const Top = styled.div`
padding: 160px 60px 0 155px;
height: 700px;
position: relative;
.content {
position: relative;
display: flex;
.left {
padding-top: 20px;
padding-bottom: 30px;
display: flex;
flex-direction: column;
justify-content: space-between;
.title {
font-size: 50px;
font-weight: 700;
}
.desc {
margin-top: 20px;
font-size: 24px;
font-weight: 500;
}
}
.right {
pointer-events: none;
width: 623px;
height: 525px;
}
}
`
const Content = styled.div`
padding: 40px 0 30px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 38px;
position: relative;
.bg {
position: absolute;
left: 0;
top: -36px;
width: 100%;
}
.bg_bottom {
position: absolute;
left: 0;
bottom: 0;
width: 100%;
}
`
const Item = styled.div`
margin-top: 20px;
cursor: pointer;
border-radius: 12px;
background: #241F2D;
position: relative;
display: flex;
gap: 20px;
flex-direction: column;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 0;
padding: 20px;
width: 1060px;
border-radius: 18px;
gap: 30px;
align-items: center;
flex-direction: row;
};
`
const ItemTag = styled.div`
position: absolute;
left: 0;
top: 0;
border-radius: 12px 0px;
background: rgba(239, 34, 34, 0.50);
font-size: 16px;
font-weight: 600;
padding: 0 22px;
line-height: 30px;
&.ing {
background: rgba(119, 228, 171, 0.50);
}
&.end {
background: rgba(149, 149, 149, 0.50);
}
${({ theme }) => theme.mediaQueries.sm}{
border-radius: 18px 0px;
font-size: 20px;
padding: 0 34px;
line-height: 46px;
}
`
const ItemImg = styled.img`
width: 100%;
border-radius: 12px;
${({ theme }) => theme.mediaQueries.sm}{
width: 566px;
height: 309px;
border-radius: 18px;
}
`
const ItemContent = styled.div`
padding: 0px 16px 20px;
${({ theme }) => theme.mediaQueries.sm}{
padding: 0;
flex: 1;
}
`
const ItemHeader = styled.div`
display: flex;
align-items: baseline;
gap: 10px;
${({ theme }) => theme.mediaQueries.sm}{
gap: 15px;
}
`
const ItemName = styled.div`
font-size: 21px;
font-weight: 600;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 32px;
}
`
const ItemDesc = styled.div`
font-size: 13px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
}
`
const ItemTipList = styled.ul`
margin-top: 16px;
margin-left: 15px;
opacity: 0.8;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 26px;
}
`
const ItemTip = styled.li`
font-size: 13px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
}
`
const ItemAirdrop = styled.div`
margin-left: 10px;
margin-top: 12px;
font-size: 13px;
opacity: 0.8;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 22px;
font-size: 18px;
}
`
const ItemInfo = styled.div`
margin-top: 20px;
margin-left: 10px;
display: flex;
justify-content: space-between;
align-items: center;
opacity: 0.8;
font-size: 12px;
span {
color: #A3A3A3;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 14px;
}
`
const ItemProgress = styled.div`
position: relative;
margin-top: 5px;
margin-left: 10px;
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
const ItemEndTip = styled.div`
margin-top: 15px;
margin-left: 10px;
font-size: 12px;
opacity: 0.8;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 14px;
}
`
const ItemBottom = styled.div`
margin-top: 10px;
margin-left: 10px;
display: flex;
flex-direction: column;
gap: 22px;
${({ theme }) => theme.mediaQueries.sm}{
gap: 0;
align-items: center;
flex-direction: row;
justify-content: space-between;
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
