export const dates = {
  month: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  year: [
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
    '2003',
    '2002',
    '2001',
    '2000',
    '1999',
    '1998',
    '1997',
    '1996',
    '1995',
    '1994',
    '1993',
    '1992',
    '1991',
    '1990',
    '1989',
    '1988',
    '1987',
    '1986',
    '1985',
    '1984',
    '1983',
    '1982',
    '1981',
    '1980',
    '1979',
    '1978',
    '1977',
    '1976',
    '1975',
    '1974',
    '1973',
    '1972',
    '1971',
    '1970',
  ],
};

export const data = [
  // PERSONAL DETAILS
  {
    name: 'personalDetails',
    title: '',
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
        inputs: [
          {
            label: 'Date of Birth',
            name: 'dateOfBirth',
            type: 'date',
            placeholder: 'Enter date of birth',
          },
          {
            label: 'Driving License',
            name: 'drivingLicense',
            type: '',
            placeholder: 'Enter driving license',
          },
          {
            label: 'Gender or Pronoun',
            name: 'gender',
            type: '',
            placeholder: 'Enter gender',
          },
        ],
      },
      {
        title: 'Links',
        inputs: [
          {
            label: 'Website',
            name: 'website',
            type: 'date',
            placeholder: 'Enter website',
            link: true,
          },
          {
            label: 'Github',
            name: 'github',
            type: '',
            placeholder: 'Enter github',
            link: true,
          },
          {
            label: 'Skype',
            name: 'skype',
            type: '',
            placeholder: 'Enter skype',
            link: true,
          },
          {
            label: 'Telegram',
            name: 'telegram',
            type: '',
            placeholder: 'Enter telegram',
            link: true,
          },
        ],
      },
    ],
  },

  //SKILLS
  {
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
        name: 'subskills',
        type: '',
        placeholder: 'Enter information or sub-skills',
      },
      {
        label: 'Select skill level',
        name: 'skillLevel',
        type: 'select',
        placeholder: 'Skill level',
        options: ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'],
      },
    ],
  },

  //ROFESSIONAL EXPERIENCE
  {
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
        type: 'date',
        placeholder: '',
      },
      {
        label: 'End Date',
        name: 'endDate',
        type: 'date',
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
];

export const contentCards = [
  {
    title: 'Profile',
    description:
      'Make a great first impression by presenting yourself in a few sentences.',
  },
  {
    title: 'Skill',
    description:
      'List your technical, managerial or soft skills in this section.',
  },
  {
    title: 'Education',
    description:
      'Show off your primary education, college degrees & exchange semesters.',
  },
  {
    title: 'Language',
    description:
      'You speak more than one language? Make sure to list them here.',
  },
  {
    title: 'Project',
    description:
      'Worked on a particular challenging project in the past? Mention it here.',
  },
  {
    title: 'Professional Experience',
    description:
      'A place to highlight your professional experience - including internships.',
  },
];
