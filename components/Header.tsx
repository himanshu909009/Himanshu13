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
        ? 'bg-gray-800 text-white'
        : 'text-gray-400 hover:text-white'
    }`}
  >
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, user, onLogout }) => {
  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.split(' ').filter(p => p.length > 0);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-sm sticky top-0 z-50">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('courses')}>
                <span className="text-white font-black text-2xl tracking-tighter">CODE<span className="text-blue-500">RUNNER</span></span>
                {user.role === 'admin' && <span className="ml-2 px-2 py-0.5 bg-purple-900 text-purple-200 text-[10px] rounded uppercase tracking-widest font-bold">Admin</span>}
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
                <button 
                  onClick={() => onNavigate('profile')} 
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity p-1.5 rounded-lg hover:bg-gray-800"
                  aria-label="View profile"
                >
                    {user.avatarUrl ? (
                        <img
                            className="h-8 w-8 rounded-full object-cover border border-gray-700"
                            src={user.avatarUrl}
                            alt={`${user.name}'s profile picture`}
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-700 flex items-center justify-center text-[11px] font-black text-white border border-purple-400/30 shadow-inner">
                            {getInitials(user.name)}
                        </div>
                    )}
                    <span className="text-sm font-semibold text-gray-200">{user.name}</span>
                </button>
                <div className="h-6 w-px bg-gray-800 mx-1"></div>
                <button
                    onClick={onLogout}
                    className="text-[10px] font-black text-gray-400 hover:text-white border border-gray-700 px-4 py-2 rounded-lg hover:bg-red-900/10 hover:border-red-900/30 transition-all uppercase tracking-widest"
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