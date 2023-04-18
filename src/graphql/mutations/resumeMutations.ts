import { gql } from '@apollo/client';

export const ADD_RESUME = gql`
  mutation addResume {
    addResume {
      name
      id
    }
  }
`;

export const UPDATE_RESUME = gql`
  mutation updateResume($id: ID!, $name: String) {
    updateResume(id: $id, name: $name) {
      name
    }
  }
`;

export const DELETE_RESUME = gql`
  mutation deleteResume($id: ID!) {
    deleteResume(id: $id) {
      id
    }
  }
`;
