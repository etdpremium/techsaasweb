// Drizzle schema — mirror D1 production (8 tabel, persis sama dengan prisma/schema.prisma)
// Drizzle 0.45: sqliteTable / text / integer

import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';

// ===== User =====
export const User = sqliteTable('User', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: text('role').notNull().default('client'),
  company: text('company'),
  phone: text('phone'),
  createdAt: text('createdAt').notNull().default('CURRENT_TIMESTAMP'),
}, (t) => ({
  emailIdx: uniqueIndex('User_email_key').on(t.email),
}));

// ===== Lead =====
export const Lead = sqliteTable('Lead', {
  id: text('id').primaryKey(),
  tenant: text('tenant').notNull().default('global'),
  name: text('name').notNull(),
  contact: text('contact').notNull(),
  note: text('note'),
  source: text('source').notNull().default('chat'),
  status: text('status').notNull().default('new'),
  userId: text('userId'),
  createdAt: text('createdAt').notNull().default('CURRENT_TIMESTAMP'),
});

// ===== Contact =====
export const Contact = sqliteTable('Contact', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  plan: text('plan'),
  message: text('message').notNull(),
  userId: text('userId'),
  createdAt: text('createdAt').notNull().default('CURRENT_TIMESTAMP'),
});

// ===== Subscriber =====
export const Subscriber = sqliteTable('Subscriber', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  createdAt: text('createdAt').notNull().default('CURRENT_TIMESTAMP'),
}, (t) => ({
  emailIdx: uniqueIndex('Subscriber_email_key').on(t.email),
}));

// ===== Post =====
export const Post = sqliteTable('Post', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  category: text('category').notNull(),
  lang: text('lang').notNull().default('id'),
  date: text('date').notNull(),
  read: text('read').notNull(),
  thumb: text('thumb').notNull(),
  body: text('body').notNull(),
  views: integer('views').notNull().default(0),
  createdAt: text('createdAt').notNull().default('CURRENT_TIMESTAMP'),
}, (t) => ({
  slugIdx: uniqueIndex('Post_slug_key').on(t.slug),
}));

// ===== Order =====
export const Order = sqliteTable('Order', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  planId: text('planId').notNull(),
  planName: text('planName').notNull(),
  price: integer('price').notNull(),
  billing: text('billing').notNull().default('monthly'),
  status: text('status').notNull().default('new'),
  brief: text('brief'),
  createdAt: text('createdAt').notNull().default('CURRENT_TIMESTAMP'),
});

// ===== ChatLog =====
export const ChatLog = sqliteTable('ChatLog', {
  id: text('id').primaryKey(),
  tenant: text('tenant').notNull().default('global'),
  message: text('message').notNull(),
  reply: text('reply').notNull(),
  mode: text('mode').notNull(),
  model: text('model'),
  createdAt: text('createdAt').notNull().default('CURRENT_TIMESTAMP'),
});

// ===== CannedResponse =====
export const CannedResponse = sqliteTable('CannedResponse', {
  id: text('id').primaryKey(),
  keyword: text('keyword').notNull(),
  reply: text('reply').notNull(),
  active: integer('active').notNull().default(1),
  createdAt: text('createdAt').notNull().default('CURRENT_TIMESTAMP'),
});
