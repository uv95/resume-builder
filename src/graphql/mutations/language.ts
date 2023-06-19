import { gql } from '@apollo/client';
import { LANGUAGE_FIELDS } from '../fragments/content';

export const ADD_LANGUAGE = gql`
  ${LANGUAGE_FIELDS}
  mutation addLanguage(
    $language: String!
    $info: String
    $languageLevel: LanguageLevel
    $index: Int
    $resumeId: ID!
  ) {
    addLanguage(
      language: $language
      info: $info
      languageLevel: $languageLevel
      index: $index
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
    $language: String!
    $info: String
    $languageLevel: LanguageLevelUpdate
    $index: Int
  ) {
    updateLanguage(
      id: $id
      language: $language
      info: $info
      languageLevel: $languageLevel
      index: $index
    ) {
      ...LanguageFields
    }
  }
`;

export const UPDATE_ALL_LANGUAGES = gql`
  ${LANGUAGE_FIELDS}
  mutation updateAllLanguages($items: [LanguageTypeAll]) {
    updateAllLanguages(items: $items) {
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
