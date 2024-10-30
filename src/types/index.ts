export type CharacterClass = 'DPS' | 'Tank' | 'Healer';

export interface User {
  id: string;
  discordNickname: string;
  gameNickname: string;
  characterClass: CharacterClass;
  isAdmin: boolean;
  isTopContributor: boolean;
  priority2: boolean;
}

export interface Boss {
  id: string;
  name: string;
}

export interface Raffle {
  id: string;
  bossId: string;
  itemName: string;
  itemImage: string;
  allowedClasses: CharacterClass[];
  isActive: boolean;
  winnerId?: string;
}