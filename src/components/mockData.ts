export interface Preset {
  id: string;
  name: string;
  category: 'Recents' | 'Native' | 'Community';
  slashCommand: string;
  inputs: {
    name: string;
    question: string;
    type: string;
    options?: string[];
  }[];
}

export const presets: Preset[] = [
  {
    id: '1',
    name: 'Presenter Notes',
    category: 'Native',
    slashCommand: '/presenter',
    inputs: [
      {
        name: 'presentation',
        question: 'Could you please upload your presentation?',
        type: 'documentAttachment',
      },
    ],
  },
  {
    id: '2',
    name: 'Document Comparison',
    category: 'Native',
    slashCommand: '/compare',
    inputs: [
      {
        name: 'first_document',
        question: 'Please upload your first document',
        type: 'document',
      },
      {
        name: 'second_document',
        question: 'Please upload your second document',
        type: 'document',
      },
    ],
  },
  {
    id: '3',
    name: 'Translation',
    category: 'Community',
    slashCommand: '/translate',
    inputs: [
      {
        name: 'document',
        question: 'Please upload your document',
        type: 'document',
      },
      {
        name: 'language',
        question: 'Please enter the target language',
        type: 'options',
        options: ['Spanish', 'German', 'French', 'Italian', 'Chinese'],
      },
    ],
  },
  {
    id: '4',
    name: 'Release Notes',
    category: 'Recents',
    slashCommand: '/release',
    inputs: [
      {
        name: 'description',
        question: 'Could you please provide a short description of what is in the release?',
        type: 'string',
      },
    ],
  },
  {
    id: '5',
    name: 'Code Review',
    category: 'Native',
    slashCommand: '/review',
    inputs: [
      {
        name: 'code',
        question: 'Please paste your code here',
        type: 'string',
      },
      {
        name: 'language',
        question: 'What programming language is this?',
        type: 'string',
      },
    ],
  },
  {
    id: '6',
    name: 'Meeting Minutes',
    category: 'Community',
    slashCommand: '/minutes',
    inputs: [
      {
        name: 'audio',
        question: 'Please upload the meeting audio file',
        type: 'documentAttachment',
      },
      {
        name: 'participants',
        question: 'List the names of the participants',
        type: 'string',
      },
    ],
  },
  {
    id: '7',
    name: 'Blog Post',
    category: 'Recents',
    slashCommand: '/blog',
    inputs: [
      {
        name: 'topic',
        question: 'What is the main topic of your blog post?',
        type: 'string',
      },
      {
        name: 'keywords',
        question: 'Enter some keywords related to your topic',
        type: 'string',
      },
    ],
  },
  {
    id: '8',
    name: 'Data Analysis',
    category: 'Native',
    slashCommand: '/analyze',
    inputs: [
      {
        name: 'dataset',
        question: 'Please upload your dataset (CSV format)',
        type: 'documentAttachment',
      },
      {
        name: 'analysis_type',
        question: 'What type of analysis do you need?',
        type: 'options',
        options: ['Descriptive', 'Predictive', 'Inferential'],
      },
    ],
  },
];

