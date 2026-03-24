
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Detian Wiki',
  tagline: 'Workflow-first language, Hya framework, and package ecosystem documentation',
  favicon: 'img/favicon.ico',
  future: {v4: true},
  url: 'https://detian.example.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
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
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Detian Wiki',
      items: [
        {to: '/docs/intro', label: 'Docs', position: 'left'},
        {to: '/docs/language/language-overview', label: 'Language', position: 'left'},
        {to: '/docs/hya/hya-overview', label: 'Hya', position: 'left'},
        {to: '/docs/packages/overview', label: 'Packages', position: 'left'},
        {to: '/docs/tooling/lsp', label: 'Tooling', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start Here',
          items: [
            {label: 'Intro', to: '/docs/intro'},
            {label: 'Installation', to: '/docs/getting-started/installation-and-running'},
            {label: 'First Program', to: '/docs/getting-started/first-program'},
          ],
        },
        {
          title: 'Core Docs',
          items: [
            {label: 'Language', to: '/docs/language/language-overview'},
            {label: 'Hya', to: '/docs/hya/hya-overview'},
            {label: 'Packages', to: '/docs/packages/overview'},
          ],
        },
        {
          title: 'Engineering',
          items: [
            {label: 'Architecture', to: '/docs/internals/architecture'},
            {label: 'Roadmap', to: '/docs/internals/roadmap'},
            {label: 'LSP', to: '/docs/tooling/lsp'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Detian Wiki. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'toml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
