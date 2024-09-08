/**
 * Fetches stories from a given URL.
 *
 * @param {string} url - The URL to fetch stories from.
 * @returns {Promise<Story[]>} A promise resolving to the fetched stories.
 * @throws {NetworkError} If there is a network-related error.
 * @throws {Error} If the API request fails or returns invalid data.
 */
import { Story } from "@/constants/Types";
import axios, { AxiosError } from "axios";

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

export async function getStories(url: string): Promise<Story[]> {
  try {
    // Make a GET request to the provided URL
    const response = await axios.get<{ stories: Story[] }>(url);

    // Check if the response data is valid
    if (!response.data || !Array.isArray(response.data.stories)) {
      throw new Error("Invalid response data");
    }

    // Process the stories and convert postedTime to ISO string format
    const processedStories = response.data.stories.map((story) => ({
      ...story,
      postedTime: new Date(story.postedTime).toISOString(),
    }));

    return processedStories;
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
    } else if (error instanceof Error && !("response" in error)) {
      // Throw custom NetworkError for non-Axios network errors
      throw new NetworkError("Network Error: Unable to connect to the server");
    } else {
      // Log unexpected errors
      console.error(
        "Unexpected Error:",
        error instanceof Error ? error : String(error)
      );
    }
    // Re-throw the error to be handled by the caller
    throw error;
  }
}
