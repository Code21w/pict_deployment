import { getErrorMessage } from './errorHandler';
import { instance } from './instance';

interface ResponseData {
  data:
  {response: string;
}}

async function generateAndStoreImage(imageUrl: string, locationName: string) {
  try {
    const response = await instance.get<ResponseData>('/api/generate', {
      params: {
        imageUrl: imageUrl,
        locationName: locationName,
      },
    });

    sessionStorage.setItem('generatedImage', JSON.stringify(response.data));
    return response
  } catch (error: unknown) {
    console.error(getErrorMessage(error));
    throw error;
  }
}

export default generateAndStoreImage;
