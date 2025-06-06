import React from "react";
import type { GitHubRepository } from "../types/github";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
			console.error("Failed to format date:", error);
      return "Date not available";
    }
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      Java: "bg-red-500",
      "C++": "bg-purple-500",
      "C#": "bg-indigo-500",
      PHP: "bg-blue-600",
      Ruby: "bg-red-600",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
      Swift: "bg-orange-500",
      Kotlin: "bg-purple-600",
      Dart: "bg-blue-400",
      HTML: "bg-orange-400",
      CSS: "bg-blue-400",
      Shell: "bg-gray-500",
    };
    return colors[language || ""] || "bg-gray-400";
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/90 rounded-xl p-5 border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-0.5">
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold text-lg truncate block">
              {repository.name}
            </a>
            {repository.fork && (
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z" />
                </svg>
                <span className="text-xs text-gray-400">Fork</span>
              </div>
            )}
          </div>
          {repository.private && (
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-md">
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 4v2h-.25A1.75 1.75 0 002 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-5.5A1.75 1.75 0 0012.25 6H12V4a4 4 0 10-8 0zm6.5 2V4a2.5 2.5 0 00-5 0v2h5z" />
              </svg>
              <span className="text-xs text-yellow-400 font-medium">Private</span>
            </div>
          )}
        </div>

        <div className="flex-1 mb-4">{repository.description ? <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{repository.description}</p> : <p className="text-gray-500 text-sm italic">No description available</p>}</div>

        {repository.topics && repository.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {repository.topics.slice(0, 3).map((topic) => (
              <span key={topic} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                {topic}
              </span>
            ))}
            {repository.topics.length > 3 && <span className="px-2 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-full">+{repository.topics.length - 3}</span>}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-4">
            {repository.language && (
              <div className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`}></div>
                <span>{repository.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              <span>{repository.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z" />
              </svg>
              <span>{repository.forks_count}</span>
            </div>
          </div>
          <span>Updated {formatDate(repository.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
