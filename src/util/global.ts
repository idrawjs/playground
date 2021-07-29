import { reactive } from 'vue';
// import demoList from './../constant/demo-list'

export type TypeGlobalData = {
  urlParams: {
    demo: string;
    sider?: 'false';
    header?: 'false';
    [name: string]: string | undefined;
  },
  demoStatus: 'LOADED' | 'LOADING' | 'NOT_FOUND' | 'NOT_FINISHED';
  layout: {
    showHeader: boolean;
    showSider: boolean;
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
  },
});


initPageParams();
function initPageParams() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.forEach((value, name) => {
    globalData.urlParams[name] = value;
  });
  // if (!globalData.urlParams['demo']) {
  //   globalData.urlParams['demo'] = 'basic'
  // }
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






