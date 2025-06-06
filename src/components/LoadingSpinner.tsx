import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-blue-400 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-300 text-lg font-medium">{message}</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
