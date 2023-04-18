import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
  mutation addProject(
    $title: String!
    $startDate: String
    $endDate: String
    $description: String
    $resumeId: ID!
  ) {
    addProject(
      title: $title
      startDate: $startDate
      endDate: $endDate
      description: $description
      resumeId: $resumeId
    ) {
      title
      startDate
      endDate
      description
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $title: String
    $startDate: String
    $endDate: String
    $description: String
  ) {
    updateProject(
      id: $id
      title: $title
      startDate: $startDate
      endDate: $endDate
      description: $description
    ) {
      title
      startDate
      endDate
      description
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;
