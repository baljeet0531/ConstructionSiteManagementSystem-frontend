import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { IPhotoFormik } from './Formik';
import { FieldArrayRenderProps, FormikProps } from 'formik';
import { Camera } from './Camera';
import UploaderForm from './UploaderForm';
import { QUERY_IMAGE_OPTIONS } from '../Photo/PhotoCreatePage';
import { ItemDataType } from 'rsuite/esm/@types/common';

export default function UploaderList(props: {
    formProps: FormikProps<IPhotoFormik>;
    arrayHelper: FieldArrayRenderProps;
}) {
    const { formProps, arrayHelper } = props;

    const [categories, setCategories] = React.useState<ItemDataType[]>([]);
    const [locations, setLocations] = React.useState<ItemDataType[]>([]);

    useQuery(QUERY_IMAGE_OPTIONS, {
        variables: {
            siteId: formProps.values.siteId,
        },
        onCompleted: ({
            IMOptionList,
        }: {
            IMOptionList: {
                category: string[];
                location: string[];
            };
        }) => {
            setCategories(
                IMOptionList.category.map((option) => ({
                    label: option,
                    value: option,
                }))
            );
            setLocations(
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
        <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            gap={'10px'}
            w={'100%'}
        >
            <Camera arrayHelper={arrayHelper} />
            <Button variant={'buttonBlueSolid'} type="submit">
                確認上傳
            </Button>
            {formProps.values.content.map(({ src }, index) => (
                <UploaderForm
                    key={index}
                    index={index}
                    imageSrc={src}
                    formProps={formProps}
                    arrayHelper={arrayHelper}
                    categories={categories}
                    setCategories={setCategories}
                    locations={locations}
                    setLocations={setLocations}
                />
            ))}
        </Flex>
    );
}
