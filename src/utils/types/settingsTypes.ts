export interface IBasicMulticolor {
  accent: string;
  font: string;
  background: string;
}

export interface IAdvancedMulticolor {
  primary: IBasicMulticolor;
  secondary: IBasicMulticolor;
}

export enum AccentColorSections {
  NAME = 'name',
  DOTS = 'dots',
  HEADINGS = 'headings',
  DATES = 'dates',
  HEADINGS_LINE = 'headingsLine',
  LINK_ICONS = 'linkIcons',
  HEADER_ICONS = 'headerIcons',
}

export interface IApplyAccentColor {
  name: boolean;
  dots: boolean;
  headings: boolean;
  dates: boolean;
  headingsLine: boolean;
  linkIcons: boolean;
  headerIcons: boolean;
}

export enum ColorOf {
  BG = 'background',
  FONT = 'font',
}

export enum SpacingSections {
  FONT_SIZE = 'fontSize',
  LINE_HEIGHT = 'lineHeight',
  LEFT_RIGHT_MARGIN = 'leftRightMargin',
  TOP_BOTTOM_MARGIN = 'topBottomMargin',
  SPACE_BETWEEN_SECTIONS = 'spaceBetweenSections',
}

export interface ISpacing {
  fontSize: number;
  lineHeight: number;
  leftRightMargin: number;
  topBottomMargin: number;
  spaceBetweenSections: number;
}

export enum FontType {
  SERIF = 'serif',
  SANS = 'sans',
}

export interface IFont {
  type: FontType;
  font: string;
}

export enum HeadingStyle {
  BOX = 'box',
  LINE = 'line',
  TOP_BOTTOM_LINE = 'topBottomLine',
  SIMPLE = 'simple',
}

export enum Size {
  S = 's',
  M = 'm',
  L = 'l',
}

export interface IHeading {
  style: HeadingStyle;
  uppercase: boolean;
  size: Size;
}

export enum FontStyle {
  NORMAL = 'normal',
  BOLD = 'bold',
  ITALIC = 'italic',
}
export enum SubtitlePosition {
  SAME_LINE = 'sameLine',
  NEXT_LINE = 'nextLine',
}

export interface ISubtitle {
  style: FontStyle;
  position: SubtitlePosition;
}

export enum HeaderPosition {
  LEFT = 'left',
  CENTER = 'center',
}
export enum HeaderAdditionalInfoStyle {
  ICON = 'icon',
  BAR = 'bar',
}

export interface IHeader {
  position: HeaderPosition;
  additionalInfoStyle: HeaderAdditionalInfoStyle;
  additionalInfoOrder: string[];
}

export interface IName {
  size: Size;
  style: FontStyle.NORMAL | FontStyle.BOLD;
}

export interface IJobTitle {
  size: Size;
  style: FontStyle;
}

export enum Month {
  DIGITS = 'digits',
  SHORT = 'short',
  LONG = 'long',
}
export enum Delimiter {
  SLASH = '/ Slash',
  HYPHEN = '- Hyphen',
  DOT = '. Dot',
}

export interface IDate {
  month: Month;
  delimiter: Delimiter;
}

export enum Format {
  GRID = 'grid',
  LEVEL = 'level',
  TEXT = 'text',
  BUBBLE = 'bubble',
}
export enum GridCols {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
}
export enum TextFormat {
  BULLET = 'bullet',
  PIPE = 'pipe',
  WRAP = 'wrap',
}

export interface ISkillsLanguageSettings {
  format: Format;
  gridCols: GridCols;
  textFormat: TextFormat;
  infoItalic: boolean;
}

export interface IProfileSettings {
  showHeading: boolean;
}

export interface IEducationSettings {
  degreeFirst: boolean;
}

export interface IProfessionalExperienceSettings {
  jobTitleFirst: boolean;
}

export enum Position {
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum Mode {
  BASIC = 'basic',
  ADVANCED = 'advanced',
}

export enum ColorOption {
  ACCENT = 'accent',
  MULTICOLOR = 'multicolor',
}
