import { generateSidebar } from 'vitepress-sidebar';

function navigation(items = [], options = {}, documentRootPath = '/docs') {
  const navHeader = [];
  const navSidebar = [];

  if (!options.nav) {
    options.nav = {};
  }

  if (!options.sidebar) {
    options.sidebar = {};
  }

  if (!options.nav.disableHome) {
    navHeader.push(
      {
        text: options.nav.homeTitle || 'Головна',
        link: '/',
      }
    );
  }

  items.forEach(item => {
    if (item.text && item.items) {
      navHeader.push(item);

      return true;
    }

    if (!item.text || !item.folder) {
      return false;
    }

    // FORMAT INCOME DATA
    const itemFolder = item.folder.trim();
    const itemFolderFormatted = `/${itemFolder}/`;

    // NAVBAR
    navHeader.push(
      {
        ...item,
        link: item.link || itemFolderFormatted,
        activeMatch: item.activeMatch || itemFolderFormatted,
      }
    );

    // SIDEBAR
    const sidebarOptions = options.sidebar[item.folder] || {};

    navSidebar.push(
      // https://github.com/jooy2/vitepress-sidebar#options
      {
        documentRootPath,
        scanStartPath: itemFolder,
        resolvePath: itemFolderFormatted,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        useFolderTitleFromIndexFile: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        capitalizeFirst: true,
        collapsed: true,
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 1,
        excludeFiles: [],
        excludeFolders: [],
        includeRootIndexFile: true,
        includeFolderIndexFile: false,

        ...sidebarOptions,
      }
    );
  });

  return {
    nav: navHeader,
    sidebar: generateSidebar(navSidebar),
  };
}

export default navigation;
