import React from 'react';
import SiteAreas from './SiteAreas';
import SiteRoles from './SiteRoles';
import SiteInfo from './SiteInfo';
import { CloseIcon } from '../../Icons/Icons';

import { Box, Flex, IconButton } from '@chakra-ui/react';

import DeleteSite from './SitePopup/DeleteSite';

export default function Site(props: {
    siteDetails: {
        siteId: any;
        name: string;
        avatar: string;
        start: string;
        end: string;
        city: string;
    };
    setPopupComponent: Function;
    setShowPopup: Function;
    rerender: Boolean;
    setRerender: Function;
}) {
    const {
        siteDetails,
        setPopupComponent,
        setShowPopup,
        setRerender,
        rerender,
    } = props;
    const { siteId, name: siteName } = siteDetails;
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
                    setPopupComponent(
                        <DeleteSite
                            setShowPopup={setShowPopup}
                            siteName={siteName}
                            siteId={siteId}
                        ></DeleteSite>
                    );
                    setShowPopup(true);
                }}
            ></IconButton>
            <Flex
                w={'100%'}
                direction={'column'}
                align={'center'}
                justify={'start'}
            >
                <SiteInfo
                    setPopupComponent={setPopupComponent}
                    setShowPopup={setShowPopup}
                    siteDetails={siteDetails}
                ></SiteInfo>
                <SiteRoles
                    siteId={siteId}
                    siteName={siteName}
                    setPopupComponent={setPopupComponent}
                    setShowPopup={setShowPopup}
                    rerender={rerender}
                    setRerender={setRerender}
                ></SiteRoles>
                <SiteAreas
                    siteId={siteId}
                    siteName={siteName}
                    setPopupComponent={setPopupComponent}
                    setShowPopup={setShowPopup}
                ></SiteAreas>
            </Flex>
        </Box>
    );
}
