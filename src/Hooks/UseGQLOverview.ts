/* eslint-disable no-unused-vars */
import {
    DocumentNode,
    LazyQueryExecFunction,
    MutationTuple,
    OperationVariables,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import React from 'react';
import { useFileExport } from './UseFileExport';
import { IExportField } from '../Interface/IGQL';
import { defaultErrorToast } from '../Utils/DefaultToast';

export type TOverviewChecked<T> = T & {
    index: number;
    isChecked: boolean;
};

export type TOverviewTable<T> = Record<string, TOverviewChecked<T>>;

export const useGQLOverview = <TOverview, TData, TExport>(config: {
    siteId: string;
    gqlOverview: DocumentNode;
    handleData: (data: TData) => TOverviewTable<TOverview>;
    gqlFilter?: DocumentNode | undefined;
    handleFilterKey?: ((data: TData) => string[]) | undefined;
    gqlExport?: DocumentNode | undefined;
    handleExportData?: ((data: TExport) => IExportField) | undefined;
}) => {
    const {
        gqlOverview,
        gqlFilter,
        gqlExport,
        siteId,
        handleData,
        handleFilterKey,
        handleExportData,
    } = config;
    const toast = useToast();
    const { fileLoading, exportFile } = useFileExport();
    const [tableData, setTableData] = React.useState<TOverviewTable<TOverview>>(
        {} as TOverviewTable<TOverview>
    );
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();

    const { loading: queryLoading } = useQuery(gqlOverview, {
        variables: {
            siteId: siteId,
        },
        onCompleted: (data: TData) => {
            const formattedData = handleData(data);
            setTableData(formattedData);
        },
        onError: (error) => {
            console.log(error);
        },
        fetchPolicy: 'network-only',
    });

    const [searchFunction, { loading: searchLoading }] =
        gqlFilter && handleFilterKey
            ? useLazyQuery(gqlFilter, {
                  onCompleted: (data: TData) => {
                      setFilteredPrimaryKey(handleFilterKey(data));
                  },
                  onError: (error) => {
                      console.log(error);
                      defaultErrorToast(toast);
                  },
                  fetchPolicy: 'network-only',
              })
            : [() => {}, { loading: false }];

    const [exportFunction, { loading: exportLoading }] =
        gqlExport && handleExportData
            ? useMutation(gqlExport, {
                  onCompleted: (data: TExport) => {
                      exportFile(handleExportData(data));
                  },
                  onError: (error) => {
                      console.log(error);
                      defaultErrorToast(toast);
                  },
                  fetchPolicy: 'network-only',
              })
            : [() => {}, { loading: false }];

    const loading =
        fileLoading || queryLoading || searchLoading || exportLoading;

    return {
        tableData,
        setTableData,
        filteredPrimaryKey,
        loading,
        searchFunction,
        exportFunction,
    };
};

const myFunction = (param: string | undefined): string | undefined => {
    if (param) {
        return `Hello, ${param}!`;
    } else {
        return undefined;
    }
};

const a = myFunction('');
