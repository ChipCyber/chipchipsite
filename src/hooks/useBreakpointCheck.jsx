import { useEffect, useState } from 'react';
import { breakpointMap } from '../theme/base';

const useBreakpointCheck = (breakpoint = breakpointMap.sm) => {
    const [shouldRender, setShouldRender] = useState(window.innerWidth >= breakpoint);
    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth < breakpoint) {
            setShouldRender(false);
        } else {
            setShouldRender(true);
        }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);
    return shouldRender;
};

export default useBreakpointCheck;