import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };
  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-2xl">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter GitHub username..."
              className="w-full px-5 py-4 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:bg-gray-800 transition-all duration-300 text-lg group-hover:border-gray-500"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg
                className={`w-6 h-6 transition-colors duration-300 ${
                  value.trim() ? 'text-blue-400' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !value.trim()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/25"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
