import { gql } from '@apollo/client';
import { EDUCATION_FIELDS } from '../fragments/content';

export const ADD_EDUCATION = gql`
  ${EDUCATION_FIELDS}
  mutation addEducation(
    $degree: String!
    $school: String!
    $city: String
    $country: String
    $startDate: String
    $endDate: String
    $description: String
    $index: Int
    $resumeId: ID!
  ) {
    addEducation(
      degree: $degree
      school: $school
      city: $city
      country: $country
      startDate: $startDate
      endDate: $endDate
      description: $description
      index: $index
      resumeId: $resumeId
    ) {
      ...EducationItemFields
    }
  }
`;

export const UPDATE_EDUCATION = gql`
  ${EDUCATION_FIELDS}
  mutation updateEducation(
    $id: ID!
    $degree: String!
    $school: String!
    $city: String
    $country: String
    $startDate: String
    $endDate: String
    $description: String
    $index: Int
  ) {
    updateEducation(
      id: $id
      degree: $degree
      school: $school
      city: $city
      country: $country
      startDate: $startDate
      endDate: $endDate
      description: $description
      index: $index
    ) {
      ...EducationItemFields
    }
  }
`;

export const UPDATE_EDUCATION_ORDER = gql`
  ${EDUCATION_FIELDS}
  mutation updateEducationOrder($items: [EducationOrder]) {
    updateEducationOrder(items: $items) {
      ...EducationItemFields
    }
  }
`;

export const UPDATE_SECTION_NAME_EDUCATION = gql`
  ${EDUCATION_FIELDS}
  mutation updateSectionNameEducation($id: ID! $sectionName: String!) {
    updateSectionNameEducation( id: $id sectionName: $sectionName) {
      id
      sectionName
      items {
      ...EducationItemFields
      }
    }
  }
`;

export const DELETE_EDUCATION = gql`
  mutation deleteEducation($id: ID!) {
    deleteEducation(id: $id) {
      id
    }
  }
`;
