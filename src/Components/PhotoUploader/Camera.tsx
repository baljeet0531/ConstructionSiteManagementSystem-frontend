import { Button, Flex, useToast } from '@chakra-ui/react';
import { FieldArrayRenderProps } from 'formik';
import React from 'react';
import Webcam from 'react-webcam';
import { defaultErrorToast } from '../../Utils/DefaultToast';

type TVideoConstraints = {
    width: number;
    height: number;
    facingMode: string | {};
};

export function Camera(props: { arrayHelper: FieldArrayRenderProps }) {
    const { arrayHelper } = props;
    const [capturing, setCapturing] = React.useState<boolean>(false);

    const [videoConstraints, setVideoConstraints] =
        React.useState<TVideoConstraints>({
            width: 1280,
            height: 720,
            facingMode: { exact: 'environment' },
        });
    const toast = useToast();
    const webcamRef = React.useRef<Webcam>(null);
    const capture = React.useCallback(() => {
        setCapturing(true);
        const src = webcamRef.current?.getScreenshot();

        src &&
            arrayHelper.push({
                image: null,
                category: null,
                date: new Date(),
                location: null,
                description: '',
                src: src,
                rotation: 0,
            });
        setTimeout(() => setCapturing(false), 500);
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
                screenshotFormat="image/webp"
                videoConstraints={videoConstraints}
                onUserMediaError={() => {
                    if (videoConstraints.facingMode === 'user') {
                        defaultErrorToast(
                            toast,
                            '無法取得相機資訊，請允許權限或稍後重試'
                        );
                    }
                    setVideoConstraints((prev) => ({
                        ...prev,
                        facingMode: 'user',
                    }));
                }}
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
