import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { setUserInfo, removeUserInfo } from '../../store/userSlice';
import { setShowLogin, setCloseLogin } from '../../store/configSlice';
import { withTranslation } from 'react-i18next'
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { message } from 'antd';
import { withRouter,NavLink } from "react-router-dom"
import LanguageButton from './languageButton'
import { sendEmailApi, loginEmailApi, loginGoogleAuthApi } from '../../api';
import { maskEmail } from '../../utils';
import { GoogleClientId } from '../../constants';
import { isEmpty } from '../../constants/constantsFunction';
import {
    HoldemUrl,
    AOFUrl,
    MTTUrl,
    Web3ChampionshipsUrl,
    UniversalRebateUrl,
    UserAgreementUrl,
    PrivacyPolicyUrl,
    BlogUrl,
} from "../../constants";

class Nav extends Component {
    state = {
        showMenu: false,
        showMore: true,
        showPModal: true,
        email: '',
        code: '',
        countdown: 0,
    };
    countdownRef = React.createRef(null);
    navRef = React.createRef(null);
    lastScrollTop = 0;
    scrollTimeout;
    googleAuth;
    componentDidMount() {
        setTimeout(() => {
            window.addEventListener('scroll', this.scrollAction);
        }, 200);
    }
    componentWillUnmount() {
        this.clearTimer();
        window.removeEventListener('scroll', this.scrollAction);
    }
    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
    updateSigninStatus = (response) => {
        console.log('response :>> ', response);
        // const userInfo = this.parseJwt(response.credential);
        // console.log('userInfo :>> ', userInfo);
        loginGoogleAuthApi({
            code:token,
            type:1,
        }).then(({data})=>{
            this.props.setUserInfo(data);
        });
    }
    handleGoogleAuthClick = () => {
        google.accounts.id.initialize({
            client_id: GoogleClientId,
            callback: this.updateSigninStatus
        });
        google.accounts.id.prompt();
    }
    handlePhantomAuthClick = async () => {
        try {
            if (window.solana && window.solana.isPhantom) {
                const response = await window.solana.connect();
                console.log('response.publicKey.toString() :>> ', response.publicKey.toString());
                const message = 'Sign this message to verify your identity';
                const encodedMessage = new TextEncoder().encode(message);
                const signature = await window.solana.signMessage(encodedMessage);
                const signatureHex = Buffer.from(signature.signature).toString('hex');
                console.log('signatureHex :>> ', signatureHex);
            } else {
                message.error('Phantom Wallet is not installed.');
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    handleMetamaskAuthClick = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                const message = 'Sign this message to verify your identity';
                const messageBytes = new TextEncoder().encode(message);
                const hexMessage = '0x' + Buffer.from(messageBytes, 'utf8').toString('hex');
                const signature = await window.ethereum.request({
                    method: 'personal_sign',
                    params: [hexMessage, account],
                });
                console.log('signature :>> ', signature);
            } else {
                message.error('MetaMask is not installed.');
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    scrollAction = () => {
        const navbar = this.navRef.current;
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > this.lastScrollTop) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            navbar.classList.remove('hidden');
        }, 200);
    }
    startTimer = () => {
        this.clearTimer();
        this.setState({countdown:60});
        this.countdownRef.current = setInterval(() => {
            this.setState({countdown:this.state.countdown-1});
        }, 1000);
    }
    clearTimer = () => {
        if(this.countdownRef.current) {
            clearInterval(this.countdownRef.current);
        }
        this.setState({ countdown: 0 });
    }
    closeLogin = () => {
        this.clearTimer();
        this.props.setCloseLogin();
        this.setState({ email: '', code: '' });
    }
    getCode = () => {
        const {email} = this.state;
        if(!email||this.state.countdown>0) {
            return;
        }
        sendEmailApi({email,type:'2'}).then(()=>{
            this.startTimer();
        })
    }
    sureLogin = () => {
        const {email,code} = this.state;
        loginEmailApi({email,code}).then(({data})=>{
            this.props.setUserInfo(data);
            this.closeLogin();
        });
    }
    closeMenu = () => {
        this.setState({ showMenu: false });
    }
    closeMore = ()=>{
        this.setState({showModal:false});
        setTimeout(() => {
            this.setState({showModal:true});
        }, 200);
    }
    logout = ()=>{
        this.props.removeUserInfo();
        this.setState({showPModal:false});
        setTimeout(() => {
            this.setState({showPModal:true});
        }, 200);
    }
    render() {
        return (
            <Root ref={this.navRef}>
                {this.renderNav()}
            </Root>
        )
    }
    renderNav() {
        const {t,i18n,history,location:{pathname},userInfo,showLogin,setShowLogin} = this.props;
        const {showMenu,showMore,showPModal,countdown} = this.state;
        // console.log('pathname :>> ', pathname);
        return (
            <NavBody>
                <NavLogo onClick={()=>history.push('/')} src={require('../../assets/nav/logo.png').default} alt='logo'/>
                <NavCenter>
                    <NavCenterLink to='/' onClick={this.closeMenu} isActive={()=>pathname==='/'}>{t('100')}</NavCenterLink>
                    <NavCenterLink to='/displacement' onClick={this.closeMenu} isActive={()=>pathname==='/displacement'}>{t('207')}</NavCenterLink>
                    <NavCenterLink to='/airdrop' onClick={this.closeMenu} isActive={()=>pathname==='/airdrop'}>{t('101')}</NavCenterLink>
                    <NavCenterLink to='/ido' onClick={this.closeMenu} isActive={()=>pathname==='/ido'}>IDO</NavCenterLink>
                    <NavCenterLink to='/roadmap' onClick={this.closeMenu} isActive={()=>pathname==='/roadmap'}>{t('102')}</NavCenterLink>
                    <NavCenterLink to='/news' onClick={this.closeMenu} isActive={()=>pathname==='/news'}>{t('103')}</NavCenterLink>
                    {/* <NavCenterNoLink className='custom'>
                        <span>{t('104')}</span>
                        <img src={require('../../assets/arrow_down.png').default}/>
                        {showMore&&<Modal className='modal'>
                            <ModalContent>
                                <ModalRow to='/news' onClick={this.closeMore}>{t('103')}</ModalRow>
                                <ModalRow to='/displacement' onClick={this.closeMore}>{t('207')}</ModalRow>
                            </ModalContent>
                        </Modal>}
                    </NavCenterNoLink> */}
                </NavCenter>
                <NavRight>
                    {/* {isEmpty(userInfo)||isEmpty(userInfo.token)?
                    <LoginBtn className='custom' onClick={()=>setShowLogin()}>{t('105')}</LoginBtn>
                    :
                    <PersonalBody>
                        <img src={require('../../assets/nav/personal.png').default}/>
                        {showPModal&&<PModal className='modal'>
                        <PModalContent>
                            <img src={require('../../assets/nav/personal.png').default}/>
                            <div>{maskEmail(userInfo.email)}</div>
                            <button type='button' default onClick={()=>this.logout()}>{t('1105')}</button>
                        </PModalContent>
                    </PModal>}
                    </PersonalBody>
                    } */}
                    <BtnImg onClick={()=>history.push('/download')} src={require('../../assets/nav/download.png').default} alt='download'/>
                    <LanguageButton/>
                    <MenuImg onClick={()=>this.setState({showMenu:!showMenu})} src={showMenu?require('../../assets/nav/menu_close.png').default:require('../../assets/nav/menu.png').default} alt='menu'/>
                </NavRight>
                <DialogOverlay
                    style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                    isOpen={showLogin}
                    onDismiss={this.closeLogin}
                >
                    <DialogC aria-label='login'>
                        <LoginHeader>
                            <div className='title'>{t('105')}</div>
                            <img className='close' onClick={this.closeLogin} src={require('../../assets/nav/close.png').default}/>
                        </LoginHeader>
                        <LoginRow>
                            <div className='title'>{t('186')}</div>
                            <div className='input'>
                                <input type='email' value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} placeholder={t('190')}/>
                            </div>
                        </LoginRow>
                        <LoginRow>
                            <div className='title'>{t('187')}</div>
                            <div className='input'>
                                <input type='number' value={this.state.code} onChange={(e)=>this.setState({code:e.target.value})} placeholder={t('188')}/>
                                <button className='btn' type='button' onClick={()=>this.getCode()}>{countdown>0?`${countdown}s`:t('189')}</button>
                            </div>
                        </LoginRow>
                        <LoginSureBtn className='custom' disabled={isEmpty(this.state.email)||isEmpty(this.state.code)} onClick={this.sureLogin}>
                            <span>{t('105')}</span>
                            <img src={require('../../assets/nav/login_arrow.png').default}/>
                        </LoginSureBtn>
                        <LoginLine>{t('1104')}</LoginLine>
                        <LoginOtherRow>
                            <LoginOtherRowItem>
                                <LoginOtherBtn onClick={()=>this.handleGoogleAuthClick()}><img src={require('../../assets/nav/google.png').default}/></LoginOtherBtn>
                                <span>Google</span>
                            </LoginOtherRowItem>
                            <LoginOtherRowItem>
                                <LoginOtherBtn onClick={()=>this.handleMetamaskAuthClick()}><img src={require('../../assets/nav/metamask.png').default}/></LoginOtherBtn>
                                <span>Metamask</span>
                            </LoginOtherRowItem>
                            <LoginOtherRowItem>
                                <LoginOtherBtn onClick={()=>this.handlePhantomAuthClick()}><img src={require('../../assets/nav/phantom.png').default}/></LoginOtherBtn>
                                <span>Phantom</span>
                            </LoginOtherRowItem>
                        </LoginOtherRow>
                    </DialogC>
                </DialogOverlay>
                <DialogOverlay
                    style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.3)' }}
                    isOpen={showMenu}
                    onDismiss={this.closeMenu}
                >
                    <DialogM aria-label='nav'>
                        <Group>
                            <Row><NavLink to='/' onClick={this.closeMenu}>{t('100')}</NavLink></Row>
                            <Row><NavLink to='/displacement' onClick={this.closeMenu}>{t('207')}</NavLink></Row>
                            <Row><NavLink to='/airdrop' onClick={this.closeMenu}>{t('101')}</NavLink></Row>
                            <Row><NavLink to='/ido' onClick={this.closeMenu}>IDO</NavLink></Row>
                            <Row><NavLink to='/roadmap' onClick={this.closeMenu}>{t('102')}</NavLink></Row>
                            <Row><NavLink to='/news' onClick={this.closeMenu}>{t('103')}</NavLink></Row>
                        </Group>
                        <Group>
                            <Row>CHIPCHIP</Row>
                            <ItemA href={HoldemUrl[i18n.language]} target='__blank'>{t('167')}</ItemA>
                            <ItemA href={AOFUrl[i18n.language]} target='__blank'>AOF</ItemA>
                            <ItemA href={MTTUrl[i18n.language]} target='__blank'>MTT</ItemA>
                            <ItemA href={Web3ChampionshipsUrl[i18n.language]} target='__blank'>{t('179')}</ItemA>
                            <ItemA href={UniversalRebateUrl} target='__blank'>{t('180')}</ItemA>
                        </Group>
                        <Group>
                            <Row>{t('181')}</Row>
                            <ItemA href='#' target='__blank'>{t('182')}</ItemA>
                            <Item><NavLink to='/faq' onClick={this.closeMenu}>{t('172')}</NavLink></Item>
                            <ItemA href={UserAgreementUrl} target='__blank'>{t('183')}</ItemA>
                            <ItemA href={PrivacyPolicyUrl} target='__blank'>{t('184')}</ItemA>
                            <ItemA href={BlogUrl} target='__blank'>{t('185')}</ItemA>
                            <Item><NavLink to='/download' onClick={this.closeMenu}>{t('112')}</NavLink></Item>
                        </Group>
                    </DialogM>
                </DialogOverlay>
            </NavBody>
        )
    }
}

