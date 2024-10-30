import Database from 'better-sqlite3';
import { CharacterClass, User, Item, Raffle } from '../types';

const db = new Database('raffle.db');

// User services
export const userService = {
  create: (user: Omit<User, 'id'>) => {
    const stmt = db.prepare(`
      INSERT INTO users (id, discord_nickname, game_nickname, password_hash, character_class, is_admin)
      VALUES (@id, @discordNickname, @gameNickname, @passwordHash, @characterClass, @isAdmin)
    `);
    
    const id = crypto.randomUUID();
    stmt.run({
      id,
      discordNickname: user.discordNickname,
      gameNickname: user.gameNickname,
      passwordHash: user.password, // Note: In production, hash the password
      characterClass: user.characterClass,
      isAdmin: user.isAdmin,
    });
    
    return id;
  },

  findByDiscordNickname: (discordNickname: string) => {
    const stmt = db.prepare('SELECT * FROM users WHERE discord_nickname = ?');
    return stmt.get(discordNickname) as User | undefined;
  },

  updateClass: (userId: string, characterClass: CharacterClass) => {
    const stmt = db.prepare('UPDATE users SET character_class = ? WHERE id = ?');
    return stmt.run(characterClass, userId);
  },

  toggleTopContributor: (userId: string) => {
    const stmt = db.prepare('UPDATE users SET is_top_contributor = NOT is_top_contributor WHERE id = ?');
    return stmt.run(userId);
  },

  togglePriority2: (userId: string) => {
    const stmt = db.prepare('UPDATE users SET priority2 = NOT priority2 WHERE id = ?');
    return stmt.run(userId);
  },
};

// Item services
export const itemService = {
  create: (item: Omit<Item, 'id'>) => {
    const stmt = db.prepare(`
      INSERT INTO items (id, name, image_url, boss_id, allowed_classes)
      VALUES (@id, @name, @imageUrl, @bossId, @allowedClasses)
    `);
    
    const id = crypto.randomUUID();
    stmt.run({
      id,
      name: item.name,
      imageUrl: item.imageUrl,
      bossId: item.bossId,
      allowedClasses: JSON.stringify(item.allowedClasses),
    });
    
    return id;
  },

  getAll: () => {
    const stmt = db.prepare('SELECT * FROM items');
    const items = stmt.all() as (Omit<Item, 'allowedClasses'> & { allowed_classes: string })[];
    return items.map(item => ({
      ...item,
      allowedClasses: JSON.parse(item.allowed_classes),
    }));
  },
};

// Raffle services
export const raffleService = {
  create: (raffle: Omit<Raffle, 'id' | 'isActive' | 'winnerId'>) => {
    const stmt = db.prepare(`
      INSERT INTO raffles (id, item_id, boss_id, allowed_classes, is_active)
      VALUES (@id, @itemId, @bossId, @allowedClasses, TRUE)
    `);
    
    const id = crypto.randomUUID();
    stmt.run({
      id,
      itemId: raffle.itemId,
      bossId: raffle.bossId,
      allowedClasses: JSON.stringify(raffle.allowedClasses),
    });
    
    return id;
  },

  getActive: () => {
    const stmt = db.prepare('SELECT * FROM raffles WHERE is_active = TRUE');
    const raffles = stmt.all() as (Omit<Raffle, 'allowedClasses'> & { allowed_classes: string })[];
    return raffles.map(raffle => ({
      ...raffle,
      allowedClasses: JSON.parse(raffle.allowed_classes),
    }));
  },

  enterRaffle: (raffleId: string, userId: string) => {
    const stmt = db.prepare('INSERT INTO raffle_participants (raffle_id, user_id) VALUES (?, ?)');
    return stmt.run(raffleId, userId);
  },

  endRaffle: (raffleId: string, winnerId: string) => {
    const stmt = db.prepare(`
      UPDATE raffles 
      SET is_active = FALSE, winner_id = ?, ended_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    return stmt.run(winnerId, raffleId);
  },
};

export default db;