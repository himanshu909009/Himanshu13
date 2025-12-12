
import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (role: 'admin' | 'user', email: string, name?: string, avatarUrl?: string, shouldReset?: boolean) => void;
}

// Default immutable credentials for demo purposes
const DEFAULT_CREDS = {
    user: { email: 'himanshun102@gmail.com', pass: 'user123' },
    admin: { email: 'admin@coderunner.com', pass: 'admin123' },
    universal: { email: 'demo@coderunner.com', pass: 'demo123' }
};

const REGISTERED_USERS_KEY = 'registered_users';

interface RegisteredUser {
    email: string;
    pass: string;
    name: string;
}

// Helper to interact with persistent storage
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
    // Normalize email to ensure uniqueness
    const normalizedEmail = user.email.toLowerCase().trim();
    
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);
    // Explicitly overwrite pass and name
    const userToSave = { 
        email: normalizedEmail,
        pass: user.pass,
        name: user.name
    };

    if (existingIndex >= 0) {
        users[existingIndex] = userToSave;
    } else {
        users.push(userToSave);
    }
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

type LoginMode = 'login' | 'register' | 'forgot-password';

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [mode, setMode] = useState<LoginMode>('login');
  
  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration
  
  // Forgot Password Flow States
  const [resetStep, setResetStep] = useState<'request' | 'sent' | 'reset'>('request');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate API Latency
    setTimeout(() => {
        const normalizedInputEmail = email.toLowerCase().trim();
        let valid = false;
        let loginName = name; // From state, usually empty on login

        // 1. Check Default User
        if (role === 'user' && normalizedInputEmail === DEFAULT_CREDS.user.email && password === DEFAULT_CREDS.user.pass) {
            valid = true;
            loginName = 'Himanshu';
        } 
        
        // 2. Check Default Admin
        else if (role === 'admin' && normalizedInputEmail === DEFAULT_CREDS.admin.email && password === DEFAULT_CREDS.admin.pass) {
            valid = true;
        }

        // 3. Check Universal Creds (Works for both roles)
        else if (normalizedInputEmail === DEFAULT_CREDS.universal.email && password === DEFAULT_CREDS.universal.pass) {
            valid = true;
            if (role === 'user') loginName = 'Demo User';
        }

        // 4. Check Registered Users (LocalStorage)
        else {
            const registeredUsers = getRegisteredUsers();
            // Strict match on normalized email and password
            const foundUser = registeredUsers.find(u => u.email.toLowerCase() === normalizedInputEmail && u.pass === password);
            
            if (foundUser) {
                // If found, ensure they are logging in to the correct role interface
                if (role === 'user') {
                    valid = true;
                    loginName = foundUser.name;
                } else {
                    setError('This account is registered as a User. Please switch to the User Login tab.');
                    setIsLoading(false);
                    return;
                }
            }
        }

        if (valid) {
            onLogin(role, email, loginName);
        } else {
            // Detailed Error Handling for specific wrong-tab scenarios
            if (password === DEFAULT_CREDS.admin.pass && role === 'user') {
                 setError('These are Admin credentials. Please switch to the Admin Login tab.');
            } 
            else if ((password === DEFAULT_CREDS.user.pass) && role === 'admin') {
                 setError('These are User credentials. Please switch to the User Login tab.');
            } else {
                setError('Incorrect email or password. Please try again.');
            }
            setIsLoading(false);
        }
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
      }
      if (password.length < 4) {
          setError("Password must be at least 4 characters.");
          return;
      }

      setIsLoading(true);

      // Simulate Account Creation API
      setTimeout(() => {
          // Save to persistent storage immediately
          saveRegisteredUser({
              email: email,
              pass: password,
              name: name
          });

          // Log them in immediately
          onLogin('user', email, name);
      }, 1000);
  };

  const handleForgotPasswordRequest = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      // Simulate sending email
      setTimeout(() => {
          setIsLoading(false);
          setResetStep('sent');
      }, 1200);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      
      if (newPassword !== confirmPassword) {
          setError("Passwords do not match.");
          return;
      }
      if (newPassword.length < 4) {
          setError("Password must be at least 4 characters.");
          return;
      }

      setIsLoading(true);
      
      setTimeout(() => {
          // Update credentials in storage if user exists
          const users = getRegisteredUsers();
          const normalizedEmail = email.toLowerCase().trim();
          const userIndex = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);
          
          if (userIndex >= 0) {
              users[userIndex].pass = newPassword;
              localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
          }
          // Note: We don't update DEFAULT_CREDS to prevent locking out the demo.

          setIsLoading(false);
          setSuccessMessage("Password reset successful! You can now login with your new password.");
          
          // Reset state and go back to login after a delay
          setTimeout(() => {
              switchToMode('login');
              setSuccessMessage(null);
          }, 1500);
      }, 1000);
  };

  const switchToMode = (newMode: LoginMode) => {
      setMode(newMode);
      setResetStep('request');
      setError(null);
      setSuccessMessage(null);
      // Clear sensitive fields but keep email if possible for UX
      if (newMode !== 'forgot-password' && mode !== 'forgot-password') {
          setPassword('');
      }
      setNewPassword('');
      setConfirmPassword('');
      if (newMode !== 'register') {
        setName('');
      }
  };

  const renderForgotPasswordContent = () => {
      if (resetStep === 'sent') {
          return (
            <div className="text-center animate-fade-in">
                <div className="bg-green-900/30 border border-green-800 text-green-300 p-4 rounded-lg mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="font-medium text-lg">Check your email</p>
                    <p className="text-sm mt-2 opacity-90">We've sent a password reset link to <br/><strong>{email}</strong>.</p>
                </div>
                
                <div className="mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-500 uppercase mb-2 font-bold tracking-wider">Developer Simulation</p>
                    <button
                        onClick={() => setResetStep('reset')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium underline flex items-center justify-center w-full"
                    >
                        <span>(Demo) Click here to open Link</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                    </button>
                </div>

                <button 
                    onClick={() => switchToMode('login')}
                    className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-all"
                >
                    Back to Login
                </button>
            </div>
          );
      }

      if (resetStep === 'reset') {
          return (
            <form onSubmit={handlePasswordReset} className="space-y-5 animate-fade-in">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">New Password</label>
                    <input 
                        type="password" 
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-4 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 transition-all outline-none"
                        placeholder="••••••••"
                        minLength={4}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
                    <input 
                        type="password" 
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-4 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 transition-all outline-none"
                        placeholder="••••••••"
                        minLength={4}
                    />
                </div>
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Updating...' : 'Set New Password'}
                </button>
                 <button 
                    type="button"
                    onClick={() => switchToMode('login')}
                    className="w-full py-2.5 text-gray-400 hover:text-white text-sm font-medium transition-colors"
                >
                    Cancel
                </button>
            </form>
          );
      }

      // Request Step (Enter Email)
      return (
        <form onSubmit={handleForgotPasswordRequest} className="space-y-5 animate-fade-in">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 transition-all outline-none"
                    placeholder="name@example.com"
                />
            </div>
            <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
                <button 
                type="button"
                onClick={() => switchToMode('login')}
                className="w-full py-2.5 text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
                Cancel
            </button>
        </form>
      );
  };

  const renderHeader = () => {
      if (mode === 'forgot-password') {
          return {
              title: resetStep === 'reset' ? 'Reset Password' : 'Forgot Password',
              subtitle: resetStep === 'sent' ? 'Link sent to your inbox' : (resetStep === 'reset' ? 'Create a new strong password' : 'Enter your email to receive a link')
          };
      }
      if (mode === 'register') {
          return {
              title: 'Create an account',
              subtitle: 'Start your coding journey today.'
          };
      }
      return {
          title: 'Sign in to CodeRunner',
          subtitle: 'Welcome back! Please enter your details.'
      };
  };

  const headerContent = renderHeader();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden font-sans text-gray-200">
        {/* Minimal Tech Background */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
             {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl relative z-10 transition-all duration-500">
            <div className="p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {headerContent.title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {headerContent.subtitle}
                    </p>
                </div>

                {mode === 'login' && (
                    <div className="flex bg-gray-800/50 p-1 rounded-lg mb-6">
                        <button 
                            onClick={() => { setRole('user'); setError(null); }}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'user' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                            User Login
                        </button>
                        <button 
                            onClick={() => { setRole('admin'); setError(null); }}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'admin' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                            Admin Login
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm flex items-center animate-[shake_0.5s_ease-in-out]">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-900/30 border border-green-800 rounded-lg text-green-300 text-sm flex items-center animate-fade-in">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {successMessage}
                    </div>
                )}

                {mode === 'forgot-password' ? renderForgotPasswordContent() : (
                    <>
                        <form onSubmit={mode === 'register' ? handleRegisterSubmit : handleLoginSubmit} className="space-y-5 animate-fade-in">
                            {mode === 'register' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input 
                                            type="text" 
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 transition-all outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <input 
                                        type="email" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 transition-all outline-none"
                                        placeholder={mode === 'login' && role === 'admin' ? "admin@coderunner.com" : "himanshun102@gmail.com"}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input 
                                        type="password" 
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 transition-all outline-none"
                                        placeholder="••••••••"
                                        minLength={4}
                                    />
                                </div>
                                {mode === 'login' && (
                                    <div className="flex justify-between mt-2 items-center">
                                        <span className="text-xs text-gray-500">
                                            Tip: Use '{DEFAULT_CREDS.universal.pass}' for both roles.
                                        </span>
                                        <button 
                                            type="button" 
                                            onClick={() => switchToMode('forgot-password')}
                                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}
                            </div>

                            {mode === 'register' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input 
                                            type="password" 
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 transition-all outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            )}

                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-600 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    mode === 'register' ? 'Create Account' : (role === 'admin' ? 'Login to Dashboard' : 'Login to Account')
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            {mode === 'login' ? (
                                <p className="text-sm text-gray-400">
                                    New here?{' '}
                                    <button 
                                        onClick={() => switchToMode('register')}
                                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                                    >
                                        Create an account
                                    </button>
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400">
                                    Already have an account?{' '}
                                    <button 
                                        onClick={() => switchToMode('login')}
                                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  );
};
