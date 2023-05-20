import { gql } from '@apollo/client';
import { PROJECT_FIELDS } from '../fragments/content';

export const ADD_PROJECT = gql`
  ${PROJECT_FIELDS}
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
      ...ProjectFields
    }
  }
`;

export const UPDATE_PROJECT = gql`
  ${PROJECT_FIELDS}
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
      ...ProjectFields
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
