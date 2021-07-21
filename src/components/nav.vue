
<script setup lang="ts">
// Playground implementation from Vue.js
// MIT License https://github.com/vuejs/vue-next/blob/master/LICENSE

import { ref, onMounted } from 'vue'

const activeVersion = ref(`@0.0.1`)
const expanded = ref(false)

async function toggle() {
  expanded.value = !expanded.value
}
onMounted(async () => {
  window.addEventListener('click', () => {
    expanded.value = false
  })
})
</script>

<template>
  <nav>
    <h1>
      <span>iDraw Playground</span>
    </h1>
    <div class="links">
      <div class="version" @click.stop>
        <span class="active-version" @click="toggle">
          Version: {{ activeVersion }}
        </span>
        <ul class="versions" :class="{ expanded }">
          
          <li>
            <a>v0.0.1</a>
            <a>v0.0.2</a>
            <a>v0.0.3</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
nav {
  height: var(--nav-height);
  box-sizing: border-box;
  padding: 0 1em;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
}

h1 {
  margin: 0;
  line-height: var(--nav-height);
  font-weight: 500;
  display: inline-block;
  vertical-align: middle;
}

h1 img {
  height: 24px;
  vertical-align: middle;
  margin-right: 10px;
  position: relative;
  top: -2px;
}

@media (max-width: 480px) {
  h1 span {
    display: none;
  }
}

.links {
  display: flex;
}

.version {
  display: inline-block;
  margin-right: 12px;
  position: relative;
}

.active-version {
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  line-height: var(--nav-height);
  padding-right: 15px;
}

.active-version:after {
  content: '';
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #aaa;
  position: absolute;
  right: 0;
  top: 22px;
}

.version:hover .active-version:after {
  border-top-color: var(--base);
}

.versions {
  display: none;
  position: absolute;
  left: 0;
  top: 40px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style-type: none;
  padding: 8px;
  margin: 0;
  width: 200px;
  max-height: calc(100vh - 70px);
  overflow: scroll;
}

.versions a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
  cursor: pointer;
  color: var(--base);
}

.versions a:hover {
  color: var(--color-branding);
}

.versions.expanded {
  display: block;
}

</style>
