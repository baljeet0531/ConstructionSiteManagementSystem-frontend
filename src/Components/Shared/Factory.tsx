import { Input, Center } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ISignature, SignatureStateItem } from '../../Interface/Signature';

export default class SharedFactory {
    checkTimeInput(state: SignatureStateItem) {
        const [signature, setSignature] = state;
        return (
            <Input
                size="sm"
                type="time"
                border="0px"
                minW="100px"
                textAlign="center"
                p="0px"
                disabled={!!signature?.no}
                value={signature?.time ? signature.time.format('HH:mm') : ''}
                onChange={(e) => {
                    const [hour, min] = e.target.value.split(':');
                    const newDate = dayjs(signature?.time)
                        .hour(Number(hour))
                        .minute(Number(min));
                    setSignature({ ...signature, time: newDate } as ISignature);
                }}
            />
        );
    }
    forbidOverlay(text: string = '') {
        return (
            <Center
                w="100%"
                h="100%"
                p={4}
                textAlign="center"
                color="#66708080"
                backgroundColor="gray.100"
                zIndex={99}
            >
                {text}
            </Center>
        );
    }
}
