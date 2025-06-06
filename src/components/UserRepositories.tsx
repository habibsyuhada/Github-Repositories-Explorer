import React, { useState, useCallback } from "react";
import type { GitHubRepository } from "../types/github";
import { getUserRepositories } from "../services/github";
import RepositoryCard from "./RepositoryCard";
import LoadingSpinner from "./LoadingSpinner";

interface UserRepositoriesProps {
  username: string;
  onClose: () => void;
}

const UserRepositories: React.FC<UserRepositoriesProps> = ({ username, onClose }) => {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadRepositories = useCallback(
    async (pageNum = 1, append = false) => {
      setIsLoading(true);
      setError(null);

      try {
        const repos = await getUserRepositories(username, pageNum, 8);

        if (append) {
          setRepositories((prev) => [...prev, ...repos]);
        } else {
          setRepositories(repos);
          setHasLoaded(true);
        }

        setHasMore(repos.length === 8);
        setPage(pageNum);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load repositories");
      } finally {
        setIsLoading(false);
      }
    },
    [username]
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      loadRepositories(page + 1, true);
    }
  };

  React.useEffect(() => {
    if (!hasLoaded) {
      loadRepositories(1, false);
    }
  }, [loadRepositories, hasLoaded]);
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl w-full h-full overflow-hidden shadow-2xl border border-gray-700/50">
        <div className="flex items-center justify-between p-6 lg:p-8 border-b border-gray-700/50">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Repositories</h2>
            <p className="text-gray-400 mt-2 text-lg">@{username}</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-700/50 rounded-lg transition-colors text-gray-400 hover:text-white">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>{" "}
        </div>

        <div className="p-6 lg:p-8 overflow-y-auto" style={{ height: "calc(100vh - 180px)" }}>
          {isLoading && !hasLoaded && <LoadingSpinner message="Loading repositories..." />}
          {error && (
            <div className="bg-gradient-to-r from-red-900/20 via-red-800/20 to-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-red-300">
                <div className="p-2 bg-red-500/20 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold">An Error Occurred:</span>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
          {!isLoading && !error && repositories.length === 0 && hasLoaded && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 opacity-30">📦</div> <h3 className="text-xl font-semibold text-gray-300 mb-2">No repositories</h3>
              <p className="text-gray-500">This user doesn't have any public repositories yet.</p>
            </div>
          )}{" "}
          {repositories.length > 0 && (
            <>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
                {repositories.map((repo) => (
                  <RepositoryCard key={repo.id} repository={repo} />
                ))}
              </div>

              {hasMore && (
                <div className="text-center">
                  <button onClick={handleLoadMore} disabled={isLoading} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Load More"
                    )}
                  </button>
                </div>
              )}

              {!hasMore && repositories.length > 0 && (
                <div className="text-center text-gray-400 text-sm">
                  <div className="flex items-center justify-center gap-2 opacity-50">
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
                    <span>All repositories have been loaded</span>
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRepositories;
