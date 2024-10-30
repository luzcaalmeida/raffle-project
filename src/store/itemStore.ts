import { create } from 'zustand';
import { CharacterClass } from '../types';

interface Item {
  id: string;
  name: string;
  imageUrl: string;
  bossId: string;
  allowedClasses: CharacterClass[];
}

interface ItemState {
  items: Item[];
  addItem: (item: Omit<Item, 'id'>) => void;
  removeItem: (itemId: string) => void;
  getItemsByClass: (characterClass: CharacterClass) => Item[];
}

export const useItemStore = create<ItemState>((set, get) => ({
  items: [],

  addItem: (newItem) => {
    set((state) => ({
      items: [
        ...state.items,
        {
          ...newItem,
          id: crypto.randomUUID(),
        },
      ],
    }));
  },

  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },

  getItemsByClass: (characterClass) => {
    const { items } = get();
    return items.filter((item) =>
      item.allowedClasses.includes(characterClass)
    );
  },
}));