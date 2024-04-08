import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient();

async function main() {
    const post1 = await prisma.article.upsert({
        where: { title: 'Prisma Adds Support for MongoDB' },
        update: {
          body: 'Updated body qhqhqhq content here...',
          published: true, // Assuming you want to publish the article if it already exists
        },
        create: {
          title: 'Prisma Adds Support for MongoDB',
          body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
          description:
            "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
          published: false,
        },
      });
    
      const post2 = await prisma.article.upsert({
        where: { title: "What's new in Prisma? (Q1/22)" },
        update: {
            body: 'Updated body hqhqhqhq content here...',
            published: true,
          },
        create: {
            title: "What's new in Prisma? (Q1/22)",
            body: 'Our ahahahaha engineers have been working hard, issuing new releases with many improvements...',
            description:
              'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
            published: true,  
        }
      });
      console.log({ post1, post2 });
}
main()
    .catch((e) => {
    console.log(e);
    process.exit(1);
})
.finally(async() => {
    await prisma.$disconnect();
})