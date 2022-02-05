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

export const UPDATE_USER = gql`
  mutation (
    $name: String!
    $email: String!
    $address: String!
    $phone: String!
    $occupation: String!
  ){
    updateUser(
      input: {
        name: $name
        email: $email
        address: $address
        occupation: $occupation
        phone: $phone
      }
    ) {
      code
      message
      success
    }
  }
`;
