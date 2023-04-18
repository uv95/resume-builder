import { gql } from '@apollo/client';

export const ADD_LINK = gql`
  mutation addLink($link: String!, $personalDetailsId: ID!) {
    addLink(link: $link, personalDetailsId: $personalDetailsId) {
      link
    }
  }
`;

export const UPDATE_LINK = gql`
  mutation updateLink($id: ID!, $link: String) {
    updateLink(id: $id, link: $link) {
      link
    }
  }
`;

export const DELETE_LINK = gql`
  mutation deleteLink($id: ID!) {
    deleteLink(id: $id) {
      id
    }
  }
`;
