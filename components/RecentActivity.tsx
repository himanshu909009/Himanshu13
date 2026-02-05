import React from 'react';
import type { RecentActivityItem } from '../types';

interface RecentActivityProps {
    activities: RecentActivityItem[];
    onActivitySelect: (challengeId: number) => void;
}

const statusStyles: Record<RecentActivityItem['status'], string> = {
  'Accepted': 'text-green-500',
  'Wrong Answer': 'text-red-500',
  'Time Limit Exceeded': 'text-yellow-500',
};

function formatTimeAgo(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `just now`;
    
    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)} years ago`;
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)} months ago`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} days ago`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} hours ago`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} minutes ago`;
    
    return `${Math.floor(seconds)} seconds ago`;
}

const ActivityItem: React.FC<{ item: RecentActivityItem; onSelect: (challengeId: number) => void; }> = ({ item, onSelect }) => (
  <button 
    onClick={() => onSelect(item.challengeId)}
    className="w-full flex items-center justify-between p-6 group hover:bg-gray-700/30 transition-all border-b border-gray-800 last:border-b-0 text-left"
    aria-label={`View submission for ${item.title}`}
  >
    <div className="flex flex-col gap-1">
      <p className="text-white font-black text-lg tracking-tight group-hover:text-blue-400 transition-colors">{item.title}</p>
      <p className={`text-sm font-bold uppercase tracking-widest ${statusStyles[item.status]}`}>{item.status}</p>
    </div>
    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex-shrink-0 ml-4">{formatTimeAgo(item.timestamp)}</span>
  </button>
);

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities, onActivitySelect }) => {
  return (
    <div className="bg-[#0d1117] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-800 bg-gray-900/20">
        <h3 className="text-lg font-black text-white tracking-tight uppercase tracking-widest">Recent Activity</h3>
      </div>
      <div className="flex flex-col">
        {activities.length > 0 ? (
            activities.map(activity => (
              <ActivityItem key={activity.id} item={activity} onSelect={onActivitySelect} />
            ))
        ) : (
            <div className="p-12 text-center text-gray-600 font-bold uppercase tracking-widest text-sm italic">
                No recent activity recorded
            </div>
        )}
      </div>
    </div>
  );
};