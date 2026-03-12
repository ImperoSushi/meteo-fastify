// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme';
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client';
import './style.scss';
//import "@tabler/icons-webfont/tabler-icons.css";
import Layout from './Layout.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    enhanceAppWithTabs(app);
  }
};
