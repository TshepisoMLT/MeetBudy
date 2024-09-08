import { Post } from "@/constants/Types";
import axios, { AxiosError } from "axios";

/**
 * Fetches posts from a given URL.
 *
 * @param {string} url - The URL to fetch posts from.
 * @returns {Promise<Post[]>} A promise resolving to the fetched posts.
 * @throws {Error} If the API request fails or returns invalid data.
 */
export async function getPosts(url: string): Promise<Post[]> {
  try {
    const response = await axios.get<{ posts: Post[] }>(url);
    
    if (!response.data || !Array.isArray(response.data.posts)) {
      throw new Error("Invalid response data");
    }
    
    const processedPosts = response.data.posts.map(post => ({
      ...post,
      postedTime: new Date(post.postedTime).getDate().toString(),
      commentList: post.commentList.map(comment => ({
        ...comment,
        timestamp: new Date(comment.timestamp).getDate().toString()
      }))
    }));
    
    return processedPosts;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("API Request Failed:");
      console.error(`Message: ${axiosError.message}`);
      if (axiosError.response) {
        console.error(`Status: ${axiosError.response.status}`);
        console.error(`Data: ${JSON.stringify(axiosError.response.data)}`);
      }
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
}