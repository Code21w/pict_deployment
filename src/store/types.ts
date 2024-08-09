import { RecommendedPlace } from '@/app/travelplan/page';

export interface CartStoreType {
  currentCart: RecommendedPlace[];
  setCurrentCart: (currentCart: RecommendedPlace[]) => void;
}
