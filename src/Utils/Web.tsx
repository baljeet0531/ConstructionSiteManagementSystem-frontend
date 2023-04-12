import React from 'react';

export function handleDebounceSearch(
    timeout: React.MutableRefObject<any>,
    timeoutFunction: Function,
    ms: number = 300,
    resetCondition: boolean = false
) {
    clearTimeout(timeout.current);
    if (resetCondition) return;
    timeout.current = setTimeout(timeoutFunction, ms);
}
