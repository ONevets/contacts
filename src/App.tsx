/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import ContactsPage from './components/ContactsPage';
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import resolvers from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV !== "production") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

function App() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      });

      const apolloClient = new ApolloClient({
        cache,
        uri: "",
        typeDefs: typeDefs,
        resolvers: resolvers,
        connectToDevTools: process.env.NODE_ENV !== "production",
      });
      
      setClient(apolloClient);
    }
    
    init().catch(console.error);
  }, []);

  if (!client) {
    return <h2>Initializing app...</h2>;
  } else{
    
    return (
      <ApolloProvider client={client}>
        <ContactsPage></ContactsPage>
      </ApolloProvider>
    )
  }
  
}

export default App;

