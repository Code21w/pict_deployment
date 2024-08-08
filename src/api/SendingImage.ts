import axios from 'axios';
import { getErrorMessage } from './errorHandler';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({ baseURL });

async function UploadFile(formData: FormData) {
  try {
    // Make the POST request
    const { data } = await api.post<{
      result: Array<{
        gal_title: string;
        image_url: string;
        location: string;
        similarity: number;
      }>;
      image_url: string;
    }>('/api/combined-densenet', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageInfo = data.result[0];
    const externalImageUrl = data.image_url;

    sessionStorage.setItem('uploadFileResponse', JSON.stringify(data));
    return { imageInfo, externalImageUrl };
  } catch (error: unknown) {
    console.error(getErrorMessage(error));
    throw error;
  }
}

export default UploadFile;
