import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { DatePicker } from "antd"

export default function Index({ value, onChange }) {
    return (
        <Root>
            <DatePicker autoFocus={false} inputReadOnly value={value} onChange={onChange} />
        </Root>
    )
}
const Root = styled.div`
input {
color: #FFF;
}
border-radius: 4px;
background: #121212;
padding: 0 14px;
height: 32px;
display: flex;
align-items: center;
gap: 10px;
.ant-picker {
padding: 0;
background: transparent;
border: none;
width: 100%;
height: 100%;
}
.ant-picker-focused {
border: none;
}
${({ theme }) => theme.mediaQueries.sm}{
min-width: 280px;
padding: 0 20px;
height: 40px;
};
`
