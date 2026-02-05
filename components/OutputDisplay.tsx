import React, { useState, useEffect, useRef } from 'react';
import type { SimulationOutput, TestResult } from '../types';

interface OutputDisplayProps {
  output: SimulationOutput | null;
  isLoading: boolean;
  error: string | null;
  onInputSubmit?: (line: string) => void;
  onClear: () => void;
  testResults: TestResult[] | null;
  isTesting: boolean;
  aiFeedback?: string | null;
  isAiLoading?: boolean;
}

const OutputContent: React.FC<{ output: SimulationOutput; aiFeedback?: string | null; isAiLoading?: boolean }> = ({ output, aiFeedback, isAiLoading }) => {
    const { compilation, output: programOutput } = output;

    if (compilation.status === 'error') {
        const { message, line, column } = compilation;
        return (
            <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-800/50 p-4 rounded-lg font-mono">
                    <div className="flex items-center gap-2 text-red-400 font-black uppercase tracking-widest text-xs mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        Compilation Error
                    </div>
                    {line && (
                        <p className="text-sm text-yellow-400/80 mb-2 font-bold">
                            Line {line}{column ? `, Column ${column}` : ''}
                        </p>
                    )}
                    <pre className="text-red-300/90 whitespace-pre-wrap break-words text-sm leading-relaxed">{message}</pre>
                </div>

                {(isAiLoading || aiFeedback) && (
                    <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg animate-in slide-in-from-bottom-2 duration-500">
                        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase tracking-widest text-xs mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isAiLoading ? 'animate-pulse' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 01-1 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                            </svg>
                            AI Smart Debugger
                        </div>
                        {isAiLoading ? (
                            <div className="flex items-center gap-2 text-indigo-300/70 text-sm italic">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                Thinking...
                            </div>
                        ) : (
                            <div className="text-indigo-100/90 text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                                {aiFeedback?.split('\n').map((line, i) => (
                                    <p key={i} className="mb-1">{line}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    if (programOutput.transcript && programOutput.transcript.length > 0) {
        return (
            <pre className="whitespace-pre-wrap break-words">
                {programOutput.transcript.map((part, index) => {
                    if (part.type === 'stderr') {
                        return <span key={index} className="text-yellow-400">{part.content}</span>;
                    }
                    return <span key={index}>{part.content}</span>;
                })}
            </pre>
        );
    }

    let content = programOutput.stdout || programOutput.stderr;
    const className = programOutput.stderr ? 'text-yellow-400' : '';
    
    if (!content && compilation.status === 'success') {
      content = "Execution successful";
    }

    return <pre className={`${className} whitespace-pre-wrap break-words`}>{content}</pre>;
};

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ 
    output, 
    isLoading, 
    error, 
    onInputSubmit, 
    onClear, 
    testResults, 
    isTesting,
    aiFeedback,
    isAiLoading
}) => {
    const [currentLine, setCurrentLine] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);
    
    const isExecutionFinished = !output || output.compilation.status === 'error' || (output.output.isExecutionFinished ?? true);
    const showInputPrompt = !isLoading && !error && !isExecutionFinished && !testResults && !!onInputSubmit;

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
        if (showInputPrompt) {
            inputRef.current?.focus();
        }
    }, [output, isLoading, error, showInputPrompt, testResults]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onInputSubmit) {
            onInputSubmit(currentLine);
            setCurrentLine('');
        }
    };
    
    const renderContent = () => {
        if (isTesting) {
             return (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                     <span className="text-blue-400 font-medium animate-pulse">Running Hidden Test Cases...</span>
                </div>
            );
        }
        
        if (testResults) {
            const passCount = testResults.filter(r => r.status === 'pass').length;
            const totalCount = testResults.length;
            const allPassed = passCount === totalCount;

            if (allPassed) {
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-black text-green-400 mb-2 uppercase tracking-tight">Accepted</h3>
                        <p className="text-gray-400">All {totalCount} test cases passed successfully.</p>
                    </div>
                );
            } else {
                const firstFail = testResults.find(r => r.status !== 'pass');
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-black text-red-400 mb-2 uppercase tracking-tight">
                            {firstFail?.status === 'error' ? 'Runtime Error' : 'Wrong Answer'}
                        </h3>
                        <p className="text-gray-400">Passed {passCount} / {totalCount} test cases.</p>
                    </div>
                );
            }
        }

        if (isLoading && !output) {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            );
        }

        if (error) {
            return <pre className="text-red-400 whitespace-pre-wrap break-words">{error}</pre>;
        }
        
        if (!output) {
            return <div className="text-gray-500 italic">Run code or submit to see the results.</div>;
        }
        
        return <OutputContent output={output} aiFeedback={aiFeedback} isAiLoading={isAiLoading} />;
    };

    return (
        <div className="flex flex-col h-full bg-[#1a202c] border border-slate-700 rounded-md overflow-hidden text-gray-200">
            <div className="flex justify-between items-center p-3 border-b border-slate-700 bg-slate-800">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">{testResults ? 'Submission Status' : 'Console Output'}</h3>
                </div>
                 <button
                    onClick={onClear}
                    className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded transition-colors"
                 >
                    Clear
                 </button>
            </div>
            <div ref={terminalBodyRef} className="flex-grow p-4 font-mono text-base overflow-auto" onClick={() => inputRef.current?.focus()}>
                {renderContent()}
                {showInputPrompt && (
                     <form onSubmit={handleFormSubmit} className="flex items-center mt-2">
                        <span className="text-blue-500 mr-2 flex-shrink-0">➜</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentLine}
                            onChange={(e) => setCurrentLine(e.target.value)}
                            className="bg-transparent focus:outline-none w-full caret-gray-200"
                            autoFocus
                            disabled={isLoading}
                            spellCheck="false"
                        />
                     </form>
                )}
            </div>
        </div>
    );
};