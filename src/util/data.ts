import { TypeCodeFile } from './store';
import demoList from './../constant/demo-list';
import srcdocHTML from './srcdoc.html?raw';

export function getUrlParams(name: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      if (res.status === 200) {
        return res.text().then((text) => {
          resolve(text);
        }).catch(reject)
      } else {
        reject(res)
      }
    }).catch(reject)
  });
}

let basePath = './../../public';
if (import.meta.env.PROD) {
  basePath = './';
  // if (window.location.host === 'idrawjs.github.io') {
  //   basePath = './';
  // }
}

export async function getExampleFiles(name: string): Promise<TypeCodeFile[]> {
  const files: TypeCodeFile[] = [];

  try {
    const jsModue = await fetchText(`${basePath}/demo/${name}/index.js`);
    files.push({
      name: 'index.js',
      fileName: 'index.js',
      code: parsePreivewJavaScript(jsModue),
      type: 'js',
    });
  } catch (err) {
    console.log(err);
  }

  try {
    const jsDataModue = await fetchText(`${basePath}/demo/${name}/data.js`);
    files.push({
      name: 'data.js',
      fileName: 'data.js',
      code: parsePreivewJavaScript(jsDataModue),
      type: 'js',
    });
  } catch (err) {
    console.log(err);
  }

  try {
    const htmlModule = await fetchText(`${basePath}/demo/${name}/index.html`);
    files.push({
      name: 'html',
      fileName: 'index.html',
      code: htmlModule,
      type: 'html',
    });
  } catch (err) {
    console.log(err);
  }

  try {
    let cssModule = await fetchText(`${basePath}/demo/${name}/index.css`);
    if (import.meta.env.DEV) {
      const lines = cssModule.replace(/\r\n/ig, '\n').split('\n');
      cssModule = '';
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('const css = "')) {
          cssModule = line.replace('const css = "', '').replace(/^\"/, '').replace(/\"$/, '').replace(/\\n/g, '\n').trim();
          break;
        }
      }
    }
    files.push({
      name: 'css',
      fileName: 'index.css',
      code: cssModule,
      type: 'css',
    });
  } catch (err) {
    console.log(err);
  }

  try {
    const importMap = await fetchText(`${basePath}/demo/${name}/import-map.json`);
    files.push({
      name: 'import-map',
      fileName: 'import-map.json',
      code: importMap,
      type: 'json',
    });
  } catch (err) {
    console.log(err);
  }

  return files;
}

export function parsePreivewJavaScript(js: string) {
  const regLib = /\'\/node_modules\/\.vite\/([\w]+)\.js\?v=[0-9a-zA_Z]{1,}\'/
  let result = js.replace(regLib, (str) => {
    let mod = '\'\'';
    const matchResult = regLib?.exec(str);
    if (matchResult && matchResult[1]) {
      mod = `'${matchResult[1]}'`;
    }
    return mod;
  });

  const regDataFile = /\'\/public\/demo\/([\w]+)\/([0-9a-zA_Z]+)\.js\?t\=[0-9]{1,}\'/
  result = result.replace(regDataFile, (str) => {
    let mod = '\'./\'';
    const matchResult = regDataFile?.exec(str);
    if (matchResult && matchResult[2]) {
      mod = `'./${matchResult[2]}'`;
    }
    return mod;
  });
  return result;
}



export type TypePrevewAssets = { html: string,  css: string, js: string, datajs: string, importmap: string }

export function getPreivewAssets(files: TypeCodeFile[]): TypePrevewAssets {
  const assets = { html: '', css: '', js: '', datajs: '', importmap: '{}' };
  for (let i = 0; i < files.length; i++) {
    if (files[i].fileName === 'index.html') {
      assets.html = files[i].code;
    } else if (files[i].fileName === 'index.css') {
      assets.css = files[i].code;
    } else if (files[i].fileName === 'index.js') {
      assets.js = files[i].code;
    } else if (files[i].fileName === 'data.js') {
      assets.datajs = files[i].code;
    } else if (files[i].fileName === 'import-map.json') {
      assets.importmap = files[i].code;
    }
  }
  return assets;
}


export function mergePreviewDoc(assets: TypePrevewAssets) {
  const srcdoc = srcdocHTML;
  const sandboxSrc = srcdoc
    .replace(/<!--__INJECT_STYLE__-->/, `\<style\>${assets.css}\</style\>`)
    .replace(/<!--__INJECT_IMPORTMAP__-->/, `\<script type="importmap"\>${assets.importmap}\</script\>`)
    .replace(/<!--__INJECT_HTML__-->/, assets.html.replace(/<script[\s\S]*?<\/script>/ig, ''))
    // .replace(/<!--__INJECT_JS__-->/, `\<script type="module"\>${assets.js}\</script\>`);
    .replace(/<!--__INJECT_JS__-->/, `\<script type="module"\>${mergeJavaScript(assets)}\</script\>`);
  return sandboxSrc;
}


export function mergeJavaScript(assets: TypePrevewAssets) {
  const dataReg = /import[\s]{1,}([a-zA-Z\_]+)[\s]{1,}from[\s]{1,}\'\.\/data\'/;
  const js = assets.js.replace(dataReg, (str) => {
    const matchResult = dataReg?.exec(str);
    let result = str;
    if (matchResult && matchResult[1]) {
      const dataName = `${matchResult[1]}`;
      const regExport = /export[\s]{1,}default[\s]{1,}\{/;
      if (assets.datajs && regExport.test(`${assets.datajs}`)) {
        result = `const ${dataName} = ${assets.datajs.replace(regExport, '{')}`;
      }
    }
    return result;
  });
  return js;
}


export function includeDemoList(demoKey: string) {
  for (let i = 0; i < demoList.length; i++) {
    const list = demoList[i].list;
    for (let j = 0; j < list.length; j++) {
      const item = list[j] || {};
      if (item.key === demoKey) {
        return true;
      }
    }
  }
  return false;
}
