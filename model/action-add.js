const contactsPath = require('./contacts-path.js');
const fileRead = require('./file-read.js');
const fileWrite = require('./file-write.js');

async function addContact({ name, email, phone }) {
  const createNewContact = { name, email, phone };

  const contacts = await fileRead(contactsPath);
  contacts.push(createNewContact);
  await fileWrite(contactsPath, contacts);

  return createNewContact;
}

module.exports = addContact;
