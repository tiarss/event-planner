import { gql } from "@apollo/client";

export const SIGNIN = gql`
  query (
    $email: String!,
    $password: String!
  ) {
    login (
      email: $email, 
      password: $password
    ) {
      id
      token
    }
  }
`;

export const GET_ALL_EVENTS_PAGINATE = gql`
  query (
    $limit: Int!,
    $offset: Int!
  ) {
    getPaginationEvents(limit: $limit, offset: $offset){
        id
        userID
        image
        title
        description
        date
        quota
    }
  }
`;

export const GET_EVENTS_BY_SEARCH = gql`
  query (
    $search: String!
  ) {
    getEventsBySearch(search: $search){
        id
        userID
        image
        title
        location
        date
    }
  }
`;
