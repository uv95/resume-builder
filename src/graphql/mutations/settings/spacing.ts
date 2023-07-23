import { SPACING_FIELDS } from '@/graphql/fragments/settings';
import { gql } from '@apollo/client';

export const UPDATE_SPACING = gql`
  ${SPACING_FIELDS}
  mutation updateSpacing(
    $id: ID!
    $fontSize: Float
    $lineHeight: Float
    $leftRightMargin: Int
    $topBottomMargin: Int
    $spaceBetweenSections: Int
  ) {
    updateSpacing(
      id: $id
      fontSize: $fontSize
      lineHeight: $lineHeight
      leftRightMargin: $leftRightMargin
      topBottomMargin: $topBottomMargin
      spaceBetweenSections: $spaceBetweenSections
    ) {
      ...SpacingFields
    }
  }
`;