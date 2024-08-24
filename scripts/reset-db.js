const fs = require('fs');
const path = require('path');

const sourceDir = path.join('__tests__', '__mocks__', 'fakeData', 'json');
const destDir = path.join('__tests__', '__mocks__', 'db');

fs.readdirSync(sourceDir).forEach(file => {
  if (file.endsWith('.json')) {
    fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
  }
});