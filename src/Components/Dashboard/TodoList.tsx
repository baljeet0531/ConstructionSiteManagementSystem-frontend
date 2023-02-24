import { gql, useQuery } from '@apollo/client';
import { Flex, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { Cookies } from 'react-cookie';
import { WarningIcon } from '../../Icons/Icons';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { todoListFlexStyle } from './Style';

const TODO_LIST = gql`
    query DashboardTodolist($siteId: String!, $username: String!) {
        dashboardTodolist(siteId: $siteId, username: $username)
    }
`;

export default function TodoList(props: { siteId: string }) {
    const { siteId } = props;
    const username = new Cookies().get('username');
    const toast = useToast();

    const [todoListInfo, setTodoListInfo] = React.useState<string[]>([]);

    const todoListElement = todoListInfo.map((element, index) => {
        return (
            <Flex {...todoListFlexStyle} key={index}>
                <WarningIcon />
                <Text variant={'w400s14'}>尚未完成</Text>
                <Text variant={'w400s14'}>{element}</Text>
            </Flex>
        );
    });

    useQuery(TODO_LIST, {
        variables: {
            siteId: siteId,
            username: username,
        },
        onCompleted: ({ dashboardTodolist }) => {
            setTodoListInfo(dashboardTodolist);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
    });

    return (
        <Flex direction={'column'}>
            <Text variant={'w700s16'}>待辦事項</Text>
            {todoListElement}
        </Flex>
    );
}
