import {
  UPDATE_ALL_EDUCATIONS,
  UPDATE_EDUCATION,
} from '@/graphql/mutations/education';
import {
  UPDATE_ALL_LANGUAGES,
  UPDATE_LANGUAGE,
} from '@/graphql/mutations/language';
import { UPDATE_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetails';
import {
  UPDATE_ALL_PROFESSIONAL_EXPERIENCE,
  UPDATE_PROFESSIONAL_EXPERIENCE,
} from '@/graphql/mutations/professionalExperience';
import {
  UPDATE_ALL_PROFILES,
  UPDATE_PROFILE,
} from '@/graphql/mutations/profile';
import {
  UPDATE_ALL_PROJECTS,
  UPDATE_PROJECT,
} from '@/graphql/mutations/project';
import { UPDATE_ALL_SKILLS, UPDATE_SKILL } from '@/graphql/mutations/skills';
import { useMutation } from '@apollo/client';
import {
  ArraySectionsType,
  IterableSectionsArraysType,
  Sections,
} from '@/utils/types/resumeTypes';
import { GET_RESUME } from '@/graphql/queries/resume';

function useUpdateMutations({
  section,
  updateAll,
  resumeId,
}: {
  section: Sections;
  updateAll?: boolean;
  resumeId: string;
}) {
  const [updatePersonalDetails] = useMutation(UPDATE_PERSONAL_DETAILS);

  const [updateEducation] = useMutation(UPDATE_EDUCATION);
  const [updateAllEducations] = useMutation(UPDATE_ALL_EDUCATIONS);

  const [updateLanguage] = useMutation(UPDATE_LANGUAGE);
  const [updateAllLanguages] = useMutation(UPDATE_ALL_LANGUAGES);

  const [updateProfessionalExperience] = useMutation(
    UPDATE_PROFESSIONAL_EXPERIENCE
  );
  const [updateAllProfessionalExperience] = useMutation(
    UPDATE_ALL_PROFESSIONAL_EXPERIENCE
  );
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateAllProfiles] = useMutation(UPDATE_ALL_PROFILES);

  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [updateAllProjects] = useMutation(UPDATE_ALL_PROJECTS);

  const [updateSkill] = useMutation(UPDATE_SKILL);
  const [updateAllSkills] = useMutation(UPDATE_ALL_SKILLS);

  const updateFunctions = [
    {
      sectionName: Sections.PERSONAL_DETAILS,
      fn: updatePersonalDetails,
      fnName: 'updatePersonalDetails',
    },
    {
      sectionName: Sections.EDUCATION,
      fn: updateAll ? updateAllEducations : updateEducation,
      fnName: updateAll ? 'updateAllEducations' : 'updateEducation',
    },
    {
      sectionName: Sections.LANGUAGE,
      fn: updateAll ? updateAllLanguages : updateLanguage,
      fnName: updateAll ? 'updateAllLanguages' : 'updateLanguage',
    },
    {
      sectionName: Sections.PROFESSIONAL_EXPERIENCE,
      fn: updateAll
        ? updateAllProfessionalExperience
        : updateProfessionalExperience,
      fnName: updateAll
        ? 'updateAllProfessionalExperience'
        : 'updateProfessionalExperience',
    },
    {
      sectionName: Sections.PROFILE,
      fn: updateAll ? updateAllProfiles : updateProfile,
      fnName: updateAll ? 'updateAllProfiles' : 'updateProfile',
    },
    {
      sectionName: Sections.PROJECT,
      fn: updateAll ? updateAllProjects : updateProject,
      fnName: updateAll ? 'updateAllProjects' : 'updateProject',
    },
    {
      sectionName: Sections.SKILLS,
      fn: updateAll ? updateAllSkills : updateSkill,
      fnName: updateAll ? 'updateAllSkills' : 'updateSkill',
    },
  ];
  const updateContent = (
    variables:
      | ArraySectionsType
      | {
          items: IterableSectionsArraysType;
        }
  ) => {
    const { fn, fnName } = updateFunctions.find(
      (item) => section === item.sectionName
    )!;

    if (fn)
      return fn({
        variables,
        update(cache, { data }) {
          const newData = data[fnName];
          const { resume } = cache.readQuery({
            query: GET_RESUME,
            variables: { id: resumeId },
          })!;

          if (!updateAll) {
            const itemId = (variables as ArraySectionsType).id;

            cache.writeQuery({
              query: GET_RESUME,
              data: {
                resume: {
                  ...resume,
                  content: {
                    ...resume.content,
                    [section]:
                      section === Sections.PERSONAL_DETAILS
                        ? newData
                        : [
                            ...resume.content[section].map((item: any) =>
                              item.id === itemId ? newData : item
                            ),
                          ],
                  },
                },
              },
            });
          }
          if (updateAll) {
            cache.writeQuery({
              query: GET_RESUME,
              data: {
                resume: {
                  ...resume,
                  content: {
                    ...resume.content,
                    [section]: newData,
                  },
                },
              },
            });
          }
        },
      });
    return null;
  };
  return updateContent;
}

export default useUpdateMutations;
