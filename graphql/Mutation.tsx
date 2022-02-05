import { gql } from "@apollo/client";

export const ADD_EVENT = gql`
  mutation (
    $title: String!
    $image: String!
    $description: String!
    $location: String!
    $date: Time!
    $quota: Int!
  ) {
    createEvent(
      input: {
        title: $title
        image: $image
        description: $description
        location: $location
        date: $date
        quota: $quota
      }
    ) {
      code
      message
      success
    }
  }
`;

export const ADD_USER = gql`
  mutation (
    $name: String!
    $email: String!
    $password: String!
    $address: String!
    $occupation: String!
    $phone: String!
  ) {
    register (
      input: {
        name: $name, 
        email: $email, 
        password: $password, 
        address: $address, 
        occupation: $occupation, 
        phone: $phone
      }
    ) {
      code
      message
      success
    }
  }
`;
