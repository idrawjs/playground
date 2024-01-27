<template>
  <div class="tab-list">
    <div class="tab"
      v-for="(file, idx) in store.files"
      v-bind:class="{active: idx === store.activeIndex}"
      v-on:click="setActiveIndex(idx)"
      >
      <span class="label">{{file.name}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store, setActiveIndex } from '../../util/store';

</script>

<style scoped>
.tab-list {
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  background-color: white;
}
.tab {
  display: inline-block;
  font-size: 13px;
  /* font-family: var(--font-code); */
  cursor: pointer;
  color: #999;
  box-sizing: border-box;
}
.tab.active {
  color: var(--color-branding);
  border-bottom: 3px solid var(--color-branding);
  cursor: text;
}
.tab span {
  position: relative;
  display: inline-block;
  padding: 8px 6px 6px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 6px;
    bottom: 4px;
    width: 1px;
    background: #ccc;
  } 
}

.tab {
  &:last-child {
    span {
        &::after { 
        display: none;
      }
    }
  }
}


</style>