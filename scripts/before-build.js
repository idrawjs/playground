const fs = require('fs');
const path = require('path');

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

  const libGlobalPath = path.join(projectDir, 'public', 'lib', 'idraw', '0.x', 'index.global.js');
  const libESPath = path.join(projectDir, 'public', 'lib', 'idraw', '0.x', 'index.es.js');

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