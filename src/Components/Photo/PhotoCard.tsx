import { Center, Flex, Image, Text, Textarea } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { DatePicker, InputPicker } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import CloseButton from '../Shared/CloseButton';

export default function PhotoCard(props: {
    index: number;
    photo: File;
    setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
    categories: ItemDataType[];
    setCategories: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
    locations: ItemDataType[];
    setLocations: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
}) {
    const {
        index,
        photo,
        setPhotos,
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
                    setPhotos((prevState) => {
                        prevState.splice(index, 1);
                        return [...prevState];
                    });
                }}
            />
            <Center
                h={'100%'}
                flexGrow={1}
                border={'2px solid #919AA9'}
                bg={'#EEF0F4'}
            >
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
                    <InputPicker
                        style={{
                            border: '2px solid #919AA9',
                            borderRadius: '4px',
                        }}
                        creatable
                        data={categories}
                        onCreate={(_, item) => {
                            setCategories([...categories, item]);
                        }}
                    />
                    <Text variant={'w400s17'} fontWeight={'700'}>
                        拍攝日期
                    </Text>
                    <DatePicker
                        style={{
                            border: '2px solid #919AA9',
                            borderRadius: '4px',
                        }}
                        defaultValue={dayjs().toDate()}
                        format={'yyyy/MM/dd'}
                        ranges={[
                            {
                                label: 'today',
                                value: new Date(),
                            },
                        ]}
                        oneTap
                        cleanable={false}
                    ></DatePicker>
                    <Text variant={'w400s17'} fontWeight={'700'}>
                        位置
                    </Text>
                    <InputPicker
                        style={{
                            border: '2px solid #919AA9',
                            borderRadius: '4px',
                        }}
                        creatable
                        data={locations}
                        onCreate={(_, item) => {
                            setLocations([...locations, item]);
                        }}
                    />
                    <Text variant={'w400s17'} fontWeight={'700'}>
                        說明
                    </Text>
                    <Textarea
                        color={'#667080'}
                        border={'2px solid'}
                        borderColor={'#919AA9'}
                        borderRadius={'4px'}
                        flexGrow={1}
                        resize={'none'}
                    ></Textarea>
                </Flex>
            </Flex>
        </Flex>
    );
}
