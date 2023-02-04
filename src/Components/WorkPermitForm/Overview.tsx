import React from 'react';
import { Navigate } from 'react-router-dom';
import {
    Button,
    Center,
    Checkbox,
    Flex,
    Grid,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Spinner,
    Text,
} from '@chakra-ui/react';
import { IsPermit } from '../../Mockdata/Mockdata';
import WPOverViewTable from './WPOverviewTable';
import { AddIcon, ArrowDropDownIcon, LaunchIcon } from '../../Icons/Icons';
import { gql, useQuery } from '@apollo/client';

// siteId: "TEST-1"
// number: null
// area: null
// system: null
// startDate: "2000-12-27T08:30:00"
// endDate: "2030-12-27T08:30:00"

const QUERY_WORK_PEFMIT = gql`
    query WorkPermit(
        $siteId: String!
        $number: String
        $area: String
        $system: String
        $startDate: DateTime
        $endDate: DateTime
    ) {
        workPermit(
            siteId: $siteId
            number: $number
            area: $area
            system: $system
            startDate: $startDate
            endDate: $endDate
        ) {
            siteId
            number
            applicant
            applied
            modified
            supplyDate
            system
            systemBranch
            project
            area
            zone
            workStart
            workEnd
            supervisorCorp
            supervisor
            tel
            projectName
            opFire
            opAloft
            opConfined
            opElectric
            opCage
            opLift
            opAssemble
            opDetach
            opHole
            opChemical
            opElse
            approved
            review
            supplierManager
            supplier
            approvedRef {
                path
                time
                owner
            }
            reviewRef {
                path
                time
                owner
            }
            supplierManagerRef {
                path
                time
                owner
            }
            supplierRef {
                path
                time
                owner
            }
        }
    }
`;

const AREAS_AND_SYSTEMS = gql`
    query AreaAndSystem($siteId: String!, $area: [String]) {
        areaAndSystem(siteId: $siteId, area: $area) {
            areas
            systems
        }
    }
`;

export interface workPermit {
    siteId: string;
    number: string;
    applicant: string;
    applied: boolean;
    modified: boolean;
    supplyDate: string; //Date;
    system: string;
    systemBranch: string;
    project: string;
    area: string;
    zone: string;
    workStart: string; //Date;
    workEnd: string; //Date;
    supervisorCorp: string;
    supervisor: string;
    tel: string;
    projectName: string;
    opFire: boolean;
    opAloft: boolean;
    opConfined: boolean;
    opElectric: boolean;
    opCage: boolean;
    opLift: boolean;
    opAssemble: boolean;
    opDetach: boolean;
    opHole: boolean;
    opChemical: boolean;
    opElse: string;
    approved: number;
    review: number;
    supplierManager: number;
    supplier: number;
}

export interface workPermitRef extends workPermit {
    approvedRef: {
        path: string;
        time: string; //Date;
        owner: string;
    };
    reviewRef: {
        path: string;
        time: string; //Date;
        owner: string;
    };
    supplierManagerRef: {
        path: string;
        time: string; //Date;
        owner: string;
    };
    supplierRef: {
        path: string;
        time: string; //Date;
        owner: string;
    };
}

