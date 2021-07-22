<template>
  <Nav />
  <div class="container">
    <Box :defaultSplit="15">
      <template #left>
        <Sider />
      </template>
      <template #right>
        <Box :defaultSplit="36">
          <template #left>
            <Editor />
          </template>
          <template #right>
            <Preview />
          </template>
        </Box>
      </template>
    </Box>
    
  </div>
</template>

<script setup lang="ts">
  //implementation from Vue.js
  // MIT License https://github.com/vuejs/vue-next/blob/master/LICENSE

  import Box from './components/box.vue';
  import Nav from './components/nav.vue';
  import Editor from './components/editor/index.vue';
  import Preview from './components/preview/index.vue';
  import Sider from './components/sider.vue';
  import { getUrlParams, getExampleFiles } from './util/data';
  import { setFiles } from './util/store';
  
  async function main() {
    const demoName = getUrlParams('demo') || 'basic';
    try {
      const files = await getExampleFiles(demoName);
      setFiles(files);
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
  --color-branding: #1890ff;
  --color-branding-dark: #144474;
}
.container {
  height: calc(100vh - var(--nav-height));
  width: 100%;
}
</style>
