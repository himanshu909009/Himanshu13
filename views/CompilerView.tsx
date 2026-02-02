import React, { useState, useCallback } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { OutputDisplay } from '../components/OutputDisplay';
import { AiAgent } from '../components/AiAgent';
import { LanguageSelector } from '../components/LanguageSelector';
import { LANGUAGES, DEFAULT_CODE } from '../constants';
import { runCodeSimulation, getAiErrorExplanation } from '../services/geminiService';
import type { Language, SimulationOutput, User } from '../types';

interface CompilerViewProps {
    user?: User;
}

const getFileName = (language: Language) => {
    switch (language) {
        case 'python': return 'main.py';
        case 'javascript': return 'main.js';
        case 'java': return 'Main.java';
        case 'cpp': return 'main.cpp';
        case 'c': return 'main.c';
        default: return 'file.txt';
    }
};

export function CompilerView({ user }: CompilerViewProps) {
    const [language, setLanguage] = useState<Language>('c');
    const [code, setCode] = useState<string>(DEFAULT_CODE[language]);
    const [fullInput, setFullInput] = useState<string>("");
    const [output, setOutput] = useState<SimulationOutput | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [errorLine, setErrorLine] = useState<number | null>(null);
    const [errorColumn, setErrorColumn] = useState<number | null>(null);
    const [aiExplanation, setAiExplanation] = useState<string | null>(null);
    const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

    const handleCodeChange = useCallback((newCode: string) => {
        setCode(newCode);
        if (errorLine !== null) {
            setErrorLine(null);
            setErrorColumn(null);
        }
    }, [errorLine]);

    const handleLanguageChange = (newLanguage: Language) => {
        setLanguage(newLanguage);
        setCode(DEFAULT_CODE[newLanguage]);
        setOutput(null);
        setError(null);
        setFullInput("");
    };

    const handleRunCode = useCallback(async (inputToUse: string) => {
        setIsLoading(true);
        setError(null);
        setOutput(null);
        setErrorLine(null);
        setErrorColumn(null);

        try {
            const result = await runCodeSimulation(language, [{ id: '1', name: getFileName(language), content: code }], '1', inputToUse);
            setOutput(result);
            if (result.compilation.status === 'error') {
                setErrorLine(result.compilation.line ?? null);
                setErrorColumn(result.compilation.column ?? null);
                setIsAiLoading(true);
                try {
                    const explanation = await getAiErrorExplanation(language, code, result.compilation.message);
                    setAiExplanation(explanation);
                } finally {
                    setIsAiLoading(false);
                }
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [language, code]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-screen-2xl mx-auto h-[85vh] flex flex-col gap-4">
                <div className="flex justify-between items-center bg-gray-800 p-3 rounded-t-lg border border-gray-700">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300 font-medium">{getFileName(language)}</span>
                        <LanguageSelector
                            languages={LANGUAGES}
                            selectedLanguage={language}
                            onLanguageChange={handleLanguageChange}
                        />
                    </div>
                    <button
                        onClick={() => handleRunCode("")}
                        disabled={isLoading}
                        className="bg-green-600 text-white font-bold py-2 px-8 rounded hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {isLoading ? 'Running...' : 'Run'}
                    </button>
                </div>
                
                <div className="flex-grow flex gap-4 min-h-0">
                    <div className="flex-grow flex flex-col">
                        <CodeEditor
                            code={code}
                            onCodeChange={handleCodeChange}
                            language={language}
                            errorLine={errorLine}
                            errorColumn={errorColumn}
                        />
                    </div>
                    <div className="w-1/3 flex flex-col">
                        <OutputDisplay 
                            output={output} 
                            isLoading={isLoading} 
                            error={error}
                            onClear={() => setOutput(null)}
                            testResults={null}
                            isTesting={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}