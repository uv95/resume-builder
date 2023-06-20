import React from 'react';
import Colors from './Colors/Colors';
import Date from './Date';
import Font from './Font/Font';
import Header from './Header/Header';
import Heading from './Heading/Heading';
import JobTitle from './JobTitle';
import Layout from './Layout/Layout';
import Name from './Name';
import Spacing from './Spacing/Spacing';
import Subtitle from './Subtitle';
import SkillsLanguageSettings from './SkillsLanguageSettings/SkillsLanguageSettings';
import ProfileSettings from './ProfileSettings';
import EducationSettings from './EducationSettings';
import ProfessionalExperienceSettings from './ProfessionalExperienceSettings';

const Customization = () => {
  return (
    <>
      <Layout />
      <Colors />
      <Spacing />
      <Font />
      <Heading />
      <Subtitle />
      <Header />
      <Name />
      <JobTitle />
      <Date />
      <SkillsLanguageSettings section="skills" />
      <SkillsLanguageSettings section="language" />
      <ProfileSettings />
      <EducationSettings />
      <ProfessionalExperienceSettings />
    </>
  );
};

export default Customization;
