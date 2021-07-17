import { reactive } from 'vue';

export interface TypeCodeFile {
  name: string;
  code: string;
  type: 'js' | 'css' | 'html'
}

interface Store {
  files: TypeCodeFile[],
  activeIndex: number,
}

let files:TypeCodeFile[] = [];

export const store: Store = reactive({
  files,
  activeIndex: 0
})

export function setActiveIndex(index: number) {
  store.activeIndex = index;
}

export function addFile(file: TypeCodeFile) {
  store.files.push(file);
}

export function setFiles(files: TypeCodeFile[]) {
  store.files = files;
}