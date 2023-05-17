import { Box, Select } from '@chakra-ui/react';
import React from 'react';
import { dataCellStyle, getElementProps } from '../Shared/ReactWindowTable';
import useUpdateMachinery from '../../Hooks/Mutation';
import { TableLoading } from '../Shared/Loading';

type statusType = '合格' | '不合格' | '未選';

const statusMap = {
    合格: true,
    不合格: false,
    未選: undefined,
};

export default function InspectionSelect(props: getElementProps) {
    const { style, info, variable } = props;
    const [updateMachinery, { loading }] = useUpdateMachinery(info['siteId']);

    const [status, setStatus] = React.useState<statusType>(
        info[variable] === true
            ? '合格'
            : info[variable] === false
            ? '不合格'
            : '未選'
    );

    return (
        <Box
            {...dataCellStyle}
            style={{
                ...style,
                padding: '0px',
            }}
        >
            <Select
                value={status}
                style={{ textAlignLast: 'center' }}
                height={'29px'}
                borderRadius={'0px'}
                fontFamily={'Inter'}
                fontStyle={'normal'}
                fontWeight={400}
                fontSize={'0.875rem'}
                lineHeight={'1.25rem'}
                {...(status === '未選' && { color: '#66708080' })}
                {...(status === '不合格' && { bg: '#FDFFE3' })}
                onChange={(e) => {
                    const newStatus = e.target.value as statusType;
                    setStatus(newStatus);
                    updateMachinery({
                        variables: {
                            checkId: info['inspectionNo'],
                            siteId: info['siteId'],
                            innerStatus: statusMap[newStatus],
                            ...(variable === 'entryInspection' && {
                                outerStatus: statusMap[newStatus],
                            }),
                            ...(variable === 'onSiteInspection' && {
                                innerStatus: statusMap[newStatus],
                            }),
                        },
                    });
                }}
            >
                <option value={'未選'}>未選</option>
                <option value={'合格'}>合格</option>
                <option value={'不合格'}>不合格</option>
            </Select>
            {loading && <TableLoading />}
        </Box>
    );
}
