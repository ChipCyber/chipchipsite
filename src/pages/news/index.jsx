import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { articlePageListApi } from "../../api"
import { getDateDiff } from "../../utils"
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
        articlePageListApi({pageIndex,pageSize:10}).then(({data})=>{
            setList([...list,...data]);
            if(!data||data.length<10) {
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
                <div className='t_title'>{t('103')}</div>
                <Content>
                    {list.map((item,idx)=><Item key={idx} onClick={()=>history.push('/newsDetail?id='+item.id)}>
                        <img className='icon' src={item.thumbnail}/>
                        <div className='time'>{getDateDiff(item.publishTime)}</div>
                        <div className='title'>{item.title}</div>
                        <DetailBtn>
                            <span>{t('402')}</span>
                            <img src={require('../../assets/nav/login_arrow.png').default}/>
                        </DetailBtn>
                    </Item>)}
                </Content>
                <NoMore ref={loadingRef}>·&nbsp;&nbsp;&nbsp;&nbsp;{t('401')}&nbsp;&nbsp;&nbsp;&nbsp;·</NoMore>
            </Root>
        )
    }
    return (
        <Root>
            <BgGreen/>
            <div className='t_title'>{t('400')}</div>
            {list.map((item,idx)=><ItemH5 key={idx} onClick={()=>history.push('/newsDetail?id='+item.id)}>
                <img className='icon' src={item.thumbnail}/>
                <div className='content'>
                    <div className='title'>{item.title}</div>
                    <div className='time'>{getDateDiff(item.publishTime)}</div>
                </div>
            </ItemH5>)}
        </Root>
    )
}

const Root = styled.div`
position: relative;
padding: 94px 20px 50px;
overflow: hidden;
min-height: 100vh;
.t_title {
margin-left: 10px;
font-size: 21px;
font-weight: 700;
margin-bottom: 18px;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 180px 106px 200px;
.t_title {
font-size: 48px;
margin-left: 50px;
margin-bottom: 60px;
}
};
`

const ItemH5 = styled.div`
margin-bottom: 18px;
cursor: pointer;
width: 100%;
display: flex;
gap: 20px;
.icon {
width: 120px;
height: 80px;
object-fit: cover;
border-radius: 8px;
}
.content {
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 5px 0;
.time {
font-size: 13px;
opacity: 0.8;
}
.title {
font-size: 14px;
font-weight: 600;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
text-overflow: ellipsis;
line-height: 20px;
height: calc(2 * 20px);
}
}
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
const Content = styled.div`
position: relative;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 40px;
grid-auto-flow: dense;
`
const Item = styled.div`
cursor: pointer;
max-width: 385px;
width: 100%;
&:hover {
.icon {
    transform: scale(1.1);
}
}
.icon {
width: 100%;
height: 215px;
object-fit: cover;
border-radius: 18px;
transition: transform 0.2s;
}
.time {
margin-top: 18px;
font-size: 16px;
opacity: 0.8;
}
.title {
margin-top: 20px;
font-size: 21px;
font-weight: 700;
}
&:hover {
.title {
background: linear-gradient(258deg, #75F6A3 5.58%, #72A7EB 88.85%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
}
`;
const DetailBtn = styled.button`
background: transparent;
margin-top: 40px;
font-size: 14px;
display: flex;
align-items: center;
img {
width: 20px;
height: 20px;
flex-shrink: 0;
}
`
const NoMore = styled.div`
margin-top: 45px;
text-align: center;
font-size: 16px;
font-weight: 700;
opacity: 0.2;
`
