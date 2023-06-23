import { Select } from '@chakra-ui/react';
import React from 'react';
import {
    IAccountSite,
    ISiteObject,
    QUERY_ACCOUNT_SITES,
} from '../../Layouts/Layout';
import { useQuery } from '@apollo/client';
import { Cookies } from 'react-cookie';
import { FormikProps } from 'formik';
import { IGQLCreatePhoto } from './Formik';
import { FormLoading } from '../Shared/Loading';

export default function SiteSelector(props: {
    field: any;
    formProps: FormikProps<IGQLCreatePhoto>;
}) {
    const { field, formProps } = props;
    const [accountSites, setAccountSites] = React.useState<IAccountSite[]>([]);
    const [siteObject, setSiteObject] = React.useState<ISiteObject>({});
    const username: string = new Cookies().get('username');
    const { loading } = useQuery(QUERY_ACCOUNT_SITES, {
        variables: {
            username: username,
            archived: false,
        },
        onCompleted: ({ accountSite }: { accountSite: IAccountSite[] }) => {
            const siteObject = accountSite.reduce(
                (a, { siteId, siteRef: { name }, role }) => {
                    a[siteId] = {
                        siteId: siteId,
                        siteName: name,
                        role: role,
                    };
                    return a;
                },
                {} as ISiteObject
            );
            setSiteObject(siteObject);
            setAccountSites(accountSite);

            const cachedSiteId = localStorage.getItem('siteId');
            if (cachedSiteId) {
                formProps.setFieldValue(
                    'siteId',
                    siteObject[cachedSiteId]
                        ? cachedSiteId
                        : accountSite[0]?.siteId
                );
            } else {
                localStorage.setItem('siteName', accountSites[0]?.siteRef.name);
                localStorage.setItem('siteId', accountSites[0]?.siteId);
            }
        },
        onError: (err) => {
            console.log(err);
        },
        fetchPolicy: 'network-only',
    });

    const siteOptions = accountSites.map(
        ({ siteId, siteRef: { name } }, index) => (
            <option key={index} value={siteId}>
                {name}
            </option>
        )
    );

    return loading ? (
        <FormLoading />
    ) : (
        <Select
            variant={'grayOutline'}
            {...field}
            onChange={(e) => {
                const siteId = e.target.value;
                formProps.setFieldValue(field.name, siteId);
                localStorage.setItem('siteId', siteId);
                localStorage.setItem('siteName', siteObject[siteId].siteName);
            }}
        >
            {siteOptions}
        </Select>
    );
}
