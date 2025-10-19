import React from 'react';

// 兼容SSR服务端渲染
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default useIsomorphicLayoutEffect;
