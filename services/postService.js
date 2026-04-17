const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPublishedPosts = async () => {
  return await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });
};

const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
};

const createPost = async ({ title, content, authorId }) => {
  const author = await prisma.user.findUnique({ where: { id: authorId } });
  if (!author) return { notFound: true };
  const post = await prisma.post.create({
    data: { title, content, authorId, published: false },
  });
  return { post };
};

const publishPost = async (id) => {
  return await prisma.post.update({
    where: { id },
    data: { published: true },
  });
};

module.exports = { getAllPublishedPosts, getPostById, createPost, publishPost };
