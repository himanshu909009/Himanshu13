
import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (role: 'admin' | 'user', email: string, name?: string, avatarUrl?: string) => void;
}

// Default immutable credentials for demo purposes
const DEFAULT_CREDS = {
    user: { email: 'user@coderunner.com', pass: 'user123' },
    admin: { email: 'admin@coderunner.com', pass: 'admin123' },
    universal: { email: 'demo@coderunner.com', pass: 'demo123' }
};

// Mutable storage for a newly registered user (simulating a database)
let registeredUser: { email: string; pass: string; name: string } | null = null;

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
        
        // Check against Default Credentials
        const isDefaultUser = role === 'user' && (normalizedInputEmail === DEFAULT_CREDS.user.email || password === DEFAULT_CREDS.user.pass);
        const isDefaultAdmin = role === 'admin' && (normalizedInputEmail === DEFAULT_CREDS.admin.email || password === DEFAULT_CREDS.admin.pass);
        
        // Check Universal Creds (Works for both roles)
        const isUniversal = (normalizedInputEmail === DEFAULT_CREDS.universal.email && password === DEFAULT_CREDS.universal.pass);

        // Check against Registered User
        let isRegisteredUser = false;
        if (registeredUser && role === 'user') {
            if (normalizedInputEmail === registeredUser.email.toLowerCase() && password === registeredUser.pass) {
                isRegisteredUser = true;
            }
        }

        // Strict password check for the matched account
        let valid = false;
        
        // 1. Check Default User
        if (role === 'user' && password === DEFAULT_CREDS.user.pass) valid = true;
        // 2. Check Default Admin
        if (role === 'admin' && password === DEFAULT_CREDS.admin.pass) valid = true;
        // 3. Check Registered User (Exact match required)
        if (isRegisteredUser) valid = true;
        // 4. Check Universal
        if (isUniversal) valid = true;


        if (valid) {
            const userName = isRegisteredUser && registeredUser ? registeredUser.name : undefined;
            onLogin(role, email, userName);
        } else {
            // Detailed Error Handling
            
            // Check if they are cross-logging (Admin creds in User tab)
            if (password === DEFAULT_CREDS.admin.pass && role === 'user') {
                 setError('These are Admin credentials. Please switch to the Admin Login tab.');
            } 
            // Check if they are cross-logging (User creds in Admin tab)
            else if ((password === DEFAULT_CREDS.user.pass || (registeredUser && password === registeredUser.pass)) && role === 'admin') {
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
          // Save to mock database
          registeredUser = {
              email: email,
              pass: password,
              name: name
          };

          // Log them in immediately
          onLogin('user', email, name);
      }, 1000);
  };

  const handleGoogleLogin = () => {
      setIsLoading(true);
      setError(null);
      // Simulate Google OAuth Popup and Redirect
      setTimeout(() => {
          onLogin('user', 'alex.google@gmail.com', 'Alex (Google)', 'https://lh3.googleusercontent.com/a/default-user=s96-c');
      }, 1500);
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
          // Update the mock credentials for the session
          // Note: In this demo, we update the registered user if it exists, or just pretend for default users
          if (registeredUser && registeredUser.email.toLowerCase() === email.toLowerCase()) {
              registeredUser.pass = newPassword;
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
      setName('');
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
                                        placeholder={mode === 'login' && role === 'admin' ? "admin@coderunner.com" : "user@coderunner.com"}
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

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-gray-900/80 backdrop-blur px-2 text-gray-500 rounded">or continue with</span>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors group disabled:opacity-50"
                            >
                                {/* Google Icon */}
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-sm text-gray-300 font-medium group-hover:text-white">Google</span>
                            </button>
                            <button 
                                disabled={isLoading}
                                className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors group disabled:opacity-50"
                            >
                                {/* GitHub Icon */}
                                <svg className="h-5 w-5 mr-2 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-gray-300 font-medium group-hover:text-white">GitHub</span>
                            </button>
                        </div>

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
