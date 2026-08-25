import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { getconfigByKeyApi, articlePageListApi } from "../../api";
import { useLanguage } from "../../LanguageContext";

export default function Index() {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    useEffect(() => {
        if (videoUrl) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [videoUrl]);
    const dropdownRef = useRef(null);
    const isHoverDevice = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    const [playerList, setPlayerList] = useState([]);
    useEffect(() => {
        articlePageListApi({pageIndex:1,pageSize:10,articleTypes:[46,47,48]}).then(({data})=>{
            setPlayerList(data);
        });
    }, [language]);
    const [highlightsList, setHighlightsList] = useState([]);
    useEffect(() => {
        articlePageListApi({pageIndex:1,pageSize:10,articleTypes:[49,50,51]}).then(({data})=>{
            setHighlightsList(data);
        });
    }, [language]);
    const [landingStats, setLandingStats] = useState([]);
    useEffect(() => {
        getconfigByKeyApi({keyList: ['LANDING_STATS']}).then(({data})=>{
            try {
                const parsedStats = JSON.parse(data.LANDING_STATS || '[]');
                setLandingStats(parsedStats);
            } catch (error) {
                console.error('Error parsing LANDING_STATS:', error);
            }
        });
    }, [language]);
    return (
        <Root>
            {/* Hero */}
            <Hero>
                <GridBg></GridBg>
                <HeroContent>
                    <Kicker>{t('10101')}</Kicker>
                    <Title>{t('10102')}<br/><Grad>{t('10103')}</Grad></Title>
                    <Lead>{t('10104')}</Lead>
                    <Actions>
                        <PrimaryBtn as="button" onClick={() => scrollTo('review')}>{t('10105')}</PrimaryBtn>
                        <SecondaryBtn as="button" onClick={() => scrollTo('contact')}>{t('10106')}</SecondaryBtn>
                    </Actions>
                </HeroContent>
            </Hero>

            {/* 選手風采 */}
            <SectionDark id="players">
                <Wrap>
                    <Head>
                        <div>
                            <KickerPurple>{t('10107')}</KickerPurple>
                        <SectionTitle>{t('10108')}</SectionTitle>
                        </div>
                        <IntroText>{t('10109')}</IntroText>
                    </Head>
                    <Players>
                        {
                            playerList.map((player) => (
                                <PlayerCard key={player.id} backgroundImage={player.backgroundImage} onClick={() => player.linkUrl && window.open(player.linkUrl, '_blank', 'noopener,noreferrer')} style={{ cursor: player.linkUrl ? 'pointer' : 'default' }}>
                                    <Person thumbnail={player.thumbnail}></Person>
                                    <PlayerInfo>
                                        <Tag>{player.flag}</Tag>
                                        <h3>{player.title}</h3>
                                        <p>{player.remark}</p>
                                    </PlayerInfo>
                                </PlayerCard>
                            ))
                        }
                    </Players>
                </Wrap>
            </SectionDark>

            {/* 精彩回顧 */}
            <SectionReview id="review">
                <Wrap>
                    <Head>
                        <div>
                            <Kicker>{t('10110')}</Kicker>
                        <SectionTitle>{t('10111')}</SectionTitle>
                        </div>
                        <IntroText>{t('10112')}</IntroText>
                    </Head>
                    <Videos>
                        {
                            highlightsList.map((highlight,idx) => (
                                <VideoCard key={highlight.id} large={idx === 0} backgroundImage={highlight.thumbnail} onClick={() => setVideoUrl(highlight.linkUrl)} style={{ cursor: 'pointer' }}>
                                    <small>{highlight.flag}</small>
                                    <h3>{highlight.title}</h3>
                                    <p>{highlight.remark}</p>
                                </VideoCard>
                            ))
                        }
                    </Videos>
                </Wrap>
            </SectionReview>

            {/* 每週三，都有新的故事發生 */}
            <Section id="about">
                <Wrap>
                    <AboutGrid>
                        <About>
                            <Kicker>{t('10113')}</Kicker>
                            <SectionTitle>{t('10114')}<br/>{t('10115')}</SectionTitle>
                            <p>{t('10116')}</p>
                        </About>
                        <Stats>
                            {
                                landingStats.map((stat, idx) => (
                                    <Stat key={idx} offset={idx === 1 || idx === 2}>
                                        <strong>{stat.value}</strong>
                                        <span>{stat.label}</span>
                                    </Stat>
                                ))
                            }
                        </Stats>
                    </AboutGrid>
                </Wrap>
            </Section>

            {/* JOIN CRAZY WEDNESDAY */}
            <Contact id="contact">
                <Wrap>
                    <Kicker style={{color:'white'}}>{t('10117')}</Kicker>
                    <ContactTitle>{t('10118')}<br/>{t('10119')}</ContactTitle>
                    <p>{t('10120')}</p>
                    <ContactActions>
                        <DropdownWrapper
                            ref={dropdownRef}
                            onMouseEnter={isHoverDevice ? () => setShowDropdown(true) : undefined}
                            onMouseLeave={isHoverDevice ? () => setShowDropdown(false) : undefined}
                        >
                            <Btn onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}>{t('10121')}</Btn>
                            {showDropdown && (
                                <DropdownMenu>
                                    <DropdownItem as="a" href="https://t.me/ebahuhansan" target="_blank" rel="noopener noreferrer">{t('10125')}</DropdownItem>
                                    <DropdownItem as="a" href="https://t.me/johantsao" target="_blank" rel="noopener noreferrer">{t('10126')}</DropdownItem>
                                </DropdownMenu>
                            )}
                        </DropdownWrapper>
                        <BtnGhost as="a" href="https://x.com/chipchipgamezh" target="_blank" rel="noopener noreferrer">{t('10122')}</BtnGhost>
                        <BtnGhost as="a" href="https://t.me/+sj3RM2yDbfVjZWRh" target="_blank" rel="noopener noreferrer">{t('10123')}</BtnGhost>
                        <BtnGhost as="a" href="https://chipchip.io/download" target="_blank" rel="noopener noreferrer">{t('10124')}</BtnGhost>
                    </ContactActions>
                </Wrap>
            </Contact>
            {videoUrl && (
                <VideoModalOverlay onClick={() => setVideoUrl(null)}>
                    <VideoModalContent onClick={(e) => e.stopPropagation()}>
                        <VideoCloseBtn onClick={() => setVideoUrl(null)}>✕</VideoCloseBtn>
                        <VideoIframeWrapper>
                            <iframe
                                width="100%"
                                height="100%"
                                src={videoUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </VideoIframeWrapper>
                    </VideoModalContent>
                </VideoModalOverlay>
            )}
        </Root>
    )
}

const Root = styled.div`
position: relative;
min-height: 100vh;
background: #08070d;
color: #f7f5ff;
overflow: hidden;
font-family: Inter, "Microsoft JhengHei", Arial, sans-serif;
`

const GridBg = styled.div`
position: absolute;
inset: 0;
background-image: linear-gradient(#7a57ef14 1px, transparent 1px), linear-gradient(90deg, #7a57ef14 1px, transparent 1px);
background-size: 42px 42px;
`

const Wrap = styled.div`
width: 1180px;
margin: auto;
max-width: 100%;
padding: 0 20px;
`

/* Hero */
const Hero = styled.header`
height: 650px;
position: relative;
overflow: hidden;
background: url(${require('../../assets/home/h5/bg1.png').default}) center / cover no-repeat;
${({ theme }) => theme.mediaQueries.sm}{
    background-image: url(${require('../../assets/home/bg1.png').default});
}
`

const HeroContent = styled.div`
position: relative;
z-index: 2;
padding-top: 120px;
width: 1180px;
margin: auto;
max-width: 100%;
padding-left: 20px;
padding-right: 20px;
${({ theme }) => theme.mediaQueries.sm}{
padding-top: 200px;
};
`

const Kicker = styled.div`
font-size: 12px;
letter-spacing: 2px;
font-weight: 900;
color: #6032ad;
&:before {
    content: "";
    display: inline-block;
    width: 24px;
    height: 3px;
    background: #ff8a06;
    margin-right: 10px;
    vertical-align: middle;
}
`

const KickerPurple = styled(Kicker)`
color: #bcaeff;
`

const Title = styled.h1`
font-size: 82px;
line-height: 0.95;
letter-spacing: -6px;
margin: 22px 0;
color: #fff;
`

const Grad = styled.span`
background: linear-gradient(90deg, #6f52ff, #ff62f9, #ff8a06);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
`

const Lead = styled.p`
font-size: 18px;
line-height: 1.8;
color: #bdb7c8;
width: 650px;
max-width: 100%;
`

const Actions = styled.div`
display: flex;
gap: 12px;
margin-top: 28px;
`

const PrimaryBtn = styled.button`
padding: 12px 20px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
color: #fff;
border: none;
cursor: pointer;
${({ theme }) => theme.mediaQueries.sm}{
    padding: 15px 24px;
    font-size: 18px;
}
`

const SecondaryBtn = styled.button`
border-radius: 32px;
font-size: 14px;
font-weight: 600;
padding: 12px 20px;
border: 1px solid #75F6A3;
background: rgba(255, 255, 255, 0.10);
color: #fff;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
${({ theme }) => theme.mediaQueries.sm}{
    padding: 15px 24px;
    font-size: 18px;
}
`

/* Sections */
const SectionDark = styled.section`
padding: 50px 0;
background: #100e17;
color: white;
${({ theme }) => theme.mediaQueries.sm}{
    padding: 95px 0;
}
`

const SectionReview = styled.section`
padding: 50px 0;
background: #0d0b13;
${({ theme }) => theme.mediaQueries.sm}{
    padding: 95px 0;
}
`

const Section = styled.section`
padding: 50px 0;
background: #09080e;
${({ theme }) => theme.mediaQueries.sm}{
    padding: 95px 0;
}
`

const Head = styled.div`
display: flex;
align-items: end;
margin-bottom: 34px;
flex-wrap: wrap;
gap: 20px;
`

const SectionTitle = styled.h2`
font-size: 28px;
letter-spacing: -1px;
margin: 8px 0 0;
color: #fff;
${({ theme }) => theme.mediaQueries.sm}{
    font-size: 44px;
    letter-spacing: -2px;
}
`

const IntroText = styled.p`
margin-left: auto;
color: #9e98a9;
width: 450px;
max-width: 100%;
line-height: 1.7;
`

/* Players */
const Players = styled.div`
display: flex;
gap: 16px;
overflow-x: auto;
padding-bottom: 10px;
::-webkit-scrollbar { height: 6px; }
::-webkit-scrollbar-thumb { background: #3d3648; border-radius: 3px; }
`

const PlayerCard = styled.article`
flex: 0 0 272px;
aspect-ratio: 3 / 4;
border-radius: 22px;
position: relative;
overflow: hidden;
background: url('${p => p.backgroundImage}') center / cover no-repeat;
`

const Person = styled.div`
position: absolute;
width: 100%;
height: 100%;
background: url('${p => p.thumbnail}') center / cover no-repeat, linear-gradient(150deg, #251a47, #6f52ff);
left: 0;
top: 0;
`

const PlayerInfo = styled.div`
position: absolute;
inset: auto 0 0;
padding: 55px 20px 20px;
background: linear-gradient(transparent, #09070feF);
h3 {
    font-size: 23px;
    margin: 13px 0 5px;
}
`

const Tag = styled.span`
font-size: 11px;
font-weight: 900;
padding: 5px 9px;
background: #ffffff25;
border-radius: 99px;
`

/* Videos */
const Videos = styled.div`
display: grid;
grid-template-columns: 1.65fr 1fr 1fr;
grid-auto-rows: 230px;
gap: 16px;
@media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 150px;
}
`

const VideoCard = styled.article`
border-radius: 20px;
padding: 22px;
display: flex;
flex-direction: column;
justify-content: flex-end;
position: relative;
color: white;
background: ${p => p.backgroundImage ? `url('${p.backgroundImage}') center / cover no-repeat, radial-gradient(circle at 65% 30%, #ff62f955, transparent 35%), linear-gradient(150deg, ${p.color1 || '#160c2f'}, ${p.color2 || '#6032ad'})` : `radial-gradient(circle at 65% 30%, #ff62f955, transparent 35%), linear-gradient(150deg, ${p.color1 || '#160c2f'}, ${p.color2 || '#6032ad'})`};
box-shadow: 0 24px 60px #0005;
${p => p.large && 'grid-row: span 2;'}
&:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60%;
    background: linear-gradient(transparent, #09070feF);
    border-radius: 0 0 20px 20px;
    pointer-events: none;
    z-index: 1;
}
&:before {
    content: "▶";
    position: absolute;
    left: 22px;
    top: 22px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #fff;
    color: #6f52ff;
    font-size: 11px;
}
&:hover:before {
    background: #6f52ff;
    color: #fff;
    transform: scale(1.1);
}
&:before {
    transition: all 0.2s ease;
}
small { font-weight: 850; font-size: 11px; position: relative; z-index: 2; }
h3 { font-size: 16px; margin: 8px 0 3px; position: relative; z-index: 2; }
p { font-size: 12px; color: #e3deea; margin: 0; position: relative; z-index: 2; }
${p => p.large && 'h3 { font-size: 21px; }'}
${({ theme }) => theme.mediaQueries.sm}{
    &:before { width: 46px; height: 46px; font-size: 14px; }
    h3 { font-size: 21px; }
    ${p => p.large && 'h3 { font-size: 31px; }'}
}
`

const VideoModalOverlay = styled.div`
position: fixed;
inset: 0;
background: rgba(0, 0, 0, 0.85);
z-index: 9999;
display: flex;
align-items: center;
justify-content: center;
animation: fadeIn 0.2s ease;
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
`

const VideoModalContent = styled.div`
position: relative;
width: 90%;
max-width: 900px;
aspect-ratio: 16 / 9;
border-radius: 16px;
overflow: hidden;
box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
animation: scaleIn 0.25s ease;
@keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
`

const VideoCloseBtn = styled.button`
position: absolute;
top: -44px;
right: 0;
width: 36px;
height: 36px;
border-radius: 50%;
border: none;
background: rgba(255, 255, 255, 0.15);
color: #fff;
font-size: 16px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
&:hover {
    background: rgba(255, 255, 255, 0.3);
}
`

const VideoIframeWrapper = styled.div`
width: 100%;
height: 100%;
background: #000;
iframe {
    display: block;
}
`

/* About */
const AboutGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 80px;
align-items: center;
@media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
}
`

const About = styled.div`
p { color: #aaa4b5; line-height: 1.9; }
`

const Stats = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 14px;
min-width: 0;
`

const Stat = styled.div`
background: #121019;
border: 1px solid #2b2633;
border-radius: 22px;
padding: 30px;
min-height: 150px;
min-width: 0;
box-shadow: 0 18px 55px #0004;
${p => p.offset && 'transform: translateY(34px);'}
strong {
    font-size: 32px;
    display: block;
    background: linear-gradient(90deg, #6f52ff, #ff62f9);
    -webkit-background-clip: text;
    color: transparent;
}
${({ theme }) => theme.mediaQueries.sm}{
    strong { font-size: 46px; }
}
span { font-size: 13px; color: #777384; }
`

/* Contact */
const Contact = styled.section`
padding: 50px 0;
${({ theme }) => theme.mediaQueries.sm}{
    padding: 95px 0;
}
background: radial-gradient(circle at 84% 38%, #ff62f933, transparent 25%), linear-gradient(120deg, #1b102c, #4b2baa 55%, #261132);
color: #fff;
position: relative;
overflow: hidden;
&:after {
    content: "♠";
    position: absolute;
    font-size: 460px;
    right: 20px;
    top: -150px;
    color: #ffffff0d;
}
${Wrap} { position: relative; z-index: 2; }
p { color: #e5def3; width: 650px; max-width: 100%; line-height: 1.7; }
`

const ContactTitle = styled.h2`
font-size: 36px;
margin: 12px 0;
${({ theme }) => theme.mediaQueries.sm}{
    font-size: 54px;
}
`

const ContactActions = styled.div`
display: flex;
gap: 12px;
margin-top: 30px;
flex-wrap: wrap;
`

const Btn = styled.button`
padding: 12px 20px;
border-radius: 32px;
background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
font-size: 14px;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
color: #fff;
border: none;
cursor: pointer;
${({ theme }) => theme.mediaQueries.sm}{
    padding: 15px 24px;
    font-size: 18px;
}
`

const BtnGhost = styled.button`
border-radius: 32px;
font-size: 14px;
font-weight: 600;
padding: 12px 20px;
border: 1px solid #75F6A3;
background: rgba(255, 255, 255, 0.10);
color: #fff;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
${({ theme }) => theme.mediaQueries.sm}{
    padding: 15px 24px;
    font-size: 18px;
}
`

const DropdownWrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
`

const DropdownMenu = styled.div`
position: absolute;
top: 100%;
background: #1a1726;
border: 1px solid #75F6A3;
border-radius: 12px;
overflow: hidden;
min-width: 120px;
z-index: 10;
box-shadow: 0 8px 30px rgba(0,0,0,0.4);
${({ theme }) => theme.mediaQueries.sm}{
    min-width: 150px;
    border-radius: 16px;
}
`

const DropdownItem = styled.a`
display: block;
padding: 10px 16px;
color: #fff;
font-size: 14px;
cursor: pointer;
text-decoration: none;
&:hover {
background: rgba(117, 246, 163, 0.15);
}
& + & {
border-top: 1px solid #2b2633;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 10px 15px;
font-size: 16px;
}
`
