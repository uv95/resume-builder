import { UPDATE_EDUCATION } from '@/graphql/mutations/education';
import { UPDATE_LANGUAGE } from '@/graphql/mutations/language';

import { UPDATE_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetails';
import { UPDATE_PROFESSIONAL_EXPERIENCE } from '@/graphql/mutations/professionalExperience';
import { UPDATE_PROFILE } from '@/graphql/mutations/profile';
import { UPDATE_PROJECT } from '@/graphql/mutations/project';
import { UPDATE_SKILL } from '@/graphql/mutations/skills';
import { useMutation } from '@apollo/client';
import {
  IEducation,
  ILanguage,
  IProfessionalExperience,
  IProfile,
  IProject,
  ISkills,
} from '@/utils/types';
import { GET_RESUME } from '@/graphql/queries/resume';

function useUpdateMutations(name: string, resumeId: string) {
  const [updatePersonalDetails] = useMutation(UPDATE_PERSONAL_DETAILS);
  const [updateEducation] = useMutation(UPDATE_EDUCATION);
  const [updateLanguage] = useMutation(UPDATE_LANGUAGE);
  const [updateProfessionalExperience] = useMutation(
    UPDATE_PROFESSIONAL_EXPERIENCE
  );
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [updateSkill] = useMutation(UPDATE_SKILL);
  const updateFunctions = [
    {
      sectionName: 'personalDetails',
      fn: updatePersonalDetails,
    },
    {
      sectionName: 'education',
      fn: updateEducation,
    },
    { sectionName: 'language', fn: updateLanguage },
    {
      sectionName: 'professionalExperience',
      fn: updateProfessionalExperience,
    },
    { sectionName: 'profile', fn: updateProfile },
    { sectionName: 'project', fn: updateProject },
    { sectionName: 'skills', fn: updateSkill },
  ];
  const updateContent = (
    variables:
      | IEducation
      | ISkills
      | IProfile
      | IProject
      | ILanguage
      | IProfessionalExperience
  ) => {
    const { fn } = updateFunctions.find((item) => name === item.sectionName)!;

    if (fn)
      return fn({
        variables,
        // update(cache, { data }) {
        //   const { resume } = cache.readQuery({
        //     query: GET_RESUME,
        //     variables: { id: resumeId },
        //   })!;

        //   cache.writeQuery({
        //     query: GET_RESUME,
        //     data: {
        //       resume,
        //     },
        //   });
        // },
      });
    return null;
  };
  return updateContent;
}

export default useUpdateMutations;
