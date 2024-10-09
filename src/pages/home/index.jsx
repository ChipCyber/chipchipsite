import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import { useInView } from 'react-intersection-observer';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { articlePageListApi,knowledgePageListApi } from "../../api";
import { getDateDiff } from "../../utils"
import { useLanguage } from "../../LanguageContext";
import {
    openUrl,
    InitialPrice,
    EnterGameUrl,
    GitbookUrl,
    GitbookTokenUrl,
    DiscordUrl,
    ALetterUrl,
    SocialMediaMediumUrl,
    SocialMediaTelegramUrl,
    SocialMediaTwitterUrl,
    SocialMediaDiscordUrl,
} from "../../constants";

import ItemBg from '../../assets/home/img3_item_bg.png';
import ChartLogo from '../../assets/home/chart_logo.png';

const data = [
    { name: '64%', desc: '1100', value: 64, color: '#2F1AA4' },
    { name: '10%', desc: '1101', value: 10, color: '#A084FA' },
    { name: '7%', desc: 'IDO', value: 7, color: '#FFD43B' },
    { name: '3%', desc: 'CHIPCHIPDAO', value: 3, color: '#78E1AE' },
    { name: '1%', desc: '1102', value: 1, color: '#5F8AF9' },
    { name: '15%', desc: '1103', value: 15, color: '#FF74C6' },
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
        radius: ['35%', '50%'],
        padAngle: 3,
        label: {
            alignTo: 'edge',
            formatter: function(params) {
                const item = data.find(d => d.desc === params.data.desc);
                // const description = t(item.desc);
                // const maxLineLength = 10;
                // let formattedDesc = '';
                // for (let i = 0; i < description.length; i += maxLineLength) {
                //     formattedDesc += description.slice(i, i + maxLineLength) + '\n';
                // }
                return `{name|${params.name}}\n{circle|●} {desc|${t(item.desc)}}`;
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
                    padding: [2, 0, 0, 0]
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
                        color: '#999',
                    },
                    circle: {
                        backgroundColor: item.color
                    }
                }
            }
        }))
    },
    graphic: {
        elements: [
            {
                type: 'image',
                style: {
                    image: ChartLogo,
                    width: 56,
                    height: 56
                },
                left: 'center',
                top: 'center'
            },
        ]
    }
});

