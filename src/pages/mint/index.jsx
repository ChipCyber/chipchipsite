import React, { useEffect, useState, useRef, useMemo } from 'react'
import ReactECharts from 'echarts-for-react';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useHistory } from 'react-router-dom';
import useBreakpointCheck from "@/hooks/useBreakpointCheck";
import { knowledgePageListApi } from "@/api";
import { useLanguage } from "@/LanguageContext";

import { WalletType } from "@/wallet";

const getChart = () => {
    const chartRef = useRef(null);
    const [data, setData] = useState([]);
    useEffect(()=>{
        const initData = [];
        for (let index = 0; index < 100; index++) {
            initData.push([(new Date().getTime()) - ((100-index-1) * 1000), Math.random() * 50 + 10]);
        }
        setData(initData);
        const timer = setInterval(() => {
            setData((prevData) => {
                const newData = [...prevData];
                newData.shift();
                newData.push([(new Date().getTime()), Math.random() * 50 + 10]);
                return newData;
            });
        }, 1000);
        return () => {
            clearInterval(timer);
        }
        // const ws = new WebSocket('wss://your-websocket-server-url');
        // ws.onopen = () => {
        //     console.log('WebSocket connection established');
        // };
        // ws.onmessage = (message) => {
        //     console.log('message :>> ', message);
        //     const newValue = JSON.parse(message.data);
        //     setData((prevData) => {
        //         const newData = [...prevData];
        //         newData.shift();
        //         newData.push([new Date().getTime(), newValue.value]);
        //         return newData;
        //     });
        // };
        // ws.onerror = (error) => {
        //     console.error('WebSocket error:', error);
        // };
        // ws.onclose = () => {
        //     console.log('WebSocket connection closed');
        // };
        // return () => {
        //     ws.close();
        // };
    },[]);
    const staticOptions = useMemo(() => ({
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                // 确保params[0]存在并且有效
                if (!params || !params[0]) return '';
                const param = params[0];
                const date = new Date(param.value[0]);
                return (`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} : ${(param.value[1] * 100).toFixed(2)}%`);
            },
            axisPointer: {
                animation: false,
            },
        },
        xAxis: {
            type: 'time',
            axisLine: {
                interval: "auto",
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
                color: 'rgb(130,130,130,0.3)',
                formatter: function (value) {
                    var date = new Date(value);
                    // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                    // return `${date.getMonth() + 1}/${date.getDate()}`;
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    const seconds = date.getSeconds().toString().padStart(2, '0');
                    return `${hours}:${minutes}:${seconds}`;
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
                formatter: function (value) {
                    return (value * 100).toFixed(2) + '%';
                },
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
            right: '80px',
            top: '10%',
            bottom: '50px'
        }
    }), [data]);
    return <ReactECharts option={staticOptions} style={{ height: '100%', width: '100%' }} ref={chartRef}/>;
};

