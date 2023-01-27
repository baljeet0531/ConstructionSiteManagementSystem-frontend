import {
    Box,
    Button,
    Center,
    IconButton,
    Image,
    Input,
    Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { AddIcon, CloseIcon } from '../../Icons/Icons';
import { formFiles } from './BuildFormik';

export default function FileInput(props: {
    setFileStates: React.Dispatch<React.SetStateAction<formFiles>>;
    file: File | undefined;
    imgLoading: boolean;
    height?: any;
    fieldName: keyof formFiles;
    index?: number;
}) {
    const {
        setFileStates,
        height,
        fieldName,
        imgLoading,
        file,
        index = 0,
    } = props;

    return (
        <Box
            flexGrow={1}
            h={height || '374px'}
            bg={'#FFFFFF'}
            borderRadius={'0.375rem'}
            border={'2px solid #919AA9'}
        >
            {imgLoading ? (
                <Center w={'100%'} h={'100%'} pos={'relative'}>
                    <Spinner size={'md'} />
                </Center>
            ) : (
                <Center w={'100%'} h={'100%'} pos={'relative'}>
                    {file ? (
                        <Image
                            h={'100%'}
                            w={'100%'}
                            objectFit={'contain'}
                            src={URL.createObjectURL(file as File)}
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
                            if (fieldName == 'HImgs') {
                                setFileStates((prevState) => {
                                    if (e.target.files) {
                                        return {
                                            ...prevState,
                                            HImgs: prevState[fieldName][index]
                                                ? [
                                                      ...prevState.HImgs.slice(
                                                          0,
                                                          index
                                                      ),
                                                      e.target.files[0],
                                                      ...prevState.HImgs.slice(
                                                          index + 1
                                                      ),
                                                  ]
                                                : [
                                                      ...prevState.HImgs.slice(
                                                          0,
                                                          index
                                                      ),
                                                      e.target.files[0],
                                                      undefined,
                                                  ],
                                        };
                                    } else return prevState;
                                });
                            } else {
                                setFileStates((prevState) => {
                                    if (e.target.files) {
                                        return {
                                            ...prevState,
                                            [fieldName]: e.target.files[0],
                                        };
                                    } else return prevState;
                                });
                            }
                            e.target.value = '';
                        }}
                    ></Input>
                    {file && (
                        <IconButton
                            size={'xs'}
                            aria-label="DeletePhoto"
                            icon={<CloseIcon />}
                            bg={'none'}
                            position={'absolute'}
                            top={0}
                            right={0}
                            onClick={() => {
                                if (fieldName == 'HImgs') {
                                    setFileStates((prevState) => ({
                                        ...prevState,
                                        HImgs: [
                                            ...prevState.HImgs.slice(0, index),
                                            ...prevState.HImgs.slice(index + 1),
                                        ],
                                    }));
                                } else {
                                    setFileStates((prevState) => ({
                                        ...prevState,
                                        [fieldName]: undefined,
                                    }));
                                }
                            }}
                        ></IconButton>
                    )}
                </Center>
            )}
        </Box>
    );
}
