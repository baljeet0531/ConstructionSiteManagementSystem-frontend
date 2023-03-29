import { gql, useQuery } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { IsPermit } from '../../Mockdata/Mockdata';
import PhotoCreatePage from './PhotoCreatePage';
import PhotoOverviewPage from './PhotoOverviewPage';

export const QUERY_IMAGE_OPTIONS = gql`
    query IMOptionList($siteId: String!) {
        IMOptionList(siteId: $siteId) {
            category
            location
        }
    }
`;

export default function Photo(props: { siteId: string; siteName: string }) {
    if (!IsPermit('project_photo')) return <Navigate to="/" replace={true} />;

    const { siteId, siteName } = props;
    const { isOpen, onToggle } = useDisclosure();
    const [serverCategories, setServerCategories] = React.useState<
        ItemDataType[]
    >([]);
    const [serverLocations, setServerLocations] = React.useState<
        ItemDataType[]
    >([]);

    useQuery(QUERY_IMAGE_OPTIONS, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            IMOptionList,
        }: {
            IMOptionList: {
                category: string[];
                location: string[];
            };
        }) => {
            setServerCategories(
                IMOptionList.category.map((option) => ({
                    label: option,
                    value: option,
                }))
            );
            setServerLocations(
                IMOptionList.location.map((option) => ({
                    label: option,
                    value: option,
                }))
            );
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    return (
        <>
            <PhotoOverviewPage
                siteId={siteId}
                siteName={siteName}
                isOpen={isOpen}
                onToggle={onToggle}
                serverCategories={serverCategories}
                serverLocations={serverLocations}
            />
            {isOpen && (
                <PhotoCreatePage
                    siteId={siteId}
                    siteName={siteName}
                    onToggle={onToggle}
                    serverCategories={serverCategories}
                    serverLocations={serverLocations}
                />
            )}
        </>
    );
}
