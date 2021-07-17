<template>
  <Nav />
  <div class="container">
    <Box>
      <template #left>
        <Editor />
      </template>
      <template #right>
        <Preview />
      </template>
    </Box>
  </div>
</template>

<script setup lang="ts">
  import Box from './components/box.vue';
  import Nav from './components/nav.vue';
  import Editor from './components/editor.vue';
  import Preview from './components/preview/index.vue';
  import { getUrlParams, getExampleFiles } from './util/data';
  
  async function main() {
    const exampleName = getUrlParams('example') || 'basic';
    try {
      const files = await getExampleFiles(exampleName);
    } catch (err) {
      console.log(err);
    }
  }
  
  main();

</script>

<style lang="less">
body {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--base);
  margin: 0;
  background-color: #f8f8f8;
  --base: #444;
  --nav-height: 50px;
  --font-code: 'Source Code Pro', monospace;
  --color-branding: #3c6ea8;
  --color-branding-dark: #144474;
}
.container {
  height: calc(100vh - var(--nav-height));
  width: 100%;
}
</style>
