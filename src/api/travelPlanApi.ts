import { getErrorMessage } from './errorHandler';
import instance from './instance';

export async function fetchPlace(id: number, category: string) {
  try {
    const result = await instance.get(`/api/planner_market?sigungu_id=${id}&category=${category}`);
    // id는 세션에서 받아오는 문구 함수 만들어서 넣기
    // 카테고리는 4개 다 받기
    if (result.data && result.data.length > 0) {
      const data = result.data;
      console.log(result);
      console.log(data);
      return data;
    } else {
      console.error('Response array is empty or undefined');
      return '정보를 불러올 수 없습니다.'; // 기본값 또는 적절한 에러 메시지 제공
    }
  } catch (error: unknown) {
    console.error(getErrorMessage(error));
    throw error;
  }
}
