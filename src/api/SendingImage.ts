import { getErrorMessage } from './errorHandler';
import { instance } from './instance';
async function UploadFile(formData: FormData) {
  try {
    const { data } = await instance.post<{
      result: Array<{
        gal_title: string;
        image_url: string;
        location: string;
        similarity: number;
        mapx: number; // Ensure this is included in the API response
        mapy: number; // Ensure this is included in the API response
      }>;
      image_url: string; // This can be used if you need the image URL separately
    }>('/api/combined-densenet', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    const externalImageUrl = data.image_url;
    sessionStorage.setItem('uploadFileResponse', JSON.stringify(data));
    return { result: data.result, externalImageUrl };
  } catch (error: unknown) {
    console.error(getErrorMessage(error));
    throw error;
  }
}

export default UploadFile;
