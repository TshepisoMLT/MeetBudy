/**
 * Fetches stories from a given URL.
 *
 * @param {string} url - The URL to fetch stories from.
 * @returns {Promise<Story[]>} A promise resolving to the fetched stories.
 * @throws {NetworkError} If there is a network-related error.
 * @throws {Error} If the API request fails or returns invalid data.
 */
import { Story } from "@/constants/Types";
import axios, { Axios, AxiosError } from "axios";

/**
 * Fetches stories from a given URL.
 *
 * @param {string} url - The URL to fetch stories from.
 * @returns {Promise<Story[]>} A promise resolving to the fetched stories.
 * @throws {Error} If the API request fails or returns invalid data.
 */

// Custom error class for network-related errors
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

interface StoriesResponse {
  message: string;
  status: number;
  stories?: Story[];
  cause?: Error | any;
  name?: string;
  request?: any;
  response?: any;
  stack?: string;
  isError: boolean;
}

export async function getStories(url: string): Promise<StoriesResponse> {
  try {
    // Make a GET request to the provided URL
    const response = await axios.get<{ stories: Story[] }>(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "test-key",
        "Access-Control-Allow-Origin": "*",
      },
    });

    // Check if the response data is valid
    if (!response.data || !Array.isArray(response.data.stories)) {
      return {
        message: "Invalid response data",
        status: 500,
        isError: true,
      };
    }

    // Process the stories and convert postedTime to ISO string format
    const processedStories = response.data.stories.map((story) => ({
      ...story,
      postedTime: new Date(story.postedTime).toISOString(),
    }));

    return {
      message: "Stories fetched successfully",
      status: 200,
      stories: processedStories,
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