import { useQuery } from '@apollo/client';
import React from 'react';
import { QUERY_IMAGE_OPTIONS } from '../Photo/PhotoCreatePage';
import { SiteIdContext } from './PhotoUploader';
import {
    Flex,
    Grid,
    GridItem,
    Image,
    Select,
    Textarea,
    Text,
    Input,
    SelectProps,
    TextProps,
    Box,
    IconButton,
} from '@chakra-ui/react';
import CloseButton from '../Shared/CloseButton';
import { ImageRotateIcon } from '../../Icons/Icons';

const optionsStyle: SelectProps = {
    h: '20px',
    border: '1px solid #919AA9',
    borderColor: '#919AA9',
};
const textStyle: TextProps = {
    fontWeight: 700,
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
};

export default function PhotoUploadForm(props: { imageSrc: string }) {
    const siteId = React.useContext(SiteIdContext);
    const { imageSrc } = props;
    useQuery(QUERY_IMAGE_OPTIONS, {
        variables: {
            siteId: siteId,
        },
        onCompleted: (d) => {
            console.log(d);
        },
    });

    return (
        <Flex
            direction={'column'}
            position={'relative'}
            padding={'15px'}
            gap={'5px'}
            borderRadius={'10px'}
            bg={'#FFFFFF'}
        >
            <Box
                position={'relative'}
                w={'320px'}
                h={'300px'}
                background={'#EEF0F4'}
                border={'1px solid #919AA9'}
            >
                <Image
                    w={'100%'}
                    h={'100%'}
                    src={imageSrc}
                    objectFit={'contain'}
                />
                <IconButton
                    color={'#667080'}
                    size={'xs'}
                    aria-label={'image-rotate'}
                    icon={<ImageRotateIcon width={30} height={30} />}
                    bg={'none'}
                    _hover={{ background: 'none' }}
                    position={'absolute'}
                    bottom={0}
                    right={0}
                    onClick={() => {}}
                ></IconButton>
            </Box>
            <Grid
                h="200px"
                templateColumns="18fr 13fr"
                templateRows="repeat(4, 1fr)"
                gap={'10px 5px'}
            >
                <GridItem rowSpan={1} colSpan={1}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        <Text {...textStyle}>照片分類</Text>
                        <Select
                            variant={'formOutline'}
                            {...optionsStyle}
                        ></Select>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={4} colSpan={1}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        <Text {...textStyle}>說明</Text>
                        <Textarea
                            w={'100%'}
                            h={'100%'}
                            resize={'none'}
                            border={'1px solid'}
                            borderColor={'#919AA9'}
                        ></Textarea>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        <Text {...textStyle}>照片編號</Text>
                        <Input disabled bg="#6670801A" h={'20px'}></Input>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        <Text {...textStyle}>拍攝日期</Text>
                        <Select
                            variant={'formOutline'}
                            {...optionsStyle}
                        ></Select>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        <Text {...textStyle}>位置</Text>
                        <Select
                            variant={'formOutline'}
                            {...optionsStyle}
                        ></Select>
                    </Flex>
                </GridItem>
            </Grid>
            <CloseButton ariaLabel="delete-photo" handleClick={() => {}} />
        </Flex>
    );
}
