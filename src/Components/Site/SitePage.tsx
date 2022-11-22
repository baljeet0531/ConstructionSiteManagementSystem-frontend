import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import Site from './Site';
import { Button, Flex, Spacer, Text, Box } from '@chakra-ui/react';
import { AddIcon } from '../../Icons/Icons';

import AddSite from './SitePopup/AddSite';
import AddArea from './SitePopup/AddArea';
import AddRole from './SitePopup/AddRole';
import EditRole from './SitePopup/EditRole';
import EditArea from './SitePopup/EditArea';
import DeleteRole from './SitePopup/DeleteRole';
import DeleteArea from './SitePopup/DeleteArea';
import { useQuery, gql } from '@apollo/client';

export const QUERY_SITE = gql`
    query {
        validSites {
            siteId
            name
            avatar
            start
            end
            city
            lineNotifyToken
        }
    }
`;
// export const QUERY_SITE = gql`
//     query {
//         role(username: "kenny") {
//             username
//             role
//             siteRef {
//                 name
//             }
//         }
//         validSites {
//             siteId
//             name
//             avatar
//             start
//             end
//             city
//             lineNotifyToken
//         }
//     }
// `;

export default function SitePage() {
    const [showPopup, setShowPopup] = React.useState(false);
    const [popupComponent, setPopupComponent] = React.useState(<></>);

    if (!IsPermit('site')) return <Navigate to="/" replace={true} />;
    const popupList = {
        addSite: <AddSite setShowPopup={setShowPopup}></AddSite>,
        addArea: <AddArea setShowPopup={setShowPopup}></AddArea>,
        addRole: <AddRole setShowPopup={setShowPopup}></AddRole>,
        editRole: <EditRole setShowPopup={setShowPopup}></EditRole>,
        editArea: <EditArea setShowPopup={setShowPopup}></EditArea>,
        deleteRole: <DeleteRole setShowPopup={setShowPopup}></DeleteRole>,
        deleteArea: <DeleteArea setShowPopup={setShowPopup}></DeleteArea>,
    };
    function handlePopup(popupFunction: keyof typeof popupList) {
        setPopupComponent(popupList[popupFunction]);
        setShowPopup(true);
    }
    const { loading, error, data } = useQuery(QUERY_SITE);

    if (loading) {
        console.log('loading');
        return <p>loading</p>;
    }
    if (error) {
        console.log(`Error! ${error}`);
        return <p>{`Error! ${error}`}</p>;
    }

    if (data) {
        const site: {
            siteId: any;
            name: string;
            avatar: string;
            start: string;
            end: string;
            city: string;
        }[] = data.validSites;

        const allSites = site.map((siteDetails, index) => {
            return (
                <Site
                    key={index}
                    siteDetails={siteDetails}
                    setPopupComponent={setPopupComponent}
                    setShowPopup={setShowPopup}
                    handlePopup={handlePopup}
                ></Site>
            );
        });

        return (
            <Box>
                <Flex
                    direction={'column'}
                    h={'100vh'}
                    pl={'30px'}
                    pr={'30px'}
                    pt={'47px'}
                    pb={'20px'}
                    overflowY={'auto'}
                >
                    <Flex
                        direction={'row'}
                        justify="space-between"
                        align={'end'}
                        mb={'5px'}
                    >
                        <Text
                            fontSize={'36px'}
                            fontWeight={400}
                            fontFamily={'Inter'}
                            color={'#667080'}
                        >
                            專案管理
                        </Text>
                        <Spacer />
                        <Button
                            leftIcon={<AddIcon />}
                            bg={'#4C7DE7'}
                            color={'#FFFFFF'}
                            onClick={() => handlePopup('addSite')}
                        >
                            新增專案
                        </Button>
                    </Flex>
                    <Flex direction={'column'}>{allSites}</Flex>
                </Flex>
                {showPopup && popupComponent}
            </Box>
        );
    }
    return <></>;
}
