
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
import type { User, Challenge } from './types';

type View = 'courses' | 'compiler' | 'practice' | 'challengeList' | 'challengeEditor' | 'profile' | 'courseDetail' | 'admin' | 'login';

const USER_STORAGE_KEY = 'userProfile';
const CHALLENGES_STORAGE_KEY = 'allChallenges';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>('login');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(null);
  const [editorOrigin, setEditorOrigin] = useState<View | null>(null);
  
  const [user, setUser] = useState<User>(() => {
    try {
      const savedUserJSON = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUserJSON) {
        const parsedUser = JSON.parse(savedUserJSON);
        if (!parsedUser.submissions) {
          parsedUser.submissions = INITIAL_USER.submissions;
        }
        // Default role to user if not present
        if (!parsedUser.role) {
            parsedUser.role = 'user';
        }
        return parsedUser;
      }
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
    }
    return { ...INITIAL_USER, role: 'user' };
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
        const saved = localStorage.getItem(CHALLENGES_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge default challenges with saved ones to ensure defaults always exist but duplicates are handled
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
    const derivedName = name || email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    
    const updatedUser = { 
        ...user, 
        role,
        email,
        name: derivedName,
        username: derivedName.toLowerCase().replace(/\s/g, ''),
        avatarUrl: avatarUrl || user.avatarUrl
    };

    setUser(updatedUser);
    handleUserUpdate(updatedUser);
    setIsLoggedIn(true);
    setCurrentView(role === 'admin' ? 'admin' : 'courses');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  const handleUserUpdate = (updatedUser: User) => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
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
      // When navigating to the editor, find the associated course title to preserve breadcrumbs
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

    // Role-based routing guard
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
        return <CompilerView />;
      case 'profile':
        return <ProfileView user={user} onUserUpdate={handleUserUpdate} onNavigate={(view, id) => handleNavigate(view as View, id)} />;
      case 'challengeList':
        const allPracticeProblems = [...PRACTICE_LANGUAGES];
        const cameFromPractice = allPracticeProblems.some(p => p.name === selectedCourse);
        const backView: View = cameFromPractice ? 'practice' : 'courses';

        // For demonstration, we filter challenges loosely based on the course title if needed.
        
        return <ChallengeListView 
            user={user}
            courseTitle={selectedCourse || 'Challenges'} 
            challenges={challenges} 
            onBack={() => handleNavigate(backView)}
            onChallengeSelect={(challengeId) => handleNavigate('challengeEditor', challengeId)}
        />;

      case 'challengeEditor':
        const challenge = challenges.find(c => c.id === selectedChallengeId);
        const handleBack = () => {
            const backView = editorOrigin || 'challengeList';
            handleNavigate(backView as View, selectedCourse);
        };
        if (challenge) {
            return <ChallengeEditorView 
                        challenge={challenge} 
                        user={user}
                        onUserUpdate={handleUserUpdate}
                        onBack={handleBack} 
                    />;
        }
        return (
             <div className="p-8 text-center">
                <h1 className="text-xl font-bold">Challenge Not Found</h1>
                <button onClick={handleBack} className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Back to List
                </button>
            </div>
        );
      case 'courseDetail':
        if (selectedCourse && COURSE_DETAILS[selectedCourse]) {
            return <CourseDetailView
                courseName={selectedCourse}
                user={user}
                onBack={() => handleNavigate('practice')}
                onProblemSelect={(challengeId) => handleNavigate('challengeEditor', challengeId)}
            />;
        }
        return (
             <div className="p-8 text-center">
                <h1 className="text-xl font-bold">Course Details Not Found</h1>
                <button onClick={() => handleNavigate('practice')} className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Back to Practice
                </button>
            </div>
        );
      default:
        return <CompilerView />;
    }
  };

  if (!isLoggedIn) {
      return <LoginView onLogin={handleLogin} />;
  }

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