export default function Index() {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const shouldRender = useBreakpointCheck();
    const currentWalletBalance = useSelector((state) => state.user?.currentWalletBalance);
    const [exchange, setExchange] = useState(false);
    const [count, setCount] = useState('');
    const [openInvestRecord, setOpenInvestRecord] = useState(false);
    const [openReceiveRecord, setOpenReceiveRecord] = useState(false);
    const [openWhitelistResult, setOpenWhitelistResult] = useState(false);
    const [menuIndex, setMenuIndex] = useState(0);
    const [faqList, setFaqList] = useState([]);
    const history = useHistory();
    useEffect(() => {
        knowledgePageListApi({pageIndex:1,pageSize:5,knowledgeType:3}).then(({data})=>{
            setFaqList(data);
        });
    }, [language]);
    const handleChange = (event) => {
        const newValue = event.target.value;
        setCount(newValue);
    };
    const renderW = () => (
        <>
        <Top>
            <TopContent>
                <TopLeft>
                    <div className='row'>
                        <img width={50} height={50} src={require("@/assets/mint/chip.png").default} alt='icon'/>
                        <div className='row_tip'>
                            <span className='row_tip_t1'>CHIP</span>
                            <span className='row_tip_t2'>CHIPCHIP</span>
                            <span className='row_tip_t3'>投资属于玩家的poker 平台</span>
                        </div>
                    </div>
                    <div className='info'>
                        <TopLeftPrice>
                            <p>$ 0.01</p>
                            <p>+10.01%</p>
                        </TopLeftPrice>
                        <TopLeftInfo>
                            <div>
                                <p>Volume (24h)</p>
                                <p>$--</p>
                            </div>
                            <div>
                                <p>Market Cap</p>
                                <p>$--</p>
                            </div>
                            <div>
                                <p>Total Supply</p>
                                <p>$--</p>
                            </div>
                            <div>
                                <p>Holder</p>
                                <p>$--</p>
                            </div>
                        </TopLeftInfo>
                    </div>
                    <TopChart>
                        <TopChartBtn>
                            <button>1H</button>
                            <button>6H</button>
                            <button>1D</button>
                            <button>1W</button>
                            <button>1M</button>
                            <button className='selected'>ALL</button>
                        </TopChartBtn>
                        <TopChartBody>{getChart()}</TopChartBody>
                    </TopChart>
                    {/* <TopChartNoData>
                        <div className='bg'></div>
                        <div className='start'>
                            <p>距离交易开始剩余</p>
                            <p>即将开始倒计时</p>
                            <Time>
                                <TimeItem>--</TimeItem>
                                <span>:</span>
                                <TimeItem>--</TimeItem>
                                <span>:</span>
                                <TimeItem>--</TimeItem>
                                <span>:</span>
                                <TimeItem>--</TimeItem>
                            </Time>
                            <p>2024-11-29 20:00:00(GMT+8)</p>
                        </div>
                    </TopChartNoData> */}
                </TopLeft>
                <TopRight>
                    <TopMenu>
                        <div onClick={()=>setExchange(false)} className={exchange==false?'active':''}>Buy</div>
                        <div onClick={()=>setExchange(true)} className={exchange?'active':''}>Sell</div>
                    </TopMenu>
                    <TopSwapBody>
                        <TopInput>
                            <p className='tip'>From</p>
                            <div className='input_row'>
                                <input type='number' min={1} value={count} onChange={handleChange} placeholder='0.00'/>
                                <div className='input_right'>
                                    <button className='max' onClick={()=>setCount(currentWalletBalance)}>MAX</button>
                                    <img width={28} height={28} src={exchange?require("@/assets/mint/chip.png").default:require("@/assets/mint/sol.png").default} alt='icon'/>
                                    <span>{exchange?'CHIP':'SOL'}</span>
                                    <p className='balance'>Balance：{currentWalletBalance ?? '--'}</p>
                                </div>
                            </div>
                        </TopInput>
                        <img onClick={()=>setExchange(!exchange)} className='exchange' width={52} height={52} src={require("@/assets/mint/exchange.png").default} alt='exchange'/>
                        <TopInput>
                            <p className='tip'>To</p>
                            <div className='input_row'>
                                <input type='number' disabled placeholder='0.00'/>
                                <div className='input_right'>
                                    <img width={28} height={28} src={exchange?require("@/assets/mint/sol.png").default:require("@/assets/mint/chip.png").default} alt='icon'/>
                                    <span>{exchange?'SOL':'CHIP'}</span>
                                </div>
                            </div>
                        </TopInput>
                    </TopSwapBody>
                    <SureBtn disabled>{exchange?'Sell':'Buy'}</SureBtn>
                </TopRight>
            </TopContent>
        </Top>
        <img style={{width:'100%'}} src={require('../../assets/home/logo_row.png').default}/>
        <Content>
            <LeftInvest>
                <div className='header'>
                    <img src={require('../../assets/ido/invest.png').default}/>
                    <span>Transaction</span>
                </div>
                <LeftInvestTableHeader>
                    <span>Time</span>
                    <span>Type</span>
                    <span>Price</span>
                    <span>From</span>
                    <span>To</span>
                </LeftInvestTableHeader>
                <LeftInvestTableContent>
                    <LeftInvestTableRow>
                        <p>1 m ago</p>
                        <p className='buy'>Buy</p>
                        <p>$0.01</p>
                        <p>10 SOL</p>
                        <p>1,000 CHIP</p>
                    </LeftInvestTableRow>
                    <LeftInvestTableRow>
                        <p>1 m ago</p>
                        <p className='sell'>Sell</p>
                        <p>$0.01</p>
                        <p>10 SOL</p>
                        <p>1,000 CHIP</p>
                    </LeftInvestTableRow>
                    {/* {renderNoData()} */}
                </LeftInvestTableContent>
            </LeftInvest>
            <Right>
                <div className='header'>
                    <img src={require('../../assets/ido/info.png').default}/>
                    <span>Info</span>
                </div>
                <RightContent>
                    <RightRow>
                        <p>Market Cap：</p>
                        <p>--</p>
                    </RightRow>
                    <RightRow>
                        <p>Total Supply：</p>
                        <p>10 B</p>
                    </RightRow>
                    <RightRow>
                        <p>Issue Price：</p>
                        <p>--</p>
                    </RightRow>
                    <RightRow>
                        <p>Holder：</p>
                        <p>--</p>
                    </RightRow>
                    <RightRow>
                        <p>Chain：</p>
                        <p>Solana</p>
                    </RightRow>
                </RightContent>
                <RightData>
                    <p className='subTitle'>Introduction</p>
                    <p className='subDesc'>$CHIP 代币价格直接代表了社区的共识高度，$CHIP 将采取公平发射的方式，所有人包括发起团队都没有免费的筹码。联合曲线是一个伟大的发明，所有人都可以在自己价值预期拿到筹码，让我们一起引领 Gamble Game、GambleFi、Gamble Chain 的到来。No Gamble No Future！拥有 $CHIP，成为一个 100 亿美金市值项目的掌门人。</p>
                </RightData>
            </Right>
        </Content>
        <Introduce>
            <IntroduceContent>
                <div>
                    <p className='title'>CHIPCHIP 为什么要做公平发射？</p>
                    <p className='desc'>作为CHIPCHIP的发起团队，我们需要建立一个基础的社区金库来保证早期项目开发工作的进展，伴随CHIP代币的发行，我们将会朝着去中心化治理的方向持续努力，完全去中心化的随机数方案、通用的游戏发行激励方案、去中心化资金托管合约、去中心化的分红方案、去中心化的发展治理，需要有一个相对中心化的团队进行发起再逐步去中心化，我们将会建立一个全球化且受社区监管的开发团队，来实现玩家们的伟大愿景。我们发起团队耗费了 18 个月时间，花费了数百万资金，这根本不重要，有了社区，我们就可以做一切的事！</p>
                </div>
                <img width={396} height={392} src={require("@/assets/mint/icon1.png").default} alt='icon'/>
            </IntroduceContent>
            <IntroduceStartContent>
                <img width={517} height={387} src={require("@/assets/mint/icon2.png").default} alt='icon'/>
                <div>
                    <p className='title'>为什么要投资CHIPCHIP？</p>
                    <div className='tip'>
                        <img src={require('../../assets/ido/star.png').default}/>
                        <span>{t('313')}：</span>
                    </div>
                    <p className='desc'></p>
                    <IntroduceTipContent>
                        <IntroduceTipRow>多链链游，web2、web3用户均可使用，具备百万级用户体量的潜力。</IntroduceTipRow>
                        <IntroduceTipRow>棋牌赛道，天花板高，教育门槛低，打牌组局自带裂变属性，用户获取成本低，但盈利能力巨大。</IntroduceTipRow>
                        <IntroduceTipRow>堪比Web2级别的丝滑体验，娱乐竞技属性兼顾，出圈效应拉满。</IntroduceTipRow>
                        <IntroduceTipRow>团队在Poker领域和Web3领域有成功创业经历。</IntroduceTipRow>
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
                    <span className='row_tip_t1'>CHIP</span>
                    <span className='row_tip_t2'>CHIPCHIP</span>
                </div>
            </div>
            <p className='row_tip_t3'>投资属于玩家的poker 平台</p>
            <TopLeftPrice>
                <p>$ 0.01</p>
                <p>+10.01%</p>
            </TopLeftPrice>
            <TopChart>
                <TopChartBtn>
                    <button>1H</button>
                    <button>6H</button>
                    <button>1D</button>
                    <button>1W</button>
                    <button>1M</button>
                    <button className='selected'>ALL</button>
                </TopChartBtn>
                <TopChartBody>{getChart()}</TopChartBody>
            </TopChart>
            {/* <TopChartNoData>
                <div className='bg'></div>
                <div className='start'>
                    <p>距离交易开始剩余</p>
                    <p>即将开始倒计时</p>
                    <Time>
                        <TimeItem>--</TimeItem>
                        <span>:</span>
                        <TimeItem>--</TimeItem>
                        <span>:</span>
                        <TimeItem>--</TimeItem>
                        <span>:</span>
                        <TimeItem>--</TimeItem>
                    </Time>
                    <p>2024-11-29 20:00:00(GMT+8)</p>
                </div>
            </TopChartNoData> */}
            <TopLeftInfo>
                <div>
                    <p>Volume (24h)</p>
                    <p>$--</p>
                </div>
                <div>
                    <p>Market Cap</p>
                    <p>$--</p>
                </div>
                <div>
                    <p>Total Supply</p>
                    <p>$--</p>
                </div>
                <div>
                    <p>Holder</p>
                    <p>$--</p>
                </div>
            </TopLeftInfo>
            <TopRight>
                <TopMenu>
                    <div onClick={()=>setExchange(false)} className={exchange==false?'active':''}>Buy</div>
                    <div onClick={()=>setExchange(true)} className={exchange?'active':''}>Sell</div>
                </TopMenu>
                <TopSwapBody>
                    <TopInput>
                        <p className='tip'>From</p>
                        <div className='input_row'>
                            <input type='number' min={1} value={count} onChange={handleChange} placeholder='0.00'/>
                            <div className='input_right'>
                                <button className='max'>MAX</button>
                                <img width={28} height={28} src={exchange?require("@/assets/mint/chip.png").default:require("@/assets/mint/sol.png").default} alt='icon'/>
                                <span>{exchange?'CHIP':'SOL'}</span>
                                <p className='balance'>Balance：--</p>
                            </div>
                        </div>
                    </TopInput>
                    <img onClick={()=>setExchange(!exchange)} className='exchange' width={45} height={45} src={require("@/assets/mint/exchange.png").default} alt='exchange'/>
                    <TopInput>
                        <p className='tip'>To</p>
                        <div className='input_row'>
                            <input type='number' disabled placeholder='0.00'/>
                            <div className='input_right'>
                                <img width={28} height={28} src={exchange?require("@/assets/mint/sol.png").default:require("@/assets/mint/chip.png").default} alt='icon'/>
                                <span>{exchange?'SOL':'CHIP'}</span>
                            </div>
                        </div>
                    </TopInput>
                </TopSwapBody>
                <SureBtn disabled>{exchange?'Sell':'Buy'}</SureBtn>
            </TopRight>
        </TopH5>
        <Content>
            <MenuH5>
                <div onClick={()=>setMenuIndex(0)} className={menuIndex==0?'active':''}>{t('181')}</div>
                <div onClick={()=>setMenuIndex(1)} className={menuIndex==1?'active':''}>交易记录</div>
            </MenuH5>
            {menuIndex==0&&renderAboutM()}
            {menuIndex==1&&renderRecordM()}
            <Introduce>
                <div>
                    <p className='title'>CHIPCHIP 为什么要做公平发射？</p>
                    <p className='desc'>作为CHIPCHIP的发起团队，我们需要建立一个基础的社区金库来保证早期项目开发工作的进展，伴随CHIP代币的发行，我们将会朝着去中心化治理的方向持续努力，完全去中心化的随机数方案、通用的游戏发行激励方案、去中心化资金托管合约、去中心化的分红方案、去中心化的发展治理，需要有一个相对中心化的团队进行发起再逐步去中心化，我们将会建立一个全球化且受社区监管的开发团队，来实现玩家们的伟大愿景。我们发起团队耗费了 18 个月时间，花费了数百万资金，这根本不重要，有了社区，我们就可以做一切的事！</p>
                </div>
                <div>
                    <p className='title'>为什么要投资CHIPCHIP？</p>
                    <div className='tip'>
                        <img src={require('../../assets/ido/star.png').default}/>
                        <span>{t('313')}：</span>
                    </div>
                    <p className='desc'></p>
                    <IntroduceTipContent>
                        <IntroduceTipRow>多链链游，web2、web3用户均可使用，具备百万级用户体量的潜力。</IntroduceTipRow>
                        <IntroduceTipRow>棋牌赛道，天花板高，教育门槛低，打牌组局自带裂变属性，用户获取成本低，但盈利能力巨大。</IntroduceTipRow>
                        <IntroduceTipRow>堪比Web2级别的丝滑体验，娱乐竞技属性兼顾，出圈效应拉满。</IntroduceTipRow>
                        <IntroduceTipRow>团队在Poker领域和Web3领域有成功创业经历。</IntroduceTipRow>
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
                <span>Transaction</span>
            </div>
            <LeftInvestTableHeader>
                <span>Type/Time</span>
                <span>Price</span>
                <span>From</span>
                <span>To</span>
            </LeftInvestTableHeader>
            <LeftInvestTableContent>
                <LeftInvestTableRow>
                    <p className='buy'>Buy<br/><span>1 m ago</span></p>
                    <p>$0.01</p>
                    <p>10 SOL</p>
                    <p>1,000 CHIP</p>
                </LeftInvestTableRow>
                <LeftInvestTableRow>
                    <p className='sell'>Sell<br/><span>1 m ago</span></p>
                    <p>$0.01</p>
                    <p>10 SOL</p>
                    <p>1,000 CHIP</p>
                </LeftInvestTableRow>
                {/* {renderNoData()} */}
            </LeftInvestTableContent>
        </LeftInvest>
    )
    const renderAboutM = () => (
        <Right>
            <div className='header'>
                <img src={require('../../assets/ido/info.png').default}/>
                <span>Info</span>
            </div>
            <RightContent>
                <RightRow>
                    <p>Market Cap：</p>
                    <p>--</p>
                </RightRow>
                <RightRow>
                    <p>Total Supply：</p>
                    <p>10 B</p>
                </RightRow>
                <RightRow>
                    <p>Issue Price：</p>
                    <p>--</p>
                </RightRow>
                <RightRow>
                    <p>Holder：</p>
                    <p>--</p>
                </RightRow>
                <RightRow>
                    <p>Chain：</p>
                    <p>Solana</p>
                </RightRow>
            </RightContent>
            <RightData>
                <p className='subTitle'>Introduction</p>
                <p className='subDesc'>$CHIP 代币价格直接代表了社区的共识高度，$CHIP 将采取公平发射的方式，所有人包括发起团队都没有免费的筹码。联合曲线是一个伟大的发明，所有人都可以在自己价值预期拿到筹码，让我们一起引领 Gamble Game、GambleFi、Gamble Chain 的到来。No Gamble No Future！拥有 $CHIP，成为一个 100 亿美金市值项目的掌门人。</p>
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
            <DialogOverlay
                style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                isOpen={openInvestRecord}
                onDismiss={()=>setOpenInvestRecord(false)}
            >
                <DialogRecordContent aria-label='list'>
                    <ModalHeader>
                        <div className='title'>{t('322')}</div>
                        <img className='close' onClick={()=>setOpenInvestRecord(false)} src={require('../../assets/nav/close.png').default}/>
                    </ModalHeader>
                    <ModalTableHeader>
                        <span>{t('610')}</span>
                        <span>{t('307')}</span>
                        <span>{t('374')}</span>
                    </ModalTableHeader>
                    <ModalTableContent>
                        {renderNoData()}
                        {/* <ModalTableRow>
                            <span>2024/05/01 12:12:12</span>
                            <span>$0.01</span>
                            <span>10,000 USDT</span>
                        </ModalTableRow>
                        <ModalTableRow>
                            <span>2024/05/01 12:12:12</span>
                            <span>$10,000</span>
                            <span>10,000 USDC</span>
                        </ModalTableRow> */}
                    </ModalTableContent>
                </DialogRecordContent>
            </DialogOverlay>
            <DialogOverlay
                style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                isOpen={openReceiveRecord}
                onDismiss={()=>setOpenReceiveRecord(false)}
            >
                <DialogRecordContent>
                    <ModalHeader>
                        <div className='title'>{t('327')}</div>
                        <img className='close' onClick={()=>setOpenReceiveRecord(false)} src={require('../../assets/nav/close.png').default}/>
                    </ModalHeader>
                    <ModalTableHeader>
                        <span>{t('610')}</span>
                        <span>{t('605')}</span>
                    </ModalTableHeader>
                    <ModalTableContent>
                        {renderNoData()}
                        {/* <ModalTableRow>
                            <span>2024/05/01 12:12:12</span>
                            <span>100,000 CHIP</span>
                        </ModalTableRow>
                        <ModalTableRow>
                            <span>2024/05/01 12:12:12</span>
                            <span>100,000 CHIP</span>
                        </ModalTableRow> */}
                    </ModalTableContent>
                </DialogRecordContent>
            </DialogOverlay>
            <DialogOverlay
                style={{ height: '100vh', zIndex: 99, background: 'hsla(0, 0%, 0%, 0.6)' }}
                isOpen={openWhitelistResult}
                onDismiss={()=>setOpenWhitelistResult(false)}
            >
                <DialogRecordContent>
                    <ModalHeader>
                        <div className='title'>{t('335')}</div>
                        <img className='close' onClick={()=>setOpenWhitelistResult(false)} src={require('../../assets/nav/close.png').default}/>
                    </ModalHeader>
                    <WhitelistContent>
                        <img src={true?require('../../assets/ido/whitelist.png').default:require('../../assets/ido/whitelist_no.png').default}/>
                        <div className='title'>{true?t('337'):t('338')}</div>
                        <div className='card'>
                            <span>{t('336')}</span>
                            <span>0xdrgpejg03480je0gjr0egj0jg0gjhj0hjh</span>
                        </div>
                        <button className='close' type='button' onClick={()=>setOpenWhitelistResult(false)}>{t('339')}</button>
                    </WhitelistContent>
                </DialogRecordContent>
            </DialogOverlay>
        </Root>
    )
}

