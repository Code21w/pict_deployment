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
      }>;
      image_url: string;
    }>('/api/combined-densenet', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
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
