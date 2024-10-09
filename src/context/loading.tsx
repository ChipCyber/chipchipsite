import React, { useState } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import useScroll from '../hooks/useScroll'

export interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  closeLoading: () => void;
}

const LoadingContext = React.createContext<LoadingContextType>({ isLoading: false, showLoading: () => null, closeLoading: () => null })

const LoadingContextProvider: React.FC = ({ children }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  const {showPop,closePop} = useScroll();
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    showPop&&showPop()
    setIsLoading(true);
  }
  const closeLoading = ()=>{
      closePop&&closePop()
      setIsLoading(false);
  }

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, closeLoading }}>
      <>{children}</>
      {
        isLoading?(
            <LoadingWapper>
                <Loading><Spin indicator={antIcon} /></Loading>
            </LoadingWapper>
        ):null
      }
    </LoadingContext.Provider>
  )
}

const LoadingWapper = styled.div`
z-index: 999;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: #000;
opacity: 0.6;
`
const Loading = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translateY(-50%);
transform: translateX(-50%);
`

export { LoadingContext, LoadingContextProvider }
