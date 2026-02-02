
import React, { useState } from 'react';
import type { User, DayChallenge } from '../types';
import { DAYS_OF_CODE_DATA } from '../constants';

interface DaysOfCodeViewProps {
    user: User;
    onBack: () => void;
    onChallengeSelect: (challengeId: number) => void;
}

const DayCard: React.FC<{ 
    day: DayChallenge; 
    isSolved: boolean; 
    isLocked: boolean; 
    isOpen: boolean;
    onToggle: () => void;
    onSelectChallenge: (id: number) => void;
}> = ({ day, isSolved, isLocked, isOpen, onToggle, onSelectChallenge }) => {
    
    // Specific problem data to match the requested UI screenshots
    const getProblemsForDay = (dayNum: number) => {
        // Helper to attach IDs.
        // We'll use a simple hash of the title length to pick a valid ID from 1-33 (excluding 101, 102, 103) to ensure it opens *some* challenge.
        const withIds = (probs: {title: string, difficulty: string, points: string}[]) => {
            return probs.map((p, i) => {
                let id = (p.title.length + i) % 30 + 1; // Random existing ID
                if (p.title === 'CHESSBOARD') id = 101;
                if (p.title === 'Exchanging Gifts') id = 102;
                if (p.title === 'Distinct K') id = 103;
                return { ...p, id };
            });
        };

        switch(dayNum) {
            case 1: return withIds([
                { title: 'CHESSBOARD', difficulty: 'Easy', points: '0/100' },
                { title: 'Exchanging Gifts', difficulty: 'Easy', points: '0/100' },
                { title: 'Distinct K', difficulty: 'Easy', points: '0/100' }
            ]);
            case 2: return withIds([
                { title: 'Pair of Subarrays', difficulty: 'Easy', points: '0/100' },
                { title: 'Poster Printer', difficulty: 'Easy', points: '0/100' },
                { title: 'City Biker', difficulty: 'Easy', points: '0/100' },
                { title: 'Good Sum', difficulty: 'Medium', points: '0/120' }
            ]);
            case 3: return withIds([
                { title: 'Basketball Game', difficulty: 'Easy', points: '0/100' },
                { title: 'Push the Zeroes', difficulty: 'Easy', points: '0/100' },
                { title: 'Consistent Car Models', difficulty: 'Easy', points: '0/100' },
                { title: 'Sum of Different Bits', difficulty: 'Easy', points: '0/100' }
            ]);
            case 4: return withIds([
                { title: 'Find a way', difficulty: 'Easy', points: '0/100' },
                { title: 'Reverse from Last Occurrence', difficulty: 'Easy', points: '0/100' },
                { title: 'Sum of Node’s value of a given range', difficulty: 'Medium', points: '0/120' },
                { title: 'Triangle Game', difficulty: 'Easy', points: '0/100' }
            ]);
            case 5: return withIds([
                { title: 'Repeating Box', difficulty: 'Easy', points: '0/100' },
                { title: 'Chocolate Store', difficulty: 'Easy', points: '0/100' },
                { title: 'Basic Encoding', difficulty: 'Easy', points: '0/100' },
                { title: 'Backspace String Compare', difficulty: 'Easy', points: '0/100' }
            ]);
            case 6: return withIds([
                { title: 'Convert it', difficulty: 'Easy', points: '0/100' },
                { title: 'Mary and Flowers', difficulty: 'Easy', points: '0/100' },
                { title: 'Non-overlapping Intervals', difficulty: 'Medium', points: '0/120' },
                { title: 'Beer Purchase', difficulty: 'Medium', points: '0/120' }
            ]);
            case 7: return withIds([
                { title: 'Recent Submissions', difficulty: 'Easy', points: '0/100' },
                { title: 'Reena and Fruits', difficulty: 'Easy', points: '0/100' },
                { title: 'Kth Character', difficulty: 'Easy', points: '0/100' },
                { title: 'At the center', difficulty: 'Medium', points: '0/120' }
            ]);
            case 8: return withIds([
                { title: 'Count set bits', difficulty: 'Easy', points: '0/100' },
                { title: 'Find Class_id', difficulty: 'Easy', points: '0/100' },
                { title: 'Rahul and Tree', difficulty: 'Easy', points: '0/100' },
                { title: 'Golden Value', difficulty: 'Medium', points: '0/120' }
            ]);
            case 9: return withIds([
                { title: 'Form Majority', difficulty: 'Easy', points: '0/100' },
                { title: 'Find Target Indices After Sorting Array', difficulty: 'Easy', points: '0/100' },
                { title: 'Dreamy cars', difficulty: 'Easy', points: '0/100' },
                { title: 'The 3 jumps', difficulty: 'Medium', points: '0/120' }
            ]);
            case 10: return withIds([
                { title: 'Box ab pattern', difficulty: 'Easy', points: '0/100' },
                { title: 'Parentheses Depth', difficulty: 'Easy', points: '0/100' },
                { title: 'Let me break', difficulty: 'Medium', points: '0/120' },
                { title: 'Generate Modified String', difficulty: 'Medium', points: '0/120' }
            ]);
            case 11: return withIds([
                { title: 'Inversion Count', difficulty: 'Easy', points: '0/100' },
                { title: 'Total cost of fuse bulb in the graph', difficulty: 'Hard', points: '0/150' },
                { title: 'One Bit Index', difficulty: 'Medium', points: '0/120' },
                { title: 'Ravi Caught in Strings', difficulty: 'Medium', points: '0/120' }
            ]);
            case 12: return withIds([
                { title: 'Maximum Difference', difficulty: 'Easy', points: '0/100' },
                { title: 'Smallest Prime Multiplier', difficulty: 'Easy', points: '0/100' },
                { title: 'Find unique character from string', difficulty: 'Easy', points: '0/100' },
                { title: 'Maths Competition', difficulty: 'Medium', points: '0/120' }
            ]);
            case 13: return withIds([
                { title: 'Reduced Zero', difficulty: 'Easy', points: '0/100' },
                { title: 'UPPER LEFT BOTTOM RIGHT', difficulty: 'Easy', points: '0/100' },
                { title: 'Diagonal Sum', difficulty: 'Easy', points: '0/100' },
                { title: 'Not Stable', difficulty: 'Medium', points: '0/120' }
            ]);
            case 14: return withIds([
                { title: 'Sum variation', difficulty: 'Easy', points: '0/100' },
                { title: 'Robot Lap', difficulty: 'Easy', points: '0/100' },
                { title: 'Art Museum', difficulty: 'Easy', points: '0/100' },
                { title: 'The Largest Pack', difficulty: 'Easy', points: '0/100' }
            ]);
            case 15: return withIds([
                { title: 'Matching count', difficulty: 'Easy', points: '0/100' },
                { title: 'Decode Enigma', difficulty: 'Easy', points: '0/100' },
                { title: 'Minimum Addition', difficulty: 'Medium', points: '0/120' },
                { title: 'Fit and Fine', difficulty: 'Hard', points: '0/150' }
            ]);
            case 16: return withIds([
                { title: 'First Wrong Decision', difficulty: 'Easy', points: '0/100' },
                { title: 'First Palindrome String', difficulty: 'Easy', points: '0/100' },
                { title: 'Identify Winner', difficulty: 'Easy', points: '0/100' },
                { title: 'Correct height', difficulty: 'Easy', points: '0/100' }
            ]);
            case 17: return withIds([
                { title: 'Circular Disc', difficulty: 'Easy', points: '0/100' },
                { title: 'Find possible words', difficulty: 'Easy', points: '0/100' },
                { title: 'AND Triplets', difficulty: 'Easy', points: '0/100' },
                { title: 'Taste', difficulty: 'Medium', points: '0/120' }
            ]);
            case 18: return withIds([
                { title: 'Coin flip Game Problem', difficulty: 'Medium', points: '0/120' },
                { title: 'Sky diving', difficulty: 'Medium', points: '0/120' },
                { title: 'Measurement of Array', difficulty: 'Medium', points: '0/120' },
                { title: 'Cricket Match Score', difficulty: 'Medium', points: '0/120' }
            ]);
            case 19: return withIds([
                { title: 'Robbery Tree', difficulty: 'Medium', points: '0/120' },
                { title: 'Unique Binary Search Trees', difficulty: 'Medium', points: '0/120' },
                { title: 'Pairing the array', difficulty: 'Medium', points: '0/120' },
                { title: 'See What You Got', difficulty: 'Medium', points: '0/120' }
            ]);
            case 20: return withIds([
                { title: 'Making Sorted', difficulty: 'Medium', points: '0/120' },
                { title: 'Alice\'s App', difficulty: 'Medium', points: '0/120' },
                { title: 'Swapping Linked List Node', difficulty: 'Medium', points: '0/120' },
                { title: 'Same Path', difficulty: 'Medium', points: '0/120' }
            ]);
            case 21: return withIds([
                { title: 'Possible words', difficulty: 'Medium', points: '0/120' },
                { title: 'Duplicate Removal 2', difficulty: 'Medium', points: '0/120' },
                { title: 'Design HashMap', difficulty: 'Medium', points: '0/120' },
                { title: 'K Reverse List - Alternate', difficulty: 'Medium', points: '0/120' }
            ]);
            case 22: return withIds([
                { title: 'Binary Numbers and Binary Tree', difficulty: 'Medium', points: '0/120' },
                { title: 'Binary Tree with Binary Nodes', difficulty: 'Medium', points: '0/120' },
                { title: 'Valid Pin', difficulty: 'Medium', points: '0/120' },
                { title: 'Christmas & Accessories', difficulty: 'Medium', points: '0/120' }
            ]);
            case 26: return withIds([
                { title: 'Find and Replace Pattern', difficulty: 'Medium', points: '0/120' },
                { title: 'Possible Anagrams', difficulty: 'Medium', points: '0/120' },
                { title: 'Remove Dashes', difficulty: 'Medium', points: '0/120' },
                { title: 'Design a Derived Stack', difficulty: 'Medium', points: '0/120' }
            ]);
            case 27: return withIds([
                { title: 'Palindromic Paths', difficulty: 'Medium', points: '0/120' },
                { title: 'Path', difficulty: 'Medium', points: '0/120' },
                { title: 'Total Cards', difficulty: 'Medium', points: '0/120' },
                { title: 'Pick Them All', difficulty: 'Hard', points: '0/150' }
            ]);
            case 28: return withIds([
                { title: 'Mountain Valley', difficulty: 'Medium', points: '0/120' },
                { title: 'Common Node Data', difficulty: 'Medium', points: '0/120' },
                { title: 'Pole Arrangement', difficulty: 'Hard', points: '0/150' },
                { title: 'Odd Palindromic Query', difficulty: 'Hard', points: '0/150' }
            ]);
            case 29: return withIds([
                { title: 'Running Schedule', difficulty: 'Easy', points: '0/100' },
                { title: 'Total Number of Triangles', difficulty: 'Easy', points: '0/100' },
                { title: 'Organisation', difficulty: 'Medium', points: '0/120' },
                { title: 'Tree Bias', difficulty: 'Medium', points: '0/120' }
            ]);
            case 30: return withIds([
                { title: 'The Hint', difficulty: 'Medium', points: '0/120' },
                { title: 'Sort By Frequency', difficulty: 'Medium', points: '0/120' },
                { title: 'Mod in a Range', difficulty: 'Medium', points: '0/120' },
                { title: 'Make all Piles equal', difficulty: 'Medium', points: '0/120' }
            ]);
            default: return withIds([
                { title: `Problem A: ${day.topic.split(',')[0] || 'Algorithm'}`, difficulty: 'Easy', points: '0/100' },
                { title: 'Problem B: Logic Building', difficulty: 'Easy', points: '0/100' },
                { title: 'Problem C: Advanced Concept', difficulty: 'Medium', points: '0/100' },
            ]);
        }
    };

    const dayProblems = getProblemsForDay(day.day);

    return (
        <div className={`rounded-lg border ${isOpen ? 'border-blue-500/50 bg-gray-800' : 'border-gray-700 bg-gray-800'} overflow-hidden transition-all duration-300`}>
            <button
                onClick={!isLocked ? onToggle : undefined}
                className={`w-full p-6 flex items-start sm:items-center justify-between gap-4 text-left transition-colors ${!isLocked ? 'cursor-pointer hover:bg-gray-750' : 'cursor-not-allowed opacity-75'}`}
            >
                <div className="flex flex-col">
                    <h3 className={`text-lg font-bold ${isLocked ? 'text-gray-500' : 'text-white'}`}>Day {day.day}</h3>
                    <p className="text-sm text-gray-400 mt-1">{day.topic}</p>
                </div>
                
                <div className="flex items-center gap-4">
                    {isSolved && (
                        <div className="flex items-center text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Completed
                        </div>
                    )}
                    {isLocked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    ) : (
                        <div className={`p-1 rounded-full ${isOpen ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    )}
                </div>
            </button>

            {isOpen && !isLocked && (
                <div className="bg-gray-900/30 border-t border-gray-700 p-0 animate-fade-in">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-900/50 border-b border-gray-700">
                                <tr>
                                    <th className="px-6 py-3 font-medium w-16"></th>
                                    <th className="px-6 py-3 font-medium">Problem Title</th>
                                    <th className="px-6 py-3 font-medium">Difficulty</th>
                                    <th className="px-6 py-3 font-medium">Points</th>
                                    <th className="px-6 py-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50">
                                {dayProblems.map((prob, index) => (
                                    <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-200">
                                            {prob.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${prob.difficulty === 'Easy' ? 'bg-green-900/30 text-green-400' : (prob.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400')}`}>
                                                {prob.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {prob.points}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => onSelectChallenge(prob.id)}
                                                className="text-sm font-medium text-blue-400 hover:text-white border border-blue-900 hover:bg-blue-600 px-4 py-1.5 rounded-full transition-all"
                                            >
                                                Solve
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export function DaysOfCodeView({ user, onBack, onChallengeSelect }: DaysOfCodeViewProps) {
    const [openDay, setOpenDay] = useState<number | null>(null);

    const solvedChallengeIds = new Set(
        user.submissions
            .filter(s => s.status === 'Accepted')
            .map(s => s.challengeId)
    );

    // Calculate progress
    const totalDays = DAYS_OF_CODE_DATA.length;
    let daysSolved = 0;
    
    const processedDays = DAYS_OF_CODE_DATA.map((day, index) => {
        const isSolved = solvedChallengeIds.has(day.challengeId);
        if (isSolved) daysSolved++;
        
        // Lock logic: Unlocked first 30 days for demo purposes so user can verify UI without solving previous days
        let isLocked = false;
        if (index >= 30) {
            if (index > 0) {
                const prevDayChallengeId = DAYS_OF_CODE_DATA[index - 1].challengeId;
                if (!solvedChallengeIds.has(prevDayChallengeId)) {
                    isLocked = true;
                }
            }
        }
        
        return { ...day, isSolved, isLocked };
    });

    const progressPercentage = Math.round((daysSolved / totalDays) * 100);

    const handleToggleDay = (dayNum: number) => {
        setOpenDay(prev => prev === dayNum ? null : dayNum);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto bg-gray-900">
             <div className="max-w-5xl mx-auto">
                <button onClick={onBack} className="mb-6 flex items-center text-sm text-gray-400 hover:text-white transition group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Practice
                </button>

                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-4xl font-extrabold mb-2">100 Days of Code</h1>
                                <p className="text-blue-100 text-lg mb-6 max-w-xl">
                                    Commit to a coding habit. Master algorithms, data structures, and problem-solving one day at a time.
                                </p>
                            </div>
                            <div className="hidden sm:block text-right">
                                <div className="text-5xl font-black text-blue-200/20">2024</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex-grow max-w-md">
                                <div className="flex justify-between text-sm mb-1 font-medium">
                                    <span>Progress</span>
                                    <span>{progressPercentage}%</span>
                                </div>
                                <div className="w-full bg-blue-950 rounded-full h-3">
                                    <div 
                                        className="bg-blue-400 h-3 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="bg-blue-800/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-blue-700">
                                <span className="font-bold text-xl">{daysSolved}</span>
                                <span className="text-blue-200 text-sm ml-1">/ {totalDays} Days</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {processedDays.map((day) => (
                        <DayCard 
                            key={day.day} 
                            day={day} 
                            isSolved={day.isSolved} 
                            isLocked={day.isLocked}
                            isOpen={openDay === day.day}
                            onToggle={() => handleToggleDay(day.day)}
                            onSelectChallenge={onChallengeSelect}
                        />
                    ))}
                </div>
             </div>
        </div>
    );
}