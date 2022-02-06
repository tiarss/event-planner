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
  }
`;
