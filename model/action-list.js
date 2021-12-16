const contactsPath = require('./contacts-path.js');
const fileRead = require('./file-read.js');

async function listContacts() {
  const contacts = await fileRead(contactsPath);
  return contacts;
}

module.exports = listContacts;
