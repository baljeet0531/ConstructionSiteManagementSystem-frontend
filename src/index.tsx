import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import CookiesProvider from 'react-cookie/cjs/CookiesProvider';
import { Cookies } from "react-cookie";




const link = createHttpLink({
  uri: 'https://e924-140-116-247-114.jp.ngrok.io/graphql/',
})

const authLink = setContext((_, { headers }) => {

  const cookieValue = new Cookies().get("jwt")

  return cookieValue ? {
    headers: {
      ...headers,
      Authorization: `Bearer ${cookieValue}`,
    }
  } : headers
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
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
