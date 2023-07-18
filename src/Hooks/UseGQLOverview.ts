/* eslint-disable no-unused-vars */
import {
    DocumentNode,
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

export const useGQLOverview = <
    TOverview,
    TData,
    TExport = {},
    TUpdate = {}
>(config: {
    siteId: string;
    gqlOverview: DocumentNode;
    handleData: (data: TData) => TOverviewTable<TOverview>;
    gqlFilter?: DocumentNode | undefined;
    handleFilterKey?: ((data: TData) => string[]) | undefined;
    gqlExport?: DocumentNode | undefined;
    handleExportData?: ((data: TExport) => IExportField) | undefined;
    gqlUpdate?: DocumentNode | undefined;
    handleUpdate?: ((data: TUpdate) => void) | undefined;
}) => {
    const {
        siteId,
        gqlOverview,
        handleData,
        gqlFilter,
        handleFilterKey,
        gqlExport,
        handleExportData,
        gqlUpdate,
        handleUpdate,
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
            ? useLazyQuery<TData>(gqlFilter, {
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

    const [exportFunction, { loading: exportLoading }] =
        gqlExport && handleExportData
            ? useMutation<TExport>(gqlExport, {
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

    const [updateFunction, { loading: updateLoading }] =
        gqlUpdate && handleUpdate
            ? useMutation<TUpdate>(gqlUpdate, {
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

    const loading =
        fileLoading ||
        queryLoading ||
        searchLoading ||
        exportLoading ||
        updateLoading;

    return {
        tableData,
        setTableData,
        filteredPrimaryKey,
        setFilteredPrimaryKey,
        loading,
        searchFunction,
        exportFunction,
        updateFunction,
    };
};