const NoData = styled.div`
height: 100%;
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
height: 706px;
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
padding: 35px 30px 0;
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
flex: 1;
font-size: 12px;
font-weight: 500;
line-height: 18px;
opacity: 0.6;
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
}
};
`
const LeftInvestTableContent = styled.div`
height: 425px;
margin-top: 4px;
max-height: 80vh;
overflow-y: auto;
padding-left: 8px;
padding-right: 8px;
${({ theme }) => theme.mediaQueries.sm}{
padding: 0;
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
flex: 1;
font-size: 12px;
font-weight: 600;
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
const RightAbout = styled.div`
padding: 17px 24px 0;
margin-top: 0;
border-radius: 8px;
border: 2px solid #2B292E;
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
.subTitle {
margin-top: 22px;
font-size: 14px;
font-weight: 600;
line-height: 20px;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 44px 36px 0;
margin-top: 32px;
border-radius: 18px;
.header {
gap: 10px;
font-size: 32px;
line-height: 32px;
img {
width: 30px;
height: 30px;
}
}
.subTitle {
margin-top: 62px;
margin-left: 24px;
font-size: 24px;
font-weight: 600;
line-height: 32px;
}
};
`
const RightAboutInfo = styled.div`
.content {
padding-left: 3px;
margin-top: 25px;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
row-gap: 20px;
> div {
width: 50%;
}
.value {
color: #A289FA;
font-size: 18px;
font-weight: 500;
dispaly: flex;
align-items: center;
img {
width: 20px;
height: 20px;
}
}
.value_desc {
margin-top: 8px;
font-size: 13px;
font-weight: 500;
opacity: 0.6;
}
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 30px;
flex-wrap: unset;
.content {
padding-left: 24px;
}
> div {
width: unset;
}
.value {
font-size: 24px;
img {
width: 30px;
height: 30px;
}
}
.value_desc {
font-size: 16px;
}
};
`
const RightAboutDistribute = styled.div`
.content {
margin-top: 20px;
.row {
display: flex;
align-items: stretch;
padding: 0 20px 0 14px;
border-bottom: 1px solid #3A373F;
&:first-child {
border-top: 2px solid #3A373F;
border-bottom: 1px solid #3A373F;
}
.left {
flex: 1;
font-size: 12px;
font-weight: 500;
padding: 10px 0;
}
.right {
width: 58px;
border-left: 1px solid #3A373F;
text-align: right;
font-size: 14px;
font-weight: 700;
display: flex;
align-items: center;
justify-content: flex-end;
}
}
}
${({ theme }) => theme.mediaQueries.sm}{
.content {
margin-top: 36px;
.row {
padding: 0 44px;
.left {
font-size: 16px;
padding: 16px 0;
}
.right {
width: 106px;
font-size: 24px;
}
}
}
};
`
const RightAboutUse = styled.div`

