import { create } from 'zustand';
import { Boss, Raffle, CharacterClass } from '../types';

// List of available bosses in the game
const BOSSES: Boss[] = [
  { id: 'excavator-9', name: 'Excavator-9' },
  { id: 'chernobog', name: 'Chernobog' },
  { id: 'talus', name: 'Talus' },
  { id: 'malakar', name: 'Malakar' },
  { id: 'cornelius', name: 'Cornelius' },
  { id: 'minezerok', name: 'Minezerok' },
  { id: 'kowazan', name: 'Kowazan' },
  { id: 'adentus', name: 'Adentus' },
  { id: 'junobote', name: 'Junobote' },
  { id: 'grand-aelon', name: 'Grand Aelon' },
  { id: 'aridus', name: 'Aridus' },
  { id: 'nirma', name: 'Nirma' },
];

interface RaffleState {
  raffles: Raffle[];
  bosses: Boss[];
  addRaffle: (raffle: Omit<Raffle, 'id' | 'isActive' | 'winnerId'>) => void;
  endRaffle: (raffleId: string, winnerId: string) => void;
  getRafflesForClass: (characterClass: CharacterClass) => Raffle[];
  getBosses: () => Boss[];
  getActiveRaffles: () => Raffle[];
  enterRaffle: (raffleId: string, userId: string) => void;
  participants: Record<string, string[]>; // raffleId -> userId[]
}

export const useRaffleStore = create<RaffleState>((set, get) => ({
  raffles: [],
  bosses: BOSSES,
  participants: {},

  addRaffle: (newRaffle) => {
    set((state) => ({
      raffles: [
        ...state.raffles,
        {
          ...newRaffle,
          id: crypto.randomUUID(),
          isActive: true,
        },
      ],
      participants: {
        ...state.participants,
        [crypto.randomUUID()]: [],
      },
    }));
  },

  endRaffle: (raffleId, winnerId) => {
    set((state) => ({
      raffles: state.raffles.map((raffle) =>
        raffle.id === raffleId
          ? { ...raffle, isActive: false, winnerId }
          : raffle
      ),
    }));
  },

  getRafflesForClass: (characterClass) => {
    const { raffles } = get();
    return raffles.filter(
      (raffle) =>
        raffle.isActive && raffle.allowedClasses.includes(characterClass)
    );
  },

  getActiveRaffles: () => {
    const { raffles } = get();
    return raffles.filter((raffle) => raffle.isActive);
  },

  enterRaffle: (raffleId, userId) => {
    set((state) => ({
      participants: {
        ...state.participants,
        [raffleId]: [...(state.participants[raffleId] || []), userId],
      },
    }));
  },

  getBosses: () => BOSSES,
}));