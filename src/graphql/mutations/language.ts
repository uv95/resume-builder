import { gql } from '@apollo/client';
import { LANGUAGE_FIELDS } from '../fragments/content';

export const ADD_LANGUAGE = gql`
  ${LANGUAGE_FIELDS}
  mutation addLanguage(
    $language: String!
    $info: String
    $languageLevel: LanguageLevel
    $resumeId: ID!
  ) {
    addLanguage(
      language: $language
      info: $info
      languageLevel: $languageLevel
      resumeId: $resumeId
    ) {
      ...LanguageFields
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  ${LANGUAGE_FIELDS}
  mutation updateLanguage(
    $id: ID!
    $language: String
    $info: String
    $languageLevel: LanguageLevelUpdate
  ) {
    updateLanguage(
      id: $id
      language: $language
      info: $info
      languageLevel: $languageLevel
    ) {
      ...LanguageFields
    }
  }
`;

export const DELETE_LANGUAGE = gql`
  mutation deleteLanguage($id: ID!) {
    deleteLanguage(id: $id) {
      id
    }
  }
`;
