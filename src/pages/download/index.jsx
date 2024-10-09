import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";

import {
    TelegramMiniAppUrl,
    WebUrl,
    AndroidUrl,
    iOSUrl,
} from "../../constants";

function ArrowIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path d="M16.25 10.5001C16.25 10.6876 16.1875 10.8126 16.0625 10.9376L16 11.0001L12.25 14.7501L12.1875 14.8126C11.9375 15.0001 11.625 15.0001 11.4375 14.8126L11.375 14.7501L11.3125 14.6876C11.125 14.4376 11.125 14.1251 11.3125 13.9376L11.375 13.8751L14.0625 11.1876H4.3125C4 11.0626 3.75 10.8126 3.75 10.5001C3.75 10.1876 4 9.93761 4.3125 9.87511H14.125L11.4375 7.18761L11.375 7.12511C11.1875 6.87511 11.1875 6.56261 11.4375 6.31261C11.6875 6.06261 12 6.06261 12.25 6.25011L12.3125 6.31261L16.0625 10.0626L16.125 10.1251C16.1875 10.1876 16.25 10.3126 16.25 10.5001Z" fill="#5A5A5A"/>
        </svg>
    )
}

export default function Index() {
    const { t } = useTranslation();
    const shouldRender = useBreakpointCheck();
    if (shouldRender) {
        return (
            <Root>
                <img className='bg' src={require('../../assets/download/bg.png').default}/>
                <Left>
                    <div className='title'>{t('500')}</div>
                    <div className='desc'>{t('501')}</div>
                    <List>
                        <RowLink href={TelegramMiniAppUrl} target='__blank'>
                            <div className='content'>
                                <img src={require('../../assets/download/telegram.png').default}/>
                                <span>Telegram Mini-app</span>
                            </div>
                            <img className='arrow' src={require('../../assets/arrow.png').default}/>
                        </RowLink>
                        <RowLink href={WebUrl} target='__blank'>
                            <div className='content'>
                                <img src={require('../../assets/download/web.png').default}/>
                                <span>Web</span>
                            </div>
                            <img className='arrow' src={require('../../assets/arrow.png').default}/>
                        </RowLink>
                        <Row>
                            <div className='content'>
                                <img src={require('../../assets/download/ios.png').default}/>
                                <span>iOS</span>
                            </div>
                            <img className='qr' src={require('../../assets/download/qr.png').default}/>
                            <div className='download_qr'>
                                <div>{t('505')}</div>
                                <QRCode
                                    value={iOSUrl}
                                    size={130}
                                    includeMargin={true}
                                />
                            </div>
                        </Row>
                        <Row>
                            <div className='content'>
                                <img src={require('../../assets/download/android.png').default}/>
                                <span>Android</span>
                            </div>
                            <img className='qr' src={require('../../assets/download/qr.png').default}/>
                            <div className='download_qr'>
                                <div>{t('505')}</div>
                                <QRCode
                                    value={AndroidUrl}
                                    size={130}
                                    includeMargin={true}
                                />
                            </div>
                        </Row>
                    </List>
                </Left>
                <Right>
                    <img className='img' src={require('../../assets/download/img.png').default}/>
                    <div className='tag1'>
                        <img src={require('../../assets/download/icon1.png').default}/>
                        <span>{t('502')}</span>
                    </div>
                    <div className='tag2'>
                        <img src={require('../../assets/download/icon2.png').default}/>
                        <span>{t('503')}</span>
                    </div>
                    <div className='tag3'>
                        <img src={require('../../assets/download/icon3.png').default}/>
                        <span>{t('504')}</span>
                    </div>
                </Right>
            </Root>
        )
    }
    return (
        <RootH5>
            <img className='bg' src={require('../../assets/download/h5/bg.png').default}/>
            <ContentH5>
                <div className='title'><div>{t('500')}</div></div>
                <div className='desc'>{t('506')}&nbsp;&nbsp;&nbsp;{t('507')}&nbsp;&nbsp;&nbsp;{t('508')}</div>
                <img className='img' src={require('../../assets/download/h5/img.png').default}/>
                <BottomH5>
                    <div className='subTitle'>{t('501')}</div>
                    <List>
                        <RowLink href={TelegramMiniAppUrl} target='__blank'>
                            <div className='content'>
                                <img src={require('../../assets/download/telegram.png').default}/>
                                <span>Telegram Mini-app</span>
                            </div>
                            <img className='arrow' src={require('../../assets/arrow.png').default}/>
                        </RowLink>
                        <RowLink href={WebUrl} target='__blank'>
                            <div className='content'>
                                <img src={require('../../assets/download/web.png').default}/>
                                <span>Web</span>
                            </div>
                            <img className='arrow' src={require('../../assets/arrow.png').default}/>
                        </RowLink>
                        <RowLink href={iOSUrl} target='__blank'>
                            <div className='content'>
                                <img src={require('../../assets/download/ios.png').default}/>
                                <span>iOS</span>
                            </div>
                            <img className='download' src={require('../../assets/download/download.png').default}/>
                        </RowLink>
                        <RowLink href={AndroidUrl} target='__blank'>
                            <div className='content'>
                                <img src={require('../../assets/download/android.png').default}/>
                                <span>Android</span>
                            </div>
                            <img className='download' src={require('../../assets/download/download.png').default}/>
                        </RowLink>
                    </List>
                </BottomH5>
            </ContentH5>
        </RootH5>
    )
}

