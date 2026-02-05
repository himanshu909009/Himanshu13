import React, { useState, useCallback } from 'react';
import { ProblemDescription } from '../components/ProblemDescription';
import { CodeEditor } from '../components/CodeEditor';
import { OutputDisplay } from '../components/OutputDisplay';
import { AiAgent } from '../components/AiAgent';
import type { Challenge, SimulationOutput, Language, TestResult, User, RecentActivityItem } from '../types';
import { runCodeSimulation, getAiErrorExplanation } from '../services/geminiService';
import { LanguageSelector } from '../components/LanguageSelector';
import { LANGUAGES, DEFAULT_CODE } from '../constants';

interface ChallengeEditorViewProps {
    challenge: Challenge;
    user: User;
    onUserUpdate: (user: User) => void;
    onBack: () => void;
}

export function ChallengeEditorView({ challenge, user, onUserUpdate, onBack }: ChallengeEditorViewProps) {
    const [language, setLanguage] = useState<Language>('c');
    const [code, setCode] = useState(challenge.boilerplateCode || DEFAULT_CODE[language]);
    const [output, setOutput] = useState<SimulationOutput | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [errorLine, setErrorLine] = useState<number | null>(null);
    const [testResults, setTestResults] = useState<TestResult[] | null>(null);
    const [aiFeedback, setAiFeedback] = useState<string | null>(null);
    const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
    const [showAiModal, setShowAiModal] = useState<boolean>(false);

    const handleRunCode = async () => {
        setIsLoading(true);
        setOutput(null);
        setError(null);
        setErrorLine(null);
        setTestResults(null);
        setAiFeedback(null);
        setShowAiModal(false);

        try {
            const result = await runCodeSimulation(language, [{ id: '1', name: 'main', content: code }], '1', "");
            setOutput(result);
            if (result.compilation.status === 'error') {
                setErrorLine(result.compilation.line ?? null);
                fetchAiFeedback(result.compilation.message);
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error running code.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAiFeedback = async (errorMessage: string) => {
        setIsAiLoading(true);
        setShowAiModal(true);
        try {
            const feedback = await getAiErrorExplanation(language, code, errorMessage);
            setAiFeedback(feedback);
        } catch (e) {
            console.error("AI Feedback failed", e);
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleSubmitCode = async () => {
        if (!challenge.testCases || challenge.testCases.length === 0) {
            alert("This problem has no test cases to submit against.");
            return;
        }

        setIsSubmitting(true);
        setTestResults(null);
        setOutput(null);
        setError(null);
        setErrorLine(null);
        setAiFeedback(null);
        setShowAiModal(false);

        const results: TestResult[] = [];
        let allPassed = true;

        try {
            for (const tc of challenge.testCases) {
                const result = await runCodeSimulation(language, [{ id: '1', name: 'main', content: code }], '1', tc.input);
                
                if (result.compilation.status === 'error') {
                    results.push({
                        testCase: tc,
                        status: 'error',
                        actualOutput: '',
                        errorMessage: result.compilation.message
                    });
                    allPassed = false;
                    setErrorLine(result.compilation.line ?? null);
                    fetchAiFeedback(result.compilation.message);
                    break; // Stop on compilation error
                }

                const actual = result.output.stdout.trim();
                const expected = tc.expectedOutput.trim();
                const passed = actual === expected;

                results.push({
                    testCase: tc,
                    status: passed ? 'pass' : 'fail',
                    actualOutput: actual
                });

                if (!passed) allPassed = false;
            }

            setTestResults(results);

            // Record activity if it's a successful submission
            if (allPassed) {
                const newSubmission: RecentActivityItem = {
                    id: Date.now(),
                    challengeId: challenge.id,
                    title: challenge.title,
                    status: 'Accepted',
                    timestamp: new Date().toISOString(),
                    code: code,
                    language: language
                };

                const updatedUser: User = {
                    ...user,
                    submissions: [newSubmission, ...user.submissions]
                };
                onUserUpdate(updatedUser);
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error during submission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex h-full relative">
            <div className="w-1/2 p-6 bg-gray-800 overflow-y-auto border-r border-gray-700">
                <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </button>
                <ProblemDescription challenge={challenge} />
            </div>
            <div className="w-1/2 flex flex-col p-6 gap-4 bg-gray-900">
                <div className="flex justify-between items-center bg-gray-800 p-3 rounded-t-lg border border-gray-700">
                    <LanguageSelector languages={LANGUAGES} selectedLanguage={language} onLanguageChange={setLanguage} />
                    <div className="flex gap-3">
                        <button 
                            onClick={handleRunCode} 
                            disabled={isLoading || isSubmitting}
                            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded font-bold text-gray-200 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Running...' : 'Run'}
                        </button>
                        <button 
                            onClick={handleSubmitCode} 
                            disabled={isLoading || isSubmitting}
                            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold text-white shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
                <div className="flex-grow min-h-0">
                    <CodeEditor 
                        code={code} 
                        onCodeChange={setCode} 
                        language={language} 
                        errorLine={errorLine} 
                        errorColumn={null} 
                    />
                </div>
                <div className="h-1/3 min-h-0">
                    <OutputDisplay 
                        output={output} 
                        isLoading={isLoading} 
                        isTesting={isSubmitting}
                        testResults={testResults}
                        error={error} 
                        onClear={() => {
                            setOutput(null);
                            setTestResults(null);
                            setAiFeedback(null);
                        }} 
                    />
                </div>
            </div>

            {/* AI Assistant Popup */}
            {showAiModal && (
                <AiAgent 
                    explanation={aiFeedback} 
                    isLoading={isAiLoading} 
                    onClose={() => setShowAiModal(false)} 
                />
            )}
        </div>
    );
}