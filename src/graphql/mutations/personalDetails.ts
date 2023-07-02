import { gql } from '@apollo/client';
import { PERSONAL_DETAILS_FIELDS } from '../fragments/content';

export const ADD_PERSONAL_DETAILS = gql`
  ${PERSONAL_DETAILS_FIELDS}
  mutation addPersonalDetails(
    $fullName: String!
    $jobTitle: String!
    $email: String
    $phone: String
    $address: String
    $additionalInfo: [AdditionalInfoInput]
    $resumeId: ID!
  ) {
    addPersonalDetails(
      fullName: $fullName
      jobTitle: $jobTitle
      email: $email
      phone: $phone
      address: $address
      additionalInfo: $additionalInfo
      resumeId: $resumeId
    ) {
      ...PersonalDetailsFields
    }
  }
`;

export const UPDATE_PERSONAL_DETAILS = gql`
  ${PERSONAL_DETAILS_FIELDS}
  mutation updatePersonalDetails(
    $id: ID!
    $fullName: String!
    $jobTitle: String!
    $email: String
    $phone: String
    $address: String
    $additionalInfo: [AdditionalInfoUpdate]
  ) {
    updatePersonalDetails(
      id: $id
      fullName: $fullName
      jobTitle: $jobTitle
      email: $email
      phone: $phone
      address: $address
      additionalInfo: $additionalInfo
    ) {
      ...PersonalDetailsFields
    }
  }
`;

export const DELETE_PERSONAL_DETAILS = gql`
  mutation deletePersonalDetails($id: ID!) {
    deletePersonalDetails(id: $id) {
      id
    }
  }
`;
