import { gql } from '@apollo/client';
import { PROFILE_FIELDS } from '../fragments/content';

export const ADD_PROFILE = gql`
  ${PROFILE_FIELDS}
  mutation addProfile($text: String!, $resumeId: ID!, $index: Int) {
    addProfile(text: $text, resumeId: $resumeId, index: $index) {
     ...ProfileItemFields
    }
  }
`;

export const UPDATE_PROFILE = gql`
  ${PROFILE_FIELDS}
  mutation updateProfile($id: ID!, $text: String!, $index: Int) {
    updateProfile(id: $id, text: $text, index: $index) {
     ...ProfileItemFields
    }
  }
`;

export const UPDATE_PROFILE_ORDER = gql`
  ${PROFILE_FIELDS}
  mutation updateProfileOrder($items: [ProfileOrder]) {
    updateProfileOrder(items: $items) {
     ...ProfileItemFields
    }
  }
`;

export const UPDATE_SECTION_NAME_PROFILES = gql`
  ${PROFILE_FIELDS}
  mutation updateSectionNameProfile($id: ID! $sectionName: String!) {
    updateSectionNameProfile( id: $id sectionName: $sectionName) {
      id
      sectionName
      items {
      ...ProfileItemFields
      }
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
