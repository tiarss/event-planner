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
