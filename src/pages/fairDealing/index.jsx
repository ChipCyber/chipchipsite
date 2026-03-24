import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation, Trans } from 'react-i18next';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import {
    openUrl,
    FairDealUrl,
} from "../../constants";
export default function Index() {
    const { t } = useTranslation();
    const shouldRender = useBreakpointCheck();
    if (shouldRender) {
        return (
            <Root>
                <Top>
                    <div className='imgBox'>
                        <div className='topLeft'>
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/topLeft.png').default} alt="" aria-hidden="true"/>
                        </div>
                        <div className='topRight'>
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/topRight.svg').default} alt={t('10004')}/>
                        </div>
                    </div>

                    <div className='topCenter'>
                        <h1 className='topTitle'>{t('1002')}</h1>
                        <div className="topTxt">
                            <Trans
                                i18nKey="1003"
                                components={[null, <span style={{ color: '#75F3A5' }} />]}
                            />
                        </div>
                    </div>
                </Top>
                <div style={{ overflow: 'hidden', height: 96 }}>
                    <img style={{ objectFit: 'unset', width: '100%', height: '100%' }} src={require('../../assets/home/logo_row.png').default} alt="" aria-hidden="true"/>
                </div>
                <Content>
                    <Bg1 />
                    <Bg2 />
                    <FairTitle >{t('1004')}</FairTitle>
                    <StepTitle>
                        <SerialNumber>
                            <OptionImg>
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/option.svg').default} alt="" aria-hidden="true"/>
                            </OptionImg>
                            <OptionTxt>1</OptionTxt>
                        </SerialNumber>
                        <SerialBox>
                            <SerialFirst>{t('1005')}
                                <SerialFirstBox>{t('1008')}</SerialFirstBox>
                            </SerialFirst>
                            <SerialSecond>{t('1011')}</SerialSecond>
                        </SerialBox>
                    </StepTitle>

                    <StepContent>
                        <StepContentImg>
                            <img style={{ objectFit: 'cover', width: '4px', height: '100%' }} src={require('../../assets/fairDealing/line1.png').default} alt="" aria-hidden="true"/>
                        </StepContentImg>
                        <StepContentRight>
                            <div style={{ width: '100%', marginTop: '30px' }}>
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/conter1.png').default} alt={t('10005')}/>
                            </div>

                            <div style={{ width: '100%', }}>
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/conter2.png').default} alt={t('10006')}/>
                            </div>
                            <SerialSecond>{t('1014')}</SerialSecond>
                        </StepContentRight>
                    </StepContent>

                    <StepTitle>
                        <SerialNumber>
                            <OptionImg>
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/option.svg').default} alt="" aria-hidden="true"/>
                            </OptionImg>
                            <OptionTxt>2</OptionTxt>
                        </SerialNumber>
                        <SerialBox>
                            <SerialFirst>{t('1006')}
                                <SerialFirstBox>{t('1009')}</SerialFirstBox>
                            </SerialFirst>
                            <SerialSecond>{t('1012')}</SerialSecond>
                        </SerialBox>
                    </StepTitle>

                    <StepContent>
                        <StepContentImg>
                            <img style={{ objectFit: 'cover', width: '4px', height: '100%' }} src={require('../../assets/fairDealing/line2.png').default} alt="" aria-hidden="true"/>
                        </StepContentImg>
                        <StepContentRight>
                            <div style={{ width: '100%', marginTop: '30px' }}>
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/conter3.png').default} alt={t('10007')}/>
                            </div>
                        </StepContentRight>
                    </StepContent>

                    <StepTitle>
                        <SerialNumber>
                            <OptionImg>
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/option.svg').default} alt="" aria-hidden="true"/>
                            </OptionImg>
                            <OptionTxt>3</OptionTxt>
                        </SerialNumber>
                        <SerialBox>
                            <SerialFirst>{t('1007')}
                                <SerialFirstBox>{t('1010')}</SerialFirstBox>
                            </SerialFirst>
                            <SerialSecond>{t('1013')}</SerialSecond>
                        </SerialBox>
                    </StepTitle>

                    <StepContent>
                        <StepContentImg>
                        </StepContentImg>
                        <StepContentRight>
                            <div style={{ width: '100%', }}>
                                <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/conter4.png').default} alt={t('10008')}/>
                            </div>
                            <StepContentButtom>
                                <ButtomTitle >{t('1015')}</ButtomTitle>
                                <SmallBtn className='custom' onClick={() => openUrl(FairDealUrl)}>
                                    <span>{t('171')}</span>
                                    <img src={require('@/assets/home/arrow_enter.png').default} />
                                </SmallBtn>
                                <ButtomShow />
                            </StepContentButtom>
                        </StepContentRight>
                    </StepContent>
                </Content>
                <div style={{ height: '200px' }} />
            </Root>
        )
    }

    return (
        <Root>
            <TopH5>
                <div className='topRight'>
                    <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/topRight.svg').default} alt={t('10004')}/>
                </div>
                <div className='topCenter'>
                    <h1 className='topTitle'>{t('1002')}</h1>
                    <div className="topTxt">
                        <Trans
                            i18nKey="1003"
                            components={[null, <span style={{ color: '#75F3A5' }} />]}
                        />
                    </div>
                </div>
                <div style={{ overflow: 'hidden', height: 30, width: '100%', }}>
                    <img style={{ objectFit: 'cover', verticalAlign: 'top', height: '100%', width: '100%', }} src={require('../../assets/home/h5/logo_row.png').default} alt="" aria-hidden="true"/>
                </div>
            </TopH5>
            <FairTitle>{t('1004')}</FairTitle>
            <ContentH5>
                <StepTitle>
                    <SerialNumber>
                        <OptionImg>
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/option.svg').default} alt="" aria-hidden="true"/>
                        </OptionImg>
                        <OptionTxt>1</OptionTxt>
                    </SerialNumber>

                    <SerialBox>
                        <SerialFirst>{t('1005')}
                            <SerialFirstBox>{t('1008')}</SerialFirstBox>
                        </SerialFirst>
                    </SerialBox>
                </StepTitle>
                <SerialSecondBox>
                    <SerialSecond>{t('1011')}</SerialSecond>
                </SerialSecondBox>
                <StepContent>
                    <StepContentRight>
                        <StepContentRightH5Img>
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/conter1.png').default} alt={t('10005')}/>
                        </StepContentRightH5Img>

                        <div style={{ width: '100%', }}>
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/conter2.png').default} alt={t('10006')}/>
                        </div>
                        <SerialSecond>{t('1014')}</SerialSecond>
                    </StepContentRight>
                </StepContent>
                <StepTitle>
                    <SerialNumber>
                        <OptionImg>
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/option.svg').default} alt="" aria-hidden="true"/>
                        </OptionImg>
                        <OptionTxt>2</OptionTxt>
                    </SerialNumber>
                    <SerialBox>
                        <SerialFirst>{t('1006')}
                            <SerialFirstBox>{t('1009')}</SerialFirstBox>
                        </SerialFirst>
                    </SerialBox>
                </StepTitle>
                <SerialSecondBox>
                    <SerialSecond>{t('1012')}</SerialSecond>
                </SerialSecondBox>
                <StepContent>
                    <StepContentRight>
                        <StepContentRightH5Img >
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/conter3.png').default} alt={t('10007')}/>
                        </StepContentRightH5Img>
                    </StepContentRight>
                </StepContent>

                <StepTitle>
                    <SerialNumber>
                        <OptionImg>
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/option.svg').default} alt="" aria-hidden="true"/>
                        </OptionImg>
                        <OptionTxt>3</OptionTxt>
                    </SerialNumber>
                    <SerialBox>
                        <SerialFirst>{t('1007')}
                            <SerialFirstBox>{t('1010')}</SerialFirstBox>
                        </SerialFirst>
                    </SerialBox>
                </StepTitle>
                <SerialSecondBox>
                    <SerialSecond>{t('1013')}</SerialSecond>
                </SerialSecondBox>
                <StepContent>
                    <StepContentRight>
                        <StepContentRightH5Img>
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={require('../../assets/fairDealing/conter4.png').default} alt={t('10008')}/>
                        </StepContentRightH5Img>
                    </StepContentRight>
                </StepContent>
                <ButtomTitle >{t('1015')}</ButtomTitle>
                <SmallBtn className='custom' onClick={() => openUrl(FairDealUrl)}>
                    <span>{t('171')}</span>
                </SmallBtn>
            </ContentH5>
            <div style={{ height: '100px' }} />
        </Root>
    )
}

