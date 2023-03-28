import { gql, useQuery } from '@apollo/client';
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import PhotoOverviewElement from './PhotoOverviewElement';

export interface IPhoto {
    no: number;
    imagePath: string;
    category: string;
    date: string;
    location: string;
    description: string;
}

interface IPhotoOverview {
    time: string;
    element: {
        categoryName: string;
        element: IPhoto[];
    }[];
}

export const QUERY_PHOTOS = gql`
    query ImageManagement($siteId: String!) {
        imageManagement(siteId: $siteId) {
            time
            element {
                categoryName
                element {
                    no
                    imagePath
                    category
                    date
                    location
                    description
                }
            }
        }
    }
`;

export default function PhotoOverviewContainer(props: {
    siteId: string;
    filterKey?: string[];
}) {
    const { siteId } = props;
    const photoData = React.useRef<IPhotoOverview[]>([]);

    useQuery(QUERY_PHOTOS, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ imageManagement }) => {
            photoData.current = imageManagement;
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const dateGroup = photoData.current.map(({ time, element }, index) => {
        const categoryGroup = element.map(
            ({ categoryName, element }, index) => {
                const photoList = element.map((photo, index) => (
                    <GridItem key={index}>
                        <PhotoOverviewElement element={photo} />
                    </GridItem>
                ));

                return (
                    <Flex key={index} direction={'column'} mb={'18px'}>
                        <Text
                            fontSize={'lg'}
                            w={'fit-content'}
                            padding={'5.5px 12px'}
                            mb={'13px'}
                            color={'#FFFFFF'}
                            background={'#4C7DE7'}
                            borderRadius={'20px'}
                        >
                            {categoryName}
                        </Text>
                        <Grid templateColumns="repeat(3, 1fr)" gap={'20px'}>
                            {photoList}
                        </Grid>
                    </Flex>
                );
            }
        );

        return (
            <Flex key={index} direction={'column'}>
                <Text fontSize={'2xl'} mb={'13px'}>
                    {time}
                </Text>
                <Flex direction={'column'}>{categoryGroup}</Flex>
            </Flex>
        );
    });

    return (
        <Flex direction={'column'} padding={'13px 42px'}>
            {dateGroup}
        </Flex>
    );
}
