import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from "react-router-dom"
import { withTranslation } from 'react-i18next'
import emitter from "../../constants/emitter";
import { CHANGELANGUAGE } from "../../constants";

class LanguageButton extends Component {
    state = {
        showModal: true,
    }
    change = (language)=>{
        const {i18n} = this.props;
        if(('changeLanguage' in i18n)&&i18n.language!==language){
            i18n.changeLanguage(language)
            emitter.emit(CHANGELANGUAGE, language);
        }
        this.setState({showModal:false});
        setTimeout(() => {
            this.setState({showModal:true});
        }, 200);
    }
    render() {
        const {i18n} = this.props;
        let language = i18n.language?i18n.language:'en';
        if(language!=='en'&&language!=='zh_CN') {
            language = 'en';
        }
        const {showModal} = this.state;
        return (
            <Root>
                <Icon src={require('../../assets/nav/language.png').default}/>
                <Text>{language=='zh_CN'?'中文':'EN'}</Text>
                <Down src={require('../../assets/arrow_down.png').default}/>
                {showModal&&<Modal className='modal'>
                    <ModalContent>
                        <Row onClick={()=>this.change('en')}>
                            <span>English</span>
                            {language=='en'&&<img src={require('../../assets/checked.png').default}/>}
                        </Row>
                        <Row onClick={()=>this.change('zh_CN')}>
                            <span>中文</span>
                            {language=='zh_CN'&&<img src={require('../../assets/checked.png').default}/>}
                        </Row>
                    </ModalContent>
                </Modal>}
            </Root>
        )
    }
}

const Root = styled.div`
position: relative;
height: 20px;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
cursor: pointer;
${({ theme }) => theme.mediaQueries.sm} {
    height: 44px;
    padding: 10px 11px;
    border-radius: 8px;
    border: 1px solid ${({theme})=>theme.colors.borderColor};
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
const Icon = styled.img`
width: 20px;
height: 20px;
`
const Text = styled.div`
font-size: 18px;
color: ${({theme})=>theme.colors.textSubtle};
display: none;
${({ theme }) => theme.mediaQueries.sm} {
    display: blcok;
};
`
const Down = styled.img`
width: 14px;
height: 14px;
display: none;
${({ theme }) => theme.mediaQueries.sm} {
    display: blcok;
};
`
const Modal = styled.div`
position: absolute;
display: none;
top: 30px;
right: 0;
z-index: 100;
${({theme})=>theme.mediaQueries.sm} {
    top: 25px;
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
const Row = styled.div`
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
img {
    width: 11px;
    height: 7px;
}
`

export default withTranslation()(withRouter(LanguageButton));
