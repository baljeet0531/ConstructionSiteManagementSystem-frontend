/* eslint-disable no-unused-vars */
import { Button, Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { Uploader } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { FileType } from 'rsuite/esm/Uploader';
import { AddIcon, BackIcon, EditIcon } from '../../Icons/Icons';
import PhotoCreateList from './PhotoCreateList';

export default function PhotoCreatePage(props: {
    siteName: string;
    onToggle: () => void;
}) {
    const { onToggle, siteName } = props;
    const [photos, setPhotos] = React.useState<FileType[]>([]);
    const [categories, setCategories] = React.useState<ItemDataType[]>([]);
    const [locations, setLocations] = React.useState<ItemDataType[]>([]);
    return (
        <Flex direction={'column'} w={'100%'} h={'100%'}>
            <Flex
                direction={'column'}
                padding={'47px 42px 10px 42px'}
                borderBottom={'1px solid #667080'}
                gap={'11px'}
                w={'100%'}
            >
                <Text variant={'pageSiteName'}>{siteName}</Text>
                <Text variant={'pageTitle'}>新增相片</Text>
                <Flex align={'center'} justify={'space-between'}>
                    <Button
                        variant={'buttonGrayOutline'}
                        leftIcon={<BackIcon />}
                        onClick={onToggle}
                    >
                        確定新增
                    </Button>
                    <Flex align={'center'} justify={'flex-end'} gap={'10px'}>
                        <Uploader
                            action="#"
                            listType="picture-text"
                            fileList={[]}
                            onChange={(fileList) => {
                                setPhotos([...photos, ...fileList]);
                            }}
                            autoUpload={false}
                            multiple
                            accept="image/*"
                            className="photo-uploader-trigger"
                        >
                            <IconButton
                                variant={'blueOutline'}
                                aria-label="export photos"
                                icon={<AddIcon />}
                            />
                        </Uploader>
                        <Button
                            variant={'buttonBlueSolid'}
                            leftIcon={<EditIcon />}
                            onClick={onToggle}
                        >
                            確定新增
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            <PhotoCreateList
                photos={photos}
                setPhotos={setPhotos}
                categories={categories}
                setCategories={setCategories}
                locations={locations}
                setLocations={setLocations}
            />
        </Flex>
    );
}
