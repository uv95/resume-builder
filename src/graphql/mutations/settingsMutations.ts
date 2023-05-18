import { gql } from '@apollo/client';

export const UPDATE_SETTINGS = gql`
  mutation updateSettings(
    $id: ID!
    $sectionsOrder: SectionsOrderInput
    $layout: LayoutInput
    $colors: ColorsInput
  ) {
    updateSettings(
      id: $id
      sectionsOrder: $sectionsOrder
      layout: $layout
      colors: $colors
    ) {
      id
      sectionsOrder {
        top
        left
        right
      }
      layout {
        columns
        position
        columnWidth {
          left
          right
        }
      }
      colors {
        mode
        basic {
          selected
          accent
          multicolor {
            accent
            font
            background
          }
        }
        advanced {
          selected
          accent
          multicolor {
            primary {
              accent
              font
              background
            }
            secondary {
              accent
              font
              background
            }
          }
        }
        applyAccentColor {
          name
          dots
          headings
          dates
          headingsLine
          linkIcons
          headerIcons
        }
      }
    }
  }
`;
