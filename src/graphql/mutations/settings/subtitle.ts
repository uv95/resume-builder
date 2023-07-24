import { SUBTITLE_FIELDS } from '@/graphql/fragments/settings';
import { gql } from '@apollo/client';

export const UPDATE_SUBTITLE = gql`
  ${SUBTITLE_FIELDS}
  mutation updateSubtitle(
    $id: ID!
    $style: SubtitleStyleType
    $position: SubtitlePositionType
  ) {
    updateSubtitle(
      id: $id
      style: $style
      position: $position
    ) {
      ...SubtitleFields
    }
  }
`;