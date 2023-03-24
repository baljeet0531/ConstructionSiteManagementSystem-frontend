import { Flex, Text, Image, Textarea, Center } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { DatePicker, InputPicker, Uploader } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { FileType } from 'rsuite/esm/Uploader';

export default function PhotoCreateList(props: {
    photos: FileType[];
    setPhotos: React.Dispatch<React.SetStateAction<FileType[]>>;
    categories: ItemDataType[];
    setCategories: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
    locations: ItemDataType[];
    setLocations: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
}) {
    const {
        photos,
        setPhotos,
        categories,
        setCategories,
        locations,
        setLocations,
    } = props;
    const uploader = React.useRef();
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
                <Uploader
                    ref={uploader}
                    action="#"
                    listType="picture-text"
                    fileList={photos}
                    autoUpload={false}
                    draggable
                    multiple
                    accept="image/*"
                    onChange={setPhotos}
                    renderThumbnail={(_, thumbnail: any) => (
                        <Center width={'100%'} height={'100%'} bg={'#919AA91A'}>
                            <Image
                                {...thumbnail.props}
                                objectFit="contain"
                                maxH={'374px'}
                            />
                        </Center>
                    )}
                    renderFileInfo={(file) => (
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
                                style={{ color: '#667080' }}
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
                                defaultValue={dayjs(
                                    file.blobFile?.lastModified
                                ).toDate()}
                                format={'yyyy/MM/dd'}
                                ranges={[
                                    {
                                        label: 'today',
                                        value: new Date(),
                                    },
                                ]}
                                oneTap
                            ></DatePicker>
                            <Text variant={'w400s17'} fontWeight={'700'}>
                                位置
                            </Text>
                            <InputPicker
                                style={{ color: '#667080' }}
                                creatable
                                data={locations}
                                onCreate={(_, item) => {
                                    setLocations([...locations, item]);
                                }}
                            />
                            <Text variant={'w400s17'} fontWeight={'700'}>
                                說明
                            </Text>
                            <Textarea flexGrow={1} resize={'none'}></Textarea>
                        </Flex>
                    )}
                >
                    <></>
                </Uploader>
            </Flex>
        </Flex>
    );
}
