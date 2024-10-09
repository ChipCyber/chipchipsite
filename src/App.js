import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { ConfigProvider } from "antd";
import { Switch, BrowserRouter, Route, Redirect, useLocation } from "react-router-dom";
import "./App.less";
import WOW from 'wowjs';
import 'animate.css';

import { useTranslation } from "react-i18next";
// import { injected, loadCache } from "./sotres/connectors.jsx";
// import DocumentTitle from 'react-document-title'

import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";

import "./i18n";

import emitter from "./constants/emitter";
import { LanaguageMap, CHANGELANGUAGE } from "./constants";
import { useLanguage, LanguageProvider } from "./LanguageContext";

import ScrollToTop from "./components/scrollToTop";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Home from "./pages/home";
import Airdrop from "./pages/airdrop";
import FAQ from "./pages/faq";
import FAQDetail from "./pages/faq/detail";
import News from "./pages/news";
import NewsDetail from "./pages/news/detail";
import Download from "./pages/download";
import Displacement from "./pages/displacement";
import Roadmap from "./pages/roadmap";
import IDO from "./pages/ido";

function App() {
  const { changeLanguage } = useLanguage();
  const location = useLocation();
  useEffect(() => {
    new WOW.WOW().init({offset: 200, mobile: true});
  }, [location.pathname]);
  const { i18n } = useTranslation();
  const [curLanguage, setCurLanguage] = useState('');
  useEffect(()=>{
    let curLanguage = i18n.language;
    if(LanaguageMap.indexOf(curLanguage)<0) {
      curLanguage = 'en';
      i18n.changeLanguage(curLanguage)
    }
    const customChangeLanguage = () => {
      let curLanguage = i18n.language;
      setCurLanguage(curLanguage);
      changeLanguage(curLanguage);
    };
    customChangeLanguage();
    emitter.on(CHANGELANGUAGE, customChangeLanguage);
    return () => {
      emitter.removeListener(CHANGELANGUAGE, customChangeLanguage);
    }
  }, []);
  return (
    <Root>
      <ConfigProvider locale={curLanguage.includes('zh')?zhCN:enUS}>
        <Content>
          <ScrollToTop>
            <Switch>
              <Route path="/" exact>
                <Nav/>
                <Home/>
                <Footer/>
              </Route>
              <Route path="/airdrop" exact>
                <Nav/>
                <Airdrop/>
                <Footer/>
              </Route>
              <Route path="/faq" exact>
                <Nav/>
                <FAQ/>
                <Footer/>
              </Route>
              <Route path="/faqDetail" exact>
                <Nav/>
                <FAQDetail/>
                <Footer/>
              </Route>
              <Route path="/news" exact>
                <Nav/>
                <News/>
                <Footer/>
              </Route>
              <Route path="/newsDetail" exact>
                <Nav/>
                <NewsDetail/>
                <Footer/>
              </Route>
              <Route path="/download" exact>
                <Nav/>
                <Download/>
                <Footer/>
              </Route>
              <Route path="/displacement" exact>
                <Nav/>
                <Displacement/>
                <Footer/>
              </Route>
              <Route path="/roadmap" exact>
                <Nav/>
                <Roadmap/>
                <Footer/>
              </Route>
              <Route path="/ido" exact>
                <Nav/>
                <IDO/>
                <Footer/>
              </Route>
              <Redirect from='/*' to="/"/>
            </Switch>
          </ScrollToTop>
        </Content>
      </ConfigProvider>
    </Root>
  );
}

export default function AppWrapper() {
  return (
    <Suspense fallback={null}>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </Suspense>
  );
}

const Root = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;
const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  overflow: auto;
  ${({ theme }) => theme.mediaQueries.sm}{
    min-width: 1200px;
    max-width: 2600px;
  };
`;
