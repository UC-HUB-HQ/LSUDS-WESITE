import { databases } from "./config";
import { ID } from "appwrite";

export const db = {};

const dbId = import.meta.env.VITE_DATABASE_ID;
const collections = [
  {
    dbId,
    id: import.meta.env.VITE_COLLECTION_ID_EVENTS,
    name: "events",
  },
  {
    dbId,
    id: import.meta.env.VITE_COLLECTION_ID_EXECUUTIVES,
    name: "executives",
  },
  {
    dbId,
    id: import.meta.env.VITE_COLLECTION_ID_HALL_OF_FAMERS,
    name: "hall0fFamers",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, payload),
    //
    update: (id, payload) =>
      databases.updateDocument(col.dbId, col.id, id, payload),
    //
    delete: (id) => databases.deleteDocument(col.dbId, col.id, id),
    //
    list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),
    //
    get: (id) => databases.getDocument(col.dbId, col.id, id),
  };
});
