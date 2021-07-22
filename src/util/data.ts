import { TypeCodeFile } from './store';
import srcdocHTML from './srcdoc.html?raw'

export function getUrlParams(name: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => res.text()).then((text) => {
      resolve(text);
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
  const jsModue = await fetchText(`${basePath}/demo/${name}/index.js`);
  files.push({
    name: 'index.js',
    fileName: 'index.js',
    code: parsePreivewJavaScript(jsModue),
    type: 'js',
  });

  const jsDataModue = await fetchText(`${basePath}/demo/${name}/data.js`);
  files.push({
    name: 'data.js',
    fileName: 'data.js',
    code: parsePreivewJavaScript(jsDataModue),
    type: 'js',
  });

  const htmlModule = await fetchText(`${basePath}/demo/${name}/index.html`);
  files.push({
    name: 'html',
    fileName: 'index.html',
    code: htmlModule,
    type: 'html',
  });

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

  const importMap = await fetchText(`${basePath}/demo/${name}/import-map.json`);
  files.push({
    name: 'import-map',
    fileName: 'import-map.json',
    code: importMap,
    type: 'json',
  });

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



// export type TypePrevewAssets = { html: string, css: string, js: string, importmap: string }

// export function getPreivewAssets(files: TypeCodeFile[]): TypePrevewAssets {
//   const assets = { html: '', css: '', js: '', datajs: '', importmap: '{}' };
//   for (let i = 0; i < files.length; i++) {
//     if (files[i].name === 'index.html') {
//       assets.html = files[i].code;
//     } else if (files[i].name === 'index.css') {
//       assets.css = files[i].code;
//     } else if (files[i].name === 'index.js') {
//       assets.js = files[i].code;
//     } else if (files[i].name === 'data.js') {
//       assets.datajs = files[i].code;
//     } else if (files[i].name === 'import-map.json') {
//       assets.importmap = files[i].code;
//     }
//   }
//   return assets;
// }


