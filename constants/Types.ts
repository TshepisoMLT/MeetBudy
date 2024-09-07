export type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  comment: string;
  timestamp: string;
};

export type Post = {
  id: string;
  name: string;
  avatar: string;
  postedTime: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  commentList: Comment[];
  shares: number;
};

export type Story = {
  id: string;
  name: string;
  avatar: string;
  postedTime: string;
  storyImage: string;
  textOverlay?: string;
};
