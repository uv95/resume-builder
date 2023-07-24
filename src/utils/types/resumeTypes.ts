import {
    IEducationItem,
    ILanguageItem,
    IPersonalDetails,
    IProfessionalExperienceItem,
    IProfileItem,
    IProjectItem,
    ISkillsItem,
    IEducation,
    ILanguage,
    IProfessionalExperience,
    IProfile,
    IProject,
    ISkills
} from './contentTypes';
import {
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
    IColors,
    ILayout,
} from './settingsTypes';

export interface IResume {
  id: string;
  name: string;
  content: IContent;
  settings: ISettings;
}

export interface IContent {
  id: string;
  education: IEducation;
  language: ILanguage;
  personalDetails: IPersonalDetails;
  professionalExperience: IProfessionalExperience;
  profile: IProfile;
  project: IProject;
  skills: ISkills;
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
  layout: ILayout;
  colors:  IColors;
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
  language: ILanguageItem[];
  skills: ISkillsItem[];
  professionalExperience: IProfessionalExperienceItem[];
  project: IProjectItem[];
  education: IEducationItem[];
  profile: IProfileItem[];
}
