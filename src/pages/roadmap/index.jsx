import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import {
    openUrl,
    JoinNowUrl,
} from "../../constants";

const quarters = [
    { name: '2024 Q3', startDate: new Date('2024-07-01'), endDate: new Date('2024-09-30'), seq: 1 },
    { name: '2024 Q4', startDate: new Date('2024-10-01'), endDate: new Date('2024-12-31'), seq: 2 },
    { name: '2025 Q1', startDate: new Date('2025-01-01'), endDate: new Date('2025-03-31'), seq: 3 },
    { name: '2025 Q2', startDate: new Date('2025-04-01'), endDate: new Date('2025-06-30'), seq: 4 }
];
const convertToUTC8 = (date) => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const utc8Date = new Date(utcDate.getTime() - 8 * 60 * 60000);
    return utc8Date;
};
const isDateInRange = (date, startDate, endDate) => {
    return date >= new Date(startDate) && date <= new Date(endDate);
};
const getCurrentQuarterSeq = (date) => {
    const utc8Date = convertToUTC8(date);
    const currentQuarter = quarters.find(quarter =>
        isDateInRange(utc8Date, quarter.startDate, quarter.endDate)
    );
    return currentQuarter ? currentQuarter.seq : null;
};

export default function Index() {
    const { t } = useTranslation();
    const shouldRender = useBreakpointCheck();
    const currentQuarterSeq = getCurrentQuarterSeq(new Date());
    if (shouldRender) {
        return (
            <Root>
                <Bg1/>
                <Bg2/>
                <Bg3/>
                <Bg4/>
                <Bg5/>
                <Bg6/>
                <div className='title'>{t('102')}</div>
                <Content>
                    <Body>
                        {currentQuarterSeq==1&&<Img className='wow animate__animated animate__fadeIn' src={require('../../assets/roadmap/bg1.png').default}/>}
                        {currentQuarterSeq==2&&<Img className='wow animate__animated animate__fadeIn' src={require('../../assets/roadmap/bg2.png').default}/>}
                        {currentQuarterSeq==3&&<Img className='wow animate__animated animate__fadeIn' src={require('../../assets/roadmap/bg3.png').default}/>}
                        {currentQuarterSeq==4&&<Img className='wow animate__animated animate__fadeIn' src={require('../../assets/roadmap/bg4.png').default}/>}
                        <Item>
                            <ItemTitle>Q2 2023</ItemTitle>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('135')}</ItemRow>
                        </Item>
                        <Item>
                            <ItemTitle>Q3 2023</ItemTitle>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('136')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('137')}</ItemRow>
                        </Item>
                        <Item>
                            <ItemTitle>Q4 2023</ItemTitle>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('138')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('139')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('140')}</ItemRow>
                        </Item>
                        <Item>
                            <ItemTitle>Q1 2024</ItemTitle>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('141')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('142')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('143')}<br/><a href='#' target='__blank'>{t('196')}</a></ItemRow>
                        </Item>
                        <Item>
                            <ItemTitle>Q2 2024</ItemTitle>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('144')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('145')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('146')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('147')}</ItemRow>
                        </Item>
                        <Item>
                            <ItemTitle>Q3 2024</ItemTitle>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('148')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('149')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('150')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('152')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('153')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('154')}</ItemRow>
                            {/* <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('155')}</ItemRow> */}
                        </Item>
                        <Item>
                            <ItemTitle>Q4 2024</ItemTitle>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('151')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('156')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('157')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('158')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('159')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('160')}</ItemRow>
                        </Item>
                        <Item>
                            <ItemTitle>Q1 2025</ItemTitle>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('161')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('162')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('163')}</ItemRow>
                            <ItemRow className='wow animate__animated animate__fadeInRight'>{t('164')}</ItemRow>
                        </Item>
                        <Item>
                            <ItemTitle>Q2 2025</ItemTitle>
                            <ItemRow className='wow animate__animated animate__fadeInLeft'>{t('165')}<br/><Btn className='custom' onClick={()=>openUrl(JoinNowUrl)}><span>{t('166')}</span><img src={require('../../assets/home/arrow_enter.png').default}/></Btn></ItemRow>
                        </Item>
                    </Body>
                </Content>
            </Root>
        )
    }
    return (
        <Root>
            <Bg1/>
                <Bg2/>
                <Bg3/>
                <Bg4/>
                <Bg5/>
                <Bg6/>
                <div className='title'>{t('102')}</div>
                <ContentH5>
                    <Left>
                        <ItemH5>
                            <ItemH5Title>Q2 2023</ItemH5Title>
                            <ItemH5Row>{t('135')}</ItemH5Row>
                        </ItemH5>
                        <ItemH5>
                            <ItemH5Title>Q4 2023</ItemH5Title>
                            <ItemH5Row>{t('138')}</ItemH5Row>
                            <ItemH5Row>{t('139')}</ItemH5Row>
                            <ItemH5Row>{t('140')}</ItemH5Row>
                        </ItemH5>
                        <ItemH5>
                            <ItemH5Title>Q2 2024</ItemH5Title>
                            <ItemH5Row>{t('144')}</ItemH5Row>
                            <ItemH5Row>{t('145')}</ItemH5Row>
                            <ItemH5Row>{t('146')}</ItemH5Row>
                            <ItemH5Row>{t('147')}</ItemH5Row>
                        </ItemH5>
                        <ItemH5>
                            <ItemH5Title>Q4 2024</ItemH5Title>
                            <ItemH5Row>{t('151')}</ItemH5Row>
                            <ItemH5Row>{t('156')}</ItemH5Row>
                            <ItemH5Row>{t('157')}</ItemH5Row>
                            <ItemH5Row>{t('158')}</ItemH5Row>
                            <ItemH5Row>{t('159')}</ItemH5Row>
                            <ItemH5Row>{t('160')}</ItemH5Row>
                        </ItemH5>
                        <ItemH5>
                            <ItemH5Title>Q2 2025</ItemH5Title>
                            <ItemH5Row>{t('165')}<br/><a href={JoinNowUrl} target='__blank'>{t('166')}</a></ItemH5Row>
                        </ItemH5>
                    </Left>
                    {currentQuarterSeq==1&&<img className='middle' src={require('../../assets/roadmap/h5/bg1.png').default}/>}
                    {currentQuarterSeq==2&&<img className='middle' src={require('../../assets/roadmap/h5/bg2.png').default}/>}
                    {currentQuarterSeq==3&&<img className='middle' src={require('../../assets/roadmap/h5/bg3.png').default}/>}
                    {currentQuarterSeq==4&&<img className='middle' src={require('../../assets/roadmap/h5/bg4.png').default}/>}
                    <Right>
                        <ItemH5>
                            <ItemH5Title>Q3 2023</ItemH5Title>
                            <ItemH5Row>{t('136')}</ItemH5Row>
                            <ItemH5Row>{t('137')}</ItemH5Row>
                        </ItemH5>
                        <ItemH5>
                            <ItemH5Title>Q1 2024</ItemH5Title>
                            <ItemH5Row>{t('141')}</ItemH5Row>
                            <ItemH5Row>{t('142')}</ItemH5Row>
                            <ItemH5Row>{t('143')}<br/><a href='#' target='__blank'>{t('196')}</a></ItemH5Row>
                        </ItemH5>
                        <ItemH5>
                            <ItemH5Title>Q3 2024</ItemH5Title>
                            <ItemH5Row>{t('148')}</ItemH5Row>
                            <ItemH5Row>{t('149')}</ItemH5Row>
                            <ItemH5Row>{t('150')}</ItemH5Row>
                            <ItemH5Row>{t('152')}</ItemH5Row>
                            <ItemH5Row>{t('153')}</ItemH5Row>
                            <ItemH5Row>{t('154')}</ItemH5Row>
                            {/* <ItemH5Row>{t('155')}</ItemH5Row> */}
                        </ItemH5>
                        <ItemH5>
                            <ItemH5Title>Q1 2025</ItemH5Title>
                            <ItemH5Row>{t('161')}</ItemH5Row>
                            <ItemH5Row>{t('162')}</ItemH5Row>
                            <ItemH5Row>{t('163')}</ItemH5Row>
                            <ItemH5Row>{t('164')}</ItemH5Row>
                        </ItemH5>
                    </Right>
                </ContentH5>
        </Root>
    )
}

