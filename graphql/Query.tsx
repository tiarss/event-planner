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
}`

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

export const GET_OWN_EVENT = gql`
  query {
    getOwnEvent {
      id
      userID
      image
      location
      title
      description
      date
      quota
      categoryID
    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query ($id: Int!) {
    getEvent(id: $id) {
      id
      location
      userID
      image
      title
      description
      categoryID
      date
      quota
    }
  }`

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


export const GET_COMMENTS_BY_ID = gql`
  query ($eventID: Int!) {
    getComments(eventID: $eventID) {
      id
      userID
      eventID
      content
    }
  }
`;

export const GET_PARTICIPANT_BY_ID = gql`
  query ($eventID: Int!) {
    getParticipants(eventID: $eventID) {
      id
      userID
      eventID
      status
  }
}`

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
