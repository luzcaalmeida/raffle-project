import { create } from 'zustand';
import { User } from '../types';

interface UserState {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'isAdmin' | 'isTopContributor' | 'priority2'>) => void;
  removeUser: (userId: string) => void;
  toggleTopContributor: (userId: string) => void;
  togglePriority2: (userId: string) => void;
  updateUserClass: (userId: string, characterClass: User['characterClass']) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],

  addUser: (newUser) => {
    set((state) => ({
      users: [
        ...state.users,
        {
          ...newUser,
          id: crypto.randomUUID(),
          isAdmin: false,
          isTopContributor: false,
          priority2: false,
        },
      ],
    }));
  },

  removeUser: (userId) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    }));
  },

  toggleTopContributor: (userId) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? { ...user, isTopContributor: !user.isTopContributor }
          : user
      ),
    }));
  },

  togglePriority2: (userId) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? { ...user, priority2: !user.priority2 }
          : user
      ),
    }));
  },

  updateUserClass: (userId, characterClass) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? { ...user, characterClass }
          : user
      ),
    }));
  },
}));