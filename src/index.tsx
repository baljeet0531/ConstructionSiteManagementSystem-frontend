import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import CookiesProvider from 'react-cookie/cjs/CookiesProvider';


const link = createHttpLink({
  uri: 'https://dcf3-140-116-247-244.jp.ngrok.io/graphql/',
  credentials: "include",
  fetchOptions: {
    credentials: "include",
  },
})

const authLink = setContext((_, { headers }) => {

  const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('jwt='))?.split('=')[1];

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${cookieValue}`,
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  link: authLink.concat(link),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CookiesProvider>
        <ChakraProvider>
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
