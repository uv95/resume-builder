import skills from '../icons/skills.svg';
import work from '../icons/work.svg';
import education from '../icons/education.svg';
import project from '../icons/project.svg';
import profile from '../icons/profile.svg';
import language from '../icons/world.svg';

export const getSectionIcon = (section: string) => {
  if (section === 'language') return language;
  if (section === 'skills') return skills;
  if (section === 'professionalExperience') return work;
  if (section === 'education') return education;
  if (section === 'project') return project;
  if (section === 'profile') return profile;
};
