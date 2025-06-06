import { useState, useCallback } from "react";
import type { GitHubUser } from "./types/github";
import { searchUsers } from "./services/github";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import LoadingSpinner from "./components/LoadingSpinner";
import EmptyState from "./components/EmptyState";
import UserRepositories from "./components/UserRepositories";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await searchUsers(searchQuery.trim());
      setUsers(response.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while searching for users");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.1),transparent_50%)]"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-4 animate-pulse">GitHub User Explorer</h1> <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">Discover and explore GitHub user profiles with ease. Enter a username to start searching and get complete information about your favorite developers.</p>
        </div>

        <div className="mb-12">
          <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="max-w-7xl mx-auto">
          {isLoading && <LoadingSpinner message="Searching GitHub users..." />}

          {error && (
            <div className="bg-gradient-to-r from-red-900/20 via-red-800/20 to-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
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

          {!isLoading && !error && hasSearched && users.length === 0 && <EmptyState message="No users found" description="Try using different search keywords or check the username spelling." icon="😔" />}

          {!isLoading && !error && !hasSearched && <EmptyState message="Start searching" description="Enter a GitHub username above to search for users." icon="🔍" />}

          {!isLoading && !error && users.length > 0 && (
            <>
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700/50 backdrop-blur-sm">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>{" "}
                  <span className="text-gray-300 text-sm">
                    Found <span className="font-semibold text-white">{users.length}</span> users for "<span className="font-semibold text-blue-400">{searchQuery}</span>"
                  </span>
                </div>
              </div>{" "}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} onViewRepositories={(username) => setSelectedUser(username)} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {selectedUser && <UserRepositories username={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}

export default App;
