import { gql } from '@apollo/client';
import { PROJECT_FIELDS } from '../fragments/content';

export const ADD_PROJECT = gql`
  ${PROJECT_FIELDS}
  mutation addProject(
    $title: String!
    $startDate: String
    $endDate: String
    $description: String
    $index: Int
    $resumeId: ID!
  ) {
    addProject(
      title: $title
      startDate: $startDate
      endDate: $endDate
      description: $description
      index: $index
      resumeId: $resumeId
    ) {
      ...ProjectItemFields
    }
  }
`;

export const UPDATE_PROJECT = gql`
  ${PROJECT_FIELDS}
  mutation updateProject(
    $id: ID!
    $title: String!
    $startDate: String
    $endDate: String
    $description: String
    $index: Int
  ) {
    updateProject(
      id: $id
      title: $title
      startDate: $startDate
      endDate: $endDate
      description: $description
      index: $index
    ) {
      ...ProjectItemFields
    }
  }
`;

export const UPDATE_PROJECTS_ORDER = gql`
  ${PROJECT_FIELDS}
  mutation updateProjectsOrder($items: [ProjectOrder]) {
    updateProjectsOrder(items: $items) {
      ...ProjectItemFields
    }
  }
`;

export const UPDATE_SECTION_NAME_PROJECTS = gql`
  ${PROJECT_FIELDS}
  mutation updateSectionNameProject($id: ID! $sectionName: String!) {
    updateSectionNameProject( id: $id sectionName: $sectionName) {
      id
      sectionName
      items {
      ...ProjectItemFields
      }
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
