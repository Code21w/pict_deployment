import { CartStoreType } from '@/store/types';
import { create } from 'zustand';
const useCartStore = create<CartStoreType>((set) => ({
  currentCart: [],
  setCurrentCart: (newState) => {
    set({ currentCart: newState });
  },
  // setCurrentPlaceImage: (newState) => {
  //   set(() => ({ place_image: newState }));
  // },
  // setCurrentPlaceId: (newState) => {
  //   set(() => ({ place_id: newState }));
  // },
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
}));

export default useCartStore;