`
const RightAboutUseTip = styled.ul`
margin-top: 22px;
list-style-type: none;
color: rgba(255,255,255,0.6);
padding-left: 44px;
${({ theme }) => theme.mediaQueries.sm}{
padding-left: 24px;
};
`
const RightAboutUseTipRow = styled.li`
margin-top: 10px;
font-size: 14px;
font-weight: 500;
line-height: 25px;
position: relative;
padding-left: 25px;
&:before {
    content: '';
    position: absolute;
    left: 8px;
    top: 10px;
    width: 5px;
    height: 5px;
    background-color: rgba(255,255,255,0.6);
    border-radius: 50%;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
line-height: 32px;
&:before {
    top: 14px;
}
};
`
const Chart = styled.div`
width: 100%;
aspect-ratio: 1;
`
const DialogRecordContent = styled(DialogContent)`
width: calc(100% - 50px);
margin: 15vh auto 0;
padding: 16px 25px 56px;
border-radius: 12px;
background: #362F42;
${({ theme }) => theme.mediaQueries.sm}{
    width: 600px;
    padding: 26px 40px 46px;
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
const ModalTableHeader = styled.div`
border-radius: 8px;
background: rgba(255, 255, 255, 0.1);
padding-left: 32px;
padding-right: 35px;
height: 50px;
display: flex;
align-items: center;
font-size: 16px;
font-weight: 600;
span {
flex: 1;
opacity: 0.6;
&:first-child {
flex: 2;
}
&:last-child {
text-align: right;
}
}
${({ theme }) => theme.mediaQueries.sm}{
padding-left: 32px;
padding-right: 35px;
height: 50px;
font-size: 16px;
font-weight: 600;
line-height: 32px;
};
`
const ModalTableContent = styled.div`
margin-top: 4px;
max-height: 50vh;
min-height: 132px;
overflow-y: auto;
`
const ModalTableRow = styled.div`
display: flex;
align-items: center;
border-bottom: 1px solid #514664;
padding-left: 32px;
padding-right: 35px;
height: 66px;
font-size: 16px;
font-weight: 600;
span {
flex: 1;
word-break: break-all;
&:first-child {
flex: 2;
}
&:last-child {
text-align: right;
color: ${({theme})=>theme.colors.success};
}
}
`
const WhitelistContent = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0;
img {
width: 60px;
height: 60px;
}
.title {
margin-top: 25px;
font-size: 21px;
font-weight: 600;
line-height: 32px;
}
.card {
width: 100%;
margin-top: 14px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
gap: 6px;
font-size: 14px;
span {
&:first-child {
opacity: 0.4;
}
}
}
.close {
margin-top: 35px;
width: 100%;
font-size: 16px;
font-weight: 600;
height: 40px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 0 32px;
img {
width: 92px;
height: 92px;
}
.title {
margin-top: 10px;
}
.card {
flex-direction: row;
padding: 0 15px;
margin-top: 40px;
height: 55px;
border-radius: 4px;
background: rgba(18, 18, 18, 0.2);
}
.close {
margin-top: 40px;
height: 53px;
font-size: 18px;
}
}:
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
