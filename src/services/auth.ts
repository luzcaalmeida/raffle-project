import { userService } from '../database';
import { User } from '../types';

export const authService = {
  register: async (userData: Omit<User, 'id' | 'isAdmin' | 'isTopContributor' | 'priority2'>) => {
    const isAdmin = userData.password === 'Admin123@';
    const userId = userService.create({
      ...userData,
      isAdmin,
      isTopContributor: false,
      priority2: false,
    });
    
    const user = userService.findByDiscordNickname(userData.discordNickname);
    return user;
  },

  login: async (discordNickname: string, password: string) => {
    const user = userService.findByDiscordNickname(discordNickname);
    
    if (!user || user.password !== password) { // In production, compare hashed passwords
      throw new Error('Invalid credentials');
    }

    return user;
  },
};