import { storage } from "../appwrite/config";
import { ID } from "appwrite";

// REUSABLE FUNCTION TO DELETE IMAGE FILE
export const deleteImageFile = async (id) => {
  await storage.deleteFile(
    import.meta.env.VITE_BUCKET_ID, // bucketId
    id, // fileId
  );
};

// REUSABLE FUNCTION TO ADD IMAGE FILE
export const addImage = async (image) => {
  const createImageResponse = await storage.createFile(
    import.meta.env.VITE_BUCKET_ID,
    ID.unique(),
    image,
  );
  return createImageResponse;
};
