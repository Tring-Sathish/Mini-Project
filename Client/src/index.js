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
import { onError } from "@apollo/client/link/error";



const httpLink = new HttpLink({ uri: "http://localhost:9090/v1/graphql" });



export const getToken = async () => {
  const id_token = localStorage.getItem('token');
  return id_token;
};

// add the authorization to the headers
const authMiddleware = setContext(async (_, {headers}) => {
  const token = await getToken();
  const additionalHeaders = {};
  if (!token) {
    additionalHeaders['x-hasura-admin-secret'] = 'Welcome@ta';
  }
  else {
    additionalHeaders['Authorization'] = `Bearer ${token}`;
  }
  return {
    headers: {
      ...headers,
      ...additionalHeaders,
      // "x-hasura-admin-secret": "Welcome@ta",
      "x-hasura-user-id":localStorage.getItem("id"),
      subdomain: window.location.host.split(".")[0],
      // Authorization: token ? `Bearer ${token}` : "",
    },
}})


const logOut = onError(({ graphQLErrors }) => {
  console.log("Graphql Error", graphQLErrors);
  const getUserParams = window.location.pathname.split("/");
  // const getPath = localStorage.getItem("adminDashboardUrl") ? localStorage.getItem("adminDashboardUrl") : `/${getUserParams[1]}/login`;
  if( graphQLErrors && graphQLErrors.length > 0 ){
    graphQLErrors.forEach((error) => {
      console.log(41,error);
      if(error.code ===  "UNAUTHENTICATED"){
        // window.open(`${window.location.origin}/${getUserParams[1]}/login`, '_self');
        // localStorage.removeItem('_accesstoken');
      }
  })
}
})

const client = new ApolloClient({
  link: from([authMiddleware, logOut, httpLink]),
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
