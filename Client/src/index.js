import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./App/Store";
import { Provider } from "react-redux";
// import { Analytics } from "@vercel/analytics/react";
import {ApolloClient, ApolloProvider,InMemoryCache,from,ApolloLink,HttpLink,} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: "http://localhost:9090/v1/graphql" });

export const getToken = async () => {
  const id_token = localStorage.getItem('token');
  return id_token;
};

// add the authorization to the headers
const authMiddleware = setContext(async (_, {headers}, options) => {
  const token = await getToken();
  const additionalHeaders = {};
  if (token) {
    additionalHeaders['Authorization'] = `Bearer ${token}`;
  }
  return {
    headers: {
      ...headers,
      ...additionalHeaders,
      subdomain: window.location.host.split(".")[0],
    },
}})

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
