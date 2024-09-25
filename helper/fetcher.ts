import { getStories, NetworkError } from "@/utils/home/getStories";
import { getPosts } from "@/utils/home/getPosts";

export const fetcher = async (url: string, to: string) => {
  try {
    if (!to || !url) return;

    // Make a GET request to the specified URL
    if (to === "stories") {
      const response = await getStories(url);

      // Check if the response data is valid
      if (!response.stories || !Array.isArray(response.stories)) {
        return {
          message: "Invalid response data",
          status: 500,
          isError: true,
        };
      }

      return {
        message: "Stories fetched successfully",
        status: 200,
        stories: response.stories,
      };
    } else if (to === "posts") {
      const response = await getPosts(url);

      // Check if the response data is valid
      if (!response.posts || !Array.isArray(response.posts)) {
        return {
          message: "Invalid response data",
          status: 500,
          isError: true,
        };
      }

      return {
        message: "Posts fetched successfully",
        status: 200,
        posts: response.posts,
      };
    } else {
      return {
        message: "Invalid response data",
        status: 500,
        isError: true,
      };
    }
  } catch (error) {
    // Handle network errors
    if (error instanceof NetworkError) {
      return {
        message: "Network error. Please check your connection and try again.",
        status: 0,
        isError: true,
      };
    } else {
      return {
        message: "An unexpected error occurred. Please try again later.",
        status: 0,
        isError: true,
      };
    }
  }
};
