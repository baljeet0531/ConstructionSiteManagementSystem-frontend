import { AspectRatio, Center, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { getImage } from '../../Utils/Resources';
import { IPhoto } from './PhotoOverviewContainer';

export default function PhotoOverviewElement(props: { element: IPhoto }) {
    const { imagePath, location, description } = props.element;

    const [imageSrc, setImageSrc] = React.useState<string>('');

    React.useEffect(() => {
        getImage(imagePath).then((blob) =>
            blob ? setImageSrc(URL.createObjectURL(blob)) : ''
        );
    }, []);

    return (
        <Flex direction={'column'}>
            <AspectRatio ratio={280 / 175}>
                <Center
                    w={'100%'}
                    h={'100%'}
                    border={'2px solid #919AA9'}
                    bg={'#EEF0F4'}
                >
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
            <Text>位置：{location}</Text>
            <Text>說明：{description}</Text>
        </Flex>
    );
}
