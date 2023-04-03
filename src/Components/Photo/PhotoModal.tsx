/* eslint-disable no-unused-vars */
import { gql, useMutation } from '@apollo/client';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Flex,
    Text,
    Button,
    useToast,
    Center,
    Image,
    Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { DatePicker, InputPicker } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { getImage } from '../../Utils/Resources';
import { IPhotoChecked } from './Interface';
import dayjs from 'dayjs';

export default function PhotoModal(props: {
    photoValues: IPhotoChecked;
    serverCategories: ItemDataType[];
    serverLocations: ItemDataType[];
    isOpen: boolean;
    onClose: () => void;
}) {
    const { photoValues, serverCategories, serverLocations, isOpen, onClose } =
        props;
    const { imagePath, category, date, location, description } = photoValues;
    const toast = useToast();
    const [imageSrc, setImageSrc] = React.useState<string>('');
    React.useEffect(() => {
        getImage(photoValues.imagePath).then((blob) => {
            blob ? setImageSrc(URL.createObjectURL(blob)) : '';
        });
    }, [imagePath, isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
            <ModalOverlay />
            <ModalContent
                padding={'24px'}
                className="photo-modal
"
            >
                <ModalBody padding={0} mb={'23px'}>
                    <Flex
                        width={'100%'}
                        height={'100%'}
                        gap={'28px'}
                        bg={'#FFFFFF'}
                        borderRadius={'4px'}
                    >
                        <Center
                            flexGrow={1}
                            border={'2px solid #919AA9'}
                            bg={'#EEF0F4'}
                        >
                            <Image
                                h={'100%'}
                                w={'100%'}
                                objectFit={'contain'}
                                src={imageSrc}
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
                                    defaultValue={category}
                                    data={serverCategories}
                                />
                                <Text variant={'w400s17'} fontWeight={'700'}>
                                    拍攝日期
                                </Text>
                                <DatePicker
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
                                    defaultValue={dayjs(date).toDate()}
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
                                    defaultValue={location}
                                    data={serverLocations}
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
                                    defaultValue={description}
                                ></Textarea>
                            </Flex>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter padding={0}>
                    <Button
                        variant={'whiteOutline'}
                        mr={'16px'}
                        onClick={onClose}
                    >
                        關閉
                    </Button>
                    <Button variant={'buttonBlueSolid'}>編輯</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
