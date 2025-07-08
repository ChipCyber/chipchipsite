import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { useHistory } from 'react-router-dom';
import { _saveToTwoWei,_getValueDivided,_getValueMultip } from "@/constants/constantsFunction";
import {
    openUrl,
    OKX_BUY_CHIPBOX_URL,
    JOIN_GOKU_COMMUNITY,
    FOLLOW_GOKU_X,
    FOLLOW_GOKU_YOUTUBE,
} from "@/constants";
import { airdropGetHomeApi } from "@/api/mint.js";
import useLanguageChange from '@/hooks/useLanguageChange.js';
import { formatNumberWithCommas } from '@/utils';
import { knowledgePageListApi } from "../../api";

export default function Index() {
    const { t } = useTranslation();
    const history = useHistory();
    const shouldRender = useBreakpointCheck();
    const [faqList, setFaqList] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        const timer = setInterval(() => {
            refreshList();
        }, 1000);
        knowledgePageListApi({pageIndex:1,pageSize:5,knowledgeType:2}).then(({data})=>{
                    setFaqList(data);
        });
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
    const goDetailAction = (item) => {
        if(item.type==0){
            history.push('/airdropDetail?id='+item.id);
        }
    }
    const claimAction = (e, item) => {
        if(item.isEnd) {
            e.stopPropagation();
            return;
        }
        if(item.type==1){
            openUrl(item.external_url);
        }
    }
    if (shouldRender) {
        return (
            <Root>
                <Top>
                    <div className='content'>
                        <div className='bgBox'>
                        <img className='bg' src={require('../../assets/airdrop/top_newBg.png').default}/>
                        {[1, 2, 3, 4].map((idx) => (
      <>
       <div className="imgWrapper">
       <img className="optionheadImg" src={require(`../../assets/airdrop/head_option${idx}.png`).default} />
         {(idx === 1 || idx === 2) && (
            <div className="optionTagBox">
              <img className="optionTagImg" src={require(`../../assets/airdrop/top_option_icon${idx}.png`).default} />
              <div className="optionTagText">{t(`200${5 + idx}`)}</div>
            </div>
          )}
          {(idx === 3 || idx === 4) && <img className="imgIcon3Box" src={require('../../assets/airdrop/top_option_icon3.png').default} />}
       </div>
       
       {idx !== 4 && (
          <div className="top_linesBox">
            <img className="top_lines" src={require('../../assets/airdrop/top_lines.png').default} />
          </div>
        )}
      </>
    ))}
                        </div>
                        {/* <div className='left'>
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
                        <img className='right' src={require('../../assets/airdrop/top_icon.png').default}/> */}
                    </div>

                    <div className='topPart'>
                        <div className='topPart_title'>{t('2040')}</div>
                        <div className='topPart_txt'>
                            <div>{t('2041')}</div>
                            <div>{t('2042')}</div>
                            <div>{t('2043')}</div>
                        </div>
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
                            item.type == 1  ?
                                <ItemNew key={item.id} onClick={()=>goDetailAction(item)}>
                                <ItemTag className={item.isEnd?'end':(item.isBegin?'ing':'')}>{item.isEnd?t('2006'):(item.isBegin?t('2007'):t('2008'))}</ItemTag>
                                <ItemTop>
                                <ItemImg src={item.head_image} alt='icon'/>
                                <ItemContent>
                                    <ItemHeader>
                                        <ItemName>{item.name}</ItemName>
                                    </ItemHeader>
                                    <ItemTipList>
                                        {item.slogan.split(item.slogan.indexOf('\\n')>=0?'\\n':'\n').map((line, index) => (<React.Fragment key={index}>{line&&<ItemTip>{line}</ItemTip>}</React.Fragment>))}
                                    </ItemTipList>
                                    <ItemAirdrop>{t('2009')} {formatNumberWithCommas(_saveToTwoWei(item.airdrop_total,6))} {item.symbol}</ItemAirdrop>
                                    <ItemBottomNew>
                                        <SmallBtnNew className='custom' onClick={e=>claimAction(e,item)}>
                                            <span>{item.isEnd?t('2006'):(item.isBegin?t('211'):t('2014'))}</span>
                                            <img src={require('@/assets/home/arrow_enter.png').default}/>
                                        </SmallBtnNew>
                                    </ItemBottomNew>
                                </ItemContent>
                                </ItemTop>
                                <ItemButton>
                                    <div style={{fontWeight:500}}>{t('2038')}</div>
                                    <div style={{color:"#E3E3E5"}}>{t('2039')}</div>
                                </ItemButton>
                                </ItemNew>
                                :
                                <Item key={item.id} onClick={()=>goDetailAction(item)}>
                                <ItemTag className={item.isEnd?'end':(item.isBegin?'ing':'')}>{item.isEnd?t('2006'):(item.isBegin?t('2007'):t('2008'))}</ItemTag>
                                <ItemImg src={item.head_image} alt='icon'/>
                                <ItemContent>
                                    <ItemHeader>
                                        <ItemName>{item.name}</ItemName>
                                        <ItemDesc>{item.symbol}</ItemDesc>
                                    </ItemHeader>
                                    <ItemTipList>
                                        {item.slogan.split(item.slogan.indexOf('\\n')>=0?'\\n':'\n').map((line, index) => (<React.Fragment key={index}>{line&&<ItemTip>{line}</ItemTip>}</React.Fragment>))}
                                    </ItemTipList>
                                    <ItemAirdrop>{t('2009')} {formatNumberWithCommas(_saveToTwoWei(item.airdrop_total,6))} {item.symbol}</ItemAirdrop>
                                    {item.type==0&&<>
                                    <ItemInfo>
                                        <div>{t('2010')}</div>
                                        <div>{formatNumberWithCommas(_saveToTwoWei(item.airdrop_current,6))} / <span>{formatNumberWithCommas(_saveToTwoWei(item.airdrop_total,6))}</span></div>
                                    </ItemInfo>
                                    <ItemProgress style={{'--progress': _getValueMultip(_getValueDivided(item.airdrop_current,item.airdrop_total),100)+'%'}}></ItemProgress>
                                    </>}
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
                                        <SmallBtn className='custom' onClick={e=>claimAction(e,item)}>
                                            <span>{item.isEnd?t('2006'):(item.isBegin?t('2013'):t('2014'))}</span>
                                            <img src={require('@/assets/home/arrow_enter.png').default}/>
                                        </SmallBtn>
                                    </ItemBottom>
                                </ItemContent>
                            </Item>
                        ))
                    }
                </Content>
                <FAQ>
                    <div className='title'>{t('172')}</div>
                    {
                        faqList.map((item,idx)=>(
                            <div className='item' onClick={()=>history.push('/faqDetail?id='+item.id)} key={idx}>{item.title}</div>
                        ))
                    }
                </FAQ>
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
                        <Item key={item.id} onClick={()=>goDetailAction(item)}>
                            <ItemTag className={item.isEnd?'end':(item.isBegin?'ing':'')}>{item.isEnd?t('2006'):(item.isBegin?t('2007'):t('2008'))}</ItemTag>
                            <ItemImg src={item.head_image} alt='icon'/>
                            <ItemContent>
                                <ItemHeader>
                                    <ItemName>{item.name}</ItemName>
                                    <ItemDesc>{item.symbol}</ItemDesc>
                                </ItemHeader>
                                <ItemTipList>
                                    {item.slogan.split(item.slogan.indexOf('\\n')>=0?'\\n':'\n').map((line, index) => (<React.Fragment key={index}>{line&&<ItemTip>{line}</ItemTip>}</React.Fragment>))}
                                </ItemTipList>
                                <ItemAirdrop>{t('2009')} {formatNumberWithCommas(_saveToTwoWei(item.airdrop_total,6))} {item.symbol}</ItemAirdrop>
                                {item.type==0&&<>
                                <ItemInfo>
                                    <div>{t('2010')}</div>
                                    <div>{formatNumberWithCommas(_saveToTwoWei(item.airdrop_current,6))} / <span>{formatNumberWithCommas(_saveToTwoWei(item.airdrop_total,6))}</span></div>
                                </ItemInfo>
                                <ItemProgress style={{'--progress': _getValueMultip(_getValueDivided(item.airdrop_current,item.airdrop_total),100)+'%'}}></ItemProgress>
                                </>}
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
                                    <SmallBtn className='custom' onClick={e=>claimAction(e,item)}>
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
const SmallBtnNew = styled.button`
line-height: 1.2;
width: fit-content;
min-width: 136px;
padding-left: 55px;
padding-right: 55px;
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
const SmallBtnOption= styled.button`
width: fit-content;
min-width: 112px;
padding:6px 26px;
height: 30px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 15px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 15px;
min-width: 112px;
height: 30px;
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
padding: 160px 90px 0px;
position: relative;
.content {
padding: 8px 8px 5px;
border-radius: 18px;
background: linear-gradient(180deg, #3F007A 0%, #666666 100%);
.bgBox{
position: relative;
aspect-ratio: 1240 / 421;
border-radius: 16px;
overflow: hidden;
padding: 50px;
display: flex;
flex-direction: row;
justify-content: space-between;
gap: 20px;
}
.bg {
position: absolute;
inset: 0;
width: 100%;
height: 100%;
object-fit: cover;
z-index: 0;
}
.imgWrapper{
position: relative;
aspect-ratio: 229 / 341;
width: 100%;
flex: 1;
}
.optionheadImg{
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
z-index: 2;
}
.optionTagBox {
position: absolute;
left: 9%; 
top: 0;
width: 4.3125rem;
height: 1.625rem; 
aspect-ratio: 69 / 26;
z-index: 3;
}
.optionTagImg {
  width: 100%;
  height: 100%;
  position: absolute;
  aspect-ratio: 69 / 26;
  object-fit:cover;
  left: 0;
  top: 0;
  z-index: 1;
}
.optionTagText {
  position: relative;
  z-index: 2;
  color: #241F2D;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.imgIcon3Box {
 position: absolute;
  right: 7%;  
  bottom: 5%; 
  width: 10%; 
  aspect-ratio: 32 / 42;
  z-index: 2;
}
.top_linesBox {
  width: 3.125rem; /* 50px */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top_lines {
 width: 2.75rem; /* 44px */
  height: 2.125rem; /* 34px */
  z-index: 2;
}
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
.topPart{
margin-top: 20px;
width: 100%;
padding:36px 170px 60px;
display: flex;
flex-direction: column;
gap:26px;
}
.topPart_title{
 font-size: 62px;
  font-weight: 700;
 background: linear-gradient(90deg, #03DBAA 0%, #FFFFFF 30%, #BF65F8 60%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  background-size: 100% 100%;
  background-position: center;
}
.topPart_txt{
font-size: 21px;
lin-height:32px;
font-weight: 500;
display: flex;
flex-direction: column;
gap:20px;
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
const ItemNew = styled.div`
margin-top: 20px;
cursor: pointer;
border-radius: 18px;
background: #241F2D;
position: relative;
display: flex;
gap: 20px;
flex-direction: column;
`
const ItemTop = styled.div`
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
const ItemButton = styled.div`
width:100%;
background: #1B1821;
border-radius: 0 0 18px 18px;
padding: 20px 46px;
display: flex;
flex-direction: column;
font-size:16px;
line-height:24px;
${({ theme }) => theme.mediaQueries.sm}{
    width: 1060px;
    };
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
const ItemBottomNew = styled.div`
margin-top: 30px;
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
const OptionBottom = styled.div`
margin-top: 12px;
display: flex;
flex-direction: column;
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
const FAQ = styled.div`
padding: 80px 140px 104px;
.title {
font-size: 38px;
font-weight: 600;
line-height: 60px;
text-transform: uppercase;
margin-bottom: 30px;
}
.item {
cursor: pointer;
margin-top: 20px;
height: 65px;
border-radius: 8px;
border: 2px solid #2B292E;
font-size: 21px;
font-weight: 500;
line-height: 65px;
position: relative;
padding-left: 38px;
&:before {
    content: '';
    position: absolute;
    left: 20px;
    top: 30px;
    width: 4px;
    height: 4px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
}
`
