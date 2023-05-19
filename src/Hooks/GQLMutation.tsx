import { gql, useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { defaultErrorToast, defaultSuccessToast } from '../Utils/DefaultToast';
import { QUERY_MACHINERY } from '../Components/MachineryManagement/MachineryManagement';

const UPDATE_MACHINERY = gql`
    mutation UpdateMachineryManagement(
        $checkId: String!
        $corp: String
        $images: [Upload]
        $innerDate: Date
        $innerStatus: Boolean
        $machinery: String
        $outerDate: Date
        $outerStatus: Boolean
        $siteId: String!
        $supplementary: String
    ) {
        updateMachineryManagement(
            checkId: $checkId
            corp: $corp
            images: $images
            innerDate: $innerDate
            innerStatus: $innerStatus
            machinery: $machinery
            outerDate: $outerDate
            outerStatus: $outerStatus
            siteId: $siteId
            supplementary: $supplementary
        ) {
            ok
            message
        }
    }
`;

export function useUpdateMachinery(siteId: string) {
    const toast = useToast();
    return useMutation(UPDATE_MACHINERY, {
        onCompleted: ({ updateMachineryManagement }) => {
            const { ok, message } = updateMachineryManagement;
            if (ok) defaultSuccessToast(toast, message);
        },
        onError: (err) => {
            console.log(err);
            defaultErrorToast(toast);
        },
        fetchPolicy: 'network-only',
        refetchQueries: [{ query: QUERY_MACHINERY, variables: { siteId } }],
    });
}
