import { UPDATE_ADDITIONAL_INFO } from '@/graphql/mutations/additionalInfoMutations';
import { UPDATE_EDUCATION } from '@/graphql/mutations/educationMutations';
import { UPDATE_LANGUAGE } from '@/graphql/mutations/languageMutations';
import { UPDATE_LINK } from '@/graphql/mutations/linksMutations';
import { UPDATE_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetailsMutations';
import { UPDATE_PROFESSIONAL_EXPERIENCE } from '@/graphql/mutations/professionalExperienceMutations';
import { UPDATE_PROFILE } from '@/graphql/mutations/profileMutations';
import { UPDATE_PROJECT } from '@/graphql/mutations/projectMutations';
import { UPDATE_SKILL } from '@/graphql/mutations/skillsMutations';
import { useMutation } from '@apollo/client';
import {
  IEducation,
  ILanguage,
  IProfessionalExperience,
  IProfile,
  IProject,
  ISkills,
} from '@/utils/types';
import { GET_RESUME } from '@/graphql/queries/resumeQuery';

function useUpdateMutations(name: string, resumeId: string) {
  const [updatePersonalDetails] = useMutation(UPDATE_PERSONAL_DETAILS);
  const [updateAdditionalInfo] = useMutation(UPDATE_ADDITIONAL_INFO);
  const [updateEducation] = useMutation(UPDATE_EDUCATION);
  const [updateLanguage] = useMutation(UPDATE_LANGUAGE);
  const [updateLink] = useMutation(UPDATE_LINK);
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
      sectionName: 'additionalInfo',
      fn: updateAdditionalInfo,
    },
    {
      sectionName: 'education',
      fn: updateEducation,
    },
    { sectionName: 'language', fn: updateLanguage },
    { sectionName: 'link', fn: updateLink },
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
      | Partial<IEducation>
      | Partial<ISkills>
      | Partial<IProfile>
      | Partial<IProject>
      | Partial<ILanguage>
      | Partial<IProfessionalExperience>
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
