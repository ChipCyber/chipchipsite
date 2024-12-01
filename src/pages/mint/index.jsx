import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import ReactECharts from 'echarts-for-react';
import { message } from 'antd';
import styled, { keyframes } from "styled-components";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useBreakpointCheck from "@/hooks/useBreakpointCheck";
import { knowledgePageListApi } from "@/api";
import { useLanguage } from "@/LanguageContext";
import { getGlobalInfoApi, exchangelistApi, queryChipPriceApi, queryKlineApi } from "@/api/mint.js";
import { setShowConnectWallet, refreshWalletBalance } from "@/store/userSlice.js";
import { debounce, getDateDiff, parseTime, formatTimeDiff } from "@/utils";
import { _getValueMultip, _saveToTwoWei, isEmpty, isNoEmpty } from "@/constants/constantsFunction";
import { InitialPrice } from "@/constants";
import { solana_sendSOL, solana_sendSPLToken } from "@/wallet/solana.js";
import { getTokenBalance } from "@/wallet/methods.js";

const kLineTypeList = ["1H", "6H", "1D", "1W", "1M", "ALL"];
const coinTypeList = {
    1: "SOL",
    2: "USDT",
    3: "USDC",
    4: "CHIP",
};

const getChart = (data=[],kLineType) => {
    const staticOptions = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                if (!params || !params[0]) return '';
                const param = params[0];
                const date = new Date(param.value[0] * 1000);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate().toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');
                return (`${year}/${month}/${day} ${hours}:${minutes}:${seconds} ${param.value[1]}`);
            },
            axisPointer: {
                animation: false,
            },
        },
        xAxis: {
            type: 'category',
            axisLine: {
                interval: 'auto',
                show: true,
                lineStyle: {
                    color: 'rgb(130,130,130,0.3)',
                    width: 1,
                },
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                fontSize: 12,
                color: 'rgb(130,130,130,0.3)',
                // formatter: '{yyyy}-{MM}-{dd}\n{HH}:{mm}:{ss}',
                formatter: function (value) {
                    var date = new Date(value * 1000);
                    // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                    // return `${date.getMonth() + 1}/${date.getDate()}`;
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate().toString().padStart(2, '0');
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    const seconds = date.getSeconds().toString().padStart(2, '0');
                    return `${year}/${month}/${day}\n${hours}:${minutes}:${seconds}`;
                },
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            position: 'right',
            boundaryGap: [0, '100%'],
            axisLine: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(130,130,130,0.3)',
                    width: 1,
                    dashOffset: 0,
                    lineDash: [2, 1],
                },
            },
            axisLabel: {
                color: 'rgb(130,130,130,0.3)',
            },
        },
        series: [
            {
                name: 'Sample Data',
                type: 'line',
                showSymbol: false,
                data: data,
                lineStyle: {
                    color: '#00E9BA',
                    width: 2,
                },
                animationDurationUpdate: 0,
                animationEasingUpdate: "linear",
                // markLine: {
                //     symbol: 'none',
                //     data: [
                //         { type: 'average', name: '平均值' },
                //     ],
                //     lineStyle: {
                //         color: '#FF5733',
                //         type: 'dashed',
                //         width: 1,
                //         dashOffset: 0,
                //         lineDash: [2, 1],
                //     },
                //     label: {
                //         formatter: function (params) {
                //             const avgValue = params.value.toFixed(2);
                //             return `Avg: ${avgValue}%`;
                //         },
                //         position: 'end',
                //         color: '#FF5733',
                //     },
                // },
            }
        ],
        grid: {
            left: '5%',
            right: '60px',
            top: '10%',
            bottom: '50px'
        }
    };
    return <ReactECharts option={staticOptions} style={{ height: '100%', width: '100%' }}/>;
};

