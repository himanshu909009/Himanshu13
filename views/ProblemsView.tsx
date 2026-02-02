
import React from 'react';
import { PracticeCard } from '../components/PracticeCard';
import { PRACTICE_LANGUAGES } from '../constants';
import type { User } from '../types';

interface ProblemsViewProps {
    onCourseSelect: (courseName: string) => void;
    onDaysOfCodeSelect: () => void;
    user: User;
}

export function ProblemsView({ onCourseSelect, onDaysOfCodeSelect, user }: ProblemsViewProps) {
    return (
        <div className="bg-gray-900 text-white h-full overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-screen-2xl mx-auto">
                     <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Programming Languages</h1>
                    </div>
                    
                    <div className="flex flex-col xl:flex-row gap-8">
                        {/* Left Side: Language Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl flex-shrink-0">
                            {PRACTICE_LANGUAGES.map(problem => (
                                <PracticeCard key={problem.name} problem={problem} onClick={() => onCourseSelect(problem.name)} />
                            ))}
                        </div>

                        {/* Right Side: 100 Days of Code */}
                        <div className="flex-grow min-w-[300px]">
                            <div 
                                onClick={onDaysOfCodeSelect}
                                className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg p-8 h-full border border-blue-800 relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:opacity-10 transition-opacity"></div>
                                
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div>
                                        <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                                            Challenge
                                        </div>
                                        <h2 className="text-3xl font-extrabold text-white mb-4">100 Days of Code</h2>
                                        <p className="text-blue-100 text-lg mb-6">
                                            Crack the code to success! Consistency is the key. Solve 1 problem every day for 100 days.
                                        </p>
                                    </div>
                                    
                                    <div className="mt-auto">
                                         <div className="flex -space-x-2 overflow-hidden mb-4">
                                            {[1,2,3,4].map(i => (
                                                <div key={i} className={`inline-block h-8 w-8 rounded-full ring-2 ring-blue-900 bg-gray-700 flex items-center justify-center text-xs`}>
                                                    U{i}
                                                </div>
                                            ))}
                                            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-blue-900 bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                                                +1k
                                            </div>
                                        </div>
                                        <button className="w-full bg-white text-blue-900 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition shadow-lg flex items-center justify-center gap-2">
                                            Start Challenge
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
