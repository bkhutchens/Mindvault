import PouchDB from "pouchdb";

let db;
if (typeof window !== "undefined") {
  db = new PouchDB("mindvault_notes"); // Stores notes in the browser
}

export default db;
