import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($text: String!, $resumeId: ID!) {
    addProfile(text: $text, resumeId: $resumeId) {
      text
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($id: ID!, $text: String!) {
    updateProfile(id: $id, text: $text) {
      text
    }
  }
`;

export const DELETE_PROFILE = gql`
  mutation deleteProfile($id: ID!) {
    deleteProfile(id: $id) {
      id
    }
  }
`;
