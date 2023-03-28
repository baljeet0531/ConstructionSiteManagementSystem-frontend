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
import React from 'react';
import { DateRangePicker } from 'rsuite';
import { DeleteIcon, LaunchIcon, PublishIcon } from '../../Icons/Icons';
import PhotoOverviewContainer from './PhotoOverviewContainer';

export default function PhotoOverviewPage(props: {
    siteId: string;
    siteName: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const { isOpen, onToggle, siteId, siteName } = props;
    return (
        <Flex direction={'column'} display={isOpen ? 'none' : 'flex'}>
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
                                variant={'formOutline'}
                                borderRadius={'4px'}
                                height={'40px'}
                            ></Select>
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
                            />
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex direction={'column'} gap={'4px'}>
                            <Text variant={'w400s14'} fontWeight={'700'}>
                                地點
                            </Text>
                            <Select
                                variant={'formOutline'}
                                borderRadius={'4px'}
                                height={'40px'}
                            ></Select>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex direction={'column'} gap={'4px'}>
                            <Text variant={'w400s14'} fontWeight={'700'}>
                                關鍵字
                            </Text>
                            <Input
                                variant={'formOutline'}
                                borderRadius={'4px'}
                                height={'40px'}
                            ></Input>
                        </Flex>
                    </GridItem>
                </Grid>
            </Flex>
            <PhotoOverviewContainer siteId={siteId} />
        </Flex>
    );
}
