import { gql, useQuery } from '@apollo/client';
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import PhotoOverviewElement from './PhotoOverviewElement';
import { IFilteredPhotos } from './PhotoOverviewPage';

export interface IPhoto {
    no: number;
    imagePath: string;
    category: string;
    date: string;
    location: string;
    description: string;
}

export interface IPhotoQueryData {
    time: string;
    element: {
        categoryName: string;
        element: IPhoto[];
    }[];
}

interface IPhotoOverview {
    [time: string]: { [category: string]: { [no: number]: IPhoto } };
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
    filteredPhotos: IFilteredPhotos;
}) {
    const { siteId, filteredPhotos } = props;
    const photoData = React.useRef<IPhotoOverview>({});

    useQuery(QUERY_PHOTOS, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            imageManagement,
        }: {
            imageManagement: IPhotoQueryData[];
        }) => {
            const dateGroup = imageManagement.map(({ time, element }) => {
                const categoryGroup = element.map(
                    ({ categoryName, element }) => ({
                        [categoryName]: Object.assign(
                            {},
                            ...element.map((element) => ({
                                [element.no]: element,
                            }))
                        ),
                    })
                );
                return {
                    [time]: Object.assign({}, ...categoryGroup),
                };
            });
            photoData.current = Object.assign({}, ...dateGroup);
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const dateGroup = Object.entries(filteredPhotos).map(
        ([time, element], index) => {
            const categoryGroup = Object.entries(element).map(
                ([categoryName, numbers], index) => {
                    const photoList = numbers.map((no, index) => (
                        <GridItem key={index}>
                            <PhotoOverviewElement
                                element={
                                    photoData.current[time][categoryName][no]
                                }
                            />
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
                        {dayjs(time).format('YYYY/MM/DD')}
                    </Text>
                    <Flex direction={'column'}>{categoryGroup}</Flex>
                </Flex>
            );
        }
    );

    return (
        <Flex direction={'column'} padding={'13px 42px'} overflowY={'auto'}>
            {dateGroup}
        </Flex>
    );
}
