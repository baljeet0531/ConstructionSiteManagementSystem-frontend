import {
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import { SignatureListName } from '../../Interface/Toolbox';
import { MultiSignatureStateItem } from '../../Interface/Signature';
import SignaturePad from '../Shared/SignaturePad';
import { ListSignatureHandler } from '../../Utils/Signature/List';

const itemStyle = {
    p: '0px',
    h: '115px',
    border: '1px solid #919AA9',
};

const headerStyle = {
    color: '#667080',
    fontSize: 'md',
    borderRight: '1px',
    borderColor: '#919AA9',
    sx: {
        textAlign: 'center',
    },
};

export default function SignatureTable(
    signatureLists: Record<SignatureListName, MultiSignatureStateItem>
) {
    const {
        primeContractingCorpAppearance,
        viceFirstContractingCorpAppearance,
        viceSecondContractingCorpAppearance,
        viceThirdContractingCorpAppearance,
    } = signatureLists;
    const getMaxRow = (
        signatureLists: Record<SignatureListName, MultiSignatureStateItem>
    ) => {
        let max = 7;
        let key: keyof Record<SignatureListName, MultiSignatureStateItem>;
        for (key in signatureLists) {
            max = Math.max(max, signatureLists[key][0].length);
        }
        return max;
    };
    const rows = getMaxRow(signatureLists);
    const contents = [];

    for (let idx = 0; idx < rows + 1; idx++) {
        contents.push(
            <Tr key={idx} border="1px">
                <Td {...itemStyle}>
                    <Text textAlign="center">{idx + 1}</Text>
                </Td>
                <Td {...itemStyle}>
                    <SignaturePad
                        title={`主承攬商出席人員 - 簽名`}
                        signatureName={`prime-app-${idx + 1}.png`}
                        handler={
                            new ListSignatureHandler(
                                primeContractingCorpAppearance
                            )
                        }
                        index={idx}
                        h="90px"
                        disable={!!primeContractingCorpAppearance[0][idx]?.no}
                    />
                </Td>
                <Td {...itemStyle}>
                    <SignaturePad
                        title={`次承攬商(1)出席人員 - 簽名`}
                        signatureName={`vice-first-app-${idx + 1}.png`}
                        handler={
                            new ListSignatureHandler(
                                viceFirstContractingCorpAppearance
                            )
                        }
                        index={idx}
                        h="90px"
                        disable={
                            !!viceFirstContractingCorpAppearance[0][idx]?.no
                        }
                    />
                </Td>
                <Td {...itemStyle}>
                    <SignaturePad
                        title={`次承攬商(2)出席人員 - 簽名`}
                        signatureName={`vice-second-app-${idx + 1}.png`}
                        handler={
                            new ListSignatureHandler(
                                viceSecondContractingCorpAppearance
                            )
                        }
                        index={idx}
                        h="90px"
                        disable={
                            !!viceSecondContractingCorpAppearance[0][idx]?.no
                        }
                    />
                </Td>
                <Td {...itemStyle}>
                    <SignaturePad
                        title={`次承攬商(3)出席人員 - 簽名`}
                        signatureName={`vice-third-app-${idx + 1}.png`}
                        handler={
                            new ListSignatureHandler(
                                viceThirdContractingCorpAppearance
                            )
                        }
                        index={idx}
                        h="90px"
                        disable={
                            !!viceThirdContractingCorpAppearance[0][idx]?.no
                        }
                    />
                </Td>
            </Tr>
        );
    }

    return (
        <TableContainer
            overflowY="auto"
            maxHeight="500px"
            border="1px solid #919AA9"
            borderLeft="0px"
        >
            <Table variant="simple">
                <Thead background="#FFFFFF" position="sticky" top={0} h="70px">
                    <Tr>
                        <Th {...headerStyle} borderLeft="1px">
                            No.
                        </Th>
                        <Th w="25%" {...headerStyle}>
                            主承攬商
                        </Th>
                        <Th w="25%" {...headerStyle}>
                            再承攬商(1)
                        </Th>
                        <Th w="25%" {...headerStyle}>
                            再承攬商(2)
                        </Th>
                        <Th w="25%" {...headerStyle}>
                            再承攬商(3)
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>{contents}</Tbody>
            </Table>
        </TableContainer>
    );
}
