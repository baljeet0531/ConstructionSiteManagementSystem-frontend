import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ChakraProvider } from '@chakra-ui/react';
import myTheme from './Chakra/Themes/themes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import CookiesProvider from 'react-cookie/cjs/CookiesProvider';
import { Cookies } from 'react-cookie';
import BACKEND from './Constants/EnvConstants';

const link: any = createUploadLink({
    uri: BACKEND + '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const cookieValue = new Cookies().get('jwt');
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${cookieValue}`,
        },
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: authLink.concat(link),
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

console.log(myTheme);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <CookiesProvider>
                <ChakraProvider theme={myTheme}>
                    <App />
                </ChakraProvider>
            </CookiesProvider>
        </ApolloProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
