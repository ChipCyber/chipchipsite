import React, {  } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import useBreakpointCheck from "@/hooks/useBreakpointCheck";
import copy from "copy-to-clipboard";
import { message } from 'antd';

const Const_CA = "CXcWiHFDM1J8RHfAuzor1YGSk6BxGKFY5kstjUZjpump";

export default function Index() {
    const { t } = useTranslation();
    const shouldRender = useBreakpointCheck();
    const copyCa = () => {
        copy(Const_CA);
        message.success('Successfully');
    };
    return (
        <Root>
            <Post src={shouldRender?require('@/assets/ngnf/post.png').default:require('@/assets/ngnf/h5/post.png').default}/>
            <Content>
                <Logo src={require('@/assets/ngnf/logo.png').default}/>
                <Name>NGNF</Name>
                <Title>{t('900')}</Title>
                <SubTitle>{t('901')}</SubTitle>
                <Bottom>{t('902')}<NavLink to='/airdrop'>{t('903')}</NavLink></Bottom>
                <Ca>CA:{Const_CA} <img onClick={copyCa} src={require('@/assets/copy.png').default}/></Ca>
                <Guide>
                    <div>{t('905')} NGNF</div>
                    <GuideContent>
                        <a href='https://dexscreener.com/solana/8afq8gtjph3u9yxnjasf5lwy1czdazgazfar6qhhtkk7' target='__blank'>
                            <img src={require('@/assets/ngnf/dexscreener.png').default} alt=''/>
                            <span>{t('904',{name:'Dexscreener'})}</span>
                        </a>
                        <a href='https://gmgn.ai/sol/token/CXcWiHFDM1J8RHfAuzor1YGSk6BxGKFY5kstjUZjpump' target='__blank'>
                            <img src={require('@/assets/ngnf/gmgn.png').default} alt=''/>
                            <span>{t('904',{name:'GMGN'})}</span>
                        </a>
                        <a href='https://www.xxyy.io/sol/8afQ8gtjph3U9yXNJAsF5Lwy1cZDAzGAzfar6QHHTkK7' target='__blank'>
                            <img src={require('@/assets/ngnf/xxyy.png').default} alt=''/>
                            <span>{t('904',{name:'XXYY'})}</span>
                        </a>
                        <a href='https://raydium.io/swap/?outputMint=CXcWiHFDM1J8RHfAuzor1YGSk6BxGKFY5kstjUZjpump&inputMint=sol' target='__blank'>
                            <img src={require('@/assets/ngnf/raydium.png').default} alt=''/>
                            <span>{t('904',{name:'Raydium'})}</span>
                        </a>
                    </GuideContent>
                </Guide>
            </Content>
        </Root>
    )
}

const Root = styled.div`
position: relative;
overflow: hidden;
min-height: 100vh;
`
const Post = styled.img`
width: 100%;
`
const Content = styled.div`
padding: 28px 20px 30px;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
${({ theme }) => theme.mediaQueries.sm}{
padding: 78px 200px 130px;
};
`
const Logo = styled.img`
width: 50px;
height: 50px;
margin-bottom: 12px;
${({ theme }) => theme.mediaQueries.sm}{
width: 100px;
height: 100px;
margin-bottom: 22px;
};
`
const Name = styled.div`
font-size: 22px;
font-weight: 700;
margin-bottom: 18px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 38px;
margin-bottom: 34px;
};
`
const Title = styled.div`
font-size: 18px;
font-weight: 700;
margin-bottom: 16px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 30px;
margin-bottom: 36px;
}:
`
const SubTitle = styled.div`
width: 80%;
font-size: 14px;
font-weight: 500;
margin-bottom: 16px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 22px;
margin-bottom: 34px;
};
`
const Bottom = styled.div`
font-size: 16px;
font-weight: 500;
opacity: 0.7;
a {
text-decoration: underline;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 20px;
};
`
const Ca = styled.div`
font-size: 14px;
font-weight: bold;
margin-top: 20px;
word-break: break-all;
img {
margin-left: 5px;
width: 18px;
height: 18px;
cursor: pointer;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 15px;
font-size: 20px;
img {
width: 24px;
height: 24px;
}
};
`
const Guide = styled.div`
margin-top: 15px;
font-size: 16px;
font-weight: bold;
width: 100%;
${({ theme }) => theme.mediaQueries.sm}{
width: auto;
margin-top: 20px;
font-size: 22px;
};
`
const GuideContent = styled.div`
margin-top: 10px;
display: grid;
grid-template-columns: repeat(1, 1fr);
gap: 10px;
a {
display: flex;
gap: 10px;
align-items: center;
justify-content: center;
font-size: 14px;
background-color: #000;
color: #fff;
padding: 8px 10px;
border-radius: 999px;
img {
    height: 30px;
}
}
${({ theme }) => theme.mediaQueries.sm}{
grid-template-columns: repeat(2, 1fr);
gap: 20px;
a {
min-width: 350px;
padding: 10px 20px;
img {
    height: 40px;
}
}
};
`
