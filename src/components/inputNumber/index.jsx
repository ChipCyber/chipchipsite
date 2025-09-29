import React, { useEffect, useState } from 'react'
import styled from "styled-components";

export default function Index({ value, unit, onChange, placeholder, className }) {
    return (
        <Root className={className}>
            <input type='number' placeholder={placeholder} inputMode="numeric" value={value} onChange={onChange}/>
            <span>{unit}</span>
        </Root>
    );
}

const Root = styled.div`
border-radius: 4px;
background: #121212;
padding: 0 14px;
height: 32px;
display: flex;
align-items: center;
gap: 10px;
input {
color: #FFF;
flex: 1;
height: 100%;
font-size: 14px;
font-weight: 500;
min-width: 80px;
}
span {
font-size: 13px;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 0 20px;
height: 40px;
span {
font-size: 14px;
}
};
`