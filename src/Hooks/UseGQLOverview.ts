/* eslint-disable no-unused-vars */
import {
    DocumentNode,
    LazyQueryHookOptions,
    LazyQueryResultTuple,
    MutationHookOptions,
    MutationTuple,
    OperationVariables,
    QueryHookOptions,
    TypedDocumentNode,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import React from 'react';
import { useFileExport } from './UseFileExport';
import { IExportField } from '../Interface/IGQL';
import { defaultErrorToast } from '../Utils/DefaultToast';
import { TOverviewTable } from '../Types/TableOverview';

export type TEmptyResult = [() => void, { loading: boolean }];

export const useGQLOverview = <
    TOverview,
    TOverviewData,
    TOverviewVariable = OperationVariables,
    TUpdateData = {},
    TUpdateVariable = OperationVariables,
    TExportData = {},
    TExportVariable = OperationVariables
>(config: {
    gqlOverview:
        | DocumentNode
        | TypedDocumentNode<TOverviewData, TOverviewVariable>;
    handleData: (data: TOverviewData) => TOverviewTable<TOverview>;
    overviewOptions?: QueryHookOptions<TOverviewData, TOverviewVariable>;
    gqlFilter?:
        | DocumentNode
        | TypedDocumentNode<TOverviewData, TOverviewVariable>;
    handleFilterKey?: ((data: TOverviewData) => string[]) | undefined;
    filterOptions?: LazyQueryHookOptions<TOverviewData, TOverviewVariable>;
    gqlUpdate?: DocumentNode | TypedDocumentNode<TUpdateData, TUpdateVariable>;
    handleUpdate?: ((data: TUpdateData) => void) | undefined;
    updateOptions?: MutationHookOptions<TUpdateData, TUpdateVariable>;
    gqlExport?: DocumentNode | TypedDocumentNode<TExportData, TExportVariable>;
    handleExportData?: ((data: TExportData) => IExportField) | undefined;
    exportOptions?: MutationHookOptions<TExportData, TExportVariable>;
}) => {
    const {
        gqlOverview,
        handleData,
        overviewOptions,
        gqlFilter,
        handleFilterKey,
        filterOptions,
        gqlUpdate,
        handleUpdate,
        updateOptions,
        gqlExport,
        handleExportData,
        exportOptions,
    } = config;
    const toast = useToast();
    const { fileLoading, exportFile } = useFileExport();
    const [tableData, setTableData] = React.useState<TOverviewTable<TOverview>>(
        {} as TOverviewTable<TOverview>
    );
    const [filteredPrimaryKey, setFilteredPrimaryKey] =
        React.useState<string[]>();

    const queryResult = useQuery(gqlOverview, {
        ...overviewOptions,
        onCompleted: (data: TOverviewData) => {
            const formattedData = handleData(data);
            setTableData(formattedData);
        },
        onError: (error) => {
            console.log(error);
        },
        fetchPolicy: 'network-only',
    });

    const filterResult:
        | LazyQueryResultTuple<TOverviewData, TOverviewVariable>
        | TEmptyResult =
        gqlFilter && handleFilterKey
            ? useLazyQuery(gqlFilter, {
                  ...filterOptions,
                  onCompleted: (data) => {
                      setFilteredPrimaryKey(handleFilterKey(data));
                  },
                  onError: (error) => {
                      console.log(error);
                      defaultErrorToast(toast);
                  },
                  fetchPolicy: 'network-only',
              })
            : [() => {}, { loading: false }];

    const updateResult:
        | MutationTuple<TUpdateData, TUpdateVariable>
        | TEmptyResult =
        gqlUpdate && handleUpdate
            ? useMutation(gqlUpdate, {
                  ...updateOptions,
                  onCompleted: (data) => {
                      handleUpdate(data);
                  },
                  onError: (error) => {
                      console.log(error);
                      defaultErrorToast(toast);
                  },
                  fetchPolicy: 'network-only',
              })
            : [() => {}, { loading: false }];

    const exportResult:
        | MutationTuple<TExportData, TExportVariable>
        | TEmptyResult =
        gqlExport && handleExportData
            ? useMutation(gqlExport, {
                  ...exportOptions,
                  onCompleted: (data) => {
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
        fileLoading ||
        queryResult.loading ||
        filterResult[1].loading ||
        exportResult[1].loading ||
        updateResult[1].loading;

    return {
        tableData,
        setTableData,
        filteredPrimaryKey,
        setFilteredPrimaryKey,
        loading,
        queryResult,
        filterResult,
        exportResult,
        updateResult,
    };
};
