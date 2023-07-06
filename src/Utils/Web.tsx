import React from 'react';
import { roleFeatureToUserRoleMap } from '../Constants/Auth';
import { TRoleFeature, TUserRole } from '../Types/Auth';

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

export function checkAuth(feature: TRoleFeature, userRole: TUserRole | '') {
    return roleFeatureToUserRoleMap[feature].some(
        (authRole) => authRole === userRole
    );
}
