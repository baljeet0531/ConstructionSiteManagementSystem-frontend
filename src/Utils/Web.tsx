import React from 'react';

export function handleDebounceSearch(
    timeout: React.MutableRefObject<any>,
    timeoutFunction: Function,
    ms: number = 300,
    reset: {
        resetCondition: boolean;
        resetFunction: Function;
    } = {
        resetCondition: false,
        resetFunction: () => {},
    }
) {
    const { resetCondition, resetFunction } = reset;
    clearTimeout(timeout.current);
    if (resetCondition) {
        resetFunction();
        return;
    }
    timeout.current = setTimeout(timeoutFunction, ms);
}
