import axios from "axios";

export const uploadFile = async (
  file: File,
  type: string,
  preset: string
): Promise<any> => {
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);

    let api = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;

    const res = await axios.post(api, data);

    return res.data;
  } catch (err) {
    console.error("File upload failed:", err);
    throw new Error("File upload failed. Please try again.");
  }
};
