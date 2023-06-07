import React from 'react';
import {
    Button,
    Flex,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    IconButton,
    Textarea,
    Box,
    Image,
} from '@chakra-ui/react';
import { AddFileIcon, EditIcon } from '../../Icons/Icons';
import { Uploader } from 'rsuite';
import { FileType } from 'rsuite/esm/Uploader';
import { IMachinery } from '../../Interface/Machinery';
import { getImage } from '../../Utils/Resources';
import { useUpdateMachinery } from '../../Hooks/GQLMutation';
import { PageLoading } from '../Shared/Loading';
export default function RemarksTable(props: {
    isOpen: boolean;
    onClose: () => void;
    info: IMachinery;
    editable: boolean;
}) {
    const { isOpen, onClose, info, editable } = props;
    const { inspectionNo, siteId, remarks } = info;
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [originText, setOriginText] = React.useState<string>(
        remarks.text || ''
    );
    const [remarksText, setRemarksText] = React.useState<string>(
        remarks.text || ''
    );
    const [originPhotos, setOriginPhotos] = React.useState<FileType[]>([]);
    const [remarksPhotos, setRemarksPhotos] = React.useState<FileType[]>(
        remarks.photos.map(() => ({ status: 'uploading' }))
    );
    const remarksRef = React.useRef<HTMLTextAreaElement>(null);
    const uploader = React.useRef();
    const [updateMachinery, { loading }] = useUpdateMachinery(siteId);

    const blobToFileType = (data: (Blob | undefined)[]) =>
        data.flatMap((blob, index) =>
            blob
                ? {
                      blobFile: new File(
                          [blob],
                          `${remarks.photos[index].path.split('/').pop()}`,
                          {
                              type: blob.type,
                          }
                      ),
                  }
                : []
        );

    React.useEffect(() => {
        Promise.all(
            remarks.photos.map(({ path }) => {
                return getImage(path);
            })
        )
            .then((data) => {
                const photos = blobToFileType(data);
                setOriginPhotos(photos);
                setRemarksPhotos(photos);
            })
            .catch((err) => console.log(err));
    }, [remarks.photos]);

    React.useEffect(() => {
        setOriginText(remarks.text);
    }, [remarks.text]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setEditMode(false);
                onClose();
            }}
            size={'xl'}
            isCentered
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent padding={'24px'}>
                <ModalBody padding={0}>
                    <Flex direction={'column'} gap={'16px'}>
                        <Flex align={'center'} justify={'space-between'}>
                            <Text
                                variant={'w700s16'}
                                fontSize={'1.25rem'}
                                lineHeight={'1.5rem'}
                            >
                                備註
                            </Text>
                            {editable && (
                                <IconButton
                                    size={'xs'}
                                    h={'20px'}
                                    color={'#667080'}
                                    bg={'#FFFFFF'}
                                    aria-label="edit remarks"
                                    icon={<EditIcon />}
                                    onClick={() => {
                                        setEditMode(true);
                                    }}
                                />
                            )}
                        </Flex>
                        <Textarea
                            ref={remarksRef}
                            value={remarksText}
                            onChange={(e) => {
                                setRemarksText(e.target.value);
                            }}
                            h={'120px'}
                            w={'auto'}
                            resize={'none'}
                            border={'2px dashed '}
                            borderColor={'#919AA9'}
                            color={'#667080'}
                            bg={'#919AA91A'}
                            _hover={{
                                borderColor: '#919AA9',
                            }}
                            _disabled={{
                                cursor: 'default',
                                opacity: 1,
                                bg: '#FFFFFF',
                            }}
                            disabled={!editMode}
                        ></Textarea>
                        <Text
                            variant={'w700s16'}
                            fontSize={'1.25rem'}
                            lineHeight={'1.5rem'}
                        >
                            相片
                        </Text>
                        <Flex
                            height={'206px'}
                            width={'100%'}
                            gap={'20px'}
                            overflowX={'auto'}
                            className={'remarks-uploader'}
                        >
                            <Uploader
                                listType="picture"
                                fileList={remarksPhotos}
                                autoUpload={false}
                                removable={editMode}
                                draggable
                                multiple
                                action="#"
                                accept="image/*"
                                onChange={setRemarksPhotos}
                                ref={uploader}
                                renderThumbnail={(file, thumbnail: any) => (
                                    <Box
                                        width={'200px'}
                                        height={'200px'}
                                        bg={'#919AA91A'}
                                    >
                                        <Image
                                            {...thumbnail.props}
                                            boxSize="200px"
                                            objectFit="contain"
                                        />
                                    </Box>
                                )}
                            >
                                {editMode ? (
                                    <Box
                                        style={{
                                            margin: '0px',
                                            height: '200px',
                                            width: '200px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            gap: '16px',
                                            color: '#667080',
                                            background: '#919AA91A',
                                            border: '2px dashed #919AA9',
                                        }}
                                    >
                                        <AddFileIcon />
                                        <Text>新增相片</Text>
                                    </Box>
                                ) : (
                                    <></>
                                )}
                            </Uploader>
                        </Flex>
                        {editMode ? (
                            <Flex justify={'space-between'} width={'100%'}>
                                <Button
                                    variant={'buttonGrayOutline'}
                                    bg={'#FFFFFF'}
                                    height={'36px'}
                                    mr={3}
                                    onClick={() => {
                                        setEditMode(false);
                                        setRemarksText(originText);
                                        setRemarksPhotos(originPhotos);
                                    }}
                                >
                                    取消編輯
                                </Button>
                                <Button
                                    variant={'buttonBlueSolid'}
                                    height={'36px'}
                                    onClick={() => {
                                        updateMachinery({
                                            variables: {
                                                checkId: inspectionNo,
                                                siteId: siteId,
                                                supplementary:
                                                    remarksRef.current?.value ||
                                                    '',
                                                images: remarksPhotos.map(
                                                    ({ blobFile }) => blobFile
                                                ),
                                            },
                                        }).then(() => {
                                            setEditMode(false);
                                            setRemarksText(
                                                remarksRef.current?.value || ''
                                            );
                                        });
                                    }}
                                >
                                    確定編輯
                                </Button>
                            </Flex>
                        ) : (
                            <Flex justify={'flex-end'} width={'100%'}>
                                <Button
                                    variant={'buttonBlueSolid'}
                                    height={'36px'}
                                    onClick={() => {
                                        onClose();
                                    }}
                                >
                                    確定
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </ModalBody>
            </ModalContent>
            {loading && <PageLoading zIndex={9999} />}
        </Modal>
    );
}
