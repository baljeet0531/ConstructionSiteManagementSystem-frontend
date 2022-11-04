import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import Site from './Site';
import { Button, Flex, Spacer, Text, Box } from '@chakra-ui/react';
import { AddIcon } from '../../Icons/Icons';

import AddSite from './SitePopup/AddSite';
import EditSite from './SitePopup/EditSite';
import AddArea from './SitePopup/AddArea';
import AddRole from './SitePopup/AddRole';
import EditRole from './SitePopup/EditRole';
import EditArea from './SitePopup/EditArea';
import DeleteSite from './SitePopup/DeleteSite';
import DeleteRole from './SitePopup/DeleteRole';
import DeleteArea from './SitePopup/DeleteArea';
import { useQuery, gql } from '@apollo/client';

export const QUERY_SITE = gql`
    query {
        role(username: "kenny") {
            username
            role
            site {
                name
            }
        }
        allSites {
            edges {
                node {
                    siteId
                    name
                    avatar
                    start
                    end
                    lineId
                }
            }
        }
    }
`;

// const MOCK_SITE = {
//     allsites: [
//         {
//             siteId: 'TEST-1',
//             name: '穩懋南科路竹廠機電一期新建工程',
//             avatar: '/SiteIcons/A-1.svg',
//             start: '2022/01/02',
//             end: '2022/06/30',
//             lineId: '12345678',
//         },
//         {
//             siteId: 'TEST-2',
//             name: '穩懋龜山廠P3/3F擴建工程',
//             avatar: '/SiteIcons/A-1.svg',
//             start: '2022/05/15',
//             end: '2022/12/30',
//             lineId: '56789012',
//         },
//     ],
// };

export default function SitePage() {
    const [showPopup, setShowPopup] = React.useState(false);
    const [popupComponent, setPopupComponent] = React.useState(<></>);
    if (!IsPermit('site')) return <Navigate to="/" replace={true} />;
    const popupList = {
        addSite: <AddSite setShowPopup={setShowPopup}></AddSite>,
        editSite: <EditSite setShowPopup={setShowPopup}></EditSite>,
        addArea: <AddArea setShowPopup={setShowPopup}></AddArea>,
        addRole: <AddRole setShowPopup={setShowPopup}></AddRole>,
        editRole: <EditRole setShowPopup={setShowPopup}></EditRole>,
        editArea: <EditArea setShowPopup={setShowPopup}></EditArea>,
        deleteSite: <DeleteSite setShowPopup={setShowPopup}></DeleteSite>,
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
            node: {
                siteId: any;
                name: string;
                avatar: string;
                start: string;
                end: string;
                lineId: string;
            };
        }[] = data.allSites.edges;

        console.log(site);

        const allSites = site.map((siteDetails, index) => {
            return (
                <Site
                    key={index}
                    siteDetails={siteDetails.node}
                    handlePopup={handlePopup}
                ></Site>
            );
        });
        // const allSites = MOCK_SITE.allsites.map((siteDetails, index) => {
        //     return (
        //         <Site
        //             key={index}
        //             siteDetails={siteDetails}
        //             handlePopup={handlePopup}
        //         ></Site>
        //     );
        // });

        return (
            <Box>
                <Flex
                    direction={'column'}
                    w={'80vw'}
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
                            工地管理
                        </Text>
                        <Spacer />
                        <Button
                            leftIcon={<AddIcon />}
                            bg={'#4C7DE7'}
                            color={'#FFFFFF'}
                            onClick={() => handlePopup('addSite')}
                        >
                            新增工地
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
