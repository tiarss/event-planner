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

export const GET_ALL_EVENTS = gql`
  query{
    getEvents{
        id
        userID
        image
        title
        location
        date
    }
  }
`;
