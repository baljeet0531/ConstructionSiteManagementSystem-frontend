import { Checkbox, Flex, Grid, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import PhotoOverviewElement from './PhotoOverviewElement';
import {
    ICategoryChecked,
    IDateChecked,
    IFilteredPhotos,
    IFormattedPhotos,
} from './Interface';
import { ItemDataType } from 'rsuite/esm/@types/common';

export default function PhotoOverviewContainer(props: {
    siteId: string;
    filteredPhotos: IFilteredPhotos | undefined;
    checkedRef: React.MutableRefObject<IFormattedPhotos>;
    serverCategories: ItemDataType[];
    serverLocations: ItemDataType[];
}) {
    const { filteredPhotos, checkedRef, serverCategories, serverLocations } =
        props;

    const dateGroup = Object.entries(filteredPhotos || checkedRef.current)
        .sort()
        .map(([time, { categories }]) => (
            <DateElement
                key={time}
                time={time}
                element={categories}
                checkedRef={checkedRef}
                serverCategories={serverCategories}
                serverLocations={serverLocations}
            />
        ));

    return (
        <Flex
            direction={'column'}
            padding={'13px 42px'}
            overflowY={'auto'}
            className={'photo-container'}
        >
            {dateGroup}
        </Flex>
    );
}

function DateElement(props: {
    time: string;
    element: {
        [categoryName: string]: ICategoryChecked;
    };
    checkedRef: React.MutableRefObject<IFormattedPhotos>;
    serverCategories: ItemDataType[];
    serverLocations: ItemDataType[];
}) {
    const { time, element, checkedRef, serverCategories, serverLocations } =
        props;
    const dateValues = checkedRef.current[time];
    const [, setRerender] = React.useState<boolean>(false);

    const categoryGroup = Object.entries(element).map(
        ([categoryName, { photos }]) => (
            <CategoryElement
                key={categoryName}
                dateValues={dateValues}
                categoryName={categoryName}
                numbers={Object.keys(photos).map((no) => Number(no))}
                setRerender={setRerender}
                serverCategories={serverCategories}
                serverLocations={serverLocations}
            />
        )
    );

    return (
        <Flex direction={'column'}>
            <Flex
                align={'center'}
                justify={'flex-start'}
                mb={'13px'}
                gap={'7.5px'}
            >
                <Text fontSize={'2xl'}>{dayjs(time).format('YYYY/MM/DD')}</Text>
                <Checkbox
                    colorScheme={'gray'}
                    borderColor={'#667080'}
                    background={'#FFFFFF'}
                    isIndeterminate={
                        dateValues.isIndeterminate && !dateValues.isChecked
                    }
                    isChecked={dateValues.isChecked}
                    onChange={(e) => {
                        dateValues.isChecked = e.target.checked;
                        dateValues.isIndeterminate = false;

                        Object.keys(dateValues.categories).forEach(
                            (categoryName) => {
                                const categoryValues =
                                    dateValues.categories[categoryName];
                                categoryValues.isChecked = e.target.checked;
                                categoryValues.isIndeterminate = false;
                                Object.keys(categoryValues.photos).forEach(
                                    (no) => {
                                        const photoValues =
                                            categoryValues.photos[Number(no)];
                                        photoValues.isChecked =
                                            e.target.checked;
                                    }
                                );
                            }
                        );

                        setRerender((prev) => !prev);
                    }}
                ></Checkbox>
            </Flex>
            <Flex direction={'column'}>{categoryGroup}</Flex>
        </Flex>
    );
}

function CategoryElement(props: {
    dateValues: IDateChecked;
    categoryName: string;
    numbers: number[];
    setRerender: React.Dispatch<React.SetStateAction<boolean>>;
    serverCategories: ItemDataType[];
    serverLocations: ItemDataType[];
}) {
    const {
        dateValues,
        categoryName,
        numbers,
        setRerender,
        serverCategories,
        serverLocations,
    } = props;
    const categoryValues = dateValues.categories[categoryName];
    const photoList = numbers.map((number) => (
        <PhotoOverviewElement
            key={number}
            dateValues={dateValues}
            categoryValues={categoryValues}
            number={number}
            setRerender={setRerender}
            serverCategories={serverCategories}
            serverLocations={serverLocations}
        />
    ));

    return (
        <Flex direction={'column'} mb={'18px'}>
            <Flex
                align={'center'}
                justify={'flex-start'}
                mb={'13px'}
                gap={'7.5px'}
            >
                <Text
                    fontSize={'lg'}
                    w={'fit-content'}
                    padding={'5.5px 12px'}
                    color={'#FFFFFF'}
                    background={'#4C7DE7'}
                    borderRadius={'20px'}
                >
                    {categoryName}
                </Text>
                <Checkbox
                    colorScheme={'gray'}
                    borderColor={'#667080'}
                    isIndeterminate={
                        categoryValues.isIndeterminate &&
                        !categoryValues.isChecked
                    }
                    isChecked={categoryValues.isChecked}
                    onChange={(e) => {
                        categoryValues.isChecked = e.target.checked;
                        categoryValues.isIndeterminate = false;

                        Object.keys(categoryValues.photos).forEach((number) => {
                            const photoValues =
                                categoryValues.photos[Number(number)];
                            photoValues.isChecked = e.target.checked;
                        });
                        const categoriesChecked = Object.values(
                            dateValues.categories
                        ).map((value) => value.isChecked);
                        dateValues.isIndeterminate =
                            categoriesChecked.some(Boolean);
                        dateValues.isChecked = categoriesChecked.every(Boolean);

                        setRerender((prev) => !prev);
                    }}
                ></Checkbox>
            </Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={'20px'}>
                {photoList}
            </Grid>
        </Flex>
    );
}
