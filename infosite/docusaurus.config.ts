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
    image: 'img/docusaurus-social-card.jpg',
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
          sidebarId: 'EngineeringTutorialSidebar',
          position: 'left',
          label: 'Tutorials',
        },

        {
          
          to: '/blog', 
          label: 'Blog', 
          position: 'left'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Engineering Tutorials ',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Mastadon W3C',
              href: 'https://w3c.social/@scottbeeker',
            },
            {
              label: 'Github',
              href: 'https://github.com/bayareaunicorn',
            },
            {
              label: 'X',
              href: 'https://twitter.com/scottbeekersf',
            },
            {
              label: 'Linkein',
              href: 'https://linkedin.com/in/scottbeekerofficial'
            },
          ],
        },
          
        {
          title: 'More',
          items: [
            
            {
              label: 'GitHub',
              href: 'https://github.com/bayareaunicorn',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Scott Beeker. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
