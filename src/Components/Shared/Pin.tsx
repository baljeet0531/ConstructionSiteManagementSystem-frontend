import { Tooltip } from '@chakra-ui/react';
import { cloneElement, useState } from 'react';

export default function Pin({
    msg,
    children,
}: {
    msg: string | JSX.Element | undefined;
    children: any;
}) {
    const [isLabelOpen, setIsLabelOpen] = useState(false);
    const childProps = {
        onMouseEnter: () => setIsLabelOpen(true),
        onMouseLeave: () => setIsLabelOpen(false),
        onClick: () => setIsLabelOpen(true),
    };
    const childWithProps = cloneElement(children, { ...childProps });

    return (
        <Tooltip label={msg || 'Invalid'} isOpen={isLabelOpen} closeOnClick={false}>
            {childWithProps}
        </Tooltip>
    );
}
