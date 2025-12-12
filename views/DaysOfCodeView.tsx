
import React from 'react';
import type { User, DayChallenge } from '../types';
import { DAYS_OF_CODE_DATA } from '../constants';

interface DaysOfCodeViewProps {
    user: User;
    onBack: () => void;
    onChallengeSelect: (challengeId: number) => void;
}

const DayCard: React.FC<{ day: DayChallenge; isSolved: boolean; isLocked: boolean; onSelect: () => void }> = ({ day, isSolved, isLocked, onSelect }) => {
    let statusColor = "bg-gray-800 border-gray-700";
    let icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );
    let buttonText = "Locked";
    let buttonStyle = "bg-gray-700 text-gray-500 cursor-not-allowed";

    if (isSolved) {
        statusColor = "bg-green-900/20 border-green-800";
        icon = (
            <div className="bg-green-500 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        );
        buttonText = "Solved";
        buttonStyle = "bg-green-600 text-white hover:bg-green-700";
    } else if (!isLocked) {
        statusColor = "bg-blue-900/20 border-blue-800";
        icon = (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        );
        buttonText = "Start";
        buttonStyle = "bg-blue-600 text-white hover:bg-blue-700";
    }

    return (
        <div className={`p-4 rounded-lg border ${statusColor} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-lg`}>
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700">
                    <span className="text-sm font-bold text-gray-400">Day {day.day}</span>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{day.title}</h3>
                    <p className="text-sm text-gray-400">{day.topic}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {icon}
                <button
                    onClick={!isLocked ? onSelect : undefined}
                    disabled={isLocked}
                    className={`px-6 py-2 rounded-md font-semibold text-sm transition ${buttonStyle} min-w-[100px]`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export function DaysOfCodeView({ user, onBack, onChallengeSelect }: DaysOfCodeViewProps) {
    const solvedChallengeIds = new Set(
        user.submissions
            .filter(s => s.status === 'Accepted')
            .map(s => s.challengeId)
    );

    // Calculate progress
    const totalDays = DAYS_OF_CODE_DATA.length;
    let daysSolved = 0;
    
    // Logic: A day is "locked" if the previous day isn't solved (unless it's day 1)
    // A day is "solved" if its challengeId is in solvedChallengeIds
    const processedDays = DAYS_OF_CODE_DATA.map((day, index) => {
        const isSolved = solvedChallengeIds.has(day.challengeId);
        if (isSolved) daysSolved++;
        
        // Lock logic: Day 1 is always unlocked. Day N is unlocked if Day N-1 is solved.
        let isLocked = false;
        if (index > 0) {
            const prevDayChallengeId = DAYS_OF_CODE_DATA[index - 1].challengeId;
            if (!solvedChallengeIds.has(prevDayChallengeId)) {
                isLocked = true;
            }
        }
        
        return { ...day, isSolved, isLocked };
    });

    const progressPercentage = Math.round((daysSolved / totalDays) * 100);

    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full overflow-y-auto bg-gray-900">
             <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-6 flex items-center text-sm text-gray-400 hover:text-white transition group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Practice
                </button>

                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold mb-2">100 Days of Code</h1>
                        <p className="text-blue-100 text-lg mb-6 max-w-xl">
                            Commit to a coding habit. Master algorithms, data structures, and problem-solving one day at a time.
                        </p>
                        
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
                            onSelect={() => onChallengeSelect(day.challengeId)}
                        />
                    ))}
                </div>
             </div>
        </div>
    );
}
