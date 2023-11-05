import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import resolvers from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { GET_CONTACTS } from "./graphql/queries";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV !== "production") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const cache = new InMemoryCache();

const init = async () => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage), // Use LocalStorage
  });

  const client = new ApolloClient({
    cache,
    uri: "",
    typeDefs: typeDefs,
    resolvers: resolvers,
    connectToDevTools: process.env.NODE_ENV !== "production",
  });

  try {
    const data = client.readQuery({
      query: GET_CONTACTS,
    });
    if (data === null) {
      client.writeQuery({
        query: GET_CONTACTS,
        data: [],
      });
    }
  } catch (error) {
    client.writeQuery({
      query: GET_CONTACTS,
      data: [],
    });
  }

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
};

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
