const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllActiveUsers = async () => {
  const users = await prisma.user.findMany({
    where: { isActive: true },
    include: { posts: true },
  });
  return users.map((u) => ({
    ...u,
    fullName: `${u.firstName} ${u.lastName}`,
  }));
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });
  if (!user) return null;
  return { ...user, fullName: `${user.firstName} ${user.lastName}` };
};

const createUser = async ({ firstName, lastName, email }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { conflict: true };
  const user = await prisma.user.create({
    data: { firstName, lastName, email, isActive: true },
  });
  return { user };
};

const deactivateUser = async (id) => {
  return await prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
};

module.exports = { getAllActiveUsers, getUserById, createUser, deactivateUser };
