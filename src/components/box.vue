<template>
  <div
    ref="container"
    class="split-box"
    :class="{ dragging: state.dragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div class="left" :style="{ width: boundSplit() + '%' }">
      <slot name="left" />
      <div class="dragger" @mousedown.prevent="dragStart" />
    </div>
    <div class="right" :style="{ width: (100 - boundSplit()) + '%' }">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
  //implementation from Vue.js
  // MIT License https://github.com/vuejs/vue-next/blob/master/LICENSE

  import { ref, reactive, defineProps } from 'vue';

  const props = defineProps({
    defaultSplit: {
      type: Number,
      default: 50
    },
  });
  
  const { defaultSplit } = props;

  const container = ref()
  const state = reactive({
    dragging: false,
    split: defaultSplit
  })

  function boundSplit() {
    const { split } = state
    return split < 10
      ? 10
      : split > 90
        ? 90
        : split
  }

  let startPosition = 0
  let startSplit = 0

  function dragStart(e: MouseEvent) {
    state.dragging = true
    startPosition = e.pageX
    startSplit = boundSplit()
  }

  function dragMove(e: MouseEvent) {
    if (state.dragging) {
      const position = e.pageX
      const totalSize = container.value.offsetWidth
      const dp = position - startPosition
      state.split = startSplit + ~~(dp / totalSize * 100)
    }
  }

  function dragEnd() {
    state.dragging = false
  }

</script>

<style scoped>
  .split-box {
    display: flex;
    height: 100%;
  }
  .split-box.dragging {
    cursor: ew-resize;
  }
  .dragging .left,
  .dragging .right {
    pointer-events: none;
  }
  .left,
  .right {
    position: relative;
    height: 100%;
  }
  .left {
    border-right: 1px solid #ccc;
  }
  .dragger {
    position: absolute;
    z-index: 99;
    top: 0;
    bottom: 0;
    right: -5px;
    width: 10px;
    cursor: ew-resize;
  }
</style>