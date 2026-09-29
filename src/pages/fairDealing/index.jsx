import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const COPY = {
    zh_CN: {
        eyebrow: 'CSRP · Collective Synchronic Randomness Protocol',
        titleBefore: '全桌的每一次行动，',
        titleAccent: '都加入下一张牌。',
        heroLead: 'CSRP 将全场玩家上一轮的',
        heroStrong1: '思考时间',
        heroMid: '与',
        heroStrong2: '下注尺寸',
        heroEnd: '作为随机因子，再叠加系统随机算法，即时抽取下一张牌。随机不只来自代码，也加入真实牌局中的物理世界扰动。',
        steps: '3 个步骤看懂',
        stageLabel: '即时抽牌动画示意',
        howKicker: 'HOW IT WORKS',
        howTitle: ['两层随机叠加，', '生成下一张牌。'],
        howLead: '第一层来自全桌玩家真实发生的行为与时间差；第二层来自系统安全随机源。两者融合后，才决定下一张牌。',
        pipes: [
            {
                no: '01 / PHYSICAL INPUT',
                title: '玩家行为形成随机扰动',
                body: '上一轮全桌玩家的思考时间（ElapsedMs）与下注尺寸（Amount）按先后顺序写入事件流。',
                accent: '#7a57ef',
            },
            {
                no: '02 / SYSTEM RANDOM',
                title: '系统随机源加入底层熵',
                body: '每次抽牌，系统再由操作系统 CSPRNG 取得全新 32 bytes 随机数，只用一次、用后即弃。',
                accent: '#75f0ae',
            },
            {
                no: '03 / FUSION',
                title: '两层因子融合抽牌',
                body: '行为事件摘要与系统随机数经 HMAC-SHA256 叠加，再以拒绝采样公平映射到剩余牌堆。',
                accent: '#ff8a06',
            },
        ],
        events: [
            ['Seat 2 · 思考 1,247 ms', 'BET 120'],
            ['Seat 4 · 思考 3,891 ms', 'CALL 120'],
            ['Seat 6 · 思考 742 ms', 'RAISE 360'],
        ],
        entropyLabel: '密码学安全随机数示意',
        hash2: ['SystemRandom · 32 bytes', '每张更新 · 不预先生成'],
        hash3: ['玩家行为因子 ＋ 系统随机因子', 'HMAC-SHA256 → 569d…04c4', '52 张剩余牌 → 2♦'],
        truthLabel: '核心：',
        truth: '算法不只依赖代码随机源，还叠加全场玩家在真实牌局中产生的时间差与下注差异，让下一张牌由两层随机共同决定。',
        timeKicker: 'ONE ROUND → NEXT CARD',
        timeTitle: ['上一轮真实行为，', '参与下一张牌。'],
        timeLead: '玩家无法复制完全相同的思考毫秒数与下注组合；每一轮行为都形成新的扰动，并在下一次抽牌前与系统随机源融合。',
        tabLabel: '切换说明层级',
        tabPlayer: '玩家视角',
        tabTech: '技术视角',
        moments: [
            {
                stage: '01 · PLAYER ACTIONS',
                title: '全桌完成一轮行动',
                body: '每位玩家的思考耗时、下注金额与行动顺序被即时记录。',
                tech: ['ElapsedMs + Amount', 'Seat + ActionType', 'EventNo 依序递增'],
                cards: ['8♣', 'K♥'],
            },
            {
                stage: '02 · TRANSCRIPT',
                title: '形成事件流摘要',
                body: '上一轮全场行为被规范化，生成唯一的公开事件摘要。',
                tech: ['Canonical Serialization', 'SHA-256(Event Stream)', '→ TranscriptDigest'],
                cards: ['A♣', '7♥'],
            },
            {
                stage: '03 · SYSTEM RANDOM',
                title: '加入系统随机因子',
                body: '抽牌当下产生一组全新秘密随机数，与事件摘要共同进入算法。',
                tech: ['SystemRandom · 32 bytes', 'CSPRNG · one-time use', 'HMAC-SHA256 key'],
                cards: ['4♦'],
            },
            {
                stage: '04 · NEXT CARD',
                title: '抽出下一张牌',
                body: '两层随机因子融合，经无偏映射后选中牌堆位置，下一张牌才正式产生。',
                tech: ['FusionOutput', 'Reject Sampling', 'DeckIndex = value mod size'],
                cards: ['2♦'],
            },
        ],
        whyKicker: 'WHY IT MATTERS',
        whyTitle: '两层随机，达到真正随机。',
        points: [
            ['不只依赖单一代码随机源', '系统随机算法之外，再加入真实牌局的时间与下注扰动。'],
            ['全场玩家共同产生因子', '不是某一位玩家，而是上一轮全桌行为共同构成事件流。'],
            ['每次抽牌重新计算', '行为摘要与系统随机数都会更新，下一张牌逐张即时生成。'],
            ['无法预制完整未来牌序', '未来牌面不会在开局时整副保存，降低提前取得牌序的可能。'],
        ],
        githubBefore: '查看技术详情请前往 ',
        githubLink: '官方 GitHub',
        githubAfter: '',
    },
    en: {
        eyebrow: 'CSRP · Collective Synchronic Randomness Protocol',
        titleBefore: 'Every action at the table',
        titleAccent: 'shapes the next card.',
        heroLead: "CSRP uses every player's previous-round ",
        heroStrong1: 'decision time',
        heroMid: ' and ',
        heroStrong2: 'bet size',
        heroEnd: ' as random factors, then combines them with system randomness to draw the next card in real time. Randomness comes not only from code, but also from physical-world perturbations created by live play.',
        steps: '3 steps to understand',
        stageLabel: 'Real-time card draw animation',
        howKicker: 'HOW IT WORKS',
        howTitle: ['Two layers of randomness.', 'One next card.'],
        howLead: 'The first layer comes from real player actions and timing differences across the table. The second comes from a secure system random source. Only after they are fused is the next card selected.',
        pipes: [
            {
                no: '01 / PHYSICAL INPUT',
                title: 'Player actions create random perturbations',
                body: "Every player's previous-round decision time (ElapsedMs) and bet size (Amount) are written to the event stream in order.",
                accent: '#7a57ef',
            },
            {
                no: '02 / SYSTEM RANDOM',
                title: 'System randomness adds core entropy',
                body: 'For every draw, the system obtains a fresh 32-byte value from the operating system CSPRNG. It is used once, then discarded.',
                accent: '#75f0ae',
            },
            {
                no: '03 / FUSION',
                title: 'Fuse both layers and draw',
                body: 'The action-event digest and system random value are combined through HMAC-SHA256, then rejection sampling maps the result fairly to the remaining deck.',
                accent: '#ff8a06',
            },
        ],
        events: [
            ['Seat 2 · Think 1,247 ms', 'BET 120'],
            ['Seat 4 · Think 3,891 ms', 'CALL 120'],
            ['Seat 6 · Think 742 ms', 'RAISE 360'],
        ],
        entropyLabel: 'Cryptographically secure random number visualization',
        hash2: ['SystemRandom · 32 bytes', 'Fresh for every card · Never pre-generated'],
        hash3: ['Player action factor + system random factor', 'HMAC-SHA256 → 569d…04c4', '52 cards remaining → 2♦'],
        truthLabel: 'Core idea:',
        truth: 'the algorithm does not rely on a code-only random source. It also incorporates timing and bet-size differences generated by everyone at the live table, so two layers of randomness determine the next card together.',
        timeKicker: 'ONE ROUND → NEXT CARD',
        timeTitle: ['Real actions from one round', 'shape the next card.'],
        timeLead: 'Players cannot reproduce the exact same millisecond-level decision times and bet combinations. Every round creates a new perturbation that is fused with system randomness before the next draw.',
        tabLabel: 'Switch explanation level',
        tabPlayer: 'Player view',
        tabTech: 'Technical view',
        moments: [
            {
                stage: '01 · PLAYER ACTIONS',
                title: 'The table completes one round',
                body: "Each player's decision time, bet amount, and action order are recorded in real time.",
                tech: ['ElapsedMs + Amount', 'Seat + ActionType', 'EventNo increments in order'],
                cards: ['8♣', 'K♥'],
            },
            {
                stage: '02 · TRANSCRIPT',
                title: 'Create the event-stream digest',
                body: "All actions from the previous round are canonicalized into one unique public digest.",
                tech: ['Canonical Serialization', 'SHA-256(Event Stream)', '→ TranscriptDigest'],
                cards: ['A♣', '7♥'],
            },
            {
                stage: '03 · SYSTEM RANDOM',
                title: 'Add the system random factor',
                body: 'A fresh secret random value is created at draw time and enters the algorithm together with the event digest.',
                tech: ['SystemRandom · 32 bytes', 'CSPRNG · one-time use', 'HMAC-SHA256 key'],
                cards: ['4♦'],
            },
            {
                stage: '04 · NEXT CARD',
                title: 'Draw the next card',
                body: 'The two random factors are fused, then an unbiased mapping selects a deck position. Only then does the next card exist.',
                tech: ['FusionOutput', 'Rejection Sampling', 'DeckIndex = value mod size'],
                cards: ['2♦'],
            },
        ],
        whyKicker: 'WHY IT MATTERS',
        whyTitle: 'Two layers. True randomness.',
        points: [
            ['Not dependent on a single code-only source', 'Real-table timing and bet-size perturbations are added to system randomness.'],
            ['The entire table contributes factors', "The event stream is formed by the previous round's actions from every player—not one individual."],
            ['Recalculated for every draw', 'Both the action digest and system random value update as every next card is generated just in time.'],
            ['No prebuilt future deck order', 'Future cards are not stored as a complete sequence at the start of the hand.'],
        ],
        githubBefore: 'For technical details, visit the ',
        githubLink: 'official GitHub',
        githubAfter: '.',
    },
}

