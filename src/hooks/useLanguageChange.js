import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useLanguageChange = (callback) => {
    const { i18n } = useTranslation();
    useEffect(() => {
        const handleLanguageChange = () => {
            callback();
        };
        i18n.on('languageChanged', handleLanguageChange);
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n, callback]);
};

export default useLanguageChange;