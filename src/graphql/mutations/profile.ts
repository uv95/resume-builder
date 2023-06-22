import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($text: String!, $resumeId: ID!, $index: Int) {
    addProfile(text: $text, resumeId: $resumeId, index: $index) {
      text
      index
      id
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($id: ID!, $text: String!, $index: Int) {
    updateProfile(id: $id, text: $text, index: $index) {
      text
      index
      id
    }
  }
`;

export const UPDATE_PROFILES_ORDER = gql`
  mutation updateProfileOrder($items: [ProfileOrder]) {
    updateProfileOrder(items: $items) {
      text
      index
      id
    }
  }
`;

export const UPDATE_SECTION_NAME_PROFILES = gql`
  mutation updateSectionNameProfile($id: ID! $sectionName: String!) {
    updateSectionNameProfile( id: $id sectionName: $sectionName) {
      id
      sectionName
      items
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
