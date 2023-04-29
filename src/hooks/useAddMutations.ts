import { ADD_ADDITIONAL_INFO } from '@/graphql/mutations/additionalInfoMutations';
import { ADD_EDUCATION } from '@/graphql/mutations/educationMutations';
import { ADD_LANGUAGE } from '@/graphql/mutations/languageMutations';
import { ADD_LINK } from '@/graphql/mutations/linksMutations';
import { ADD_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetailsMutations';
import { ADD_PROFESSIONAL_EXPERIENCE } from '@/graphql/mutations/professionalExperienceMutations';
import { ADD_PROFILE } from '@/graphql/mutations/profileMutations';
import { ADD_PROJECT } from '@/graphql/mutations/projectMutations';
import { ADD_SKILL } from '@/graphql/mutations/skillsMutations';
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

function useAddMutations(name: string, resumeId: string) {
  const [addPersonalDetails] = useMutation(ADD_PERSONAL_DETAILS);
  const [addAdditionalInfo] = useMutation(ADD_ADDITIONAL_INFO);
  const [addEducation] = useMutation(ADD_EDUCATION);
  const [addLanguage] = useMutation(ADD_LANGUAGE);
  const [addLink] = useMutation(ADD_LINK);
  const [addProfessionalExperience] = useMutation(ADD_PROFESSIONAL_EXPERIENCE);
  const [addProfile] = useMutation(ADD_PROFILE);
  const [addProject] = useMutation(ADD_PROJECT);
  const [addSkill] = useMutation(ADD_SKILL);
  const addFunctions = [
    {
      sectionName: 'personalDetails',
      fn: addPersonalDetails,
      fnName: 'addPersonalDetails',
    },
    {
      sectionName: 'additionalInfo',
      fn: addAdditionalInfo,
      fnName: 'addAdditionalInfo',
    },
    {
      sectionName: 'education',
      fn: addEducation,
      fnName: 'addEducation',
    },
    { sectionName: 'language', fn: addLanguage, fnName: 'addLanguage' },
    { sectionName: 'link', fn: addLink, fnName: 'addLink' },
    {
      sectionName: 'professionalExperience',
      fn: addProfessionalExperience,
      fnName: 'addProfessionalExperience',
    },
    { sectionName: 'profile', fn: addProfile, fnName: 'addProfile' },
    { sectionName: 'project', fn: addProject, fnName: 'addProject' },
    { sectionName: 'skills', fn: addSkill, fnName: 'addSkill' },
  ];
  const addContent = (
    variables:
      | Partial<IEducation>
      | Partial<ISkills>
      | Partial<IProfile>
      | Partial<IProject>
      | Partial<ILanguage>
      | Partial<IProfessionalExperience>
  ) => {
    const { fn, fnName, sectionName } = addFunctions.find(
      (item) => name === item.sectionName
    )!;

    if (fn)
      return fn({
        variables: { resumeId, ...variables },
        update(cache, { data }) {
          const newData = data[fnName];
          const { resume } = cache.readQuery({
            query: GET_RESUME,
            variables: { id: resumeId },
          })!;

          cache.writeQuery({
            query: GET_RESUME,
            data: {
              resume: {
                ...resume,
                [sectionName]: [...resume[sectionName], newData],
              },
            },
          });
        },
      });
    return null;
  };
  return addContent;
}

export default useAddMutations;
