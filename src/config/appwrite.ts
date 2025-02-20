import { Client, Storage } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string)
  .setKey(process.env.USER_API_KEY as string);

const storage = new Storage(client);

export { storage };
