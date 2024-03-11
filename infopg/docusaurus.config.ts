import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Scott Beeker',
  tagline: 'Leader, Innovator, Entreprener, Futurist',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://scottbeeker.info',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          routeBasePath: '/',
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
        alt: 'Scott Beeker',
        src: 'img/logo.jpeg',
      },

     
      items: [
        { to: '/blog', label: 'Blog', position: 'left'},
        {to: '/production', label: 'Production Apps', positiom: 'left'},
        {type: 'doc', to: '/docs/research', label: 'Research', docId: 'research', position: 'left'},
        { to: '/devportfolio', label: ' Developer Portfolio', position: 'left' },
        {type: 'doc', to: '/docs/courses', label: 'Courses', docId: 'courses', position: 'left' },
       
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
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
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
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
