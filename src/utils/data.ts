export const personalDetailInputData = {
  name: 'personalDetails',
  editTitle: 'Edit personal details',
  inputs: [
    {
      label: 'Full name',
      name: 'fullName',
      type: '',
      placeholder: 'Enter full name',
    },
    {
      label: 'Job title',
      name: 'jobTitle',
      type: '',
      placeholder: 'Enter job title',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter email',
    },
    {
      label: 'Phone',
      name: 'phone',
      type: '',
      placeholder: 'Enter phone',
    },
    {
      label: 'Address',
      name: 'address',
      type: '',
      placeholder: 'City, country',
    },
  ],
  additionalInfo: [
    {
      title: 'Personal information',
      tags: [
        'Date of Birth',
        'Nationality',
        'Passport or Id',
        'Marital Status',
        'Military Service',
        'Driving License',
        'Gender or Pronoun',
      ],
    },
    {
      title: 'Links',
      tags: [
        'Website',
        'LinkedIn',
        'Github',
        'Skype',
        'Telegram',
        'Facebook',
        'WhatsApp',
      ],
    },
  ],
};

export const inputData = {
  //SKILLS
  skills: {
    name: 'skills',
    title: 'Skills',
    editTitle: 'Add Skill',
    inputs: [
      {
        label: 'Skill',
        name: 'skill',
        type: '',
        placeholder: 'Enter skill',
      },
      {
        label: 'Information / Sub-skills',
        name: 'info',
        type: '',
        placeholder: 'Enter information or sub-skills',
      },
      {
        label: 'Select skill level',
        name: 'skillLevel',
        type: 'select',
        placeholder: 'Skill level',
        options: [
          { value: 'novice', text: 'Novice' },
          { value: 'beginner', text: 'Beginner' },
          { value: 'skillful', text: 'Skillful' },
          { value: 'experienced', text: 'Experienced' },
          { value: 'expert', text: 'Expert' },
        ],
      },
    ],
  },

  //LANGUAGE
  language: {
    name: 'language',
    title: 'Language',
    editTitle: 'Add Language',
    inputs: [
      {
        label: 'Language',
        name: 'language',
        type: '',
        placeholder: 'Enter language',
      },
      {
        label: 'Additional Information',
        name: 'info',
        type: '',
        placeholder: 'e.g. C2, 4+, TOEFL, IELTS...',
      },
      {
        label: 'Select language level',
        name: 'languageLevel',
        type: 'select',
        placeholder: 'Language level',
        options: [
          { value: 'beginner', text: 'Beginner (A1)' },
          { value: 'elementary', text: 'Elementary (A2)' },
          { value: 'limited', text: 'Limited working proficiency (B1)' },
          { value: 'highlyProficient', text: 'Highly proficient (B2-C1)' },
          {
            value: 'fullProficiency',
            text: 'Native / full working proficiency (C2)',
          },
        ],
      },
    ],
  },

  //PROFESSIONAL EXPERIENCE
  professionalExperience: {
    name: 'professionalExperience',
    title: 'Professional Experience',
    editTitle: 'Add Professional Experience',
    inputs: [
      {
        label: 'Job Title',
        name: 'jobTitle',
        type: '',
        placeholder: 'Enter job title',
      },
      {
        label: 'Employer',
        name: 'employer',
        type: '',
        placeholder: 'Enter employer',
        link: true,
      },
      {
        label: 'City',
        name: 'city',
        type: '',
        placeholder: 'Enter city',
      },
      {
        label: 'Country',
        name: 'country',
        type: '',
        placeholder: 'Enter country',
      },
      {
        label: 'Start Date',
        name: 'startDate',
        type: 'month',
        placeholder: '',
      },
      {
        label: 'End Date',
        name: 'endDate',
        type: 'month',
        placeholder: '',
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        placeholder: 'Describe your role and achievements',
      },
    ],
  },

  //PROJECT
  project: {
    name: 'project',
    title: 'Project',
    editTitle: 'Add Project',
    inputs: [
      {
        label: 'Title',
        name: 'title',
        type: '',
        placeholder: 'Enter project title',
      },
      {
        label: 'Start Date',
        name: 'startDate',
        type: 'month',
        placeholder: '',
      },
      {
        label: 'End Date',
        name: 'endDate',
        type: 'month',
        placeholder: '',
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        placeholder: 'Describe your role and achievements',
      },
    ],
  },

  //EDUCATION
  education: {
    name: 'education',
    title: 'Education',
    editTitle: 'Add Education',
    inputs: [
      {
        label: 'Degree',
        name: 'degree',
        type: '',
        placeholder: 'Enter degree',
      },
      {
        label: 'School',
        name: 'school',
        type: '',
        placeholder: 'Enter school',
      },
      {
        label: 'City',
        name: 'city',
        type: '',
        placeholder: 'Enter city',
      },
      {
        label: 'Country',
        name: 'country',
        type: '',
        placeholder: 'Enter country',
      },
      {
        label: 'Start Date',
        name: 'startDate',
        type: 'month',
        placeholder: '',
      },
      {
        label: 'End Date',
        name: 'endDate',
        type: 'month',
        placeholder: '',
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        placeholder: 'Describe your role and achievements',
      },
    ],
  },

  //PROFILE
  profile: {
    name: 'profile',
    title: 'Profile',
    editTitle: 'Add Profile',
    inputs: [
      {
        label: 'Text',
        name: 'text',
        type: 'textarea',
        placeholder:
          'Introduce yourself by pitching your skills and explaining how they can be of value to a company',
      },
    ],
  },
};

export const contentCards = [
  {
    title: 'Profile',
    name: 'profile',
    description:
      'Make a great first impression by presenting yourself in a few sentences.',
  },
  {
    title: 'Skill',
    name: 'skills',
    description:
      'List your technical, managerial or soft skills in this section.',
  },
  {
    title: 'Education',
    name: 'education',
    description:
      'Show off your primary education, college degrees & exchange semesters.',
  },
  {
    title: 'Language',
    name: 'language',
    description:
      'You speak more than one language? Make sure to list them here.',
  },
  {
    title: 'Project',
    name: 'project',

    description:
      'Worked on a particular challenging project in the past? Mention it here.',
  },
  {
    title: 'Professional Experience',
    name: 'professionalExperience',
    description:
      'A place to highlight your professional experience - including internships.',
  },
];
