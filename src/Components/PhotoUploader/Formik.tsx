import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { Flex, Text, Select, Button } from '@chakra-ui/react';
import PhotoUploadForm from './PhotoUploadForm';
import { Camera } from './Camera';
import { IAccountSite, ISiteObject } from '../../Layouts/Layout';

interface IPhoto {
    image: File;
    src: string;
    category: string;
    date: Date;
    location: string;
    description: string;
}

interface IPhotoFormik {
    content: IPhoto[];
    siteId: string | undefined;
}

export default function PhotoUploaderFormik(props: {
    accountSites: IAccountSite[];
    siteObject: ISiteObject;
}) {
    const { accountSites, siteObject } = props;

    const siteOptions = accountSites.map(
        ({ siteId, siteRef: { name } }, index) => (
            <option key={index} value={siteId}>
                {name}
            </option>
        )
    );

    const initialValues: IPhotoFormik = {
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
                console.log(values);
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
                                        props.setFieldValue('siteId', siteId);
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
                                <Flex
                                    direction={'column'}
                                    align={'center'}
                                    justify={'center'}
                                    gap={'10px'}
                                    w={'100%'}
                                >
                                    <Camera arrayHelper={arrayHelper} />
                                    <Button
                                        variant={'buttonBlueSolid'}
                                        type="submit"
                                    >
                                        確認上傳
                                    </Button>
                                    {props.values.content.map(
                                        ({ src }, index) => (
                                            <PhotoUploadForm
                                                key={index}
                                                index={index}
                                                imageSrc={src}
                                                arrayHelper={arrayHelper}
                                            />
                                        )
                                    )}
                                </Flex>
                            )}
                        </FieldArray>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
}
