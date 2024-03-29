<template>
  <div class="editor" ref="el"></div>
</template>

<script setup lang="ts">
//implementation from Vue.js
// MIT License https://github.com/vuejs/vue-next/blob/master/LICENSE

import { ref, onMounted, defineProps, defineEmits, watchEffect } from 'vue'
import CodeMirror from './codemirror'

const el = ref()

const props = defineProps({
  mode: {
    type: String,
    default: 'htmlmixed'
  },
  value: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<(e: 'change', value: string) => void>()

onMounted(() => {
  const addonOptions = {
    autoCloseBrackets: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
  }

  const editor = CodeMirror(el.value!, {
    value: '',
    mode: props.mode,
    readOnly: props.readonly,
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    ...addonOptions
  })

  editor.on('change', () => {
    emit('change', editor.getValue())
  })

  watchEffect(() => {
    editor.setValue(props.value)
  })
  watchEffect(() => {
    editor.setOption('mode', props.mode)
  })

  window.addEventListener(
    'resize',
    () => {
      editor.refresh()
    }
  )

  setTimeout(() => {
    editor.refresh()
  }, 50)
})
</script>

<style>
.editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.CodeMirror {
  font-family: 'Source Code Pro', monospace;
  height: 100%;
}
</style>
