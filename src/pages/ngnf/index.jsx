import React, {  } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import useBreakpointCheck from "@/hooks/useBreakpointCheck";

export default function Index() {
    const { t } = useTranslation();
    const shouldRender = useBreakpointCheck();
    return (
        <Root>
            <Post src={shouldRender?require('@/assets/ngnf/post.png').default:require('@/assets/ngnf/h5/post.png').default}/>
            <Content>
                <Logo src={require('@/assets/ngnf/logo.png').default}/>
                <Name>NGNF</Name>
                <Title>{t('900')}</Title>
                <SubTitle>{t('901')}</SubTitle>
                <Bottom>{t('902')}<NavLink to='/airdrop'>{t('903')}</NavLink></Bottom>
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
