import type { GitHubUser, GitHubSearchResponse, GitHubRepository } from "../types/github";

const BASE_URL = "https://api.github.com";

export const searchUsers = async (query: string): Promise<GitHubSearchResponse> => {
  const response = await fetch(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to search users");
  }

  const searchResult = await response.json();
  const usersWithDetails = await Promise.all(
    searchResult.items.slice(0, 5).map(async (user: Pick<GitHubUser, 'login' | 'name'>) => {
      try {
        const detailedUser = await getUser(user.login);
        return detailedUser;
      } catch (error) {
				console.error("Error fetching user details:", error);
        return {
          ...user,
          name: user.name || null,
          bio: null,
          public_repos: 0,
          followers: 0,
          following: 0,
          location: null,
          blog: null,
          company: null,
          created_at: null,
        };
      }
    })
  );

  return {
    ...searchResult,
    items: usersWithDetails,
  };
};

export const getUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(`${BASE_URL}/users/${username}`);

  if (!response.ok) {
    throw new Error("User not found");
  }

  return response.json();
};

export const getUserRepositories = async (username: string, page = 1, perPage = 6): Promise<GitHubRepository[]> => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated&type=owner`);

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
};
