import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import DirectDividends from "./directDividends";
import OperationAlert from "./operationAlert";
import InputNumber from "@/components/inputNumber";

export default function Index() {
    const { t } = useTranslation();
    const shouldRender = useBreakpointCheck();
    const [showBind, setShowBind] = useState(false);
    const [showTransferIn, setShowTransferIn] = useState(false);
    const [showTransferOut, setShowTransferOut] = useState(false);
    const [showDirect, setShowDirect] = useState(false);
    const [showOperation, setShowOperation] = useState(false);
    const [address, setAddress] = useState('');
    const [count, setCount] = useState(0);
    const handleChange = (event) => {
        const newValue = event.target.value;
        if (newValue === '' || /^[1-9]\d*$/.test(newValue)) {
            setCount(newValue);
        }
    };
    const renderWeb = () => (
        <Root>
            <Top>
                <img className='topImg' src={require('../../assets/cto/top.png').default} />
                <div className='topCenter'>
                    <div className='topTitle'>{t('21000').split('\n').map((line, index) => (<React.Fragment key={index}>{line&&<div className='desc'>{line}</div>}</React.Fragment>))}</div>
                    <div className="topTxt">{t('21001')}</div>
                </div>
            </Top>
            <div style={{ overflow: 'hidden', height: 96 }}>
                <img style={{ objectFit: 'unset', width: '100%', height: '100%' }} src={require('../../assets/home/logo_row.png').default} />
            </div>
            <Why>
                <img className='bg' src={require('../../assets/cto/why_bg.png').default} />
                <WhyContent>
                    <WhyTitle>{t('21002')}</WhyTitle>
                    <WhyRow>
                        <WhyItem>
                            <img className='icon' src={require('../../assets/cto/why_1.png').default} />
                            <div className='title'>{t('21003')}</div>
                            <div className='desc'>{t('21004')}</div>
                        </WhyItem>
                        <WhyItem>
                            <img className='icon' src={require('../../assets/cto/why_2.png').default} />
                            <div className='title'>{t('21005')}</div>
                            <div className='desc'>{t('21006')}</div>
                        </WhyItem>
                        <WhyItem>
                            <img className='icon' src={require('../../assets/cto/why_3.png').default} />
                            <div className='title'>{t('21007')}</div>
                            <div className='desc'>{t('21008')}</div>
                        </WhyItem>
                    </WhyRow>
                </WhyContent>
            </Why>
            <Info>
                <img className='bg' src={require('../../assets/cto/info_icon.png').default} />
                <InfoBg1/>
                <InfoBg2/>
                <InfoBg3/>
                <InfoContent>
                    <InfoTitle src={require('../../assets/cto/info_title.png').default} alt='title'/>
                    <InfoRow>
                        <InfoItem>
                            <div className='title'>{t('21009')}</div>
                            <div className='desc'>2025-09-10</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21010')}</div>
                            <div className='desc'>0xeo687......0485</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21011')}</div>
                            <div className='desc'>80%</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21012')}</div>
                            <div className='desc'>20%</div>
                        </InfoItem>
                    </InfoRow>
                    <InfoRow>
                        <InfoItem>
                            <div className='title'>{t('21013')}</div>
                            <div className='desc'>10M</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21014')}</div>
                            <div className='desc'>8M</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21015')}</div>
                            <div className='desc'>2M</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21016')}</div>
                            <div className='desc' style={{ color: '#FEAD1D' }}>1000%</div>
                        </InfoItem>
                    </InfoRow>
                </InfoContent>
            </Info>
            <Content>
                <img className='bg_bottom' src={require('../../assets/airdrop/bg_bottom.png').default}/>
                <NoConnect>
                    <SmallBtn className='custom' onClick={()=>{}}>
                        <span>{t('602')}</span>
                        <img src={require('../../assets/home/arrow_enter.png').default}/>
                    </SmallBtn>
                </NoConnect>
                <Item>
                    <ItemStatus>
                        <img className='bg' src={require('../../assets/cto/icon_status_bg.png').default}/>
                        <div>{t('2007')}</div>
                    </ItemStatus>
                    <ItemTopIcon src={require('../../assets/cto/icon_item.png').default}/>
                    <ItemTop>
                        <ItemTopTitle>
                            <div>No Gambel No Future</div>
                            <div className='tag'>NGNF</div>
                        </ItemTopTitle>
                        <ItemTopAddress>
                            <div>{t('21017')}</div>
                            <div>0xsfjo00uj40504jg0jgj0uyrgjpjrphjprtehjpjp</div>
                        </ItemTopAddress>
                        <ItemTopBalance>
                            <div>{t('21018')}</div>
                            <div>989.09 SOL</div>
                        </ItemTopBalance>
                        <ItemTopRow>
                            <SmallBtn className='custom' onClick={()=>setShowTransferIn(true)}>
                                <span>{t('21019')}</span>
                                <img src={require('../../assets/home/arrow_enter.png').default}/>
                            </SmallBtn>
                            <SmallBorderBtn className='custom' onClick={()=>setShowTransferOut(true)}>{t('21020')}</SmallBorderBtn>
                        </ItemTopRow>
                    </ItemTop>
                    <ItemBottom>
                        <ItemBottomLeft>
                            <ItemBottomTitle>
                                <img src={require('../../assets/cto/icon_overview.png').default}/>
                                <span>{t('21021')}</span>
                            </ItemBottomTitle>
                            <ItemBottomLeftRow>
                                <ItemBottomLeftItem>
                                    <div>{t('21022')}</div>
                                    <div>NGNF</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21013')}</div>
                                    <div>1M</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21014')}</div>
                                    <div>1M</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21025')}</div>
                                    <div>1M</div>
                                </ItemBottomLeftItem>
                            </ItemBottomLeftRow>
                            <ItemBottomLeftBtnRow>
                                <SmallBgBtn className='custom' onClick={()=>setShowDirect(true)}>{t('21026')}</SmallBgBtn>
                                <SmallBgBtn className='custom' onClick={()=>setShowOperation(true)}>{t('21027')}</SmallBgBtn>
                            </ItemBottomLeftBtnRow>
                        </ItemBottomLeft>
                        <ItemBottomLine/>
                        <ItemBottomRight>
                            <ItemBottomTitle>
                                <img src={require('../../assets/cto/icon_treasury.png').default}/>
                                <span>{t('21028')}</span>
                            </ItemBottomTitle>
                            <ItemBottomRightItem>
                                <div>{t('21029')}</div>
                                <div>9999 NGNF</div>
                            </ItemBottomRightItem>
                            <SmallBorderBtn className='custom' onClick={()=>setShowTransferOut(true)}>{t('21020')}</SmallBorderBtn>
                            <ItemBottomRightInfo>
                                <img src={require('../../assets/cto/icon_info.png').default}/>
                                <span>{t('21030')}</span>
                            </ItemBottomRightInfo>
                        </ItemBottomRight>
                    </ItemBottom>
                </Item>
            </Content>
        </Root>
    )
    const renderH5 = () => (
        <Root>
            <TopH5>
                <img className='topImg' src={require('../../assets/cto/h5/top.png').default} />
                <div className='topCenter'>
                    <div className='topTitle'>{t('21000').split('\n').map((line, index) => (<React.Fragment key={index}>{line&&<div className='desc'>{line}</div>}</React.Fragment>))}</div>
                    <div className="topTxt">{t('21001')}</div>
                </div>
                <div style={{ overflow: 'hidden', height: 30, width: '100%', }}>
                    <img style={{ objectFit: 'cover', verticalAlign: 'top', height: '100%', width: '100%', }} src={require('../../assets/home/h5/logo_row.png').default} />
                </div>
            </TopH5>
            <WhyH5>
                <img className='bg' src={require('../../assets/cto/h5/why_bg.png').default} />
                <WhyH5Content>
                    <WhyTitle>{t('21002')}</WhyTitle>
                    <WhyRow>
                        <WhyItemH5>
                            <img className='icon' src={require('../../assets/cto/why_1.png').default} />
                            <div>
                                <div className='title'>{t('21003')}</div>
                                <div className='desc'>{t('21004')}</div>
                            </div>
                        </WhyItemH5>
                        <WhyItemH5>
                            <img className='icon' src={require('../../assets/cto/why_2.png').default} />
                            <div>
                                <div className='title'>{t('21005')}</div>
                                <div className='desc'>{t('21006')}</div>
                            </div>
                        </WhyItemH5>
                        <WhyItemH5>
                            <img className='icon' src={require('../../assets/cto/why_3.png').default} />
                            <div>
                                <div className='title'>{t('21007')}</div>
                                <div className='desc'>{t('21008')}</div>
                            </div>
                        </WhyItemH5>
                    </WhyRow>
                </WhyH5Content>
            </WhyH5>
            <Info>
                <img className='bg' src={require('../../assets/cto/info_icon.png').default} />
                <InfoBg1/>
                <InfoBg2/>
                <InfoBg3/>
                <InfoContent>
                    <InfoTitle src={require('../../assets/cto/h5/info_title.png').default} alt='title'/>
                    <InfoRow>
                        <InfoItem>
                            <div className='title'>{t('21009')}</div>
                            <div className='desc'>2025-09-10</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21010')}</div>
                            <div className='desc'>0xeo687......0485</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21011')}</div>
                            <div className='desc'>80%</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21012')}</div>
                            <div className='desc'>20%</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21013')}</div>
                            <div className='desc'>10M</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21014')}</div>
                            <div className='desc'>8M</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21015')}</div>
                            <div className='desc'>2M</div>
                        </InfoItem>
                        <InfoItem>
                            <div className='title'>{t('21016')}</div>
                            <div className='desc' style={{ color: '#FEAD1D' }}>1000%</div>
                        </InfoItem>
                    </InfoRow>
                </InfoContent>
            </Info>
            <ContentH5>
                <NoConnect>
                    <SmallBtn className='custom' onClick={()=>{}}>
                        <span>{t('602')}</span>
                        <img src={require('../../assets/home/arrow_enter.png').default}/>
                    </SmallBtn>
                </NoConnect>
                <Item>
                    <ItemStatus>
                        <img className='bg' src={require('../../assets/cto/icon_status_bg.png').default}/>
                        <div>{t('2007')}</div>
                    </ItemStatus>
                    <ItemTopIcon src={require('../../assets/cto/h5/icon_item.png').default}/>
                    <ItemTop>
                        <ItemTopTitle>
                            <div>No Gambel No Future</div>
                            <div className='tag'>NGNF</div>
                        </ItemTopTitle>
                        <ItemTopAddress>
                            <div>{t('21017')}</div>
                            <div>0xsfjo00uj40504jg0jgj0uyrgjpjrphjprtehjpjp</div>
                        </ItemTopAddress>
                        <ItemTopBalance>
                            <div>{t('21018')}</div>
                            <div>989.09 SOL</div>
                        </ItemTopBalance>
                        <ItemTopRow>
                            <SmallBtn className='custom' onClick={()=>setShowTransferIn(true)}>
                                <span>{t('21019')}</span>
                                <img src={require('../../assets/nav/login_arrow.png').default}/>
                            </SmallBtn>
                            <SmallBorderBtn className='custom' onClick={()=>setShowTransferOut(true)}>{t('21020')}</SmallBorderBtn>
                        </ItemTopRow>
                    </ItemTop>
                    <ItemBottom>
                        <ItemBottomLeft>
                            <ItemBottomTitle>
                                <img src={require('../../assets/cto/icon_overview.png').default}/>
                                <span>{t('21021')}</span>
                            </ItemBottomTitle>
                            <ItemBottomLeftRow>
                                <ItemBottomLeftItem>
                                    <div>{t('21022')}</div>
                                    <div>NGNF</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21013')}</div>
                                    <div>1M</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21014')}</div>
                                    <div>1M</div>
                                </ItemBottomLeftItem>
                                <ItemBottomLeftItem>
                                    <div>{t('21025')}</div>
                                    <div>1M</div>
                                </ItemBottomLeftItem>
                            </ItemBottomLeftRow>
                            <ItemBottomLeftBtnRow>
                                <SmallBgBtn className='custom' onClick={()=>setShowDirect(true)}>{t('21026')}</SmallBgBtn>
                                <SmallBgBtn className='custom' onClick={()=>setShowOperation(true)}>{t('21027')}</SmallBgBtn>
                            </ItemBottomLeftBtnRow>
                        </ItemBottomLeft>
                        <ItemBottomRight>
                            <ItemBottomTitle>
                                <img src={require('../../assets/cto/icon_treasury.png').default}/>
                                <span>{t('21028')}</span>
                            </ItemBottomTitle>
                            <ItemBottomRightItem>
                                <div>{t('21029')}</div>
                                <div>9999 NGNF</div>
                            </ItemBottomRightItem>
                            <SmallBorderBtn className='custom' onClick={()=>setShowTransferOut(true)}>{t('21020')}</SmallBorderBtn>
                            <ItemBottomRightInfo>
                                <img src={require('../../assets/cto/icon_info.png').default}/>
                                <span>{t('21030')}</span>
                            </ItemBottomRightInfo>
                        </ItemBottomRight>
                    </ItemBottom>
                </Item>
            </ContentH5>
        </Root>
    )
    return <>
        {shouldRender?renderWeb():renderH5()}
        <DialogOverlay
            style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
            isOpen={showBind}
            onDismiss={()=>setShowBind(false)}
        >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>{t('21031')}</div>
                    <img className='close' onClick={()=>setShowBind(false)} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                <ModalContent>
                    <Row>
                        <div className='title'>{t('21032')}</div>
                        <div className='input'>
                            <input type='text' value={address} onChange={e=>setAddress(e.target.value)} placeholder={t('21033')}/>
                        </div>
                    </Row>
                    <LargeBtn className='custom' onClick={()=>{}}>{t('21034')}</LargeBtn>
                </ModalContent>
            </DialogC>
        </DialogOverlay>
        <DialogOverlay
            style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
            isOpen={showTransferIn}
            onDismiss={()=>setShowTransferIn(false)}
        >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>{t('21019')}</div>
                    <img className='close' onClick={()=>setShowTransferIn(false)} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                <ModalContent>
                    <Row>
                        <div className='title'>{t('605')}</div>
                        <InputNumber value={count} unit="SOL" onChange={handleChange} placeholder={t('21023')}/>
                    </Row>
                    <LargeBtn className='custom' onClick={()=>{}}>{t('21034')}</LargeBtn>
                </ModalContent>
            </DialogC>
        </DialogOverlay>
        <DialogOverlay
            style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
            isOpen={showTransferOut}
            onDismiss={()=>setShowTransferOut(false)}
        >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>{t('21020')}</div>
                    <img className='close' onClick={()=>setShowTransferOut(false)} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                <ModalContent>
                    <Row>
                        <div className='title'>{t('605')}</div>
                        <InputNumber value={count} unit="SOL" onChange={handleChange} placeholder={t('21023')}/>
                    </Row>
                    <LargeBtn className='custom' onClick={()=>{}}>{t('21034')}</LargeBtn>
                </ModalContent>
            </DialogC>
        </DialogOverlay>
        <DirectDividends show={showDirect} onClose={()=>setShowDirect(false)}/>
        <OperationAlert show={showOperation} onClose={()=>setShowOperation(false)}/>
    </>
}