export default function Home() {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const chartRef = useRef(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });
    const history = useHistory();
    const shouldRender = useBreakpointCheck();
    const [articleList, setArticleList] = useState([]);
    const [faqList, setFaqList] = useState([]);
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
    }, [shouldRender, inView, language]);
    useEffect(() => {
        articlePageListApi({pageIndex:1,pageSize:4}).then(({data})=>{
            setArticleList(data);
        });
        knowledgePageListApi({pageIndex:1,pageSize:5,knowledgeType:1}).then(({data})=>{
            setFaqList(data);
        });
    }, [language]);
    if (shouldRender) {
        return (
            <Root>
                <Top1>
                    <TopBg src={require('../../assets/home/bg1.png').default}/>
                    <Top1Content>
                        <div className='wow animate__animated animate__fadeInLeft'>
                            <div className='title'>CHIPCHIP.IO</div>
                            <div className='desc'>{t('106')}</div>
                        </div>
                        <Top1Tip className="wow animate__animated animate__fadeInLeft">
                            <Top1TipRow>{t('107')}</Top1TipRow>
                            <Top1TipRow>{t('108')}</Top1TipRow>
                            <Top1TipRow>{t('109')}</Top1TipRow>
                            <Top1TipRow>{t('110')}</Top1TipRow>
                        </Top1Tip>
                        <Top1TipBtnRow>
                            <Top1TipBtn to='/ido'>IDO</Top1TipBtn>
                            <Top1TipBorderBtn className='custom' to='/airdrop'>{t('101')}</Top1TipBorderBtn>
                            <Top1TipBorderBtn className='custom' to='/displacement'>{t('111')}</Top1TipBorderBtn>
                            <Top1TipBorderBtn className='custom' to='/download'>
                                <img src={require('../../assets/home/download.png').default}/>
                                <span>{t('112')}</span>
                            </Top1TipBorderBtn>
                        </Top1TipBtnRow>
                    </Top1Content>
                </Top1>
                <ImgRow src={require('../../assets/home/logo_row.png').default}/>
                <Top2>
                    <TopBg src={require('../../assets/home/bg2.png').default}/>
                    <Top2BgRadio/>
                    <Top2Content>
                        <div className="title wow animate__animated animate__fadeInLeft">{t('113')}</div>
                        <Top2Row>
                            <Top2RowLeft className="wow animate__animated animate__fadeInLeft">
                                <div className='desc'>{t('114')}</div>
                                <Top2Btn  className='custom' onClick={()=>openUrl(GitbookUrl)}>
                                    <span>Gitbook</span>
                                    <img src={require('../../assets/home/arrow_enter.png').default}/>
                                </Top2Btn>
                            </Top2RowLeft>
                            <Top2RowImg className="wow animate__animated animate__fadeInRight" src={require('../../assets/home/img21.png').default}/>
                        </Top2Row>
                        <Top2Row2>
                            <Top2Row2Img className="wow animate__animated animate__fadeInLeft" src={require('../../assets/home/img22.png').default}/>
                            <Top2Row2Right className="wow animate__animated animate__fadeInRight">
                                <img src={require('../../assets/home/66.png').default}/>
                                <div className='desc'>{t('115')}</div>
                                <Top2Btn className='custom' onClick={()=>openUrl(DiscordUrl)}>
                                    <span>Discord</span>
                                    <img src={require('../../assets/home/arrow_enter.png').default}/>
                                </Top2Btn>
                            </Top2Row2Right>
                        </Top2Row2>
                    </Top2Content>
                </Top2>
                <ImgRow src={require('../../assets/home/arrow_row.png').default}/>
                <Top3>
                    <Top3Top>
                        <Top3Title>{t('116')}</Top3Title>
                        <img src={require('../../assets/home/img31.png').default}/>
                    </Top3Top>
                    <Top3Row className='wow animate__animated animate__fadeInDown'>
                        <Top3RowItem>
                            <img src={require('../../assets/home/img3_item1.png').default}/>
                            <div className='title'>{t('117')}</div>
                            <div className='desc'>{t('118')}</div>
                        </Top3RowItem>
                        <Top3RowItem>
                            <img src={require('../../assets/home/img3_item2.png').default}/>
                            <div className='title'>{t('119')}</div>
                            <div className='desc'>{t('120')}</div>
                        </Top3RowItem>
                        <Top3RowItem>
                            <img src={require('../../assets/home/img3_item3.png').default}/>
                            <div className='title'>{t('121')}</div>
                            <div className='desc'>{t('122')}</div>
                        </Top3RowItem>
                        <Top3RowItem>
                            <img src={require('../../assets/home/img3_item4.png').default}/>
                            <div className='title'>{t('123')}</div>
                            <div className='desc'>{t('124')}</div>
                        </Top3RowItem>
                    </Top3Row>
                </Top3>
                <Top4>
                    <TopBg src={require('../../assets/home/bg4.png').default}/>
                    <Top4Content>
                        <Top4Title>
                            <span>{t('125')}</span>
                            <img src={require('../../assets/home/img4_title.png').default}/>
                        </Top4Title>
                        <Top4Row1>
                            <Top4Row1Left>
                                <div className='title'>{t('126')}</div>
                                <div className='desc'>{t('127')}</div>
                                <div className='desc'>{t('128')}<a href={GitbookTokenUrl} target='__blank'>Gitbook</a></div>
                                <Top4Row1LeftCard>
                                    <img src={require('../../assets/home/img41.png').default}/>
                                    <Top4Row1LeftCardContent>
                                        <Top4Row1LeftCardItem>
                                            <div className='item_title'>{InitialPrice}</div>
                                            <div className='item_desc'>{t('191')}</div>
                                        </Top4Row1LeftCardItem>
                                        <Top4Row1LeftCardItem>
                                            <div className='item_title'>1 billion</div>
                                            <div className='item_desc'>{t('192')}</div>
                                        </Top4Row1LeftCardItem>
                                        <Top4Row1LeftCardItem>
                                            <div className='item_title'>Solana</div>
                                            <div className='item_desc'>{t('344')}</div>
                                        </Top4Row1LeftCardItem>
                                    </Top4Row1LeftCardContent>
                                </Top4Row1LeftCard>
                                <Top2Btn className='custom' onClick={()=>history.push('/ido')}>
                                    <span>IDO</span>
                                    <img src={require('../../assets/home/arrow_enter.png').default}/>
                                </Top2Btn>
                            </Top4Row1Left>
                            <Chart ref={(node) => { ref(node); chartRef.current = node; }}></Chart>
                        </Top4Row1>
                        <Top4Row2>
                            <Top4Row2Img className='wow animate__animated animate__fadeInLeft' src={require('../../assets/home/img42.png').default}/>
                            <Top4Row2Right className='wow animate__animated animate__fadeInRight'>
                                <div className='title'>{t('200')}</div>
                                <div className='subTitle'>{t('129')}</div>
                                <div className='desc'>{t('130')}</div>
                                <Top2Btn className='custom' onClick={()=>history.push('/airdrop')}>
                                    <span>{t('131')}</span>
                                    <img src={require('../../assets/home/arrow_enter.png').default}/>
                                </Top2Btn>
                            </Top4Row2Right>
                        </Top4Row2>
                    </Top4Content>
                </Top4>
                <ImgRow src={require('../../assets/home/logo_row.png').default}/>
                <Top5>
                    <Top5Content>
                        <div className='title wow animate__animated animate__fadeIn'>
                            <img src={require('../../assets/home/img5_title.png').default}/>
                            <div>CHIPCHIPBOX</div>
                        </div>
                        <div className='desc wow animate__animated animate__fadeIn'>{t('132')}</div>
                        <div className='desc wow animate__animated animate__fadeIn' dangerouslySetInnerHTML={{__html:t('133')}}></div>
                        <Top5Card className='wow animate__animated animate__fadeIn'>
                            <img src={require('../../assets/home/img51.png').default}/>
                            <div>{t('134')}</div>
                            <Top5Btn className='custom' onClick={()=>openUrl(ALetterUrl)}>{t('195')}</Top5Btn>
                        </Top5Card>
                        <Top5Img src={require('../../assets/box.png').default}/>
                        <Top5ImgShadow src={require('../../assets/home/img5_box_shadow.png').default}/>
                    </Top5Content>
                </Top5>
                <Top6>
                    <Top6Bg src={require('../../assets/home/bg6.png').default}/>
                    <Top6Title>{t('102')}</Top6Title>
                    <Top6Content>
                        <Top6Img src={require('../../assets/home/roadmap.png').default}/>
                        <Top6Row>
                            <Top6RowItem>
                                <div className='title'>
                                    <span>Q2 2023</span>
                                    <img src={require('../../assets/home/flag.png').default}/>
                                </div>
                                <Top6Tip className='wow animate__animated animate__fadeInLeft'>
                                    <Top6TipRow>{t('135')}</Top6TipRow>
                                </Top6Tip>
                            </Top6RowItem>
                            <Top6RowItem>
                                <div className='title'>
                                    <span style={{color:'#20CFF1'}}>Q2 2024</span>
                                    <img src={require('../../assets/home/flag.png').default}/>
                                </div>
                                <Top6Tip className='wow animate__animated animate__fadeInUp'>
                                    <Top6TipRow>{t('144')}</Top6TipRow>
                                    <Top6TipRow>{t('145')}</Top6TipRow>
                                    <Top6TipRow>{t('146')}</Top6TipRow>
                                    <Top6TipRow>{t('147')}</Top6TipRow>
                                </Top6Tip>
                            </Top6RowItem>
                            <Top6RowItem>
                                <div className='title'>
                                    <span style={{color:'#1AE796'}}>Q2 2025</span>
                                </div>
                                <Top6Tip className='wow animate__animated animate__fadeInRight'>
                                    <Top6TipRow>{t('165')}<br/><a href='' target='__blank'>{t('166')}</a></Top6TipRow>
                                </Top6Tip>
                                <Top6Btn className='custom' onClick={()=>history.push('/roadmap')}>
                                    <span>{t('104')}</span>
                                    <img src={require('../../assets/home/arrow_enter.png').default}/>
                                </Top6Btn>
                            </Top6RowItem>
                        </Top6Row>
                    </Top6Content>
                </Top6>
                <Top7>
                    <Top7BlueBgRadio/>
                    <Top7RedBgRadio/>
                    <Top7RedBox src={require('../../assets/home/top7_box.png').default}/>
                    <Top7Title>POWERED BY CHIPCHIPGAME</Top7Title>
                    <Top7Content>
                        <Top7Item1 className='wow animate__animated animate__fadeInDown'>
                            <img src={require('../../assets/home/top71.png').default}/>
                            <Top7ItemRow>
                                <span>RUMMY</span>
                                <Top7DisabledBtn className='custom'>{t('169')}</Top7DisabledBtn>
                            </Top7ItemRow>
                        </Top7Item1>
                        <Top7Item2 className='wow animate__animated animate__fadeInDown'>
                            <img src={require('../../assets/home/top72.png').default}/>
                            <Top7ItemRow>
                                <span>{t('167')}</span>
                                <Top7Btn className='custom' onClick={()=>openUrl(EnterGameUrl)}>
                                    <span>{t('168')}</span>
                                    <img src={require('../../assets/home/arrow_enter.png').default}/>
                                </Top7Btn>
                            </Top7ItemRow>
                        </Top7Item2>
                        <Top7Item3 className='wow animate__animated animate__fadeInDown'>
                            <img src={require('../../assets/home/top73.png').default}/>
                            <Top7ItemRow>
                                <span>OKEY</span>
                                <Top7DisabledBtn className='custom'>{t('169')}</Top7DisabledBtn>
                            </Top7ItemRow>
                        </Top7Item3>
                    </Top7Content>
                </Top7>
                <Top8>
                    <div className='t_title'>{t('170')}</div>
                    <Top8Content>
                        {articleList&&articleList.map((item,idx)=><Top8Item key={idx} onClick={()=>history.push(`/newsDetail?id=${item.id}`)} className='wow animate__animated animate__fadeIn'>
                            <img className='icon' src={item.thumbnail}/>
                            <div className='right'>
                                <div className='title'>{item.title}</div>
                                <div className='time'>{getDateDiff(item.publishTime)}</div>
                            </div>
                        </Top8Item>)}
                        {/* {articleList&&articleList[0]&&<Top8Item1 className='wow animate__animated animate__fadeIn'>
                            <img src={articleList[0].thumbnail}/>
                            <div className='content'>
                                <div className='title'>{articleList[0].title}</div>
                                <div className='desc'>{articleList[0].source}</div>
                                <div className='time'>{getDateDiff(articleList[0].publishTime)}</div>
                            </div>
                        </Top8Item1>}
                        {articleList&&articleList.length>1&&<Top8Item2>
                            {articleList&&articleList[1]&&<Top8Item21 className='wow animate__animated animate__fadeIn'>
                                <div className='title'>{articleList[1].title}</div>
                                <div className='desc'>{articleList[1].source}</div>
                                <div className='time'>{getDateDiff(articleList[1].publishTime)}</div>
                            </Top8Item21>}
                            {articleList&&articleList[2]&&<Top8Item22 className='wow animate__animated animate__fadeIn' src={articleList[2].thumbnail}/>}
                        </Top8Item2>}
                        {articleList&&articleList[3]&&<Top8Item3 className='wow animate__animated animate__fadeIn' src={articleList[3].thumbnail}/>} */}
                    </Top8Content>
                    <Top8Btn className='custom' onClick={()=>history.push('/news')}>
                        <span>{t('171')}</span>
                        <img src={require('../../assets/home/arrow_enter.png').default}/>
                    </Top8Btn>
                </Top8>
                <Top9>
                    <Top6Bg src={require('../../assets/home/bg9.png').default}/>
                    <Top91 className='wow animate__animated animate__fadeInLeft'>
                        <div className='title'>{t('172')}</div>
                        <div className='desc'>{t('193')}...</div>
                        <Top191Tip>
                            {
                                faqList.map((item,idx)=>(
                                    <Top91TipRow onClick={()=>history.push('/faqDetail?id='+item.id)} key={idx}>{item.title}</Top91TipRow>
                                ))
                            }
                        </Top191Tip>
                        <Top6Btn className='custom' style={{marginLeft:'32px'}} onClick={()=>history.push('/faq')}>
                            <span>{t('104')}</span>
                            <img src={require('../../assets/home/arrow_enter.png').default}/>
                        </Top6Btn>
                    </Top91>
                    <Top92 className='wow animate__animated animate__fadeInRight'>
                        <div className='bg'></div>
                        <div className='content'>
                            <div className='title'>{t('173')}</div>
                            <div className='desc'>{t('194')}</div>
                            <div className='row'>
                                <a href={SocialMediaMediumUrl} target='__blank'><img src={require('../../assets/home/c_xx.png').default}/></a>
                                <a href={SocialMediaTwitterUrl} target='__blank'><img src={require('../../assets/home/c_twitter.png').default}/></a>
                                <a href={SocialMediaDiscordUrl} target='__blank'><img src={require('../../assets/home/c_discord.png').default}/></a>
                                <a href={SocialMediaTelegramUrl} target='__blank'><img src={require('../../assets/home/c_telegram.png').default}/></a>
                            </div>
                        </div>
                    </Top92>
                </Top9>
            </Root>
        )
    }
    return (
        <Root>
            <Top1H5>
                <img className='bg' src={require('../../assets/home/h5/bg1.png').default}/>
                <div className='content'>
                    <div className='title'>CHIPCHIP.IO</div>
                    <div className='desc'>{t('106')}</div>
                    <div className='tip'>{t('107')}<br/>{t('109')}<br/>{t('108')}<br/>{t('110')}</div>
                    <div className='row'>
                        <Top1TipBtn to='/ido'>Get IDO</Top1TipBtn>
                        <Top1TipBorderBtn to='/airdrop'>{t('101')}</Top1TipBorderBtn>
                    </div>
                    <div className='row'>
                        <Top1TipBorderBtn to='/displacement'>{t('111')}</Top1TipBorderBtn>
                        <Top1TipBorderBtn to='/download'>
                            <img src={require('../../assets/home/download.png').default}/>
                            <span>{t('112')}</span>
                        </Top1TipBorderBtn>
                    </div>
                </div>
            </Top1H5>
            <div style={{overflow:'hidden',height:30}}>
                <img style={{objectFit:'contain',verticalAlign:'top',height:'100%'}} src={require('../../assets/home/h5/logo_row.png').default}/>
            </div>
            <Top2H5>
                <div className='title'>{t('113')}</div>
                <div className='desc'>{t('114')}</div>
                <BtnH5 className='custom' onClick={()=>openUrl(GitbookUrl)}>
                    <span>Gitbook</span>
                    <img src={require('../../assets/nav/login_arrow.png').default}/>
                </BtnH5>
                <div className='desc'>{t('115')}</div>
                <BtnH5 className='custom' onClick={()=>openUrl(DiscordUrl)}>
                    <span>Discord</span>
                    <img src={require('../../assets/nav/login_arrow.png').default}/>
                </BtnH5>
            </Top2H5>
            <div style={{overflow:'hidden',height:15}}>
                <img style={{objectFit:'contain',verticalAlign:'top',width:'100%'}} src={require('../../assets/home/h5/arrow_row.png').default}/>
            </div>
            <Top3H5>
                <div className='t_title'>{t('116')}</div>
                <Top3H5Item>
                    <div className='title'>{t('117')}</div>
                    <div className='desc'>{t('118')}</div>
                    <img className='icon' src={require('../../assets/home/h5/img3_item1.png').default}/>
                </Top3H5Item>
                <Top3H5Item>
                    <div className='title'>{t('119')}</div>
                    <div className='desc'>{t('120')}</div>
                    <img className='icon' src={require('../../assets/home/h5/img3_item2.png').default}/>
                </Top3H5Item>
                <Top3H5Item>
                    <div className='title'>{t('121')}</div>
                    <div className='desc'>{t('122')}</div>
                    <img className='icon' src={require('../../assets/home/h5/img3_item3.png').default}/>
                </Top3H5Item>
                <Top3H5Item>
                    <div className='title'>{t('123')}</div>
                    <div className='desc'>{t('124')}</div>
                    <img className='icon' src={require('../../assets/home/h5/img3_item4.png').default}/>
                </Top3H5Item>
            </Top3H5>
            <Top4H5>
                <div className='t_title'>{t('125')}</div>
                <div className='t_sub_title'>{t('126')}</div>
                <div className='desc'>{t('127')}</div>
                <div className='desc'>{t('128')}<a href={GitbookTokenUrl} target='__blank'>Gitbook</a></div>
                <Chart ref={(node) => { ref(node); chartRef.current = node; }}></Chart>
                <Top4H5Card>
                    <img className='icon' src={require('../../assets/home/h5/img41.png').default}/>
                    <Top4H5CardItem>
                        <div className='item_title'>{InitialPrice}</div>
                        <div className='item_desc'>{t('191')}</div>
                    </Top4H5CardItem>
                    <Top4H5CardItem>
                        <div className='item_title'>1 billion</div>
                        <div className='item_desc'>{t('192')}</div>
                    </Top4H5CardItem>
                    <Top4H5CardItem>
                        <div className='item_title'>Solana</div>
                        <div className='item_desc'>{t('344')}</div>
                    </Top4H5CardItem>
                </Top4H5Card>
                <BtnH5 className='custom' onClick={()=>history.push('/ido')}>
                    <span>Get IDO</span>
                    <img src={require('../../assets/nav/login_arrow.png').default}/>
                </BtnH5>
            </Top4H5>
            <Top5H5>
                <img className='bg' src={require('../../assets/home/h5/bg5.png').default}/>
                <div className='t_title'>{t('200')}</div>
                <div className='t_sub_title'>{t('129')}</div>
                <div className='desc'>{t('130')}</div>
                <BtnH5 className='custom' onClick={()=>history.push('/airdrop')}>
                    <span>{t('131')}</span>
                    <img src={require('../../assets/nav/login_arrow.png').default}/>
                </BtnH5>
            </Top5H5>
            <div style={{overflow:'hidden',height:30}}>
                <img style={{objectFit:'contain',verticalAlign:'top',height:'100%'}} src={require('../../assets/home/h5/logo_row.png').default}/>
            </div>
            <Top6H5>
                <div className='content'>
                    <div className='title'>
                        <img src={require('../../assets/home/h5/img6_title.png').default}/>
                        <div>CHIPCHIPBOX</div>
                    </div>
                    <div className='desc'>{t('132')}</div>
                    <div className='desc' dangerouslySetInnerHTML={{__html:t('133')}}></div>
                    <Top6H5Card>
                        <img className='icon' src={require('../../assets/home/h5/img61.png').default}/>
                        <div>{t('134')}</div>
                        <BtnSmallH5 className='custom' onClick={()=>openUrl(ALetterUrl)}>{t('195')}</BtnSmallH5>
                    </Top6H5Card>
                    <div className='box'>
                        <img src={require('../../assets/box.png').default}/>
                    </div>
                    <img className='box_shadow' src={require('../../assets/home/h5/img6_box_shadow.png').default}/>
                </div>
            </Top6H5>
            <Top7H5>
                <img className='bg' src={require('../../assets/home/h5/bg7.png').default}/>
                <div className='t_title'>{t('102')}</div>
                <div className='content'>
                    <Top7H5Left>
                        <Top7H5Item>
                            <div className='title'>
                                <span>Q2 2023</span>
                                <img src={require('../../assets/home/h5/flag.png').default}/>
                            </div>
                            <div className='desc'>{t('135')}</div>
                        </Top7H5Item>
                        <Top7H5Item>
                            <div className='title'>
                                <span style={{color:'#1AE796'}}>Q2 2025</span>
                            </div>
                            <div className='desc'>{t('165')}<br/><a href='#' target='__blank'>{t('166')}</a></div>
                        </Top7H5Item>
                    </Top7H5Left>
                    <Top7H5Center src={require('../../assets/home/h5/roadmap.png').default}/>
                    <Top7H5Right>
                        <Top7H5Item>
                            <div className='title'>
                                <span style={{color:'#20CFF1'}}>Q2 2024</span>
                                <img src={require('../../assets/home/h5/flag.png').default}/>
                            </div>
                            <div className='desc'>{t('144')}</div>
                            <div className='desc'>{t('145')}</div>
                            <div className='desc'>{t('146')}</div>
                            <div className='desc'>{t('147')}</div>
                        </Top7H5Item>
                    </Top7H5Right>
                </div>
                <BtnH5 className='custom' onClick={()=>history.push('/roadmap')} style={{margin:'0 auto',marginTop:50}}>
                    <span>{t('171')}</span>
                    <img src={require('../../assets/nav/login_arrow.png').default}/>
                </BtnH5>
            </Top7H5>
            <Top8H5>
                <Top8H5BlueBgRadio/>
                <Top8H5RedBgRadio/>
                <div className='t_title'>POWERED BY CHIPCHIPGAME</div>
                <div className='content'>
                    <Top8H5Item>
                        <img className='icon' src={require('../../assets/home/top72.png').default}/>
                        <div className='row'>
                            <div className='title'>{t('167')}</div>
                            <button className='btn custom' type='button' onClick={()=>openUrl(EnterGameUrl)}>
                                <span>{t('168')}</span>
                                <img src={require('../../assets/home/h5/arrow_enter.png').default}/>
                            </button>
                        </div>
                    </Top8H5Item>
                    <Top8H5Item>
                        <img className='icon' src={require('../../assets/home/top71.png').default}/>
                        <div className='row'>
                            <div className='title'>RUMMY</div>
                            <button className='disabled_btn custom' type='button' disabled>
                                <span>{t('169')}</span>
                                <img src={require('../../assets/home/h5/arrow_enter.png').default}/>
                            </button>
                        </div>
                    </Top8H5Item>
                    <Top8H5Item>
                        <img className='icon' src={require('../../assets/home/top73.png').default}/>
                        <div className='row'>
                            <div className='title'>OKEY</div>
                            <button className='disabled_btn custom' type='button' disabled>
                                <span>{t('169')}</span>
                                <img src={require('../../assets/home/h5/arrow_enter.png').default}/>
                            </button>
                        </div>
                    </Top8H5Item>
                </div>
                <div className='news'>
                    <div className='t_title'>{t('170')}</div>
                    {articleList.map((item,idx)=>(
                        <Top8H5NewsItem key={idx}>
                            <img className='icon' src={item.thumbnail}/>
                            <div className='right'>
                                <div className='title'>{item.title}</div>
                                <div className='time'>{getDateDiff(item.publishTime)}</div>
                            </div>
                        </Top8H5NewsItem>
                    ))}
                    <BtnH5 className='custom' onClick={()=>history.push('/news')} style={{marginLeft:12,marginTop:36}}>
                        <span>{t('171')}</span>
                        <img src={require('../../assets/nav/login_arrow.png').default}/>
                    </BtnH5>
                </div>
            </Top8H5>
            <Top9H5>
                <div className='t_title'>{t('172')}</div>
                <div className='t_desc'>{t('193')}...</div>
                <Top9H5Tip>
                    {
                        faqList.map((item,idx)=>(
                            <Top9H5TipRow onClick={()=>history.push('/faqDetail?id='+item.id)} key={idx}>{item.title}</Top9H5TipRow>
                        ))
                    }
                </Top9H5Tip>
                <Top9H5More className='custom' onClick={()=>history.push('/faq')}>
                    <span>{t('171')}</span>
                    <img src={require('../../assets/nav/login_arrow.png').default}/>
                </Top9H5More>
            </Top9H5>
            <Top10H5>
                <div className='bg'></div>
                <div className='t_title'>{t('173')}</div>
                <div className='t_desc'>{t('194')}</div>
                <div className='row' onClick={()=>openUrl(SocialMediaMediumUrl)}>
                    <div className='left'>
                        <img className='icon' src={require('../../assets/home/h5/c_xx.png').default}/>
                        <span>{t('174')}</span>
                    </div>
                    <img className='arrow' src={require('../../assets/nav/login_arrow.png').default}/>
                </div>
                <div className='row' onClick={()=>openUrl(SocialMediaTwitterUrl)}>
                    <div className='left'>
                        <img className='icon' src={require('../../assets/home/h5/c_twitter.png').default}/>
                        <span>{t('175')}</span>
                    </div>
                    <img className='arrow' src={require('../../assets/nav/login_arrow.png').default}/>
                </div>
                <div className='row' onClick={()=>openUrl(SocialMediaDiscordUrl)}>
                    <div className='left'>
                        <img className='icon' src={require('../../assets/home/h5/c_discord.png').default}/>
                        <span>{t('176')}</span>
                    </div>
                    <img className='arrow' src={require('../../assets/nav/login_arrow.png').default}/>
                </div>
                <div className='row' onClick={()=>openUrl(SocialMediaTelegramUrl)}>
                    <div className='left'>
                        <img className='icon' src={require('../../assets/home/h5/c_telegram.png').default}/>
                        <span>{t('176')}</span>
                    </div>
                    <img className='arrow' src={require('../../assets/nav/login_arrow.png').default}/>
                </div>
            </Top10H5>
        </Root>
    )
}

