import React from 'react';

interface AiAgentProps {
    explanation: string | null;
    isLoading: boolean;
    onClose: () => void;
}

const AgentAvatar: React.FC = () => (
    <div className="w-10 h-10 rounded-xl bg-blue-600 flex-shrink-0 flex items-center justify-center border border-blue-400/30 shadow-lg shadow-blue-600/20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    </div>
);

export const AiAgent: React.FC<AiAgentProps> = ({ explanation, isLoading, onClose }) => {
    if (!explanation && !isLoading) return null;

    return (
        <div className="fixed bottom-6 right-6 w-full max-w-sm z-[100] animate-in slide-in-from-right-8 fade-in duration-500">
            <div className="bg-[#1a202c] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px] ring-1 ring-white/10">
                {/* Header */}
                <div className="bg-[#2d3748] px-5 py-4 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <AgentAvatar />
                        <div>
                            <h4 className="font-black text-white tracking-tight uppercase text-xs">AI Assistant</h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Mentor</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-white transition p-2 hover:bg-gray-700 rounded-lg"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-4">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            </div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Analyzing your code...</p>
                        </div>
                    ) : (
                        <div className="space-y-4 text-sm leading-relaxed text-gray-300">
                            {explanation?.split('\n\n').map((para, i) => {
                                // Basic markdown formatting
                                const formattedPara = para.replace(/\`([^`]+)\`/g, '<code class="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>')
                                                         .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
                                
                                return (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: formattedPara }} />
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {!isLoading && (
                    <div className="px-6 py-3 bg-[#1a202c] border-t border-gray-700/50 flex justify-end">
                        <button 
                            onClick={onClose}
                            className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition"
                        >
                            Got it, thanks!
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};