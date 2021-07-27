const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'src', 'config.json');

function main() {
  const configStr = fs.readFileSync(configPath, { encoding: 'utf8' });
  const config = JSON.parse(configStr);
  config.hash = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
}

main();