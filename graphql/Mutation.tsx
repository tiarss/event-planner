import { gql } from "@apollo/client";

export const ADD_EVENT = gql`
  mutation (
    $title: String!
    $image: String!
    $description: String!
    $location: String!
    $date: Time!
    $quota: Int!
    $categoryID: Int!
  ) {
    createEvent(
      input: {
        title: $title
        image: $image
        description: $description
        location: $location
        date: $date
        quota: $quota
        categoryID: $categoryID
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
    $avatar: String!
  ) {
    updateUser(
      input: {
        name: $name
        email: $email
        address: $address
        occupation: $occupation
        phone: $phone
        avatar: $avatar
      }
    ) {
      code
      message
      success
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation (
    $id: Int!
    $title: String!
    $image: String!
    $description: String!
    $location: String!
    $date: Time!
    $quota: Int!
    $categoryID: Int!
  ) {
    updateEvent(
      id: $id
      input: {
        title: $title
        image: $image
        description: $description
        location: $location
        date: $date
        quota: $quota
        categoryID: $categoryID
      }
    ) {
      code
      message
      success
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation ($id: Int!) {
    deleteEvent(id: $id) {
      code
      message
      success
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation ($eventID: Int!, $content: String!) {
    createComment(input: { eventID: $eventID, content: $content }) {
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
    register(
      input: {
        name: $name
        email: $email
        password: $password
        address: $address
        occupation: $occupation
        phone: $phone
      }
    ) {
      name
      email
    }
  }
`;

export const JOIN_EVENT = gql`
  mutation($eventID : Int!){
    createParticipant(input: { eventID: $eventID, status: true }) {
      code
      message
      success
    }
  }
`;
