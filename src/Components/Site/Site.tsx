import React from 'react';
import SiteAreas from './SiteAreas';
import SiteRoles from './SiteRoles';
import SiteInfo from './SiteInfo';
import { CloseIcon } from '../../Icons/Icons';

import { Box, Flex, IconButton } from '@chakra-ui/react';

export default function Site(props: {
    siteDetails: {
        siteId: any;
        name: string;
        avatar: string;
        start: string;
        end: string;
        lineId: string;
    };
    handlePopup: Function;
}) {
    const { handlePopup, siteDetails } = props;
    const { siteId } = siteDetails;

    return (
        <Box
            w={'100%'}
            border={'1px solid #667080'}
            borderRadius={'10px'}
            bg={'#FFFFFF'}
            mt={'20px'}
            p={'28px 34px'}
            position={'relative'}
        >
            <IconButton
                size={'xs'}
                aria-label="DeleteSite"
                icon={<CloseIcon />}
                bg={'none'}
                position={'absolute'}
                top={0}
                right={0}
                onClick={() => {
                    handlePopup('deleteSite');
                }}
            ></IconButton>
            <Flex
                w={'100%'}
                direction={'column'}
                align={'center'}
                justify={'start'}
            >
                <SiteInfo
                    handlePopup={handlePopup}
                    siteDetails={siteDetails}
                ></SiteInfo>
                <SiteRoles
                    handlePopup={handlePopup}
                    siteId={siteId}
                ></SiteRoles>
                <SiteAreas
                    handlePopup={handlePopup}
                    siteId={siteId}
                ></SiteAreas>
            </Flex>
        </Box>
    );
}
