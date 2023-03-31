import {
    AspectRatio,
    Center,
    Flex,
    Image,
    Text,
    GridItem,
    Checkbox,
} from '@chakra-ui/react';
import React from 'react';
import { getImage } from '../../Utils/Resources';
import { ICategory, IDate } from './Interface';

export default function PhotoOverviewElement(props: {
    dateValues: IDate;
    categoryValues: ICategory;
    number: number;
    setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { dateValues, categoryValues, number, setRerender } = props;
    const photoValues = categoryValues.photos[number];

    const [imageSrc, setImageSrc] = React.useState<string>('');
    React.useEffect(() => {
        getImage(photoValues.imagePath).then((blob) => {
            blob ? setImageSrc(URL.createObjectURL(blob)) : '';
        });
    }, [photoValues.imagePath]);

    return (
        <GridItem>
            <Flex direction={'column'}>
                <AspectRatio ratio={280 / 175}>
                    <Center
                        w={'100%'}
                        h={'100%'}
                        border={'2px solid #919AA9'}
                        bg={'#EEF0F4'}
                        position={'relative'}
                    >
                        <Checkbox
                            colorScheme={'gray'}
                            borderColor={'#667080'}
                            position={'absolute'}
                            top={0}
                            left={0}
                            isChecked={photoValues.isChecked}
                            onChange={(e) => {
                                photoValues.isChecked = e.target.checked;

                                const photosChecked = Object.values(
                                    categoryValues.photos
                                ).map((value) => value.isChecked);
                                categoryValues.isIndeterminate =
                                    photosChecked.some(Boolean);
                                categoryValues.isChecked =
                                    photosChecked.every(Boolean);

                                const categoriesChecked = Object.values(
                                    dateValues.categories
                                ).map((value) => value.isChecked);
                                dateValues.isIndeterminate =
                                    photosChecked.some(Boolean);
                                dateValues.isChecked =
                                    categoriesChecked.every(Boolean);

                                setRerender((prev) => !prev);
                            }}
                        ></Checkbox>
                        <Image
                            w={'100%'}
                            h={'100%'}
                            objectFit={'contain'}
                            src={imageSrc}
                            onLoad={(e) => {
                                const image = e.target as HTMLImageElement;
                                URL.revokeObjectURL(image.src);
                            }}
                        />
                    </Center>
                </AspectRatio>
                <Text>位置：{photoValues.location}</Text>
                <Text>說明：{photoValues.description}</Text>
            </Flex>
        </GridItem>
    );
}
