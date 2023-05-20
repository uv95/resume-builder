import { gql } from '@apollo/client';
import { SETTINGS_FIELDS } from '../fragments/settings';

export const UPDATE_SETTINGS = gql`
  ${SETTINGS_FIELDS}
  mutation updateSettings(
    $id: ID!
    $sectionsOrder: SectionsOrderInput
    $layout: LayoutInput
    $colors: ColorsInput
    $spacing: SpacingInput
  ) {
    updateSettings(
      id: $id
      sectionsOrder: $sectionsOrder
      layout: $layout
      colors: $colors
      spacing: $spacing
    ) {
      ...SettingsFields
    }
  }
`;
