import axios from 'axios';
import { getErrorMessage } from './errorHandler';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({ baseURL });

async function generateAndStoreImage(imageUrl: string, locationName: string) {
  try {
    const response = await api.get<Response>('/api/generate', {
      params: {
        imageUrl: imageUrl,
        locationName: locationName,
      },
    });

    sessionStorage.setItem('generatedImage', JSON.stringify(response.data));
  } catch (error: unknown) {
    console.error(getErrorMessage(error));
    throw error;
  }
}

export default generateAndStoreImage;
