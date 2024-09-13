/**
 * Fetches an array of posts from the specified URL.
 *
 * @param url - The URL to fetch the posts from.
 * @returns A Promise that resolves to an array of `Post` objects.
 * @throws {NetworkError} If there is a network-related error while fetching the posts.
 * @throws {Error} If the API response contains invalid data.
 */
import { Post } from "@/constants/Types";
import axios, { Axios, AxiosError } from "axios";

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
    this.name = "NetworkError";
  }
}

interface PostResponse {
  message: string;
  status: number;
  isError: boolean;
  posts?: Post[];
  cause?: Error | any;
  name?: string;
  request?: any;
  response?: any;
  stack?: string;
}

export async function getPosts(url: string): Promise<PostResponse> {
  try {
    // Make a GET request to the specified URL
    const response = await axios.get<{ posts: Post[] }>(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "test-key",
        "Access-Control-Allow-Origin": "*",
      },
    });

    // Check if the response data is valid
    if (!response.data || !Array.isArray(response.data.posts)) {
      return {
        message: "Invalid response data",
        status: 500,
        isError: true,
      };
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
    return {
      message: "success",
      status: 200,
      posts: processedPosts,
      isError: false,
    };
  } catch (error: unknown) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response) {
        // Log response status and data for server errors
        console.error(`Status Code: ${axiosError.response.status}`);
        console.error(`Status: ${axiosError.response.status}`);
        console.error(`Data: ${JSON.stringify(axiosError.response.data)}`);
        return {
          message: axiosError.message,
          status: parseInt(axiosError?.code || "500", 10),
          cause: axiosError?.cause,
          name: axiosError.name,
          request: axiosError.request,
          response: axiosError.response,
          stack: axiosError.stack,
          isError: true,
        };
      } else if (axiosError.request) {
        return {
          message: axiosError.message,
          status: parseInt(axiosError?.code || "500", 10),
          cause: axiosError?.cause,
          name: axiosError.name,
          request: axiosError.request,
          response: axiosError.response,
          stack: axiosError.stack,
          isError: true,
        };
      }
    } else if (error instanceof Error && !("response" in error)) {
      // Throw custom NetworkError for non-Axios network errors
      return {
        message: error.message,
        status: 400,
        cause: error.cause,
        name: error.name,
        stack: error.stack,
        isError: true,
      };
    } else {
      // Log unexpected errors
      return {
        message: "An unexpected error occurred. Please try again later.",
        status: 400,
        isError: true,
      };
    }
    // Re-throw the error to be handled by the caller
    return {
      message: "An unexpected error occurred. Please try again later.",
      status: 400,
      isError: true,
    };
  }
}
