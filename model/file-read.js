const fs = require('fs').promises;

async function fileRead(path) {
  try {
    const data = await fs.readFile(path);
    const array = JSON.parse(data);
    return array;
  } catch (err) {
    console.error(err);
  }
}

module.exports = fileRead;
