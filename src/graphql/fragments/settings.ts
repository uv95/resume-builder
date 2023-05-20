import { gql } from '@apollo/client';

const SECTIONS_ORDER_FIELDS = gql`
  fragment SectionsOrderFields on SectionsOrder {
    top
    left
    right
  }
`;
const LAYOUT_FIELDS = gql`
  fragment LayoutFields on Layout {
    columns
    position
    columnWidth {
      left
      right
    }
  }
`;
const COLORS_FIELDS = gql`
  fragment ColorsFields on Colors {
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
`;
const SPACING_FIELDS = gql`
  fragment SpacingFields on Spacing {
    fontSize
    lineHeight
    leftRightMargin
    topBottomMargin
    spaceBetweenSections
  }
`;

export const SETTINGS_FIELDS = gql`
  ${SECTIONS_ORDER_FIELDS}
  ${LAYOUT_FIELDS}
  ${COLORS_FIELDS}
  ${SPACING_FIELDS}
  fragment SettingsFields on Settings {
    id
    sectionsOrder {
      ...SectionsOrderFields
    }
    layout {
      ...LayoutFields
    }
    colors {
      ...ColorsFields
    }
    spacing {
      ...SpacingFields
    }
  }
`;
