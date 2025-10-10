import React, { useEffect, useState } from 'react'
import styled from "styled-components";

export default function Index({title,checked,onChange}) {
    return (
        <Root onClick={()=>onChange&&onChange(true)}>
            <img src={checked?require("@/assets/utils/checked.png").default:require("@/assets/utils/unchecked.png").default} alt='icon'/>
            <span>{title}</span>
        </Root>
    )
}

const Root = styled.div`
cursor: pointer;
display: flex;
align-items: center;
gap: 8px;
font-size: 14px;
word-break: keep-all;
> img {
width: 14px;
height: 14px;
}
${({ theme }) => theme.mediaQueries.sm}{
font-size: 16px;
gap: 12px;
> img {
width: 18px;
height: 18px;
}
};
`
