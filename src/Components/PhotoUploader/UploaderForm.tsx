import React from 'react';
import {
    Flex,
    Grid,
    GridItem,
    Image,
    Textarea,
    Text,
    TextProps,
    Box,
    IconButton,
} from '@chakra-ui/react';
import CloseButton from '../Shared/CloseButton';
import { ImageRotateIcon } from '../../Icons/Icons';
import { FastField, Field, FieldArrayRenderProps, FormikProps } from 'formik';
import { DatePicker, InputPicker } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { IPhotoFormik } from './Formik';

const optionsStyle: React.CSSProperties = {
    border: '1px solid',
    borderColor: '#919AA9',
    borderRadius: '4px',
};
const textStyle: TextProps = {
    fontWeight: 700,
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
};

export default function UploaderForm(props: {
    index: number;
    imageSrc: string;
    arrayHelper: FieldArrayRenderProps;
    formProps: FormikProps<IPhotoFormik>;
    categories: ItemDataType[];
    setCategories: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
    locations: ItemDataType[];
    setLocations: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
}) {
    const [rotation, setRotation] = React.useState<number>(0);

    const {
        index,
        imageSrc,
        arrayHelper,
        formProps,
        categories,
        setCategories,
        locations,
        setLocations,
    } = props;

    return (
        <Flex
            direction={'column'}
            position={'relative'}
            padding={'15px'}
            gap={'5px'}
            borderRadius={'10px'}
            bg={'#FFFFFF'}
        >
            <Box
                position={'relative'}
                w={'320px'}
                h={'320px'}
                background={'#EEF0F4'}
                border={'1px solid #919AA9'}
            >
                <Image
                    w={'100%'}
                    h={'100%'}
                    src={imageSrc}
                    objectFit={'contain'}
                    transform={`rotate(${rotation * 90}deg)`}
                />
                <IconButton
                    color={'#667080'}
                    size={'xs'}
                    aria-label={'image-rotate'}
                    icon={<ImageRotateIcon width={30} height={30} />}
                    bg={'none'}
                    _hover={{ background: 'none' }}
                    position={'absolute'}
                    bottom={0}
                    right={0}
                    onClick={() => {
                        setRotation((prev) => (prev === 0 ? 3 : prev - 1));
                    }}
                ></IconButton>
            </Box>
            <Grid
                h="192px"
                templateColumns="18fr 13fr"
                templateRows="repeat(3, 1fr)"
                gap={'10px 5px'}
            >
                <GridItem rowSpan={1} colSpan={1}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        <Text {...textStyle}>照片分類</Text>
                        <Field name={`content.${index}.category`}>
                            {({ field }: any) => (
                                <InputPicker
                                    {...field}
                                    style={optionsStyle}
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
                    </Flex>
                </GridItem>
                <GridItem rowSpan={3} colSpan={1}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        <Text {...textStyle}>說明</Text>
                        <FastField name={`content.${index}.description`}>
                            {({ field }: any) => (
                                <Textarea
                                    {...field}
                                    color={'#667080'}
                                    border={'1px solid'}
                                    borderColor={'#919AA9'}
                                    borderRadius={'4px'}
                                    flexGrow={1}
                                    resize={'none'}
                                ></Textarea>
                            )}
                        </FastField>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        <Text {...textStyle}>拍攝日期</Text>
                        <Field name={`content.${index}.date`}>
                            {({ field }: any) => (
                                <DatePicker
                                    {...field}
                                    style={optionsStyle}
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
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        <Text {...textStyle}>位置</Text>
                        <Field name={`content.${index}.location`}>
                            {({ field }: any) => (
                                <InputPicker
                                    {...field}
                                    style={optionsStyle}
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
                    </Flex>
                </GridItem>
            </Grid>
            <CloseButton
                ariaLabel="delete-photo"
                handleClick={() => {
                    arrayHelper.remove(index);
                }}
            />
        </Flex>
    );
}
