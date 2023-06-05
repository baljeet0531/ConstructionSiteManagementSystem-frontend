import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
};

export function Camera(props: {
    setImageList: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const { setImageList } = props;
    const webcamRef = React.useRef<Webcam>(null);
    const capture = React.useCallback(() => {
        const image = webcamRef.current?.getScreenshot();
        image && setImageList((prev) => [...prev, image]);
    }, [webcamRef]);

    return (
        <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            padding={'15px'}
            gap={'15px'}
            bg={'#FFFFFF'}
            borderRadius={'20px'}
        >
            <Webcam
                ref={webcamRef}
                audio={false}
                height={720}
                width={1280}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <Button
                borderRadius={'50%'}
                onClick={capture}
                variant={'whiteOutline'}
                w={'40px'}
                h={'40px'}
            ></Button>
        </Flex>
    );
}
