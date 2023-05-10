import {
    Button,
    Flex,
    Radio,
    RadioGroup,
    Text,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import { LaunchIcon } from '../../../Icons/Icons';
import { gql, useMutation, useQuery } from '@apollo/client';
import { PageLoading } from '../../Shared/Loading';
import { exportFile } from '../../../Utils/Resources';
import { Cookies } from 'react-cookie';
import { defaultErrorToast } from '../../../Utils/DefaultToast';

type granularityName = '月' | '季';
type granularityValue = 'month' | 'quarter';
type granularityType = Record<granularityName, granularityValue>;

const timeGranularity: granularityType = { 月: 'month', 季: 'quarter' };

const QUERY_VERSIONS = gql`
    query ScheduleVersion($siteId: String!) {
        scheduleVersion(siteId: $siteId)
    }
`;
const EXPORT_MONTHLY_REPORT = gql`
    mutation ExportMonthlyReport(
        $siteId: String!
        $targetVersion: String!
        $timeScale: String!
        $username: String!
    ) {
        exportMonthlyReport(
            siteId: $siteId
            targetVersion: $targetVersion
            timeScale: $timeScale
            username: $username
        ) {
            ok
            message
            path
        }
    }
`;

export default function MonthlyReport(props: { siteId: string }) {
    const { siteId } = props;
    const username = new Cookies().get('username');

    const toast = useToast();
    const [versions, setVersions] = React.useState<string[]>([]);
    const [fileLoading, setFileLoading] = React.useState<Boolean>(false);
    const [version, setVersion] = React.useState<string>();
    const [granularity, setGranularity] =
        React.useState<granularityValue>('month');

    const { loading } = useQuery(QUERY_VERSIONS, {
        variables: { siteId: siteId },
        onCompleted: ({ scheduleVersion }: { scheduleVersion: string[] }) => {
            setVersions(scheduleVersion);
            setVersion(
                scheduleVersion.length != 0 ? scheduleVersion[0] : undefined
            );
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const [exportMonthlyReport, { loading: exportLoading }] = useMutation(
        EXPORT_MONTHLY_REPORT,
        {
            onCompleted: ({ exportMonthlyReport }) => {
                const { ok, message, path } = exportMonthlyReport;
                if (ok) {
                    setFileLoading(true);
                    exportFile(path, message, toast).then(() => {
                        setFileLoading(false);
                    });
                }
            },
            onError: (err) => {
                console.log(err);
                defaultErrorToast(toast);
            },
            fetchPolicy: 'network-only',
        }
    );

    const versionRadios = versions.map((date, index) => (
        <Radio key={index} value={date} variant={'grayRadio'}>
            <Text>{date.split('.')[0]}</Text>
        </Radio>
    ));
    const timeGranularityRadios = Object.entries(timeGranularity).map(
        ([key, value], index) => (
            <Radio key={index} value={value} variant={'grayRadio'}>
                <Text>{key}</Text>
            </Radio>
        )
    );

    return (
        <Flex
            direction={'column'}
            align={'flex-end'}
            justify={'flex-start'}
            width={'464px'}
            border={'1px dashed #919AA9'}
            borderRadius={'5px'}
            padding={'15px'}
        >
            <Flex width={'100%'}>
                <Flex width={'50%'}>
                    <Text>原始計畫：</Text>
                    <RadioGroup defaultValue={version} onChange={setVersion}>
                        <Flex direction={'column'}>{versionRadios}</Flex>
                    </RadioGroup>
                </Flex>
                <Flex width={'50%'}>
                    <Text>時間單位：</Text>
                    <RadioGroup
                        defaultValue={granularity}
                        onChange={(val) =>
                            setGranularity(val as granularityValue)
                        }
                    >
                        <Flex direction={'column'}>
                            {timeGranularityRadios}
                        </Flex>
                    </RadioGroup>
                </Flex>
            </Flex>
            <Button
                leftIcon={<LaunchIcon />}
                variant={'buttonGrayOutline'}
                onClick={() => {
                    version &&
                        exportMonthlyReport({
                            variables: {
                                siteId: siteId,
                                targetVersion: version,
                                timeScale: granularity,
                                username: username,
                            },
                        });
                }}
            >
                輸出
            </Button>
            {(loading || exportLoading || fileLoading) && <PageLoading />}
        </Flex>
    );
}
