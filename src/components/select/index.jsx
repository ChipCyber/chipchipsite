import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import arrowIcon from '../../assets/arrow_down.png';

export default function Index({ options = [], value, onChange }) {
    return (
        <Root>
            <select
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                style={{
                    background: `url(${arrowIcon}) no-repeat right 0 center / 1em auto`,
                }}
            >
                {options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </Root>
    )
}
const Root = styled.div`
min-width: 140px;
border-radius: 4px;
background: #121212;
padding: 0 14px;
height: 32px;
select {
background: transparent;
border: none;
width: 100%;
height: 100%;
font-size: 14px;
font-weight: 500;
appearance: none;
-webkit-appearance: none;
padding-right: 2em;
}
${({ theme }) => theme.mediaQueries.sm}{
padding: 0 20px;
height: 40px;
};
`
