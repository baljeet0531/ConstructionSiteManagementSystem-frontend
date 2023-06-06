import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { Flex, Text, Select, useToast } from '@chakra-ui/react';
import { IAccountSite, ISiteObject } from '../../Layouts/Layout';
import UploaderList from './UploaderList';
import { useMutation } from '@apollo/client';
import { CREATE_PHOTOS } from '../Photo/PhotoCreatePage';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import dayjs from 'dayjs';

interface IGQLPhoto {
    image: File | null;
    category: string;
    date: Date | string;
    location: string;
    description: string;
}
interface IFormikPhoto extends IGQLPhoto {
    rotation: number;
    src: string;
}

export interface IGQLCreatePhoto {
    content: IFormikPhoto[];
    siteId: string | undefined;
}

export default function PhotoUploaderFormik(props: {
    accountSites: IAccountSite[];
    siteObject: ISiteObject;
}) {
    const { accountSites, siteObject } = props;
    const toast = useToast();
    const siteOptions = accountSites.map(
        ({ siteId, siteRef: { name } }, index) => (
            <option key={index} value={siteId}>
                {name}
            </option>
        )
    );

    const [createPhotos] = useMutation(CREATE_PHOTOS, {
        fetchPolicy: 'network-only',
    });

    const handleContents = (content: IFormikPhoto): Promise<IGQLPhoto> => {
        const { src, rotation, date, ...rest } = content;

        return new Promise((resolve) => {
            const image = new Image();

            image.src = src;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 320;
            canvas.height = 320;

            image.onload = () => {
                if (context) {
                    context.translate(canvas.width / 2, canvas.height / 2);
                    context.rotate((rotation * Math.PI) / 180);
                    context.drawImage(
                        image,
                        -image.width / 2,
                        -image.height / 2
                    );
                }

                canvas.toBlob((blob) => {
                    const file =
                        blob &&
                        new File([blob], 'mobile_image.png', {
                            type: 'image/png',
                        });

                    resolve({
                        ...rest,
                        date: dayjs(date).format('YYYY-MM-DD'),
                        image: file,
                    });
                }, 'image/png');
            };
        });
    };

    const initialValues: IGQLCreatePhoto = {
        content: [],
        siteId: localStorage.getItem('siteId') || accountSites[0].siteId,
    };

    return (
        <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                Promise.all(
                    values.content.map((content) => handleContents(content))
                )
                    .then((contents) => {
                        console.log({
                            ...values,
                            content: contents,
                        });
                        createPhotos({
                            variables: {
                                ...values,
                                content: contents,
                            },
                            onCompleted: ({ createImageManagement }) => {
                                const { message, ok } = createImageManagement;
                                if (ok) {
                                    defaultSuccessToast(toast, message);
                                }
                            },
                            onError: (err) => {
                                console.log(err);
                                defaultErrorToast(toast);
                            },
                        });
                    })
                    .catch((err) => console.log(err));
                actions.setSubmitting(false);
            }}
        >
            {(props) => (
                <Form>
                    <Flex
                        w={'390px'}
                        direction={'column'}
                        align={'center'}
                        p={'30px 20px'}
                        gap={'10px'}
                    >
                        <Text w={'400'} fontSize={'1.5rem'}>
                            上傳照片
                        </Text>
                        <Field name="siteId">
                            {({ field }: any) => (
                                <Select
                                    variant={'grayOutline'}
                                    {...field}
                                    onChange={(e) => {
                                        const siteId = e.target.value;
                                        props.setFieldValue(field.name, siteId);
                                        localStorage.setItem('siteId', siteId);
                                        localStorage.setItem(
                                            'siteName',
                                            siteObject[siteId].siteName
                                        );
                                    }}
                                >
                                    {siteOptions}
                                </Select>
                            )}
                        </Field>
                        <FieldArray name="content">
                            {(arrayHelper) => (
                                <UploaderList
                                    formProps={props}
                                    arrayHelper={arrayHelper}
                                />
                            )}
                        </FieldArray>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
}
