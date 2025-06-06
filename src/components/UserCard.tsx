import React from "react";
import type { GitHubUser } from "../types/github";

interface UserCardProps {
  user: GitHubUser;
  onViewRepositories: (username: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewRepositories }) => {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Date not available";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
			console.error("Failed to format date:", error);
      return "Date not available";
    }
  };
  return (
    <div className="bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/90 rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <img src={user.avatar_url} alt={user.login} className="relative w-24 h-24 rounded-full border-3 border-gray-600 group-hover:border-transparent transition-all duration-300 shadow-lg" />
        </div>

        <div className="w-full space-y-3">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{user.name || user.login}</h3>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium hover:underline">
              <span>@{user.login}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>{" "}
          </div>
          <div className="min-h-[4.5rem] flex items-start justify-center px-2">{user.bio ? <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{user.bio}</p> : <p className="text-gray-500 text-sm italic opacity-50">No bio available</p>}</div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-gray-900/50 rounded-lg p-3 text-center">
              <div className="text-blue-400 text-2xl mb-1">📦</div>
              <div className="text-white font-semibold">{user.public_repos}</div>
              <div className="text-gray-400 text-xs">Repos</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 text-center">
              <div className="text-green-400 text-2xl mb-1">👥</div>
              <div className="text-white font-semibold">{user.followers}</div>
              <div className="text-gray-400 text-xs">Followers</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 text-center">
              <div className="text-purple-400 text-2xl mb-1">🔗</div>
              <div className="text-white font-semibold">{user.following}</div>
              <div className="text-gray-400 text-xs">Following</div>
            </div>
          </div>{" "}
          <div className="space-y-2 text-xs text-gray-400 pt-3 border-t border-gray-700/50 min-h-[5rem] flex flex-col justify-start">
            <div className="flex items-center justify-center gap-2">
              <span className="text-indigo-400">📅</span>
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              {user.location ? (
                <>
                  <span className="text-red-400">📍</span>
                  <span>{user.location}</span>
                </>
              ) : (
                <span className="opacity-0">📍 Location not available</span>
              )}
            </div>
            <div className="flex items-center justify-center gap-2">
              {user.company ? (
                <>
                  <span className="text-yellow-400">🏢</span>
                  <span>{user.company}</span>
                </>
              ) : (
                <span className="opacity-0">🏢 Company not available</span>
              )}
            </div>
          </div>
          <div className="pt-4">
            {" "}
            <button onClick={() => onViewRepositories(user.login)} className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                </svg>
                <span>View Repository ({user.public_repos})</span>
              </div>
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
