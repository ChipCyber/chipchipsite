import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import { Switch } from "antd";

export default function Index({ title, disabled, checked, onChange }) {
  const shouldRender = useBreakpointCheck();
    return (
        shouldRender?<Root>
          <MySwitch
            checked={checked}
            disabled={disabled}
            onChange={onChange}
          />
          {title&&<span>{title}</span>}
        </Root>
        :
        <Root>
          {title&&<span>{title}</span>}
          <MySwitch
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            size={'small'}
          />
        </Root>
    );
}

const Root = styled.div`
cursor: pointer;
display: flex;
align-items: center;
justify-content: space-between;
gap: 8px;
font-size: 14px;
word-break: keep-all;
${({ theme }) => theme.mediaQueries.sm}{
justify-content: flex-start;
font-size: 16px;
gap: 12px;
};
`
const MySwitch = styled(Switch)`
&.ant-switch-checked {
  background: linear-gradient(258deg, #75F6A3 5.58%, #8E52F6 88.85%);
  border: none;
  transition: background 0.3s;
}
background-color: #736F7A;
`
