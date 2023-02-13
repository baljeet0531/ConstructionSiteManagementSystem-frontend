import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Flex,
    Text,
    Select,
    Input,
    Box,
    Checkbox,
} from '@chakra-ui/react';
import ReactWindowTable, {
    defalutElement,
    getElementProps,
    dataCellStyle,
    IColumnMap,
    ISizes,
} from './ReactWindowTable';

const columnMap: IColumnMap[] = [
    {
        title: '承攬公司',
        width: 100,
        variable: 'name',
        getElement: defalutElement,
    },
    {
        title: '姓名',
        width: 100,
        variable: 'contractingCompanyName',
        getElement: defalutElement,
    },
    {
        title: '身分證字號',
        width: 100,
        variable: 'idno',
        getElement: defalutElement,
    },
    {
        title: '出生日期',
        width: 100,
        variable: 'birthday',
        getElement: defalutElement,
    },
    {
        title: '全選',
        width: 50,

        variable: 'isChecked',
        getElement: ({ style, info, variable }: getElementProps) => {
            return (
                <Box style={style} {...dataCellStyle}>
                    <Checkbox
                        isChecked={info[variable]}
                        // onChange={
                        //     (e)=>{
                        //         setState((prevState)=>({...prevState,[primarykey]:{
                        //             ...info,
                        //             isCheck:e.target.checked,
                        //         }}))
                        //     }
                        // }
                    ></Checkbox>
                </Box>
            );
        },
    },
];
const tableData = {
    a: {
        name: 'a',
        contractingCompanyName: 'ac',
        idno: 'ai',
        birthday: 'ab',
        isChecked: false,
    },
    b: {
        name: 'b',
        contractingCompanyName: 'bc',
        idno: 'bi',
        birthday: 'bb',
        isChecked: false,
    },
    c: {
        name: 'c',
        contractingCompanyName: 'cc',
        idno: 'ci',
        birthday: 'cb',
        isChecked: false,
    },
    d: {
        name: 'd',
        contractingCompanyName: 'dc',
        idno: 'di',
        birthday: 'db',
        isChecked: false,
    },
    e: {
        name: 'e',
        contractingCompanyName: 'ec',
        idno: 'ei',
        birthday: 'eb',
        isChecked: false,
    },
    f: {
        name: 'f',
        contractingCompanyName: 'fc',
        idno: 'fi',
        birthday: 'fb',
        isChecked: false,
    },
};

const sizes: ISizes = {
    tableViewHeight: 220,
    tableFigmaWidth: 450,
    tableViewWidth: 450,
    headerHeight: 36,
    cellHeight: 44,
};

export default function AddPeopleModal(props: {
    disclosure: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
        onToggle: () => void;
        isControlled: boolean;
        // eslint-disable-next-line no-unused-vars
        getButtonProps: (props?: any) => any;
        // eslint-disable-next-line no-unused-vars
        getDisclosureProps: (props?: any) => any;
    };
}) {
    const { disclosure } = props;
    const { isOpen, onClose } = disclosure;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                maxWidth={'614px'}
                maxHeight={'590px'}
                minHeight={'590px'}
                padding={'30px 45px 22px 45px'}
            >
                <ModalHeader padding={0}>
                    <Flex direction={'column'} width={'100%'}>
                        <Text
                            fontStyle={'normal'}
                            fontWeight={700}
                            fontSize={'20px'}
                            lineHeight={'20px'}
                        >
                            新增人員
                        </Text>
                        <Text
                            textAlign={'end'}
                            fontStyle={'normal'}
                            fontWeight={500}
                            fontSize={'12px'}
                            lineHeight={'20px'}
                        >
                            穩懋南科路竹廠機電一期新建工程
                        </Text>
                    </Flex>
                </ModalHeader>
                <ModalBody
                    bg={'#E3ECFF'}
                    padding={'41px 37px'}
                    borderRadius={'10px'}
                >
                    <Flex
                        width={'100%'}
                        height={'100%'}
                        bg={'#E3ECFF'}
                        direction={'column'}
                        gap={'20px'}
                    >
                        <Flex
                            width={'220px'}
                            h={'36px'}
                            align={'center'}
                            justify={'space-between'}
                            gap={'11px'}
                        >
                            <Text>承攬公司</Text>
                            <Select
                                width={'120px'}
                                h={'36px'}
                                variant={'formOutline'}
                            ></Select>
                        </Flex>
                        <Flex
                            width={'220px'}
                            align={'center'}
                            justify={'space-between'}
                            gap={'11px'}
                        >
                            <Text>身分證字號</Text>
                            <Input
                                width={'120px'}
                                placeholder={'請輸入'}
                                variant={'formOutline'}
                            ></Input>
                        </Flex>
                        <ReactWindowTable
                            tableData={tableData}
                            columnMap={columnMap}
                            sizes={sizes}
                        />
                    </Flex>
                </ModalBody>

                <ModalFooter padding={0}>
                    <Flex mt={'20px'} justify={'space-between'} width={'100%'}>
                        <Button
                            variant={'buttonGrayOutline'}
                            size={'sm'}
                            mr={3}
                            onClick={onClose}
                        >
                            取消新增
                        </Button>
                        <Button variant={'buttonGrayOutline'} size={'sm'}>
                            確定新增
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
