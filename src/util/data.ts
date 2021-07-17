import { TypeCodeFile } from './store';

export function getUrlParams(name: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const basePath = './../examples';
export async function getExampleFiles(name: string): Promise<TypeCodeFile[]> {
  const files: TypeCodeFile[] = [];
  const jsModue = await import(`${basePath}/${name}/index.js?raw`);
  files.push({
    name: 'index.js',
    code: jsModue.default,
    type: 'js',
  });
  const htmlModule = await import(`${basePath}/${name}/index.html?raw`);
  files.push({
    name: 'index.html',
    code: htmlModule.default,
    type: 'html',
  });
  const cssModule = await import(`${basePath}/${name}/index.css?raw`);
  files.push({
    name: 'index.css',
    code: (cssModule.default || '').replace(/^export default \"/i, '').replace(/\"$/i, ''),
    type: 'css',
  });
  return files;
}