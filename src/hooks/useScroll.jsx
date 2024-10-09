import { useCallback } from 'react'

export default function useScroll() {
    const stopScroll = useCallback((e)=>{
        e.stopPropagation();
        e.preventDefault();
    },[]);
    const showPop = useCallback(()=>{
        window.addEventListener("touchmove", stopScroll, {passive: false });
        document.body.style.overflow = 'hidden';
    },[stopScroll]);
    const closePop = useCallback(()=>{
        // window.removeEventListener('touchmove',self.stopScroll);
        // 添加事件监听时添加了passive参数，在ios9中移除事件监听也需要加此参数
        window.removeEventListener('touchmove', stopScroll);
        document.body.style.overflow = 'auto';
    },[stopScroll]);
    return {showPop,closePop}
}
