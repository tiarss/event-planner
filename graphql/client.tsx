import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const endpoint = new HttpLink({
   uri: "http://13.208.193.5:8080/query",
})

const client = new ApolloClient({
   link: endpoint,
   cache: new InMemoryCache()
})

export default client