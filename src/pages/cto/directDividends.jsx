import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import Radio from "@/components/radio";
import DatePicker from "@/components/datePicker";
import Select from "@/components/select";
import InputNumber from "@/components/inputNumber";

export default function Index({show,onClose}) {
    const { t } = useTranslation();
    const shouldRender = useBreakpointCheck();
    const [count, setCount] = useState(0);
    const handleChange = (event) => {
        const newValue = event.target.value;
        if (newValue === '' || /^[1-9]\d*$/.test(newValue)) {
            setCount(newValue);
        }
    };
    return (
        <DialogOverlay
            style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
            isOpen={show}
            onDismiss={onClose}
        >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>{t('21026')}</div>
                    <img className='close' onClick={onClose} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                {shouldRender ? <ModalContent>
                    <RowTitle>{t('21035')}</RowTitle>
                    <RowColumn>
                        <Radio title={t('21036')} checked={true} onChange={val=>{}}/>
                        <Radio title={t('21037')} checked={false} onChange={val=>{}}/>
                    </RowColumn>
                    <RowInputColumn>
                        <InputNumber value={count} unit="SOL" onChange={handleChange}/>
                        <InputNumber value={count} unit="%" onChange={handleChange}/>
                    </RowInputColumn>
                    <RowTitle>{t('21038')}</RowTitle>
                    <RowColumn>
                        <Radio title={t('21039')} checked={true} onChange={val=>{}}/>
                        <Radio title={t('21040')} checked={false} onChange={val=>{}}/>
                    </RowColumn>
                    <RowInputColumn>
                        <InputNumber value={count} unit="SOL" onChange={handleChange}/>
                        <RowTextarea>
                            <textarea placeholder={t('21041')}></textarea>
                        </RowTextarea>
                        <RowText>
                            <RowImport>{t('21042')}</RowImport>
                        </RowText>
                    </RowInputColumn>
                    <RowTitle>{t('21044')}</RowTitle>
                    <RowColumn>
                        <Radio title={t('21043')} checked={true} onChange={val=>{}}/>
                        <Radio title={t('21024')} checked={false} onChange={val=>{}}/>
                    </RowColumn>
                    <RowInputColumn>
                        <RowInputEmpty/>
                        <Select options={[{label: t('21069'), value: ''},{label: t('21070'), value: ''},{label: t('21071'), value: ''}]}/>
                    </RowInputColumn>
                    <RowTitle>{t('21009')}</RowTitle>
                    <DatePicker onChange={()=>{}} />
                </ModalContent>:
                <ModalContentH5>
                    <RowTitle>{t('21035')}</RowTitle>
                    <RowH5>
                        <RowColumn>
                            <Radio title={t('21036')} checked={true} onChange={val=>{}}/>
                            <Radio title={t('21037')} checked={false} onChange={val=>{}}/>
                        </RowColumn>
                        <RowInputColumn>
                            <InputNumber value={count} unit="SOL" onChange={handleChange}/>
                            <InputNumber value={count} unit="%" onChange={handleChange}/>
                        </RowInputColumn>
                    </RowH5>
                    <RowTitle>{t('21038')}</RowTitle>
                    <RowH5>
                        <RowColumn>
                            <Radio title={t('21039')} checked={true} onChange={val=>{}}/>
                            <Radio title={t('21040')} checked={false} onChange={val=>{}}/>
                        </RowColumn>
                        <RowInputColumn>
                            <InputNumber value={count} unit="SOL" onChange={handleChange}/>
                            <RowText>
                                <RowImport>{t('21042')}</RowImport>
                            </RowText>
                        </RowInputColumn>
                        <RowTextarea>
                            <textarea placeholder={t('21041')}></textarea>
                        </RowTextarea>
                    </RowH5>
                    <RowTitle>{t('21044')}</RowTitle>
                    <RowH5>
                        <RowColumn>
                            <Radio title={t('21043')} checked={true} onChange={val=>{}}/>
                            <Radio title={t('21024')} checked={false} onChange={val=>{}}/>
                        </RowColumn>
                        <RowInputColumn>
                            <RowInputEmpty/>
                            <Select options={[{label: t('21069'), value: ''},{label: t('21070'), value: ''},{label: t('21071'), value: ''}]}/>
                        </RowInputColumn>
                    </RowH5>
                    <RowTitle>{t('21009')}</RowTitle>
                    <DatePicker onChange={()=>{}} />
                </ModalContentH5>
                }
                <LargeBtn className='custom' onClick={()=>{}}>{t('21034')}</LargeBtn>
            </DialogC>
        </DialogOverlay>
    )
}


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
margin: 0 auto;
margin-top: 28px;
width: 100%;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 40px;
max-width: 500px;
};
`
const DialogC = styled(DialogContent)`
width: calc(100% - 50px) !important;
padding: 16px 20px 32px !important;
border-radius: 12px !important;
background: #362F42 !important;
color: ${({ theme }) => theme.colors.text} !important;
${({ theme }) => theme.mediaQueries.sm}{
    width: 750px !important;
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
display: grid;
grid-template-columns: auto auto 1fr 1fr;
grid-column-gap: 20px;
grid-row-gap: 35px;

& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
& > :nth-child(3) { grid-area: 1 / 3 / 2 / 5; }

& > :nth-child(4) { grid-area: 2 / 1 / 3 / 2; }
& > :nth-child(5) { grid-area: 2 / 2 / 3 / 3; }
& > :nth-child(6) { grid-area: 2 / 3 / 3 / 5; }

& > :nth-child(7) { grid-area: 3 / 1 / 4 / 2; }
& > :nth-child(8) { grid-area: 3 / 2 / 4 / 3; }
& > :nth-child(9) { grid-area: 3 / 3 / 4 / 5; }

& > :nth-child(10) { grid-area: 4 / 1 / 5 / 2; }
& > :nth-child(11) { grid-area: 4 / 2 / 5 / 4; }
`
const RowTitle = styled.div`
font-size: 14px;
font-weight: 400;
opacity: 0.4;
line-height: 32px;
margin-top: 20px;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 0;
font-size: 16px;
font-weight: 500;
opacity: 0.8;
line-height: 40px;
}
`
const RowColumn = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
> div {
height: 32px;
}
${({ theme }) => theme.mediaQueries.sm}{
> div {
height: 40px;
}
};
`
const RowInputColumn = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
`
const RowInputEmpty = styled.div`
height: 32px;
${({ theme }) => theme.mediaQueries.sm}{
height: 40px;
}
`
const RowTextarea = styled.div`
grid-column: span 2;
border-radius: 4px;
background: #121212;
padding: 0 14px;
height: 80px;
display: flex;
align-items: center;
gap: 10px;
textarea {
background: transparent;
border: none;
padding: 10px 0;
resize: none;
flex: 1;
height: 100%;
font-size: 14px;
font-weight: 500;
}
span {
font-size: 13px;
}
${({ theme }) => theme.mediaQueries.sm}{
grid-column: unset;
padding: 0 20px;
height: 102px;
span {
font-size: 14px;
}
};
`
const RowText = styled.div`
display: flex;
justify-content: flex-end;
`
const RowImport = styled.div`
line-height: 32px;
cursor: pointer;
font-size: 12px;
font-weight: 600;
background: linear-gradient(90deg, #8E52F6, #75F6A3);
background-clip: text;
-webkit-text-fill-color: transparent;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 14px;
line-height: unset;
};
`
const ModalContentH5 = styled.div``
const RowH5 = styled.div`
display: grid;
grid-template-columns: auto 1fr;
grid-column-gap: 20px;
grid-row-gap: 12px;
& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { min-width: 100px; grid-area: 1 / 2 / 2 / 3; }
`
