import { Center, Flex, Image, Text, Textarea } from '@chakra-ui/react';
import { FastField, Field, FieldArrayRenderProps, FormikProps } from 'formik';
import React from 'react';
import { DatePicker, InputPicker } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import CloseButton from '../Shared/CloseButton';
import { IPhotoFormValue } from './PhotoCreatePage';

export default function PhotoCard(props: {
    index: number;
    formProps: FormikProps<IPhotoFormValue>;
    arrayHelpers: FieldArrayRenderProps;
    photo: File;
    categories: ItemDataType[];
    setCategories: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
    locations: ItemDataType[];
    setLocations: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
}) {
    const {
        index,
        formProps,
        arrayHelpers,
        photo,
        categories,
        setCategories,
        locations,
        setLocations,
    } = props;

    return (
        <Flex
            width={'100%'}
            height={'100%'}
            padding={'24px'}
            gap={'28px'}
            bg={'#FFFFFF'}
            boxShadow={'0px 4px 4px -2px #66708029'}
            borderRadius={'4px'}
            position={'relative'}
        >
            <CloseButton
                ariaLabel="delete-photo"
                handleClick={() => {
                    arrayHelpers.remove(index);
                }}
            />
            <Center flexGrow={1} border={'2px solid #919AA9'} bg={'#EEF0F4'}>
                <Image
                    h={'100%'}
                    w={'100%'}
                    objectFit={'contain'}
                    src={URL.createObjectURL(photo)}
                    onLoad={(e) => {
                        const image = e.target as HTMLImageElement;
                        URL.revokeObjectURL(image.src);
                    }}
                />
            </Center>
            <Flex flexGrow={1}>
                <Flex
                    direction={'column'}
                    gap={'5px'}
                    justify={'flex-start'}
                    height={'374px'}
                >
                    <Text variant={'w400s17'} fontWeight={'700'}>
                        相片分類
                    </Text>
                    <Field name={`content.${index}.category`}>
                        {({ field }: any) => (
                            <InputPicker
                                {...field}
                                style={{
                                    border: '2px solid #919AA9',
                                    borderRadius: '4px',
                                }}
                                creatable
                                data={categories}
                                onCreate={(_, item) => {
                                    setCategories([...categories, item]);
                                }}
                                onChange={(newValue) => {
                                    formProps.setFieldValue(
                                        field.name,
                                        newValue
                                    );
                                }}
                                onBlur={() =>
                                    formProps.setFieldTouched(field.name)
                                }
                            />
                        )}
                    </Field>
                    <Text variant={'w400s17'} fontWeight={'700'}>
                        拍攝日期
                    </Text>
                    <Field name={`content.${index}.date`}>
                        {({ field }: any) => (
                            <DatePicker
                                {...field}
                                style={{
                                    border: '2px solid #919AA9',
                                    borderRadius: '4px',
                                }}
                                format={'yyyy/MM/dd'}
                                ranges={[
                                    {
                                        label: 'today',
                                        value: new Date(),
                                    },
                                ]}
                                oneTap
                                cleanable={false}
                                onChange={(newValue) => {
                                    formProps.setFieldValue(
                                        field.name,
                                        newValue
                                    );
                                }}
                                onBlur={() =>
                                    formProps.setFieldTouched(field.name)
                                }
                            ></DatePicker>
                        )}
                    </Field>
                    <Text variant={'w400s17'} fontWeight={'700'}>
                        位置
                    </Text>
                    <Field name={`content.${index}.location`}>
                        {({ field }: any) => (
                            <InputPicker
                                {...field}
                                style={{
                                    border: '2px solid #919AA9',
                                    borderRadius: '4px',
                                }}
                                creatable
                                data={locations}
                                onCreate={(_, item) => {
                                    setLocations([...locations, item]);
                                }}
                                onChange={(newValue) => {
                                    formProps.setFieldValue(
                                        field.name,
                                        newValue
                                    );
                                }}
                                onBlur={() =>
                                    formProps.setFieldTouched(field.name)
                                }
                            />
                        )}
                    </Field>
                    <Text variant={'w400s17'} fontWeight={'700'}>
                        說明
                    </Text>
                    <FastField name={`content.${index}.description`}>
                        {({ field }: any) => (
                            <Textarea
                                {...field}
                                color={'#667080'}
                                border={'2px solid'}
                                borderColor={'#919AA9'}
                                borderRadius={'4px'}
                                flexGrow={1}
                                resize={'none'}
                            ></Textarea>
                        )}
                    </FastField>
                </Flex>
            </Flex>
        </Flex>
    );
}
