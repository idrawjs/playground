import { reactive } from 'vue';
// import demoList from './../constant/demo-list'

export type TypeGlobalData = {
  urlParams: {
    demo: string;
    sider?: 'false';
    header?: 'false';
    'default-editor-split'?: string;
    [name: string]: string | undefined;
  },
  demoStatus: 'LOADED' | 'LOADING' | 'NOT_FOUND' | 'NOT_FINISHED';
  layout: {
    showHeader: boolean;
    showSider: boolean;
    defaultEditorSplit: number;
  },
}

export const globalData: TypeGlobalData = reactive({
  urlParams: {
    demo: 'basic'
  },
  demoStatus: 'LOADING',
  layout: {
    showHeader: true,
    showSider: true,
    defaultEditorSplit: 40,
  },
});

// http://localhost:3000/?header=false&sider=false&default-editor-split=50
initPageParams();
function initPageParams() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.forEach((value, name) => {
    globalData.urlParams[name] = value;
  });
  if (typeof globalData.urlParams['default-editor-split'] === 'string') {
    if (parseInt(globalData.urlParams['default-editor-split']) > 0) {
      globalData.layout.defaultEditorSplit = parseInt(globalData.urlParams['default-editor-split'])
    }
  }
  if (globalData.urlParams['header'] === 'false') {
    globalData.layout.showHeader = false;
  }
  if (globalData.urlParams['sider'] === 'false') {
    globalData.layout.showSider = false;
  }
}


export function setDemoStatus(status: TypeGlobalData['demoStatus']) {
  globalData['demoStatus'] = status;
}