const RootH5 = styled.div`
padding: 98px 0 20px;
position: relative;
.bg {
position: absolute;
bottom: 0;
left: 0;
width: 100%;
}
`
const ContentH5 = styled.div`
position: relative;
.title {
font-size: 28px;
font-weight: 700;
text-align: center;
display: flex;
justify-content: center;
div {
width: 55%;
}
}
.desc {
margin: 0 30px;
margin-top: 12px;
font-size: 14px;
font-weight: 300;
opacity: 0.5;
text-align: center;
}
.img {
width: 100%;
min-width: 375px;
min-height: 280px;
margin-top: 8px;
}
`
const BottomH5 = styled.div`
padding: 0 24px;
.subTitle {
margin-top: 12px;
font-size: 16px;
font-weight: 700;
}
`

const Root =styled.div`
padding: 182px 78px 95px 154px;
position: relative;
display: flex;
gap: 24px;
.bg {
position: absolute;
bottom: 0;
left: 0;
width: 100%;
}
`
const Left = styled.div`
position: relative;
.title {
font-size: 52px;
font-weight: 700;
}
.desc {
margin-top: 44px;
font-size: 24px;
font-weight: 700;
}
`
const List = styled.div`
margin-top: 28px;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 44px;
width: 326px;
};
`
const RowLink = styled.a`
&:hover {
color: #666;
}
position: relative;
padding: 0 30px 0 20px;
height: 60px;
cursor: pointer;
margin-top: 12px;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 18px;
font-weight: 700;
color: #121212;
border-radius: 15px;
background: #FFF;
.content {
display: flex;
gap: 18px;
align-items: center;
img {
width: 40px;
height: 40px;
}
}
.arrow {
width: 14px;
height: 14px;
}
.download {
width: 11px;
height: 18px;
}
${({ theme }) => theme.mediaQueries.sm}{
.arrow {
width: 18px;
height: 18px;
}
};
`
const Row = styled.div`
position: relative;
padding: 0 25px 0 20px;
height: 60px;
cursor: pointer;
margin-top: 12px;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 18px;
font-weight: 700;
color: #121212;
border-radius: 15px;
background: #FFF;
.content {
display: flex;
gap: 18px;
align-items: center;
img {
width: 40px;
height: 40px;
}
}
.download {
width: 11px;
height: 18px;
}
.qr {
cursor: pointer;
width: 30px;
height: 30px;
}
.download_qr {
display: none;
z-index: 1;
border-radius: 12px;
background: #362F42;
box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.25);
position: absolute;
left: 102%;
top: 0;
padding: 10px 15px 15px;
font-size: 16px;
font-weight: 500;
line-height: 20px;
div {
color: #FFF;
opacity: 0.6;
text-align: center;
margin-bottom: 10px;
}
canvas {
border-radius: 12px;
}
}
&:hover {
.download_qr {display: block;}
}
`
const Right = styled.div`
padding-top: 20px;
position: relative;
.img {
width: 688px;
height: 515px;
}
.tag1 {
position: absolute;
top: 242px;
left: -86px;
height: 46px;
padding: 0 28px;
display: flex;
align-items: center;
gap: 10px;
border-radius: 28px;
background: #FF8A8A;
font-size: 18px;
line-height: 20px;
color: #000;
img {
width: 24px;
height: 24px;
}
}
.tag2 {
position: absolute;
top: 46px;
left: 50%;
transform: translateX(-50%);
height: 46px;
padding: 0 28px;
display: flex;
align-items: center;
gap: 10px;
border-radius: 28px;
background: #8AFFEA;
font-size: 18px;
line-height: 20px;
color: #000;
img {
width: 24px;
height: 24px;
}
}
.tag3 {
position: absolute;
bottom: 125px;
right: 0;
height: 46px;
padding: 0 28px;
display: flex;
align-items: center;
gap: 10px;
border-radius: 28px;
background: #BEFF8A;
font-size: 18px;
line-height: 20px;
color: #000;
img {
width: 24px;
height: 24px;
}
}
`
