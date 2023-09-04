import React from 'react';
import { Text, Flex, useToast, SimpleGrid } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { ALL_HUMAN_RESOURCE, SEARCH_HUMAN } from './PeopleOverview';
import {
    defaultErrorToast,
    defaultSuccessToast,
} from '../../Utils/DefaultToast';
import { FormLoading } from '../Shared/Loading';
import { ISelectedHuman } from '../../Interface/PeopleManagement';
import { IMutationData } from '../../Interface/IGQL';
import BlueBodyModal from '../Shared/BlueBodyModal';

const MULTI_REVIEW = gql`
    mutation refactored923($nos: [String]!) {
        reviewMultipleHR(nos: $nos) {
            ok
            message
        }
    }
`;

export default function MultiReviewModal(props: {
    isOpen: boolean;
    onClose: () => void;
    selected?: ISelectedHuman[];
}) {
    const toast = useToast();
    const { isOpen, onClose, selected } = props;

    const [multiReview, { loading }] = useMutation<{
        reviewMultipleHR: IMutationData;
    }>(MULTI_REVIEW, {
        onCompleted: ({ reviewMultipleHR: { ok, message } }) => {
            if (ok) {
                onClose();
                defaultSuccessToast(toast, '審查成功');
            } else defaultErrorToast(toast, message);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        refetchQueries: [
            {
                query: ALL_HUMAN_RESOURCE,
                variables: { errlist: false },
                fetchPolicy: 'network-only',
            },
            {
                query: ALL_HUMAN_RESOURCE,
                variables: { errlist: true },
                fetchPolicy: 'network-only',
            },
            SEARCH_HUMAN,
        ],
        onQueryUpdated: (observableQuery) => observableQuery.refetch(),
        fetchPolicy: 'network-only',
    });

    const PeopleWithNo: ISelectedHuman[] = [];
    const PeopleWithoutNo: ISelectedHuman[] = [];

    selected?.forEach((value) =>
        value.no ? PeopleWithNo.push(value) : PeopleWithoutNo.push(value)
    );

    return loading ? (
        <FormLoading />
    ) : (
        <BlueBodyModal
            title="批量審查"
            cancelButton={{ name: '取消審查', handleClick: onClose }}
            confirmButton={{
                name: '確認審查',
                handleClick: () => {
                    multiReview({
                        variables: {
                            nos: PeopleWithNo.flatMap(({ no }) => `${no}`),
                        },
                    });
                },
            }}
            isOpen={isOpen}
            onClose={onClose}
            bodyStyle={{
                padding: '20px 10px',
            }}
        >
            <SimpleGrid columns={2} spacing={'10px'} justifyItems={'center'}>
                <Text fontWeight={700} fontSize={'0.875rem'}>
                    無法批量審查之人員
                    <br />
                    (即將過期或已過期)
                </Text>
                <Text fontWeight={700} fontSize={'0.875rem'}>
                    可以批量審查之人員
                </Text>
                <Flex
                    direction={'column'}
                    justify={'flex-start'}
                    align={'center'}
                    flex={1}
                >
                    {PeopleWithoutNo.length ? (
                        PeopleWithoutNo.map(({ idno }) => (
                            <Text key={idno}>{idno}</Text>
                        ))
                    ) : (
                        <Text>無</Text>
                    )}
                </Flex>
                <Flex
                    direction={'column'}
                    justify={'flex-start'}
                    align={'center'}
                    flex={1}
                >
                    {PeopleWithNo.length ? (
                        PeopleWithNo.map(({ idno }) => (
                            <Text key={idno}>{idno}</Text>
                        ))
                    ) : (
                        <Text>無</Text>
                    )}
                </Flex>
            </SimpleGrid>
        </BlueBodyModal>
    );
}
