<template>
  <div>
    <div v-for="demo in demoList">
      <div>{{demo.name}}</div>
      <div>
        <div v-for="item in demo.list">
          <a>{{item.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import demoList from './../constant/demo-list';
</script>

<style scoped>

</style>