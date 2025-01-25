const { PrismaClient } = require("@prisma/client");
const bcryptjs = require("bcryptjs");

const prisma = new PrismaClient();

async function createUser() {
  const password = bcryptjs.hashSync("changeme");
  await prisma.user.create({
    data: {
      email: "ivo.kovacevic2001@gmail.com",
      username: "ivokovacevic",
      password: password,
    },
  });
}

createUser();
