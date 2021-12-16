const contactsPath = require('./contacts-path.js');
const fileRead = require('./file-read.js');
const fileWrite = require('./file-write.js');

async function removeContact(contactId) {
  const contacts = await fileRead(contactsPath);

  const index = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );

  if (index === -1) {
    console.log(`Contact with ID:"${contactId}" not found...`);
    return null;
  }

  const newContacts = contacts.filter((_, indx) => indx !== index);

  await fileWrite(contactsPath, newContacts);
  return contacts[index];
}

module.exports = removeContact;
