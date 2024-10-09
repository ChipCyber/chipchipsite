import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { knowledgePageListApi } from "../../api"
import { useLanguage } from "../../LanguageContext";

export default function Index() {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const loadingRef = useRef(null);
    const loading = useRef(false);
    const [noMore, setNoMore] = useState(false);
    const shouldRender = useBreakpointCheck();
    const history = useHistory();
    const [pageIndex, setPageIndex] = useState(1);
    const [list, setList] = useState([]);
    const [requestDataTrigger, setRequestDataTrigger] = useState(false);
    const loadMore = () => {
        setPageIndex(pageIndex+1);
    }
    useEffect(() => {
        setPageIndex(1);
        setNoMore(false);
        setList([]);
        setRequestDataTrigger(prev => !prev);
    }, [language]);
    const requestData = () => {
        if(noMore||loading.current) {
            return;
        }
        loading.current = true;
        knowledgePageListApi({pageIndex,pageSize:30}).then(({data,res})=>{
            setList([...list,...data]);
            if(!data||data.length>=res.totalCount) {
                setNoMore(true);
            }
        }).finally(()=>{
            loading.current = false;
        });
    }
    useEffect(() => {
        requestData();
    }, [pageIndex,requestDataTrigger]);
    useEffect(() => {
        const ob = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting&&!loading.current) {
                loadMore();
            }
        }, { root: null, threshold: 0})
        if(loadingRef.current) {
            ob.observe(loadingRef.current);
        }
        return () => {
            if(loadingRef.current) {
                ob.unobserve(loadingRef.current);
            }
        }
    }, [shouldRender]);
    if (shouldRender) {
        return (
            <Root>
                <BgOrange1/>
                <BgOrange2/>
                <BgGreen/>
                <FAQ>
                    <div className='title'>{t('172')}</div>
                    {
                        list.map((item,idx)=>(
                            <div className='item' onClick={()=>history.push('/faqDetail?id='+item.id)} key={idx}>{item.title}</div>
                        ))
                    }
                </FAQ>
                <NoMore ref={loadingRef}>·&nbsp;&nbsp;&nbsp;&nbsp;{t('401')}&nbsp;&nbsp;&nbsp;&nbsp;·</NoMore>
            </Root>
        )
    }
    return (
        <Root>
            <BgGreen/>
            <FAQH5>
                <div className='t_title'>{t('172')}</div>
                <div className='t_desc'>{t('193')}...</div>
                <FAQH5Tip>
                    {
                        list.map((item,idx)=>(
                            <FAQH5TipRow onClick={()=>history.push('/faqDetail?id='+item.id)} key={idx}>{item.title}</FAQH5TipRow>
                        ))
                    }
                </FAQH5Tip>
            </FAQH5>
            <NoMore ref={loadingRef}>·&nbsp;&nbsp;&nbsp;&nbsp;{t('401')}&nbsp;&nbsp;&nbsp;&nbsp;·</NoMore>
        </Root>
    )
}

const Root = styled.div`
position: relative;
padding: 94px 20px 50px;
overflow: hidden;
min-height: 100vh;
${({ theme }) => theme.mediaQueries.sm}{
padding: 180px 106px 200px;
};
`

const BgOrange1 = styled.div`
position: absolute;
top: 135px;
right: 0;
width: 732px;
height: 212px;
transform: rotate(29.57deg);
border-radius: 732px;
opacity: 0.2;
background: #FF8B81;
filter: blur(80px);
`
const BgOrange2 = styled.div`
position: absolute;
top: 420px;
left: 0;
width: 557.558px;
height: 348.102px;
transform: rotate(29.57deg);
border-radius: 557.558px;
opacity: 0.1;
background: #FFAA25;
filter: blur(80px);
`
const BgGreen = styled.div`
position: absolute;
top: 180px;
right: 60px;
width: 152.763px;
height: 137.473px;
transform: rotate(29.57deg);
border-radius: 622.051px;
opacity: 0.2;
background: #04E9B3;
filter: blur(80px);
${({ theme }) => theme.mediaQueries.sm}{
top: 650px;
right: 210px;
width: 622.051px;
height: 559.79px;
};
`
const FAQ = styled.div`
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
const FAQH5 = styled.div`
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
const NoMore = styled.div`
margin-top: 45px;
text-align: center;
font-size: 16px;
font-weight: 700;
opacity: 0.2;
`
