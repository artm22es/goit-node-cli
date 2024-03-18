import { program } from "commander";
import * as contactServices from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await contactServices.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const oneContact = await contactServices.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contactServices.addContact(data);
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contactServices.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
