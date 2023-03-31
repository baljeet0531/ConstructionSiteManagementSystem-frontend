import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { CloseIcon } from '../../Icons/Icons';

export default function CloseButton(props: {
    ariaLabel: string;
    handleClick: () => void;
}) {
    const { ariaLabel, handleClick } = props;
    return (
        <IconButton
            size={'xs'}
            aria-label={ariaLabel}
            icon={<CloseIcon />}
            bg={'none'}
            _hover={{ background: 'none' }}
            position={'absolute'}
            top={0}
            right={0}
            onClick={handleClick}
        ></IconButton>
    );
}