const ContentH5 = styled.div`
margin-top: 38px;
display: flex;
gap: 10px;
.middle {
width: 24px;
height: 1370px;
}
`
const ItemH5 = styled.div`
position: absolute;
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-end;
left: 0;
`
const Left = styled.div`
flex: 1;
position: relative;
${ItemH5}:nth-child(1) {
top: 0;
}
${ItemH5}:nth-child(2) {
top: 150px;
}
${ItemH5}:nth-child(3) {
top: 472px;
}
${ItemH5}:nth-child(4) {
top: 970px;
}
${ItemH5}:nth-child(5) {
top: 1350px;
}
`
const ItemH5Title = styled.div`
padding: 0 15px;
height: 25px;
line-height: 25px;
border-radius: 16px;
background: rgba(255, 255, 255, 0.30);
font-size: 12px;
font-weight: 700;
`
const Right = styled.div`
flex: 1;
position: relative;
${ItemH5Title} {
align-self: flex-start;
}
${ItemH5}:nth-child(1) {
top: 58px;
}
${ItemH5}:nth-child(2) {
top: 295px;
}
${ItemH5}:nth-child(3) {
top: 680px;
}
${ItemH5}:nth-child(4) {
top: 1165px;
}
`
const ItemH5Row = styled.div`
width: 100%;
margin-top: 12px;
border-radius: 6px;
background: #241F2D;
padding: 5px;
font-size: 11px;
line-height: normal;
a {
margin-top: 20px;
font-weight: 600;
text-decoration-line: underline;
}
`

