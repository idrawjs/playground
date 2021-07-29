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
}

export const globalData: TypeGlobalData = reactive({
  urlParams: {
    demo: 'basic'
  },
  demoStatus: 'LOADING'
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
}


export function setDemoStatus(status: TypeGlobalData['demoStatus']) {
  globalData['demoStatus'] = status;
}






