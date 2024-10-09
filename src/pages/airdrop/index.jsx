import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { NavLink, useHistory } from 'react-router-dom';
import {
    openUrl,
    BuyNowUrl,
    EnterGameUrl,
} from "../../constants";
import { knowledgePageListApi } from "../../api";

export default function Index() {
    const { t } = useTranslation();
    const [selectedIndex,setSelectedIndex] = useState(0);
    const [faqList, setFaqList] = useState([]);
    const history = useHistory();
    const shouldRender = useBreakpointCheck();
    useEffect(() => {
        knowledgePageListApi({pageIndex:1,pageSize:5,knowledgeType:2}).then(({data})=>{
            setFaqList(data);
        });
    }, []);
    if (shouldRender) {
        return (
            <Root>
                <Top>
                    <img className='bg' src={require('../../assets/airdrop/top_bg.png').default}/>
                    <div className='content'>
                        <div className='left'>
                            <div className='title'>{t('200')}</div>
                            <div className='desc'>{t('129')}</div>
                            <div className='tip'>{t('130')}</div>
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
                    <ContentBody>
                        <div className='header'>
                            <div className='left' onClick={()=>setSelectedIndex(0)}>
                                <span>{t('201')}</span>
                                <img src={selectedIndex==0?require('../../assets/airdrop/menu_left_selected.png').default:require('../../assets/airdrop/menu_left.png').default}/>
                            </div>
                            <div className='right' onClick={()=>setSelectedIndex(1)}>
                                <span>{t('211')}</span>
                                <img src={selectedIndex==1?require('../../assets/airdrop/menu_right_selected.png').default:require('../../assets/airdrop/menu_right.png').default}/>
                            </div>
                        </div>
                        <div className='tip'>{t('202')}</div>
                        <Item style={{paddingBottom:selectedIndex==0?132:28}}>
                            <img className='num' src={require('../../assets/airdrop/num1.png').default}/>
                            <div className='content'>
                                <div className='left'>
                                    <div className='box'>
                                        <img className='icon' src={require('../../assets/box.png').default}/>
                                        <img className='shadow' src={require('../../assets/airdrop/box_shadow.png').default}/>
                                        <div className='rate'>10%</div>
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className='title'>{t('203')}</div>
                                    <TopTip>
                                        <TopTipRow>{t('204')}</TopTipRow>
                                        <TopTipRow>{t('205')}</TopTipRow>
                                    </TopTip>
                                    {selectedIndex==0?<BtnRow>
                                        <Btn className='custom' onClick={()=>openUrl(BuyNowUrl)}>
                                            <span>{t('206')}</span>
                                            <img src={require('../../assets/home/arrow_enter.png').default}/>
                                        </Btn>
                                        <Btn_border className='custom' to='/displacement'>{t('207')}</Btn_border>
                                    </BtnRow>
                                    :
                                    <>
                                    <Card>
                                        <div className='item'>
                                            <div className='i_title'>-- CHIP</div>
                                            <div className='i_desc'>{t('324')}</div>
                                        </div>
                                        <div className='item'>
                                            <div className='i_title'>-- CHIP</div>
                                            <div className='i_desc'>{t('212')}</div>
                                        </div>
                                    </Card>
                                    <Btn className='custom' style={{marginTop:32}}>
                                        <span>{t('213')}</span>
                                        <img src={require('../../assets/home/arrow_enter.png').default}/>
                                    </Btn>
                                    <div className='wallet'>
                                        <div className='name'>{t('216')}：</div>
                                        <div className='address'>--</div>
                                    </div>
                                    </>
                                    }
                                </div>
                            </div>
                        </Item>
                        <Item>
                            <img className='num' src={require('../../assets/airdrop/num2.png').default}/>
                            <div className='content'>
                                <div className='left'>
                                    <div className='box'>
                                        <img className='icon' src={require('../../assets/airdrop/box2.png').default}/>
                                        <img className='shadow' src={require('../../assets/airdrop/box_shadow.png').default}/>
                                        <div className='rate' style={{bottom:-34}}>15%</div>
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className='title'>{t('208')}</div>
                                    <div className='desc'>{t('209')}</div>
                                    <BtnRow>
                                        <Btn className='custom' onClick={()=>openUrl(EnterGameUrl)}>
                                            <span>{t('210')}</span>
                                            <img src={require('../../assets/home/arrow_enter.png').default}/>
                                        </Btn>
                                    </BtnRow>
                                </div>
                            </div>
                        </Item>
                    </ContentBody>
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
                <div className='title'>{t('200')}</div>
                <div className='desc'>{t('129')}</div>
                <div className='tip'>{t('130')}</div>
            </TopH5>
            <div style={{overflow:'hidden',height:30}}>
                <img style={{objectFit:'contain',verticalAlign:'top',height:'100%'}} src={require('../../assets/home/h5/logo_row.png').default}/>
            </div>
            <ContentH5>
                <img className='bg' src={require('../../assets/airdrop/h5/bg.png').default}/>
                <img className='bg_bottom' src={require('../../assets/airdrop/h5/bg_bottom.png').default}/>
                <div className='header'>
                    <div className='left' onClick={()=>setSelectedIndex(0)}>
                        <span>{t('201')}</span>
                        <img src={selectedIndex==0?require('../../assets/airdrop/h5/menu_left_selected.png').default:require('../../assets/airdrop/h5/menu_left.png').default}/>
                    </div>
                    <div className='right' onClick={()=>setSelectedIndex(1)}>
                        <span>{t('211')}</span>
                        <img src={selectedIndex==1?require('../../assets/airdrop/h5/menu_right_selected.png').default:require('../../assets/airdrop/h5/menu_right.png').default}/>
                    </div>
                </div>
                <div className='tip'>{t('202')}</div>
                <ItemH5>
                    <img className='num' src={require('../../assets/airdrop/h5/num1.png').default}/>
                    <div className='content'>
                        <div className='title'>{t('203')}</div>
                        <TopTip>
                            <TopTipRow>{t('204')}</TopTipRow>
                            <TopTipRow>{t('205')}</TopTipRow>
                        </TopTip>
                        <div className='box customer'>
                            <div className='box_content'>
                                <img className='icon' src={require('../../assets/box.png').default}/>
                                <img className='shadow' src={require('../../assets/airdrop/h5/box_shadow.png').default}/>
                                <div className='rate' style={{right:0,bottom:20}}>10%</div>
                            </div>
                        </div>
                        {selectedIndex==0?<BtnRow>
                            <Btn className='custom' onClick={()=>openUrl(BuyNowUrl)}>
                                <span>{t('206')}</span>
                                <img src={require('../../assets/nav/login_arrow.png').default}/>
                            </Btn>
                            <Btn_border className='custom' to='/displacement'>{t('207')}</Btn_border>
                        </BtnRow>
                        :
                        <>
                        <CardH5>
                            <img className='coin' src={require('../../assets/airdrop/h5/coin.png').default}/>
                            <div className='item'>
                                <div className='i_title'>-- CHIP</div>
                                <div className='i_desc'>{t('212')}</div>
                            </div>
                        </CardH5>
                        <BtnRow>
                            <Btn className='custom'>
                                <span>{t('213')}</span>
                                <img src={require('../../assets/nav/login_arrow.png').default}/>
                            </Btn>
                        </BtnRow>
                        <div className='wallet'>
                            <div className='name'>{t('216')}：</div>
                            <div className='address'>--</div>
                        </div>
                        </>
                        }
                    </div>
                </ItemH5>
                <ItemH5>
                    <img className='num' src={require('../../assets/airdrop/h5/num2.png').default}/>
                    <div className='content'>
                        <div className='title'>{t('208')}</div>
                        <div className='desc'>{t('209')}</div>
                        <div className='box'>
                            <div className='box_content'>
                                <img className='icon' src={require('../../assets/airdrop/h5/box2.png').default}/>
                                <img className='shadow' src={require('../../assets/airdrop/h5/box_shadow.png').default}/>
                                <div className='rate' style={{bottom:-10}}>15%</div>
                            </div>
                        </div>
                        <BtnRow>
                            <Btn className='custom' onClick={()=>openUrl(EnterGameUrl)}>
                                <span>{t('210')}</span>
                                <img src={require('../../assets/nav/login_arrow.png').default}/>
                            </Btn>
                        </BtnRow>
                    </div>
                </ItemH5>
            </ContentH5>
            <FAQH5>
                <div className='t_title'>{t('172')}</div>
                <div className='t_desc'>{t('193')}...</div>
                <FAQH5Tip>
                    {
                        faqList.map((item,idx)=>(
                            <FAQH5TipRow onClick={()=>history.push('/faqDetail?id='+item.id)} key={idx}>{item.title}</FAQH5TipRow>
                        ))
                    }
                </FAQH5Tip>
                <FAQH5More className='custom' onClick={()=>history.push('/faq')}>
                    <span>{t('171')}</span>
                    <img src={require('../../assets/nav/login_arrow.png').default}/>
                </FAQH5More>
            </FAQH5>
        </Root>
    )
}

const Root = styled.div`
position: relative;
`

const TopH5 = styled.div`
padding: 336px 30px 45px;
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
font-size: 32px;
font-weight: 700;
}
.desc {
margin-top: 20px;
position: relative;
text-align: center;
font-size: 16px;
font-weight: 300;
}
.tip {
position: relative;
text-align: center;
margin-top: 20px;
font-size: 12px;
line-height: 21px;
opacity: 0.8;
}
`
const ContentH5 = styled.div`
padding: 30px 15px 80px;
position: relative;
.bg {
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
width: 100%;
}
.bg_bottom {
position: absolute;
left: 0;
bottom: 0;
width: 100%;
}
.header {
position: relative;
display: flex;
align-items: center;
justify-content: center;
font-size: 16px;
font-weight: 600;
.left {
position: relative;
margin-right: -3px;
width: 175px;
height: 45px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
span {
position: relative;
z-index: 1;
}
img {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
}
}
.right {
position: relative;
margin-left: -3px;
width: 175px;
height: 45px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
span {
position: relative;
z-index: 1;
}
img {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
}
}
}
.tip {
position: relative;
margin-top: 23px;
font-size: 13px;
font-weight: 500;
text-align: center;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
margin-bottom: 30px;
}
`
const ItemH5 = styled.div`
padding: 64px 20px 36px;
margin-top: 20px;
position: relative;
border-radius: 12px;
background: #241F2D;
.num {
position: absolute;
top: 0;
left: 33px;
width: 35px;
height: 44px;
}
.title {
    font-size: 21px;
    font-weight: 600;
}
.desc {
    margin-top: 24px;
    font-size: 13px;
    line-height: 21px;
    opacity: 0.8;
}
.box {
position: relative;
margin-top: 33px;
margin-bottom: 50px;
display: flex;
justify-content: center;
.box_content {
position: relative;
.icon {
position: relative;
width: 139px;
height: 142px;
}
.shadow {
position: absolute;
bottom: -120px;
left: 50%;
transform: translateX(-50%);
width: 375px;
height: 251px;
}
.rate {
color: #231D25;
font-size: 21px;
font-weight: 600;
line-height: 32px;
position: absolute;
right: -17px;
bottom: -4px;
width: 56px;
height: 56px;
text-align: center;
line-height: 56px;
border-radius: 50%;
background: linear-gradient(258deg, #75F6A3 5.58%, #FEAD1D 88.85%);
}
}
&.customer {
margin-bottom: 30px;
.shadow {
bottom: -100px;
}
.icon {
width: 174px;
height: 180px;
}
}
}
.wallet {
    margin-top: 30px;
    .name {
        color: #D9D9D9;
        font-size: 12px;
        opacity: 0.8;
    }
    .address {
        margin-top: 3px;
        font-size: 12px;
        opacity: 0.8;
        word-break: break-all;
    }
}
`
const CardH5 = styled.div`
position: relative;
margin-bottom: 30px;
border-radius: 6px;
background: #30293C;
padding: 10px 12px;
display: flex;
gap: 8px;
align-items: center;
.coin {
width: 40px;
height: 40px;
}
.item {
.i_title {
font-size: 16px;
font-weight: 600;
}
.i_desc {
font-size: 13px;
font-weight: 300;
opacity: 0.4;
}
}
`
const FAQH5 = styled.div`
padding: 50px 24px 45px 36px;
.t_title {
font-size: 24px;
font-weight: 600;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.t_desc {
margin-top: 20px;
font-size: 14px;
font-weight: 600;
line-height: 21px;
opacity: 0.8;
background: linear-gradient(258deg, #75F6A3 5.58%, #FEAD1D 88.85%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
`
const FAQH5Tip = styled.ul`
margin-top: 20px;
list-style-type: none;
color: rgba(255,255,255,0.7);
`
const FAQH5TipRow = styled.li`
margin-top: 10px;
font-size: 14px;
position: relative;
padding-left: 8px;
&:before {
    content: '';
    position: absolute;
    left: -5px;
    top: 8px;
    width: 3px;
    height: 3px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
`
const FAQH5More = styled.button`
background: transparent;
margin-top: 10px;
font-size: 14px;
display: flex;
align-items: center;
img {
width: 20px;
height: 20px;
flex-shrink: 0;
}
`


const Top = styled.div`
padding: 123px 135px 0 155px;
height: 700px;
position: relative;
.bg {
pointer-events: none;
position: absolute;
left: 0;
bottom: 0;
width: 100%;
}
.content {
position: relative;
display: flex;
.left {
padding-top: 62px;
.title {
font-size: 62px;
font-weight: 700;
}
.desc {
font-family: "PingFang SC";
margin-top: 20px;
font-size: 24px;
font-weight: 500;
}
.tip {
margin-top: 50px;
font-size: 16px;
font-weight: 500;
color: ${({theme})=>theme.colors.textSubtle};
}
}
.right {
pointer-events: none;
width: 623px;
height: 523px;
}
}
`
const Content = styled.div`
padding: 40px 0 30px;
display: flex;
justify-content: center;
align-items: center;
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
.header {
position: relative;
display: flex;
align-items: center;
justify-content: center;
font-size: 24px;
font-weight: 600;
.left {
position: relative;
margin-right: -10px;
width: 475px;
height: 60px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
span {
position: relative;
z-index: 1;
}
img {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
object-fit: fill;
}
}
.right {
position: relative;
margin-left: -10px;
width: 475px;
height: 60px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
span {
position: relative;
z-index: 1;
}
img {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
object-fit: fill;
}
}
}
.tip {
position: relative;
margin-top: 42px;
text-align: center;
font-size: 18px;
font-weight: 500;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
margin-bottom: 55px;
}
`
const ContentBody = styled.div`
position: relative;
width: 920px;
`
const Item = styled.div`
padding: 36px 56px 132px 132px;
margin-top: 44px;
position: relative;
border-radius: 18px;
background: #241F2D;
.num {
position: absolute;
top: -8px;
left: 46px;
width: 55px;
height: 69px;
}
.content {
display: flex;
justify-content: space-between;
.left {
padding-top: 55px;
position: relative;
flex-shrink: 0;
width: 50%;
display: flex;
.box {
position: relative;
height: fit-content;
    .icon {
    width: 254px;
    height: 260px;
    }
    .shadow {
    position: absolute;
    bottom: -220px;
    left: 50%;
    transform: translateX(-50%);
    width: 930px;
    height: 459px;
    }
    .rate {
    color: #231D25;
    font-size: 32px;
    font-weight: 600;
    line-height: 60px;
    position: absolute;
    right: -32px;
    bottom: -8px;
    width: 104px;
    height: 104px;
    text-align: center;
    line-height: 104px;
    border-radius: 50%;
    background: linear-gradient(258deg, #75F6A3 5.58%, #FEAD1D 88.85%);
    }
}
}
.right {
    flex: 1;
    .title {
        font-size: 32px;
        font-weight: 600;
        line-height: 45px;
    }
    .desc {
        margin-top: 38px;
        font-size: 18px;
        line-height: 32px;
        opacity: 0.8;
    }
    .wallet {
    margin-top: 30px;
    .name {
        color: #D9D9D9;
        font-size: 18px;
        line-height: 32px;
        opacity: 0.8;
    }
    .address {
        margin-top: 6px;
        font-size: 18px;
        line-height: 32px;
        opacity: 0.8;
        word-break: break-all;
    }
    }
}
}
`
const TopTip = styled.ul`
margin-top: 24px;
list-style-type: none;
color: rgba(255,255,255,0.7);
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 40px;
};
`
const TopTipRow = styled.li`
font-size: 13px;
position: relative;
padding-left: 8px;
line-height: 21px;
&:before {
    content: '';
    position: absolute;
    left: -5px;
    top: 8px;
    width: 3px;
    height: 3px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
padding-left: 8px;
line-height: 32px;
&:before {
    top: 14px;
}
};
`
const BtnRow = styled.div`
position: relative;
display: flex;
justify-content: center;
gap: 17px;
${({ theme }) => theme.mediaQueries.sm}{
padding-left: 8px;
margin-top: 60px;
justify-content: flex-start;
gap: 14px;
};
`
const Btn = styled.button`
position: relative;
font-size: 14px;
font-weight: 600;
height: 40px;
width: 146px;
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
font-size: 18px;
height: 53px;
};
`
const Btn_border = styled(NavLink)`
background: transparent;
font-size: 14px;
font-weight: 600;
height: 40px;
line-height: 40px;
text-align: center;
width: 146px;
border-radius: 32px;
border: 1px solid #FFF;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
height: 53px;
line-height: 53px;
};
`
const Card = styled.div`
margin-top: 30px;
border-radius: 8px;
background: #30293C;
padding: 15px 18px;
display: flex;
justify-content: space-between;
.item {
.i_title {
font-size: 21px;
font-weight: 600;
}
.i_desc {
font-size: 16px;
font-weight: 300;
opacity: 0.4;
}
}
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
