const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');


 const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readContactsData = async () => {
  const readData = await fs.readFile(contactsPath, 'utf8');
  const result = JSON.parse(readData);
  return result;
  }



const listContacts = async() => {
  return await readContactsData();
  }
  
const getContactById = async (contactId) => {
  const contactsData = await readContactsData();
  const [result] = contactsData.filter((contact) => contact.id === contactId);
  return result;
  }
  
const removeContact = async (contactId) => {
  const contactsData = await readContactsData();
  const deletedContact = contactsData.find((contact) => contact.id === contactId);
  const indexOfDeletedElement = contactsData.indexOf(deletedContact);
  const newList = contactsData.splice(indexOfDeletedElement, 1)
    fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));
  return newList;
    
  }
  
const addContact = async (name, email, phone) => {
  const contactsData = await readContactsData();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contactsData.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2));
  return newContact;
  }

module.exports = { listContacts, getContactById, removeContact, addContact };