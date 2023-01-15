import {
    Box,
    Button,
    Center,
    IconButton,
    Image,
    Input,
} from '@chakra-ui/react';
import React from 'react';
import { AddIcon, CloseIcon } from '../../Icons/Icons';
import { formFiles } from './BuildFormik';

export default function FileInput(props: {
    fileStates: formFiles;
    setFileStates: React.Dispatch<React.SetStateAction<formFiles>>;
    height?: any;
    fieldName: keyof formFiles;
}) {
    const { fileStates, setFileStates, height, fieldName } = props;

    return (
        <Box
            flexGrow={1}
            h={height || '374px'}
            bg={'#FFFFFF'}
            borderRadius={'0.375rem'}
            border={'2px solid #919AA9'}
        >
            <Center w={'100%'} h={'100%'} pos={'relative'}>
                {fileStates[fieldName] ? (
                    <Image
                        h={'100%'}
                        w={'100%'}
                        objectFit={'contain'}
                        src={URL.createObjectURL(fileStates[fieldName] as File)}
                        onLoad={(e) => {
                            const image = e.target as HTMLImageElement;
                            URL.revokeObjectURL(image.src);
                        }}
                    />
                ) : (
                    <Button
                        leftIcon={<AddIcon width={'14'} height={'14'} />}
                        bg={'#4C7DE7'}
                        color={'#FFFFFF'}
                        borderRadius={'3px'}
                        size={'xs'}
                        fontSize={'0.625rem'}
                    >
                        上傳照片
                    </Button>
                )}
                <Input
                    pos={'absolute'}
                    h={'100%'}
                    w={'100%'}
                    opacity={0}
                    type={'file'}
                    accept={'image/*'}
                    onChange={(e) => {
                        if (e.target.files) {
                            setFileStates({
                                ...fileStates,
                                [fieldName]: e.target.files[0],
                            });
                            e.target.value = '';
                        }
                    }}
                ></Input>
                {fileStates[fieldName] && (
                    <IconButton
                        size={'xs'}
                        aria-label="DeletePhoto"
                        icon={<CloseIcon />}
                        bg={'none'}
                        position={'absolute'}
                        top={0}
                        right={0}
                        onClick={() => {
                            setFileStates({
                                ...fileStates,
                                [fieldName]: undefined,
                            });
                        }}
                    ></IconButton>
                )}
            </Center>
        </Box>
    );
}
