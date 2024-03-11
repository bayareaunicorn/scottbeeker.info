import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Scott Beekers',
  tagline: 'Engineering Blog and Courses',
  favicon: 'img/favicon.ico',

 
  url: 'https://scottbeeker.info',
  
  baseUrl: '/',

  
  organizationName: 'Scott A Beeker', // Usually your GitHub org/user name.
  projectName: 'Scott Beeker Info', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
  
          },
        blog: {
          showReadingTime: true,
  
          },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.jpeg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true
    },



    announcementBar: {
      id: 'comingsoon',
      content: 'Courses coming soon!'
    },


    navbar: {
      title: 'Scott Beeker',
      logo: {
        alt: '',
        src: 'img/logo.jpeg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'EngineeringTutorialsSidebar',
          position: 'left',
          label: 'Tutorials',
        },

        {
          type: 'docSidebar',
          sidebarId: 'ResearchSidebar',
          position: 'left',
          label: 'Research'
      },
      
      {

          to: '/projects',
          label: 'Projects',
          position: 'left', },
        {
          
          to: '/blog', 
          label: 'Blog', 
          position: 'left'},
        
      ],
    },




    footer: {
      links: [
        { label: 'X', href: 'https://twitter.com/scottbeekersf' },
        { label: 'Linkedin', href: 'https://Linkedin.com/in/scottbeekerofficial' },
        { label: 'Github', href: 'https://github.com/bayareaunicorn' },
      ],
      copyright: 'Copyright © 2024 Scott Beeker.',
    },
        
      
      
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
