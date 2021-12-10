var colors = require("colors");
const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
          const contactsData = await listContacts();
          console.table(contactsData);
      break;

    case "get":
          const contactById = await getContactById(id);
          if (contactById) {
              console.log(contactById);
              console.log('Contact is found!'.yellow);
              return;
          } 
             console.log('Contact is not found!'.red);
      break;

    case "add":
          const contact = await addContact(name, email, phone);
          console.log(contact);
          console.log('New contact is added to the list!'.green);
      break;

    case "remove":
          const contactRemove = await removeContact(id);       
          if (contactRemove) {
             console.log(contactRemove);
             console.log('Contact is deleted!'.yellow);
            return;
          } 
             console.log('Contact is not found!'.red);
      break;

    default:
      console.warn("Unknown action type!".red);
  }
};

invokeAction(argv);