const BARS = ['31%', '78%', '48%', '92%', '38%', '68%', '54%', '86%', '44%', '72%']
const BAR_DELAY = ['-.3s', '-.8s', '-.1s', '-1.1s', '-.7s', '-.2s', '-1.4s', '-.5s', '-1s', '-.4s']
const GITHUB = 'https://github.com/chipchiptw/CHIPCHIPGAME'

function Arrow() {
    return (
        <div className="pipe-arrow" aria-hidden="true">
            <svg viewBox="0 0 40 18">
                <path d="M1 9h34M28 2l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        </div>
    )
}

export default function FairDealing() {
    const { i18n } = useTranslation()
    const lang = String(i18n.language || '').toLowerCase().startsWith('zh') ? 'zh_CN' : 'en'
    const c = COPY[lang]
    const rootRef = useRef(null)
    const [techMode, setTechMode] = useState(false)
    const [shown, setShown] = useState({})

    useEffect(() => {
        const root = rootRef.current
        if (!root) return undefined
        const nodes = root.querySelectorAll('[data-reveal]')
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return
                const id = entry.target.getAttribute('data-reveal')
                setShown((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
                io.unobserve(entry.target)
            })
        }, { threshold: 0.12 })
        nodes.forEach((node) => io.observe(node))
        return () => io.disconnect()
    }, [])

    const reveal = (id) => `reveal${shown[id] ? ' visible' : ''}`

    return (
        <Page ref={rootRef}>
            <section className="wrap hero" id="top">
                <div className={`hero-copy ${reveal('hero')}`} data-reveal="hero">
                    <span className="eyebrow">{c.eyebrow}</span>
                    <h1>
                        {c.titleBefore}
                        <br />
                        <span className="gradient-text">{c.titleAccent}</span>
                    </h1>
                    <p>
                        {c.heroLead}
                        <strong>{c.heroStrong1}</strong>
                        {c.heroMid}
                        <strong>{c.heroStrong2}</strong>
                        {c.heroEnd}
                    </p>
                    <div className="hero-actions">
                        <a className="btn btn-primary" href="#how">{c.steps}</a>
                    </div>
                </div>
                <div
                    className={`deal-stage ${reveal('stage')}`}
                    data-reveal="stage"
                    id="dealStage"
                    aria-label={c.stageLabel}
                >
                    <svg className="spade" viewBox="0 0 360 390" aria-hidden="true">
                        <defs>
                            <linearGradient id="spadeFill" x1="0" y1="0" x2="1" y2="1">
                                <stop stopColor="#6f52ff" stopOpacity=".9" />
                                <stop offset=".5" stopColor="#75f0ae" stopOpacity=".55" />
                                <stop offset="1" stopColor="#6032ad" stopOpacity=".8" />
                            </linearGradient>
                            <linearGradient id="spadeStroke" x1="0" y1="0" x2="1" y2="1">
                                <stop stopColor="#ff62f9" />
                                <stop offset=".5" stopColor="#75f0ae" />
                                <stop offset="1" stopColor="#6f52ff" />
                            </linearGradient>
                        </defs>
                        <path d="M180 20C148 68 55 123 55 211c0 60 66 84 106 43-5 55-24 82-59 108h156c-35-26-54-53-59-108 40 41 106 17 106-43 0-88-93-143-125-191Z" />
                    </svg>
                    <div className="orbit" />
                    <div className="card c1"><span>A<small>♠</small></span><span className="suit">♠</span></div>
                    <div className="card red c2"><span>K<small>♥</small></span><span className="suit">♥</span></div>
                    <div className="card red c3"><span>2<small>♦</small></span><span className="suit">♦</span></div>
                    <div className="signal"><i />DRAW #01 · JUST IN TIME</div>
                </div>
            </section>

            <section className="section" id="how">
                <div className="wrap">
                    <div className={`section-head ${reveal('how')}`} data-reveal="how">
                        <div>
                            <span className="kicker">{c.howKicker}</span>
                            <h2>{c.howTitle[0]}<br />{c.howTitle[1]}</h2>
                        </div>
                        <p>{c.howLead}</p>
                    </div>
                    <div className={`pipeline ${reveal('pipe')}`} data-reveal="pipe">
                        <article className="pipe-card" style={{ '--accent': c.pipes[0].accent }}>
                            <span className="pipe-no">{c.pipes[0].no}</span>
                            <h3>{c.pipes[0].title}</h3>
                            <p>{c.pipes[0].body}</p>
                            <div className="event-stack">
                                {c.events.map(([label, code]) => (
                                    <div className="event" key={code}>
                                        <span className="dot" />
                                        <b>{label}</b>
                                        <code>{code}</code>
                                    </div>
                                ))}
                            </div>
                        </article>
                        <Arrow />
                        <article className="pipe-card" style={{ '--accent': c.pipes[1].accent }}>
                            <span className="pipe-no">{c.pipes[1].no}</span>
                            <h3>{c.pipes[1].title}</h3>
                            <p>{c.pipes[1].body}</p>
                            <div className="entropy" aria-label={c.entropyLabel}>
                                {BARS.map((height, index) => (
                                    <i key={height + index} style={{ '--h': height, '--d': BAR_DELAY[index] }} />
                                ))}
                            </div>
                            <div className="hash">{c.hash2[0]}<br />{c.hash2[1]}</div>
                        </article>
                        <Arrow />
                        <article className="pipe-card" style={{ '--accent': c.pipes[2].accent }}>
                            <span className="pipe-no">{c.pipes[2].no}</span>
                            <h3>{c.pipes[2].title}</h3>
                            <p>{c.pipes[2].body}</p>
                            <div className="index-ring"><span>01<small>DECK INDEX</small></span></div>
                            <div className="hash">
                                {c.hash3[0]}<br />{c.hash3[1]}<br />{c.hash3[2]}
                            </div>
                        </article>
                    </div>
                    <div className={`truth-strip ${reveal('truth')}`} data-reveal="truth">
                        <span aria-hidden="true">◆</span>
                        <span><b>{c.truthLabel}</b> {c.truth}</span>
                    </div>
                </div>
            </section>

            <section className="section" id="timeline">
                <div className="wrap">
                    <div className={`section-head ${reveal('time')}`} data-reveal="time">
                        <div>
                            <span className="kicker">{c.timeKicker}</span>
                            <h2>{c.timeTitle[0]}<br />{c.timeTitle[1]}</h2>
                        </div>
                        <p>{c.timeLead}</p>
                    </div>
                    <div className={`timeline-shell ${reveal('line')}${techMode ? ' tech-mode' : ''}`} data-reveal="line">
                        <div className="timeline-tabs" role="group" aria-label={c.tabLabel}>
                            <button className={`tab${!techMode ? ' active' : ''}`} type="button" onClick={() => setTechMode(false)}>{c.tabPlayer}</button>
                            <button className={`tab${techMode ? ' active' : ''}`} type="button" onClick={() => setTechMode(true)}>{c.tabTech}</button>
                        </div>
                        <div className="timeline">
                            {c.moments.map((moment) => (
                                <article className="moment" key={moment.stage}>
                                    <span className="stage">{moment.stage}</span>
                                    <h3>{moment.title}</h3>
                                    <p>{moment.body}</p>
                                    <div className="tech">
                                        {moment.tech.map((line) => <span key={line}>{line}<br /></span>)}
                                    </div>
                                    <div className="mini-cards">
                                        {moment.cards.map((card) => <span className="mini-card" key={card}>{card}</span>)}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="verify">
                <div className="wrap proof-grid">
                    <article className={`audit ${reveal('audit')}`} data-reveal="audit">
                        <span className="kicker">{c.whyKicker}</span>
                        <h2 className="why-title">{c.whyTitle}</h2>
                        <ul className="audit-list">
                            {c.points.map(([title, body], index) => (
                                <li key={title}>
                                    <span className="check">0{index + 1}</span>
                                    <div><b>{title}</b><span>{body}</span></div>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>

            <div className="github-cta">
                {c.githubBefore}
                <a href={GITHUB} target="_blank" rel="noreferrer">{c.githubLink}</a>
                {c.githubAfter}
            </div>
        </Page>
    )
}

const Page = styled.main`
    --bg: #0b0b0d;
    --line: rgba(255, 255, 255, .11);
    --text: #f8f8fa;
    --muted: #b7b7c2;
    --violet: #6f52ff;
    --purple: #7a57ef;
    --pink: #ff62f9;
    --orange: #ff8a06;
    --mint: #75f0ae;
    --radius: 24px;
    --shadow: 0 24px 80px rgba(0, 0, 0, .32);
    background: var(--bg);
    color: var(--text);
    font-family: Inter, "PingFang SC", "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.65;
    overflow-x: hidden;

    * { box-sizing: border-box; }
    button, a { font: inherit; }
    a { text-decoration: none; }
    h1, h2, h3, p { margin: 0; }

    .wrap { width: min(1160px, calc(100% - 40px)); margin: auto; }
    .hero {
        position: relative;
        min-height: 680px;
        display: grid;
        grid-template-columns: 1.04fr .96fr;
        align-items: center;
        gap: 64px;
        padding: 180px 0 86px;
    }
    .hero:before {
        content: "";
        position: absolute;
        inset: 6% -30% -8% 33%;
        background:
            radial-gradient(circle at 47% 45%, rgba(80, 244, 164, .25), transparent 26%),
            radial-gradient(circle at 55% 48%, rgba(111, 82, 255, .5), transparent 47%);
        filter: blur(26px);
        pointer-events: none;
    }
    .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #d9d5ff;
        font-weight: 750;
        letter-spacing: .08em;
        text-transform: uppercase;
        font-size: .82rem;
    }
    .eyebrow:before {
        content: "";
        width: 28px;
        height: 2px;
        background: linear-gradient(90deg, var(--pink), var(--orange));
    }
    h1 {
        font-size: clamp(3.25rem, 7vw, 6.5rem);
        line-height: .93;
        letter-spacing: -.055em;
        margin: 24px 0;
        color: var(--text);
        font-weight: 800;
    }
    .gradient-text {
        background: linear-gradient(110deg, #fff 5%, #d8d0ff 38%, #8b6cff 70%, #ff62f9);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
    .hero-copy { position: relative; z-index: 1; }
    .hero-copy p { max-width: 600px; margin: 0 0 30px; color: #d0d0d8; font-size: 1.16rem; }
    .hero-copy strong { color: var(--mint); font-weight: 700; }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn {
        border: 0;
        border-radius: 14px;
        padding: 13px 18px;
        font-weight: 760;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 9px;
        line-height: 1.2;
    }
    .btn-primary {
        color: #100b16;
        background: linear-gradient(100deg, var(--mint), #dcff68);
        box-shadow: 0 10px 40px rgba(117, 240, 174, .2);
    }
    .btn-secondary { color: #fff; background: #24242a; border: 1px solid var(--line); }
    .deal-stage {
        position: relative;
        isolation: isolate;
        height: 470px;
        display: grid;
        place-items: center;
    }
    .spade {
        position: absolute;
        width: 340px;
        height: 360px;
        filter: drop-shadow(0 28px 50px rgba(66, 255, 177, .18));
    }
    .spade path { fill: url(#spadeFill); stroke: url(#spadeStroke); stroke-width: 4; }
    .orbit {
        position: absolute;
        inset: 17px;
        border: 1px solid rgba(255, 255, 255, .13);
        border-radius: 50%;
        animation: csrp-spin 22s linear infinite;
    }
    .orbit:before, .orbit:after {
        content: "";
        position: absolute;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: var(--pink);
        box-shadow: 0 0 30px var(--pink);
    }
    .orbit:before { top: 25px; left: 57px; }
    .orbit:after { right: 40px; bottom: 51px; background: var(--orange); box-shadow: 0 0 30px var(--orange); }
    .card {
        position: absolute;
        width: 122px;
        height: 168px;
        border-radius: 14px;
        background: #fff;
        color: #15151a;
        box-shadow: 0 24px 45px rgba(0, 0, 0, .42);
        padding: 13px;
        font-size: 2.25rem;
        font-weight: 800;
        border: 1px solid #ddd;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform .55s cubic-bezier(.2, .8, .2, 1), opacity .4s;
        line-height: 1;
    }
    .card small { font-size: 1.35rem; }
    .card .suit { align-self: flex-end; }
    .card.red { color: #e64557; }
    .c1 { transform: translate(-90px, -32px) rotate(-16deg); }
    .c2 { transform: translate(62px, -50px) rotate(13deg); }
    .c3 { transform: translate(-8px, 44px) rotate(4deg); }
    .deal-stage.playing .c1 { transform: translate(-210px, -112px) rotate(-24deg); }
    .deal-stage.playing .c2 { transform: translate(155px, -136px) rotate(22deg); }
    .deal-stage.playing .c3 { transform: translate(35px, 152px) rotate(7deg); }
    .signal {
        position: absolute;
        right: 4%;
        top: 12%;
        padding: 9px 13px;
        border-radius: 999px;
        background: #15151ae8;
        border: 1px solid var(--line);
        font-size: .78rem;
        color: var(--mint);
        box-shadow: 0 12px 30px #0006;
    }
    .signal i {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--mint);
        box-shadow: 0 0 12px var(--mint);
        margin-right: 7px;
    }
    .section { padding: 105px 0; }
    .section-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 28px;
        margin-bottom: 42px;
    }
    .section h2 {
        font-size: clamp(2.25rem, 5vw, 4.5rem);
        letter-spacing: -.045em;
        line-height: 1.02;
        margin: 0;
        color: var(--text);
        font-weight: 800;
    }
    .section-head p { max-width: 480px; color: var(--muted); margin: 0; }
    .kicker {
        display: block;
        color: var(--mint);
        font-size: .82rem;
        font-weight: 800;
        letter-spacing: .12em;
        margin-bottom: 14px;
    }
    .pipeline {
        display: grid;
        grid-template-columns: 1fr 78px 1fr 78px 1.05fr;
        align-items: stretch;
    }
    .pipe-card {
        min-height: 330px;
        background: linear-gradient(145deg, #232329, #151519);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        padding: 28px;
        position: relative;
        overflow: hidden;
    }
    .pipe-card:before {
        content: "";
        position: absolute;
        width: 160px;
        height: 160px;
        border-radius: 50%;
        filter: blur(50px);
        opacity: .18;
        right: -40px;
        top: -50px;
        background: var(--accent, var(--violet));
    }
    .pipe-no {
        position: relative;
        font: 800 .78rem/1 monospace;
        color: var(--accent, var(--violet));
        letter-spacing: .1em;
    }
    .pipe-card h3 { position: relative; font-size: 1.45rem; margin: 16px 0 8px; color: var(--text); font-weight: 750; }
    .pipe-card p { position: relative; color: var(--muted); margin: 0 0 20px; }
    .pipe-arrow { display: grid; place-items: center; color: #787881; }
    .pipe-arrow svg { width: 38px; }
    .event-stack { position: relative; display: grid; gap: 8px; }
    .event {
        display: grid;
        grid-template-columns: 28px 1fr auto;
        gap: 10px;
        align-items: center;
        background: #0e0e11;
        border: 1px solid #2f2f35;
        padding: 9px 11px;
        border-radius: 10px;
        font-size: .78rem;
    }
    .event .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--purple);
        box-shadow: 0 0 10px var(--purple);
        justify-self: center;
    }
    .event code { color: #a9a9b2; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
    .entropy {
        position: relative;
        height: 92px;
        display: flex;
        align-items: end;
        gap: 5px;
        padding: 12px;
        border-radius: 13px;
        background: #0e0e11;
        border: 1px solid #2f2f35;
    }
    .entropy i {
        flex: 1;
        min-width: 5px;
        border-radius: 4px 4px 1px 1px;
        background: linear-gradient(var(--mint), var(--violet));
        height: var(--h);
        animation: csrp-pulse 2.4s ease-in-out infinite;
        animation-delay: var(--d);
    }
    .hash {
        position: relative;
        margin-top: 14px;
        background: #0e0e11;
        border: 1px solid #2f2f35;
        border-radius: 13px;
        padding: 13px;
        font: 700 .72rem/1.6 ui-monospace, SFMono-Regular, Consolas, monospace;
        color: #bfaeff;
        word-break: break-all;
    }
    .index-ring {
        position: relative;
        width: 128px;
        height: 128px;
        margin: 8px auto 0;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: conic-gradient(var(--orange) 0 8%, var(--pink) 8% 20%, var(--purple) 20% 100%);
    }
    .index-ring:after {
        content: "";
        position: absolute;
        inset: 12px;
        background: #17171b;
        border-radius: 50%;
    }
    .index-ring span { z-index: 1; text-align: center; font-size: 2rem; font-weight: 900; line-height: 1; }
    .index-ring small { display: block; color: var(--muted); font-size: .65rem; letter-spacing: .08em; margin-top: 4px; }
    .truth-strip {
        margin-top: 22px;
        padding: 18px 22px;
        border: 1px solid #35543f;
        border-radius: 16px;
        background: linear-gradient(90deg, rgba(117, 240, 174, .09), rgba(111, 82, 255, .08));
        display: flex;
        gap: 12px;
        align-items: center;
        color: #d7ffe9;
    }
    .truth-strip b { color: var(--mint); }
    .timeline-shell {
        background: #111114;
        border: 1px solid var(--line);
        border-radius: 30px;
        padding: 34px;
        box-shadow: var(--shadow);
    }
    .timeline-tabs { display: flex; gap: 10px; margin-bottom: 28px; }
    .tab {
        padding: 9px 14px;
        border: 1px solid var(--line);
        background: #202025;
        color: #bdbdc6;
        border-radius: 999px;
        cursor: pointer;
        line-height: 1.2;
    }
    .tab.active { color: #101014; background: var(--mint); border-color: var(--mint); font-weight: 800; }
    .timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
    .moment {
        min-height: 220px;
        padding: 24px 20px;
        background: #1d1d22;
        border-right: 1px solid var(--line);
        position: relative;
    }
    .moment:first-child { border-radius: 18px 0 0 18px; }
    .moment:last-child { border-radius: 0 18px 18px 0; border: 0; }
    .moment .stage { font-size: .78rem; color: #8f8f99; }
    .moment h3 { margin: 8px 0 14px; color: var(--text); font-size: 1.15rem; font-weight: 750; }
    .moment p { font-size: .9rem; color: var(--muted); margin: 0; }
    .mini-cards { display: flex; margin-top: 18px; }
    .mini-card {
        width: 36px;
        height: 49px;
        background: #fff;
        color: #19191d;
        border-radius: 5px;
        border: 1px solid #ddd;
        display: grid;
        place-items: center;
        font-weight: 800;
        font-size: .8rem;
        margin-right: -9px;
        box-shadow: 0 5px 16px #0007;
    }
    .mini-card:nth-child(even) { color: #df4053; transform: translateY(7px); }
    .moment .tech {
        display: none;
        margin-top: 16px;
        color: #bfaeff;
        font: 700 .7rem/1.45 ui-monospace, monospace;
    }
    .timeline-shell.tech-mode .moment p { display: none; }
    .timeline-shell.tech-mode .moment .tech { display: block; }
    .proof-grid { display: grid; grid-template-columns: 1fr; gap: 22px; }
    .audit {
        background: linear-gradient(150deg, #222228, #141417);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        padding: 38px;
    }
    .why-title { font-size: clamp(2.1rem, 4vw, 3.35rem) !important; }
    .audit-list {
        list-style: none;
        padding: 0;
        margin: 30px 0 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 22px;
    }
    .audit-list li {
        display: grid;
        grid-template-columns: 38px 1fr;
        gap: 14px;
        align-items: start;
        padding: 22px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: #101013;
    }
    .check {
        width: 34px;
        height: 34px;
        border-radius: 9px;
        display: grid;
        place-items: center;
        background: rgba(117, 240, 174, .12);
        color: var(--mint);
        border: 1px solid rgba(117, 240, 174, .35);
        font-weight: 900;
        font-size: .85rem;
    }
    .audit-list b { display: block; font-size: 1.05rem; }
    .audit-list span { color: var(--muted); font-size: .9rem; }
    .github-cta {
        padding: 42px 0 72px;
        text-align: center;
        font-size: 1.08rem;
        color: #d3d3db;
    }
    .github-cta a { color: var(--mint); font-weight: 800; text-underline-offset: 5px; }
    .reveal { opacity: 0; transform: translateY(18px); transition: .75s ease; }
    .reveal.visible { opacity: 1; transform: none; }

    @keyframes csrp-spin { to { transform: rotate(360deg); } }
    @keyframes csrp-pulse { 50% { height: 18%; } }

    @media (max-width: 900px) {
        .hero { grid-template-columns: 1fr; min-height: auto; padding-top: 88px; }
        .deal-stage { height: 390px; }
        .pipeline { grid-template-columns: 1fr; }
        .pipe-arrow { height: 64px; transform: rotate(90deg); }
        .timeline { grid-template-columns: 1fr 1fr; gap: 2px; }
        .moment:first-child { border-radius: 18px 0 0 0; }
        .moment:nth-child(2) { border-radius: 0 18px 0 0; border-right: 0; }
        .moment:nth-child(3) { border-radius: 0 0 0 18px; border-right: 1px solid var(--line); }
        .moment:last-child { border-radius: 0 0 18px 0; }
        .section-head { align-items: start; flex-direction: column; }
    }
    @media (max-width: 560px) {
        .wrap { width: min(100% - 24px, 1160px); }
        h1 { font-size: 2.35rem; letter-spacing: -.04em; }
        .hero { gap: 16px; }
        .deal-stage { height: 330px; }
        .spade { width: 275px; }
        .card { width: 92px; height: 132px; font-size: 1.7rem; }
        .timeline { grid-template-columns: 1fr; }
        .moment,
        .moment:first-child,
        .moment:nth-child(2),
        .moment:nth-child(3),
        .moment:last-child {
            border-radius: 0;
            border-right: 0;
            border-bottom: 1px solid var(--line);
        }
        .moment:first-child { border-radius: 16px 16px 0 0; }
        .moment:last-child { border-radius: 0 0 16px 16px; border: 0; }
        .timeline-shell, .audit, .pipe-card { padding: 24px; }
        .audit-list { grid-template-columns: 1fr; }
    }
    @media (prefers-reduced-motion: reduce) {
        .reveal { opacity: 1; transform: none; transition: none; }
        .orbit, .entropy i, .card { animation: none !important; transition: none !important; }
    }
`