const Root = styled.div`
position: relative;
overflow: hidden;
width: 100%;   
`
const Top = styled.div`
padding: 50px 0px 0px;
position: relative;
.imgBox{
display: flex;
align-items: center;
justify-content:  space-between;
pointer-events: none;
}
.topLeft {
overflow:hidden;
aspect-ratio: 1 / 1;
flex: 1;
}
.topRight {
overflow:hidden;
aspect-ratio: 1 / 1;
flex: 1;
}
.topCenter {
  position: absolute;
  top: 35%;
  left:155px;
  z-index: 2;
  .topTitle {
    width: 56%;   
    font-size: 62px;
    line-height:62px;
    font-weight: 700;
  }
  .topTxt {
    width: 46%;
    font-size: 24px; 
    line-height:28px;
    font-weight: 600;
  }
}
`
const TopH5 = styled.div`
padding: 30px 0px 0px;
position: relative;
.topRight {
overflow:hidden;
aspect-ratio: 1 / 1;
flex: 1;
}
.topCenter {
width:100%;
padding:5px 35px 46px;
display: flex;
flex-direction:column;
align-items: center;
text-align: center;
  .topTitle {
     padding:0px 30px;
    font-size: 32px;
    line-height:34px;
    font-weight: 700;
  }
  .topTxt {
    font-size: 16px; 
    line-height:22px;
    font-weight: 600;
  }
}
`
const Content = styled.div`
width:100%;
position: relative;
padding: 0px 142px;
`
const FairTitle = styled.h1`
font-size: 21px;
line-height: 45px;
font-weight: 600;
padding: 0px 15px;
margin-top: 16px;
margin-bottom:4px;
${({ theme }) => theme.mediaQueries.sm} {
font-size: 38px;
padding: 0px;
margin-top: 58px;
margin-bottom: 48px;
  }
`;
const ContentH5 = styled.div`
padding: 15px;
display: flex;
flex-direction:column;
align-items: center;
`
const Bg1 = styled.div`
position: absolute;
top: 0px;
right: -503px;
width: 1006px;
height: 1006px;
transform: rotate(20.654deg);
border-radius: 503px;
background: #8D5AF3;
opacity:0.3;
filter: blur(60px);
z-index:0;
`
const Bg2 = styled.div`
position: absolute;
bottom: 0px;
left: -246px;
width: 1006px;
height: 1006px;
transform: rotate(20.654deg);
border-radius: 503px;
background: #78E3AD;
opacity:0.2;
filter: blur(60px);
z-index:0;
`
const StepTitle = styled.div`
width:100%;
display: flex;
flex-direction: row;
align-items: center;
gap:10px;
${({ theme }) => theme.mediaQueries.sm} {
gap:30px;
align-items: center;
}
`
const SerialBox = styled.div`
display: flex;
flex-direction: column;
gap:6px;
${({ theme }) => theme.mediaQueries.sm} {
    gap:10px;
}
`
const SerialFirst = styled.div`
display: flex;
flex-direction: row;
align-items: center;
flex-wrap: wrap;
gap:6px;
font-size: 21px; 
font-weight: 700;
color:#CE67FF;
${({ theme }) => theme.mediaQueries.sm} {
  font-size: 38px; 
  gap:10px;
  }
`
const SerialFirstBox = styled.div`
padding: 3px 15px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
font-size: 12px; 
line-height:19px;
font-weight: 700;
color:#FFF;
border-radius:60px;
background: linear-gradient(257.65deg, rgba(117, 246, 163, 0.1) 5.58%, rgba(142, 82, 246, 0.1) 88.85%);
${({ theme }) => theme.mediaQueries.sm} {
padding: 5px 24px;
font-size: 21px; 
border: 1px solid #539874;
line-height:32px;
border-radius:100px;
background:transparent;
}
`
const SerialSecond = styled.div`
font-size: 13px; 
font-weight: 500;
color:#FFF;
line-height:19px;
opacity:0.6;
${({ theme }) => theme.mediaQueries.sm} {
font-size: 24px; 
line-height:32px;
}
`
const SerialSecondBox = styled.div`
width:100%;
padding:6px 0px 0px 42px;
`
const StepContent = styled.div`
width:100%;
display: flex;
flex-direction: row;
align-items: stretch;
gap:18px;
margin:22px  0px 22px;
${({ theme }) => theme.mediaQueries.sm} {
gap:30px;
margin: 30px  0px  100px;
}
`
const StepContentImg = styled.div`
width: 60px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`
const StepContentRight = styled.div`
width:100%;
display: flex;
flex-direction: column;
gap:30px;
z-index:2;
`
const StepContentRightH5Img = styled.div`
width: 100%;
height: auto;
border-radius:12px;
box-shadow: 0px 0px 4.3px 0px #8CEA8D;
`
const StepContentButtom = styled.div`
overflow: hidden;
position: relative;
margin-top:80px;
width:100%;
height:204px;
gap:20px;
border-radius:60px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: #000;
.buttomTitle{
font-size: 32px; 
line-height:45px;
font-weight: 600;
background: linear-gradient(90deg, #ADFFDF 0%, #F5F5F5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
`
const ButtomShow = styled.div`
position: absolute;
bottom: -20px;
background:#2C714D;
width:60%;
height:40px;
border-radius: 100%;
filter: blur(10px);
`
const SmallBtn = styled.button`
width: fit-content;
min-width: 181px;
padding-left: 35px;
padding-right: 35px;
height: 40px;
border-radius: 20px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 15px;
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
min-width: 238px;
height: 52px;
border-radius: 32px;
padding-left: 55px;
padding-right: 55px;
}
`
const ButtomTitle = styled.div`
font-size: 18px; 
line-height:45px;
font-weight: 600;
margin-bottom:10px;
background: linear-gradient(90deg, #ADFFDF 0%, #F5F5F5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 32px; 
}
`
const SerialNumber = styled.div`
position: relative;
width: 32px;
height:32px;
aspect-ratio: 1 / 1;
flex-shrink: 0;
border-radius:50%;
display: flex;
align-items: center;
justify-content: center;
background:#FFF;
box-shadow: 
  0px 2.26px 2.95px 0px #00E58D27,
  0px 6.26px 8.16px 0px #00E58D38,
  0px 15.06px 19.66px 0px #00E58D30,
  0px 25.59px 65.2px 0px #00E58D57,
  0px 0.61px 2.44px 1.22px #D9FFF0 inset,
  0px 0.61px 10.97px 1.22px #D9FFF0 inset;
${({ theme }) => theme.mediaQueries.sm}{
width: 64px;
height:64px;
}
`
const OptionImg = styled.div`
width: 30px;
height:30px;
aspect-ratio: 1 / 1;
border-radius:50%;
${({ theme }) => theme.mediaQueries.sm}{
width: 60px;
height:60px;
}
`
const OptionTxt = styled.div`
position: absolute;
top:1px;
left:1px;
z-index: 2;
width: 30px;
height:30px;
border-radius:50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px; 
font-weight: 500;
color:#131513;
${({ theme }) => theme.mediaQueries.sm}{
position: absolute;
top:2px;
left:2px;
width: 60px;
height:60px;
font-size: 32px; 
}
`
