import { Client, Databases } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

if (!endpoint || !project) {
  throw new Error("Missing Appwrite ENV variables");
}

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(project);

export const databases = new Databases(client);

export const DATABASE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

export const RESIDENCES_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;