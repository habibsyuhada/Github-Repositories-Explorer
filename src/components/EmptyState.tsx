import React from 'react';

interface EmptyStateProps {
  message: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-8">
        <div className="text-8xl opacity-30 animate-pulse">
          {icon || '🔍'}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-gray-900/20 rounded-full"></div>
      </div>
      <div className="text-center max-w-lg mx-auto">
        <h3 className="text-2xl font-bold text-gray-200 mb-3">{message}</h3>
        {description && (
          <p className="text-gray-400 leading-relaxed text-lg">{description}</p>
        )}
      </div>
      <div className="mt-8 flex items-center gap-2 opacity-50">
        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default EmptyState;
