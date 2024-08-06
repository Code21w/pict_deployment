import axios from 'axios';

const baseURL = `http://localhost:3000`;

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
    }>('/api/combined_densenet', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Access the first item in the response array
    const imageInfo = data.result[0]; // Get the first object from the response array
    const externalImageUrl = data.image_url;

    sessionStorage.setItem('uploadFileResponse', JSON.stringify(data));
    // Return the image URL or other relevant data as needed
    return { imageInfo, externalImageUrl }; // Return the image URL or whatever is needed
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export default UploadFile;
