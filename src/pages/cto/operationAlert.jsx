import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import Radio from "@/components/radio";
import GradientSwitch from "@/components/gradientSwitch";
import DatePicker from "@/components/datePicker";
import Select from '@/components/select';
import Checkbox from "@/components/checkbox";
import InputNumber from '@/components/inputNumber';

export default function Index({type=0,show,onClose}) {
    const shouldRender = useBreakpointCheck();
    const [checked, setChecked] = useState(false);
    const [curIdx, setCurIdx] = useState(type==undefined?0:type);
    const [count, setCount] = useState(0);
    const handleChange = (event) => {
        const newValue = event.target.value;
        if (newValue === '' || /^[1-9]\d*$/.test(newValue)) {
            setCount(newValue);
        }
    };
    const renderBuyback = () => {
        return shouldRender?
        <>
            <ModalContent>
                <RowTitle>设置回购周期</RowTitle>
                <RowColumn>
                    <RowColumnRow>
                        <Radio title={"持续回购"} checked={false} onChange={val=>{}}/>
                        <RowTip>持续执行回购策略,回购资金池余额不足时终止回购</RowTip>
                    </RowColumnRow>
                    <RowColumnRow>
                        <Radio title={"限时回购"} checked={false} onChange={val=>{}}/>
                        <RowTip>在指定时间内执行回购策略,达到指定时间或余额不足时终止执行</RowTip>
                    </RowColumnRow>
                    <RowColumnRow>
                        <RowText>选择截止日期</RowText>
                        <DatePicker onChange={()=>{}} />
                    </RowColumnRow>
                </RowColumn>
                <RowTitle>选择回购策略</RowTitle>
                <RowColumn>
                    <GradientSwitch title={"随机时间赎回"} checked={checked} onChange={val=>setChecked(val)}/>
                    <RowColumnRow>
                        <RowText>随机赎回一次</RowText>
                        <Select/>
                    </RowColumnRow>
                    <RowColumnRow>
                        <RowText>单次回购金额</RowText>
                        <Select/>
                        <MyInputNumber value={count} unit="SOL" onChange={handleChange}/>
                    </RowColumnRow>
                    <GradientSwitch title={"技术指标回购"} checked={checked} onChange={val=>setChecked(val)}/>
                    <RowColumnGrid>
                        <Checkbox title={"多头趋势"} checked={checked} onChange={val=>setChecked(val)}/>
                        <RowColumn>
                            <RowTip>{"当价格突破MA30且MA30>MA60时,回购"}</RowTip>
                            <RowColumnRow>
                                <Select/>
                                <MyInputNumber value={count} unit="SOL" onChange={handleChange}/>
                            </RowColumnRow>
                        </RowColumn>
                        <Checkbox title={"空头趋势"} checked={checked} onChange={val=>setChecked(val)}/>
                        <RowColumn>
                            <RowTip>{"当价格跌破MA30且MA30<MA60时, 回购"}</RowTip>
                            <RowColumnRow>
                                <Select/>
                                <MyInputNumber value={count} unit="%" onChange={handleChange}/>
                            </RowColumnRow>
                        </RowColumn>
                        <Checkbox title={"特殊行情"} checked={checked} onChange={val=>setChecked(val)}/>
                        <RowColumn>
                            <RowTip>{"当24小时跌幅>20%时,回购"}</RowTip>
                            <RowColumnRow>
                                <Select/>
                                <MyInputNumber value={count} unit="SOL" onChange={handleChange}/>
                            </RowColumnRow>
                        </RowColumn>
                        <Checkbox title={"空头趋势"} checked={checked} onChange={val=>setChecked(val)}/>
                        <RowColumn>
                            <RowTip>{"当RSI<20时,回购"}</RowTip>
                            <RowColumnRow>
                                <Select/>
                                <MyInputNumber value={count} unit="%" onChange={handleChange}/>
                            </RowColumnRow>
                        </RowColumn>
                    </RowColumnGrid>
                </RowColumn>
            </ModalContent>
            <LargeBtn className='custom' onClick={()=>{}}>确定</LargeBtn>
        </>:<ModalContentH5>
            <RowTitle>设置回购周期</RowTitle>
            <RowContent>
                <div>
                    <Radio title={"持续回购"} checked={false} onChange={val=>{}}/>
                    <RowTip>持续执行回购策略,回购资金池余额不足时终止回购</RowTip>
                </div>
                <div>
                    <Radio title={"限时回购"} checked={false} onChange={val=>{}}/>
                    <RowTip>在指定时间内执行回购策略,达到指定时间或余额不足时终止执行</RowTip>
                </div>
                <RowText>选择截止日期</RowText>
                <DatePicker onChange={()=>{}} />
            </RowContent>
            <RowTitle>选择回购策略</RowTitle>
            <RowContent>
                <GradientSwitch title={"随机时间赎回"} checked={checked} onChange={val=>setChecked(val)}/>
                <RowText>随机赎回一次</RowText>
                <Select/>
                <RowText>单次回购金额</RowText>
                <RowContentColumn>
                    <Select/>
                    <MyInputNumber value={count} unit="SOL" onChange={handleChange}/>
                </RowContentColumn>
            </RowContent>
            <RowContent>
                <GradientSwitch title={"技术指标回购"} checked={checked} onChange={val=>setChecked(val)}/>
                <div>
                    <Checkbox title={"多头趋势"} checked={checked} onChange={val=>setChecked(val)}/>
                    <RowTip>{"当价格突破MA30且MA30>MA60时,回购"}</RowTip>
                </div>
                <RowContentColumn>
                    <Select/>
                    <MyInputNumber value={count} unit="SOL" onChange={handleChange}/>
                </RowContentColumn>
                <div>
                    <Checkbox title={"空头趋势"} checked={checked} onChange={val=>setChecked(val)}/>
                    <RowTip>{"当价格跌破MA30且MA30<MA60时, 回购"}</RowTip>
                </div>
                <RowContentColumn>
                    <Select/>
                    <MyInputNumber value={count} unit="%" onChange={handleChange}/>
                </RowContentColumn>
                <div>
                    <Checkbox title={"特殊行情"} checked={checked} onChange={val=>setChecked(val)}/>
                    <RowTip>{"当24小时跌幅>20%时,回购"}</RowTip>
                </div>
                <RowContentColumn>
                    <Select/>
                    <MyInputNumber value={count} unit="SOL" onChange={handleChange}/>
                </RowContentColumn>
                <div>
                    <Checkbox title={"空头趋势"} checked={checked} onChange={val=>setChecked(val)}/>
                    <RowTip>{"当RSI<20时,回购"}</RowTip>
                </div>
                <RowContentColumn>
                    <Select/>
                    <MyInputNumber value={count} unit="%" onChange={handleChange}/>
                </RowContentColumn>
            </RowContent>
            <LargeBtn className='custom' onClick={()=>{}}>确定</LargeBtn>
        </ModalContentH5>
    }
    const renderDividends = () => {
        return <>
            {shouldRender?<ModalContentDividends>
                <RowHTitle>分红比例</RowHTitle>
                <InputNumber value={count} unit="%" onChange={handleChange}/>
                <RowHTitle>分红条件</RowHTitle>
                <RowHColumn>
                    <Radio title={"按持币数量"} checked={true} onChange={val=>{}}/>
                    <Radio title={"指定地址"} checked={false} onChange={val=>{}}/>
                </RowHColumn>
                <RowInputColumn>
                    <InputNumber value={count} unit="SOL" onChange={handleChange}/>
                    <RowTextarea>
                        <textarea placeholder="输入地址,地址间用逗号分开"></textarea>
                    </RowTextarea>
                    <RowEnd>
                        <RowImport>批量导入</RowImport>
                    </RowEnd>
                </RowInputColumn>
                <RowHTitle>单次分红金额</RowHTitle>
                <RowHColumn>
                    <Radio title={"即时分红"} checked={true} onChange={val=>{}}/>
                    <Radio title={"按资金池比例"} checked={false} onChange={val=>{}}/>
                </RowHColumn>
                <RowInputColumn>
                    <RowInputEmpty/>
                    <Select/>
                </RowInputColumn>
                <RowHTitle>开始时间</RowHTitle>
                <DatePicker onChange={()=>{}} />
            </ModalContentDividends>
        :<ModalContentH5>
            <RowHTitle>单次分红金额</RowHTitle>
            <RowH5>
                <RowHColumn>
                    <Radio title={"固定金额"} checked={true} onChange={val=>{}}/>
                    <Radio title={"按资金池比例"} checked={false} onChange={val=>{}}/>
                </RowHColumn>
                <RowInputColumn>
                    <InputNumber value={count} unit="SOL" onChange={handleChange}/>
                    <InputNumber value={count} unit="%" onChange={handleChange}/>
                </RowInputColumn>
            </RowH5>
            <RowHTitle>分红条件</RowHTitle>
            <RowH5>
                <RowHColumn>
                    <Radio title={"按持币数量"} checked={true} onChange={val=>{}}/>
                    <Radio title={"指定地址"} checked={false} onChange={val=>{}}/>
                </RowHColumn>
                <RowInputColumn>
                    <InputNumber value={count} unit="SOL" onChange={handleChange}/>
                    <RowEnd>
                        <RowImport>批量导入</RowImport>
                    </RowEnd>
                </RowInputColumn>
                <RowTextarea>
                    <textarea placeholder="输入地址,地址间用逗号分开"></textarea>
                </RowTextarea>
            </RowH5>
            <RowHTitle>单次分红金额</RowHTitle>
            <RowH5>
                <RowHColumn>
                    <Radio title={"即时分红"} checked={true} onChange={val=>{}}/>
                    <Radio title={"按资金池比例"} checked={false} onChange={val=>{}}/>
                </RowHColumn>
                <RowInputColumn>
                    <RowInputEmpty/>
                    <Select/>
                </RowInputColumn>
            </RowH5>
            <RowHTitle>开始时间</RowHTitle>
            <DatePicker onChange={()=>{}} />
        </ModalContentH5>}
        <LargeBtn className='custom' onClick={()=>{}}>确定</LargeBtn>
        </>
    }
    const renderDestroy = () => {
        return <>
            {shouldRender?<ModalContentDestroy>
                <RowHTitle>销毁比例</RowHTitle>
                <InputNumber value={count} unit="%" onChange={handleChange}/>
                <RowHTitle>销毁时间</RowHTitle>
                <RowHColumn>
                    <Radio title={"即时分红"} checked={true} onChange={val=>{}}/>
                    <Radio title={"按资金池比例"} checked={false} onChange={val=>{}}/>
                </RowHColumn>
                <RowInputColumn>
                    <RowInputEmpty/>
                    <Select/>
                </RowInputColumn>
                <RowHTitle>开始时间</RowHTitle>
                <DatePicker onChange={()=>{}} />
            </ModalContentDestroy>
            :<ModalContentH5>
                <RowHTitle>销毁比例</RowHTitle>
                <InputNumber value={count} unit="%" onChange={handleChange}/>
                <RowHTitle>销毁时间</RowHTitle>
                <RowContentColumn>
                    <Radio title={"即时分红"} checked={true} onChange={val=>{}}/>
                </RowContentColumn>
                <RowContentColumn>
                    <Radio title={"按资金池比例"} checked={false} onChange={val=>{}}/>
                    <Select/>
                </RowContentColumn>
                <RowHTitle>开始时间</RowHTitle>
                <DatePicker onChange={()=>{}} />
            </ModalContentH5>}
            <LargeBtn className='custom' onClick={()=>{}}>确定</LargeBtn>
        </>
    }
    return (
        <DialogOverlay
                style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                isOpen={show}
                onDismiss={onClose}
            >
            <DialogC aria-label='modal'>
                <ModalHeader>
                    <div className='title'>
                        <ModelTitle className={curIdx==0?'selected':''} onClick={()=>setCurIdx(0)}><span>回购</span></ModelTitle>
                        <ModelTitle className={curIdx==1?'selected':''} onClick={()=>setCurIdx(1)}><span>分红</span></ModelTitle>
                        <ModelTitle className={curIdx==2?'selected':''} onClick={()=>setCurIdx(2)}><span>销毁</span></ModelTitle>
                    </div>
                    <img className='close' onClick={onClose} src={require('../../assets/nav/close.png').default}/>
                </ModalHeader>
                {curIdx==0&&renderBuyback()}
                {curIdx==1&&renderDividends()}
                {curIdx==2&&renderDestroy()}
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
margin: 2.5vh auto;
max-height: 95vh;
overflow: auto;
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
display: flex;
align-items: center;
gap: 25px;
}
.close {
cursor: pointer;
width: 17.5px;
height: 17.5px;
}
${({ theme }) => theme.mediaQueries.sm}{
.title {
font-size: 24px;
gap: 32px;
}
};
`
const ModelTitle = styled.div`
position: relative;
cursor: pointer;
font-size: 16px;
opacity: 0.6;
> span {
position: relative;
z-index: 1;
}
&.selected {
opacity: 1;
font-weight: 600;
&:before {
content: '';
position: absolute;
left: 50%;
top: 100%;
width: 90%;
height: 4px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
transform: translate(-50%, -200%);
}
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 24px;
};
`
const ModalContent = styled.div`
display: grid;
grid-template-columns: auto 1fr;
grid-column-gap: 40px;
grid-row-gap: 35px;
& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
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
const RowTitle = styled.div`
word-break: keep-all;
font-size: 14px;
font-weight: 600;
font-weight: 400;
opacity: 0.4;
&:not(:first-child) {
    margin-top: 30px;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
opacity: 1;
&:not(:first-child) {
    margin-top: 0;
}
}
`
const RowHTitle = styled(RowTitle)`
line-height: 32px;
${({ theme }) => theme.mediaQueries.sm}{
line-height: 40px;
};
`
const RowContent = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-row-gap: 10px;
margin-top: 16px;
`
const RowContentColumn = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 10px;
`
const RowColumn = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
`
const RowHColumn = styled.div`
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
const RowColumnRow = styled.div`
display: flex;
align-items: center;
gap: 12px;
`
const RowColumnGrid = styled.div`
display: grid;
grid-template-columns: auto 1fr;
grid-column-gap: 12px;
grid-row-gap: 12px;
align-items: flex-start;
& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
`
const RowTip = styled.div`
font-size: 12px;
opacity: 0.6;
display: flex;
align-items: center;
margin-left: 20px;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 14px;
margin-left: 0;
height: 24px;
};
`
const RowText = styled.div`
font-size: 14px;
word-break: keep-all;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 16px;
};
`
const MyInputNumber = styled(InputNumber)`
> input {
width: 80px;
}
`
const ModalContentDividends = styled.div`
display: grid;
grid-template-columns: auto auto 1fr 1fr;
grid-column-gap: 20px;
grid-row-gap: 35px;

& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { grid-area: 1 / 2 / 2 / 4; }
& > :nth-child(3) { grid-area: 2 / 1 / 3 / 2; }
& > :nth-child(4) { grid-area: 2 / 2 / 3 / 3; }
& > :nth-child(5) { grid-area: 2 / 3 / 3 / 5; }
& > :nth-child(6) { grid-area: 3 / 1 / 4 / 2; }
& > :nth-child(7) { grid-area: 3 / 2 / 4 / 3; }
& > :nth-child(8) { grid-area: 3 / 3 / 4 / 5; }
& > :nth-child(9) { grid-area: 4 / 1 / 5 / 2; }
& > :nth-child(10) { grid-area: 4 / 2 / 5 / 4; }
`
const RowEnd = styled.div`
display: flex;
justify-content: flex-end;
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
const ModalContentDestroy = styled.div`
display: grid;
grid-template-columns: auto auto 1fr 1fr;
grid-column-gap: 20px;
grid-row-gap: 35px;

& > :nth-child(1) { grid-area: 1 / 1 / 2 / 2; }
& > :nth-child(2) { grid-area: 1 / 2 / 2 / 4; }
& > :nth-child(3) { grid-area: 2 / 1 / 3 / 2; }
& > :nth-child(4) { grid-area: 2 / 2 / 3 / 3; }
& > :nth-child(5) { grid-area: 2 / 3 / 3 / 5; }
& > :nth-child(6) { grid-area: 3 / 1 / 4 / 2; }
& > :nth-child(7) { grid-area: 3 / 2 / 4 / 4; }
`
