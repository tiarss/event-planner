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
