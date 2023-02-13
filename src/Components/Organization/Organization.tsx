/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { IsPermit } from '../../Mockdata/Mockdata';
import {
    Button,
    Center,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import {
    AddIcon,
    DeleteIcon,
    LaunchIcon,
    ReplyIcon,
    SearchIcon,
} from '../../Icons/Icons';
import OrgTable from './OrgTable';
import AddPeopleModal from './AddPeopleModal';
import ReactWindowTable, {
    defalutElement,
    IColumnMap,
    ISizes,
} from './ReactWindowTable';

export interface organizationData {
    contractingCompanyName: string;
    name: string;
    idno: string;
    birthday: string;
    gender: string;
    bloodType: string;
    tel: string;
}
export interface organizationDataChecked extends organizationData {
    index: number;
    isChecked: boolean;
}

const columnMap: IColumnMap[] = [
    {
        title: '編號',
        width: 70,
        variable: 'index',
        getElement: (props) =>
            defalutElement({
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '5px',
                    borderRight: '1px solid #919AA9',
                    borderBottom: '1px solid #919AA9',
                },
            }),
    },
    {
        title: '承攬公司',
        width: 125,
        variable: 'corp',
        getElement: (props) =>
            defalutElement({
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '5px',
                    borderRight: '1px solid #919AA9',
                    borderBottom: '1px solid #919AA9',
                },
            }),
    },
    {
        title: '姓名',
        width: 125,
        variable: 'name',
        getElement: (props) =>
            defalutElement({
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '5px',
                    borderRight: '1px solid #919AA9',
                    borderBottom: '1px solid #919AA9',
                },
            }),
    },
    {
        title: '身分證字號',
        width: 125,
        variable: 'idno',
        getElement: (props) =>
            defalutElement({
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '5px',
                    borderRight: '1px solid #919AA9',
                    borderBottom: '1px solid #919AA9',
                },
            }),
    },
    {
        title: '出生日期',
        width: 125,
        variable: 'birth',
        getElement: (props) =>
            defalutElement({
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '5px',
                    borderRight: '1px solid #919AA9',
                    borderBottom: '1px solid #919AA9',
                },
            }),
    },
    {
        title: '性別',
        width: 50,
        variable: 'gender',
        getElement: (props) =>
            defalutElement({
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '5px',
                    borderRight: '1px solid #919AA9',
                    borderBottom: '1px solid #919AA9',
                },
            }),
    },
    {
        title: '血型',
        width: 50,
        variable: 'blood',
        getElement: (props) =>
            defalutElement({
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '5px',
                    borderRight: '1px solid #919AA9',
                    borderBottom: '1px solid #919AA9',
                },
            }),
    },
    {
        title: '聯絡電話',
        width: 125,
        variable: 'tel',
        getElement: (props) =>
            defalutElement({
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '5px',
                    borderRight: '1px solid #919AA9',
                    borderBottom: '1px solid #919AA9',
                },
            }),
    },
    {
        title: '全選',
        width: 82,
        variable: 'isChecked',
        getElement: (props) =>
            defalutElement({
                ...props,
                style: {
                    ...props.style,
                    paddingTop: '5px',
                    borderBottom: '1px solid #919AA9',
                },
            }),
    },
];

const sizes: ISizes = {
    tableViewHeight: 570,
    tableFigmaWidth: 877,
    // tableViewWidth: 860,
    headerHeight: 56,
    cellHeight: 30,
};

const mockQueryData = {
    A122898710: {
        corp: '華穗',
        name: '馮明輝',
        idno: 'A122898710',
        birth: '1959-10-20',
        gender: '男',
        blood: 'A',
        tel: '0910-645031',
    },
    A121097853: {
        corp: '合順儀電工程行',
        name: '陳信宗',
        idno: 'A121097853',
        birth: '1963-02-22',
        gender: '男',
        blood: 'B',
        tel: '0939-218956',
    },
    A120777781: {
        corp: '力天',
        name: '吳聲天',
        idno: 'A120777781',
        birth: '1961-04-18',
        gender: '男',
        blood: 'A',
        tel: '0986-050147',
    },
    A120114828: {
        corp: '力天',
        name: '陳志誠',
        idno: 'A120114828',
        birth: '1969-02-04',
        gender: '男',
        blood: 'O',
        tel: '0916-757365',
    },
};

