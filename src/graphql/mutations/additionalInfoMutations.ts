import { gql } from '@apollo/client';

export const ADD_ADDITIONAL_INFO = gql`
  mutation addAdditionalInfo(
    $info: String!
    $name: String
    $personalDetailsId: ID!
  ) {
    addAdditionalInfo(
      info: $info
      name: $name
      personalDetailsId: $personalDetailsId
    ) {
      info
      name
      id
    }
  }
`;

export const UPDATE_ADDITIONAL_INFO = gql`
  mutation updateAdditionalInfo($id: ID!, $info: String, $name: String) {
    updateAdditionalInfo(id: $id, info: $info, name: $name) {
      info
      name
      id
    }
  }
`;

export const DELETE_ADDITIONAL_INFO = gql`
  mutation deleteAdditionalInfo($id: ID!) {
    deleteAdditionalInfo(id: $id) {
      id
    }
  }
`;
