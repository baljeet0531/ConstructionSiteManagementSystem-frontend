import { Icon } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';

import { CircleIcon } from '../../Icons/Icons';
import { featureItem } from '../FeatureMap';

export function Feature({ fItem }: { fItem: featureItem }) {
    const inActiveStyle = {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        fontSize: '14px',
        fontFamily: 'Inter',
        lineHeight: '16px',
        fontStyle: 'normal',
        height: '34px',
        gap: '6px',
        paddingLeft: '6px',
        color: '#667080',
        fontWeight: '400',
    };

    const activeStyle = {
        ...inActiveStyle,
        background: '#E3ECFF',
        color: '#4C7DE7',
        fontWeight: '700',
    };

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <NavLink
            to={`${fItem.path}`}
            style={({ isActive }) =>
                isActive || (currentPath == '/' && fItem.path === '/dashboard')
                    ? activeStyle
                    : inActiveStyle
            }
        >
            {fItem.icon ? <Icon as={fItem.icon} /> : <CircleIcon />}
            {fItem.name}
        </NavLink>
    );
}
