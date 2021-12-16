const fs = require('fs').promises;

async function fileWrite(path, array) {
  try {
    const data = JSON.stringify(array, null, 2);
    await fs.writeFile(path, data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = fileWrite;
