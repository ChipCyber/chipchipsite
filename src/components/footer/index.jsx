import React, { useEffect } from 'react'
import styled from "styled-components";
import { NavLink } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import {
    OfficialEmail,
    HoldemUrl,
    AOFUrl,
    MTTUrl,
    Web3ChampionshipsUrl,
    UniversalRebateUrl,
    UserAgreementUrl,
    PrivacyPolicyUrl,
    BlogUrl,
} from "../../constants";

export default function Footer() {
    const { t, i18n } = useTranslation();
    return (
        <Root>
            <div className='bg'/>
            <div className='content'>
                <Left>
                    <img className='logo' src={require('../../assets/nav/logo.png').default}/>
                    <div className='desc'>{t('1106')}</div>
                    <div className='email'>Email：{OfficialEmail}</div>
                    <div className='copyright'>Copyright © 2024 CHIPCHIP</div>
                </Left>
                <Right>
                    <div>
                        <div className='title'>{t('178')}</div>
                        <div className='row'>
                            <NavLink className='link' to={'/ido'}>IDO</NavLink>
                            <NavLink className='link' to={'/airdrop'}>{t('101')}</NavLink>
                            <NavLink className='link' to={'/roadmap'}>{t('102')}</NavLink>
                            <NavLink className='link' to={'/news'}>{t('103')}</NavLink>
                        </div>
                    </div>
                    <div>
                    <div className='title'>CHIPCHIP</div>
                        <div className='row'>
                            <a className='link' href={HoldemUrl[i18n.language]} target='__blank'>{t('167')}</a>
                            <a className='link' href={AOFUrl[i18n.language]} target='__blank'>AOF</a>
                            <a className='link' href={MTTUrl[i18n.language]} target='__blank'>MTT</a>
                            <a className='link' href={Web3ChampionshipsUrl[i18n.language]} target='__blank'>{t('179')}</a>
                            <a className='link' href={UniversalRebateUrl} target='__blank'>{t('180')}</a>
                        </div>
                    </div>
                    <div>
                    <div className='title'>{t('181')}</div>
                        <div className='row'>
                            <a className='link' href='#' target='__blank'>{t('182')}</a>
                            <NavLink className='link' to={'/faq'}>{t('172')}</NavLink>
                            <a className='link' href={UserAgreementUrl} target='__blank'>{t('183')}</a>
                            <a className='link' href={PrivacyPolicyUrl} target='__blank'>{t('184')}</a>
                            <a className='link' href={BlogUrl} target='__blank'>{t('185')}</a>
                        </div>
                    </div>
                </Right>
            </div>
        </Root>
    )
}

const Root = styled.div`
width: 100%;
background: #1A1621;
padding: 38px 0;
height: 246px;
position: relative;
overflow: hidden;
.bg {
display: none;
position: absolute;
left: 200px;
top: 320px;
width: 2174px;
height: 448px;
border-radius: 2174px;
opacity: 0.3;
background: #541A39;
filter: blur(150px);
}
.content {
position: relative;
display: flex;
justify-content: space-between;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 60px 130px 80px;
height: auto;
.bg {
display: block;
}
};
`
const Left = styled.div`
width: 410px;
display: flex;
flex-direction: column;
align-items: center;
.logo {
width: 194px;
height: 44px;
}
.desc {
display: none;
margin-top: 35px;
font-size: 12px;
font-weight: 300;
opacity: 0.6;
}
.email {
margin-top: 24px;
padding: 10px 17px;
border-radius: 6px;
border: 1px solid rgba(255, 255, 255, 0.10);
font-size: 12px;
font-weight: 500;
opacity: 0.6;
}
.copyright {
margin-top: 21px;
font-size: 14px;
font-weight: 600;
opacity: 0.3;
}
${({ theme }) => theme.mediaQueries.sm}{
align-items: flex-start;
.desc {
display: block;
}
.email {
margin-top: 58px;
}
.copyright {
margin-top: 52px;
}
};
`
const Right = styled.div`
display: none;
gap: 80px;
& > div {
.title {
font-size: 18px;
font-weight: 600;
}
.row {
margin-top: 60px;
display: flex;
flex-direction: column;
gap: 30px;
flex: 1 0 0;
.link {
font-size: 18px;
font-weight: 600;
color: rgba(255,255,255,0.4);
&:hover {
    color: rgba(255,255,255,1);
}
}
}
// &:nth-child(1) {
// width: 80px;
// }
// &:nth-child(2) {
// width: 160px;
// }
}
${({ theme }) => theme.mediaQueries.sm}{
display: flex;
};
`
