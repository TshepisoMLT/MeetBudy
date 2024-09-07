/**
 * Represents a comment on a social media post.
 * @property {string} id - The unique identifier for the comment.
 * @property {object} user - The user who made the comment.
 * @property {string} user.name - The name of the user who made the comment.
 * @property {string} user.avatar - The avatar URL of the user who made the comment.
 * @property {string} comment - The text content of the comment.
 * @property {string} timestamp - The timestamp when the comment was made.
 */

/**
 * Represents a social media post.
 * @property {string} id - The unique identifier for the post.
 * @property {string} name - The name of the user who made the post.
 * @property {string} avatar - The avatar URL of the user who made the post.
 * @property {string} postedTime - The timestamp when the post was made.
 * @property {string} image - The URL of the image attached to the post.
 * @property {string} caption - The text caption of the post.
 * @property {number} likes - The number of likes the post has received.
 * @property {number} comments - The number of comments the post has received.
 * @property {object[]} commentList - The list of comments made on the post.
 * @property {number} shares - The number of times the post has been shared.
 */

/**
 * Represents a story (temporary post) in a social media platform.
 * @property {string} id - The unique identifier for the story.
 * @property {string} name - The name of the user who posted the story.
 * @property {string} avatar - The avatar URL of the user who posted the story.
 * @property {string} postedTime - The timestamp when the story was posted.
 * @property {string} storyImage - The URL of the image attached to the story.
 * @property {string} [textOverlay] - The optional text overlay on the story image.
 */

// Represents a comment on a post
export type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  comment: string;
  timestamp: string;
};

// Represents a social media post
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

// Represents a story (temporary post) in a social media platform
export type Story = {
  id: string;
  name: string;
  avatar: string;
  postedTime: string;
  storyImage: string;
  textOverlay?: string;
};
