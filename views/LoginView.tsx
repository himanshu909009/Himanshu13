import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (role: 'admin' | 'user', email: string, name?: string, avatarUrl?: string) => void;
}

const REGISTERED_USERS_KEY = 'registered_users_v1';

interface RegisteredUser {
    email: string;
    pass: string;
    name: string;
}

const getRegisteredUsers = (): RegisteredUser[] => {
    try {
        const stored = localStorage.getItem(REGISTERED_USERS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

const saveRegisteredUser = (user: RegisteredUser) => {
    const users = getRegisteredUsers();
    const normalizedEmail = user.email.toLowerCase().trim();
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);
    const userToSave = { 
        email: normalizedEmail,
        pass: user.pass.trim(),
        name: user.name.trim()
    };
    if (existingIndex >= 0) users[existingIndex] = userToSave;
    else users.push(userToSave);
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

type LoginMode = 'login' | 'register' | 'forgot-password';

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [mode, setMode] = useState<LoginMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
        const inputEmail = email.toLowerCase().trim();
        const inputPass = password.trim();
        
        // Priority: Direct Admin Credential Check
        if (role === 'admin' && inputEmail === 'admin@coderunner.com' && inputPass === 'admin123') {
            onLogin('admin', inputEmail, 'System Admin');
            return;
        }

        const registeredUsers = getRegisteredUsers();
        const found = registeredUsers.find(u => u.email.toLowerCase() === inputEmail);

        if (found) {
            if (found.pass === inputPass) {
                // Check if user is trying to login with wrong role (optional strictness)
                onLogin(role, inputEmail, found.name);
                return;
            }
        }
        
        // Demo Fallback for User
        if (role === 'user' && inputEmail === 'user@example.com' && inputPass === 'user123') {
            onLogin('user', inputEmail, 'Himanshu');
        } else {
            setError('Invalid credentials. Please check your email and password.');
            setIsLoading(false);
        }
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) { setError("Passwords do not match."); return; }
      if (password.length < 4) { setError("Password too short."); return; }
      setIsLoading(true);
      setTimeout(() => {
          saveRegisteredUser({ email, pass: password, name });
          onLogin('user', email, name);
      }, 1000);
  };

  const switchToMode = (m: LoginMode) => {
      setMode(m);
      setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-sans text-gray-200">
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[120px]" />
        </div>

        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl relative z-10 p-10">
            <div className="text-center mb-10">
                <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>
                <h2 className="text-4xl font-black text-white tracking-tighter">
                    {mode === 'register' ? 'Join Us' : mode === 'forgot-password' ? 'Reset' : 'CodeRunner'}
                </h2>
                <p className="text-gray-500 text-sm mt-3 font-medium uppercase tracking-widest">
                    {mode === 'register' ? 'Create your programmer profile' : 'Secure Authentication System'}
                </p>
            </div>

            {mode === 'login' && (
                <div className="flex bg-gray-800/40 p-1.5 rounded-2xl mb-8 border border-gray-700/30">
                    <button onClick={() => setRole('user')} className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all uppercase tracking-[0.2em] ${role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>User</button>
                    <button onClick={() => setRole('admin')} className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all uppercase tracking-[0.2em] ${role === 'admin' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Admin</button>
                </div>
            )}

            {error && <div className="mb-6 p-4 bg-red-900/20 border border-red-800/50 rounded-2xl text-red-400 text-[11px] font-bold text-center animate-pulse">{error}</div>}

            <form onSubmit={mode === 'register' ? handleRegisterSubmit : handleLoginSubmit} className="space-y-5">
                {mode === 'register' && (
                    <div className="relative">
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-800/30 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-sm font-medium" placeholder="Full Name" />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                )}
                <div className="relative">
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-800/30 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-sm font-medium" placeholder="Email Address" />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="relative">
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-800/30 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-sm font-medium" placeholder="Password" />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                {mode === 'register' && (
                    <div className="relative">
                        <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-800/30 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-sm font-medium" placeholder="Confirm Password" />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                )}
                
                <button type="submit" disabled={isLoading} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-blue-600/30 transition-all disabled:opacity-50 mt-4 active:scale-95">
                    {isLoading ? 'Verifying...' : (mode === 'register' ? 'Create Account' : 'Sign In')}
                </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col gap-4 text-center">
                <button onClick={() => switchToMode(mode === 'register' ? 'login' : 'register')} className="text-[11px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-[0.15em] transition-colors">
                    {mode === 'register' ? 'Already have an account? Login' : 'New here? Register a profile'}
                </button>
                {mode === 'login' && (
                    <button onClick={() => switchToMode('forgot-password')} className="text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-widest transition-colors">
                        Forgot Password?
                    </button>
                )}
            </div>
        </div>
    </div>
  );
};