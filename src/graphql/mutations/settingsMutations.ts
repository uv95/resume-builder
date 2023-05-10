import { gql } from '@apollo/client';

export const UPDATE_SETTINGS = gql`
  mutation updateSettings($id: ID!, $sectionsOrder: [String]) {
    updateSettings(id: $id, sectionsOrder: $sectionsOrder) {
      id
      sectionsOrder
    }
  }
`;
