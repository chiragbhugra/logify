import { pgTable, serial, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  githubId: text('github_id').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});