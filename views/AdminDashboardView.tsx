import React, { useState, useMemo } from 'react';
import type { User } from '../types';

const ALL_USER_PROFILES_KEY = 'all_user_profiles_v1';

export const AdminDashboardView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all users from persistent storage (simulating a DB fetch)
  const registeredUsers = useMemo(() => {
    try {
        const stored = localStorage.getItem(ALL_USER_PROFILES_KEY);
        if (!stored) return [];
        const profiles: Record<string, User> = JSON.parse(stored);
        // Ensure we always return an array
        return Object.values(profiles);
    } catch (e) {
        console.error("Failed to load user profiles", e);
        return [];
    }
  }, []);

  const filteredUsers = useMemo(() => {
    return registeredUsers.filter(u => 
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [registeredUsers, searchTerm]);

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.split(' ').filter(p => p.length > 0);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
  };

  return (
      <div className="p-6 max-w-6xl mx-auto h-full overflow-y-auto bg-gray-950/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                    <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
                    Admin Dashboard
                </h1>
                <p className="text-gray-500 text-sm mt-2 uppercase tracking-[0.2em] font-bold">System Administration • {registeredUsers.length} Users</p>
              </div>
              
              <div className="w-full sm:w-80 relative group">
                  <input 
                    type="text" 
                    placeholder="Search by name, username or email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-3 px-12 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600 shadow-xl group-hover:border-gray-700"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
              </div>
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-gray-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                  <div className="px-8 py-6 border-b border-gray-800 bg-gray-900/40">
                      <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">User Statistics</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-gray-800/20">
                            <tr>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">User Profile</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Email Address</th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Questions Solved</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {filteredUsers.map((u, idx) => {
                                const solvedCount = new Set(u.submissions?.filter(s => s.status === 'Accepted').map(s => s.challengeId) || []).size;
                                
                                return (
                                    <tr key={idx} className="hover:bg-gray-800/20 transition-all group">
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[12px] font-black text-white mr-4 border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                                                    {u.avatarUrl ? (
                                                        <img src={u.avatarUrl} alt={u.name} className="h-full w-full rounded-2xl object-cover" />
                                                    ) : getInitials(u.name)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{u.name}</span>
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">@{u.username}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className="text-sm text-gray-400 font-medium font-mono">{u.email}</span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap text-center">
                                            <div className="inline-flex items-center justify-center min-w-[3rem] px-3 py-1 bg-green-500/10 text-green-400 text-xs font-black rounded-xl border border-green-500/20 shadow-sm">
                                                {solvedCount}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4 text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs italic">
                                                {searchTerm ? "No users matching your search criteria" : "The user directory is currently empty"}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                  </div>
              </div>
          </div>
      </div>
  );
};