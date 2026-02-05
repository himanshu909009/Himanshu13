import React, { useMemo } from 'react';
import type { Course, User, Challenge } from '../types';
import { CPP_CHALLENGES, JAVA_CHALLENGES } from '../constants';

interface CourseCardProps {
  course: Course;
  onSelect: () => void;
  user: User;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, user }) => {
  // Enhanced mapping to support multiple programming languages and categories
  const courseChallenges = useMemo(() => {
    const title = course.title.toLowerCase();
    const all = [...CPP_CHALLENGES, ...JAVA_CHALLENGES];
    
    if (title.includes('c++')) {
      return all.filter(c => c.category.includes('C++'));
    }
    
    if (title.includes('java')) {
      return all.filter(c => c.category.includes('Java'));
    }

    if (title.includes('algorithms')) {
        return all.filter(c => c.category.includes('Algorithms'));
    }

    if (title.includes('using c') && !title.includes('c++')) {
        return all.filter(c => c.category.includes('C (Basic)'));
    }
    
    return [];
  }, [course.title]);

  const courseChallengeIds = new Set(courseChallenges.map(c => c.id));
  
  const solvedChallengeIds = new Set(
    user.submissions
      .filter(s => s.status === 'Accepted' && courseChallengeIds.has(s.challengeId))
      .map(s => s.challengeId)
  );

  const solvedCount = solvedChallengeIds.size;
  // Use the larger of the defined lesson count or the actual available challenges
  const totalCount = Math.max(course.lessons, courseChallenges.length);

  return (
    <div onClick={onSelect} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition cursor-pointer flex flex-col justify-between group border border-gray-700 hover:border-blue-500/50">
      <div>
        <div className={`w-12 h-12 rounded-lg ${course.color} mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{course.title}</h3>
        <p className="text-sm font-semibold text-blue-400 mb-4 uppercase tracking-wider">{course.category}</p>
        <p className="text-sm text-gray-400">{course.lessons} Experiments • {course.level}</p>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center text-xs text-gray-400 font-bold mb-2 uppercase tracking-tighter">
          <span>Progress</span>
          <span className="text-gray-200">{solvedCount} / {course.lessons} Solved</span>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden" role="progressbar">
          <div 
            className="bg-green-500 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(34,197,94,0.4)]" 
            style={{ width: `${(solvedCount / course.lessons) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};