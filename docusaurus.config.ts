import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Documentation - Just Cause 4 Multiplayer",
  tagline:
    "Server scripting documentation for the Just Cause 4 Multiplayer Mod",
  favicon: "img/favicon.png",


  // Set the production url of your site here
  url: "https://docs.jc4mp.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
    // .md pages (synced from the game repo) are plain CommonMark, .mdx pages are MDX
    format: "detect",
  },
  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/jc4-mp/docs.jc4mp.com/edit/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexDocs: true,
        indexPages: true,
      }),
    ],
  ],
  themeConfig: {
    // TODO: Replace with your project's social card
    // image: "img/docusaurus-social-card.jpg",
    announcementBar: {
      id: "release-2-0-0",
      content: "JC4MP 2.0.0 is out with a new scripting API. Read the <a href='/changelogs/v2-0-0'>changelog</a> and the <a href='/porting'>porting guide</a>.",
    },
    navbar: {
      logo: {
        alt: "JC4MP Logo",
        src: "img/favicon.png",
        style: {
          borderRadius: "4px",
        },
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          to: "https://jc4mp.com",
          position: "left",
          label: "Download JC4MP",
        },
        {
          href: "https://jc4mp.com/discord",
          label: "Discord",
          position: "right",
        },
        {
          href: "https://github.com/jc4-mp/docs.jc4mp.com",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['lua']
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
