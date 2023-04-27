import { gql } from '@apollo/client';

export const ADD_LINK = gql`
  mutation addLink($link: String!, $name: String, $personalDetailsId: ID!) {
    addLink(link: $link, name: $name, personalDetailsId: $personalDetailsId) {
      link
      name
      id
    }
  }
`;

export const UPDATE_LINK = gql`
  mutation updateLink($id: ID!, $link: String, $name: String) {
    updateLink(id: $id, link: $link, name: $name) {
      link
      name
      id
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