export default function Index() {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const dispatch = useDispatch();
    const shouldRender = useBreakpointCheck();
    const currentWalletAddress = useSelector((state) => state.user?.currentWalletAddress);
    const currentWalletBalance = useSelector((state) => state.user?.currentWalletBalance);
    const [chipBalance, setChipBalance] = useState(null);
    const [exchange, setExchange] = useState(false);
    const [count, setCount] = useState('');
    const [globalInfo, setGlobalInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});
    const [exchangeList, setExchangeList] = useState([]);
    const [klineList, setklineList] = useState([]);
    const [kLineType, setkLineType] = useState(kLineTypeList[kLineTypeList.length-1]);
    const [isPageVisible, setIsPageVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [menuIndex, setMenuIndex] = useState(0);
    const [faqList, setFaqList] = useState([]);
    const history = useHistory();
    const [timeDiff, setTimeDiff] = useState({});
    const refreshBalance = () => {
        if(currentWalletAddress) {
            if(globalInfo.chipContractAddr){
                setChipBalance(null);
                getTokenBalance(currentWalletAddress, globalInfo.chipContractAddr).then(balance=>{
                    setChipBalance(balance);
                });
            }
            dispatch(refreshWalletBalance(currentWalletAddress));
        }
    }
    let timer = useRef(null);
    useEffect(() => {
        if(timer.current) {
            clearInterval(timer.current);
        }
        timer.current = setInterval(() => {
            if(isNoEmpty(globalInfo)&&isNoEmpty(globalInfo.tradeStartTime)) {
                setTimeDiff(formatTimeDiff(globalInfo.tradeStartTime));
            }
        }, 1000);
        return () => {
            clearInterval(timer.current);
        }
    }, [globalInfo]);
    const tradeBeginType = useMemo(() => {
        if (!timeDiff || isEmpty(timeDiff.diff)) {
            return -1;
        }
        return timeDiff.diff <= 0 ? 1 : 0;
    }, [timeDiff]);
    useEffect(() => {
        refreshBalance();
    }, [currentWalletAddress, globalInfo]);
    useEffect(() => {
        knowledgePageListApi({pageIndex:1,pageSize:5,knowledgeType:3}).then(({data})=>{
            setFaqList(data);
        });
    }, [language]);
    useEffect(() => {
        getGlobalInfoApi().then(({data})=>{
            setGlobalInfo(data);
        });
        exchangelistApi({solanaAddr:"",pageIndex:1,pageSize:8}).then(({data})=>{
            setExchangeList(data.exchangeList ?? []);
        });
    }, []);
    useEffect(() => {
        setklineList([]);
        queryKlineApi({kLineDuration:kLineType}).then(({data})=>{
            const list = data.rows ?? [];
            const newList = [];
            list.forEach(item=>{
                newList.push([item.closeTime, _saveToTwoWei(item.kClose,4)]);
            });
            setklineList(newList);
            createWs();
        });
    }, [kLineType]);
    const handleChange = (event) => {
        const newValue = event.target.value;
        setCount(newValue);
    };
    const debouncedRequestApi = debounce((count)=>{
        queryChipPriceApi({
            "srcType": exchange?"CHIP":"SOL",
            "dstType": exchange?"SOL":"CHIP",
            "srcAmount": `${count}`,
        }).then(({data})=>{
            setPriceInfo(data);
        });
    });
    useEffect(() => {
        setPriceInfo({});
        if (count>0) {
            debouncedRequestApi(count);
        }
    }, [count]);
    useEffect(() => {
        setCount('');
        setPriceInfo({});
    }, [exchange]);
    const sureSwap = () => {
        if(currentWalletAddress) {
            setLoading(true);
            if(exchange) {
                solana_sendSPLToken(currentWalletAddress,priceInfo.receiptAddress,count,globalInfo.chipContractAddr).then(data=>{
                    setCount('');
                    setPriceInfo({});
                    setLoading(false);
                    refreshBalance();
                    message.success(t('616'));
                }).catch(err=>{
                    setLoading(false);
                    message.error(err);
                });
            }else{
                solana_sendSOL(currentWalletAddress,priceInfo.receiptAddress,count).then(data=>{
                    setCount('');
                    setPriceInfo({});
                    setLoading(false);
                    refreshBalance();
                    message.success(t('616'));
                }).catch(err=>{
                    setLoading(false);
                    message.error(err);
                });
            }
        }else{
            dispatch(setShowConnectWallet());
        }
    }
    useEffect(()=>{
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setIsPageVisible(true);
            } else {
                setIsPageVisible(false);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if(wsRef.current) {
                wsRef.current.close();
            }
        }
    },[]);
    const wsRef = useRef(null);
    const createWs = () => {
        if(wsRef.current&&(wsRef.current.readyState==WebSocket.CONNECTING||wsRef.current.readyState==WebSocket.OPEN)) {
            return;
        }
        if(wsRef.current) {
            wsRef.current.close();
        }
        wsRef.current = new WebSocket('wss://cyberwss.privatex.io/subscribekline');
        console.log('wsRef.current :>> ', wsRef.current);
        wsRef.current.onopen = () => {
            console.log('WebSocket connection established');
            const message = JSON.stringify({ msgType: 'kline', type: kLineType });
            wsRef.current.send(message);
        };
        wsRef.current.onmessage = (message) => {
            console.log('message :>> ', message);
            const dataObj = JSON.parse(message.data);
            const msgType = dataObj.msgType;
            const msgData = dataObj.data;
            if(msgType=='kline_resp') {
                setklineList((prevData) => {
                    const newData = [...prevData];
                    newData.shift();
                    newData.push([msgData.closeTime, _saveToTwoWei(msgData.kClose,4)]);
                    return newData;
                });
            }else if(msgType=='chip_price_resp'){
                setGlobalInfo((prevData)=>({...prevData,...msgData}))
            }
        };
        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        wsRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }
    useEffect(() => {
        if (isPageVisible) {
            createWs();
        } else if(!isPageVisible) {
            if(wsRef.current) {
                wsRef.current.close();
            }
        }
    }, [isPageVisible]);
    const renderW = () => (
        <>
        <Top>
            <TopContent>
                <TopLeft>
                    <div className='row'>
                        <img width={50} height={50} src={require("@/assets/mint/chip.png").default} alt='icon'/>
                        <div className='row_tip'>
                            <span className='row_tip_t1'>{globalInfo.chipSymbol ?? '--'}</span>
                            <span className='row_tip_t2'>CHIPCHIP</span>
                            <span className='row_tip_t3'>{t('8000')}</span>
                        </div>
                    </div>
                    {tradeBeginType>0?
                    <><div className='info'>
                        <TopLeftPrice>
                            <p>$ {_saveToTwoWei(globalInfo.price,4) ?? '--'}</p>
                            <p>{_getValueMultip(globalInfo.offsetRate,100) ?? '--'}%</p>
                        </TopLeftPrice>
                        <TopLeftInfo>
                            <div>
                                <p>{t('8001')}</p>
                                <p>${_saveToTwoWei(globalInfo.volume24H) ?? '--'}</p>
                            </div>
                            <div>
                                <p>{t('8002')}</p>
                                <p>${_saveToTwoWei(globalInfo.marketCap) ?? '--'}</p>
                            </div>
                            <div>
                                <p>{t('8003')}</p>
                                <p>${_saveToTwoWei(globalInfo.totalSupply) ?? '--'}</p>
                            </div>
                            <div>
                                <p>{t('8004')}</p>
                                <p>${globalInfo.holder ?? '--'}</p>
                            </div>
                        </TopLeftInfo>
                    </div>
                    <TopChart>
                        <TopChartBtn>
                            {kLineTypeList.map(item=>(
                                <button key={item} className={kLineType==item?'selected':''} onClick={()=>setkLineType(item)}>{item}</button>
                            ))}
                        </TopChartBtn>
                        <TopChartBody>{getChart(klineList,kLineType)}</TopChartBody>
                    </TopChart>
                    </>
                    :
                    <TopChartNoData>
                        <div className='bg'></div>
                        <div className='start'>
                            {tradeBeginType==0?<p>{t('8021')}</p>:<p>{t('8022')}</p>}
                            {tradeBeginType==0?<Time>
                                <TimeItem>{timeDiff.d?`${timeDiff.d}D`:'--'}</TimeItem>
                                <span>:</span>
                                <TimeItem>{timeDiff.h ?? '--'}</TimeItem>
                                <span>:</span>
                                <TimeItem>{timeDiff.m ?? '--'}</TimeItem>
                                <span>:</span>
                                <TimeItem>{timeDiff.s ?? '--'}</TimeItem>
                            </Time>
                            :
                            <Time>
                                <TimeItem>--</TimeItem>
                                <span>:</span>
                                <TimeItem>--</TimeItem>
                                <span>:</span>
                                <TimeItem>--</TimeItem>
                                <span>:</span>
                                <TimeItem>--</TimeItem>
                            </Time>}
                            {tradeBeginType==0&&<p>{parseTime(globalInfo.tradeStartTime) ?? '--'}(GMT+8)</p>}
                        </div>
                    </TopChartNoData>}
                </TopLeft>
                <TopRight>
                    <TopMenu>
                        <div onClick={()=>setExchange(false)} className={exchange==false?'active':''}>{t('8005')}</div>
                        <div onClick={()=>setExchange(true)} className={exchange?'active':''}>{t('8006')}</div>
                    </TopMenu>
                    <TopSwapBody>
                        <TopInput>
                            <p className='tip'>{t('8007')}</p>
                            <div className='input_row'>
                                <input type='number' min={1} value={count} onChange={handleChange} placeholder='0.00'/>
                                <div className='input_right'>
                                    <button className='max' onClick={()=>setCount(exchange?chipBalance:currentWalletBalance)}>MAX</button>
                                    <img width={28} height={28} src={exchange?require("@/assets/mint/chip.png").default:require("@/assets/mint/sol.png").default} alt='icon'/>
                                    <span>{exchange?'CHIP':'SOL'}</span>
                                    <p className='balance'>{t('8008')}：{(exchange?chipBalance:currentWalletBalance) ?? '--'}</p>
                                </div>
                            </div>
                        </TopInput>
                        <img onClick={()=>setExchange(!exchange)} className='exchange' width={52} height={52} src={require("@/assets/mint/exchange.png").default} alt='exchange'/>
                        <TopInput>
                            <p className='tip'>{t('8009')}</p>
                            <div className='input_row'>
                                <input type='number' value={priceInfo.dstAmount ?? ''} disabled placeholder='0.00'/>
                                <div className='input_right'>
                                    <img width={28} height={28} src={exchange?require("@/assets/mint/sol.png").default:require("@/assets/mint/chip.png").default} alt='icon'/>
                                    <span>{exchange?'SOL':'CHIP'}</span>
                                </div>
                            </div>
                        </TopInput>
                    </TopSwapBody>
                    <SureBtn onClick={()=>sureSwap()} disabled={currentWalletAddress&&(loading||count<=0||!priceInfo.receiptAddress)}>
                        {loading===true?<LoadImg src={require("@/assets/load.png").default} alt='load'/>
                        :(currentWalletAddress?(exchange?t('8006'):t('8005')):t('602'))}
                    </SureBtn>
                </TopRight>
            </TopContent>
        </Top>
        <img style={{width:'100%'}} src={require('../../assets/home/logo_row.png').default}/>
        <Content>
            <LeftInvest>
                <div className='header'>
                    <img src={require('../../assets/ido/invest.png').default}/>
                    <span>{t('8010')}</span>
                </div>
                <LeftInvestTableHeader>
                    <span>{t('8011')}</span>
                    <span>{t('8012')}</span>
                    <span>{t('8013')}</span>
                    <span>{t('8007')}</span>
                    <span>{t('8009')}</span>
                </LeftInvestTableHeader>
                <LeftInvestTableContent>
                    {exchangeList&&exchangeList.length>0?exchangeList.map((item,idx)=><LeftInvestTableRow key={idx}>
                        <p>{getDateDiff(item.sendTime)}</p>
                        <p className={item.flowType==1?'buy':'sell'}>{item.flowType==1?'Buy':'Sell'}</p>
                        <p>${_getValueMultip(item.sendPrice,item.solanaPrice,4)}</p>
                        <p>{_saveToTwoWei(item.receiveAmount,4)} {coinTypeList[item.receiveCoinType]}</p>
                        <p>{_saveToTwoWei(item.sendAmount,4)} {coinTypeList[item.sendCoinType]}</p>
                    </LeftInvestTableRow>)
                    :
                    renderNoData()
                    }
                </LeftInvestTableContent>
            </LeftInvest>
            <Right>
                <div className='header'>
                    <img src={require('../../assets/ido/info.png').default}/>
                    <span>{t('8014')}</span>
                </div>
                <RightContent>
                    <RightRow>
                        <p>{t('8002')}：</p>
                        <p>{_saveToTwoWei(globalInfo.marketCap) ?? '--'}</p>
                    </RightRow>
                    <RightRow>
                        <p>{t('8003')}：</p>
                        <p>{_saveToTwoWei(globalInfo.totalSupply) ?? '--'}</p>
                    </RightRow>
                    <RightRow>
                        <p>{t('8015')}：</p>
                        <p>{InitialPrice}</p>
                    </RightRow>
                    <RightRow>
                        <p>{t('8004')}：</p>
                        <p>{globalInfo.holder ?? '--'}</p>
                    </RightRow>
                    <RightRow>
                        <p>{t('8016')}：</p>
                        <p>Solana</p>
                    </RightRow>
                </RightContent>
                <RightData>
                    <p className='subTitle'>{t('8017')}</p>
                    <p className='subDesc'>{t('8018').split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>))}</p>
                </RightData>
            </Right>
        </Content>
        <Introduce>
            <IntroduceContent>
                <div>
                    <p className='title'>{t('8019')}</p>
                    <p className='desc'>{t('8020').split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>))}</p>
                </div>
                <img width={396} height={392} src={require("@/assets/mint/icon1.png").default} alt='icon'/>
            </IntroduceContent>
            <IntroduceStartContent>
                <img width={517} height={387} src={require("@/assets/mint/icon2.png").default} alt='icon'/>
                <div>
                    <p className='title'>{t('312')}</p>
                    <div className='tip'>
                        <img src={require('../../assets/ido/star.png').default}/>
                        <span>{t('313')}：</span>
                    </div>
                    <p className='desc'></p>
                    <IntroduceTipContent>
                        <IntroduceTipRow>{t('314')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('315')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('316')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('317')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('3171')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('3172')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('3173')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('3174')}</IntroduceTipRow>
                    </IntroduceTipContent>
                </div>
            </IntroduceStartContent>
        </Introduce>
        <Evaluate>
            <img className='bg' src={require('../../assets/ido/bottom_bg.png').default}/>
            <EvaluateContent>
                <div className='title'>{t('363')}</div>
                <EvaluateContentBody className='wow animate__animated animate__fadeIn'>
                    <div className='left1'>
                        <div className='item'>
                            <div className='header'>
                                <img src={require('../../assets/ido/avatar1.jpeg').default}/>
                                <span>Leo</span>
                            </div>
                            <div className='content'>{t('380')}</div>
                        </div>
                        <div className='item'>
                            <div className='header'>
                                <img src={require('../../assets/ido/avatar2.jpeg').default}/>
                                <span>Bruce</span>
                            </div>
                            <div className='content'>{t('381')}</div>
                        </div>
                    </div>
                    <div className='left2'>
                        <div className='item'>
                            <div className='header'>
                                <img src={require('../../assets/ido/avatar3.jpeg').default}/>
                                <span>Ron</span>
                            </div>
                            <div className='content'>{t('382')}</div>
                        </div>
                        <div className='item'>
                            <div className='header'>
                                <img src={require('../../assets/ido/avatar4.jpeg').default}/>
                                <span>Gavin</span>
                            </div>
                            <div className='content'>{t('383')}</div>
                        </div>
                    </div>
                    <div className='right'>
                        {/* <span className='active'></span>
                        <span></span>
                        <span></span> */}
                    </div>
                </EvaluateContentBody>
            </EvaluateContent>
        </Evaluate>
        <FAQ>
            <div className='title'>{t('172')}</div>
            {
                faqList.map((item,idx)=>(
                    <div className='item' onClick={()=>history.push('/faqDetail?id='+item.id)} key={idx}>{item.title}</div>
                ))
            }
        </FAQ>
        </>
    );
    const renderM = () => (
        <>
        <TopH5>
            <div className='row'>
                <img width={35} height={35} src={require("@/assets/mint/chip.png").default} alt='icon'/>
                <div className='row_tip'>
                    <span className='row_tip_t1'>{globalInfo.chipSymbol ?? '--'}</span>
                    <span className='row_tip_t2'>CHIPCHIP</span>
                </div>
            </div>
            <p className='row_tip_t3'>[t('8000')]</p>
            {tradeBeginType>0?<><TopLeftPrice>
                <p>$ {_saveToTwoWei(globalInfo.price,4) ?? '--'}</p>
                <p>{_getValueMultip(globalInfo.offsetRate,100) ?? '--'}%</p>
            </TopLeftPrice>
            <TopChart>
                <TopChartBtn>
                    {kLineTypeList.map(item=>(
                        <button key={item} className={kLineType==item?'selected':''} onClick={()=>setkLineType(item)}>{item}</button>
                    ))}
                </TopChartBtn>
                <TopChartBody>{getChart(klineList,kLineType)}</TopChartBody>
            </TopChart>
            </>:
            <TopChartNoData>
                <div className='bg'></div>
                <div className='start'>
                    {tradeBeginType==0?<p>{t('8021')}</p>:<p>{t('8022')}</p>}
                    {tradeBeginType==0?<Time>
                        <TimeItem>{timeDiff.d?`${timeDiff.d}D`:'--'}</TimeItem>
                        <span>:</span>
                        <TimeItem>{timeDiff.h ?? '--'}</TimeItem>
                        <span>:</span>
                        <TimeItem>{timeDiff.m ?? '--'}</TimeItem>
                        <span>:</span>
                        <TimeItem>{timeDiff.s ?? '--'}</TimeItem>
                    </Time>
                    :
                    <Time>
                        <TimeItem>--</TimeItem>
                        <span>:</span>
                        <TimeItem>--</TimeItem>
                        <span>:</span>
                        <TimeItem>--</TimeItem>
                        <span>:</span>
                        <TimeItem>--</TimeItem>
                    </Time>}
                    {tradeBeginType==0&&<p>{parseTime(globalInfo.tradeStartTime) ?? '--'}(GMT+8)</p>}
                </div>
            </TopChartNoData>}
            <TopLeftInfo>
                <div>
                    <p>{t('8001')}</p>
                    <p>${_saveToTwoWei(globalInfo.volume24H) ?? '--'}</p>
                </div>
                <div>
                    <p>{t('8002')}</p>
                    <p>${_saveToTwoWei(globalInfo.marketCap) ?? '--'}</p>
                </div>
                <div>
                    <p>{t('8003')}</p>
                    <p>${_saveToTwoWei(globalInfo.totalSupply) ?? '--'}</p>
                </div>
                <div>
                    <p>{t('8004')}</p>
                    <p>${globalInfo.holder ?? '--'}</p>
                </div>
            </TopLeftInfo>
            <TopRight>
                <TopMenu>
                    <div onClick={()=>setExchange(false)} className={exchange==false?'active':''}>{t('8005')}</div>
                    <div onClick={()=>setExchange(true)} className={exchange?'active':''}>{t('8006')}</div>
                </TopMenu>
                <TopSwapBody>
                    <TopInput>
                        <p className='tip'>{t('8007')}</p>
                        <div className='input_row'>
                            <input type='number' min={1} value={count} onChange={handleChange} placeholder='0.00'/>
                            <div className='input_right'>
                                <button className='max' onClick={()=>setCount(exchange?chipBalance:currentWalletBalance)}>MAX</button>
                                <img width={28} height={28} src={exchange?require("@/assets/mint/chip.png").default:require("@/assets/mint/sol.png").default} alt='icon'/>
                                <span>{exchange?'CHIP':'SOL'}</span>
                                <p className='balance'>{t('8008')}：{(exchange?chipBalance:currentWalletBalance) ?? '--'}</p>
                            </div>
                        </div>
                    </TopInput>
                    <img onClick={()=>setExchange(!exchange)} className='exchange' width={45} height={45} src={require("@/assets/mint/exchange.png").default} alt='exchange'/>
                    <TopInput>
                        <p className='tip'>{t('8009')}</p>
                        <div className='input_row'>
                            <input type='number' value={priceInfo.dstAmount ?? ''} disabled placeholder='0.00'/>
                            <div className='input_right'>
                                <img width={28} height={28} src={exchange?require("@/assets/mint/sol.png").default:require("@/assets/mint/chip.png").default} alt='icon'/>
                                <span>{exchange?'SOL':'CHIP'}</span>
                            </div>
                        </div>
                    </TopInput>
                </TopSwapBody>
                <SureBtn onClick={()=>sureSwap()} disabled={currentWalletAddress&&(loading||count<=0||!priceInfo.receiptAddress)}>
                    {loading===true?<LoadImg src={require("@/assets/load.png").default} alt='load'/>
                    :currentWalletAddress?(exchange?t('8006'):t('8005')):t('602')}
                </SureBtn>
            </TopRight>
        </TopH5>
        <Content>
            <MenuH5>
                <div onClick={()=>setMenuIndex(0)} className={menuIndex==0?'active':''}>{t('181')}</div>
                <div onClick={()=>setMenuIndex(1)} className={menuIndex==1?'active':''}>{t('8010')}</div>
            </MenuH5>
            {menuIndex==0&&renderAboutM()}
            {menuIndex==1&&renderRecordM()}
            <Introduce>
                <div>
                    <p className='title'>{t('8019')}</p>
                    <p className='desc'>{t('8020').split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>))}</p>
                </div>
                <div>
                    <p className='title'>{t('312')}</p>
                    <div className='tip'>
                        <img src={require('../../assets/ido/star.png').default}/>
                        <span>{t('313')}：</span>
                    </div>
                    <p className='desc'></p>
                    <IntroduceTipContent>
                        <IntroduceTipRow>{t('314')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('315')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('316')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('317')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('3171')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('3172')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('3173')}</IntroduceTipRow>
                        <IntroduceTipRow>{t('3174')}</IntroduceTipRow>
                    </IntroduceTipContent>
                </div>
            </Introduce>
        </Content>
        <EvaluateH5>
            <img className='bg' src={require('../../assets/ido/h5/bottom_bg.png').default}/>
            <div className='title'>{t('363')}</div>
            <EvaluateContentBodyH5>
                <div className='item'>
                    <div className='header'>
                        <img src={require('../../assets/ido/avatar1.jpeg').default}/>
                        <span>Leo</span>
                    </div>
                    <div className='content'>{t('380')}</div>
                </div>
                <div className='item'>
                    <div className='header'>
                        <img src={require('../../assets/ido/avatar2.jpeg').default}/>
                        <span>Bruce</span>
                    </div>
                    <div className='content'>{t('381')}</div>
                </div>
                <div className='item'>
                    <div className='header'>
                        <img src={require('../../assets/ido/avatar3.jpeg').default}/>
                        <span>Ron</span>
                    </div>
                    <div className='content'>{t('382')}</div>
                </div>
                <div className='item'>
                    <div className='header'>
                        <img src={require('../../assets/ido/avatar4.jpeg').default}/>
                        <span>Gavin</span>
                    </div>
                    <div className='content'>{t('383')}</div>
                </div>
                <div className='slider'>
                    {/* <span className='active'></span>
                    <span></span>
                    <span></span> */}
                </div>
            </EvaluateContentBodyH5>
        </EvaluateH5>
        <FAQH5>
            <div className='t_title'>{t('172')}</div>
            <div className='t_desc'>{t('193')}...</div>
            <FAQH5Tip>
                {
                    faqList.map((item,idx)=>(
                        <FAQH5TipRow onClick={()=>history.push('/faqDetail?id='+item.id)} key={idx}>{item.title}</FAQH5TipRow>
                    ))
                }
            </FAQH5Tip>
            <FAQH5More className='custom' onClick={()=>history.push('/faq')}>
                <span>{t('171')}</span>
                <img src={require('../../assets/nav/login_arrow.png').default}/>
            </FAQH5More>
        </FAQH5>
        </>
    );
    const renderRecordM = () =>(
        <LeftInvest>
            <div className='header'>
                <img src={require('../../assets/ido/invest.png').default}/>
                <span>{t('8010')}</span>
            </div>
            <LeftInvestTableHeader>
                <span>{t('8012')}/{t('8011')}</span>
                <span>{t('8013')}</span>
                <span>{t('8007')}</span>
                <span>{t('8009')}</span>
            </LeftInvestTableHeader>
            <LeftInvestTableContent>
                {exchangeList&&exchangeList.length>0?exchangeList.map((item,idx)=><LeftInvestTableRow key={idx}>
                    <p className={item.flowType==1?'buy':'sell'}>{item.flowType==1?'Buy':'Sell'}<br/><span>{getDateDiff(item.sendTime)}</span></p>
                    <p>${_getValueMultip(item.sendPrice,item.solanaPrice,4)}</p>
                    <p>{_saveToTwoWei(item.receiveAmount,4)} {coinTypeList[item.receiveCoinType]}</p>
                    <p>{_saveToTwoWei(item.sendAmount,4)} {coinTypeList[item.sendCoinType]}</p>
                </LeftInvestTableRow>)
                :
                renderNoData()
                }
            </LeftInvestTableContent>
        </LeftInvest>
    )
    const renderAboutM = () => (
        <Right>
            <div className='header'>
                <img src={require('../../assets/ido/info.png').default}/>
                <span>{t('8014')}</span>
            </div>
            <RightContent>
                <RightRow>
                    <p>{t('8002')}：</p>
                    <p>{_saveToTwoWei(globalInfo.marketCap) ?? '--'}</p>
                </RightRow>
                <RightRow>
                    <p>{t('8003')}：</p>
                    <p>{_saveToTwoWei(globalInfo.totalSupply) ?? '--'}</p>
                </RightRow>
                <RightRow>
                    <p>{t('8015')}：</p>
                    <p>{InitialPrice}</p>
                </RightRow>
                <RightRow>
                    <p>{t('8004')}：</p>
                    <p>{globalInfo.holder}</p>
                </RightRow>
                <RightRow>
                    <p>{t('8016')}：</p>
                    <p>Solana</p>
                </RightRow>
            </RightContent>
            <RightData>
                <p className='subTitle'>{t('8017')}</p>
                <p className='subDesc'>{t('8018').split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>))}</p>
            </RightData>
        </Right>
    )
    const renderNoData = () => (
        <NoData>
            <span>{t('7011')}</span>
        </NoData>
    );
    return (
        <Root>
            {shouldRender?renderW():renderM()}
        </Root>
    )
}

