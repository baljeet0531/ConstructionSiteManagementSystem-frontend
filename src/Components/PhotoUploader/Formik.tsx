import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { Flex, Text, Select } from '@chakra-ui/react';
import { IAccountSite, ISiteObject } from '../../Layouts/Layout';
import UploaderList from './UploaderList';

interface IPhoto {
    image: File;
    category: string;
    date: Date;
    location: string;
    description: string;
    src: string;
}

export interface IPhotoFormik {
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
