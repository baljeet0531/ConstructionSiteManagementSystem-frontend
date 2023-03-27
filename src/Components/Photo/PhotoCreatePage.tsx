import { gql, useMutation } from '@apollo/client';
import {
    Button,
    Flex,
    IconButton,
    Input,
    Text,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { AddIcon, BackIcon, EditIcon } from '../../Icons/Icons';
import { defaultSuccessToast } from '../../Utils/DefaultToast';
import PhotoCreateList from './PhotoCreateList';

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
    siteName: string;
    onToggle: () => void;
}) {
    const { onToggle, siteName } = props;
    const toast = useToast();
    // const [photos, setPhotos] = React.useState<FileType[]>([]);
    const [photos, setPhotos] = React.useState<File[]>([]);
    // const [photos, setPhotos] = React.useState<FileList | null>(null);
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
                        上一頁
                    </Button>
                    <Flex align={'center'} justify={'flex-end'} gap={'10px'}>
                        <IconButton
                            variant={'blueOutline'}
                            aria-label="export photos"
                            icon={<AddIcon />}
                            onClick={() => inputFileRef.current?.click()}
                        />
                        <Input
                            ref={inputFileRef}
                            display={'none'}
                            type={'file'}
                            accept={'image/*'}
                            multiple
                            onChange={() => {
                                const files = inputFileRef.current?.files;
                                setPhotos(files ? Object.values(files) : []);
                            }}
                        />
                        <Button
                            variant={'buttonBlueSolid'}
                            leftIcon={<EditIcon />}
                            onClick={() => {
                                // const uploadedItems =
                                //     uploaderRef.current?.querySelectorAll(
                                //         '.rs-uploader-file-item'
                                //     );
                                // console.log(uploadedItems);
                                // createPhotos({
                                //     variables: {
                                //         content: [
                                //             {
                                //                 image: 'Upload!',
                                //                 category: 'String',
                                //                 date: 'Date!',
                                //                 location: ' String!',
                                //                 description: 'String',
                                //             },
                                //         ],
                                //         siteId: 'string',
                                //     },
                                // });
                                // onToggle()
                            }}
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
