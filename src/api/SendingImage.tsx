import axios from 'axios';

const baseURL = `http://localhost:3000`;

const api = axios.create({ baseURL });

async function UploadFile(formData: FormData) {
  try {
    const response = await api.post<{ image: string }>('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const image = response.data.image;
    console.log(image);
    return image;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export default UploadFile;
