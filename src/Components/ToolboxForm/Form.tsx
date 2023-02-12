import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Grid,
    GridItem,
    Image,
    Input,
    Flex,
    Text,
    HStack,
    VStack,
} from '@chakra-ui/react';
import { FormikProps, Form } from 'formik';
import { useQuery, gql } from '@apollo/client';
import { EditIcon, ChevronDownIcon } from '../../Icons/Icons';
import {
    MultiSignatureStateItem,
    SignatureStateItem,
} from '../../Interface/Signature';
import SignaturePad from '../Shared/SignaturePad';
import GridInputItem from '../Shared/GridInputItem';
import {
    titleStyle,
    contentStyle,
    centerStyle,
    inputStyle,
    filledStyle,
} from './Styles';
import FormFactory from './Factory';
import {
    IToolbox,
    IToolboxData,
    SignatureName,
    SignatureListName,
} from '../../Interface/Toolbox';

export const QUERY_TOOLBOX_OPTIONS = gql`
    query toolboxOptions($siteId: String!) {
        contractingCorpName(siteId: $siteId) {
            name
        }
    }
`;

export default function ToolboxForm({
    formProps,
    signatures,
    signatureLists,
}: {
    formProps: FormikProps<IToolbox>;
    signatures: Record<SignatureName, SignatureStateItem>;
    signatureLists: Record<SignatureListName, MultiSignatureStateItem>;
}) {
    const [data, setData] = useState<IToolboxData>({ contractingCorpName: [] });
    const f = new FormFactory(formProps, data, setData);
    useQuery(QUERY_TOOLBOX_OPTIONS, {
        variables: {
            siteId: formProps.values.siteId,
        },
        onCompleted: (d) => {
            setData({
                contractingCorpName: d.contractingCorpName,
            });
        },
        fetchPolicy: 'network-only',
    });

    console.log(formProps.values);

    return (
        <Form>
            <Button
                type="submit"
                leftIcon={<EditIcon />}
                variant={'buttonBlueSolid'}
                position="fixed"
                top={'10px'}
                right={'37px'}
                isLoading={formProps.isSubmitting}
                onClick={formProps.submitForm}
            >
                完成編輯
            </Button>
            <Box margin="10px 37px 0px 27px" color="#667080">
                <Image w="150px" h="51px" src={'/mic-icon.png'} />
                <VStack
                    mt="-30px"
                    spacing="-4px"
                    fontSize="32px"
                    fontWeight="400"
                >
                    <Text>帆宣系統科技股份有限公司</Text>
                    <Text>Marketech International Corp.</Text>
                    <Text>工具箱會議及巡檢紀錄</Text>
                </VStack>
                <Text pt={5}>
                    {' '}
                    工具箱會議由監工單位監工於施工前針對當天工作內容及安全衛生議題進行告知或討論/協議(如最近發生的事故、作業場所的特殊危害、設備的安全操作、新的工作程序或與人員相關的作業安全)，並確實紀錄。
                </Text>
                <Grid
                    height="45vh"
                    templateColumns="repeat(6, 1fr)"
                    templateRows="repeat(8, 1fr)"
                >
                    <GridInputItem
                        gridRange={[1, 2, 1, 3]}
                        fieldName="meetingDate"
                        inputComponent={f.filledDateInput()}
                        inputLeftComponent={<Text>會議日期:</Text>}
                        inputLeftStyle={{ w: '5.5rem' }}
                        style={{ ...filledStyle }}
                    />
                    <GridInputItem
                        gridRange={[1, 2, 3, 5]}
                        fieldName="meetingTime"
                        inputComponent={f.filledTimeInput()}
                        inputLeftComponent={<Text>會議時間:</Text>}
                        inputLeftStyle={{ w: '5.5rem' }}
                        style={{ ...filledStyle }}
                    />
                    <GridInputItem
                        gridRange={[1, 2, 5, 7]}
                        fieldName="meetingPlace"
                        inputComponent={f.filledTextInput()}
                        inputLeftComponent={<Text>會議地點:</Text>}
                        inputLeftStyle={{ w: '5.5rem' }}
                        style={{ ...filledStyle, borderRightColor: '#919AA9' }}
                    />
                    <GridItem {...centerStyle}>主持人</GridItem>
                    <GridItem {...centerStyle}>共同作業廠商</GridItem>
                    <GridItem {...centerStyle}>主承攬商</GridItem>
                    <GridItem {...centerStyle}>再承攬商(1)</GridItem>
                    <GridItem {...centerStyle}>再承攬商(2)</GridItem>
                    <GridItem {...centerStyle} borderRight="1px">
                        再承攬商(3)
                    </GridItem>
                    <GridItem rowStart={3} rowEnd={5} {...centerStyle}>
                        系統工程師
                    </GridItem>
                    <GridItem {...centerStyle}>廠商名字</GridItem>
                    <GridInputItem
                        fieldName="primeContractCorp"
                        inputComponent={f.selectContractingCorpInput(
                            'primeContractCorp'
                        )}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...inputStyle }}
                    />
                    <GridInputItem
                        fieldName="minorContractCorpOne"
                        inputComponent={f.selectContractingCorpInput(
                            'minorContractCorpOne'
                        )}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...inputStyle }}
                    />
                    <GridInputItem
                        fieldName="minorContractCorpTwo"
                        inputComponent={f.selectContractingCorpInput(
                            'minorContractCorpTwo'
                        )}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...inputStyle }}
                    />
                    <GridInputItem
                        fieldName="minorContractCorpThree"
                        inputComponent={f.selectContractingCorpInput(
                            'minorContractCorpThree'
                        )}
                        inputRightComponent={<ChevronDownIcon />}
                        style={{ ...inputStyle, borderRight: '1px' }}
                    />
                </Grid>
            </Box>
        </Form>
    );
}
