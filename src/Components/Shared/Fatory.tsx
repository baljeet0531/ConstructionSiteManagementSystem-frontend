import { Input } from "@chakra-ui/react";
import dayjs from "dayjs";
import { SignatureStateItem } from "../../Interface/Signature";

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
                value={signature?.time ? signature.time.format('HH:mm') : ''}
                onChange={(e) => {
                    const [hour, min] = e.target.value.split(':');
                    const newDate = dayjs(signature.time)
                        .hour(Number(hour))
                        .minute(Number(min));
                    setSignature({ ...signature, time: newDate });
                }}
            />
        );
    }
}