export default function Organization(props: { siteId: string }) {
    if (!IsPermit('organization')) return <Navigate to="/" replace={true} />;
    const { siteId } = props;
    const disclosure = useDisclosure();
    const { isOpen, onOpen, onClose } = disclosure;

    const reprocessingData = Object.keys(mockQueryData).map(
        (primarykey, index) => {
            return {
                [primarykey]: {
                    ...mockQueryData[primarykey as keyof typeof mockQueryData],
                    index: index + 1,
                    isChecked: false,
                },
            };
        }
    );
    const reprocessingDataObj: {
        [primaryKey: string]: organizationDataChecked;
    } = Object.assign({}, ...reprocessingData);

    const [organizationTableData, setOrganizationTableData] = React.useState<{
        [primaryKey: string]: organizationDataChecked;
    }>(reprocessingDataObj);

    return (
        <Flex
            direction={'column'}
            h={'100vh'}
            w={'100%'}
            pl={'42px'}
            pr={'42px'}
            pt={'47px'}
            pb={'24px'}
            gap={'11px'}
        >
            <Text
                fontWeight={500}
                fontSize={'14px'}
                lineHeight={'20px'}
                position={'absolute'}
                top={'20px'}
                right={'42px'}
            >
                穩懋南科路竹廠機電一期新建工程
            </Text>
            <Text variant={'pageTitle'}>專案人員組織</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <InputGroup w={'230px'}>
                        <InputLeftElement>
                            <IconButton
                                aria-label="Search"
                                icon={<SearchIcon />}
                                background="transparent"
                                _active={{ background: 'transparent' }}
                                _focus={{ background: 'transparent' }}
                                _hover={{ background: 'transparent' }}
                            ></IconButton>
                        </InputLeftElement>
                        <Input
                            // ref={searchInputRef}
                            w={'fit-content'}
                            type="text"
                            border={'2px solid'}
                            borderColor={'#919AA9'}
                            bg={'#FFFFFF'}
                            height={'36px'}
                            placeholder="搜尋身分證字號或承攬公司"
                            _placeholder={{
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '0.875rem',
                                lineHeight: '2.25rem',
                                color: 'rgba(102, 112, 128, 0.5)',
                            }}
                            // onChange={handleDebounceSearch}
                        />
                    </InputGroup>
                    <Button
                        leftIcon={<AddIcon />}
                        variant={'buttonBlueSolid'}
                        onClick={onOpen}
                    >
                        新增人員
                    </Button>
                </Flex>
                <Flex gap={'10px'}>
                    <Button
                        leftIcon={<ReplyIcon />}
                        variant={'buttonGrayOutline'}
                        // onClick={onOpen}
                    >
                        批次輸入
                    </Button>
                    <Button
                        leftIcon={<LaunchIcon />}
                        variant={'buttonGrayOutline'}
                    >
                        輸出
                    </Button>
                    <Button
                        leftIcon={<DeleteIcon />}
                        variant={'buttonGrayOutline'}
                    >
                        刪除
                    </Button>
                </Flex>
            </Flex>
            {/* <OrgTable
                overviewTableData={organizationTableData}
                setOverviewTableData={setOrganizationTableData}
            ></OrgTable> */}
            <ReactWindowTable
                tableData={organizationTableData}
                // setOverviewTableData={setOrganizationTableData}
                columnMap={columnMap}
                sizes={sizes}
            />
            <AddPeopleModal disclosure={disclosure}></AddPeopleModal>
            {/* {(loading || searchLoading || exportLoading) && (
        <Center
            top={0}
            left={'20vw'}
            w={'80vw'}
            h={'100vh'}
            bg={'#D9D9D980'}
            zIndex={2}
        >
            <Spinner size={'xl'} />
        </Center>
    )} */}
        </Flex>
    );
}
