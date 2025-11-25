
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  user: User;
  onLogout: () => void;
}

const NavLink: React.FC<{
  view: string;
  currentView: string;
  onNavigate: (view: string) => void;
  children: React.ReactNode;
}> = ({ view, currentView, onNavigate, children }) => (
  <button
    onClick={() => onNavigate(view)}
    className={`px-4 py-2 rounded-lg font-medium transition ${
      currentView === view
        ? 'bg-gray-900 text-white text-base'
        : 'text-gray-400 hover:text-white text-base'
    }`}
  >
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, user, onLogout }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
                <span className="text-white font-bold text-2xl">CodeRunner</span>
                {user.role === 'admin' && <span className="ml-2 px-2 py-0.5 bg-purple-900 text-purple-200 text-xs rounded-full uppercase tracking-wider">Admin</span>}
            </div>
            {user.role === 'user' && (
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-2">
                    <NavLink view="courses" currentView={currentView} onNavigate={onNavigate}>Courses</NavLink>
                    <NavLink view="practice" currentView={currentView} onNavigate={onNavigate}>Practice</NavLink>
                    <NavLink view="compiler" currentView={currentView} onNavigate={onNavigate}>Compiler</NavLink>
                  </div>
                </div>
            )}
            {user.role === 'admin' && (
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-2">
                        <NavLink view="admin" currentView={currentView} onNavigate={onNavigate}>Dashboard</NavLink>
                        <NavLink view="compiler" currentView={currentView} onNavigate={onNavigate}>Compiler</NavLink>
                    </div>
                </div>
            )}
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 gap-4">
                <div className="flex items-center">
                    <button 
                      onClick={() => onNavigate('profile')} 
                      className="p-1 bg-gray-800 rounded-full text-gray-400 hover:text-white focus:outline-none flex items-center gap-2 mr-2"
                      aria-label="View profile"
                    >
                        <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={user.avatarUrl}
                            alt={`${user.name}'s profile picture`}
                        />
                        <span className="text-sm font-medium text-white">{user.name}</span>
                    </button>
                </div>
                <button
                    onClick={onLogout}
                    className="text-sm text-gray-400 hover:text-white border border-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition"
                >
                    Logout
                </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
