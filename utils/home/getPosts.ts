/**
 * Fetches an array of posts from the specified URL.
 *
 * @param url - The URL to fetch the posts from.
 * @returns A Promise that resolves to an array of `Post` objects.
 * @throws {NetworkError} If there is a network-related error while fetching the posts.
 * @throws {Error} If the API response contains invalid data.
 */
import { Post } from "@/constants/Types";
import axios, { AxiosError } from "axios";

/**
 * Fetches posts from a given URL.
 *
 * @param {string} url - The URL to fetch posts from.
 * @returns {Promise<Post[]>} A promise resolving to the fetched posts.
 * @throws {Error} If the API request fails or returns invalid data.
 */

// Custom error class for network-related errors
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export async function getPosts(url: string): Promise<Post[]> {
  try {
    // Make a GET request to the specified URL
    const response = await axios.get<{ posts: Post[] }>(url);

    // Check if the response data is valid
    if (!response.data || !Array.isArray(response.data.posts)) {
      throw new Error("Invalid response data");
    }

    // Process the fetched posts
    const processedPosts = response.data.posts.map((post) => ({
      ...post,
      // Convert postedTime to ISO string format
      postedTime: new Date(post.postedTime).toISOString(),
      // Process each comment in the post
      commentList: post.commentList.map((comment) => ({
        ...comment,
        // Convert comment timestamp to ISO string format
        timestamp: new Date(comment.timestamp).toISOString(),
      })),
    }));

    return processedPosts;
  } catch (error: unknown) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      console.error("API Request Failed:");
      console.error(`Message: ${axiosError?.message}`);
      if (axiosError.response) {
        // Log response status and data for server errors
        console.error(`Status: ${axiosError.response.status}`);
        console.error(`Data: ${JSON.stringify(axiosError.response.data)}`);
      } else if (axiosError.request) {
        // Log network errors
        console.error("ERROR  Message: Network Error");
      }
    } else if (error instanceof Error && !('response' in error)) {
      // Throw custom NetworkError for non-Axios network errors
      throw new NetworkError('Network Error: Unable to connect to the server');
    } else {
      // Log unexpected errors
      console.error("Unexpected Error:", error instanceof Error ? error : String(error));
    }
    // Re-throw the error to be handled by the caller
    throw error;
  }
}
