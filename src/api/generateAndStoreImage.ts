import axios from 'axios';

const baseURL = `http://localhost:3000`;

const api = axios.create({ baseURL });

console.log('Axios instance created with config:', api.defaults);

async function generateAndStoreImage(imageUrl: string, locationName: string) {
  try {
    const response = await api.get<Response>('/api/generate', {
      params: {
        imageUrl: imageUrl,
        locationName: locationName,
      },
    });

    sessionStorage.setItem('generatedImage', JSON.stringify(response.data));
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export default generateAndStoreImage;
