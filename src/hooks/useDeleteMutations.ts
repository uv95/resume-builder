import { DELETE_ADDITIONAL_INFO } from '@/graphql/mutations/additionalInfoMutations';
import { DELETE_EDUCATION } from '@/graphql/mutations/educationMutations';
import { DELETE_LANGUAGE } from '@/graphql/mutations/languageMutations';
import { DELETE_LINK } from '@/graphql/mutations/linksMutations';
import { DELETE_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetailsMutations';
import { DELETE_PROFESSIONAL_EXPERIENCE } from '@/graphql/mutations/professionalExperienceMutations';
import { DELETE_PROFILE } from '@/graphql/mutations/profileMutations';
import { DELETE_PROJECT } from '@/graphql/mutations/projectMutations';
import { DELETE_SKILL } from '@/graphql/mutations/skillsMutations';
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

function useDeleteMutations(name: string, resumeId: string) {
  const [deletePersonalDetails] = useMutation(DELETE_PERSONAL_DETAILS);
  const [deleteAdditionalInfo] = useMutation(DELETE_ADDITIONAL_INFO);
  const [deleteEducation] = useMutation(DELETE_EDUCATION);
  const [deleteLanguage] = useMutation(DELETE_LANGUAGE);
  const [deleteLink] = useMutation(DELETE_LINK);
  const [deleteProfessionalExperience] = useMutation(
    DELETE_PROFESSIONAL_EXPERIENCE
  );
  const [deleteProfile] = useMutation(DELETE_PROFILE);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [deleteSkill] = useMutation(DELETE_SKILL);
  const deleteFunctions = [
    {
      sectionName: 'personalDetails',
      fn: deletePersonalDetails,
      fnName: 'deletePersonalDetails',
    },
    {
      sectionName: 'deleteitionalInfo',
      fn: deleteAdditionalInfo,
      fnName: 'deleteAdditionalInfo',
    },
    {
      sectionName: 'education',
      fn: deleteEducation,
      fnName: 'deleteEducation',
    },
    { sectionName: 'language', fn: deleteLanguage, fnName: 'deleteLanguage' },
    { sectionName: 'link', fn: deleteLink, fnName: 'deleteLink' },
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