const Root = styled.div`
position: relative;
padding: 94px 18px 138px;
overflow: hidden;
.title {
position: relative;
font-size: 32px;
font-weight: 700;
text-align: center;
text-transform: uppercase;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 210px 146px 128px 155px;
.title {
font-size: 62px;
text-align: left;
}
};
`
const Bg1 = styled.div`
position: absolute;
top: 94px;
right: -30px;
width: 284.52px;
height: 124.028px;
transform: rotate(20.654deg);
border-radius: 284.52px;
background: #572894;
filter: blur(80px);
${({ theme }) => theme.mediaQueries.sm}{
top: 123px;
right: 0;
width: 732px;
height: 212px;
transform: rotate(29.57deg);
border-radius: 732px;
};
`
const Bg2 = styled.div`
position: absolute;
top: 260px;
left: -50px;
width: 216.716px;
height: 203.653px;
transform: rotate(20.654deg);
opacity: 0.3;
background: #78E0AE;
filter: blur(80px);
${({ theme }) => theme.mediaQueries.sm}{
top: 350px;
left: 0;
width: 557.558px;
height: 348.102px;
transform: rotate(29.57deg);
border-radius: 557.558px;
opacity: 0.3;
background: #78E0AE;
filter: blur(80px);
};
`
const Bg3 = styled.div`
position: absolute;
top: 480px;
right: -120px;
width: 241.784px;
height: 327.498px;
transform: rotate(20.654deg);
border-radius: 327.498px;
opacity: 0.3;
background: #1E0E6C;
filter: blur(80px);
${({ theme }) => theme.mediaQueries.sm}{
top: 750px;
right: 150px;
width: 622.051px;
height: 559.79px;
transform: rotate(29.57deg);
border-radius: 622.051px;
opacity: 0.3;
background: #1E0E6C;
filter: blur(80px);
};
`
const Bg4 = styled.div`
position: absolute;
top: 1200px;
right: 0;
width: 284.52px;
height: 124.028px;
transform: rotate(20.654deg);
border-radius: 284.52px;
background: #572894;
filter: blur(80px);
${({ theme }) => theme.mediaQueries.sm}{
top: 1460px;
right: 0;
width: 1283.247px;
height: 371.651px;
transform: translateX(50%) rotate(29.57deg);
border-radius: 1283.247px;
opacity: 0.3;
background: #572894;
filter: blur(80px);
};
`
const Bg5 = styled.div`
position: absolute;
top: 1400px;
left: -50px;
width: 216.716px;
height: 203.653px;
transform: rotate(20.654deg);
background: #78E0AE;
opacity: 0.3;
filter: blur(80px);
${({ theme }) => theme.mediaQueries.sm}{
top: 1800px;
left: 0;
width: 977.437px;
height: 610.247px;
transform: translateX(-50%) rotate(29.57deg);
border-radius: 977.437px;
opacity: 0.3;
background: #241175;
filter: blur(80px);
};
`
const Bg6 = styled.div`
position: absolute;
top: 1670px;
right: 0;
width: 241.784px;
height: 327.498px;
transform: rotate(20.654deg);
border-radius: 327.498px;
opacity: 0.3;
background: #1E0E6C;
filter: blur(80px);
${({ theme }) => theme.mediaQueries.sm}{
top: 2400px;
right: 0;
width: 1090.498px;
height: 981.351px;
transform: translateX(50%) rotate(29.57deg);
border-radius: 1090.498px;
opacity: 0.3;
background: #1E0E6C;
filter: blur(80px);
};
`
const Content = styled.div`
position: relative;
padding: 318px 30px 440px;
`
const Body = styled.div`
position: relative;
width: max-content;
`
const Img = styled.img`
width: 1091px;
height: 1520px;
`
const Item = styled.div`
position: absolute;
width: 340px;
display: flex;
flex-direction: column;
&:nth-of-type(1) {
left: 45px;
top: 0;
transform: translateY(calc(-100% - 10px));
}
&:nth-of-type(2) {
top: 68px;
left: 398px;
}
&:nth-of-type(3) {
top: 0;
right: -30px;
transform: translateY(calc(-100% - 10px));
}
&:nth-of-type(4) {
top: 415px;
right: -40px;
}
&:nth-of-type(5) {
width: 460px;
top: 415px;
left: 178px;
}
&:nth-of-type(6) {
width: 452px;
top: 880px;
left: 158px;
}
&:nth-of-type(7) {
top: 880px;
right: 76px;
}
&:nth-of-type(8) {
bottom: 0;
right: 63px;
transform: translateY(calc(100% + 10px));
}
&:nth-of-type(9) {
bottom: 0;
left: 158px;
transform: translateY(calc(100% + 10px));
}
`
const ItemTitle = styled.div`
padding: 0 30px;
height: 50px;
line-height: 50px;
width: fit-content;
border-radius: 32px;
background: rgba(255, 255, 255, 0.30);
font-size: 24px;
font-weight: 700;
margin-bottom: 10px;
`
const ItemRow = styled.div`
width: 100%;
margin-top: 10px;
border-radius: 12px;
background: #241F2D;
padding: 15px 20px;
font-size: 18px;
line-height: normal;
a {
margin-top: 20px;
font-weight: 700;
text-decoration-line: underline;
}
`
const Btn = styled.button`
margin-top: 20px;
position: relative;
font-size: 16px;
font-weight: 600;
height: 44px;
padding: 0 30px;
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
`
