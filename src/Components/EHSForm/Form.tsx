import {
    EHSFormName,
    IEHSForm,
    IEHSFormData,
} from '../../Interface/EHSForm/Common';
import { FormikProps, Form } from 'formik';
import FormFactory from './Factory';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Grid,
    GridItem,
    HStack,
    Image,
    Text,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon, EditIcon } from '../../Icons/Icons';
import { useState } from 'react';
import { FormLoading } from '../Shared/Loading';
import { EHSFormHandler } from '../../Utils/EHSForm/Handler';
import { useQuery } from '@apollo/client';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { baseStyle, filledStyle, unboxStyle } from './Styles';
import SignaturePad from '../Shared/SignaturePad';
import GridInputItem from '../Shared/GridInputItem';

export default function EHSForm({
    formProps,
    type,
    handler,
    onClose,
}: {
    formProps: FormikProps<IEHSForm>;
    type: EHSFormName;
    handler: EHSFormHandler;
    onClose: () => void;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IEHSFormData>({
        searchName: [],
    });
    const rowCount = handler.getRowCount();
    const toast = useToast();
    const f = new FormFactory(formProps, type, handler, data);
    useQuery(handler.query, {
        variables: {
            siteId: handler.siteId,
            day: handler.day,
            role: '外包商',
        },
        onCompleted: (d) => {
            setData({
                searchName: d.searchName,
            });
            const singleFormData = handler.parse(d[handler.queryName]);
            if (singleFormData) {
                formProps.setValues(singleFormData, false);
            }
            setLoading(false);
        },
        onError: (err) => {
            console.error(err);
            setLoading(false);
            defaultErrorToast(toast);
            onClose();
        },
        fetchPolicy: 'network-only',
    });

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
                    <Text>工安巡迴檢查表</Text>
                </VStack>
                <HStack mb={'10px'}>
                    <Text>檢查種類：</Text>
                    <Checkbox size="sm" isChecked={false} disabled={true}>
                        工地管理
                    </Checkbox>
                    <Checkbox
                        size="sm"
                        isChecked={type === 'normal'}
                        disabled={true}
                    >
                        一般作業
                    </Checkbox>
                    <Checkbox
                        size="sm"
                        isChecked={type === 'special'}
                        disabled={true}
                    >
                        特殊作業
                    </Checkbox>
                </HStack>
                <Grid
                    height="100px"
                    templateColumns={'repeat(3, 80px 1fr)'}
                    templateRows={'repeat(2, 1fr)'}
                >
                    <GridItem {...unboxStyle}>巡檢日期</GridItem>
                    <GridInputItem
                        gridRange={[1, 2, 2, 3]}
                        fieldName="day"
                        inputComponent={f.input({
                            type: 'date',
                            isDisabled: true,
                        })}
                        pr={'15px'}
                    />
                    <GridItem {...unboxStyle}>專案編號</GridItem>
                    <GridInputItem
                        gridRange={[1, 2, 4, 5]}
                        fieldName="siteId"
                        inputComponent={f.input({
                            type: 'text',
                            isDisabled: true,
                        })}
                        pr={'15px'}
                    />
                    <GridItem {...unboxStyle}>廠區地點</GridItem>
                    <GridInputItem
                        gridRange={[1, 2, 6, 7]}
                        fieldName="location"
                        inputComponent={f.input({
                            type: 'text',
                            isDisabled: true,
                        })}
                        pr={'15px'}
                    />
                    <GridItem {...unboxStyle}>巡檢單位</GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 2, 3]}
                        fieldName="checkDept"
                        inputComponent={f.input({
                            type: 'text',
                        })}
                        pr={'15px'}
                    />
                    <GridItem {...unboxStyle}>巡檢人員</GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 4, 5]}
                        fieldName="checkStaff"
                        inputComponent={f.input({
                            type: 'text',
                        })}
                        pr={'15px'}
                    />
                    <GridItem {...unboxStyle}>巡檢對象</GridItem>
                    <GridInputItem
                        gridRange={[2, 3, 6, 7]}
                        fieldName="checkTarget"
                        inputComponent={f.corpNameSelect('checkTarget')}
                        inputRightComponent={<ChevronDownIcon />}
                        pr={'15px'}
                    />
                </Grid>

                <Grid
                    w="100%"
                    mt="15px"
                    templateColumns="45fr 60fr 460fr 50fr 50fr 50fr 95fr"
                    templateRows={`25px 25px repeat(${rowCount}, minmax(min-content, auto))`}
                >
                    <GridItem rowStart={1} rowEnd={3} {...filledStyle}>
                        項目
                    </GridItem>
                    <GridItem rowStart={1} rowEnd={3} {...filledStyle}>
                        代碼
                    </GridItem>
                    <GridItem rowStart={1} rowEnd={3} {...filledStyle}>
                        檢點項目
                    </GridItem>
                    <GridItem
                        colStart={4}
                        colEnd={7}
                        {...filledStyle}
                        pl="1em"
                        letterSpacing="1em"
                        textAlign="center"
                    >
                        檢查結果
                    </GridItem>
                    <GridItem
                        rowStart={1}
                        rowEnd={3}
                        colStart={7}
                        colEnd={8}
                        {...filledStyle}
                    >
                        備註
                    </GridItem>
                    <GridItem {...filledStyle}>正常</GridItem>
                    <GridItem {...filledStyle}>異常</GridItem>
                    <GridItem {...filledStyle}>不適用</GridItem>
                    {f.getAllItems()}
                </Grid>

                <Flex flexDirection="column">
                    <Text alignSelf="end">EE-4411-05A</Text>
                    <Text alignSelf="start" fontWeight={700}>
                        備註
                    </Text>
                </Flex>
                <Grid
                    w="100%"
                    m="5px 0 25px"
                    p="8px"
                    border="2px solid #919AA9"
                    borderRadius="4px"
                    templateColumns="1fr"
                    templateRows="repeat(${offItemsCount}, minmax(min-content, auto))"
                >
                    <GridItem {...unboxStyle}>
                        1.巡檢人員請於適合的欄位打”V”；未從事該項作業或未使用該項機具者於”不適用”之欄位打”V”，備註欄中記錄缺失單位、人員及是否立即改善。
                    </GridItem>
                    <GridItem {...unboxStyle}>
                        2.工安巡檢稽核到缺失時，須告知責任單位缺失，開立「工安缺失紀錄表」要求改善並於巡檢表上簽名確認。
                    </GridItem>
                    <GridItem {...unboxStyle}>3.實施巡檢單位留存。</GridItem>
                </Grid>
                <Grid w="100%" templateColumns="repeat(4, 1fr)">
                    <GridItem>
                        <Text>缺失責任單位：</Text>
                    </GridItem>
                    <GridItem colStart={4} colEnd={5}>
                        <Text>MIC監工單位：</Text>
                    </GridItem>
                    <GridItem
                        {...baseStyle}
                        h="150px"
                        rowStart={2}
                        rowEnd={3}
                        colStart={4}
                        colEnd={5}
                    >
                        <SignaturePad
                            title="MIC監工單位"
                            signatureName="supervisor-unit-signature.png"
                            state={handler.supervisorSignature}
                            placeHolderText="簽名"
                            showTime={true}
                            disable={!!handler.supervisorSignature[0]?.no}
                        />
                    </GridItem>
                </Grid>
            </Box>
            {(loading || formProps.isSubmitting) && <FormLoading />}
        </Form>
    );
}
