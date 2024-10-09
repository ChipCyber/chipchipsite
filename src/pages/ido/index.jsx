import React, { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts';
import { useInView } from 'react-intersection-observer';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useHistory } from 'react-router-dom';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { knowledgePageListApi } from "../../api";
import { useLanguage } from "../../LanguageContext";
import { InitialPrice } from "../../constants";

const data = [
    { name: '35%', desc: '365', value: 35, color: '#2F1AA4' },
    { name: '10%', desc: '364', value: 10, color: '#A084FA' },
    { name: '20%', desc: '359', value: 20, color: '#FFD43B' },
    { name: '10%', desc: '362', value: 10, color: '#78E1AE' },
    { name: '15%', desc: '361', value: 15, color: '#5F8AF9' },
    { name: '10%', desc: '360', value: 10, color: '#FF74C6' },
];
const getOption = (t) => ({
    legend: {
        show: false
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        textStyle: {
            color: '#FFF',
        },
        position: function (point, params, dom, rect, size) {
            const [x, y] = point;
            const [viewWidth, viewHeight] = size.viewSize;
            const tooltipWidth = dom.offsetWidth;
            const tooltipHeight = dom.offsetHeight;
            const left = x - tooltipWidth / 2;
            const finalLeft = Math.max(0, Math.min(left, viewWidth - tooltipWidth));
            const top = y - tooltipHeight - 10;
            const finalTop = Math.max(0, Math.min(top, viewHeight - tooltipHeight));
            return [finalLeft, finalTop];
        },
        formatter: function(params) {
            const item = data.find(d => d.name === params.name);
            return `${item.name} ${t(item.desc)}`;
        },
    },
    series: {
        type: 'pie',
        radius: ['30%', '45%'],
        padAngle: 5,
        label: {
            alignTo: 'edge',
            formatter: function(params) {
                const item = data.find(d => d.desc === params.data.desc);
                // return `{name|${params.name}}\n{circle|●} {desc|${item.desc}}`;
                return `{name|${params.name}}\n{desc|${t(item.desc)}}`;
            },
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 22,
            rich: {
                name: {
                    fontSize: 12,
                    lineHeight: 25,
                },
                desc: {
                    fontSize: 10,
                    padding: [2, 0, 0, 0],
                },
                circle: {
                    fontSize: 10,
                    borderRadius: 5,
                }
            }
        },
        labelLine: {
            length: 15,
            length2: 0,
            maxSurfaceAngle: 80
        },
        labelLayout: function (params) {
            const isLeft = params.labelRect.x < 200 / 2;
            const points = params.labelLinePoints;
            // Update the end point.
            points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
            return {
                labelLinePoints: points
            };
        },
        data: data.map(item => ({
            value: item.value,
            name: item.name,
            desc: item.desc,
            itemStyle: { color: item.color },
            label: {
                rich: {
                    name: {
                        color: item.color,
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    desc: {
                        textAlign: 'left',
                        fontSize: 10,
                        color: '#FFF',
                    },
                    circle: {
                        backgroundColor: item.color
                    }
                }
            }
        }))
    },
});

export default function Index() {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const chartRef = useRef(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });
    const shouldRender = useBreakpointCheck();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedTokenIndex, setSelectedTokenIndex] = useState(-1);
    const [openInvestRecord, setOpenInvestRecord] = useState(false);
    const [openReceiveRecord, setOpenReceiveRecord] = useState(false);
    const [openWhitelistResult, setOpenWhitelistResult] = useState(false);
    const [menuIndex, setMenuIndex] = useState(0);
    const [faqList, setFaqList] = useState([]);
    const history = useHistory();
    useEffect(() => {
        let myChart = null;
        if(chartRef.current){
            myChart = echarts.init(chartRef.current);
            if (inView) {
                myChart&&myChart.setOption(getOption(t));
            }
        }
        return () => {
            myChart&&myChart.dispose();
        };
    }, [shouldRender, menuIndex, inView, language]);
    useEffect(() => {
        knowledgePageListApi({pageIndex:1,pageSize:5,knowledgeType:3}).then(({data})=>{
            setFaqList(data);
        });
    }, [language]);
    const renderW = () => (
        <>
        <Top>
            <img className='img' src={require('../../assets/ido/img1.png').default}/>
            <TopContent>
                <div className='title'>Initial DEX Offering</div>
                <div className='desc'>{t('300')}</div>
                {/* <div className='tip'>{t('301')}</div> */}
            </TopContent>
        </Top>
        <img style={{width:'100%'}} src={require('../../assets/home/logo_row.png').default}/>
        <Rule>
            <img className='icon' src={require('../../assets/ido/img2.png').default}/>
            <RuleContent>
                <div className='title'>{t('302')}</div>
                <RuleTip>
                    <RuleTipRow>{t('303')}</RuleTipRow>
                    {/* <RuleTipRow>{t('304')}</RuleTipRow> */}
                </RuleTip>
                <div className='subTitle'>{t('305')}</div>
                <Time>
                    <TimeItem>
                        <img src={require('../../assets/ido/time.png').default}/>
                        <span>--</span>
                    </TimeItem>
                    <span>{t('366')}</span>
                    <TimeItem>
                        <img src={require('../../assets/ido/time.png').default}/>
                        <span>--</span>
                    </TimeItem>
                    <span>{t('367')}</span>
                    <TimeItem>
                        <img src={require('../../assets/ido/time.png').default}/>
                        <span>--</span>
                    </TimeItem>
                    <span>{t('368')}</span>
                    <TimeItem>
                        <img src={require('../../assets/ido/time.png').default}/>
                        <span>--</span>
                    </TimeItem>
                    <span>{t('369')}</span>
                </Time>
            </RuleContent>
        </Rule>
        <Content>
            <Left>
                <LeftInvest>
                    <div className='header'>
                        <img src={require('../../assets/ido/invest.png').default}/>
                        <span>{t('306')}</span>
                    </div>
                    <LeftInvestTableHeader>
                        <span>{t('307')}</span>
                        <span>{t('308')}</span>
                        <span>TGE</span>
                        <span>{t('309')}</span>
                    </LeftInvestTableHeader>
                    <LeftInvestTableContent>
                        <LeftInvestTableRow status='-1'>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            {/* <div>{t('370')}</div> */}
                        </LeftInvestTableRow>
                        <LeftInvestTableRow status='0'>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            {/* <div>{t('371')}</div> */}
                        </LeftInvestTableRow>
                        <LeftInvestTableRow status='1'>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            {/* <div><span>{t('372')}</span></div> */}
                        </LeftInvestTableRow>
                    </LeftInvestTableContent>
                </LeftInvest>
                <LeftTip>
                    <div className='title'>{t('310')}</div>
                    <div className='desc'>{t('311')}</div>
                    <div className='title'>{t('312')}</div>
                    {/* <div className='tip'>
                        <img src={require('../../assets/ido/star.png').default}/>
                        <span>{t('313')}：</span>
                    </div> */}
                    <LeftTipContent>
                        <LeftTipRow>{t('314')}</LeftTipRow>
                        <LeftTipRow>{t('315')}</LeftTipRow>
                        <LeftTipRow>{t('316')}</LeftTipRow>
                        <LeftTipRow>{t('317')}</LeftTipRow>
                        <LeftTipRow>{t('3171')}</LeftTipRow>
                        <LeftTipRow>{t('3172')}</LeftTipRow>
                        <LeftTipRow>{t('3173')}</LeftTipRow>
                        <LeftTipRow>{t('3174')}</LeftTipRow>
                    </LeftTipContent>
                </LeftTip>
            </Left>
            <Right>
                <RightOperate>
                    <div className='header'>
                        <div className='left' onClick={()=>setSelectedIndex(0)}>
                            <span>{t('306')}</span>
                            <img src={selectedIndex==0?require('../../assets/ido/menu_left_selected.png').default:require('../../assets/ido/menu_left.png').default}/>
                        </div>
                        {/* <div className='right' onClick={()=>setSelectedIndex(1)}> */}
                        <div className='right disabled'>
                            <span>{t('323')}</span>
                            <img src={selectedIndex==1?require('../../assets/ido/menu_right_selected.png').default:require('../../assets/ido/menu_right.png').default}/>
                        </div>
                    </div>
                    {selectedIndex==0?<>
                    <RightOperateToken>
                        <img src={require('../../assets/ido/coin.png').default}/>
                        <div className='content'>
                            <div className='title'>$0</div>
                            <div className='desc'>{t('318')}</div>
                        </div>
                    </RightOperateToken>
                    <RightFundraising>
                        <div className='title'>{t('376')}</div>
                        <div className='row'>
                            <div>{t('377')} 0SOL</div>
                            <div>{t('378')} 0SOL</div>
                        </div>
                        <div className='line' style={{'--w':'0%'}}></div>
                    </RightFundraising>
                    <RightCard>
                        <div className='title'>{t('306')}</div>
                        <div className='input'>
                            <input type='number' placeholder='0'/>
                            <div>SOL</div>
                            {/* <button type='button'>
                                <div>{t('319')} <img src={require('../../assets/arrow_down.png').default}/></div>
                                <div className='choose'>
                                    <div onClick={()=>setSelectedTokenIndex(-1)} className={`c_row ${selectedTokenIndex==-1?'active':''}`}>{t('319')}{selectedTokenIndex==-1&&<img src={require('../../assets/checked.png').default}/>}</div>
                                    <div onClick={()=>setSelectedTokenIndex(0)} className={`c_row ${selectedTokenIndex==0?'active':''}`}>USDT{selectedTokenIndex==0&&<img src={require('../../assets/checked.png').default}/>}</div>
                                    <div onClick={()=>setSelectedTokenIndex(1)} className={`c_row ${selectedTokenIndex==1?'active':''}`}>USDC{selectedTokenIndex==1&&<img src={require('../../assets/checked.png').default}/>}</div>
                                </div>
                            </button> */}
                        </div>
                        <div className='balance'>{t('320')}：0.00</div>
                        <SureBtn disabled className='custom' type='button'>{t('379')}</SureBtn>
                        {/* <RecordBtn type='button' onClick={()=>setOpenInvestRecord(true)}><img src={require('../../assets/ido/record.png').default}/>{t('322')}</RecordBtn> */}
                    </RightCard>
                    </>
                    :
                    <RightCard>
                        <div className='title'>{t('323')}</div>
                        <RightCardReceiveInfo>
                            <div>
                                <span className='value'>-- CHIP</span>
                                <span className='value_desc'>{t('324')}</span>
                            </div>
                            <div>
                                <span className='value'>10%</span>
                                <span className='value_desc'>TGE</span>
                            </div>
                            <div>
                                <span className='value'>-- CHIP</span>
                                <span className='value_desc'>{t('325')}</span>
                            </div>
                            <div>
                                <span className='value'>-- CHIP</span>
                                <span className='value_desc'>{t('326')}</span>
                            </div>
                        </RightCardReceiveInfo>
                        <SureBtn disabled className='custom' type='button'>{t('323')}</SureBtn>
                        <RecordBtn type='button' onClick={()=>setOpenReceiveRecord(true)}><img src={require('../../assets/ido/record.png').default}/>{t('327')}</RecordBtn>
                    </RightCard>
                    }
                    {/* <RightCard>
                        <div className='title'>{t('328')}</div>
                        <RightCardBody>
                            <RightCardBodyRow>
                                <img src={require('../../assets/ido/selected.png').default}/>
                                <span>{t('329')}</span>
                            </RightCardBodyRow>
                            <RightCardBodyRow>
                                <img src={require('../../assets/ido/selected.png').default}/>
                                <span>{t('330')}</span>
                            </RightCardBodyRow>
                            <RightCardBodyRow>
                                <img src={require('../../assets/ido/selected.png').default}/>
                                <span>{t('331')}</span>
                            </RightCardBodyRow>
                            <RightCardBodyRow>
                                <img src={require('../../assets/ido/selected.png').default}/>
                                <span>{t('332')}</span>
                            </RightCardBodyRow>
                        </RightCardBody>
                        <div className='address'>
                            <input type='text' placeholder={t('333')}/>
                            <button disabled type='button' onClick={()=>setOpenWhitelistResult(true)}>{t('334')}</button>
                        </div>
                    </RightCard> */}
                </RightOperate>
                <RightAbout>
                    <div className='header'>
                        <img src={require('../../assets/ido/info.png').default}/>
                        <span>{t('340')}</span>
                    </div>
                    <RightAboutInfo>
                        <div className='subTitle'>{t('341')}</div>
                        <div className='content'>
                            <div>
                                <div className='value'>CHIP</div>
                                <div className='value_desc'>{t('342')}</div>
                            </div>
                            <div>
                                <div className='value'>1 billion</div>
                                <div className='value_desc'>{t('343')}</div>
                            </div>
                            <div>
                                <div className='value'><img src={require('../../assets/ido/solana.png').default}/> Solana</div>
                                <div className='value_desc'>{t('344')}</div>
                            </div>
                            <div>
                                <div className='value'>{InitialPrice}</div>
                                <div className='value_desc'>{t('345')}</div>
                            </div>
                        </div>
                    </RightAboutInfo>
                    <RightAboutDistribute>
                        <div className='subTitle'>{t('346')}</div>
                        <div className='content'>
                            <div className='row'>
                                <div className='left'>{t('347')}</div>
                                <div className='right'><span>64%</span></div>
                            </div>
                            <div className='row'>
                                <div className='left'>{t('348')}</div>
                                <div className='right'><span>10%</span></div>
                            </div>
                            <div className='row'>
                                <div className='left'>IDO</div>
                                <div className='right'><span>7%</span></div>
                            </div>
                            <div className='row'>
                                <div className='left'>CHIPCHIPDAO</div>
                                <div className='right'><span>3%</span></div>
                            </div>
                            <div className='row'>
                                <div className='left'>{t('349')}</div>
                                <div className='right'><span>1%</span></div>
                            </div>
                            <div className='row'>
                                <div className='left'>{t('350')}</div>
                                <div className='right'><span>15%</span></div>
                            </div>
                        </div>
                    </RightAboutDistribute>
                    <RightAboutUse>
                        <div className='subTitle'>{t('351')}</div>
                        <RightAboutUseTip>
                            <RightAboutUseTipRow>{t('352')}</RightAboutUseTipRow>
                            <RightAboutUseTipRow>{t('353')}</RightAboutUseTipRow>
                            <RightAboutUseTipRow>{t('354')}</RightAboutUseTipRow>
                            <RightAboutUseTipRow>{t('355')}</RightAboutUseTipRow>
                            <RightAboutUseTipRow>{t('356')}</RightAboutUseTipRow>
                        </RightAboutUseTip>
                    </RightAboutUse>
                    <div>
                        <div className='subTitle'>{t('357')}</div>
                        <Chart ref={(node) => { ref(node); chartRef.current = node; }}></Chart>
                    </div>
                </RightAbout>
            </Right>
        </Content>
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
            <img src={require('../../assets/ido/h5/img1.png').default}/>
            <div className='title'>Initial DEX Offering</div>
            <div className='desc'>{t('300')}</div>
            {/* <div className='tip'>{t('301')}</div> */}
        </TopH5>
        <div style={{overflow:'hidden',height:30}}>
            <img style={{objectFit:'contain',verticalAlign:'top',height:'100%'}} src={require('../../assets/home/h5/logo_row.png').default}/>
        </div>
        <RuleH5>
            <div className='title'>{t('302')}</div>
            <RuleTip>
                <RuleTipRow>{t('303')}</RuleTipRow>
                {/* <RuleTipRow>{t('304')}</RuleTipRow> */}
            </RuleTip>
            <div className='icon'>
                <img src={require('../../assets/ido/h5/img2.png').default}/>
            </div>
            <div className='subTitle'>{t('305')}</div>
            <Time>
                <TimeItem>
                    <img src={require('../../assets/ido/time.png').default}/>
                    <span>--</span>
                </TimeItem>
                <span>{t('366')}</span>
                <TimeItem>
                    <img src={require('../../assets/ido/time.png').default}/>
                    <span>--</span>
                </TimeItem>
                <span>{t('367')}</span>
                <TimeItem>
                    <img src={require('../../assets/ido/time.png').default}/>
                    <span>--</span>
                </TimeItem>
                <span>{t('368')}</span>
                <TimeItem>
                    <img src={require('../../assets/ido/time.png').default}/>
                    <span>--</span>
                </TimeItem>
                <span>{t('369')}</span>
            </Time>
        </RuleH5>
        <Content>
            <OperateH5>
                <div className='header'>
                    <div className='left' onClick={()=>setSelectedIndex(0)}>
                        <span>{t('306')}</span>
                        <img src={selectedIndex==0?require('../../assets/ido/h5/menu_left_selected.png').default:require('../../assets/ido/h5/menu_left.png').default}/>
                    </div>
                    {/* <div className='right' onClick={()=>setSelectedIndex(1)}> */}
                    <div className='right disabled'>
                        <span>{t('323')}</span>
                        <img src={selectedIndex==1?require('../../assets/ido/h5/menu_right_selected.png').default:require('../../assets/ido/h5/menu_right.png').default}/>
                    </div>
                </div>
                {selectedIndex==0?<>
                <RightOperateToken>
                    <img src={require('../../assets/ido/coin.png').default}/>
                    <div className='content'>
                        <div className='title'>$0</div>
                        <div className='desc'>{t('318')}</div>
                    </div>
                </RightOperateToken>
                <RightFundraising>
                    <div className='title'>{t('376')}</div>
                    <div className='row'>
                        <div>{t('377')} 0SOL</div>
                        <div>{t('378')} 0SOL</div>
                    </div>
                    <div className='line' style={{'--w':'0%'}}></div>
                </RightFundraising>
                <RightCard>
                    <div className='title'>{t('306')}</div>
                    <div className='input'>
                        <input type='number' placeholder='0'/>
                        <div>SOL</div>
                        {/* <button type='button'>
                            <div>{t('319')} <img src={require('../../assets/arrow_down.png').default}/></div>
                            <div className='choose'>
                                <div onClick={()=>setSelectedTokenIndex(-1)} className={`c_row ${selectedTokenIndex==-1?'active':''}`}>{t('319')}{selectedTokenIndex==-1&&<img src={require('../../assets/checked.png').default}/>}</div>
                                <div onClick={()=>setSelectedTokenIndex(0)} className={`c_row ${selectedTokenIndex==0?'active':''}`}>USDT{selectedTokenIndex==0&&<img src={require('../../assets/checked.png').default}/>}</div>
                                <div onClick={()=>setSelectedTokenIndex(1)} className={`c_row ${selectedTokenIndex==1?'active':''}`}>USDC{selectedTokenIndex==1&&<img src={require('../../assets/checked.png').default}/>}</div>
                            </div>
                        </button> */}
                    </div>
                    <div className='balance'>{t('320')}：0.00</div>
                    <SureBtn disabled className='custom' type='button'>{t('379')}</SureBtn>
                    {/* <RecordBtn type='button' onClick={()=>setOpenInvestRecord(true)}><img src={require('../../assets/ido/record.png').default}/>{t('322')}</RecordBtn> */}
                </RightCard>
                </>
                :
                <RightCard>
                    <div className='title'>{t('323')}</div>
                    <RightCardReceiveInfo>
                        <div>
                            <span className='value'>-- CHIP</span>
                            <span className='value_desc'>{t('324')}</span>
                        </div>
                        <div>
                            <span className='value'>10%</span>
                            <span className='value_desc'>TGE</span>
                        </div>
                        <div>
                            <span className='value'>-- CHIP</span>
                            <span className='value_desc'>{t('325')}</span>
                        </div>
                        <div>
                            <span className='value'>-- CHIP</span>
                            <span className='value_desc'>{t('326')}</span>
                        </div>
                    </RightCardReceiveInfo>
                    <SureBtn disabled className='custom' type='button'>{t('323')}</SureBtn>
                    {/* <RecordBtn type='button' onClick={()=>setOpenReceiveRecord(true)}><img src={require('../../assets/ido/record.png').default}/>{t('327)}</RecordBtn> */}
                </RightCard>
                }
                {/* <RightCard>
                    <div className='title'>{t('328')}</div>
                    <RightCardBody>
                        <RightCardBodyRow>
                            <img src={require('../../assets/ido/selected.png').default}/>
                            <span>{t('329')}</span>
                        </RightCardBodyRow>
                        <RightCardBodyRow>
                            <img src={require('../../assets/ido/selected.png').default}/>
                            <span>{t('330')}</span>
                        </RightCardBodyRow>
                        <RightCardBodyRow>
                            <img src={require('../../assets/ido/selected.png').default}/>
                            <span>{t('331')}</span>
                        </RightCardBodyRow>
                        <RightCardBodyRow>
                            <img src={require('../../assets/ido/selected.png').default}/>
                            <span>{t('332')}</span>
                        </RightCardBodyRow>
                    </RightCardBody>
                    <div className='address'>
                        <input type='text' placeholder={t('333')}/>
                        <button disabled type='button' onClick={()=>setOpenWhitelistResult(true)}>{t('334')}</button>
                    </div>
                </RightCard> */}
            </OperateH5>
            <MenuH5>
                <div onClick={()=>setMenuIndex(0)} className={menuIndex==0?'active':''}>{t('181')}</div>
                <div onClick={()=>setMenuIndex(1)} className={menuIndex==1?'active':''}>{t('373')}</div>
                <div onClick={()=>setMenuIndex(2)} className={menuIndex==2?'active':''}>{t('322')}</div>
                <div onClick={()=>setMenuIndex(3)} className={menuIndex==3?'active':''}>{t('327')}</div>
            </MenuH5>
        </Content>
        {menuIndex==0&&renderAboutM()}
        {menuIndex==1&&renderTokenM()}
        {menuIndex==2&&renderInvestRecordM()}
        {menuIndex==3&&renderReceiveRecordM()}
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
    const renderAboutM = () =>(
        <>
            <MenuBody>
                <LeftInvest>
                    <div className='header'>
                        <img src={require('../../assets/ido/invest.png').default}/>
                        <span>{t('306')}</span>
                    </div>
                    <LeftInvestTableHeader>
                        <span>{t('307')}</span>
                        <span>{t('308')}</span>
                        <span>TGE</span>
                        <span>{t('309')}</span>
                    </LeftInvestTableHeader>
                    <LeftInvestTableContent>
                        <LeftInvestTableRow status='-1'>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            {/* <div>{t('370')}</div> */}
                        </LeftInvestTableRow>
                        <LeftInvestTableRow status='0'>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            {/* <div>{t('371')}</div> */}
                        </LeftInvestTableRow>
                        <LeftInvestTableRow status='1'>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            <div>--</div>
                            {/* <div><span>{t('372')}</span></div> */}
                        </LeftInvestTableRow>
                    </LeftInvestTableContent>
                </LeftInvest>
                <LeftTip>
                    <div className='title'>{t('310')}</div>
                    <div className='desc'>{t('311')}</div>
                    <div className='title'>{t('312')}</div>
                    {/* <div className='tip'>
                        <img src={require('../../assets/ido/star.png').default}/>
                        <span>{t('313')}：</span>
                    </div> */}
                    <LeftTipContent>
                        <LeftTipRow>{t('314')}</LeftTipRow>
                        <LeftTipRow>{t('315')}</LeftTipRow>
                        <LeftTipRow>{t('316')}</LeftTipRow>
                        <LeftTipRow>{t('317')}</LeftTipRow>
                        <LeftTipRow>{t('3171')}</LeftTipRow>
                        <LeftTipRow>{t('3172')}</LeftTipRow>
                        <LeftTipRow>{t('3173')}</LeftTipRow>
                        <LeftTipRow>{t('3174')}</LeftTipRow>
                    </LeftTipContent>
                </LeftTip>
            </MenuBody>
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
        </>
    )
    const renderTokenM = () => (
        <MenuBody>
            <RightAbout>
                <div className='header'>
                    <img src={require('../../assets/ido/info.png').default}/>
                    <span>{t('340')}</span>
                </div>
                <RightAboutInfo>
                    <div className='subTitle'>{t('341')}</div>
                    <div className='content'>
                        <div>
                            <div className='value'>CHIP</div>
                            <div className='value_desc'>{t('342')}</div>
                        </div>
                        <div>
                            <div className='value'>1 billion</div>
                            <div className='value_desc'>{t('343')}</div>
                        </div>
                        <div>
                            <div className='value'><img src={require('../../assets/ido/solana.png').default}/> Solana</div>
                            <div className='value_desc'>{t('344')}</div>
                        </div>
                        <div>
                            <div className='value'>{InitialPrice}</div>
                            <div className='value_desc'>{t('345')}</div>
                        </div>
                    </div>
                </RightAboutInfo>
                <RightAboutDistribute>
                    <div className='subTitle'>{t('346')}</div>
                    <div className='content'>
                        <div className='row'>
                            <div className='left'>{t('347')}</div>
                            <div className='right'><span>64%</span></div>
                        </div>
                        <div className='row'>
                            <div className='left'>{t('348')}</div>
                            <div className='right'><span>10%</span></div>
                        </div>
                        <div className='row'>
                            <div className='left'>IDO</div>
                            <div className='right'><span>7%</span></div>
                        </div>
                        <div className='row'>
                            <div className='left'>CHIPCHIPDAO</div>
                            <div className='right'><span>3%</span></div>
                        </div>
                        <div className='row'>
                            <div className='left'>{t('349')}</div>
                            <div className='right'><span>1%</span></div>
                        </div>
                        <div className='row'>
                            <div className='left'>{t('350')}</div>
                            <div className='right'><span>15%</span></div>
                        </div>
                    </div>
                </RightAboutDistribute>
                <RightAboutUse>
                    <div className='subTitle'>{t('351')}</div>
                    <RightAboutUseTip>
                        <RightAboutUseTipRow>{t('352')}</RightAboutUseTipRow>
                        <RightAboutUseTipRow>{t('353')}</RightAboutUseTipRow>
                        <RightAboutUseTipRow>{t('354')}</RightAboutUseTipRow>
                        <RightAboutUseTipRow>{t('355')}</RightAboutUseTipRow>
                        <RightAboutUseTipRow>{t('356')}</RightAboutUseTipRow>
                    </RightAboutUseTip>
                </RightAboutUse>
                <div>
                    <div className='subTitle'>{t('357')}</div>
                    <Chart ref={(node) => { ref(node); chartRef.current = node; }}></Chart>
                </div>
            </RightAbout>
        </MenuBody>
    )
    const renderInvestRecordM = () => (
        <MenuBody>
            <RecordH5>
                <div className='header'>
                    <img src={require('../../assets/ido/h5/record.png').default}/>
                    <span>{t('322')}</span>
                </div>
                <RecordH5TableHeader>
                    <span>{t('610')}</span>
                    <span>{t('307')}</span>
                    <span>{t('374')}</span>
                </RecordH5TableHeader>
                <RecordH5TableContent>
                    {renderNoData()}
                    {/* <RecordH5TableRow>
                        <div>2024.05.01</div>
                        <div>$0.01</div>
                        <div>100,000 USDT</div>
                    </RecordH5TableRow>
                    <RecordH5TableRow>
                        <div>2024.05.01</div>
                        <div>$0.01</div>
                        <div>100,000 USDT</div>
                    </RecordH5TableRow> */}
                </RecordH5TableContent>
            </RecordH5>
        </MenuBody>
    )
    const renderReceiveRecordM = () => (
        <MenuBody>
            <RecordH5>
                <div className='header'>
                    <img src={require('../../assets/ido/h5/record.png').default}/>
                    <span>{t('327')}</span>
                </div>
                <RecordH5TableHeader>
                    <span>{t('610')}</span>
                    <span>{t('605')}</span>
                </RecordH5TableHeader>
                <RecordH5TableContent>
                    {renderNoData()}
                    {/* <RecordH5TableRow>
                        <div>2024.05.01</div>
                        <div>100,000 CHIP</div>
                    </RecordH5TableRow>
                    <RecordH5TableRow>
                        <div>2024.05.01</div>
                        <div>100,000 CHIP</div>
                    </RecordH5TableRow> */}
                </RecordH5TableContent>
            </RecordH5>
        </MenuBody>
    )
    const renderNoData = () => (
        <NoData>
            <img src={require('../../assets/noData.png').default}/>
            <span>{t('375')}</span>
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
display: flex;
flex-direction: column;
align-items: center;
padding: 25px 0 16px;
img {
width: 40px;
}
span {
margin-top: 13px;
font-size: 16px;
font-weight: 600;
line-height: 18.933px;
opacity: 0.2;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 32px 0 16px;
img {
width: 60px;
}
span {
margin-top: 16px;
font-size: 21px;
line-height: 37.867px;
}
};
`

const Root = styled.div`
position: relative;
`

const TopH5 = styled.div`
padding: 56px 10px 45px;
text-align: center;
img {
width: 100%;
min-height:300px;
}
.title {
margin-top: 10px;
font-size: 32px;
font-weight: 700;
}
.desc {
margin-top: 30px;
font-size: 16px;
font-weight: 300;
}
.tip {
margin-top: 12px;
font-size: 12px;
line-height: 21px;
}
`
const RuleH5 = styled.div`
padding: 30px 20px 48px 30px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
.icon {
margin-top: 12px;
padding-left: 10px;
padding-right: 20px;
img {
width: 100%;
min-height: 186px;
}
}
.title {
font-size: 21px;
font-weight: 600;
}
.subTitle {
text-align: center;
margin-top: 20px;
font-size: 16px;
font-weight: 600;
line-height: 45px;
}
`
const OperateH5 = styled.div`
padding: 20px 15px;
border-radius: 18px;
border: 2px solid #2B292E;
.header {
position: relative;
display: flex;
align-items: center;
justify-content: center;
font-size: 16px;
font-weight: 600;
.left {
position: relative;
margin-right: -3px;
flex: 1;
height: 45px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
span {
position: relative;
z-index: 1;
}
img {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
}
}
.right {
&.disabled {
cursor: no-drop;
}
position: relative;
margin-left: -3px;
flex: 1;
height: 45px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
span {
position: relative;
z-index: 1;
}
img {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
}
}
}
`
const MenuH5 = styled.div`
margin-top: 25px;
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
const MenuBody = styled.div`
padding: 0 10px;
`
const EvaluateH5 = styled.div`
padding: 48px 10px 30px;
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
const RecordH5 = styled.div`
padding: 15px 15px 5px;
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
padding: 44px 40px 15px;
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
const RecordH5TableHeader = styled.div`
margin-top: 15px;
height: 30px;
border-radius: 4px;
background: rgba(255,255,255,0.1);
display: flex;
align-items: center;
padding-left: 16px;
padding-right: 24px;
span {
text-align: left;
flex: 2;
font-size: 12px;
font-weight: 500;
line-height: 18px;
opacity: 0.6;
&:nth-child(2) {
flex: 1;
}
&:last-child {
text-align: right;
}
}
`
const RecordH5TableContent = styled.div`
margin-top: 4px;
max-height: 80vh;
overflow-y: auto;
padding-left: 8px;
padding-right: 8px;
${({ theme }) => theme.mediaQueries.sm}{
padding: 0;
};
`
const RecordH5TableRow = styled.div`
height: 40px;
border-bottom: 1px solid rgba(255,255,255,0.2);
display: flex;
align-items: center;
font-size: 12px;
font-weight: 600;
line-height: 18px;
padding-left: 8px;
padding-right: 16px;
&:last-child {
border-bottom: none;
}
div {
    text-align: left;
    flex: 2;
    &:nth-child(2) {
        flex: 1;
    }
    &:last-child {
        text-align: right;
    }
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
height: 695px;
padding-top: 255px;
padding-left: 155px;
.img {
pointer-events: none;
position: absolute;
top: 0;
right: 0;
height: 100%;
}
`
const TopContent = styled.div`
position: relative;
width: 560px;
.title {
font-size: 62px;
font-weight: 700;
line-height: normal;
}
.desc {
margin-top: 20px;
font-size: 24px;
font-weight: 500;
}
.tip {
margin-top: 32px;
font-size: 16px;
font-weight: 500;
opacity: 0.7;
}
`
const Rule = styled.div`
padding: 60px 170px 65px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
display: flex;
gap: 80px;
.icon {
width: 510px;
height: 321px;
}
`
const RuleContent = styled.div`
padding-top: 30px;
.title {
font-size: 38px;
font-weight: 600;
line-height: 45px;
}
.subTitle {
margin-top: 30px;
font-size: 24px;
font-weight: 600;
line-height: 45px;
}
`
const RuleTip = styled.ul`
margin-top: 22px;
list-style-type: none;
color: rgba(255,255,255,0.7);
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 30px;
};
`
const RuleTipRow = styled.li`
font-size: 14px;
line-height: 21px;
position: relative;
padding-left: 20px;
&:before {
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    width: 4px;
    height: 4px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 18px;
line-height: 32px;
};
`
const Time = styled.div`
margin-top: 20px;
padding: 0;
display: flex;
align-items: center;
gap: 9px;
& > span {
font-size: 13px;
opacity: 0.6;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 0 10px;
gap: 11px;
& > span {
font-size: 18px;
}
};
`
const TimeItem = styled.div`
position: relative;
width: 44px;
height: 44px;
display: flex;
align-items: center;
justify-content: center;
span {
position: relative;
font-size: 28px;
font-weight: 600;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
img {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
}
${({ theme }) => theme.mediaQueries.sm}{
width: 57px;
height: 57px;
span {
font-size: 38px;
}
};
`
const Content = styled.div`
position: relative;
padding: 13px 10px 0;
${({ theme }) => theme.mediaQueries.sm}{
padding: 54px 105px 76px;
display: flex;
gap: 30px;
};
`
const Left = styled.div`
flex: 1 0 0;
`
const Right = styled.div`
flex: 1 0 0;
`
const LeftInvest = styled.div`
padding: 15px 15px 5px;
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
padding: 44px 40px 15px;
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
padding-left: 16px;
padding-right: 24px;
span {
text-align: left;
flex: 1;
font-size: 12px;
font-weight: 500;
line-height: 18px;
opacity: 0.6;
&:nth-child(2) {
flex: 2;
}
&:last-child {
text-align: right;
}
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 34px;
height: 50px;
border-radius: 8px;
padding-left: 10px;
padding-right: 40px;
span {
text-align: center;
flex: 2;
font-size: 16px;
font-weight: 600;
line-height: 32px;
&:first-child {
flex: 1;
}
&:last-child {
text-align: right;
}
}
};
`
const LeftInvestTableContent = styled.div`
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
height: 40px;
border-bottom: 1px solid rgba(255,255,255,0.2);
display: flex;
align-items: center;
font-size: 12px;
font-weight: 600;
line-height: 18px;
padding-left: 8px;
padding-right: 16px;
&:last-child {
border-bottom: none;
}
div {
    text-align: left;
    flex: 1;
    &:nth-child(2) {
        flex: 2;
    }
    &:nth-child(4) {
        color: ${({status,theme})=>status=='-1'?theme.colors.textDisabled:(status=='1'?theme.colors.success:theme.colors.text)};
        span {
            position: relative;
            padding-left: 8px;
            &:before {
                content: '';
                position: absolute;
                left: -5px;
                top: 6px;
                width: 6px;
                height: 6px;
                background-color: ${({theme})=>theme.colors.success};
                border-radius: 50%;
            }
        }
    }
    &:last-child {
        text-align: right;
    }
}
${({ theme }) => theme.mediaQueries.sm}{
height: 66px;
font-size: 16px;
line-height: 32px;
padding-left: 10px;
padding-right: 40px;
div {
    flex: 2;
    text-align: center;
    &:first-child {
        flex: 1;
    }
}
};
`
const LeftTip = styled.div`
margin-top: 14px;
padding: 28px 18px;
border-radius: 8px;
background: #1C1A22;
.title {
margin-bottom: 26px;
color: #CE67FF;
font-size: 18px;
font-weight: 500;
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
.desc {
margin-bottom: 26px;
font-size: 14px;
font-weight: 500;
line-height: 18px;
opacity: 0.6;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 22px;
padding: 50px 25px 68px 36px;
border-radius: 18px;
.title {
margin-bottom: 36px;
font-size: 38px;
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
.desc {
margin-bottom: 80px;
font-size: 21px;
line-height: 37px;
}
};
`
const LeftTipContent = styled.ul`
list-style-type: none;
color: rgba(255,255,255,0.6);
`
const LeftTipRow = styled.li`
margin-bottom: 20px;
font-size: 14px;
font-weight: 500;
line-height: 21px;
position: relative;
padding-left: 10px;
&:before {
    content: '';
    position: absolute;
    left: -5px;
    top: 10px;
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
line-height: 37px;
&:before {
    top: 16px;
}
};
`
const RightOperate = styled.div`
border-radius: 18px;
border: 2px solid #2B292E;
padding: 30px 40px 46px;
.header {
position: relative;
display: flex;
align-items: center;
justify-content: center;
font-size: 16px;
font-weight: 600;
.left {
position: relative;
margin-right: -3px;
width: 268px;
height: 60px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
span {
position: relative;
z-index: 1;
}
img {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
}
}
.right {
&.disabled {
cursor: no-drop;
}
position: relative;
margin-left: -3px;
width: 268px;
height: 60px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
span {
position: relative;
z-index: 1;
}
img {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
}
}
}
`
const RightOperateToken = styled.div`
margin-top: 12px;
height: 60px;
padding: 0 11px;
display: flex;
gap: 8px;
align-items: center;
border-radius: 8px;
border: 3px solid #30293C;
img {
width: 38px;
height: 38px;
}
.content {
display: flex;
flex-direction: column;
.title {
font-size: 18px;
font-weight: 600;
}
.desc {
font-size: 13px;
font-weight: 300;
opacity: 0.4;
}
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 30px;
height: 92px;
padding: 0 18px;
img {
width: 58px;
height: 58px;
}
.content {
.title {
font-size: 28px;
}
.desc {
font-size: 16px;
}
}
};
`
const RightFundraising = styled.div`
margin-top: 24px;
padding: 0 8px;
.title {
font-size: 14px;
font-weight: 600;
line-height: 20px;
}
.row {
margin-top: 10px;
font-size: 12px;
font-weight: 300;
opacity: 0.4;
display: flex;
justify-content: space-between;
align-items: center;
padding-right: 10px;
}
.line {
margin-top: 15px;
height: 12px;
position: relative;
border-radius: 10px;
background: rgba(255,255,255,0.1);
&::before {
position: absolute;
content: '';
left: 0;
top: 0;
height: 100%;
width: var(--w);
border-radius: 10px;
background: #7DC2BD;
}
}
${({ theme }) => theme.mediaQueries.sm}{
.title {
font-size: 24px;
line-height: 32px;
}
.row {
margin-top: 16px;
font-size: 16px;
}
.line {
margin-top: 20px;
height: 20px;
}
};
`
const RightCard = styled.div`
margin-top: 30px;
padding: 20px 18px 24px;
border-radius: 3px;
background: #241F2D;
font-size: 14px;
.title {
margin-bottom: 10px;
font-weight: 600;
line-height: 20px;
}
.input {
border-radius: 3px;
background: #121212;
padding: 0 10px 0 20px;
height: 40px;
display: flex;
align-items: center;
gap: 10px;
    input {
        flex: 1;
        height: 100%;
        font-size: 13px;
        font-weight: 500;
    }
    button {
        position: relative;
        background: transparent;
        font-size: 13px;
        &:hover {
            .choose {
            display: block;
            }
        }
        img {
        width: 14px;
        height: 14px;
        }
        .choose {
            position: absolute;
            z-index: 1;
            display: none;
            top: 100%;
            right: 0;
            padding: 20px 15px;
            border-radius: 8px;
            background: #362F42;
            width: 205px;
            .c_row {
                font-size: 18px;
                margin-top: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                img {
                    width: 11px;
                    height: 7px;
                }
                &:first-child {
                    margin-top: 0;
                }
                &.active {
                    font-weight: 600;
                }
            }
        }
    }
}
.balance {
margin-top: 10px;
text-align: right;
font-size: 12px;
opacity: 0.4;
}
.address {
margin-top: 16px;
border-radius: 33px;
background: #121212;
padding-left: 20px;
padding-right: 5px;
height: 40px;
display: flex;
align-items: center;
gap: 10px;
input {
flex: 1;
height: 100%;
font-size: 13px;
font-weight: 600;
}
button {
background: transparent;
font-size: 13px;
font-weight: 600;
border-radius: 16px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
padding: 0 15px;
height: 32px;
line-height: 32px;
}
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 40px;
padding: 30px 34px;
border-radius: 4px;
font-size: 24px;
.title {
margin-bottom: 22px;
line-height: 32px;
}
.input {
border-radius: 4px;
padding: 0 30px;
height: 60px;
    input {
        font-size: 16px;
        font-weight: 600;
    }
    button {
        font-size: 18px;
        &:hover {
            .choose {
            display: block;
            }
        }
        img {
        width: 10px;
        height: 10px;
        }
    }
}
.balance {
margin-top: 15px;
font-size: 16px;
}
.address {
margin-top: 18px;
border-radius: 33px;
background: #121212;
padding-left: 30px;
padding-right: 10px;
height: 52px;
input {
font-size: 16px;
}
button {
font-size: 16px;
border-radius: 32px;
height: 42px;
line-height: 42px;
}
}
};
`
const RightCardReceiveInfo = styled.div`
margin-top: 16px;
margin-bottom: 5px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
row-gap: 25px;
div {
width: 50%;
display: flex;
flex-direction: column;
&:nth-child(1) {
width: 80%;
}
&:nth-child(2) {
width: 20%;
}
&:nth-child(3) {
width: 100%;
}
&:last-child {
width: 100%;
.value {
color: ${({theme})=>theme.colors.success};
}
}
.value {
font-size: 18px;
font-weight: 700;
}
.value_desc {
margin-top: 8px;
font-size: 13px;
font-weight: 500;
opacity: 0.6;
}
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 40px;
margin-bottom: 18px;
row-gap: 36px;
div {
width: 50%;
&:nth-child(1) {
width: 50%;
}
&:nth-child(2) {
width: 50%;
}
&:nth-child(3) &:last-child {
width: 50%;
}
.value {
font-size: 21px;
}
.value_desc {
margin-top: 10px;
font-size: 16px;
}
}
};
`
const SureBtn = styled.button`
margin-top: 20px;
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
const RecordBtn = styled.div`
cursor: pointer;
margin-top: 35px;
padding: 0 16px;
font-size: 18px;
font-weight: 600;
display: flex;
gap: 8px;
align-items: center;
img {
width: 28px;
height: 28px;
}
`
const RightCardBody = styled.div`
margin-top: 20px;
padding: 2px 0 10px 12px;
border-radius: 4px;
border: 1.5px solid #362F42;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: unset;
padding: 10px 0 20px 20px;
border-radius: 12px;
border: 2px solid #362F42;
};
`
const RightCardBodyRow = styled.div`
padding: 10px 0;
display: flex;
align-items: center;
gap: 6px;
font-size: 13px;
font-weight: 500;
img {
width: 15px;
height: 15px;
}
${({ theme }) => theme.mediaQueries.sm}{
gap: 10px;
font-size: 16px;
img {
width: 24px;
height: 24px;
}
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
