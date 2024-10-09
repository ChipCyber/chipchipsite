import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next'
import { message } from 'antd'
import Providers from './Providers'
import GlobalStyle from './style/Global'
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import './index.css';
import './fonts.css';
import App from './App';
import i18n from './i18n'
import 'amfe-flexible'
import "@reach/dialog/styles.css";

import * as serviceWorker from './serviceWorker';

message.config({duration:1.5,maxCount:1});

ReactDOM.render(
    <StrictMode>
        <Providers>
            <GlobalStyle />
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </Providers>
    </StrictMode>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
