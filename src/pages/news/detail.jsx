import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { articlePageListApi,articleGetApi } from "../../api"
import { toDateStr } from "../../utils"

export default function Index() {
    const { t } = useTranslation();
    const shouldRender = useBreakpointCheck();
    const location = useLocation();
    const history = useHistory();
    const [data, setData] = useState(null);
    const [list, setList] = useState([]);
    const searchParams = new URLSearchParams(location.search);
    let aValue = searchParams.get('id');
    const [id, setId] = useState(aValue);
    const updateUrl = (newId) => {
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('id', newId);
        history.replace({ search: newSearchParams.toString() });
    };
    const handleClick = (id) => {
        setId(id);
        updateUrl(id);
    };
    useEffect(() => {
        articlePageListApi({pageIndex:1,pageSize:10}).then(({data})=>{
            setList(data);
        });
    }, []);
    useEffect(() => {
        articleGetApi({id}).then(({data})=>{
            setData(data);
        });
    }, [id]);
    if (shouldRender) {
        return (
            <Root>
                <BgOrange1/>
                <BgOrange2/>
                <Content>
                    <Left>
                        {data&&<>
                        <Title>{data?data.title:''}</Title>
                        <Source>{t('404')}：{data?data.source:''} {data?toDateStr(data.publishTime):''}</Source>
                        <Text dangerouslySetInnerHTML={{__html:data?data.content:''}}></Text>
                        </>}
                    </Left>
                    <Right>
                        <div className='title'>{t('403')}</div>
                        {
                            list.map((item,idx)=>(
                                <Row key={idx} onClick={()=>handleClick(item.id)}>{item.title}</Row>
                            ))
                        }
                    </Right>
                </Content>
            </Root>
        )
    }
    return (
        <Root>
            <BgOrange1/>
            {data&&<ContentH5>
                <Title>{data?data.title:''}</Title>
                <Source>{t('404')}：{data?data.source:''} {data?toDateStr(data.publishTime):''}</Source>
                <Text dangerouslySetInnerHTML={{__html:data?data.content:''}}></Text>
            </ContentH5>}
        </Root>
    )
}

const Root = styled.div`
position: relative;
overflow: hidden;
min-height: 100vh;
`

const ContentH5 = styled.div`
padding: 85px 25px 50px;
`

const BgOrange1 = styled.div`
position: absolute;
top: 65px;
right: 0;
width: 258.987px;
height: 128.038px;
transform: rotate(26.53deg);
border-radius: 732px;
opacity: 0.2;
background: #FF8B81;
filter: blur(80px);
${({ theme }) => theme.mediaQueries.sm}{
top: 135px;
width: 732px;
height: 212px;
transform: rotate(29.57deg);
};
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
const Content = styled.div`
position: relative;
padding: 210px 122px 300px 155px;
display: flex;
justify-content: space-between;
gap: 80px;
`
const Left = styled.div`
flex: 1;
`
const Title = styled.div`
font-size: 21px;
font-weight: 600;
${({ theme }) => theme.mediaQueries.sm}{
font-size: 36px;
};
`
const Source = styled.div`
margin-top: 22px;
font-size: 13px;
opacity: 0.6;
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 34px;
font-size: 18px;
};
`
const Text = styled.div`
margin-top: 22px;
font-size: 14px;
line-height: 21px;
img {
max-width: 100%;
}
${({ theme }) => theme.mediaQueries.sm}{
margin-top: 34px;
font-size: 18px;
line-height: 32px;
};
`
const Right = styled.div`
width: 350px;
min-width: 350px;
max-width: 350px;
flex: 1 0 0;
border-radius: 18px;
background: #241F2D;
padding: 34px 40px 90px;
.title {
margin-bottom: 26px;
font-size: 24px;
font-weight: 600;
line-height: 32px;
}
`
const Row = styled.div`
cursor: pointer;
margin-top: 20px;
font-size: 18px;
font-weight: 500;
line-height: 32px;
position: relative;
padding-left: 20px;
&:before {
    content: '';
    position: absolute;
    left: 5px;
    top: 14px;
    width: 4px;
    height: 4px;
    background-color: ${({theme})=>theme.colors.text};
    border-radius: 50%;
}
`
