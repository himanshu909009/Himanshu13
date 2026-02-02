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
  const [resetStep, setResetStep] = useState<'request' | 'sent' | 'reset'>('request');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
        const inputEmail = email.toLowerCase().trim();
        const inputPass = password.trim();
        
        const registeredUsers = getRegisteredUsers();
        const found = registeredUsers.find(u => u.email.toLowerCase() === inputEmail);

        if (found) {
            if (found.pass === inputPass) {
                onLogin(role, inputEmail, found.name);
                return;
            }
        }
        
        // Demo Fallbacks (Only if no registered user found with that email)
        if (inputEmail === 'user@example.com' && inputPass === 'user123' && role === 'user') {
            onLogin('user', inputEmail, 'Himanshu');
        } else if (inputEmail === 'admin@coderunner.com' && inputPass === 'admin123' && role === 'admin') {
            onLogin('admin', inputEmail, 'Admin');
        } else if (inputEmail === 'demo@coderunner.com' && inputPass === 'demo123') {
            onLogin(role, inputEmail, role === 'user' ? 'Demo User' : 'Admin');
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
      setResetStep('request');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-sans text-gray-200">
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[120px]" />
        </div>

        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl relative z-10 p-8">
            <div className="text-center mb-10">
                <div className="mx-auto h-12 w-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter">
                    {mode === 'register' ? 'Create Account' : mode === 'forgot-password' ? 'Reset Access' : 'CodeRunner Login'}
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                    {mode === 'register' ? 'Join thousands of developers' : 'Enter your credentials to continue'}
                </p>
            </div>

            {mode === 'login' && (
                <div className="flex bg-gray-800/50 p-1 rounded-lg mb-8 border border-gray-700/50">
                    <button onClick={() => setRole('user')} className={`flex-1 py-2 text-xs font-black rounded-md transition-all uppercase tracking-widest ${role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>User</button>
                    <button onClick={() => setRole('admin')} className={`flex-1 py-2 text-xs font-black rounded-md transition-all uppercase tracking-widest ${role === 'admin' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Admin</button>
                </div>
            )}

            {error && <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-xs text-center">{error}</div>}

            <form onSubmit={mode === 'register' ? handleRegisterSubmit : handleLoginSubmit} className="space-y-4">
                {mode === 'register' && (
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-sm" placeholder="Full Name" />
                )}
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-sm" placeholder="Email Address" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-sm" placeholder="Password" />
                {mode === 'register' && (
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-600 text-sm" placeholder="Confirm Password" />
                )}
                
                <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-blue-600/20 transition-all disabled:opacity-50 mt-4">
                    {isLoading ? 'Processing...' : (mode === 'register' ? 'Sign Up' : 'Login')}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col gap-3 text-center">
                <button onClick={() => switchToMode(mode === 'register' ? 'login' : 'register')} className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-widest">
                    {mode === 'register' ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                </button>
                {mode === 'login' && (
                    <button onClick={() => switchToMode('forgot-password')} className="text-[10px] text-gray-500 hover:text-gray-300 uppercase tracking-widest">
                        Forgot Password?
                    </button>
                )}
            </div>
        </div>
    </div>
  );
};