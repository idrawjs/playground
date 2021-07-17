<template>
  <div class="tab-selector">

    <div class="tab" >
      <span class="label">tab-2</span>
    </div>
    <div class="tab active" >
      <span class="label">tab-1</span>
      <span class="remove" >
        <svg width="12" height="12" viewBox="0 0 24 24" class="svelte-cghqrp"><line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line><line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line></svg>
      </span>
    </div>
    <!-- <div v-if="pending" class="tab" >
      <input
        v-model="pendingtabname"
        spellcheck="false"
        @keyup.enter="doneAddtab"
        @keyup.esc="cancelAddtab"
        @vnodeMounted="focus">
    </div> -->
    <!-- <button class="add" >+</button> -->
  </div>
</template>

<script setup lang="ts">
import { store } from './../util/store';

</script>

<style scoped>
.tab-selector {
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  background-color: white;
}
.tab {
  display: inline-block;
  font-size: 13px;
  font-family: var(--font-code);
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
  display: inline-block;
  padding: 8px 10px 6px;
}
.tab input {
  width: 80px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 4px 6px;
  margin-left: 6px;
}
.tab .remove {
  display: inline-block;
  vertical-align: middle;
  line-height: 12px;
  cursor: pointer;
  padding-left: 0;
}
.add {
  font-size: 20px;
  font-family: var(--font-code);
  color: #999;
  vertical-align: middle;
  margin-left: 6px;
}
.add:hover {
  color: var(--color-branding);
}
</style>