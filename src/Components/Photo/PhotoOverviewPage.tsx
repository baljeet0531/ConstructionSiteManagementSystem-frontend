import { gql, useLazyQuery } from '@apollo/client';
import {
    Button,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Input,
    Select,
    Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { DateRangePicker } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { DeleteIcon, LaunchIcon, PublishIcon } from '../../Icons/Icons';
import { handleDebounceSearch } from '../../Utils/handleDebounceSearch';
import PhotoOverviewContainer, {
    IPhotoQueryData,
} from './PhotoOverviewContainer';

export interface IFilteredPhotos {
    [time: string]: { [category: string]: number[] };
}

const QUERY_FILTER_PHOTOS = gql`
    query FilterImageManagement(
        $siteId: String!
        $category: String
        $startDate: Date
        $endDate: Date
        $location: String
        $keyWord: String
    ) {
        imageManagement(
            siteId: $siteId
            category: $category
            startDate: $startDate
            endDate: $endDate
            location: $location
            keyWord: $keyWord
        ) {
            time
            element {
                categoryName
                element {
                    no
                }
            }
        }
    }
`;

export default function PhotoOverviewPage(props: {
    siteId: string;
    siteName: string;
    isOpen: boolean;
    onToggle: () => void;
    serverCategories: ItemDataType[];
    serverLocations: ItemDataType[];
}) {
    const {
        isOpen,
        onToggle,
        siteId,
        siteName,
        serverCategories,
        serverLocations,
    } = props;

    const timeout = React.useRef<any>();
    const keywordRef = React.useRef<HTMLInputElement>(null);

    const [filterOptions, setFilterOptions] = React.useState<{
        category: string | undefined;
        startDate: string | undefined;
        endDate: string | undefined;
        location: string | undefined;
        keyWord: string | undefined;
    }>({
        category: undefined,
        startDate: undefined,
        endDate: undefined,
        location: undefined,
        keyWord: undefined,
    });

    const [filteredPhotos, setFilteredPhotos] = React.useState<IFilteredPhotos>(
        {}
    );

    const handleChange = (newValue: Object) => {
        const { category, startDate, endDate, location, keyWord } =
            filterOptions;
        searchPhotos({
            variables: {
                siteId: siteId,
                ...(category && { category: category }),
                ...(startDate && { startDate: startDate }),
                ...(endDate && { endDate: endDate }),
                ...(location && { location: location }),
                ...(keyWord && { keyWord: keyWord }),
                ...newValue,
            },
        });
        setFilterOptions((prevState) => ({ ...prevState, ...newValue }));
    };

    const getOptions = (options: ItemDataType[]) =>
        [{ value: undefined, label: '全部' }, ...options].map(
            ({ value, label }, index) => (
                <option key={index} value={value}>
                    {label}
                </option>
            )
        );

    const [searchPhotos] = useLazyQuery(QUERY_FILTER_PHOTOS, {
        onCompleted: ({
            imageManagement,
        }: {
            imageManagement: IPhotoQueryData[];
        }) => {
            const dateGroup = imageManagement.map(({ time, element }) => {
                const categoryGroup = element.map(
                    ({ categoryName, element }) => ({
                        [categoryName]: element.map(({ no }) => no),
                    })
                );
                return {
                    [time]: Object.assign({}, ...categoryGroup),
                };
            });
            setFilteredPhotos(Object.assign({}, ...dateGroup));
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    React.useEffect(() => {
        searchPhotos({ variables: { siteId: siteId, ...filterOptions } });
    }, []);

    return (
        <Flex
            direction={'column'}
            display={isOpen ? 'none' : 'flex'}
            w={'100%'}
            h={'100%'}
        >
            <Flex
                direction={'column'}
                padding={'47px 42px 13px 42px'}
                gap={'10px'}
                borderBottom={'1px solid #667080'}
            >
                <Text variant={'pageSiteName'}>{siteName}</Text>
                <Flex align={'center'} justify={'space-between'}>
                    <Text variant={'pageTitle'}>相片管理</Text>
                    <Flex align={'center'} justify={'flex-end'} gap={'10px'}>
                        <IconButton
                            variant={'blueOutline'}
                            aria-label="export photos"
                            icon={<LaunchIcon />}
                        />
                        <IconButton
                            variant={'blueOutline'}
                            aria-label="delete photos"
                            icon={<DeleteIcon />}
                        />
                        <Button
                            variant={'buttonBlueSolid'}
                            leftIcon={<PublishIcon />}
                            onClick={onToggle}
                        >
                            新增相片
                        </Button>
                    </Flex>
                </Flex>
                <Grid templateColumns={'repeat(4,1fr)'} columnGap={'20px'}>
                    <GridItem>
                        <Flex direction={'column'} gap={'4px'}>
                            <Text variant={'w400s14'} fontWeight={'700'}>
                                相片分類
                            </Text>
                            <Select
                                variant={'grayOutline'}
                                height={'40px'}
                                onChange={(e) => {
                                    handleChange({
                                        category:
                                            e.target.value === '全部'
                                                ? undefined
                                                : e.target.value,
                                    });
                                }}
                            >
                                {getOptions(serverCategories)}
                            </Select>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex direction={'column'} gap={'4px'}>
                            <Text variant={'w400s14'} fontWeight={'700'}>
                                拍攝日期
                            </Text>
                            <DateRangePicker
                                style={{
                                    border: '2px solid',
                                    borderColor: '#919AA9',
                                    borderRadius: '4px',
                                    background: '#FFFFFF',
                                }}
                                onChange={(newValue) => {
                                    const newDateRange = newValue
                                        ? newValue.map((value) =>
                                              dayjs(value).format('YYYY-MM-DD')
                                          )
                                        : [undefined, undefined];
                                    handleChange({
                                        startDate: newDateRange[0],
                                        endDate: newDateRange[1],
                                    });
                                }}
                            />
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex direction={'column'} gap={'4px'}>
                            <Text variant={'w400s14'} fontWeight={'700'}>
                                地點
                            </Text>
                            <Select
                                variant={'grayOutline'}
                                height={'40px'}
                                onChange={(e) => {
                                    handleChange({
                                        location:
                                            e.target.value === '全部'
                                                ? undefined
                                                : e.target.value,
                                    });
                                }}
                            >
                                {getOptions(serverLocations)}
                            </Select>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex direction={'column'} gap={'4px'}>
                            <Text variant={'w400s14'} fontWeight={'700'}>
                                關鍵字
                            </Text>
                            <Input
                                ref={keywordRef}
                                variant={'grayOutline'}
                                borderRadius={'4px'}
                                height={'40px'}
                                onChange={(e) => {
                                    handleDebounceSearch(timeout, () =>
                                        handleChange({
                                            keyWord: e.target.value,
                                        })
                                    );
                                }}
                            ></Input>
                        </Flex>
                    </GridItem>
                </Grid>
            </Flex>
            <PhotoOverviewContainer
                siteId={siteId}
                filteredPhotos={filteredPhotos}
            />
        </Flex>
    );
}
