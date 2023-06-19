import { Dispatch } from 'react';

export interface IResume {
  id: string;
  name: string;
  content: IContent;
  settings: ISettings;
  __typename?: string;
}

interface IContent {
  id: string;
  education: IEducation[];
  language: ILanguage[];
  personalDetails: null | IPersonalDetails;
  professionalExperience: IProfessionalExperience[];
  profile: IProfile[];
  project: IProject[];
  skills: ISkills[];
}

export interface IBasicMulticolor {
  accent: string;
  font: string;
  background: string;
}

export interface IAdvancedMulticolor {
  primary: IBasicMulticolor;
  secondary: IBasicMulticolor;
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

export type SpacingSectionsType =
  | 'fontSize'
  | 'lineHeight'
  | 'leftRightMargin'
  | 'topBottomMargin'
  | 'spaceBetweenSections';

export interface ISpacing {
  fontSize: number;
  lineHeight: number;
  leftRightMargin: number;
  topBottomMargin: number;
  spaceBetweenSections: number;
}

export interface IFont {
  type: 'serif' | 'sans';
  font: string;
}

export interface IHeading {
  style: 'box' | 'line' | 'topBottomLine' | 'simple';
  uppercase: boolean;
  size: 's' | 'm' | 'l';
}

export interface ISubtitle {
  style: 'normal' | 'bold' | 'italic';
  position: 'sameLine' | 'nextLine';
}

export interface IHeader {
  position: 'left' | 'center';
  additionalInfoStyle: 'icon' | 'bar';
  additionalInfoOrder: string[];
}

export interface IName {
  size: 's' | 'm' | 'l';
  style: 'normal' | 'bold';
}

export interface IJobTitle {
  size: 's' | 'm' | 'l';
  style: 'normal' | 'bold' | 'italic';
}

export interface IDate {
  month: 'digits' | 'short' | 'long';
  delimiter: '/ Slash' | '- Hyphen' | '. Dot';
}

export interface ISkillsLanguageSettings {
  format: 'grid' | 'level' | 'text' | 'bubble';
  gridCols: 'one' | 'two' | 'three' | 'four';
  textFormat: 'bullet' | 'pipe' | 'wrap';
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

export interface ISettings {
  id: string;
  sectionsOrder: {
    top: string[];
    left: string[];
    right: string[];
  };
  layout: {
    columns: number;
    position: 'top' | 'left' | 'right';
    columnWidth: {
      left: number;
      right: number;
    };
  };
  colors: {
    mode: 'basic' | 'advanced';
    basic: {
      selected: 'accent' | 'multicolor';
      accent: string;
      multicolor: IBasicMulticolor;
    };
    advanced: {
      selected: 'accent' | 'multicolor';
      accent: string;
      multicolor: IAdvancedMulticolor;
    };
    applyAccentColor: IApplyAccentColor;
  };
  spacing: ISpacing;
  font: IFont;
  heading: IHeading;
  subtitle: ISubtitle;
  header: IHeader;
  name: IName;
  jobTitle: IJobTitle;
  date: IDate;
  skills: ISkillsLanguageSettings;
  language: ISkillsLanguageSettings;
  profile: IProfileSettings;
  education: IEducationSettings;
  professionalExperience: IProfessionalExperienceSettings;
  __typename?: string;
}

export interface IEducation {
  id: string;
  degree: string;
  school: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  index: number;
  __typename?: string;
}

export interface IPersonalDetails {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  additionalInfo: IAdditionalInfo[];
  __typename?: string;
}

export interface IProfessionalExperience {
  id: string;
  jobTitle: string;
  employer: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  index: number;
  __typename?: string;
}

export interface IProfile {
  id: string;
  text: string;
  index: number;
  __typename?: string;
}

export interface IProject {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  index: number;
  __typename?: string;
}

export interface ILanguage {
  id: string;
  language: string;
  info: string;
  languageLevel: LanguageLevel | string;
  index: number;
  __typename?: string;
}
export enum LanguageLevel {
  beginner = 'Beginner (A1)',
  elementary = 'Elementary (A2)',
  limited = 'Limited working proficiency (B1)',
  highlyProficient = 'Highly proficient (B2-C1)',
  fullProficiency = 'Native / full working proficiency (C2)',
  default = '',
}

export interface ISkills {
  id: string;
  skill: string;
  info: string;
  skillLevel: SkillLevel | string;
  index: number;
  __typename?: string;
}

export enum SkillLevel {
  novice = 'Novice',
  beginner = 'Beginner',
  skillful = 'Skillful',
  experienced = 'Experienced',
  expert = 'Expert',
  default = '',
}

export interface IAdditionalInfo {
  name: string;
  input: string;
}

export interface IResumePageState {
  sectionsOrder: string[];
}

export enum ResumePageActionsKind {
  ADD_SECTION = 'ADD_SECTION',
  REMOVE_SECTION = 'REMOVE_SECTION',
}

export interface IResumePageActions {
  type: ResumePageActionsKind;
  payload: string;
}
export interface IResumePageContext {
  state: IResumePageState;
  dispatch: Dispatch<IResumePageActions>;
}

export interface IResumeArraySections {
  language: ILanguage[];
  skills: ISkills[];
  professionalExperience: IProfessionalExperience[];
  project: IProject[];
  education: IEducation[];
  profile: IProfile[];
}
