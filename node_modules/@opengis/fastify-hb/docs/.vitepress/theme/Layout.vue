<script setup>
import DefaultTheme from 'vitepress/theme';
import Panzoom from './components/Panzoom.vue';
import NavigationLinks from './components/NavigationLinks.vue';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #aside-outline-after>
      <NavigationLinks />
    </template>
  </Layout>

  <Panzoom />
</template>
