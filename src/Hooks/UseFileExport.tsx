import { useToast } from '@chakra-ui/react';
import React from 'react';
import { exportFile } from '../Utils/Resources';
import { IExportField } from '../Interface/IGQL';

export const useFileExport = () => {
    const toast = useToast();
    const [fileLoading, setFileLoading] = React.useState<boolean>(false);

    return {
        fileLoading: fileLoading,
        exportFile: ({ ok, path, message }: IExportField) => {
            if (ok) {
                setFileLoading(true);
                exportFile(path, message, toast).then(() => {
                    setFileLoading(false);
                });
            }
        },
    };
};
