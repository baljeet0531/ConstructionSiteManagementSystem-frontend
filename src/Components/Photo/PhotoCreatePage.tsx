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
import { FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { AddIcon, BackIcon, EditIcon } from '../../Icons/Icons';
import { defaultSuccessToast } from '../../Utils/DefaultToast';
import PhotoCreateList from './PhotoCreateList';

export interface IPhotoInput {
    image: File;
    category: string;
    date: string;
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
}) {
    const { onToggle, siteId, siteName } = props;
    const toast = useToast();
    const [categories, setCategories] = React.useState<ItemDataType[]>([]);
    const [locations, setLocations] = React.useState<ItemDataType[]>([]);
    const inputFileRef = React.useRef<HTMLInputElement>(null);

    // eslint-disable-next-line no-unused-vars
    const [createPhotos] = useMutation(CREATE_PHOTOS, {
        onCompleted: ({ message, ok }) => {
            if (ok) {
                defaultSuccessToast(toast, message);
            }
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const initialValues: IPhotoFormValue = {
        content: [],
        siteId: siteId,
    };
    return (
        <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
                console.log(values);
                // onToggle();
            }}
        >
            {(props) => (
                <Form>
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
                                                onChange={(e) => {
                                                    const files =
                                                        inputFileRef.current
                                                            ?.files;
                                                    const filesArray = files
                                                        ? Object.values(files)
                                                        : [];
                                                    filesArray.forEach(
                                                        (file) => {
                                                            arrayHelpers.push({
                                                                image: file,
                                                                category: null,
                                                                date: dayjs(
                                                                    file.lastModified
                                                                ).toDate(),
                                                                location: null,
                                                                description: '',
                                                            });
                                                        }
                                                    );
                                                    e.target.value = '';
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
                                    categories={categories}
                                    setCategories={setCategories}
                                    locations={locations}
                                    setLocations={setLocations}
                                />
                            </Flex>
                        )}
                    </FieldArray>
                </Form>
            )}
        </Formik>
    );
}
