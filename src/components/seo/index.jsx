import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useLanguage } from "../../LanguageContext";
import { LanaguageLangMap } from "../../constants";

export default function SEO() {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const location = useLocation();
    let path = location.pathname;
    path = path.split("?")[0].split("#")[0];
    if (!path.endsWith("/")) {
        path += "/";
    }
    let origin = window.location.origin.replace(/^https?:\/\/www\./, "https://");
    const url = origin + path;
    return (
        <Helmet>
            <html lang={LanaguageLangMap[language] ?? LanaguageLangMap['en']} />
            <link rel="alternate" href="https://chipchip.io/" hreflang="x-default" />
            <title>{t('0')}</title>
            <meta name="description" content={t("1")} />
            <meta property="og:title" content={t('0')} />
            <meta property="og:description" content={t("1")} />
            <meta name="twitter:title" content={t('0')} />
            <meta property="twitter:description" content={t("1")} />
            <link rel="canonical" href={url} />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Game",
                    "name": "CHIPCHIP",
                    "url": "https://chipchip.io/",
                    "applicationCategory": "OnlineGame",
                    "description": "CHIPCHIP is a Web3 crypto poker platform...",
                    "genre": "Poker"
                })}
            </script>
        </Helmet>
    );
}