import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const DownloadAppSection = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('ios');

    return (
        <SectionContainer>
            <TabMenu>
                <TabButton
                    active={activeTab === 'ios'}
                    onClick={() => setActiveTab('ios')}
                >
                    {t('515')}
                </TabButton>
                <TabButton
                    active={activeTab === 'android'}
                    onClick={() => setActiveTab('android')}
                >
                    {t('522')}
                </TabButton>
            </TabMenu>

            {activeTab === 'ios' && (
                <AppContent>
                    <Step>
                        <strong>{t('509')}​</strong>
                        <p dangerouslySetInnerHTML={{ __html: t('516') }}></p>
                        <img src={require('@/assets/download/IOS1.png').default} alt="iOS QR Code" style={{ maxWidth: '200px' }} />
                    </Step>
                    <Step>
                        <strong>{t('510')}​</strong>
                        <p>{t('517')}</p>
                        <img src={require('@/assets/download/IOS2.avif').default} alt="iOS Step 2" style={{ maxWidth: '300px' }} />
                        <img src={require('@/assets/download/IOS3.avif').default} alt="iOS Step 2" style={{ maxWidth: '300px' }} />
                    </Step>
                    <Step>
                        <strong>{t('511')}​</strong>
                        <p>{t('518')}</p>
                        <img src={require('@/assets/download/IOS4.avif').default} alt="iOS Step 3" style={{ maxWidth: '300px' }} />
                    </Step>
                    <Step>
                        <strong>{t('512')}​</strong>
                        <p>{t('519')}</p>
                        <img src={require('@/assets/download/IOS5.avif').default} alt="iOS Step 4" style={{ maxWidth: '300px' }} />
                    </Step>
                    <Step>
                        <strong>{t('513')}​</strong>
                        <p>{t('520')}</p>
                        <img src={require('@/assets/download/IOS6.avif').default} alt="iOS Step 5" style={{ maxWidth: '300px' }} />
                        <img src={require('@/assets/download/IOS7.avif').default} alt="iOS Step 5" style={{ maxWidth: '300px' }} />
                    </Step>
                    <Step>
                        <strong>{t('514')}​</strong>
                        <p>{t('521')}</p>
                        <img src={require('@/assets/download/IOS8.avif').default} alt="iOS Step 6" style={{ maxWidth: '300px' }} />
                        <img src={require('@/assets/download/IOS9.avif').default} alt="iOS Step 6" style={{ maxWidth: '300px' }} />
                    </Step>
                </AppContent>
            )}

            {activeTab === 'android' && (
                <AppContent>
                    <Step>
                        <strong>{t('509')}​</strong>
                        <p dangerouslySetInnerHTML={{ __html: t('523') }}></p>
                        <img src={require('@/assets/download/android1.png').default} alt="Android QR Code" style={{ maxWidth: '200px' }} />
                    </Step>
                    <Step>
                        <strong>{t('510')}​</strong>
                        <p>{t('524')}</p>
                        <img src={require('@/assets/download/android2.avif').default} alt="Android Step 2" style={{ maxWidth: '300px' }} />
                    </Step>
                    <Step>
                        <strong>{t('511')}​</strong>
                        <p>{t('525')}</p>
                        <img src={require('@/assets/download/android3.avif').default} alt="Android Step 3" style={{ maxWidth: '300px' }} />
                    </Step>
                    <Step>
                        <strong>{t('512')}​</strong>
                        <p>{t('526')}</p>
                        <img src={require('@/assets/download/android4.avif').default} alt="Android Step 4" style={{ maxWidth: '300px' }} />
                    </Step>
                </AppContent>
            )}
        </SectionContainer>
    );
};

const SectionContainer = styled.div`
    padding: 40px 20px;
    max-width: 800px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
`;

const TabMenu = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    border-bottom: 1px solid #999;
`;

const TabButton = styled.button`
    padding: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: ${props => (props.active ? '#FFF' : '#555')};
    border-bottom: ${props => (props.active ? '2px solid #FFF' : '2px solid transparent')};
    transition: all 0.3s ease;
    &:hover {
        color: #FFF;
    }
    ${({ theme }) => theme.mediaQueries.sm}{
        font-size: 18px;
    }
`;

const AppContent = styled.div`
    h2 {
        font-size: 32px;
        margin-bottom: 20px;
        text-align: center;
    }
`;

const Step = styled.div`
    margin-bottom: 30px;

    strong {
        font-size: 16px;
        font-weight: 700;
    }

    p {
        margin-top: 5px;
        font-size: 16px;
        line-height: 1.6;
        color: #666;
    }

    img {
        max-width: 100%;
        height: auto;
        margin-top: 15px;
        display: block;
        margin: 15px auto 0 auto;
    }
`;


export default DownloadAppSection;
