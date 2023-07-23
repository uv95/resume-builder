import { COLORS_FIELDS } from '@/graphql/fragments/settings';
import { gql } from '@apollo/client';

export const UPDATE_COLORS = gql`
  ${COLORS_FIELDS}
  mutation updateColors(
    $id: ID!
    $mode: Mode
    $basic: BasicInput
    $advanced:AdvancedInput
    $applyAccentColor: ApplyAccentColorInput
  ) {
    updateColors(
      id: $id
      mode: $mode
      basic: $basic
      advanced: $advanced
      applyAccentColor: $applyAccentColor
    ) {
      ...ColorsFields
    }
  }
`;