const Root = styled.div`
position: relative;
overflow: hidden;
`
const Top1H5 = styled.div`
position: relative;
padding: 132px 28px 60px;
.bg {
pointer-events: none;
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
object-fit: cover;
}
.content {
position: relative;
.title {
text-shadow: 0px 4px 18px rgba(0, 0, 0, 0.25);
font-size: 42px;
font-weight: 700;
text-align: center;
}
.desc {
margin-top: 16px;
text-shadow: 0px 4px 18px rgba(0, 0, 0, 0.25);
font-size: 24px;
font-weight: 300;
text-align: center;
}
.tip {
margin-top: 30px;
margin-bottom: 46px;
fill: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(10px);
padding: 26px 0;
border-radius: 20px;
font-size: 14px;
font-weight: 600;
line-height: 24px;
text-align: center;
}
.row {
margin-top: 20px;
display: flex;
gap: 20px;
}
}
`
const Top2H5 = styled.div`
padding: 38px 36px 55px 24px;
.title {
font-size: 24px;
font-weight: 600;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.desc {
margin-top: 28px;
font-size: 13px;
line-height: 21px;
color: ${({theme})=>theme.colors.textSubtle};
}
`
const BtnSmallH5 = styled.button`
position: relative;
font-size: 14px;
font-weight: 600;
height: 26px;
padding: 0 17px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
color: ${({theme})=>theme.colors.text};
flex-shrink: 0;
`
const BtnH5 = styled.button`
position: relative;
margin-top: 22px;
font-size: 14px;
font-weight: 600;
height: 40px;
padding: 0 25px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
color: ${({theme})=>theme.colors.text};
display: flex;
align-items: center;
gap: 10px;
img {
width: 20px;
height: 20px;
}
`
const Top3H5 = styled.div`
padding: 32px 10px 25px;
.t_title {
margin-left: 14px;
font-size: 24px;
font-weight: 600;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
`
const Top3H5Item = styled.div`
position: relative;
margin-top: 20px;
border-radius: 6px;
background: #1C1A22;
padding: 16px 22px 25px;
.title {
font-size: 18px;
font-weight: 600;
line-height: 32px;
}
.desc {
margin-top: 15px;
font-size: 14px;
color: ${({theme})=>theme.colors.textSubtle};
}
.icon {
position: absolute;
top: -20px;
right: 30px;
width: 68px;
}
`
const Top4H5 = styled.div`
padding: 25px 25px 15px;
.t_title {
font-size: 24px;
font-weight: 600;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.t_sub_title {
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
.desc {
margin-top: 20px;
font-size: 13px;
font-weight: 400;
line-height: 21px;
color: ${({theme})=>theme.colors.textSubtle};
a {
text-decoration: underline;
}
}
`
const Top4H5Card = styled.div`
position: relative;
display: flex;
gap: 40px;
align-items: center;
padding-left: 50px;
border-radius: 5px;
background: #1C1A22;
height: 70px;
.icon {
position: absolute;
left: 0;
top: 0;
height: 100%;
}
`
const Top4H5CardItem = styled.div`
position: relative;
.item_title {
font-size: 18px;
font-weight: 600;
}
.item_desc {
font-size: 12px;
font-weight: 300;
opacity: 0.4;
}
`
const Top5H5 = styled.div`
overflow: hidden;
position: relative;
padding: 15px 25px 50px;
.bg {
position: absolute;
top: -60px;
left: 0;
width: 100%;
}
.t_title {
position: relative;
font-size: 24px;
font-weight: 600;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.t_sub_title {
position: relative;
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
.desc {
position: relative;
margin-top: 20px;
font-size: 13px;
font-weight: 400;
line-height: 21px;
color: ${({theme})=>theme.colors.textSubtle};
}
`
const Top6H5 = styled.div`
position: relative;
padding: 28px 20px 20px;
.content {
padding: 35px 25px 81px;
border-radius: 8px;
background: #1A1621;
backdrop-filter: blur(40px);
.title {
    width: 100%;
    position: relative;
    height: 30px;
    img {
        position: absolute;
        left: 44px;
        top: 5px;
        width: 186px;
        height: 22px;
    }
    div {
        font-size: 24px;
        font-weight: 600;
        background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
.desc {
margin-top: 22px;
color: ${({theme})=>theme.colors.textSubtle};
font-size: 13px;
line-height: 21px;
}
.box {
position: relative;
margin-top: 42px;
display: flex;
justify-content: center;
img {
width: 300px;
height: 310px;
}
}
.box_shadow {
pointer-events: none;
position: absolute;
left: 0;
bottom: -30px;
width: 100%;
}
}
`
const Top6H5Card = styled.div`
margin-top: 22px;
position: relative;
border-radius: 4px;
background: #221F2A;
padding: 8px 20px;
display: flex;
align-items: center;
gap: 12px;
div {
font-size: 12px;
font-weight: 600;
line-height: 21px;
color: ${({theme})=>theme.colors.textSubtle};
background: linear-gradient(258deg, #75F6A3 5.58%, #FEAD1D 88.85%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.icon {
position: absolute;
left: 0;
top: 0;
height: 100%;
}
`
const Top7H5 = styled.div`
position: relative;
padding: 20px 25px 25px;
.bg {
position: absolute;
left: 0;
bottom: 0;
width: 100%;
}
.t_title {
position: relative;
font-size: 24px;
font-weight: 600;
text-transform: uppercase;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.content {
margin-top: 35px;
position: relative;
display: flex;
gap: 8px;
}
`
const Top7H5Left = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
flex: 1;
height: 543px;
`
const Top7H5Item = styled.div`
position: relative;
.title {
color: #F087FF;
font-size: 21px;
font-weight: 600;
line-height: 21px;
display: flex;
align-items: center;
gap: 10px;
img {
width: 16px;
height: 16px;
}
}
.desc {
margin-top: 10px;
color: #D9D9D9;
font-size: 12px;
font-weight: 500;
line-height: 16px;
position: relative;
padding-left: 10px;
a {
text-decoration: underline;
}
&:before {
    content: '';
    position: absolute;
    left: 0;
    top: 5px;
    width: 3px;
    height: 3px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
}
`
const Top7H5Center = styled.img`
width: 30px;
height: 483px;
flex-shrink: 0;
`
const Top7H5Right = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
flex: 1;
`
const Top8H5 = styled.div`
overflow: hidden;
position: relative;
padding: 50px 0 0;
.t_title {
position: relative;
margin: 0 24px;
font-size: 24px;
font-weight: 600;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.content {
margin-top: 34px;
display: flex;
gap: 20px;
padding: 0 24px;
overflow-x: auto;
}
.news {
margin: 28px 0 0;
}
`
const Top8H5BlueBgRadio = styled.div`
position: absolute;
top: -18px;
right: -73px;
width: 205px;
height: 205px;
border-radius: 205px;
background: #3EB8D6;
filter: blur(40px);
`
const Top8H5RedBgRadio = styled.div`
position: absolute;
left: -120px;
top: 243px;
width: 205px;
height: 205px;
border-radius: 205px;
background: #DB2245;
filter: blur(40px);
`
const Top8H5Item = styled.div`
width: 260px;
height: 338px;
padding: 18px 18px 22px;
flex-shrink: 0;
border-radius: 9.087px;
border: 1.01px solid #616E9D;
background: linear-gradient(191deg, rgba(73, 81, 123, 0.40) 2.83%, rgba(79, 23, 75, 0.40) 91.98%);
backdrop-filter: blur(10.097087860107422px);
.icon {
border-radius: 6px;
width: 225px;
height: 247px;
}
.row {
margin-top: 20px;
display: flex;
justify-content: space-between;
align-items: center;
.title {
color: #CE67FF;
font-size: 16px;
font-weight: 600;
line-height: 30px;
}
.btn {
display: flex;
align-items: center;
gap: 2px;
height: 30px;
padding: 8px 16px;
flex-shrink: 0;
font-size: 12px;
font-weight: 600;
border-radius: 16px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
}
.disabled_btn {
display: flex;
align-items: center;
gap: 2px;
height: 30px;
padding: 8px 16px;
flex-shrink: 0;
font-size: 12px;
font-weight: 600;
border-radius: 16px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
opacity: 0.5;
cursor: no-drop;
}
}
&:nth-child(2), &:nth-child(3) {
filter: brightness(0.6);
}
`
const Top8H5NewsItem = styled.div`
margin-top: 14px;
display: flex;
gap: 20px;
padding: 0 12px;
.icon {
width: 120px;
height: 80px;
flex-shrink: 0;
border-radius: 8px;
object-fit: cover;
}
.right {
padding: 5px 0;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 10px;
.title {
font-size: 14px;
font-weight: 600;
}
.time {
font-size: 13px;
opacity: 0.8;
}
}
`
const Top9H5 = styled.div`
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
const Top9H5Tip = styled.ul`
margin-top: 20px;
list-style-type: none;
color: rgba(255,255,255,0.7);
`
const Top9H5TipRow = styled.li`
cursor: pointer;
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
const Top9H5More = styled.button`
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
const Top10H5 = styled.div`
padding: 26px 36px 40px;
position: relative;
.bg {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
opacity: 0.3;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
}
.t_title {
position: relative;
font-size: 21px;
font-weight: 600;
line-height: 28px;
text-transform: uppercase;
}
.t_desc {
margin-top: 20px;
margin-bottom: 20px;
position: relative;
font-size: 16px;
line-height: 20px;
text-transform: uppercase;
}
.row {
position: relative;
margin-top: 12px;
border-radius: 4px;
background: rgba(255,255,255,0.1);
display: flex;
align-items: center;
justify-content: space-between;
height: 45px;
padding-left: 25px;
padding-right: 20px;
.left {
display: flex;
align-items: center;
gap: 22px;
font-size: 14px;
line-height: 20px;
text-transform: uppercase;
.icon {
width: 28px;
height: 28px;
}
}
.arrow {
width: 20px;
height:20px;
}
}
`


const Top1 = styled.div`
min-height: 700px;
max-height: 1000px;
height: 100vh;
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
padding-top: 140px;
padding-left: 157px;
padding-bottom: 60px;
`
const TopBg = styled.img`
pointer-events: none;
width: 100%;
height: 100%;
object-fit: cover;
position: absolute;
left: 0;
top: 0;
`
const Top1Content = styled.div`
position: relative;
.title {
font-size: 82px;
font-weight: 700;
}
.desc {
font-size: 38px;
font-weight: 300;
}
`
const Top1Tip = styled.ul`
margin-top: 80px;
width: 509px;
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(10px);
padding: 27px 14px 27px 44px;
border-radius: 20px;
list-style-type: none;
color: rgba(255,255,255,0.7);
`
const Top1TipRow = styled.li`
font-size: 24px;
font-weight: 500;
position: relative;
&:before {
    content: '';
    position: absolute;
    left: -20px;
    top: 16px;
    width: 6px;
    height: 6px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
`
const Top1TipBtnRow = styled.div`
margin-top: 30px;
display: flex;
align-items: center;
gap: 20px;
`
const Top1TipBtn = styled(NavLink)`
text-align: center;
flex: 1;
border-radius: 32px;
font-size: 14px;
font-weight: 500;
height: 48px;
line-height: 48px;
padding: 0;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #FEAD1D 88.85%);
color: ${({theme})=>theme.colors.textPrimary};
${({ theme }) => theme.mediaQueries.sm}{
padding: 0 25px;
flex: unset;
font-size: 18px;
height: 52px;
};
`
const Top1TipBorderBtn = styled(NavLink)`
text-align: center;
flex: 1;
border-radius: 32px;
font-size: 14px;
font-weight: 500;
height: 48px;
line-height: 48px;
padding: 0;
border-radius: 32px;
border: 1px solid #75F6A3;
background: rgba(255, 255, 255, 0.10);
color: ${({theme})=>theme.colors.text};
img {
width: 18px;
height: 18px;
margin-right: 12px;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 0 25px;
flex: unset;
height: 52px;
font-size: 18px;
img {
margin-right: 15px;
}
};
`
const ImgRow = styled.img`
width: 100%;
`
const Top2 = styled.div`
position: relative;
padding: 102px 157px 109px;
`
const Top2BgRadio = styled.div`
position: absolute;
top: 248px;
left: -98px;
width: 617px;
height: 617px;
border-radius: 617px;
opacity: 0.3;
background: #6E25B5;
filter: blur(150px);
`
const Top2Content = styled.div`
position: relative;
.title {
    font-size: 56px;
    font-weight: 600;
    background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
`
const Top2Row = styled.div`
display: flex;
gap: 56px;
`
const Top2RowImg = styled.img`
width: 463px;
height: 500px;
`
const Top2RowLeft = styled.div`
.desc {
margin-top: 78px;
font-size: 18px;
line-height: 28px;
color: ${({theme})=>theme.colors.textSubtle};
}
`
const Top2Btn = styled.button`
width: 207px;
height: 53px;
margin-top: 90px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 18px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
`
const Top2Row2 = styled.div`
margin-top: 144px;
border-radius: 18px;
background: #1A1621;
padding: 7px 57px 50px 50px;
display: flex;
gap: 120px;
`
const Top2Row2Img = styled.img`
margin-top: -70px;
width: 360px;
height: 395px;
`
const Top2Row2Right = styled.div`
font-size: 18px;
line-height: 28px;
img {
width: 67px;
}
.desc {
margin-top: 33px;
color: ${({theme})=>theme.colors.textSubtle};
}
button {
margin-top: 40px;
img {
width: 20px;
height: 20px;
}
}
`
const Top3 = styled.div`
padding: 30px 63px 61px;
`
const Top3Title = styled.div`
margin-left: 94px;
font-size: 56px;
font-weight: 600;
line-height: 60px;
`
const Top3Top = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
img {
width: 586px;
height: 260px;
}
`
const Top3Row = styled.div`
display: flex;
gap: 20px;
overflow: auto;
max-width: fit-content;
margin: 0 auto;
`
const Top3RowItem = styled.div`
background-image: url(${ItemBg});
background-size: 310px 548px;
padding: 26px 20px;
width: 310px;
height: 548px;
flex-shrink: 0;
position: relative;
img {
position: absolute;
top: 15%;
left: 20px;
transform: translateY(-50%);
width: 170px;
z-index: 1;
}
.title {
margin-top: 200px;
font-size: 28px;
font-weight: 500;
}
.desc {
margin-top: 45px;
font-size: 18px;
color: ${({theme})=>theme.colors.textSubtle};
}
`
const Top4 = styled.div`
position: relative;
padding: 61px 72px 28px 157px;
`
const Top4Content = styled.div`
position: relative;
`
const Top4Title = styled.div`
position: relative;
width: 600px;
font-size: 56px;
font-weight: 600;
line-height: 60px;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
img {
position: absolute;
top: 0;
left: 40%;
width: 240px;
}
`
const Top4Row1 = styled.div`
margin-top: 48px;
display: flex;
gap: 35px;
`
const Top4Row1Left = styled.div`
flex: 3;
.title {
margin-top: 48px;
font-size: 28px;
font-weight: 300;
}
.desc {
margin-top: 28px;
font-size: 16px;
font-weight: 300;
a {
text-decoration: underline;
}
}
`
const Chart = styled.div`
flex: 2;
aspect-ratio: 1;
`
const Top4Row1LeftCard = styled.div`
position: relative;
margin-top: 64px;
width: 615px;
height: 126px;
border-radius: 8px;
background: #1C1A22;
img {
width: 473px;
height: 126px;
position: absolute;
top: 0;
left: 0;
}
`
const Top4Row1LeftCardContent = styled.div`
position: absolute;
display: flex;
gap: 60px;
right: 52px;
top: 50%;
transform: translateY(-50%);
`
const Top4Row1LeftCardItem = styled.div`
.item_title {
font-size: 32px;
font-weight: 600;
}
.item_desc {
font-size: 16px;
font-weight: 300;
opacity: 0.4;
}
`
const Top4Row2 = styled.div`
margin-top: 135px;
display: flex;
gap: 90px;
`
const Top4Row2Img = styled.img`
width: 536px;
height: 582px;
`
const Top4Row2Right = styled.div`
.title {
font-size: 56px;
font-weight: 600;
line-height: 60px;
}
.subTitle {
margin-top: 80px;
font-size: 28px;
font-weight: 300;
}
.desc {
margin-top: 58px;
font-size: 16px;
font-weight: 300;
}
`
const Top5 = styled.div`
padding: 109px 188px;
`
const Top5Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 55px 80px 100px;
border-radius: 18px;
background: #1A1621;
backdrop-filter: blur(40px);
.title {
    width: 100%;
    position: relative;
    height: 72px;
    img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 120%;
    }
    div {
        text-align: center;
        font-size: 56px;
        font-weight: 600;
        background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
.desc {
width: 100%;
text-align: center;
margin-top: 64px;
color: ${({theme})=>theme.colors.textSubtle};
font-size: 18px;
line-height: 28px;
}
`
const Top5Card = styled.div`
margin-top: 140px;
width: 790px;
height: 100px;
border-radius: 12.245px;
background: #221F2A;
font-size: 21px;
font-weight: 600;
color: #8E52F6;
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 243px;
padding-right: 52px;
position: relative;
img {
position: absolute;
left: 0;
top: 0;
height: 100%;
}
div {
opacity: 0.8;
}
`
const Top5Img = styled.img`
margin-top: 68px;
width: 300px;
height: 310px;
`
const Top5ImgShadow = styled.img`
pointer-events: none;
position: absolute;
bottom: 0;
left: 50%;
transform: translate(-50%, 100px);
width: 100%;
max-width: 800px;
`
const Top5Btn = styled.button`
width: 115px;
height: 53px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 18px;
font-weight: 600;
color: ${({theme})=>theme.colors.text};
`
const Top6 = styled.div`
position: relative;
padding: 0 188px;
height: 730px;
`
const Top6Bg = styled.img`
pointer-events: none;
object-fit: cover;
position: absolute;
left: 0;
bottom: 0;
width: 100%;
`
const Top6Title = styled.div`
font-size: 56px;
font-weight: 600;
line-height: 60px;
position: relative;
text-direction: uppercase;
`
const Top6Content = styled.div`
position: relative;
margin-top: 136px;
padding: 0 13px;
`
const Top6Img = styled.img`
min-height: 92px;
width: 100%;
`
const Top6Row = styled.div`
margin-top: 12px;
display: flex;
justify-content: space-between;
`
const Top6RowItem = styled.div`
.title {
color: #F087FF;
font-size: 32px;
font-weight: 600;
img {
margin-left: 13px;
width: 32px;
height: 32px;
}
}
`
const Top6Tip = styled.ul`
margin-top: 12px;
width: 312px;
border-radius: 20px;
list-style-type: none;
color: rgba(255,255,255,0.7);
`
const Top6TipRow = styled.li`
font-size: 18px;
font-weight: 600;
line-height: 32px;
position: relative;
&:before {
    content: '';
    position: absolute;
    left: -20px;
    top: 14px;
    width: 4px;
    height: 4px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
a {
color: rgba(255,255,255,0.7);
text-decoration: underline;
}
`
const Top6Btn = styled.button`
width: 176px;
height: 53px;
margin-top: 33px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 18px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
`
const Top7 = styled.div`
position: relative;
padding: 83px 70px 100px;
`
const Top7Title = styled.div`
position: relative;
text-align: center;
font-size: 56px;
font-weight: 600;
line-height: 60px;
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`
const Top7BlueBgRadio = styled.div`
position: absolute;
top: 183px;
left: 45%;
width: 448px;
height: 448px;
border-radius: 448px;
background: #3EB8D6;
filter: blur(150px);
`
const Top7RedBgRadio = styled.div`
position: absolute;
left: -87px;
bottom: 0;
width: 448px;
height: 448px;
border-radius: 448px;
background: #DB2245;
filter: blur(150px);
`
const Top7RedBox = styled.img`
position: absolute;
top: 205px;
right: 276px;
width: 45px;
height: 58px;
`
const Top7Content = styled.div`
margin-top: 60px;
position: relative;
display: flex;
align-items: center;
justify-content: center;
`
const Top7Item1 = styled.div`
filter: brightness(0.6);
margin-right: -20px;
width: 412px;
border-radius: 14.4px;
border: 1.6px solid #616E9D;
background: linear-gradient(191deg, #1E134E 2.83%, #1E1449 91.98%);
padding: 28px 28px 37px;
img {
width: 100%;
}
`
const Top7Item2 = styled.div`
z-index: 1;
width: 515px;
border-radius: 18px;
border: 2px solid #616E9D;
background: linear-gradient(191deg, rgba(73, 81, 123, 0.40) 2.83%, rgba(79, 23, 75, 0.40) 91.98%);
backdrop-filter: blur(20px);
padding: 16px 16px 47px;
img {
width: 100%;
}
`
const Top7Item3 = styled.div`
filter: brightness(0.6);
margin-left: -20px;
width: 412px;
border-radius: 14.4px;
border: 1.6px solid #616E9D;
background: linear-gradient(191deg, #1E134E 2.83%, #1E1449 91.98%);
padding: 28px 28px 37px;
img {
width: 100%;
}
`
const Top7ItemRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 32px;
color: #CE67FF;
`
const Top7DisabledBtn = styled.button`
color: ${({theme})=>theme.colors.text};
padding: 12px 20px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 14px;
font-weight: 600;
opacity: 0.5;
border-radius: 25.6px;
cursor: no-drop;
`
const Top7Btn = styled.button`
color: ${({theme})=>theme.colors.text};
width: 176px;
height: 53px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 18px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
`
const Top8 = styled.div`
position: relative;
padding: 109px 85px 72px 157px;
.t_title {
font-size: 56px;
font-weight: 600;
line-height: 60px;
text-transform: uppercase;
}
`
const Top8Content = styled.div`
margin-top: 57px;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 24px;
`
const Top8Item = styled.div`
cursor: pointer;
margin-top: 14px;
display: flex;
gap: 20px;
.icon {
width: 180px;
height: 120px;
flex-shrink: 0;
border-radius: 8px;
object-fit: cover;
}
.right {
padding: 5px 0;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 10px;
.title {
font-size: 22px;
font-weight: 600;
}
.time {
font-size: 16px;
opacity: 0.8;
}
}
`
const Top8Item1 = styled.div`
position: relative;
height: 546px;
border-radius: 12px;
overflow: hidden;
background: #000;
img {
object-fit: cover;
opacity: 0.2;
positon: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
}
.content {
position: absolute;
left: 25px;
right: 25px;
bottom: 57px;
}
.title {
font-size: 21px;
font-weight: 600;
line-height: 32px;
}
.desc {
margin-top: 25px;
font-size: 16px;
font-weight: 600;
line-height: 21px;
color: #F9FEF9;
}
.time {
margin-top: 13px;
opacity: 0.4;
font-size: 13px;
font-weight: 600;
line-height: 21px;
}
`
const Top8Item2 = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`
const Top8Item21 = styled.div`
height: 263px;
border-radius: 12px;
overflow: hidden;
background: #1C1A22;
padding: 40px 45px 0;
.title {
color: #CE67FF;
font-size: 21px;
font-weight: 600;
line-height: 32px;
}
.desc {
margin-top: 25px;
font-size: 16px;
font-weight: 600;
line-height: 21px;
color: #F9FEF9;
}
.time {
margin-top: 13px;
opacity: 0.4;
font-size: 13px;
font-weight: 600;
line-height: 21px;
}
`
const Top8Item22 = styled.img`
height: 263px;
border-radius: 12px;
overflow: hidden;
background: #1C1A22;
object-fit: cover;
width: 100%;
`
const Top8Item3 = styled.img`
height: 546px;
border-radius: 12px;
overflow: hidden;
object-fit: cover;
background: #000;
width: 100%;
`
const Top8Btn = styled.button`
color: ${({theme})=>theme.colors.text};
margin: 0 auto;
margin-top: 65px;
padding: 15px 55px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 18px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
img {
margin-left: 10px;
width: 20px;
height: 20px;
}
`
const Top9 = styled.div`
padding: 73px 85px 146px 157px;
display: flex;
gap: 30px;
align-items: center;
position: relative;
`
const Top91 = styled.div`
flex: 1;
position: relative;
.title {
font-size: 56px;
font-weight: 600;
line-height: 60px;
text-transform: uppercase;
}
.desc {
margin-top: 35px;
font-size: 38px;
font-weight: 300;
}
`
const Top191Tip = styled.ul`
padding-left: 30px;
margin-top: 35px;
width: 100%;
list-style-type: none;
color: rgba(255,255,255,0.7);
`
const Top91TipRow = styled.li`
cursor: pointer;
margin-top: 20px;
font-size: 18px;
position: relative;
&:before {
    content: '';
    position: absolute;
    left: -20px;
    top: 10px;
    width: 6px;
    height: 6px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 50%;
}
`
const Top92 = styled.div`
flex: 1;
height: 518px;
position: relative;
.bg {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
opacity: 0.3;
border-radius: 12px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
}
.content {
height: 100%;
position: relative;
padding: 42px 46px;
display: flex;
flex-direction: column;
justify-content: space-between;
}
.title {
background: linear-gradient(90deg, #FFF 0%, #8CEA8D 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-size: 48px;
font-weight: 600;
line-height: 60px;
text-transform: uppercase;
}
.desc {
font-size: 38px;
font-weight: 300;
}
.row {
display: flex;
gap: 80px;
align-items: center;
img {
width: 48px;
height: 48px;
}
}
`
