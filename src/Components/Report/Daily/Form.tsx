import { IDailyReport } from '../../../Interface/DailyReport';
import { FormikProps, Form } from 'formik';
import FormFactory from './Factory';
import { Box, Button, Image, Grid, GridItem, Text } from '@chakra-ui/react';
import { EditIcon } from '../../../Icons/Icons';
import { useQuery } from '@apollo/client';
import { GQL_DAILY_REPORT_QUERY } from './GQL';
import { useState } from 'react';
import { FormLoading } from '../../Shared/Loading';
import { getImage } from '../../../Utils/Resources';
import {
    contentStyle,
    subTitleStyle,
    tableTitleStyle,
    titleStyle,
} from './Styles';
import GridInputItem from '../../Shared/GridInputItem';

export default function DailyReportForm({
    formProps,
    siteId,
    serialNumber,
}: {
    formProps: FormikProps<IDailyReport>;
    siteId: string;
    serialNumber: string;
}) {
    const [loading, setLoading] = useState<boolean>(true);
    const [ownerIconURL, setOwnerIconURL] = useState<string>('');
    const f = new FormFactory(formProps);
    useQuery(GQL_DAILY_REPORT_QUERY, {
        variables: {
            siteId: siteId,
            serialNumber: serialNumber,
        },
        onCompleted: (d) => {
            // const singleFormData = parseDailyReport(d.dailyReport);
            // if (singleFormData) {
            //     formProps.setValues(singleFormData, false);
            // }
            type Node = { node: { siteId: string; avatar: string } };
            const targetSites: Node = d.allSites.edges.find(
                (i: Node) => i.node.siteId === siteId
            );
            if (targetSites && targetSites.node.avatar) {
                getImage(targetSites.node.avatar).then((b) =>
                    setOwnerIconURL(URL.createObjectURL(b as Blob))
                );
            }
            setLoading(false);
        },
        onError: (err) => {
            console.error(err);
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
                <Grid templateColumns="repeat(3, 1fr)">
                    <GridItem {...titleStyle}>
                        {ownerIconURL && (
                            <Image maxH="51px" src={ownerIconURL} />
                        )}
                        <Image maxH="51px" src={'/mic-icon.png'} />
                    </GridItem>
                    <GridItem
                        {...titleStyle}
                        justifyContent="center"
                        fontSize="32px"
                    >
                        工作日報表
                    </GridItem>
                    <GridItem {...titleStyle} justifyContent="flex-end">
                        表單序號：{serialNumber}
                    </GridItem>
                </Grid>
                <Grid
                    templateColumns="75fr 234fr 83fr 96fr 150fr 83fr 75fr 73fr"
                    templateRows="0.8fr repeat(1fr, 4)"
                    mt="16px"
                    h="40vh"
                >
                    <GridItem colStart={1} colEnd={5} {...subTitleStyle}>
                        基本資訊
                    </GridItem>
                    <GridItem colStart={7} colEnd={8} {...subTitleStyle}>
                        天氣
                    </GridItem>
                    <GridItem rowStart={2} {...contentStyle}>
                        工程名稱
                    </GridItem>
                    <GridInputItem
                        gridRange={[2, 2, 2, 2]}
                        fieldName=""
                        inputComponent={f.input('text', true)}
                    />
                    <GridItem rowStart={2} colStart={4} {...contentStyle}>
                        日期
                    </GridItem>
                    <GridInputItem
                        gridRange={[2, 2, 5, 5]}
                        fieldName=""
                        inputComponent={f.input('date', true)}
                    />
                    <GridItem />
                    <GridItem rowStart={2} colStart={7} {...contentStyle}>
                        上午
                    </GridItem>
                    <GridInputItem
                        gridRange={[2, 2, 8, 8]}
                        fieldName=""
                        inputComponent={f.input('text', true)}
                    />

                    <GridItem rowStart={3} {...contentStyle}>
                        業主
                    </GridItem>
                    <GridInputItem
                        gridRange={[3, 3, 2, 2]}
                        fieldName=""
                        inputComponent={f.input('text')}
                    />
                    <GridItem rowStart={3} colStart={4} {...contentStyle}>
                        進場日期
                    </GridItem>
                    <GridInputItem
                        gridRange={[3, 3, 5, 5]}
                        fieldName=""
                        inputComponent={f.input('date', true)}
                    />
                    <GridItem />
                    <GridItem rowStart={3} colStart={7} {...contentStyle}>
                        下午
                    </GridItem>
                    <GridInputItem
                        gridRange={[3, 3, 8, 8]}
                        fieldName=""
                        inputComponent={f.input('text', true)}
                    />

                    <GridItem rowStart={4} {...contentStyle}>
                        施工單位
                    </GridItem>
                    <GridInputItem
                        gridRange={[4, 4, 2, 2]}
                        fieldName=""
                        inputComponent={f.input('text')}
                    />
                    <GridItem rowStart={4} colStart={4} {...contentStyle}>
                        累計天數
                    </GridItem>
                    <GridInputItem
                        gridRange={[4, 4, 5, 5]}
                        fieldName=""
                        inputComponent={f.input('text', true)}
                    />
                    <GridItem />
                    <GridItem rowStart={4} colStart={7} {...contentStyle}>
                        最高氣溫
                    </GridItem>
                    <GridInputItem
                        gridRange={[4, 4, 8, 8]}
                        fieldName=""
                        inputComponent={f.input('text', true)}
                    />

                    <GridItem />
                    <GridItem />
                    <GridItem rowStart={5} colStart={4} {...contentStyle}>
                        累計出工人數
                    </GridItem>
                    <GridInputItem
                        gridRange={[5, 5, 5, 5]}
                        fieldName=""
                        inputComponent={f.input('text', true)}
                    />
                    <GridItem />
                    <GridItem rowStart={5} colStart={7} {...contentStyle}>
                        最低氣溫
                    </GridItem>
                    <GridInputItem
                        gridRange={[5, 5, 8, 8]}
                        fieldName=""
                        inputComponent={f.input('text', true)}
                    />
                </Grid>

                <Text {...subTitleStyle}>出工狀況</Text>
                <Grid
                    templateColumns="repeat(1fr, 11)"
                    templateRows="repeat(1fr, 5)"
                    mt="16px"
                    h="40vh"
                >
                    <GridItem {...tableTitleStyle}>出工項目</GridItem>
                    <GridItem></GridItem>
                    <GridItem></GridItem>
                    <GridItem></GridItem>
                    <GridItem></GridItem>
                </Grid>
            </Box>
            {(loading || formProps.isSubmitting) && <FormLoading />}
        </Form>
    );
}
