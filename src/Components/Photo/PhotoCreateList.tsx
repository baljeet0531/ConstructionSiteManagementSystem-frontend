import { gql, useQuery } from '@apollo/client';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { ItemDataType } from 'rsuite/esm/@types/common';
import PhotoCard from './PhotoCard';

const QUERY_IMAGE_OPTIONS = gql`
    query IMOptionList($siteId: String!, $mode: String!) {
        IMOptionList(siteId: $siteId, mode: $mode)
    }
`;

export default function PhotoCreateList(props: {
    photos: File[];
    setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
    categories: ItemDataType[];
    setCategories: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
    locations: ItemDataType[];
    setLocations: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
}) {
    const {
        photos,
        setPhotos,
        categories,
        setCategories,
        locations,
        setLocations,
    } = props;

    const categoriesOptions = React.useRef<string[]>([]);
    const locationsOptions = React.useRef<string[]>([]);

    useQuery(QUERY_IMAGE_OPTIONS, {
        variables: {
            siteId: 'M522C0008',
            mode: 'category',
        },
        onCompleted: ({ IMOptionList }) => {
            categoriesOptions.current = IMOptionList;
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    useQuery(QUERY_IMAGE_OPTIONS, {
        variables: {
            siteId: 'M522C0008',
            mode: 'location',
        },
        onCompleted: ({ IMOptionList }) => {
            locationsOptions.current = IMOptionList;
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    return (
        <Flex
            direction={'column'}
            padding={'32px 42px'}
            flexGrow={1}
            width={'100%'}
            overflowY={'auto'}
            align={'center'}
        >
            <Flex
                direction={'column'}
                width={'80%'}
                maxWidth={'761px'}
                minWidth={'450px'}
                gap={'30px'}
                className={'photo-uploader'}
            >
                {photos.map((photo, index) => (
                    <PhotoCard
                        key={index}
                        index={index}
                        photo={photo}
                        setPhotos={setPhotos}
                        categories={categories}
                        setCategories={setCategories}
                        locations={locations}
                        setLocations={setLocations}
                    />
                ))}
            </Flex>
        </Flex>
    );
}
