// Seed data untuk demo + dev. Jalankan: node prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // ---- Admin ----
  const adminPass = await bcrypt.hash('REDACTED', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'techsaasweb@gmail.com' },
    update: { role: 'admin' },
    create: { email: 'techsaasweb@gmail.com', name: 'TechSaaSWeb Admin', password: adminPass, role: 'admin' },
  });
  const clientPass = await bcrypt.hash('client123', 10);
  const client = await prisma.user.upsert({
    where: { email: 'sofia@brightsmile.demo' },
    update: {},
    create: { email: 'sofia@brightsmile.demo', name: 'Sofia M.', password: clientPass, role: 'client', company: 'BrightSmile Dental', phone: '+15125550199' },
  });

  // ---- Leads demo ----
  const leads = [
    ['Sofia M.', 'sofia@brightsmile.demo', 'Cleaning $79 — via assistant', 'won'],
    ['John D.', '+15125550188', 'Whitening — via booking form', 'new'],
    ['Maria G.', 'maria@example.com', 'Called — callback requested', 'contacted'],
    ['Ali R.', '+13125550177', 'WA sent — pricing', 'contacted'],
    ['Dave K.', 'dave@example.com', '$149 quoted', 'qualified'],
    ['Priya N.', 'priya@example.com', 'Trial signup', 'won'],
    ['Marco T.', '+13125550166', 'Table reservation', 'new'],
    ['Lena W.', 'lena@example.com', 'Deposit at 2AM', 'won'],
  ];
  for (const [name, contact, note, status] of leads) {
    await prisma.lead.create({
      data: { tenant: 'klinik', name, contact, note, status, source: 'chat', userId: client.id },
    });
  }

  // ---- Subscribers ----
  for (const e of ['owner@example.com', 'jane@example.com', 'mike@example.com']) {
    await prisma.subscriber.upsert({ where: { email: e }, update: {}, create: { email: e } });
  }

  // ---- Orders ----
  await prisma.order.create({
    data: { userId: client.id, planId: 'bisnis', planName: 'Business + Chatbot', price: 69, billing: 'monthly', status: 'launched', brief: JSON.stringify({ niche: 'Dental clinic', domain: 'brightsmiledental.com', notes: 'Booking + chatbot' }) },
  }).catch(() => {});

  // ---- Chat log ----
  await prisma.chatLog.create({
    data: { tenant: 'klinik', message: 'do you open on sunday?', reply: 'We are open Mon to Sat, 8:00 to 20:00. Emergency same-day available.', mode: 'cached' },
  }).catch(() => {});

  console.log('✓ seed selesai');
  console.log('  admin  : techsaasweb@gmail.com / REDACTED');
  console.log('  client : sofia@brightsmile.demo / client123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
