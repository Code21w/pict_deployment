import { CartStoreType } from '@/store/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
export const useCartStore = create(
  persist<CartStoreType>(
    (set) => ({
      currentCart: [],
      setCurrentCart: (newState) => set({ currentCart: newState }),
      currentIndex: '',
      setCurrentIndex: (newState) => set({ currentIndex: newState }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

interface UseLoginModalStoreState {
  isOpenLoginModal: boolean;
  setIsOpenLoginModal: (isOpenLoginModal: boolean) => void;
}

export const useLoginModalStore = create<UseLoginModalStoreState>((set) => ({
  isOpenLoginModal: false,
  setIsOpenLoginModal: (isOpenLoginModal) => {
    set({ isOpenLoginModal: isOpenLoginModal });
  },
}));
