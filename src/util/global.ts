import { reactive } from 'vue';

export type TypeGlobalData = {
  urlParams: {
    [name: string]: string;
  },
}

export const globalData: TypeGlobalData = reactive({
  urlParams: {}
})

function initPageParams() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.forEach((value, name) => {
    globalData.urlParams[name] = value;
  });
  console.log('globalData.urlParams =', globalData.urlParams);
  if (!globalData.urlParams['demo']) {
    globalData.urlParams['demo'] = 'basic'
  }
}
initPageParams();







