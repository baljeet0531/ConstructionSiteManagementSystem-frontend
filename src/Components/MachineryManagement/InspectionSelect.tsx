import { Box, Select } from '@chakra-ui/react';
import React from 'react';
import { dataCellStyle, getElementProps } from '../Shared/ReactWindowTable';
import { useUpdateMachinery } from '../../Hooks/GQLMutation';
import { TableLoading } from '../Shared/Loading';

type statusType = '合格' | '不合格' | '未選';

const statusMap = {
    合格: true,
    不合格: false,
    未選: null,
};

export default function InspectionSelect(
    props: getElementProps & { editable: boolean }
) {
    const { editable, ...restProps } = props;
    const { style, info, variable } = restProps;
    const [updateMachinery, { loading }] = useUpdateMachinery(info['siteId']);

    const [status, setStatus] = React.useState<statusType>(
        info[variable] === true
            ? '合格'
            : info[variable] === false
            ? '不合格'
            : '未選'
    );

    return editable ? (
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
                {status === '未選' && <option value={'未選'}>未選</option>}
                <option value={'合格'}>合格</option>
                <option value={'不合格'}>不合格</option>
            </Select>
            {loading && <TableLoading />}
        </Box>
    ) : (
        <Box
            {...dataCellStyle}
            style={style}
            {...(status === '未選' && { color: '#66708080' })}
            {...(status === '不合格' && { bg: '#FDFFE3' })}
        >
            {status}
        </Box>
    );
}
