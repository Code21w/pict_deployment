import { RecommendedPlace } from '@/app/travelplan/page';

export interface CartStoreType {
  currentCart: RecommendedPlace[];
  setCurrentCart: (currentCart: RecommendedPlace[]) => void;
  // setCurrentPlaceImage: (place_Image: string) => void;
  // setCurrentPlaceId: (place_Id: number) => void;
}
