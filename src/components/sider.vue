<template>
  <div class="sider-container">
    <div class="sider-menu"
       v-for="demo in demoList">
      <div class="sider-menu-title">{{demo.name}}</div>
      <div class="sider-menu-list">
        <a
          class="sider-menu-item"
          v-for="item in demo.list"
          :href="parseItemLink(item.key)"
          :class="{
            active: item.key === globalData.urlParams['demo']
          }"
        >
          <span>{{item.name}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { watch, reactive } from 'vue';
import demoList from './../constant/demo-list';
import { globalData } from './../util/global';

function parseItemLink(demoKey: string): string {
  const names = Object.keys(globalData.urlParams);
  const paramList: string[] = [];
  names.forEach((name: string) => {
    if (name === 'demo') {
      paramList.push(`demo=${demoKey}`);
    } else {
      paramList.push(`${name}=${globalData.urlParams[name] || ''}`)
    }
  })
  return `?${paramList.join('&')}`;
}

</script>

<style scoped>
.sider-container {
  padding-top: 10px;
  padding-bottom: 100px;
  box-sizing: border-box;
  background: #ffffff;
  height: 100%;
  overflow: auto;
}

.sider-menu {
  font-size: 14px;
  color: #666666;
}
.sider-menu-title {
  font-weight: bolder;
  line-height: 40px;
  padding: 0 10px;
  padding-left: 16px;
}

.sider-menu-list {
  display: block;
}

.sider-menu-item {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #444444;
  cursor: pointer;
  text-decoration: none;
  padding-left: 20px;
  padding-right: 20px;
}

.sider-menu-item.active {
  position: relative;
  background: #e6f7ff;
  color: var(--color-branding);
  border-right: 3px solid var(--color-branding);
}


.sider-menu-item:hover {
  color: var(--color-branding);
}

</style>