const NoData = styled.div`
height: 300px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: 16px;
color #7C7676;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
};
`

const Root = styled.div`
position: relative;
`

const TopH5 = styled.div`
padding: 86px 10px 10px;
.row {
display: flex;
align-items: center;
.row_tip {
margin-left: 10px;
font-size: 18px;
.row_tip_t1 {
font-size: 24px;
font-weight: 600;
}
.row_tip_t2 {
margin-left: 6px;
opacity: 0.4;
}
}
}
.row_tip_t3 {
margin-top: 12px;
font-size: 14px;
opacity: 0.6;
}
`
const MenuH5 = styled.div`
margin-bottom: 12px;
display: flex;
gap: 26px;
position: relative;
padding: 0 10px;
overflow-x: auto;
> div {
font-size: 15px;
flex-shrink: 0;
font-weight: 600;
line-height: 32px;
position: relative;
&.active {
    &:before {
    content: '';
    position: absolute;
    left: 3px;
    right: 3px;
    bottom: 7px;
    height: 4px;
    background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
    }
}
}
`
const EvaluateH5 = styled.div`
padding: 40px 10px 30px;
position: relative;
.bg {
width: 100%;
position: absolute;
left: 0;
bottom: 0;
}
.title {
margin-bottom: 22px;
padding-left: 20px;
font-size: 24px;
font-weight: 600;
}
`
const EvaluateContentBodyH5 = styled.div`
position: relative;
.slider {
margin-top: 20px;
height: 10px;
display: flex;
justify-content: center;
gap: 15px;
    span {
    cursor: pointer;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
        &.active {
        background: #FFF;
        }
    }
}
.item {
margin-bottom: 10px;
padding: 12px 27px 24px;
border-radius: 8px;
background: #090909;
    .header {
    display: flex;
    gap: 14px;
    align-items: center;
    font-size: 21px;
    font-weight: 600;
    line-height: 25px;
    img {
    width: 32px;
    height: 32px;
    }
}
.content {
margin-top: 18px;
font-size: 14px;
font-weight: 400;
line-height: 25px;
opacity: 0.8;
}
`
const FAQH5 = styled.div`
padding: 50px 24px 45px 36px;
.t_title {
font-size: 24px;
font-weight: 600;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.t_desc {
margin-top: 20px;
font-size: 14px;
font-weight: 600;
line-height: 21px;
opacity: 0.8;
background: linear-gradient(258deg, #75F6A3 5.58%, #FEAD1D 88.85%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
`
const FAQH5Tip = styled.ul`
margin-top: 20px;
list-style-type: none;
color: rgba(255,255,255,0.7);
`
const FAQH5TipRow = styled.li`
margin-top: 10px;
font-size: 14px;
position: relative;
padding-left: 8px;
&:before {
    content: '';
    position: absolute;
    left: -5px;
    top: 8px;
    width: 3px;
    height: 3px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
`
const FAQH5More = styled.button`
background: transparent;
margin-top: 10px;
font-size: 14px;
display: flex;
align-items: center;
img {
width: 20px;
height: 20px;
flex-shrink: 0;
}
`


