import { getErrorMessage } from './errorHandler';
import { instance } from './instance';

async function generateAndStoreImage(imageUrl: string, locationName: string) {
  try {
    const response = await instance.get<Response>('/api/generate', {
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
