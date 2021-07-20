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
  activeIndex: -1
})

export function setActiveIndex(index: number) {
  store.activeIndex = index;
}

export function addFile(file: TypeCodeFile) {
  store.files.push(file);
}

export function updateActiveFileCode(code: string) {
  if (store.files[store.activeIndex]) {
    store.files[store.activeIndex].code = code;
  }
}

export function setFiles(codefiles: TypeCodeFile[]) {
  while (store.files.length > 0) {
    store.files.pop();
  }
  codefiles.forEach((f) => {
    store.files.push(f);
  });
  setActiveIndex(0);
}