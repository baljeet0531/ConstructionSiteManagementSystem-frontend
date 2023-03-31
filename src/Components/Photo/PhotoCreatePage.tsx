import { gql, useMutation } from '@apollo/client';
import {
    Button,
    Flex,
    IconButton,
    Input,
    Text,
    useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FieldArray, FieldArrayRenderProps, Form, Formik } from 'formik';
import React from 'react';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { AddIcon, BackIcon, EditIcon } from '../../Icons/Icons';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import { QUERY_IMAGE_OPTIONS } from './Photo';
import PhotoCreateList from './PhotoCreateList';
import { QUERY_PHOTOS } from './PhotoOverviewPage';

export interface IPhotoInput {
    image: File;
    category: string;
    date: Date;
    location: string;
    description: string;
}

export interface IPhotoFormValue {
    content: IPhotoInput[];
    siteId: string;
}

const CREATE_PHOTOS = gql`
    mutation CreateImageManagement(
        $content: [imageManagementInput]!
        $siteId: String!
    ) {
        createImageManagement(content: $content, siteId: $siteId) {
            ok
            message
        }
    }
`;

export default function PhotoCreatePage(props: {
    siteId: string;
    siteName: string;
    onToggle: () => void;
    serverCategories: ItemDataType[];
    serverLocations: ItemDataType[];
}) {
    const { onToggle, siteId, siteName, serverCategories, serverLocations } =
        props;
    const toast = useToast();

    const inputFileRef = React.useRef<HTMLInputElement>(null);
    const [clientCategories, setClientCategories] =
        React.useState<ItemDataType[]>(serverCategories);
    const [clientLocations, setClientLocations] =
        React.useState<ItemDataType[]>(serverLocations);

    const [createPhotos] = useMutation(CREATE_PHOTOS, {
        fetchPolicy: 'network-only',
        refetchQueries: [QUERY_PHOTOS, QUERY_IMAGE_OPTIONS],
    });

    const handleUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        arrayHelpers: FieldArrayRenderProps
    ) => {
        const files = inputFileRef.current?.files;
        const filesArray = files ? Object.values(files) : [];
        filesArray.forEach((file) => {
            arrayHelpers.push({
                image: file,
                category: null,
                date: dayjs(file.lastModified).toDate(),
                location: null,
                description: '',
            });
        });
        event.target.value = '';
    };

    const initialValues: IPhotoFormValue = {
        content: [],
        siteId: siteId,
    };
    return (
        <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                const contentFormatted = values.content.map((photoInput) => ({
                    ...photoInput,
                    category: photoInput.category || '未分類',
                    location: photoInput.location || '無資訊',
                    date: dayjs(photoInput.date).format('YYYY-MM-DD'),
                }));

                createPhotos({
                    variables: {
                        ...values,
                        content: contentFormatted,
                    },
                    onCompleted: ({ createImageManagement }) => {
                        const { message, ok } = createImageManagement;
                        if (ok) {
                            defaultSuccessToast(toast, message);
                            onToggle();
                        }
                    },
                    onError: (err) => {
                        console.log(err);
                        defaultErrorToast(toast);
                    },
                });
                actions.setSubmitting(false);
            }}
        >
            {(props) => (
                <Form style={{ width: '100%', height: '100%' }}>
                    <FieldArray name="content">
                        {(arrayHelpers) => (
                            <Flex direction={'column'} w={'100%'} h={'100%'}>
                                <Flex
                                    direction={'column'}
                                    padding={'47px 42px 10px 42px'}
                                    borderBottom={'1px solid #667080'}
                                    gap={'11px'}
                                    w={'100%'}
                                >
                                    <Text variant={'pageSiteName'}>
                                        {siteName}
                                    </Text>
                                    <Text variant={'pageTitle'}>新增相片</Text>
                                    <Flex
                                        align={'center'}
                                        justify={'space-between'}
                                    >
                                        <Button
                                            variant={'buttonGrayOutline'}
                                            leftIcon={<BackIcon />}
                                            onClick={onToggle}
                                        >
                                            上一頁
                                        </Button>
                                        <Flex
                                            align={'center'}
                                            justify={'flex-end'}
                                            gap={'10px'}
                                        >
                                            <IconButton
                                                variant={'blueOutline'}
                                                aria-label="export photos"
                                                icon={<AddIcon />}
                                                onClick={() =>
                                                    inputFileRef.current?.click()
                                                }
                                            />
                                            <Input
                                                ref={inputFileRef}
                                                display={'none'}
                                                type={'file'}
                                                accept={'image/*'}
                                                multiple
                                                onChange={(event) => {
                                                    handleUpload(
                                                        event,
                                                        arrayHelpers
                                                    );
                                                }}
                                            />
                                            <Button
                                                variant={'buttonBlueSolid'}
                                                leftIcon={<EditIcon />}
                                                onClick={() => {
                                                    props.submitForm();
                                                }}
                                            >
                                                確定新增
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <PhotoCreateList
                                    formProps={props}
                                    arrayHelpers={arrayHelpers}
                                    categories={clientCategories}
                                    setCategories={setClientCategories}
                                    locations={clientLocations}
                                    setLocations={setClientLocations}
                                />
                            </Flex>
                        )}
                    </FieldArray>
                </Form>
            )}
        </Formik>
    );
}
