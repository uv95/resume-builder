import { gql } from '@apollo/client';
import { CONTENT_FIELDS } from '../fragments/content';
import { SETTINGS_FIELDS } from '../fragments/settings';

export const GET_RESUME = gql`
  ${CONTENT_FIELDS}
  ${SETTINGS_FIELDS}
  query getResume($id: ID!) {
    resume(id: $id) {
      id
      name
      content {
        ...ContentFields
      }
      settings {
        ...SettingsFields
      }
    }
  }
`;

export const GET_RESUMES = gql`
  ${CONTENT_FIELDS}
  ${SETTINGS_FIELDS}
  query getResumes {
    resumes {
      id
      name
      content {
        ...ContentFields
      }
      settings {
        ...SettingsFields
      }
    }
  }
`;
