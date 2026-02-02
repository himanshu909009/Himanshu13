import React, { useState, useRef, useEffect, useMemo } from 'react';
import { RecentActivity } from '../components/RecentActivity';
import type { User } from '../types';

interface ProfileViewProps {
  user: User;
  onUserUpdate: (user: User) => void;
  onNavigate: (view: string, context: number) => void;
}

const DetailItem: React.FC<{ icon: React.ReactNode; text?: string; placeholder?: string }> = ({ icon, text, placeholder }) => (
    <div className="flex items-center text-base text-gray-300">
        <div className="flex-shrink-0 w-5 h-5">{icon}</div>
        <span className={`ml-4 truncate ${!text ? 'text-gray-500 italic' : ''}`}>{text || placeholder || 'Not specified'}</span>
    </div>
);

const DetailInputItem: React.FC<{ icon: React.ReactNode; value?: string; name: string; type?: string; placeholder: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ icon, value, name, type = 'text', placeholder, onChange }) => (
     <div className="flex items-center bg-gray-700 rounded-md p-2">
        <div className="flex-shrink-0 w-5 h-5">{icon}</div>
        <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent text-white ml-4 focus:outline-none"
        />
    </div>
);

export function ProfileView({ user, onUserUpdate, onNavigate }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const displayStats = useMemo(() => {
    const solvedCount = new Set(user.submissions.filter(s => s.status === 'Accepted').map(s => s.challengeId)).size;
    return user.stats.map(stat => stat.label === 'Problems' ? { ...stat, value: solvedCount } : stat);
  }, [user.stats, user.submissions]);

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.split(' ').filter(p => p.length > 0);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleSave = () => {
    onUserUpdate(editedUser);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setEditedUser({ ...editedUser, avatarUrl: reader.result as string });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const MailIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
  const CollegeIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
  const CourseIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 16c1.255 0 2.443-.29 3.5-.804V4.804zM14.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 0114.5 16c1.255 0 2.443-.29 3.5-.804v-10A7.968 7.968 0 0014.5 4z" /></svg>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-gray-800 p-8 rounded-2xl text-center relative border border-gray-700 shadow-xl">
                {isEditing ? (
                    <div className="space-y-4">
                        <div className="relative inline-block mx-auto mb-4">
                            {editedUser.avatarUrl ? (
                                <img className="w-24 h-24 rounded-full object-cover border-4 border-gray-700" src={editedUser.avatarUrl} alt={editedUser.name} />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-3xl font-black text-white border-4 border-gray-700">{getInitials(editedUser.name)}</div>
                            )}
                            <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-1 -right-1 bg-blue-600 p-2 rounded-full text-white shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
                            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                        </div>
                        <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} className="w-full bg-gray-700 text-white rounded-lg p-3 text-center font-bold" placeholder="Your Name" />
                    </div>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg></button>
                        <div className="mx-auto mb-6">
                            {user.avatarUrl ? (
                                <img className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-700 shadow-xl" src={user.avatarUrl} alt={user.name} />
                            ) : (
                                <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-3xl font-black text-white border-4 border-gray-700 shadow-xl">{getInitials(user.name)}</div>
                            )}
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight">{user.name}</h1>
                        <p className="text-gray-500 font-medium mt-1">@{user.username}</p>
                    </>
                )}
                
                <div className="grid grid-cols-3 gap-2 text-center my-8 bg-gray-900/40 p-4 rounded-xl border border-gray-700/50">
                    {displayStats.map(stat => (
                        <div key={stat.label}>
                            <p className="text-xl font-black text-white">{stat.value}</p>
                            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="text-left space-y-4 pt-4">
                    {isEditing ? (
                        <>
                           <DetailInputItem icon={MailIcon} value={editedUser.email} name="email" type="email" placeholder="Email" onChange={handleInputChange} />
                           <DetailInputItem icon={CollegeIcon} value={editedUser.college} name="college" placeholder="College/University" onChange={handleInputChange} />
                           <DetailInputItem icon={CourseIcon} value={editedUser.course} name="course" placeholder="Course/Major" onChange={handleInputChange} />
                        </>
                    ) : (
                        <>
                            <DetailItem text={user.email} icon={MailIcon} />
                            <DetailItem text={user.college} icon={CollegeIcon} placeholder="Add College" />
                            <DetailItem text={user.course} icon={CourseIcon} placeholder="Add Course" />
                        </>
                    )}
                </div>

                {isEditing && (
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => { setIsEditing(false); setEditedUser(user); }} className="flex-1 bg-gray-700 text-gray-300 font-bold py-2.5 rounded-xl hover:bg-gray-650 transition text-sm">Cancel</button>
                      <button onClick={handleSave} className="flex-1 bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-500 transition shadow-lg shadow-blue-600/20 text-sm">Save Changes</button>
                    </div>
                )}
            </div>
          </div>

          <div className="lg:w-3/4">
            <RecentActivity activities={user.submissions} onActivitySelect={onNavigate.bind(null, 'challengeEditor')} />
          </div>
        </div>
      </div>
    </div>
  );
}