import { ADD_EDUCATION } from '@/graphql/mutations/educationMutations';
import { ADD_LANGUAGE } from '@/graphql/mutations/languageMutations';
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
import { UPDATE_SETTINGS } from '@/graphql/mutations/settingsMutations';

function useAddMutations(name: string, resumeId: string) {
  const [updateSettings] = useMutation(UPDATE_SETTINGS);
  const [addPersonalDetails] = useMutation(ADD_PERSONAL_DETAILS);
  const [addEducation] = useMutation(ADD_EDUCATION);
  const [addLanguage] = useMutation(ADD_LANGUAGE);
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
      sectionName: 'education',
      fn: addEducation,
      fnName: 'addEducation',
    },
    { sectionName: 'language', fn: addLanguage, fnName: 'addLanguage' },
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

          if (sectionName === 'personalDetails') {
            cache.writeQuery({
              query: GET_RESUME,
              data: {
                resume: {
                  ...resume,
                  content: { ...resume.content, [sectionName]: newData },
                },
              },
            });
          } else {
            // ---update sections order---
            const newSectionsOrder = resume.settings.sectionsOrder.includes(
              sectionName
            )
              ? resume.settings.sectionsOrder
              : [...resume.settings.sectionsOrder, sectionName];

            updateSettings({
              variables: {
                id: resume.settings.id,
                sectionsOrder: newSectionsOrder,
              },
            });
            // ---update sections order---

            cache.writeQuery({
              query: GET_RESUME,
              data: {
                resume: {
                  ...resume,
                  content: {
                    ...resume.content,
                    [sectionName]: [...resume.content[sectionName], newData],
                  },
                },
              },
            });
          }
        },
      });
    return null;
  };
  return addContent;
}

export default useAddMutations;
