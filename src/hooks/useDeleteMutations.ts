import { DELETE_EDUCATION } from '@/graphql/mutations/education';
import { DELETE_LANGUAGE } from '@/graphql/mutations/language';
import { DELETE_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetails';
import { DELETE_PROFESSIONAL_EXPERIENCE } from '@/graphql/mutations/professionalExperience';
import { DELETE_PROFILE } from '@/graphql/mutations/profile';
import { DELETE_PROJECT } from '@/graphql/mutations/project';
import { DELETE_SKILL } from '@/graphql/mutations/skills';
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
import useUpdateSettings from './useUpdateSettings';

function useDeleteMutations(name: string, resumeId: string) {
  const [deletePersonalDetails] = useMutation(DELETE_PERSONAL_DETAILS);
  const [deleteEducation] = useMutation(DELETE_EDUCATION);
  const [deleteLanguage] = useMutation(DELETE_LANGUAGE);
  const [deleteProfessionalExperience] = useMutation(
    DELETE_PROFESSIONAL_EXPERIENCE
  );
  const [deleteProfile] = useMutation(DELETE_PROFILE);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [deleteSkill] = useMutation(DELETE_SKILL);

  const { removeFromSectionsOrder } = useUpdateSettings();

  const deleteFunctions = [
    {
      sectionName: 'personalDetails',
      fn: deletePersonalDetails,
      fnName: 'deletePersonalDetails',
    },
    {
      sectionName: 'education',
      fn: deleteEducation,
      fnName: 'deleteEducation',
    },
    { sectionName: 'language', fn: deleteLanguage, fnName: 'deleteLanguage' },
    {
      sectionName: 'professionalExperience',
      fn: deleteProfessionalExperience,
      fnName: 'deleteProfessionalExperience',
    },
    { sectionName: 'profile', fn: deleteProfile, fnName: 'deleteProfile' },
    { sectionName: 'project', fn: deleteProject, fnName: 'deleteProject' },
    { sectionName: 'skills', fn: deleteSkill, fnName: 'deleteSkill' },
  ];
  const deleteContent = (itemId: string) => {
    const { fn, fnName, sectionName } = deleteFunctions.find(
      (item) => name === item.sectionName
    )!;

    if (fn)
      return fn({
        variables: { id: itemId },
        update(cache, { data }) {
          const deletedData = data[fnName];
          const { resume } = cache.readQuery({
            query: GET_RESUME,
            variables: { id: resumeId },
          })!;

          //  ---update sections order---
          removeFromSectionsOrder(sectionName);
          // ---update sections order---

          cache.writeQuery({
            query: GET_RESUME,
            data: {
              resume: {
                ...resume,
                content: {
                  ...resume.content,
                  [sectionName]: resume.content[sectionName].filter(
                    (
                      item:
                        | Partial<IEducation>
                        | Partial<ISkills>
                        | Partial<IProfile>
                        | Partial<IProject>
                        | Partial<ILanguage>
                        | Partial<IProfessionalExperience>
                    ) => item.id !== deletedData.id
                  ),
                },
              },
            },
          });
        },
      });
    return null;
  };
  return deleteContent;
}

export default useDeleteMutations;
