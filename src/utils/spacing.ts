import { SpacingSections } from './types/settingsTypes';

export const spacingData = [
    {
        title: 'Font Size',
        name: SpacingSections.FONT_SIZE,
        values: [13, 14, 14.5, 15, 16, 17, 18, 18.5, 19],
    },
    {
        title: 'Line Height',
        name: SpacingSections.LINE_HEIGHT,
        values: [1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5],
    },
    {
        title: 'Left & Right Margin',
        name: SpacingSections.LEFT_RIGHT_MARGIN,
        values: [8, 10, 12, 14, 16, 18, 20, 22, 24],
    },
    {
        title: 'Top & Bottom Margin',
        name: SpacingSections.TOP_BOTTOM_MARGIN,
        values: [8, 10, 12, 14, 16, 18, 20, 22, 24],
    },
    {
        title: 'Space between Sections',
        name: SpacingSections.SPACE_BETWEEN_SECTIONS,
        values: [10, 13, 16, 19, 22, 25, 28, 31, 34],
    },
];