const Top = styled.div`
position: relative;
height: 800px;
padding: 194px 60px 55px;
`
const TopContent = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 46px;
`
const TopLeft = styled.div`
flex: 1 0 0;
.row {
display: flex;
align-items: center;
.row_tip {
margin-left: 16px;
font-size: 18px;
.row_tip_t1 {
font-size: 32px;
font-weight: 600;
}
.row_tip_t2 {
margin-left: 6px;
opacity: 0.4;
}
.row_tip_t3 {
margin-left: 10px;
opacity: 0.6;
}
}
}
.info {
margin-top: 30px;
display: flex;
align-items: center;
justify-content: space-between;
}
`
const TopLeftPrice = styled.div`
display: flex;
align-items: baseline;
gap: 4px;
font-size: 38px;
font-weight: 700;
flex-shrink: 0;
> p {
&:last-child {
color: #10CB81;
font-size: 14px;
font-weight: 600;
}
}
`
const TopLeftInfo = styled.div`
display: flex;
align-items: center;
flex-shrink: 0;
padding: 0 16px;
margin-bottom: 22px;
> div {
flex: 1 0 0;
width: auto;
> p {
font-size: 12px;
font-weight: 500;
opacity: 0.8;
&:first-child {
font-size: 11px;
opacity: 0.4;
}
}
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 0;
margin-bottom: 0;
> div {
flex: 1 0 0;
width: 130px;
> p {
font-size: 18px;
&:first-child {
font-size: 14px;
}
}
}
}
`
const TopChart = styled.div`
display: flex;
flex-direction: column;
overflow: hidden;
margin-top: 12px;
margin-bottom: 20px;
height: 308px;
border-radius: 18px;
border: 1px solid ${({ theme }) => theme.colors.borderColor};
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 35px;
margin-bottom: 0;
height: 386px;
}
`
const TopChartBtn = styled.div`
margin-top: 12px;
margin-left: 18px;
display: flex;
align-items: center;
gap: 12px;
> button {
    background: transparent;
    color: #828282;
    font-size: 15px;
    font-weight: 500;
    &.selected {
        color: #FFF;
        background: rgba(255, 255, 255, 0.2);
        padding: 4px 10px;
        border-radius: 100px;
    }
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 22px;
margin-left: 36px;
gap: 26px;
}
`
const TopChartBody = styled.div`
width: 100%;
flex: 1;
`
const TopChartNoData = styled.div`
position: relative;
margin-top: 25px;
margin-bottom: 20px;
border-radius: 18px;
height: 308px;
border: 1px solid ${({ theme }) => theme.colors.borderColor};
overflow: hidden;
.bg {
position: absolute;
top: 256px;
left: 50%;
transform: translateX(-50%);
pointer-events: none;
filter: blur(50px);
width: 1185px;
height: 1244px;
border-radius: 1244px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
}
.start {
margin-top: 70px;
display: flex;
align-items: center;
flex-direction: column;
gap: 26px;
font-size: 18px;
font-weight: 700;
> p {
&:last-child {
opacity: 0.4;
font-size: 12px;
font-weight: 400;
}
}
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 20px;
margin-bottom: 0;
height: 480px;
.bg {
top: 380px;
}
.start {
margin-top: 84px;
gap: 32px;
font-size: 24px;
> p {
&:last-child {
font-size: 18px;
}
}
}
};
`
const TopRight = styled.div`
flex-shrink: 0;
border-radius: 4px;
background: #241F2D;
padding: 20px 20px 35px;
${({ theme }) => theme.mediaQueries.sm}{
width: 475px;
height: 550px;
padding: 24px 30px 60px;
};
`
const TopMenu = styled.div`
margin-bottom: 32px;
display: flex;
gap: 30px;
position: relative;
padding: 0 10px;
overflow-x: auto;
> div {
cursor: pointer;
font-size: 24px;
flex-shrink: 0;
position: relative;
padding-bottom: 15px;
&.active {
    font-weight: 700;
    &:before {
    content: '';
    position: absolute;
    left: 3px;
    right: 3px;
    bottom: 0;
    height: 4px;
    background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
    }
}
}
`
const TopSwapBody = styled.div`
position: relative;
margin-bottom: 0;
.exchange {
cursor: pointer;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}
${({ theme }) => theme.mediaQueries.sm}{
margin-bottom: 30px;
};
`
const TopInput = styled.div`
margin-bottom: 15px;
border-radius: 4px;
background: #121212;
padding: 10px 20px;
height: 105px;
.tip {
font-size: 12px;
font-weight: 600;
opacity: 0.4;
}
.input_row {
    margin-top: 10px;
    display: flex;
    align-items: center;
    input, input[disabled] {
        flex: 1;
        width: 100%;
        color: #FFF;
        background: none;
        border: none;
        border-color: transparent;
        font-size: 21px;
        font-weight: 600;
    }
    .input_right {
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 18px;
        .max {
            color: #76EBA7;
            font-size: 18px;
            font-weight: 600;
            background: transparent;
        }
        .balance {
            position: absolute;
            width: max-content;
            right: 0;
            top: 100%;
            opacity: 0.3;
            font-size: 14px;
        }
    }
}
${({ theme }) => theme.mediaQueries.sm}{
height: 136px;
.tip {
font-size: 14px;
}
.input_row {
    input, input[disabled] {
        font-size: 42px;
    }
}
};
`
const Time = styled.div`
display: flex;
align-items: center;
gap: 9px;
& > span {
font-size: 16px;
opacity: 0.3;
}
${({ theme }) => theme.mediaQueries.sm}{
& > span {
font-size: 24px;
}
};
`
const TimeItem = styled.div`
position: relative;
width: 44px;
height: 44px;
text-align: center;
line-height: 44px;
background: #252525;
font-size: 28px;
font-weight: 600;
${({ theme }) => theme.mediaQueries.sm}{
width: 57px;
height: 57px;
line-height: 57px;
font-size: 24px;
font-weight: 700;
};
`
const Content = styled.div`
position: relative;
margin-top: 25px;
padding: 0 10px;
box-sizing: content-box;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 0;
padding: 55px 60px;
display: flex;
gap: 46px;
min-height: 706px;
};
`
const Introduce = styled.div`
display: flex;
flex-direction: column;
align-items: stretch;
background: #1C1A22;
border-radius: 8px;
gap: 38px;
padding: 28px 18px;
margin-top: 14px;
margin-bottom: 15px;
.title {
color: #CE67FF;
font-size: 18px;
font-weight: 500;
margin-bottom: 26px;
}
.desc {
font-size: 14px;
opacity: 0.6;
line-height: 18px;
}
.tip {
padding-left: 0;
margin-bottom: 16px;
display: flex;
align-items: center;
gap: 12px;
font-size: 14px;
font-weight: 700;
line-height: 18px;
background: linear-gradient(258deg, #75F6A3 5.58%, #FEAD1D 88.85%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
img {
width: 14px;
height: 14px;
}
}
${({ theme }) => theme.mediaQueries.sm}{
background: transparent;
border-radius: 0;
padding: 0 60px;
margin-top: 0;
margin-bottom: 42px;
gap: 44px;
.title {
font-size: 38px;
margin-bottom: 36px;
}
.desc {
font-size: 21px;
line-height: 32px;
}
.tip {
padding-left: 20px;
margin-bottom: 28px;
font-size: 21px;
line-height: 32px;
img {
width: 24px;
height: 24px;
}
}
};
`
const IntroduceContent = styled.div`
border-radius: 18px;
background: #1C1A22;
display: flex;
gap: 109px;
padding: 74px 90px;
`
const IntroduceStartContent = styled.div`
border-radius: 18px;
background: #1C1A22;
display: flex;
padding: 45px 40px 30px;
`
const IntroduceTipContent = styled.ul`
list-style-type: none;
color: rgba(255,255,255,0.6);
`
const IntroduceTipRow = styled.li`
margin-bottom: 10px;
font-size: 14px;
line-height: 21px;
position: relative;
padding-left: 10px;
&:before {
    content: '';
    position: absolute;
    left: -5px;
    top: 8px;
    width: 4px;
    height: 4px;
    background-color: rgba(255,255,255,0.6);
    border-radius: 50%;
}
&:last-child {
&:before {
    content: none;
}
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 21px;
line-height: 30px;
&:before {
    top: 12px;
}
};
`
const Right = styled.div`
flex-shrink: 0;
width: unset;
border-radius: 8px;
border: 2px solid #2B292E;
padding: 18px;
.header {
display: flex;
align-items: center;
gap: 5px;
font-size: 16px;
font-weight: 600;
line-height: 18px;
img {
width: 16px;
height: 16px;
}
}
${({ theme }) => theme.mediaQueries.sm}{
width: 475px;
border-radius: 18px;
padding: 35px 30px;
.header {
gap: 10px;
font-size: 32px;
line-height: 32px;
img {
width: 30px;
height: 30px;
}
}
};
`
const RightContent = styled.div`
margin-top: 20px;
padding: 0 4px;
display: flex;
flex-direction: column;
gap: 15px;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 35px;
padding: 0 12px;
gap: 20px;
};
`
const RightRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
p {
    &:nth-child(1) {
        font-size: 13px;
        font-weight: 500;
        opacity: 0.5;
    }
    &:nth-child(2) {
        font-size: 15px;
        font-weight: 500;
    }
}
${({ theme }) => theme.mediaQueries.sm}{
p {
    &:nth-child(1) {
        font-size: 16px;
    }
    &:nth-child(2) {
        font-size: 21px;
        font-weight: 700;
    }
}
};
`
const RightData = styled.div`
.subTitle {
margin-top: 22px;
font-size: 15px;
font-weight: 600;
line-height: 20px;
}
.subDesc {
margin: 12px 0 0;
font-size: 12px;
font-weight: 500;
opacity: 0.5;
}
${({ theme }) => theme.mediaQueries.sm}{
.subTitle {
margin-top: 46px;
font-size: 24px;
font-weight: 600;
line-height: 32px;
}
.subDesc {
margin: 15px 8px 0;
font-size: 16px;
}
};
`
const LeftInvest = styled.div`
flex: 1;
padding: 18px 18px 5px;
border-radius: 8px;
border: 2px solid #2B292E;
.header {
display: flex;
gap: 6px;
align-items: center;
font-size: 16px;
font-weight: 600;
line-height: 18px;
img {
width: 16px;
height: 16px;
}
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 35px 30px 0;
border-radius: 18px;
.header {
gap: 12px;
font-size: 32px;
img {
width: 30px;
height: 30px;
}
}
};
`
const LeftInvestTableHeader = styled.div`
margin-top: 15px;
height: 30px;
border-radius: 4px;
background: rgba(255,255,255,0.1);
display: flex;
align-items: center;
padding: 0 16px;
span {
text-align: left;
flex: 2 0 0;
font-size: 12px;
font-weight: 500;
line-height: 18px;
opacity: 0.6;
&:nth-child(2) {
flex: 2 0 0;
}
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 34px;
height: 50px;
border-radius: 8px;
padding: 0 20px;
span {
font-size: 16px;
font-weight: 600;
line-height: 32px;
&:nth-child(2) {
flex: 1 0 0;
}
}
};
`
const LeftInvestTableContent = styled.div`
min-height: 425px;
height: auto;
margin-top: 4px;
max-height: 80vh;
overflow-y: auto;
${({ theme }) => theme.mediaQueries.sm}{
min-height: 488px;
};
`
const LeftInvestTableRow = styled.div`
margin-top: 2px;
border-bottom: 1px solid rgba(255,255,255,0.2);
display: flex;
align-items: center;
padding: 6px 16px;
p {
text-align: left;
word-break: break-all;
flex: 2 0 0;
font-size: 12px;
font-weight: 600;
&:nth-child(2) {
flex: 2 0 0;
}
&.buy {
color: #10CB81;
}
&.sell {
color: #F6465D;
}
span {
color: #FFF;
opacity: 0.3;
}
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 4px;
padding: 16px 20px;
p {
font-size: 16px;
&:nth-child(2) {
flex: 1 0 0;
}
}
};
`
const SureBtn = styled.button`
margin-top: 0;
font-size: 15px;
font-weight: 600;
width: 100%;
height: 40px;
border-radius: 20px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 22px;
font-size: 18px;
height: 53px;
border-radius: 32px;
};
`
const rotate = keyframes`
from {
transform: rotate(0deg);
}
to {
transform: rotate(360deg);
}
`;
const LoadImg = styled.img`
width: 20px;
height: 20px;
animation: ${rotate} 2s linear infinite;
${({ theme }) => theme.mediaQueries.sm}{
width: 30px;
height: 30px;
}
`
const Evaluate = styled.div`
padding: 35px 62px 80px 157px;
position: relative;
background: #19171F;
.bg {
width: 100%;
position: absolute;
left: 0;
bottom: 0;
}
`
const EvaluateContent = styled.div`
position: relative;
display: flex;
gap: 30px;
justify-content: space-between;
.title {
margin-top: 70px;
width: 360px;
font-size: 42px;
font-weight: 600;
line-height: 60px;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
`
const EvaluateContentBody = styled.div`
display: flex;
gap: 32px;
.left1 {
margin-top: 76px;
flex: 1 0 0;
display: flex;
flex-direction: column;
gap: 38px;
}
.left2 {
flex: 1 0 0;
display: flex;
flex-direction: column;
gap: 38px;
}
.right {
width: 10px;
display: flex;
flex-direction: column;
justify-content: center;
gap: 15px;
span {
cursor: pointer;
width: 10px;
height: 10px;
border-radius: 50%;
background: rgba(255, 255, 255, 0.4);
&.active {
background: #FFF;
}
}
}
.item {
padding: 28px 25px;
min-width: 300px;
max-width: 390px;
border-radius: 8px;
background: #090909;
.header {
display: flex;
gap: 18px;
align-items: center;
font-size: 24px;
font-weight: 600;
line-height: 28px;
img {
width: 44px;
height: 44px;
}
}
.content {
margin-top: 28px;
font-size: 18px;
font-weight: 400;
line-height: 28px;
opacity: 0.8;
}
}
`
const FAQ = styled.div`
padding: 80px 140px 104px;
.title {
font-size: 38px;
font-weight: 600;
line-height: 60px;
text-transform: uppercase;
margin-bottom: 30px;
}
.item {
cursor: pointer;
margin-top: 20px;
height: 65px;
border-radius: 8px;
border: 2px solid #2B292E;
font-size: 21px;
font-weight: 500;
line-height: 65px;
position: relative;
padding-left: 38px;
&:before {
    content: '';
    position: absolute;
    left: 20px;
    top: 30px;
    width: 4px;
    height: 4px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
}
`
