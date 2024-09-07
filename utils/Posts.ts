import { Post } from "@/constants/Types";

// Array of user posts

export const posts: Post[] = [
  {
    id: "1",
    name: "Liam Johnson",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    image: "https://picsum.photos/seed/1/400/300",
    caption: "Just had an amazing day at the beach!",
    likes: Math.floor(Math.random() * 100), // Generate random number of likes
    comments: 3,
    shares: Math.floor(Math.random() * 10), // Generate random number of shares
    postedTime: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Generate random post time within the last week
    commentList: [
      {
        id: "1",
        user: {
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        comment: "Great post!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "2",
        user: {
          name: "Jane Smith",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        comment: "Looks like a blast!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "3",
        user: {
          name: "Michael Johnson",
          avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        comment: "I love this post!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
    ],
  },
  {
    id: "2",
    name: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    image: "https://picsum.photos/seed/2/400/300",
    caption: "Enjoying a cozy night in with a good book!",
    likes: Math.floor(Math.random() * 100), // Generate random number of likes
    comments: 6,
    shares: Math.floor(Math.random() * 10), // Generate random number of shares
    postedTime: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Generate random post time within the last week
    commentList: [
      {
        id: "1",
        user: {
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        comment: "Great post!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "2",
        user: {
          name: "Jane Smith",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        comment: "Looks like a blast!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "3",
        user: {
          name: "Michael Johnson",
          avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        comment: "I love this post!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "4",
        user: {
          name: "Emily Williams",
          avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        comment: "I can relate to this post!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "5",
        user: {
          name: "Daniel Miller",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        comment: "I'm in the same boat!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "6",
        user: {
          name: "Oliver Green",
          avatar: "https://randomuser.me/api/portraits/men/16.jpg",
        },
        comment: "Congratulations on your new family member!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "7",
        user: {
          name: "Noah Martin",
          avatar: "https://randomuser.me/api/portraits/men/20.jpg",
        },
        comment: "Well deserved! You'll do great!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
    ],
  },
  {
    id: "3",
    name: "Noah Brown",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    image: "https://picsum.photos/seed/3/400/300",
    caption: "Just finished my first marathon! Feeling accomplished!",
    likes: Math.floor(Math.random() * 100), // Generate random number of likes
    comments: 2,
    shares: Math.floor(Math.random() * 10), // Generate random number of shares
    postedTime: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Generate random post time within the last week
    commentList: [
      {
        id: "1",
        user: {
          name: "Sarah Johnson",
          avatar: "https://randomuser.me/api/portraits/women/11.jpg",
        },
        comment: "Congratulations! That's a huge achievement!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "2",
        user: {
          name: "David Lee",
          avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        },
        comment: "You're an inspiration! Well done!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
    ],
  },
  {
    id: "4",
    name: "Olivia Davis",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    image: "https://picsum.photos/seed/4/400/300",
    caption: "Exploring the beautiful streets of Paris!",
    likes: Math.floor(Math.random() * 100), // Generate random number of likes
    comments: 2,
    shares: Math.floor(Math.random() * 10), // Generate random number of shares
    postedTime: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Generate random post time within the last week
    commentList: [
      {
        id: "1",
        user: {
          name: "Emma Thompson",
          avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        },
        comment: "Paris is magical! Enjoy every moment!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "2",
        user: {
          name: "James Wilson",
          avatar: "https://randomuser.me/api/portraits/men/14.jpg",
        },
        comment: "Don't forget to visit the Eiffel Tower!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
    ],
  },
  {
    id: "5",
    name: "Ethan Taylor",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    image: "https://picsum.photos/seed/5/400/300",
    caption: "Just adopted this cute little puppy!",
    likes: Math.floor(Math.random() * 100), // Generate random number of likes
    comments: 1,
    shares: Math.floor(Math.random() * 10), // Generate random number of shares
    postedTime: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Generate random post time within the last week
    commentList: [
      {
        id: "1",
        user: {
          name: "Sophie Brown",
          avatar: "https://randomuser.me/api/portraits/women/15.jpg",
        },
        comment: "Aww, so adorable! What's its name?",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
    ],
  },
  {
    id: "6",
    name: "Ava Anderson",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    image: "https://picsum.photos/seed/6/400/300",
    caption: "Celebrating my graduation day!",
    likes: Math.floor(Math.random() * 100), // Generate random number of likes
    comments: 2,
    shares: Math.floor(Math.random() * 10), // Generate random number of shares
    postedTime: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Generate random post time within the last week
    commentList: [
      {
        id: "1",
        user: {
          name: "Liam Harris",
          avatar: "https://randomuser.me/api/portraits/men/17.jpg",
        },
        comment: "Congratulations! Your hard work paid off!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "2",
        user: {
          name: "Mia Clark",
          avatar: "https://randomuser.me/api/portraits/women/18.jpg",
        },
        comment: "So proud of you! What's next?",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
    ],
  },
  {
    id: "7",
    name: "Mason Thomas",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    image: "https://picsum.photos/seed/7/400/300",
    caption: "Just landed my dream job!",
    likes: Math.floor(Math.random() * 100), // Generate random number of likes
    comments: 1,
    shares: Math.floor(Math.random() * 10), // Generate random number of shares
    postedTime: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Generate random post time within the last week
    commentList: [
      {
        id: "1",
        user: {
          name: "Ella White",
          avatar: "https://randomuser.me/api/portraits/women/19.jpg",
        },
        comment: "That's fantastic news! Congratulations!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
    ],
  },
  {
    id: "8",
    name: "Sophia Martinez",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    image: "https://picsum.photos/seed/8/400/300",
    caption: "Trying out a new recipe today!",
    likes: Math.floor(Math.random() * 100), // Generate random number of likes
    comments: 2,
    shares: Math.floor(Math.random() * 10), // Generate random number of shares
    postedTime: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Generate random post time within the last week
    commentList: [
      {
        id: "1",
        user: {
          name: "Ava Johnson",
          avatar: "https://randomuser.me/api/portraits/women/21.jpg",
        },
        comment: "Looks delicious! Can you share the recipe?",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "2",
        user: {
          name: "Ethan Brown",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        comment: "I'm getting hungry just looking at it!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
    ],
  },
  {
    id: "9",
    name: "Liam Wilson",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    image: "https://picsum.photos/seed/9/400/300",
    caption: "Enjoying a relaxing day at the park.",
    likes: Math.floor(Math.random() * 100), // Generate random number of likes
    comments: 2,
    shares: Math.floor(Math.random() * 10), // Generate random number of shares
    postedTime: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(), // Generate random post time within the last week
    commentList: [
      {
        id: "1",
        user: {
          name: "Olivia Taylor",
          avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        },
        comment: "Beautiful scenery! What a perfect day!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
      {
        id: "2",
        user: {
          name: "Lucas Harris",
          avatar: "https://randomuser.me/api/portraits/men/24.jpg",
        },
        comment: "I wish I could be there!",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Generate random post time within the last week
      },
    ],
  },
];
