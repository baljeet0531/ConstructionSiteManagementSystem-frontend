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
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import { IPhotoChecked } from './Interface';
import dayjs from 'dayjs';
import { CustomLoading } from '../Shared/Loading';
import { QUERY_PHOTOS } from './PhotoOverviewPage';

const UPDATE_PHOTOS = gql`
    mutation UpdateImageManagement(
        $category: String
        $date: Date
        $description: String
        $location: String
        $no: Int!
    ) {
        updateImageManagement(
            category: $category
            date: $date
            description: $description
            location: $location
            no: $no
        ) {
            ok
            message
        }
    }
`;

export default function PhotoModal(props: {
    photoValues: IPhotoChecked;
    serverCategories: ItemDataType[];
    serverLocations: ItemDataType[];
    isOpen: boolean;
    onClose: () => void;
}) {
    const { photoValues, serverCategories, serverLocations, isOpen, onClose } =
        props;
    const { no, imagePath, description } = photoValues;
    const toast = useToast();
    const [imageSrc, setImageSrc] = React.useState<string>('');
    const [category, setCategory] = React.useState<string>(
        photoValues.category
    );
    const [date, setDate] = React.useState<Date | null>(
        dayjs(photoValues.date).toDate()
    );
    const [location, setLocation] = React.useState<string>(
        photoValues.location
    );
    const [editable, setEditable] = React.useState<boolean>(false);
    const descriptionRef = React.useRef<HTMLTextAreaElement>(null);

    const [updatePhotos, { loading }] = useMutation(UPDATE_PHOTOS, {
        onCompleted: ({ updateImageManagement }) => {
            const { ok, message } = updateImageManagement;
            if (ok) {
                defaultSuccessToast(toast, message);
            }
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
        refetchQueries: [QUERY_PHOTOS],
        awaitRefetchQueries: true,
    });

    React.useEffect(() => {
        getImage(photoValues.imagePath).then((blob) => {
            blob ? setImageSrc(URL.createObjectURL(blob)) : '';
        });
    }, [imagePath, isOpen]);

    return loading ? (
        <CustomLoading
            position="absolute"
            top={0}
            left={0}
            bg={'#D9D9D980'}
            zIndex={99}
        />
    ) : (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
            <ModalOverlay />
            <ModalContent padding={'24px'} className="photo-modal">
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
                        <Flex width={'185px'} flexShrink={0}>
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
                                    value={category}
                                    data={serverCategories}
                                    disabled={!editable}
                                    onChange={(val) => {
                                        setCategory(val);
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
                                    format={'yyyy/MM/dd'}
                                    ranges={[
                                        {
                                            label: 'today',
                                            value: new Date(),
                                        },
                                    ]}
                                    oneTap
                                    cleanable={false}
                                    value={date}
                                    disabled={!editable}
                                    onChange={(val) => {
                                        setDate(val);
                                    }}
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
                                    value={location}
                                    data={serverLocations}
                                    disabled={!editable}
                                    onChange={(val) => {
                                        setLocation(val);
                                    }}
                                />
                                <Text variant={'w400s17'} fontWeight={'700'}>
                                    說明
                                </Text>
                                <Textarea
                                    ref={descriptionRef}
                                    color={'#667080'}
                                    border={'2px solid'}
                                    borderColor={'#919AA9'}
                                    borderRadius={'4px'}
                                    flexGrow={1}
                                    resize={'none'}
                                    defaultValue={description}
                                    disabled={!editable}
                                ></Textarea>
                            </Flex>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter padding={0}>
                    {!editable ? (
                        <Flex justify={'flex-end'}>
                            <Button
                                variant={'whiteOutline'}
                                mr={'16px'}
                                onClick={onClose}
                            >
                                關閉
                            </Button>
                            <Button
                                variant={'buttonBlueSolid'}
                                onClick={() => {
                                    setEditable((prev) => !prev);
                                }}
                            >
                                編輯
                            </Button>
                        </Flex>
                    ) : (
                        <Flex justify={'flex-end'}>
                            <Button
                                variant={'whiteOutline'}
                                mr={'16px'}
                                onClick={() => {
                                    setEditable((prev) => !prev);
                                }}
                            >
                                取消
                            </Button>
                            <Button
                                variant={'buttonBlueSolid'}
                                onClick={() => {
                                    updatePhotos({
                                        variables: {
                                            no: no,
                                            category: category || '未分類',
                                            date: dayjs(date).format(
                                                'YYYY-MM-DD'
                                            ),
                                            location: location || '無資訊',
                                            description:
                                                descriptionRef.current?.value ||
                                                '',
                                        },
                                    });
                                }}
                            >
                                確定
                            </Button>
                        </Flex>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
