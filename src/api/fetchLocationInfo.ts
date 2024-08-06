import axios from 'axios';

const baseURL = `http://localhost:3000`;
const api = axios.create({ baseURL });

async function fetchLocationInfo(location: string) {
  try {
    const response = await api.get(`/api/sigungu/${location}`);
    if (response.data.response && response.data.response.length > 0) {
      const explanation = response.data.response[0].explanation;

      // Save the response to session storage
      sessionStorage.setItem('locationInfoResponse', JSON.stringify(response.data));

      return explanation;
    } else {
      console.error('Response array is empty or undefined');
      return '정보를 불러올 수 없습니다.'; // 기본값 또는 적절한 에러 메시지 제공
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}

export default fetchLocationInfo;
