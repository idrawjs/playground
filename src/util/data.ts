import { TypeCodeFile } from './store';

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
    code: parsePreivewJavaScript(jsModue),
    type: 'js',
  });
  const htmlModule = await fetchText(`${basePath}/demo/${name}/index.html`);
  files.push({
    name: 'index.html',
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
    name: 'index.css',
    code: cssModule,
    type: 'css',
  });

  const importMap = await fetchText(`${basePath}/demo/${name}/import-map.json`);
  files.push({
    name: 'import-map.json',
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

  const regDataFile = /\'\/public\/demo\/([\w]+)\/([0-9a-zA_Z]+)\.js\'/
  result = result.replace(regDataFile, (str) => {
    let mod = '\'./\'';
    const matchResult = regDataFile?.exec(str);
    if (matchResult && matchResult[2]) {
      mod = `'./${matchResult[2]}'`;
    }
    return mod;
  })
  return result;
}