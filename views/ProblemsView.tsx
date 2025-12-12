import React from 'react';
import { PracticeCard } from '../components/PracticeCard';
import { PRACTICE_LANGUAGES } from '../constants';
import type { User } from '../types';

interface ProblemsViewProps {
    onCourseSelect: (courseName: string) => void;
    user: User;
}

export function ProblemsView({ onCourseSelect, user }: ProblemsViewProps) {
    return (
        <div className="bg-gray-900 text-white h-full overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-screen-2xl mx-auto">
                     <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Programming Languages</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                        {PRACTICE_LANGUAGES.map(problem => (
                            <PracticeCard key={problem.name} problem={problem} onClick={() => onCourseSelect(problem.name)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}