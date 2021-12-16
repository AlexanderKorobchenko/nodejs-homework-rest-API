const contactsPath = require('./contacts-path');
const fileRead = require('./file-read.js');
const fileWrite = require('./file-write.js');

async function updateContact(contactId, body) {
  const contacts = await fileRead(contactsPath);
  const index = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );

  if (index === -1) {
    console.log(`Contact with ID:"${contactId}" not found...`);
    return null;
  }

  contacts[index] = { ...contacts[index], ...body };

  await fileWrite(contactsPath, contacts);
  return contacts[index];
}

module.exports = updateContact;
