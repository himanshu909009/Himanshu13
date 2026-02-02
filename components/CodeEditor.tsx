import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import type { Language } from '../types';

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: Language;
  errorLine: number | null;
  errorColumn: number | null;
  aiExplanation?: string | null;
  snippetToInsert?: { code: string; timestamp: number } | null;
  storageKey?: string;
}

declare var Prism: any;

const sanitizeCode = (input: string): string => {
  const sanitized = input.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '');
  return sanitized.replace(/\r\n?/g, '\n');
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange, language, errorLine, errorColumn, aiExplanation, snippetToInsert, storageKey }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof Prism !== 'undefined' && preRef.current) {
        Prism.highlightAllUnder(preRef.current);
    }
  }, [code, language]);

  useEffect(() => {
    if (snippetToInsert && textareaRef.current) {
      const { code: snippetCode } = snippetToInsert;
      const textarea = textareaRef.current;
      const currentValue = textarea.value;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newText = currentValue.substring(0, start) + snippetCode + currentValue.substring(end);
      onCodeChange(sanitizeCode(newText));
      
      setTimeout(() => {
          if (textareaRef.current) {
            const newCursorPosition = start + snippetCode.length;
            textareaRef.current.selectionStart = newCursorPosition;
            textareaRef.current.selectionEnd = newCursorPosition;
            textareaRef.current.focus();
          }
      }, 0);
    }
  }, [snippetToInsert, onCodeChange]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  const lineNumbers = useMemo(() => {
    const count = code.split('\n').length;
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newCode = code.substring(0, start) + '    ' + code.substring(end);
        onCodeChange(sanitizeCode(newCode));
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 4;
        }, 0);
    }
  };

  return (
    <div className="relative h-full font-mono text-base bg-gray-950 text-gray-200 rounded-b-md border border-gray-800 overflow-hidden flex">
        <div 
          ref={lineNumbersRef}
          className="flex-shrink-0 bg-gray-900/50 p-4 pt-4 select-none border-r border-gray-800 overflow-hidden text-right text-gray-500 min-w-[3rem]"
          aria-hidden="true"
        >
            {lineNumbers.map((num) => (
                <div key={num} className={errorLine === num ? 'text-red-400 font-bold' : ''}>
                    {num}
                </div>
            ))}
        </div>
        
        <div className="relative flex-grow h-full overflow-hidden">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => onCodeChange(sanitizeCode(e.target.value))}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 z-10 resize-none overflow-auto bg-transparent p-4 font-mono text-base outline-none text-transparent caret-white"
              spellCheck="false"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />

            <pre
              ref={preRef}
              className="absolute inset-0 z-1 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <code className={`language-${language} !p-4 !block`}>
                {code}
              </code>
            </pre>
            
            {errorLine !== null && (
                 <div
                    className="absolute left-0 w-full bg-red-500/10 pointer-events-none border-l-4 border-red-500"
                    style={{ top: `${(errorLine - 1) * 1.5}rem`, height: '1.5rem' }}
                />
            )}
        </div>
    </div>
  );
};