import {
  IEducation,
  ILanguage,
  IPersonalDetails,
  IProfessionalExperience,
  IProfile,
  IProject,
  ISkills,
} from './contentTypes';
import {
  Position,
  Mode,
  ColorOption,
  IBasicMulticolor,
  IAdvancedMulticolor,
  IApplyAccentColor,
  ISpacing,
  IFont,
  IHeading,
  ISubtitle,
  IHeader,
  IName,
  IJobTitle,
  IDate,
  ISkillsLanguageSettings,
  IProfileSettings,
  IEducationSettings,
  IProfessionalExperienceSettings,
} from './settingsTypes';

export interface IResume {
  id: string;
  name: string;
  content: IContent;
  settings: ISettings;
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

export enum Sections {
  EDUCATION = 'education',
  LANGUAGE = 'language',
  PERSONAL_DETAILS = 'personalDetails',
  PROFESSIONAL_EXPERIENCE = 'professionalExperience',
  PROFILE = 'profile',
  PROJECT = 'project',
  SKILLS = 'skills',
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
    position: Position;
    columnWidth: {
      left: number;
      right: number;
    };
  };
  colors: {
    mode: Mode;
    basic: {
      selected: ColorOption;
      accent: string;
      multicolor: IBasicMulticolor;
    };
    advanced: {
      selected: ColorOption;
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
}

export interface IResumeArraySections {
  language: ILanguage[];
  skills: ISkills[];
  professionalExperience: IProfessionalExperience[];
  project: IProject[];
  education: IEducation[];
  profile: IProfile[];
}

export type IterableSectionsArraysType =
  | ILanguage[]
  | ISkills[]
  | IProfessionalExperience[]
  | IProject[]
  | IEducation[]
  | IProfile[];

export type ArraySectionsType =
  | ILanguage
  | ISkills
  | IProfessionalExperience
  | IProject
  | IEducation
  | IProfile;
