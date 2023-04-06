import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import {
    Button,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Input,
    Select,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { Cookies } from 'react-cookie';
import { DateRangePicker } from 'rsuite';
import { ItemDataType } from 'rsuite/esm/@types/common';
import { DeleteIcon, LaunchIcon, PublishIcon } from '../../Icons/Icons';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { handleDebounceSearch } from '../../Utils/handleDebounceSearch';
import { exportFile } from '../../Utils/Resources';
import DeleteModal from './DeleteModal';
import {
    IFilteredPhotos,
    IPhotoQueryData,
    IFormattedPhotos,
} from './Interface';
import PhotoOverviewContainer from './PhotoOverviewContainer';
import { PageLoading } from '../Shared/Loading';

export const QUERY_PHOTOS = gql`
    query ImageManagement($siteId: String!) {
        imageManagement(siteId: $siteId) {
            time
            element {
                categoryName
                element {
                    no
                    imagePath
                    category
                    date
                    location
                    description
                }
            }
        }
        IMOptionList(siteId: $siteId) {
            category
            location
        }
    }
`;

export const QUERY_FILTER_PHOTOS = gql`
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

const EXPORT_PHOTOS = gql`
    mutation ExportImageManagement(
        $no: [Int]!
        $siteId: String!
        $username: String!
    ) {
        exportImageManagement(no: $no, siteId: $siteId, username: $username) {
            ok
            message
            path
        }
    }
`;

export default function PhotoOverviewPage(props: {
    siteId: string;
    siteName: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const { isOpen, onToggle, siteId, siteName } = props;

    const deleteModalDisclosure = useDisclosure();
    const toast = useToast();
    const username = new Cookies().get('username');

    const timeout = React.useRef<any>();
    const keywordRef = React.useRef<HTMLInputElement>(null);
    const checkedRef = React.useRef<IFormattedPhotos>({});
    const [serverCategories, setServerCategories] = React.useState<
        ItemDataType[]
    >([]);
    const [serverLocations, setServerLocations] = React.useState<
        ItemDataType[]
    >([]);
    const [filteredPhotos, setFilteredPhotos] =
        React.useState<IFilteredPhotos>();
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

    const { category, startDate, endDate, location, keyWord } = filterOptions;
    const handleChange = (newValue: Object) => {
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

    const formatData = (
        imageManagement: IPhotoQueryData[],
        checked: boolean = true
    ) => {
        const dateGroup = imageManagement.map(({ time, element }) => {
            const categoryGroup = element.map(({ categoryName, element }) => ({
                [categoryName]: {
                    photos: Object.assign(
                        {},
                        ...element.map((element) => ({
                            [element.no]: {
                                ...element,
                                ...(checked && { isChecked: false }),
                            },
                        }))
                    ),
                    ...(checked && {
                        isChecked: false,
                        isIndeterminate: false,
                    }),
                },
            }));
            return {
                [time]: {
                    categories: Object.assign({}, ...categoryGroup),
                    ...(checked && {
                        isChecked: false,
                        isIndeterminate: false,
                    }),
                },
            };
        });
        return Object.assign({}, ...dateGroup);
    };

    useQuery(QUERY_PHOTOS, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({
            imageManagement,
            IMOptionList,
        }: {
            imageManagement: IPhotoQueryData[];
            IMOptionList: {
                category: string[];
                location: string[];
            };
        }) => {
            const formattedData = formatData(imageManagement, true);
            checkedRef.current = formattedData;
            setFilteredPhotos(undefined);
            setServerCategories(
                IMOptionList.category.map((option) => ({
                    label: option,
                    value: option,
                }))
            );
            setServerLocations(
                IMOptionList.location.map((option) => ({
                    label: option,
                    value: option,
                }))
            );

            searchPhotos({
                variables: { siteId: siteId, ...filterOptions },
            });
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [searchPhotos] = useLazyQuery(QUERY_FILTER_PHOTOS, {
        onCompleted: ({
            imageManagement,
        }: {
            imageManagement: IPhotoQueryData[];
        }) => {
            setFilteredPhotos(formatData(imageManagement, false));
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [exportPhotos, { loading }] = useMutation(EXPORT_PHOTOS, {
        onCompleted: ({ exportImageManagement }) => {
            if (exportImageManagement.ok) {
                const { path, message } = exportImageManagement;
                exportFile(path, message, toast);
            }
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
    });

    const handleExport = () => {
        const checkedNumbers = Object.values(checkedRef.current).flatMap(
            (date) =>
                Object.values(date.categories).flatMap((category) =>
                    Object.values(category.photos).flatMap(
                        ({ isChecked, no }) => (isChecked ? no : [])
                    )
                )
        );

        exportPhotos({
            variables: {
                no: checkedNumbers,
                siteId: siteId,
                username: username,
            },
        });
    };

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
                            onClick={handleExport}
                        />
                        <IconButton
                            variant={'blueOutline'}
                            aria-label="delete photos"
                            icon={<DeleteIcon />}
                            onClick={deleteModalDisclosure.onOpen}
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
                                value={category}
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
                                value={location}
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
                filteredPhotos={filteredPhotos}
                checkedRef={checkedRef}
                serverCategories={serverCategories}
                serverLocations={serverLocations}
            />
            <DeleteModal
                checkedRef={checkedRef}
                isOpen={deleteModalDisclosure.isOpen}
                onClose={deleteModalDisclosure.onClose}
            />
            {loading && <PageLoading />}
        </Flex>
    );
}
