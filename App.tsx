import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CoursesView } from './views/DashboardView';
import { CompilerView } from './views/CompilerView';
import { ChallengeListView } from './views/ChallengeListView';
import { ChallengeEditorView } from './views/ChallengeEditorView';
import { LoginView } from './views/LoginView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { CPP_CHALLENGES, PRACTICE_LANGUAGES, INITIAL_USER, COURSE_DETAILS } from './constants';
import { ProblemsView } from './views/ProblemsView';
import { ProfileView } from './views/ProfileView';
import { CourseDetailView } from './views/CourseDetailView';
import { DaysOfCodeView } from './views/DaysOfCodeView';
import type { User, Challenge } from './types';

type View = 'courses' | 'compiler' | 'practice' | 'challengeList' | 'challengeEditor' | 'profile' | 'courseDetail' | 'admin' | 'login' | '100days';

const USER_SESSION_KEY = 'user_session_v1';
const ALL_USER_PROFILES_KEY = 'all_user_profiles_v1';
const CHALLENGES_STORAGE_KEY = 'all_challenges_v1';

function App() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(null);
  const [editorOrigin, setEditorOrigin] = useState<View | null>(null);
  
  const [user, setUser] = useState<User>(() => {
    try {
      const savedUserJSON = localStorage.getItem(USER_SESSION_KEY);
      if (savedUserJSON) {
        return JSON.parse(savedUserJSON);
      }
    } catch (error) {
      console.error('Error reading user session:', error);
    }
    return { ...INITIAL_USER, role: 'user' };
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
     return !!localStorage.getItem(USER_SESSION_KEY);
  });
  
  const [currentView, setCurrentView] = useState<View>(() => {
      const hasSession = !!localStorage.getItem(USER_SESSION_KEY);
      return hasSession ? 'courses' : 'login';
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
        const saved = localStorage.getItem(CHALLENGES_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            const savedIds = new Set(parsed.map((c: Challenge) => c.id));
            const defaultsToAdd = CPP_CHALLENGES.filter(c => !savedIds.has(c.id));
            return [...parsed, ...defaultsToAdd];
        }
    } catch (e) {
        console.error("Error loading challenges", e);
    }
    return CPP_CHALLENGES;
  });

  useEffect(() => {
    localStorage.setItem(CHALLENGES_STORAGE_KEY, JSON.stringify(challenges));
  }, [challenges]);

  const handleLogin = (role: 'admin' | 'user', email: string, name?: string, avatarUrl?: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    let profiles: Record<string, User> = {};
    
    try {
        const profilesStr = localStorage.getItem(ALL_USER_PROFILES_KEY);
        if (profilesStr) {
            profiles = JSON.parse(profilesStr);
        }
    } catch (e) {
        console.error("Error loading all profiles", e);
    }

    // Try to find existing persistent profile
    let targetUser = profiles[normalizedEmail];

    if (!targetUser) {
        // Create a completely new profile if one doesn't exist
        const derivedName = name || email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
        const derivedUsername = derivedName.toLowerCase().replace(/[^a-z0-9]/g, '');

        targetUser = {
            ...INITIAL_USER,
            name: derivedName,
            username: derivedUsername,
            email: normalizedEmail,
            avatarUrl: avatarUrl || '', // Initialized empty so we can use Initials UI
            role: role,
            submissions: [],
            stats: [
                { label: 'Rank', value: '-' },
                { label: 'Problems', value: 0 },
                { label: 'Points', value: 0 },
            ]
        };
        
        profiles[normalizedEmail] = targetUser;
        localStorage.setItem(ALL_USER_PROFILES_KEY, JSON.stringify(profiles));
    } else {
        // User exists, just ensure the role is updated for this session if needed
        targetUser.role = role;
    }

    setUser(targetUser);
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(targetUser));
    setIsLoggedIn(true);
    setCurrentView(role === 'admin' ? 'admin' : 'courses');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    localStorage.removeItem(USER_SESSION_KEY);
    setUser({...INITIAL_USER, role: 'user'});
  };

  const handleUserUpdate = (updatedUser: User) => {
    try {
      // 1. Update Session
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // 2. Update Persistent Store (profiles)
      const profilesStr = localStorage.getItem(ALL_USER_PROFILES_KEY);
      const profiles = profilesStr ? JSON.parse(profilesStr) : {};
      profiles[updatedUser.email.toLowerCase().trim()] = updatedUser;
      localStorage.setItem(ALL_USER_PROFILES_KEY, JSON.stringify(profiles));
    } catch (error) {
      console.error('Error syncing user data:', error);
      setUser(updatedUser);
    }
  };

  const handleAddChallenge = (newChallenge: Challenge) => {
    setChallenges(prev => [newChallenge, ...prev]);
  };

  const handleDeleteChallenge = (id: number) => {
    setChallenges(prev => prev.filter(c => c.id !== id));
  };

  const handleNavigate = (view: View, context?: string | number) => {
    if (view === 'challengeEditor') {
        setEditorOrigin(currentView);
    }
    setCurrentView(view);
    if ((view === 'challengeList' || view === 'courseDetail') && typeof context === 'string') {
      setSelectedCourse(context);
    } else if (view === 'challengeEditor' && typeof context === 'number') {
      const challenge = challenges.find(c => c.id === context);
      if(challenge) {
          const course = challenge.category.includes('C++') ? 'C++' : 'Algorithms';
          setSelectedCourse(course);
      }
      setSelectedChallengeId(context);
    } else if (view !== 'challengeEditor' && view !== 'challengeList' && view !== 'courseDetail') { 
      setSelectedCourse(null);
      setSelectedChallengeId(null);
    }
  };

  const renderView = () => {
    if (!isLoggedIn) return <LoginView onLogin={handleLogin} />;

    if (user.role === 'admin' && (currentView === 'courses' || currentView === 'practice')) {
        setCurrentView('admin');
        return null;
    }
    if (user.role === 'user' && currentView === 'admin') {
        setCurrentView('courses');
        return null;
    }

    switch (currentView) {
      case 'login':
        return <LoginView onLogin={handleLogin} />;
      case 'admin':
        return <AdminDashboardView 
            onAddChallenge={handleAddChallenge} 
            challenges={challenges}
            onDeleteChallenge={handleDeleteChallenge}
        />;
      case 'courses':
        return <CoursesView 
          user={user} 
          onCourseSelect={(courseTitle) => handleNavigate('challengeList', courseTitle)} 
        />;
      case 'practice':
        return <ProblemsView 
          user={user}
          onDaysOfCodeSelect={() => handleNavigate('100days')}
          onCourseSelect={(courseTitle) => {
            const courseKeyMap: Record<string, string> = {
                'Practice C++': 'C++',
                'Practice Python': 'Python',
            };
            const courseKey = courseKeyMap[courseTitle];
            
            if (courseKey && COURSE_DETAILS[courseKey]) {
                handleNavigate('courseDetail', courseKey);
            } else {
                handleNavigate('challengeList', courseTitle);
            }
        }} />;
      case 'compiler':
        return <CompilerView user={user} />;
      case 'profile':
        return <ProfileView user={user} onUserUpdate={handleUserUpdate} onNavigate={(view, id) => handleNavigate(view as View, id)} />;
      case 'challengeList':
        const backView: View = PRACTICE_LANGUAGES.some(p => p.name === selectedCourse) ? 'practice' : 'courses';
        return <ChallengeListView 
            user={user}
            courseTitle={selectedCourse || 'Challenges'} 
            challenges={challenges} 
            onBack={() => handleNavigate(backView)}
            onChallengeSelect={(challengeId) => handleNavigate('challengeEditor', challengeId)}
        />;
      case 'challengeEditor':
        const challenge = challenges.find(c => c.id === selectedChallengeId);
        if (challenge) {
            return <ChallengeEditorView 
                        challenge={challenge} 
                        user={user}
                        onUserUpdate={handleUserUpdate}
                        onBack={() => handleNavigate(editorOrigin || 'challengeList', selectedCourse)}
                    />;
        }
        return <div className="p-8 text-center text-white">Challenge Not Found</div>;
      case 'courseDetail':
        if (selectedCourse && COURSE_DETAILS[selectedCourse]) {
            return <CourseDetailView
                courseName={selectedCourse}
                user={user}
                onBack={() => handleNavigate('practice')}
                onProblemSelect={(challengeId) => handleNavigate('challengeEditor', challengeId)}
            />;
        }
        return <div className="p-8 text-center text-white">Course Not Found</div>;
      case '100days':
        return <DaysOfCodeView 
            user={user} 
            onBack={() => handleNavigate('practice')} 
            onChallengeSelect={(challengeId) => handleNavigate('challengeEditor', challengeId)}
        />;
      default:
        return <CompilerView user={user} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate as (view: string) => void}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-grow min-h-0">
        {renderView()}
      </main>
    </div>
  );
}

export default App;