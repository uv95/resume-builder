import { HEADING_FIELDS } from '@/graphql/fragments/settings';
import { gql } from '@apollo/client';

export const UPDATE_HEADING = gql`
  ${HEADING_FIELDS}
  mutation updateHeading(
    $id: ID!
    $style: HeadingStyleType
    $isUppercase: Boolean
    $size: HeadingSizeType
  ) {
    updateHeading(
      id: $id
      style: $style
      isUppercase: $isUppercase
      size: $size
    ) {
      ...HeadingFields
    }
  }
`;