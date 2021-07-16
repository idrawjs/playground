<template>
  <Nav />
  <div class="container">
    <Box>
      <template #left>
        <Editor />
      </template>
      <template #right>
        <div>Right</div>
      </template>
    </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Box from './components/box.vue';
import Nav from './components/nav.vue';
import Editor from './components/editor.vue';

export default defineComponent({
  name: 'App',
  components: {
    Box,
    Nav,
    Editor,
  }
})
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
