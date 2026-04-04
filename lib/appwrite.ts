import { Client, Databases, Account, Storage, OAuthProvider } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

if (!endpoint || !project) {
  throw new Error("Missing Appwrite ENV variables");
}

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(project);

// Initialize and export all services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const RESIDENCES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

// Re-export constructors and enums needed by other modules
export { Client, Account, OAuthProvider };

export default client;