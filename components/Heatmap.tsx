import React, { useMemo, useRef, useEffect } from 'react';
import type { RecentActivityItem } from '../types';

interface HeatmapProps {
    submissions: RecentActivityItem[];
}

// Color ramp for GitHub/LeetCode style heatmap
const getColor = (count: number) => {
  if (count === 0) return 'bg-[#161b22]'; // Empty
  if (count <= 1) return 'bg-[#0e4429]'; // Low
  if (count <= 3) return 'bg-[#006d32]'; // Mid
  if (count <= 5) return 'bg-[#26a641]'; // High
  return 'bg-[#39d353]'; // Max
};

const monthLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// Fixed Simulation Date to mid-Feb 2026 to ensure labels have room
const SIMULATION_TODAY = new Date('2026-02-15');

export const Heatmap: React.FC<HeatmapProps> = ({ submissions }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Aggregating accepted submissions by date
    const contributionData = useMemo(() => {
        const data: Record<string, number> = {};
        if (!submissions) return data;

        submissions.forEach(sub => {
            if (sub.status === 'Accepted') {
                try {
                    const date = new Date(sub.timestamp);
                    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    data[dateString] = (data[dateString] || 0) + 1;
                } catch (e) {
                    console.error("Invalid timestamp:", sub.timestamp);
                }
            }
        });
        return data;
    }, [submissions]);

    // Generate days for the grid (approx 53 weeks)
    const { days, months } = useMemo(() => {
        const resultDays = [];
        const resultMonths: { name: string; weekIdx: number }[] = [];
        
        const end = new Date(SIMULATION_TODAY);
        const start = new Date(SIMULATION_TODAY);
        start.setFullYear(end.getFullYear() - 1);
        
        // Align start to the nearest preceding Sunday
        start.setDate(start.getDate() - start.getDay());

        let current = new Date(start);
        let lastMonth = -1;
        let weekIdx = 0;
        
        const todayStr = `${SIMULATION_TODAY.getFullYear()}-${String(SIMULATION_TODAY.getMonth() + 1).padStart(2, '0')}-${String(SIMULATION_TODAY.getDate()).padStart(2, '0')}`;

        while (current <= end) {
            const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
            const count = contributionData[dateStr] || 0;
            const dayOfWeek = current.getDay();

            resultDays.push({
                date: dateStr,
                count,
                dayOfWeek,
                isToday: dateStr === todayStr,
                displayDate: current.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
            });

            // Label months at the start of the week where the month changes
            if (dayOfWeek === 0) { 
                const m = current.getMonth();
                if (m !== lastMonth) {
                    // Collision check: only add month label if there's enough space from the previous one (min 3 weeks)
                    const lastAddedMonth = resultMonths[resultMonths.length - 1];
                    if (!lastAddedMonth || (weekIdx - lastAddedMonth.weekIdx) >= 3) {
                        resultMonths.push({
                            name: monthLabels[m],
                            weekIdx: weekIdx
                        });
                        lastMonth = m;
                    }
                }
                weekIdx++;
            }

            current.setDate(current.getDate() + 1);
        }
        return { days: resultDays, months: resultMonths };
    }, [contributionData]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, []);

    return (
        <div className="bg-[#0d1117] p-8 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-white flex items-center gap-3 tracking-tight">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                    </svg>
                    Submission Activity
                </h3>
                <div className="flex items-center gap-4">
                     <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-gray-800/30 px-3 py-1 rounded border border-gray-700">
                        Viewing: 2025 - 2026
                     </span>
                    <button className="text-[10px] text-gray-400 font-black bg-gray-800/50 px-4 py-1.5 rounded-full border border-gray-700 uppercase tracking-[0.2em] hover:text-white hover:border-gray-600 transition-all">
                        ANNUAL REVIEW
                    </button>
                </div>
            </div>

            <div className="flex">
                <div className="flex flex-col justify-between mr-4 py-8 text-[9px] font-black text-gray-500 uppercase tracking-widest select-none">
                    <div className="h-3"></div>
                    <div className="h-3">MON</div>
                    <div className="h-3"></div>
                    <div className="h-3">WED</div>
                    <div className="h-3"></div>
                    <div className="h-3">FRI</div>
                    <div className="h-3"></div>
                </div>

                <div 
                    ref={scrollContainerRef}
                    className="flex-grow overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
                >
                    <div className="relative min-w-max pb-2">
                        <div className="flex h-6 mb-3 relative">
                            {months.map((m, idx) => (
                                <div 
                                    key={idx} 
                                    className="absolute text-[10px] font-black text-gray-500 uppercase tracking-widest"
                                    style={{ left: `${m.weekIdx * 16}px` }}
                                >
                                    {m.name}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-flow-col grid-rows-7 gap-[4px]">
                            {days.map((day, idx) => (
                                <div
                                    key={idx}
                                    className={`w-[12px] h-[12px] rounded-[2px] transition-all duration-300 hover:ring-2 hover:ring-white/40 cursor-help ${getColor(day.count)} ${day.isToday ? 'ring-1 ring-white/20' : ''}`}
                                    title={`${day.count} accepted solutions on ${day.displayDate}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-800 w-full mt-4 mb-6"></div>

            <div className="flex justify-end items-center text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] gap-4 select-none">
                <span>LESS</span>
                <div className="flex gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-[#161b22]"></div>
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-[#0e4429]"></div>
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-[#006d32]"></div>
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-[#26a641]"></div>
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-[#39d353]"></div>
                </div>
                <span>MORE</span>
            </div>
        </div>
    );
};