const Root = styled.div`
position: relative;
overflow: hidden;
width: 100%;   
`
const Top = styled.div`
padding: 208px 0px 50px;
position: relative;
min-height: 700px;
.topImg {
position: absolute;
top: 0;
right: 0;
height: 700px;
}
.topCenter {
  margin-left: 155px;
  .topTitle {
    width: 50%;   
    font-size: 62px;
    font-weight: 700;
    .desc {
        line-height: 1.1;
    }
  }
  .topTxt {
    margin-top: 20px;
    width: 43%;
    font-size: 24px; 
    line-height:28px;
    opacity: 0.6;
  }
}
`
const TopH5 = styled.div`
position: relative;
.topImg {
width: 100%;
}
.topCenter {
width:100%;
padding: 0 35px 16px;
display: flex;
flex-direction:column;
align-items: center;
text-align: center;
  .topTitle {
    padding:0px 12px;
    font-size: 32px;
    font-weight: 700;
    .desc {
        line-height: 1.2;
    }
  }
  .topTxt {
    margin-top: 28px;
    font-size: 12px; 
    line-height:22px;
    opacity: 0.8;
  }
}
`
const Why = styled.div`
position: relative;
height: 580px;
.bg {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
object-fit: cover;
}
`
const WhyContent = styled.div`
position: relative;
padding: 62px 0 100px;
display: flex;
gap: 60px;
flex-direction: column;
align-items: center;
`
const WhyTitle = styled.div`
font-size: 24px;
font-weight: 600;
background: linear-gradient(90deg, #FFF, #6F53FC);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 48px;
};
`
const WhyRow = styled.div`
position: relative;
display: flex;
gap: 15px;
justify-content: center;
flex-direction: column;
${({ theme }) => theme.mediaQueries.sm}{
gap: 35px;
flex-direction: row;
};
`
const WhyItem = styled.div`
width: 390px;
border-radius: 18px;
border: 1px solid #F1ACFF;
background: #200F4B;
box-shadow: 0 0 20px 0 #B190ED inset;
padding: 40px 35px;
.icon {
width: 58px;
height: 58px;
}
.title {
font-size: 24px;
font-weight: 500;
margin-top: 15px;
}
.desc {
font-size: 18px;
opacity: 0.8;
margin-top: 30px;
}
`
const Info = styled.div`
background: #8D52F6;
position: relative;
.bg {
position: absolute;
z-index: 1;
top: 0;
right: 0;
width: 230px;
mix-blend-mode: lighten;
}
`
const InfoBg1 = styled.div`
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
background: radial-gradient(63.77% 63.26% at 51.84% 122.51%, #75F6A3 0%, #8E52F6 100%);
`
const InfoBg2 = styled.div`
position: absolute;
left: 50%;
top: 0;
width: 70%;
height: 100%;
transform: translateX(-50%);
background: radial-gradient(63.77% 63.26% at 51.84% 122.51%, #75F6A3 0%, #8E52F6 100%);
${({ theme }) => theme.mediaQueries.sm}{
width: 50%;
};
`
const InfoBg3 = styled.div`
position: absolute;
left: 50%;
top: 0;
width: 32%;
height: 100%;
transform: translateX(-50%);
background: radial-gradient(63.77% 63.26% at 51.84% 122.51%, #75F6A3 0%, #8E52F6 100%);
${({ theme }) => theme.mediaQueries.sm}{
width: 210px;
};
`
const InfoContent = styled.div`
position: relative;
padding: 48px 28px;
${({ theme }) => theme.mediaQueries.sm}{
padding: 42px 10px 68px 140px;
};
`
const InfoTitle = styled.img`
height: 66px;
margin-bottom: 42px;
${({ theme }) => theme.mediaQueries.sm}{
height: 30px;
margin-bottom: 60px;
};
`
const InfoRow = styled.div`
padding-left: 8px;
display: flex;
align-items: center;
flex-wrap: wrap;
row-gap: 18px;
& + & {
    margin-top: 32px;
}
${({ theme }) => theme.mediaQueries.sm}{
flex-wrap: nowrap;
};
`
const InfoItem = styled.div`
width: 50%;
.title {
font-size: 14px;
}
.desc {
margin-top: 5px;
font-size: 18px;
font-weight: 600;
}
${({ theme }) => theme.mediaQueries.sm}{
flex: 1;
.title {
font-size: 18px;
}
.desc {
margin-top: 10px;
font-size: 32px;
}
};
`
const Content = styled.div`
width: 100%;
position: relative;
padding: 80px 170px 180px;
.bg_bottom {
position: absolute;
left: 0;
bottom: 0;
width: 100%;
}
`
const NoConnect = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding-bottom: 100px;
`
const Item = styled.div`
position: relative;
margin-bottom: 20px;
${({ theme }) => theme.mediaQueries.sm}{
margin-bottom: 50px;
};
`
const ItemStatus = styled.div`
position: absolute;
z-index: 2;
top: -6px;
left: 20px;
width: 57px;
height: 28px;
font-size: 12px;
font-weight: 500;
color: #000;
display: flex;
align-items: center;
justify-content: center;
> img {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
> div {
position: relative;
}
${({ theme }) => theme.mediaQueries.sm}{
width: 125px;
height: 65px;
top: -10px;
right: 57px;
font-size: 21px;
font-weight: 800;
};
`
const ItemTop = styled.div`
position: relative;
padding: 92px 20px 24px;
background: #241F2D;
border-radius: 12px 12px 0 0;
${({ theme }) => theme.mediaQueries.sm}{
padding: 56px 94px 62px;
border-radius: 22px 22px 0 0;
};
`
const ItemTopIcon = styled.img`
position: absolute;
z-index: 1;
top: 0;
right: 0;
width: 100%;
${({ theme }) => theme.mediaQueries.sm}{
width: unset;
height: 460px;
};
`
const ItemTopTitle = styled.div`
position: relative;
z-index: 1;
display: flex;
align-items: center;
gap: 15px;
font-size: 21px;
font-weight: 600;
margin-bottom: 15px;
.tag {
display: flex;
padding: 2px 5px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 32px;
background: rgba(255, 255, 255, 0.30);
font-size: 12px;
font-weight: 500;
}
${({ theme }) => theme.mediaQueries.sm}{
gap: 25px;
font-size: 36px;
margin-bottom: 30px;
.tag {
padding: 8px 15px;
font-size: 16px;
font-weight: 700;
}
};
`
const ItemTopAddress = styled.div`
position: relative;
z-index: 1;
font-size: 14px;
font-weight: 600;
margin-bottom: 15px;
> div {
    &:nth-child(2) {
        margin-top: 6px;
        font-weight: 400;
        opacity: 0.6;
    }
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
margin-bottom: 22px;
};
`
const ItemTopBalance = styled.div`
font-size: 14px;
font-weight: 600;
margin-bottom: 20px;
> div {
    &:nth-child(2) {
        margin-top: 6px;
        font-size: 21px;
    }
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
margin-bottom: 30px;
> div {
    &:nth-child(2) {
        font-size: 24px;
    }
}
};
`
const ItemTopRow = styled.div`
display: flex;
align-items: center;
gap: 20px;
`
const ItemBottom = styled.div`
background: #383144;
padding: 20px;
display: flex;
flex-direction: column;
gap: 22px;
border-radius: 0 0 12px 12px;
${({ theme }) => theme.mediaQueries.sm}{
flex-direction: row;
gap: 66px;
padding-top: 25px;
padding-left: 75px;
padding-right: 40px;
padding-bottom: 32px;
border-radius: 0 0 22px 22px;
};
`
const ItemBottomTitle = styled.div`
display: flex;
gap: 8px;
align-items: center;
font-size: 15px;
font-weight: 600;
> img {
width: 15px;
height: 15px;
}
${({ theme }) => theme.mediaQueries.sm}{
gap: 14px;
padding-left: 16px;
font-size: 24px;
> img {
width: 22px;
height: 22px;
}
};
`
const ItemBottomLeft = styled.div`
flex: 2;
`
const ItemBottomLeftRow = styled.div`
margin-top: 20px;
display: flex;
align-items: center;
justify-content: space-between;
${({ theme }) => theme.mediaQueries.sm}{
padding-left: 20px;
};
`
const ItemBottomLeftItem = styled.div`
font-size: 14px;
> div {
&:nth-child(2) {
margin-top: 6px;
font-size: 18px;
font-weight: 600;
}
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
> div {
&:nth-child(2) {
margin-top: 10px;
font-size: 21px;
}
}
};
`
const ItemBottomLeftBtnRow = styled.div`
margin-top: 25px;
display: flex;
gap: 10px;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 32px;
gap: 20px;
};
`
const ItemBottomLine = styled.div`
width: 1px;
opacity: 0.2;
background: #FFF;
`
const ItemBottomRight = styled.div`
flex: 1;
`
const ItemBottomRightItem = styled.div`
margin-top: 8px;
margin-bottom: 16px;
font-size: 14px;
font-weight: 600;
> div {
&:nth-child(2) {
margin-top: 6px;
font-size: 18px;
}
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
margin-top: 12px;
margin-bottom: 30px;
padding-left: 20px;
> div {
&:nth-child(2) {
font-size: 24px;
}
}
};
`
const ItemBottomRightInfo = styled.div`
margin-top: 14px;
display: flex;
align-items: center;
gap: 4px;
font-size: 12px;
opacity: 0.6;
> img {
width: 12px;
height: 12px;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 18px;
font-size: 14px;
};
`
const ContentH5 = styled.div`
padding: 30px 15px;
`
const SmallBtn = styled.button`
width: fit-content;
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
height: 52px;
border-radius: 32px;
padding-left: 55px;
padding-right: 55px;
}
`
const LargeBtn = styled(SmallBtn)`
margin-top: 28px;
width: 100%;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 40px;
};
`
const SmallBorderBtn = styled.button`
width: fit-content;
padding-left: 25px;
padding-right: 25px;
height: 40px;
border-radius: 20px;
background: transparent;
border: 1px solid #FFF;
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
height: 52px;
border-radius: 32px;
padding-left: 55px;
padding-right: 55px;
}
`
const SmallBgBtn = styled.button`
width: fit-content;
padding-left: 25px;
padding-right: 25px;
height: 40px;
border-radius: 20px;
background: #FFF;
color: #000;
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
height: 52px;
border-radius: 32px;
padding-left: 55px;
padding-right: 55px;
}
`
const WhyH5 = styled.div`
position: relative;
padding: 30px 15px 70px;
.bg {
position: absolute;
top: 0;
left: 0;
width: 100%;
}
`
const WhyH5Content = styled.div`
position: relative;
display: flex;
gap: 25px;
flex-direction: column;
`
const WhyItemH5 = styled.div`
border-radius: 12px;
border: 0.26px solid #F1ACFF;
background: #200F4B;
box-shadow: 0 0 5.208px 0 #B190ED inset;
padding: 10px 15px;
display: flex;
align-items: center;
gap: 10px;
.icon {
width: 30px;
height: 30px;
}
.title {
font-size: 14px;
font-weight: 500;
}
.desc {
font-size: 12px;
opacity: 0.8;
margin-top: 5px;
}
`
const DialogC = styled(DialogContent)`
width: calc(100% - 50px) !important;
padding: 16px 20px 32px !important;
border-radius: 12px !important;
background: #362F42 !important;
color: ${({ theme }) => theme.colors.text} !important;
${({ theme }) => theme.mediaQueries.sm}{
    width: 600px !important;
    padding: 26px 40px 55px !important;
};
`
const ModalHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 30px;
.title {
font-size: 21px;
font-weight: 600;
line-height: 32px;
}
.close {
cursor: pointer;
width: 17.5px;
height: 17.5px;
}
${({ theme }) => theme.mediaQueries.sm}{
.title {
font-size: 24px;
}
};
`
const ModalContent = styled.div`

`
const Row = styled.div`
margin-top: 16px;
.title {
margin-bottom: 15px;
font-size: 14px;
font-weight: 400;
opacity: 0.4;
}
.tip {
text-align: left;
margin-top: 10px;
margin-bottom: 0;
margin-left: 5px;
color: #FF8A8A;
font-size: 12px;
font-weight: 600;
}
.input {
border-radius: 4px;
background: #121212;
padding: 0 14px;
height: 40px;
display: flex;
align-items: center;
gap: 10px;
input {
flex: 1;
height: 100%;
font-size: 14px;
font-weight: 500;
}
span {
font-size: 13px;
}
}
${({ theme }) => theme.mediaQueries.sm}{
.title {
font-size: 16px;
font-weight: 500;
opacity: 0.8;
}
.tip {
margin-left: 14px;
font-size: 14px;
opacity: 0.9;
}
.input {
padding: 0 20px;
height: 50px;
span {
font-size: 14px;
}
}
};
`
