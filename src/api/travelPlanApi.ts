import { instance } from './instance';

export const fetchPlace = async (id: string, category: string) => {
  const result = await instance.get(`/api/planner_market?sigungu_id=${id}&category=${category}`);

  return result;
};
