import { Button, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FieldArrayRenderProps } from 'formik';
import React from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
};

export function Camera(props: { arrayHelper: FieldArrayRenderProps }) {
    const { arrayHelper } = props;
    const [capturing, setCapturing] = React.useState<boolean>(false);
    const webcamRef = React.useRef<Webcam>(null);
    const capture = React.useCallback(() => {
        setCapturing(true);
        const src = webcamRef.current?.getScreenshot();

        src
            ? fetch(src)
                  .then((res) => res.blob())
                  .then((blob) => {
                      const date = new Date();
                      const filename = dayjs(date).toISOString();
                      const image = new File([blob], filename, {
                          type: 'image/png',
                      });
                      arrayHelper.push({
                          image: image,
                          src: src,
                          category: null,
                          date: date,
                          location: null,
                          description: '',
                      });
                      setCapturing(false);
                  })
            : setCapturing(false);
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
                variant={'whiteOutline'}
                isLoading={capturing}
                w={'40px'}
                h={'40px'}
                borderRadius={'50%'}
                onClick={capture}
            ></Button>
        </Flex>
    );
}
