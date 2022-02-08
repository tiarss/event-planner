import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const endpoint = new HttpLink({
   uri: "https://salmaa.site/query",
})

const client = new ApolloClient({
   link: endpoint,
   cache: new InMemoryCache()
})

export default client