const Root = styled.div`
position: fixed;
top: 10px;
left: 20px;
right: 20px;
min-width: auto;
border-radius: 12px;
background: rgba(53, 53, 53, 0.55);
backdrop-filter: blur(15px);
z-index: 9;
transition: transform 0.3s;
${({ theme }) => theme.mediaQueries.sm}{
    top: 38px;
    left: 40px;
    right: 40px;
    border-radius: 16px;
    width: calc(100vw - 80px);
    min-width: calc(1200px - 80px);
};
&.hidden {
transform: translateY(-150%);
}
`
const NavBody = styled.div`
height: 45px;
padding: 0 22px 0 14px;
display: flex;
align-items: center;
justify-content: space-between;
${({ theme }) => theme.mediaQueries.sm}{
    margin: 0;
    height: 85px;
    padding: 0 45px;
    border-bottom: none;
};
`
const NavLogo = styled.img`
cursor: pointer;
width: 106px;
height: 24px;
${({ theme }) => theme.mediaQueries.sm}{
width: 193px;
height: 44px;
};
`
const NavCenter = styled.div`
display: none;
gap: 50px;
align-items: center;
${({ theme }) => theme.mediaQueries.sm}{
display: flex;
};
`
const NavCenterLink = styled(NavLink)`
font-size: 18px;
color: ${({ theme }) => theme.colors.textSubtle};
&.active {
    color: ${({ theme }) => theme.colors.text};
}
`
const NavCenterNoLink = styled.button`
position: relative;
background: transparent;
font-size: 18px;
color: ${({ theme }) => theme.colors.textSubtle};
display: flex;
align-items: center;
gap: 6px;
img {
width: 14px;
height: 14px;
}
&:hover {
    color: ${({ theme }) => theme.colors.text};
    .modal {
        display: block;
    }
}
&:blur {
    .modal {
        display: none;
    }
}
`
const NavRight = styled.div`
display: flex;
align-items: center;
gap: 20px;
${({ theme }) => theme.mediaQueries.sm}{
gap: 25px;
};
`
const LoginBtn = styled.button`
height: 30px;
font-size: 13px;
font-weight: 600;
border: none;
padding: 0 12px;
border-radius: 6px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
color: #FFFFFF;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 16px;
height: 40px;
padding: 0 22px;
border-radius: 8px;
};
`
const PersonalBody = styled.div`
cursor: pointer;
margin-left: 12px;
position: relative;
display: flex;
align-items: center;
justify-content: center;
img {
width: 20px;
height: 20px;
}
${({ theme }) => theme.mediaQueries.sm}{
img {
width: 32px;
height: 32px;
}
};
&:hover {
    .modal {
        display: block;
    }
}
&:blur {
    .modal {
        display: none;
    }
}
`
const PModal = styled.div`
position: absolute;
display: none;
top: 30px;
right: -80px;
z-index: 100;
${({theme})=>theme.mediaQueries.sm} {
    top: 25px;
    right: 0;
};
`
const PModalContent = styled.div`
margin-top: 0;
padding: 20px 15px 0;
background: ${({theme})=>theme.colors.backgroundAlt};
width: 142px;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 8px;
img {
width: 32px;
height: 32px;
}
div {
margin-top: 10px;
font-size: 12px;
opacity: 0.6;
}
button {
padding: 10px 0;
border-top: 1px solid #3F3F3F;
width: 100%;
margin-top: 15px;
font-size: 12px;
opacity: 0.6;
}
${({theme})=>theme.mediaQueries.sm} {
img {
width: 40px;
height: 40px;
}
div {
font-size: 18px;
}
button {
margin-top: 20px;
font-size: 18px;
}
margin-top: 20px;
width: 204px;
};
`
const BtnImg = styled.img`
cursor: pointer;
margin-left: 12px;
width: 32px;
height: 32px;
display: none;
${({ theme }) => theme.mediaQueries.sm}{
display: block;
};
`
const MenuImg = styled.img`
width: 16px;
height: 16px;
display: block;
${({ theme }) => theme.mediaQueries.sm}{
display: none;
};
` 
const DialogC = styled(DialogContent)`
width: calc(100% - 50px);
padding: 16px 25px;
border-radius: 12px;
background: #362F42;
${({ theme }) => theme.mediaQueries.sm}{
    width: 475px;
    padding: 25px 38px;
};
`
const LoginHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 21px;
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
const LoginRow = styled.div`
margin-top: 16px;
.title {
margin-left: 10px;
margin-bottom: 10px;
font-size: 14px;
font-weight: 500;
opacity: 0.8;
}
.input {
border-radius: 4px;
background: #121212;
padding: 0 14px;
height: 40px;
display: flex;
gap: 10px;
input {
flex: 1;
height: 100%;
font-size: 14px;
font-weight: 500;
}
.btn {
flex-shrink: 0;
font-size: 13px;
font-weight: 600;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
}
${({ theme }) => theme.mediaQueries.sm}{
.title {
margin-left: 14px;
margin-bottom: 15px;
font-size: 16px;
}
.input {
padding: 0 20px;
height: 50px;
.btn {
font-size: 14px;
}
}
};
`
const LoginSureBtn = styled.button`
width: 100%;
height: 53px;
margin-top: 30px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 16px;
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
}
`
const LoginLine = styled.div`
font-size: 14px;
line-height: 32px;
opacity: 0.2;
text-align: center;
margin-top: 20px;
margin-bottom: 10px;
position: relative;
&:before {
position: absolute;
left: 60px;
content: '';
top: 50%;
width: 106px;
height: 1px;
background: #FFF;
}
&:after {
position: absolute;
right: 60px;
content: '';
top: 50%;
width: 106px;
height: 1px;
background: #FFF;
}
`
const LoginOtherRow = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
`
const LoginOtherRowItem = styled.div`
display: flex;
align-items: center;
flex-direction: column;
gap: 2px;
span {
opacity: 0.8;
font-size: 14px;
line-height: 32px;
}
`
const LoginOtherBtn = styled.button`
width: 45px;
height: 45px;
border-radius: 12px;
background: #121212;
padding: 8px;
line-height: 1;
img {
width: 100%;
height: 100%;
}
`
const DialogM = styled(DialogContent)`
width: calc(100% - 50px) !important;
margin: 60px auto 0 !important;
max-height: calc(100vh - 60px) !important;
overflow-y: auto !important;
padding: 0 30px !important;
border-radius: 8px !important;
background: #362F42 !important;
color: ${({ theme }) => theme.colors.text} !important;
${({ theme }) => theme.mediaQueries.sm}{
    width: 475px !important;
    padding: 25px 38px !important;
};
`
const Group = styled.div`
padding: 20px 0;
border-bottom: 1.5px solid #2F273D;
display: flex;
gap: 17px;
flex-direction: column;
&:last-child {
border-bottom: none;
}
`
const Row = styled.div`
font-size: 18px;
font-weight: 500;
a {
display: block;
}
`
const ItemA = styled.a`
margin-left: 16px;
font-size: 16px;
`
const Item = styled.div`
margin-left: 16px;
font-size: 16px;
a {
display: block;
}
`
const Modal = styled.div`
position: absolute;
display: none;
top: 20px;
right: 0;
z-index: 100;
${({theme})=>theme.mediaQueries.sm} {
    top: 20px;
};
`
const ModalContent = styled.div`
margin-top: 0;
padding: 10px 0;
background: ${({theme})=>theme.colors.backgroundAlt};
width: 108px;
display: flex;
flex-direction: column;
border-radius: 8px;
gap: 5px;
${({theme})=>theme.mediaQueries.sm} {
    margin-top: 20px;
    width: 204px;
};
`
const ModalRow = styled(NavLink)`
user-select: none;
padding: 5px 15px;
font-size: 14px;
font-weight: bold;
cursor: pointer;
display: flex;
justify-content: space-between;
align-items: center;
&:hover {
    background: ${({theme})=>theme.colors.backgroundAlt};
};
${({theme})=>theme.mediaQueries.sm} {
    font-size: 16px;
};
`

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo,
    showLogin: state.config.showLogin,
});

const mapDispatchToProps = {
    setUserInfo,
    removeUserInfo,
    setShowLogin,
    setCloseLogin,
};

export default withTranslation()(withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav)));
