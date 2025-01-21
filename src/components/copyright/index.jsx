import React from 'react'
import styled from "styled-components";
import useBreakpointCheck from "@/hooks/useBreakpointCheck";

export default function Index() {
    const shouldRender = useBreakpointCheck();
    if (shouldRender) {
        return (
            <Root>Copyright © 2025 CHIPCHIP</Root>
        )
    }
    return null;
}

const Root = styled.div`
width: 100%;
line-height: 64px;
text-align: center;
font-size: 14px;
opacity: 0.3;
${({ theme }) => theme.mediaQueries.sm}{
line-height: 84px;
`
