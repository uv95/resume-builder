import { gql } from '@apollo/client';

export const ADD_ADDITIONAL_INFO = gql`
  mutation addAdditionalInfo($info: String!, $personalDetailsId: ID!) {
    addAdditionalInfo(info: $info, personalDetailsId: $personalDetailsId) {
      info
    }
  }
`;

export const UPDATE_ADDITIONAL_INFO = gql`
  mutation updateAdditionalInfo($id: ID!, $info: String) {
    updateAdditionalInfo(id: $id, info: $info) {
      info
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
