import { theme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const Tabs = {
    variants: {
        blueLineTabs: (props: StyleFunctionProps) => {
            const {
                tablist,
                tab: { _selected, ...tabRest },
            } = theme.components.Tabs.variants?.line(props) as any;
            return {
                tablist: {
                    ...tablist,
                },
                tab: {
                    ...tabRest,
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#667080',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                    _selected: {
                        ..._selected,
                        color: '#4C7DE7',
                        fontWeight: 700,
                        borderRadius: '4px',
                        bg: '#E3ECFF',
                    },
                },
            };
        },
    },
};

export default Tabs;
