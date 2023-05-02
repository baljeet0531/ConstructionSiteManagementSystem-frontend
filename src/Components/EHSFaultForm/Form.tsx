import { IFaultForm } from '../../Interface/FaultForm';
import { FormikProps, Form } from 'formik';
import FormFactory from './Factory';
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { EditIcon } from '../../Icons/Icons';
// import { useQuery } from '@apollo/client';
// import { GQL_FAULT_FORM_QUERY } from './GQL';
import { useState } from 'react';
import { FormLoading } from '../Shared/Loading';
import GridInputItem from '../Shared/GridInputItem';
import { contentStyle, tableContentStyle, tableTitleStyle } from './Styles';
// import { getImage } from '../../Utils/Resources';

// import { defaultErrorToast } from '../../Utils/DefaultToast';

export default function FaultForm({
    formProps,
    siteId,
    faultId,
}: // onClose,
{
    formProps: FormikProps<IFaultForm>;
    siteId: string;
    faultId: number;
    // onClose: () => void;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    // const toast = useToast();
    const f = new FormFactory(formProps);
    // useQuery(GQL_FAULT_FORM_QUERY, {
    //     variables: {
    //         siteId: siteId,
    //         dailyId: dailyId,
    //     },
    //     onCompleted: (d) => {
    //         const singleFormData = parseDailyReport(d.dailyReport);
    //         if (singleFormData) {
    //             formProps.setValues(singleFormData, false);
    //         }
    //         type Node = { node: { siteId: string; avatar: string } };
    //         const targetSites: Node = d.allSites.edges.find(
    //             (i: Node) => i.node.siteId === siteId
    //         );
    //         if (targetSites && targetSites.node.avatar) {
    //             getImage(targetSites.node.avatar).then((b) =>
    //                 setOwnerIconURL(URL.createObjectURL(b as Blob))
    //             );
    //         }
    //         setLoading(false);
    //     },
    //     onError: (err) => {
    //         console.error(err);
    //         setLoading(false);
    //         defaultErrorToast(toast)
    //         onClose();
    //     },
    //     fetchPolicy: 'network-only',
    // });

    console.log(`siteId: ${siteId} faultId: ${faultId}`);
    console.log(`${f}`);
    console.log(`${setLoading}`);

    return (
        <Form>
            <Button
                type="submit"
                leftIcon={<EditIcon />}
                variant={'buttonBlueSolid'}
                position="fixed"
                top={'10px'}
                right={'55px'}
                isLoading={formProps.isSubmitting}
                zIndex={2}
            >
                完成編輯
            </Button>
            <Box margin="40px 37px 0px 27px">
                <Image w="150px" h="51px" src={'/mic-icon.png'} />
                <VStack
                    mt="-30px"
                    spacing="-4px"
                    fontSize="32px"
                    fontWeight="400"
                >
                    <Text>帆宣系統科技股份有限公司</Text>
                    <Text>Marketech International Corp.</Text>
                    <Text>工安缺失紀錄表</Text>
                </VStack>
                <Grid
                    templateColumns="230px 40px 80px 100px 1fr"
                    mt="16px"
                    h="40px"
                >
                    <GridItem colStart={1} colEnd={2} {...contentStyle}>
                        編號（單位-工號-年/月/流水號）：
                    </GridItem>
                    <GridItem
                        colStart={2}
                        colEnd={3}
                        {...contentStyle}
                        justifyContent="center"
                    >
                        {'Unit'}-
                    </GridItem>
                    <GridInputItem
                        gridRange={[0, 1, 3, 4]}
                        fieldName=""
                        inputComponent={f.input({
                            type: 'text',
                        })}
                    />
                    <GridItem
                        colStart={4}
                        colEnd={5}
                        {...contentStyle}
                        justifyContent="center"
                    >
                        -{'年/月/流水號'}
                    </GridItem>
                </Grid>
                <Grid
                    templateColumns="repeat(4, 1fr)"
                    templateRows="repeat(5, 1fr) 4.2fr 5.6fr repeat(3, 2.5fr) 4.2fr"
                >
                    <GridItem
                        rowStart={1}
                        colStart={1}
                        {...tableTitleStyle}
                        borderTop="#919AA9 solid 1px"
                    >
                        開立單位
                    </GridItem>
                    <GridInputItem
                        gridRange={[1, 2, 2, 3]}
                        fieldName=""
                        inputComponent={f.input({
                            type: 'text',
                        })}
                        style={tableContentStyle}
                        borderTop="#919AA9 solid 1px"
                    />
                    <GridItem
                        rowStart={1}
                        colStart={3}
                        {...tableTitleStyle}
                        borderTop="#919AA9 solid 1px"
                    >
                        開立人員
                    </GridItem>
                    <GridInputItem
                        gridRange={[1, 2, 4, 5]}
                        fieldName=""
                        inputComponent={f.input({
                            type: 'text',
                        })}
                        style={tableContentStyle}
                        borderTop="#919AA9 solid 1px"
                        borderRight="#919AA9 solid 1px"
                    />

                    <GridItem rowStart={2} colStart={1} {...tableTitleStyle}>
                        開立日期
                    </GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 2, 3]}
                        fieldName=""
                        inputComponent={f.input({
                            type: 'date',
                        })}
                        style={tableContentStyle}
                    />
                    <GridItem rowStart={2} colStart={3} {...tableTitleStyle}>
                        專案編號
                    </GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 4, 5]}
                        fieldName=""
                        inputComponent={f.input({
                            type: 'text',
                        })}
                        style={tableContentStyle}
                        borderRight="#919AA9 solid 1px"
                    />

                    <GridItem rowStart={3} colStart={1} {...tableTitleStyle}>
                        缺失日期
                    </GridItem>
                    <GridInputItem
                        gridRange={[3, 4, 2, 3]}
                        fieldName=""
                        inputComponent={f.input({
                            type: 'date',
                        })}
                        style={tableContentStyle}
                    />
                    <GridItem
                        rowStart={3}
                        rowEnd={5}
                        colStart={3}
                        colEnd={4}
                        {...tableTitleStyle}
                    >
                        缺失責任單位
                    </GridItem>
                    <GridInputItem
                        gridRange={[3, 4, 4, 5]}
                        fieldName=""
                        inputComponent={f.unitField('siteId', 'MIC')}
                        style={tableContentStyle}
                        borderRight="#919AA9 solid 1px"
                    />

                    <GridItem
                        rowStart={4}
                        rowEnd={5}
                        colStart={1}
                        colEnd={2}
                        {...tableTitleStyle}
                    >
                        發生廠區/地點
                    </GridItem>
                    <GridInputItem
                        gridRange={[4, 5, 2, 3]}
                        fieldName=""
                        inputComponent={f.input({
                            type: 'text',
                        })}
                        style={tableContentStyle}
                    />
                    <GridInputItem
                        gridRange={[4, 5, 4, 5]}
                        fieldName=""
                        inputComponent={f.unitField('siteId', '供應商')}
                        style={tableContentStyle}
                        borderRight="#919AA9 solid 1px"
                    />

                    <GridItem
                        rowStart={5}
                        rowEnd={6}
                        colStart={1}
                        colEnd={2}
                        {...tableTitleStyle}
                        borderBottom="0px"
                    >
                        缺失說明&照片：
                    </GridItem>
                    <GridItem
                        rowStart={5}
                        rowEnd={6}
                        colStart={2}
                        colEnd={5}
                        {...tableTitleStyle}
                        borderRight="#919AA9 solid 1px"
                        borderLeft="0px"
                        borderBottom="0px"
                    />
                    <GridInputItem
                        gridRange={[6, 7, 1, 5]}
                        fieldName=""
                        inputComponent={f.textArea()}
                        style={{
                            ...tableContentStyle,
                            borderRight: '#919AA9 solid 1px',
                            borderBottom: '0px',
                        }}
                    />
                    <GridInputItem
                        gridRange={[7, 8, 1, 5]}
                        fieldName=""
                        inputComponent={f.textArea()}
                        style={{
                            ...tableContentStyle,
                            borderRight: '#919AA9 solid 1px',
                            borderBottom: '0px',
                        }}
                    />
                    <GridItem
                        rowStart={8}
                        rowEnd={9}
                        colStart={1}
                        colEnd={5}
                        {...tableContentStyle}
                        borderTop="#919AA9 solid 1px"
                        borderRight="#919AA9 solid 1px"
                    >
                        <Grid
                            templateColumns="4fr 1fr 50fr"
                            templateRows="repeat(3, 1fr)"
                            w={'100%'}
                            h={'100%'}
                            p={'10px'}
                        >
                            <GridItem
                                colStart={1}
                                rowStart={1}
                                {...contentStyle}
                            >
                                缺失處置
                            </GridItem>
                            <GridItem
                                colStart={2}
                                colEnd={3}
                                rowStart={1}
                                {...contentStyle}
                            >
                                1.
                            </GridItem>
                            <GridItem
                                colStart={3}
                                colEnd={4}
                                rowStart={1}
                                {...contentStyle}
                            >
                                {f.checkBox('checked', '已立即完成改正')}
                            </GridItem>
                            <GridItem
                                colStart={3}
                                colEnd={4}
                                rowStart={2}
                                {...contentStyle}
                            >
                                {f.validDateCheckBox()}
                            </GridItem>
                            <GridItem
                                colStart={2}
                                colEnd={3}
                                rowStart={3}
                                {...contentStyle}
                            >
                                2.
                            </GridItem>
                            <GridItem
                                colStart={3}
                                colEnd={4}
                                rowStart={3}
                                {...contentStyle}
                            >
                                {f.checkBox(
                                    'checked',
                                    '須提出矯正預防措施報告'
                                )}
                            </GridItem>
                        </Grid>
                    </GridItem>
                    <GridItem
                        rowStart={9}
                        rowEnd={10}
                        colStart={1}
                        colEnd={5}
                        {...tableTitleStyle}
                        borderRight="#919AA9 solid 1px"
                    />
                    <GridItem
                        rowStart={10}
                        rowEnd={11}
                        colStart={1}
                        colEnd={5}
                        {...tableTitleStyle}
                        borderRight="#919AA9 solid 1px"
                    />
                    <GridItem
                        rowStart={11}
                        rowEnd={12}
                        colStart={1}
                        colEnd={5}
                        {...tableTitleStyle}
                        borderRight="#919AA9 solid 1px"
                        alignItems={'flex-start'}
                        justifyContent={'flex-end'}
                        flexDirection={'column'}
                        letterSpacing={'0.3em'}
                    >
                        <Text>本單流程：</Text>
                        <Text>
                            MIC監工單位開單者：正本正本(MIC監工單位)、副本(缺失責任單位、M8)
                        </Text>
                        <Text>
                            MIC M8開單者：正本(MIC
                            M8)、副本(缺失責任單位、MIC監工單位)
                        </Text>
                    </GridItem>
                </Grid>
                <Flex direction="column" align="flex-end">
                    <Text>EE-4411-06A</Text>
                </Flex>
            </Box>
            {(loading || formProps.isSubmitting) && <FormLoading />}
        </Form>
    );
}
