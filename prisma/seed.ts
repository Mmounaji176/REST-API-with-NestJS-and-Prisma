import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create users
    const user1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        username: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'user2@example.com',
        username: 'user2',
        firstName: 'Jane',
        lastName: 'Smith',
        password: 'password456',
      },
    });

    // Create a friendship between users
    const friendship = await prisma.friendship.create({
      data: {
        fromUser: user1.userId,
        toUser: user2.userId,
        status: 'ACCEPTED',
      },
    });

    // Create a chat room
    const chatRoom = await prisma.chatRoom.create({
      data: {
        roomName: 'Sample Room',
        type: 'public',
        ownerId: user1.userId,
      },
    });

    // Create chat room members
    await prisma.chatRoomMember.createMany({
      data: [
        {
          isAdmin: false,
          isBanned: false,
          memberID: user1.userId,
          chatRoomId: chatRoom.id,
          bannedAt: ''
        },
        {
          isAdmin: false,
          isBanned: false,
          memberID: user2.userId,
          chatRoomId: chatRoom.id,
          bannedAt: ''
        },
      ],
    });

    // Create a message in the chat room
    await prisma.message.create({
      data: {
        authorId: user1.userId,
        content: 'Hello, world!',
        chatRoomId: chatRoom.id,
      },
    });

    // Create notifications
    await prisma.notification.createMany({
      data: [
        {
          type: 'FriendRequest',
          content: 'You have a new friend request.',
          recipientId: user2.userId,
        },
        {
          type: 'MessageReceived',
          content: 'You have a new message.',
          recipientId: user1.userId,
        },
      ],
    });

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
