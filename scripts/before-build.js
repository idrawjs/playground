const fs = require('fs');
const path = require('path');
const { dependencies } = require('./../package.json');

const projectDir = path.join(__dirname, '..');
const configPath = path.join(projectDir, 'src', 'config.json');
const nodeModuleDir = path.join(projectDir, 'node_modules');


function main() {
  resetConfig();
  moveIDrawDepFile();
}

function moveIDrawDepFile() {
  const idrawGlobalFile = path.join(nodeModuleDir, 'idraw', 'dist', 'index.global.js');
  const idrawESFile = path.join(nodeModuleDir, 'idraw', 'dist', 'index.es.js');

  const libIDrawDir = path.join(projectDir, 'public', 'lib', 'idraw');
  if (fs.existsSync(libIDrawDir) && fs.statSync(libIDrawDir).isDirectory()) {
    fs.rmSync(libIDrawDir, {recursive: true});
  }

  const version = dependencies.idraw.replace(/(\^|\~)/ig, '');
  const libIDrawVersionDir = path.join(libIDrawDir, version);
  fs.mkdirSync(libIDrawVersionDir, {recursive: true});
  const libGlobalPath = path.join(libIDrawVersionDir, 'index.global.js');
  const libESPath = path.join(libIDrawVersionDir, 'index.es.js');

  const globalFile = fs.readFileSync(idrawGlobalFile, { encoding: 'utf8' });
  fs.writeFileSync(libGlobalPath, globalFile);

  const esFile = fs.readFileSync(idrawESFile, { encoding: 'utf8' });
  fs.writeFileSync(libESPath, esFile);
}

function resetConfig() {
  const configStr = fs.readFileSync(configPath, { encoding: 'utf8' });
  const config = JSON.parse(configStr);
  config.hash = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
}
main();