import axios from 'axios';

const baseURL = `http://localhost:3000`;

const api = axios.create({ baseURL });

async function generateAndStoreImage(imageUrl: string, location: string) {
  try {
    const response = await api.get('/api/generate', {
      params: { imageUrl, location },
    });
    localStorage.setItem('generatedImage', JSON.stringify(response.data));
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export default generateAndStoreImage;