export interface workPermitChecked extends workPermitRef {
    isChecked: boolean;
}
export default function WorkPermitFormOverview({ siteId }: { siteId: string }) {
    if (!IsPermit('eng_work_permit_form'))
        return <Navigate to="/" replace={true} />;

    const navSingleWorkPermit = () => {
        const url = `${window.location.origin}/form/work-permit`;
        localStorage.setItem('siteId', siteId);
        // TODO: Save the workPermit item in localStorage
        // localStorage.setItem('singleWorkPermit', JSON.stringify(valueList[e.currentTarget.id]))
        window.open(url, '_blank');
    };

    const [overviewTableData, setOverviewTableData] = React.useState<{
        [primaryKey: string]: workPermitChecked;
    }>({});
    const startDateRef = React.useRef<HTMLInputElement>(null);
    const endDateRef = React.useRef<HTMLInputElement>(null);
    const { loading } = useQuery(QUERY_WORK_PEFMIT, {
        variables: {
            siteId: siteId, //string!
            // number: ,//string
            // area: ,//string
            // system: ,//string
            startDate: startDateRef.current?.value
                ? `${startDateRef.current.value}T00:00:00`
                : '1950-01-01T00:00:00', //DateTime
            endDate: endDateRef.current?.value
                ? `${endDateRef.current.value}T00:00:00`
                : '2099-12-31T23:59:59', //DateTime
        },
        onCompleted: ({ workPermit }: { workPermit: workPermit[] }) => {
            const workPermitHashed = workPermit.map((info) => ({
                [info['number']]: { ...info, isCheck: false },
            }));
            setOverviewTableData(Object.assign({}, ...workPermitHashed));
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const [areas, setAreas] = React.useState<
        { name: string; isChecked: boolean }[]
    >([]);
    const [systems, setSystems] = React.useState<
        { name: string; isChecked: boolean }[]
    >([
        { name: '空調系統', isChecked: false },
        { name: '電力系統', isChecked: false },
        { name: '消防系統', isChecked: false },
        { name: '給排水系統', isChecked: false },
        { name: '儀控系統', isChecked: false },
    ]);
    const handleSearchCheckboxClick = (
        setState: React.Dispatch<
            React.SetStateAction<
                {
                    name: string;
                    isChecked: boolean;
                }[]
            >
        >,
        index: number,
        checked: boolean
    ) => {
        setState((prevState) => {
            return [
                ...prevState.slice(0, index),
                { ...prevState[index], isChecked: checked },
                ...prevState.slice(index + 1),
            ];
        });
    };
    const areaCheckbox = areas.map((areaInfo, index) => (
        <Checkbox
            key={index}
            isChecked={areaInfo.isChecked}
            onChange={(e) =>
                handleSearchCheckboxClick(setAreas, index, e.target.checked)
            }
        >
            {areaInfo.name}
        </Checkbox>
    ));
    const systemCheckbox = systems.map((systemInfo, index) => (
        <Checkbox
            key={index}
            isChecked={systemInfo.isChecked}
            onChange={(e) =>
                handleSearchCheckboxClick(setSystems, index, e.target.checked)
            }
        >
            {systemInfo.name}
        </Checkbox>
    ));
    useQuery(AREAS_AND_SYSTEMS, {
        variables: {
            siteId: siteId,
            area: null,
        },
        onCompleted: ({
            areaAndSystem,
        }: {
            areaAndSystem: { areas: string[]; systems: string[] };
        }) => {
            const { areas } = areaAndSystem;
            setAreas(areas.map((area) => ({ name: area, isChecked: false })));
        },
        onError: (err) => {
            console.log(err);
        },
    });

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
            <Text variant={'pageTitle'}>工作許可單</Text>
            <Flex align={'center'} justify={'space-between'}>
                <Flex gap={'10px'} align={'center'}>
                    <Input
                        ref={startDateRef}
                        type={'date'}
                        width={'140px'}
                        variant={'formOutline'}
                    ></Input>
                    <Input
                        ref={endDateRef}
                        type={'date'}
                        width={'140px'}
                        variant={'formOutline'}
                    ></Input>
                    <Popover placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Button
                                rightIcon={<ArrowDropDownIcon />}
                                variant={'buttonGraySolid'}
                            >
                                搜尋條件
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody
                                display={'flex'}
                                padding={'24px'}
                                height={'328px'}
                                flexDirection={'column'}
                                justifyContent={'space-between'}
                            >
                                <Grid
                                    padding={'10px'}
                                    gap={'10px'}
                                    templateColumns={'repeat(2,1fr)'}
                                >
                                    <Flex
                                        direction={'column'}
                                        gap={'12px'}
                                        overflowX={'hidden'}
                                    >
                                        <Text>施工廠區</Text>
                                        <Flex
                                            direction={'column'}
                                            gap={'12px'}
                                            overflowY={'auto'}
                                            wordBreak={'break-word'}
                                            maxH={'202px'}
                                        >
                                            {areaCheckbox}
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        direction={'column'}
                                        gap={'12px'}
                                        overflowX={'hidden'}
                                    >
                                        <Text>系統</Text>
                                        <Flex
                                            direction={'column'}
                                            gap={'12px'}
                                            overflowY={'auto'}
                                            wordBreak={'break-word'}
                                            maxH={'202px'}
                                        >
                                            {systemCheckbox}
                                        </Flex>
                                    </Flex>
                                </Grid>
                                <Flex justifyContent="flex-end">
                                    <Button variant={'buttonBlueSolid'}>
                                        確定搜尋
                                    </Button>
                                </Flex>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
                <Flex gap={'10px'}>
                    <Button
                        leftIcon={<AddIcon />}
                        variant={'buttonBlueSolid'}
                        onClick={navSingleWorkPermit}
                    >
                        新增工單
                    </Button>
                    <Button
                        leftIcon={<LaunchIcon />}
                        variant={'buttonGrayOutline'}
                    >
                        輸出
                    </Button>
                </Flex>
            </Flex>
            <WPOverViewTable
                overviewTableData={overviewTableData}
                setOverviewTableData={setOverviewTableData}
            ></WPOverViewTable>
            {loading && (
                <Center
                    position={'absolute'}
                    top={0}
                    left={'20vw'}
                    w={'80vw'}
                    h={'100vh'}
                    bg={'#D9D9D980'}
                    zIndex={2}
                >
                    <Spinner size={'xl'} />
                </Center>
            )}
        </Flex>
    );
}
