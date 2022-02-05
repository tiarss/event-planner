import { gql } from "@apollo/client";

export const GET_OWN_PROFILE = gql`
  query {
    getProfile {
      id
      name
      email
      address
      occupation
      phone
    }
  }
`;
