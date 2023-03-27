import { gql, useQuery } from '@apollo/client';
import { Flex } from '@chakra-ui/react';
import { FieldArrayRenderProps, FormikProps } from 'formik';
import React from 'react';
import { ItemDataType } from 'rsuite/esm/@types/common';
import PhotoCard from './PhotoCard';
import { IPhotoFormValue } from './PhotoCreatePage';

const QUERY_IMAGE_OPTIONS = gql`
    query IMOptionList($siteId: String!, $mode: String!) {
        IMOptionList(siteId: $siteId, mode: $mode)
    }
`;

export default function PhotoCreateList(props: {
    formProps: FormikProps<IPhotoFormValue>;
    arrayHelpers: FieldArrayRenderProps;
    categories: ItemDataType[];
    setCategories: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
    locations: ItemDataType[];
    setLocations: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
}) {
    const {
        formProps,
        arrayHelpers,
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
                {formProps.values.content.map(({ image }, index) => (
                    <PhotoCard
                        key={index}
                        formProps={formProps}
                        arrayHelpers={arrayHelpers}
                        index={index}
                        photo={image}
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
