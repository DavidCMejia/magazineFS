import { ReactNode } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const queryClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  
  });

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={queryClient}>{children}</ApolloProvider>
  )
}
