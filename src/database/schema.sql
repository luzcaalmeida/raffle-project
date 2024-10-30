-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  discord_nickname TEXT NOT NULL UNIQUE,
  game_nickname TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  character_class TEXT NOT NULL CHECK(character_class IN ('DPS', 'Tank', 'Healer')),
  is_admin BOOLEAN DEFAULT FALSE,
  is_top_contributor BOOLEAN DEFAULT FALSE,
  priority2 BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Items table
CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  boss_id TEXT NOT NULL,
  allowed_classes TEXT NOT NULL, -- Stored as JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Raffles table
CREATE TABLE IF NOT EXISTS raffles (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  boss_id TEXT NOT NULL,
  allowed_classes TEXT NOT NULL, -- Stored as JSON array
  is_active BOOLEAN DEFAULT TRUE,
  winner_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ended_at DATETIME,
  FOREIGN KEY (item_id) REFERENCES items(id),
  FOREIGN KEY (winner_id) REFERENCES users(id)
);

-- Raffle participants table
CREATE TABLE IF NOT EXISTS raffle_participants (
  raffle_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (raffle_id, user_id),
  FOREIGN KEY (raffle_id) REFERENCES raffles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);