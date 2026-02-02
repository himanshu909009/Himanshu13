import type { Language, LanguageOption, User, Course, PracticeProblem, Contest, PastContest, LeaderboardUser, ContestProblem, RecentActivityItem, CourseDetails, Challenge, Snippet, DayChallenge } from './types';

export const LANGUAGES: LanguageOption[] = [
  { id: 'c', name: 'C' },
  { id: 'cpp', name: 'C++' },
  { id: 'java', name: 'Java' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
];

export const DEFAULT_CODE: Record<Language, string> = {
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  javascript: `console.log("Hello, World!");`,
  python: `print("Hello, World!")`,
};

export const CODE_SNIPPETS: Record<Language, Snippet[]> = {
  c: [
    { title: 'For Loop', description: 'A standard for loop.', code: 'for (int i = 0; i < 10; i++) {\n    // code here\n}' },
    { title: 'While Loop', description: 'A standard while loop.', code: 'while (condition) {\n    // code here\n}' },
    { title: 'If-Else', description: 'A conditional statement.', code: 'if (condition) {\n    // code here\n} else {\n    // code here\n}' },
    { title: 'Function', description: 'A basic function definition.', code: 'void functionName() {\n    // code here\n}' },
    { title: 'Read Input (scanf)', description: 'Read integer from stdin.', code: 'int num;\nscanf("%d", &num);' },
  ],
  cpp: [
    { title: 'For Loop', description: 'A standard for loop.', code: 'for (int i = 0; i < 10; ++i) {\n    // code here\n}' },
    { title: 'While Loop', description: 'A standard while loop.', code: 'while (condition) {\n    // code here\n}' },
    { title: 'If-Else', description: 'A conditional statement.', code: 'if (condition) {\n    // code here\n} else {\n    // code here\n}' },
    { title: 'Function', description: 'A basic function definition.', code: 'void functionName() {\n    // code here\n}' },
    { title: 'Class', description: 'A basic class definition.', code: 'class MyClass {\npublic:\n    MyClass() {}\n    ~MyClass() {}\n};' },
    { title: 'Read Input (cin)', description: 'Read integer from stdin.', code: 'int num;\nstd::cin >> num;' },
  ],
  java: [
    { title: 'For Loop', description: 'A standard for loop.', code: 'for (int i = 0; i < 10; i++) {\n    // code here\n}' },
    { title: 'While Loop', description: 'A standard while loop.', code: 'while (condition) {\n    // code here\n}' },
    { title: 'If-Else', description: 'A conditional statement.', code: 'if (condition) {\n    // code here\n} else {\n    // code here\n}' },
    { title: 'Method', description: 'A basic method definition.', code: 'public void methodName() {\n    // code here\n}' },
    { title: 'Class', description: 'A basic class definition.', code: 'class MyClass {\n    public MyClass() {\n        \n    }\n}' },
    { title: 'Read Input (Scanner)', description: 'Read integer from stdin.', code: 'import java.util.Scanner;\n\nScanner scanner = new Scanner(System.in);\nint num = scanner.nextInt();' },
  ],
  javascript: [
    { title: 'For Loop', description: 'A standard for loop.', code: 'for (let i = 0; i < 10; i++) {\n    // code here\n}' },
    { title: 'While Loop', description: 'A standard while loop.', code: 'while (condition) {\n    // code here\n}' },
    { title: 'If-Else', description: 'A conditional statement.', code: 'if (condition) {\n    // code here\n} else {\n    // code here\n}' },
    { title: 'Function', description: 'A basic function definition.', code: 'function functionName() {\n    // code here\n}' },
    { title: 'Arrow Function', description: 'An ES6 arrow function.', code: 'const functionName = () => {\n    // code here\n};' },
    { title: 'Class', description: 'An ES6 class definition.', code: 'class MyClass {\n    constructor() {\n        \n    }\n}' },
  ],
  python: [
    { title: 'For Loop', description: 'A standard for loop.', code: 'for i in range(10):\n    # code here\n    pass' },
    { title: 'While Loop', description: 'A standard while loop.', code: 'while condition:\n    # code here\n    pass' },
    { title: 'If-Else', description: 'A conditional statement.', code: 'if condition:\n    # code here\nelse:\n    # code here\n    pass' },
    { title: 'Function', description: 'A basic function definition.', code: 'def function_name():\n    # code here\n    pass' },
    { title: 'Class', description: 'A basic class definition.', code: 'class MyClass:\n    def __init__(self):\n        pass' },
    { title: 'Read Input', description: 'Read a line from stdin.', code: 'data = input()' },
  ],
};

export const LANGUAGE_KEYWORDS: Record<Language, string[]> = {
  c: [
    'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
    'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if',
    'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static',
    'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while',
    '#include', '#define', '#ifdef', '#ifndef', '#endif', '#if', '#else'
  ],
  cpp: [
    'alignas', 'alignof', 'and', 'and_eq', 'asm', 'auto', 'bitand', 'bitor', 'bool', 'break', 'case',
    'catch', 'char', 'char8_t', 'char16_t', 'char32_t', 'class', 'compl',
    'concept', 'const', 'consteval', 'constexpr', 'constinit', 'const_cast',
    'continue', 'co_await', 'co_return', 'co_yield', 'decltype', 'default',
    'delete', 'do', 'double', 'dynamic_cast', 'else', 'enum', 'explicit',
    'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if',
    'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'not',
    'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 'private', 'protected',
    'public', 'register', 'reinterpret_cast', 'requires', 'return',
    'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast',
    'struct', 'switch', 'template', 'this', 'thread_local',
    'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union',
    'unsigned', 'using', 'virtual', 'void', 'volatile', 'wchar_t', 'while',
    'xor', 'xor_eq', '#include', '#define'
  ],
  java: [
    'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
    'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
    'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
    'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new',
    'package', 'private', 'protected', 'public', 'return', 'short', 'static',
    'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
    'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null'
  ],
  javascript: [
    'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case',
    'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default',
    'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends',
    'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if',
    'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let',
    'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized',
    'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var',
    'void', 'volatile', 'while', 'with', 'yield', 'async', 'of'
  ],
  python: [
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break',
    'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',
    'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda',
    'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while',
    'with', 'yield'
  ]
};

export const LANGUAGE_FUNCTIONS: Record<Language, string[]> = {
  c: [
    'printf', 'scanf', 'malloc', 'free', 'fopen', 'fclose', 'strcpy', 'strlen', 'sizeof'
  ],
  cpp: [
    'std::cout', 'std::cin', 'std::endl', 'std::vector', 'std::string', 'std::sort', 
    'std::max', 'std::min', 'push_back', 'pop_back', 'size', 'begin', 'end'
  ],
  java: [
    'System.out.println', 'Math.max', 'Math.min', 'String.length', 'ArrayList.add', 
    'ArrayList.get', 'HashMap.put', 'HashMap.get', 'Integer.parseInt'
  ],
  javascript: [
    'console.log', 'Math.max', 'Math.min', 'Array.prototype.push', 'Array.prototype.pop', 
    'Array.prototype.map', 'Array.prototype.filter', 'String.prototype.length', 
    'JSON.parse', 'JSON.stringify', 'document.getElementById'
  ],
  python: [
    'print', 'input', 'len', 'range', 'str', 'int', 'float', 'list.append', 
    'list.pop', 'dict.get', 'sorted', 'max', 'min'
  ]
};


export const INITIAL_USER: User = {
  name: '',
  username: 'himanshu13',
  avatarUrl: 'https://ui-avatars.com/api/?name=Himanshu&background=random&color=fff',
  email: '',
  college: '',
  course: '',
  role: 'user',
  stats: [
    { label: 'Rank', value: 1234 },
    { label: 'Problems', value: 3 },
    { label: 'Points', value: 3200 },
  ],
  submissions: []
};

export const COURSES: Course[] = [
    { title: 'Object Oriented Programming in C++', category: 'Programming', lessons: 30, hours: 10, level: 'Beginner', color: 'bg-blue-500' },
    { title: 'Data Structures in Java', category: 'Algorithms', lessons: 32, hours: 18, level: 'Intermediate', color: 'bg-red-500' },
    { title: 'Data Structures Using C', category: 'Algorithms', lessons: 45, hours: 25, level: 'Intermediate', color: 'bg-green-500' },
];

export const PRACTICE_LANGUAGES: PracticeProblem[] = [
    { name: 'Practice C++', description: 'Solve C++ Practice problems online with the Practice C++ path on CodeChef. Answer MCQs exercise...', problems: 206, level: 'Beginner level', icon: `<svg width="32" height="32" viewBox="0 0 128 128"><path d="M51.4 128C23.1 128 0 104.9 0 76.6 0 48.3 23.1 25.2 51.4 25.2c10.2 0 19.8 3 27.9 8.2l-11.4 19.7c-3.8-2.2-8.3-3.6-13.3-3.6-8.9 0-16.7 5.1-20.2 12.6-1.5 3.2-2.3 6.7-2.3 10.4 0 3.7.8 7.2 2.3 10.4 3.5 7.5 11.3 12.6 20.2 12.6 5.1 0 9.7-1.4 13.6-3.8l11.2 19.5c-8.2 5.3-18.1 8.6-28.8 8.6zm50-51.4h-22v-22h-17.4v22h-22v17.4h22v22h17.4v-22h22V76.6z" fill="#004482"/></svg>`, color: 'bg-blue-500' },
    { name: 'Practice Python', description: 'Solve Python coding problems online with Practice Python on CodeChef. Write code for over 19...', problems: 192, level: 'Beginner level', icon: `<svg width="32" height="32" viewBox="0 0 128 128"><path d="M64 128c35.4 0 64-28.6 64-64S99.4 0 64 0 0 28.6 0 64s28.6 64 64 64z" fill="#306998"/><path d="M87.6 92.8H64c-3.2 0-5.8-2.6-5.8-5.8V70.4c0-4.6 3.6-8.5 8.1-8.9l14.4-1.1c2.2-.2 4-2.1 4-4.4V40.4c0-2.4-1.9-4.4-4.3-4.4H42.7c-2.4 0-4.3 2-4.3 4.4v9.3c0 2.4 2 4.4 4.4 4.4h21.4c3.2 0 5.8 2.6 5.8 5.8v16.6c0 4.6-3.6 8.5-8.1 8.9l-14.4 1.1c-2.2-.2-4 2.1-4 4.4v15.6c0 2.4 1.9 4.4 4.3 4.4h45c2.4 0 4.3-2 4.3-4.4v-9.3c.1-2.4-1.9-4.4-4.3-4.4z" fill="#FFD43B"/><ellipse cx="53.4" cy="51.8" rx="5.8" ry="5.8" fill="#306998"/><ellipse cx="74.6" cy="76.2" rx="5.8" ry="5.8" fill="#306998"/></svg>`, color: 'bg-yellow-500' },
    { name: 'Practice C', description: 'Improve your C programming skills with over 200 coding practice problems. Solve these beginner...', problems: 222, level: 'Beginner level', icon: `<svg width="32" height="32" viewBox="0 0 128 128"><path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm33.1 91.8c-4.3 4.3-10.1 6.5-17.4 6.5-6.4 0-12-2.1-16.7-6.2-4.8-4.2-7.8-9.6-9-16.2H89v-14H54.2c.8-6.1 3.6-11.2 8.4-15.3s10.9-6.2 18.2-6.2c6.9 0 12.6 2.1 17.1 6.3 4.5 4.2 6.7 9.8 6.7 16.8H128c0-9.3-2.9-17.5-8.6-24.5-5.7-7-13.6-12.2-23.5-15.5s-21-4.9-33.1-4.9c-12.8 0-24.4 2.1-34.6 6.2s-18.3 10-24.2 17.5-8.8 24.1-16.2c-5.7-5.9-12.2-8.8-19.5-8.8-7.1.1-13 2.4-17.7 6.9z" fill="#a8b9cc"/></svg>`, color: 'bg-indigo-700' },
    { name: 'Practice Java', description: 'Complete your Java coding practice with our online Java practice course on CodeChef. Solve over...', problems: 180, level: 'Beginner level', icon: `<svg width="32" height="32" viewBox="0 0 128 128"><circle cx="64" cy="64" r="64" fill="#5382a1"/><path d="M102.4 78.1c-2.6-1.2-4.3-2.6-4.3-5.3 0-2.3 1.2-4.2 3.8-5.7l9.1-5.3c3.4-2 5.1-4.7 5.1-8.1s-1.7-6.2-5.1-8.1l-9-5.3c-2.6-1.5-3.8-3.4-3.8-5.7 0-2.7 1.8-4.2 4.3-5.3 4.2-1.9 6.8-5.1 6.8-9.4 0-6.1-5-11-13.3-11-4.2 0-7.8 1.4-10.3 4-2.6 2.7-3.9 5.8-3.9 9.4 0 5.4 3.7 9.8 9.3 11.5 2.1.6 3.4 1.7 3.4 3.6 0 2.2-1.5 3.6-4.5 5.2l-8.6 4.6c-3.1 1.7-4.7 3.9-4.7 6.7 0 2.8 1.6 5 4.7 6.7l8.6 4.6c3.1 1.7 4.5 3.1 4.5 5.2s-1.3 3-3.4 3.6c-5.6 1.8-9.3 6.1-9.3 11.5 0 3.6 1.3 6.7 3.9 9.4 2.5 2.6 6.1 4 10.3 4 8.3 0 13.3-5 13.3-11 0-4.3-2.6-7.5-6.8-9.4z" fill="#fff"/><path d="M57.4 97.4c-4.3-2-7-5.4-7-10.4V41.3c0-4.9 2.7-8.4 7-10.4 4.3-2 9.5-2 15.6 0 4.3 2 6.9 5.4 6.9 10.4v45.7c0 4.9-2.6 8.4-6.9 10.4-6.2 2-11.3 2-15.6 0zm9-60.8c-1.7-.8-2.6-2.1-2.6-4.2 0-2.3 1-3.9 2.9-4.8 2-.9 4.6-.9 7.9 0 1.9.9 2.8 2.5 2.8 4.8 0 2.1-1 3.4-2.8 4.2-3.3.9-6.2.9-8.2 0z" fill="#f89820"/></svg>`, color: 'bg-orange-700' },
];

export const CONTESTS: Contest[] = [
  { title: 'Weekly Contest #345', startTime: 'Starts in 2d 4h 30m', duration: '90 mins', participants: 1250 },
  { title: 'Biweekly Contest #112', startTime: 'Starts in 9d 4h 30m', duration: '120 mins', participants: 980 },
];

export const PAST_CONTESTS: PastContest[] = [
  { name: 'Weekly Contest #344', date: 'July 15, 2024' },
  { name: 'Weekly Contest #343', date: 'July 8, 2024' },
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  { rank: 1, name: 'CodeMaster', score: 10500 },
  { rank: 2, name: 'AlgoQueen', score: 10250 },
  { rank: 3, name: 'BytePuzzler', score: 9800 },
];

export const CONTEST_PROBLEMS: ContestProblem[] = [
  { id: 'A', title: 'Two Sum Variant', difficulty: 'Easy', points: 300 },
  { id: 'B', title: 'Max Subarray Sum', difficulty: 'Medium', points: 500 },
  { id: 'C', title: 'Binary Tree Paths', difficulty: 'Medium', points: 600 },
  { id: 'D', title: 'Word Ladder', difficulty: 'Hard', points: 1000 },
];

export const COURSE_DETAILS: Record<string, CourseDetails> = {
    'C++': {
        title: 'Comprehensive C++',
        description: 'An in-depth course on C++, covering everything from basic syntax to advanced features like templates, STL, and modern C++ standards. Perfect for beginners and those looking to strengthen their C++ skills for competitive programming and software development.',
        icon: `<svg width="32" height="32" viewBox="0 0 128 128"><path d="M51.4 128C23.1 128 0 104.9 0 76.6 0 48.3 23.1 25.2 51.4 25.2c10.2 0 19.8 3 27.9 8.2l-11.4 19.7c-3.8-2.2-8.3-3.6-13.3-3.6-8.9 0-16.7 5.1-20.2 12.6-1.5 3.2-2.3 6.7-2.3 10.4 0 3.7.8 7.2 2.3 10.4 3.5 7.5 11.3 12.6 20.2 12.6 5.1 0 9.7-1.4 13.6-3.8l11.2 19.5c-8.2 5.3-18.1 8.6-28.8 8.6zm50-51.4h-22v-22h-17.4v22h-22v17.4h22v22h17.4v-22h22V76.6z" fill="#004482"/></svg>`,
        tags: {
            certification: true,
            rating: '4.8 (1,234 reviews)',
        },
        stats: {
            lessons: 48,
            hours: 30,
            problems: 120,
        },
        modules: [
            { id: 1, title: 'Module 1: C++ Basics', lessons: [
                { id: 1, title: 'Introduction', duration: '10 min', type: 'video' },
                { id: 2, title: 'Variables & Data Types', duration: '20 min', type: 'reading' },
            ]},
            { id: 2, title: 'Module 2: Control Flow', lessons: [
                { id: 3, title: 'If-Else Statements', duration: '15 min', type: 'video' },
                { id: 4, title: 'Loops', duration: '25 min', type: 'practice' },
            ]}
        ]
    },
    'Python': {
        title: 'Python for Problem Solving',
        description: 'Learn Python from scratch and apply it to solve a variety of programming challenges. This course focuses on Python\'s standard library, data structures, and best practices for writing clean, efficient code.',
        icon: `<svg width="32" height="32" viewBox="0 0 128 128"><path d="M64 128c35.4 0 64-28.6 64-64S99.4 0 64 0 0 28.6 0 64s28.6 64 64 64z" fill="#306998"/><path d="M87.6 92.8H64c-3.2 0-5.8-2.6-5.8-5.8V70.4c0-4.6 3.6-8.5 8.1-8.9l14.4-1.1c2.2-.2 4-2.1 4-4.4V40.4c0-2.4-1.9-4.4-4.3-4.4H42.7c-2.4 0-4.3 2-4.3 4.4v9.3c0 2.4 2 4.4 4.4 4.4h21.4c3.2 0 5.8 2.6 5.8 5.8v16.6c0 4.6-3.6 8.5-8.1 8.9l-14.4 1.1c-2.2-.2-4 2.1-4 4.4v15.6c0 2.4 1.9 4.4 4.3 4.4h45c2.4 0 4.3-2 4.3-4.4v-9.3c.1-2.4-1.9-4.4-4.3-4.4z" fill="#FFD43B"/><ellipse cx="53.4" cy="51.8" rx="5.8" ry="5.8" fill="#306998"/><ellipse cx="74.6" cy="76.2" rx="5.8" ry="5.8" fill="#306998"/></svg>`,
        tags: {
            certification: true,
            rating: '4.9 (2,500 reviews)',
        },
        stats: {
            lessons: 55,
            hours: 28,
            problems: 150,
        },
        modules: [
            { id: 1, title: 'Module 1: Python Fundamentals', lessons: [
                { id: 1, title: 'Hello, Python!', duration: '8 min', type: 'video' },
                { id: 2, title: 'Lists and Dictionaries', duration: '22 min', type: 'practice' },
            ]}
        ]
    },
    'Algorithms': {
        title: 'Data Structures & Algorithms',
        description: 'A comprehensive guide to common data structures and algorithms. This course is essential for passing technical interviews and improving your problem-solving abilities.',
        icon: `<svg width="32" height="32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="64" fill="#6181b6"/><path d="M40 96V32L88 64L40 96Z" fill="white"/></svg>`,
        tags: {
            certification: true,
            rating: '4.9 (5,100 reviews)',
        },
        stats: {
            lessons: 60,
            hours: 40,
            problems: 250,
        },
        modules: [
            { id: 1, title: 'Module 1: Core Data Structures', lessons: [
                { id: 1, title: 'Arrays and Strings', duration: '30 min', type: 'video' },
                { id: 2, title: 'Linked Lists', duration: '45 min', type: 'practice' },
            ]}
        ]
    }
};

const GENERIC_BOILERPLATE = `#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <algorithm>

// Use this space to implement your solution

int main() {
    // Your code to read input and test the solution goes here
    std::cout << "Experiment boilerplate. Implement your solution." << std::endl;
    return 0;
}
`;

export const CPP_CHALLENGES: Challenge[] = [
    {
        id: 1,
        title: 'Print "Hello, World!"',
        difficulty: 'Easy',
        category: 'C++ (Basic)',
        maxScore: 10,
        successRate: '99.0%',
        description: 'Write a program that prints "Hello, World!" to the console.',
        isSolved: false,
        boilerplateCode: `#include <iostream>\n\nint main() {\n    // Your code here\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}\n`,
        objective: 'Your first task in any new programming language is to master the art of printing output. Write a C++ program that prints the exact string `Hello, World!` to the console.',
        inputFormat: 'There is no input for this problem.',
        outputFormat: 'Output a single line containing the string "Hello, World!".',
        constraints: 'N/A',
        sampleInput: '',
        sampleOutput: 'Hello, World!',
        testCases: [{ id: '1', input: '', expectedOutput: 'Hello, World!', isLocked: true }],
    },
    {
        id: 2,
        title: 'Sum and Difference of Two Numbers',
        difficulty: 'Easy',
        category: 'C++ (Basic)',
        maxScore: 10,
        successRate: '95.0%',
        description: 'Write a program that takes two integers as input and prints their sum and difference.',
        isSolved: false,
        boilerplateCode: GENERIC_BOILERPLATE,
        objective: 'Your task is to take two integers as input and calculate their sum and difference. This will test your ability to handle basic input and perform arithmetic operations.',
        inputFormat: 'A single line containing two space-separated integers, `a` and `b`.',
        outputFormat: 'Print two lines. The first line should contain the sum of `a` and `b`. The second line should contain the difference (`a - b`).',
        constraints: '`1 <= a, b <= 1000`',
        sampleInput: '5 3',
        sampleOutput: '8\n2',
        testCases: [{ id: '1', input: '5 3', expectedOutput: '8\n2', isLocked: true }],
    },
    {
        id: 3,
        title: 'Repeat a String',
        difficulty: 'Easy',
        category: 'C++ (Basic)',
        maxScore: 10,
        successRate: '92.0%',
        description: 'Create a program that reads a string and an integer, then prints the string repeated.',
        isSolved: false,
        boilerplateCode: GENERIC_BOILERPLATE,
        objective: 'Given a string `S` and an integer `N`, your task is to print the string `S` repeated `N` times consecutively.',
        inputFormat: 'The first line contains an integer `N`.\nThe second line contains a string `S`.',
        outputFormat: 'Print the resulting string on a single line.',
        constraints: '`1 <= N <= 10`\n`1 <= length(S) <= 100`\n`S` contains only lowercase English letters.',
        sampleInput: '3\nabc',
        sampleOutput: 'abcabcabc',
        testCases: [{ id: '1', input: '3\nabc', expectedOutput: 'abcabcabc', isLocked: true }],
    },
    {
        id: 101,
        title: 'CHESSBOARD',
        difficulty: 'Easy',
        category: 'C (Basic)',
        maxScore: 100,
        successRate: '95.0%',
        description: 'Given coordinates in the form of string, print if that cell is white or black.',
        isSolved: false,
        boilerplateCode: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[3];\n    scanf("%s", s);\n    \n    // Write your code here\n    \n    return 0;\n}`,
        objective: `Above is the standard representation of a chessboard.
This could be imagined as a 2D cartesian plane, with the x axis being represented by the alphabets and y axis by the numbers.
Given coordinates in the form of string, print if that cell is white or black.`,
        inputFormat: 'First line contains a string s.',
        outputFormat: 'White or Black.',
        constraints: '|s|=2',
        sampleInput: 'b2',
        sampleOutput: 'Black',
        testCases: [
            { id: '1', input: 'b2', expectedOutput: 'Black', isLocked: true },
            { id: '2', input: 'a1', expectedOutput: 'Black', isLocked: true },
            { id: '3', input: 'h8', expectedOutput: 'Black', isLocked: true },
            { id: '4', input: 'h1', expectedOutput: 'White', isLocked: true }
        ],
        problemImage: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="background-color: white; border-radius: 4px; padding: 10px; max-width: 400px; display: block; margin: 0 auto;">
  <g transform="translate(30, 20)">
    <!-- Ranks (Numbers) -->
    <text x="-20" y="30" font-family="sans-serif" font-size="16">8</text>
    <text x="-20" y="70" font-family="sans-serif" font-size="16">7</text>
    <text x="-20" y="110" font-family="sans-serif" font-size="16">6</text>
    <text x="-20" y="150" font-family="sans-serif" font-size="16">5</text>
    <text x="-20" y="190" font-family="sans-serif" font-size="16">4</text>
    <text x="-20" y="230" font-family="sans-serif" font-size="16">3</text>
    <text x="-20" y="270" font-family="sans-serif" font-size="16">2</text>
    <text x="-20" y="310" font-family="sans-serif" font-size="16">1</text>

    <!-- Board -->
    <rect x="0" y="0" width="320" height="320" fill="white" stroke="#333" stroke-width="2"/>
    
    <!-- Pattern -->
    ${Array.from({ length: 8 }).map((_, r) => 
        Array.from({ length: 8 }).map((_, c) => 
            (r + c) % 2 === 1 ? `<rect x="${c * 40}" y="${r * 40}" width="40" height="40" fill="black" />` : ''
        ).join('')
    ).join('')}

    <!-- Files (Letters) -->
    <text x="20" y="345" font-family="sans-serif" font-size="16" text-anchor="middle">a</text>
    <text x="60" y="345" font-family="sans-serif" font-size="16" text-anchor="middle">b</text>
    <text x="100" y="345" font-family="sans-serif" font-size="16" text-anchor="middle">c</text>
    <text x="140" y="345" font-family="sans-serif" font-size="16" text-anchor="middle">d</text>
    <text x="180" y="345" font-family="sans-serif" font-size="16" text-anchor="middle">e</text>
    <text x="220" y="345" font-family="sans-serif" font-size="16" text-anchor="middle">f</text>
    <text x="260" y="345" font-family="sans-serif" font-size="16" text-anchor="middle">g</text>
    <text x="300" y="345" font-family="sans-serif" font-size="16" text-anchor="middle">h</text>
  </g>
</svg>`
    },
    {
        id: 102,
        title: 'Exchanging Gifts',
        difficulty: 'Easy',
        category: 'Algorithms',
        maxScore: 100,
        successRate: '90%',
        description: 'Identify the youngest member of a family based on gift exchanges.',
        isSolved: false,
        boilerplateCode: `#include <stdio.h>\n\nvoid find_youngest_member(int n, int m, int gifts[][2]) {\n    // Write your logic here\n}\n\nint main() {\n    int n, m;\n    scanf("%d %d", &n, &m);\n    int gifts[m][2];\n    for (int i = 0; i < m; i++) {\n        scanf("%d %d", &gifts[i][0], &gifts[i][1]);\n    }\n    find_youngest_member(n, m, gifts);\n    return 0;\n}`,
        objective: `The royal family exchanges gifts at Christmas, where the youngest member receives gifts from everyone but doesn't give any gifts. Given the data for all the exchanged gifts among the family members, you need to identify the youngest member, who is the one receiving gifts from everyone but not giving any.

Note: A family member does not give more than one gift to the same member.`,
        inputFormat: `The first line of the input contains two integers n and m denoting the number of family members and the number of gifts that were exchanged.
The next m lines contain two integers each. In the i-th line, two integers a_i, b_i represent that a gift was given by a_i to b_i.`,
        outputFormat: `Print a single integer, the number that represents the youngest member of the family.
If no such member is found, print "-1" instead.`,
        constraints: `1 <= n <= 10^4
0 <= m <= 10^5
1 <= a_i, b_i <= n`,
        sampleInput: `2 1
1 2`,
        sampleOutput: `2`,
        testCases: [
            { id: '1', input: '2 1\n1 2', expectedOutput: '2', isLocked: true },
            { id: '2', input: '3 2\n1 3\n2 3', expectedOutput: '3', isLocked: true },
            { id: '3', input: '3 3\n1 2\n2 3\n3 1', expectedOutput: '-1', isLocked: true }
        ]
    },
    {
        id: 103,
        title: 'Distinct K',
        difficulty: 'Easy',
        category: 'Strings',
        maxScore: 100,
        successRate: '85%',
        description: 'Find the kth unique string in a collection of strings.',
        isSolved: false,
        boilerplateCode: `#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */\n    return 0;\n}`,
        objective: `You wish to help Ashish, who possesses a collection of N strings, some of which may be duplicated, and has been assigned the task of finding the kth unique string.

If the number of unique strings is less than k, he needs to display -1. Considering you are Ashish's best friend can you assist him with this challenge?`,
        inputFormat: `The first line contains an integer N denoting the number of strings.
The next N lines contain strings.
The next line contains an integer k.`,
        outputFormat: `The output contains the kth distinct string. If there are less than k unique string display -1.`,
        constraints: `1 <= N <= 10^3
1 <= String.length() <= 10^3`,
        sampleInput: `6
d
b
c
b
c
a
2`,
        sampleOutput: `a`,
        testCases: [
            { id: '1', input: '6\nd\nb\nc\nb\nc\na\n2', expectedOutput: 'a', isLocked: true },
            { id: '2', input: '3\ndac\nba\na\n1', expectedOutput: 'dac', isLocked: true }
        ]
    }
];

export const SYLLABUS_MODULES = [
    {
        id: 1,
        title: 'Output & Basic math operators',
        description: 'Practice problems using C++ related to output and output on multiple lines.',
        problems: [
            { title: 'Sum of Two Numbers', difficulty: 'Easy', challengeId: 2 },
            { title: 'Simple Calculator', difficulty: 'Easy', challengeId: 31 },
            { title: 'Swap Two Numbers', difficulty: 'Easy', challengeId: 32 },
            { title: 'Area and Perimeter of Rectangle', difficulty: 'Easy', challengeId: 33 },
            { title: 'Celsius to Fahrenheit Conversion', difficulty: 'Easy', challengeId: 5 },
        ]
    },
    {
        id: 2,
        title: 'Variables and Datatypes',
        description: 'Practice problems related to variables and Datatypes using C++',
        problems: [
            { title: 'Variables of Different Data Types', difficulty: 'Easy', challengeId: 4 },
        ]
    },
    {
        id: 3,
        title: 'Strings',
        description: 'Practice problems related to strings and characters using C++',
        problems: [
             { title: 'Repeat a String', difficulty: 'Easy', challengeId: 3 },
        ]
    },
    {
        id: 4,
        title: 'User inputs',
        description: 'Accept user input and start solving slightly complex problems',
        problems: [
            { title: 'Sum and Difference of Two Numbers', difficulty: 'Easy', challengeId: 2 },
        ]
    },
    {
        id: 5,
        title: 'Algorithmic problems - 1',
        description: 'Practice simple problems on input, output and basic math',
        problems: [
            { title: 'Basic Arithmetic Operations', difficulty: 'Easy', challengeId: 7 },
            { title: 'Circle Area and Circumference', difficulty: 'Easy', challengeId: 6 },
        ]
    },
    {
        id: 6,
        title: 'Conditional statements',
        description: 'Practice problems on conditional statements using If / Else, Combining conditions using And / Or, Switch',
        problems: [
            { title: 'Check Number Sign', difficulty: 'Easy', challengeId: 10 },
            { title: 'Largest of Three Numbers', difficulty: 'Easy', challengeId: 11 },
            { title: 'Grading System', difficulty: 'Easy', challengeId: 12 },
        ]
    },
    {
        id: 7,
        title: 'Debug common errors',
        description: 'Practice debugging common errors that you will encounter while writing code',
        problems: []
    },
    {
        id: 8,
        title: 'Algorithmic problems - 2',
        description: 'A notch higher - lets introduce conditional statements',
        problems: [
            { title: 'Bitwise Operators', difficulty: 'Easy', challengeId: 9 },
        ]
    },
    {
        id: 9,
        title: 'Arrays',
        description: 'Arrays are an integral part of any programming language. Practice problems on arrays using C++',
        problems: [
            { title: 'Initialize and Print an Array', difficulty: 'Easy', challengeId: 19 },
            { title: 'Reverse an Array', difficulty: 'Easy', challengeId: 20 },
            { title: 'Matrix Multiplication', difficulty: 'Medium', challengeId: 21 },
        ]
    },
    {
        id: 10,
        title: 'Loops',
        description: 'Practice problems related to While Loops, For Loops and Break / Continue',
        problems: [
            { title: 'Print Numbers with For Loop', difficulty: 'Easy', challengeId: 13 },
            { title: 'Sum of Even Numbers', difficulty: 'Easy', challengeId: 14 },
            { title: 'Multiplication Table', difficulty: 'Easy', challengeId: 15 },
        ]
    },
    {
        id: 11,
        title: 'Algorithmic problems - 3',
        description: 'Another notch higher - lets introduce Loops',
        problems: [
            { title: 'Factorial of a Number', difficulty: 'Medium', challengeId: 8 },
        ]
    },
    {
        id: 12,
        title: 'Functions',
        description: 'Practice problems that incorporate functions into your code using C++',
        problems: [
            { title: 'Function: Calculate Square', difficulty: 'Easy', challengeId: 16 },
            { title: 'GCD with Recursion', difficulty: 'Medium', challengeId: 17 },
        ]
    },
    {
        id: 13,
        title: 'Pointers',
        description: 'Pointers in C++ are variables that store memory addresses, allowing direct manipulation of data in memory. They enable efficient memory management, dynamic allocation, and provide a powerful way to work with arrays and structures.',
        problems: [
            { title: 'Pointer Basics', difficulty: 'Easy', challengeId: 22 },
            { title: 'Swap Values with Pointers', difficulty: 'Easy', challengeId: 23 },
            { title: 'Dynamic Memory Allocation', difficulty: 'Medium', challengeId: 24 },
            { title: 'Function Pointers for Arithmetic', difficulty: 'Medium', challengeId: 18 },
        ]
    },
    {
        id: 14,
        title: 'Get started with complex algorithmic problems',
        description: 'Practice problems on test cases and custom input / output required to solve algorithmic problems.',
        problems: [
             { title: 'Operator Overloading', difficulty: 'Medium', challengeId: 27 },
             { title: 'Basic Inheritance', difficulty: 'Medium', challengeId: 28 },
             { title: 'Polymorphism with Virtual Functions', difficulty: 'Medium', challengeId: 29 },
             { title: 'Multiple Inheritance', difficulty: 'Medium', challengeId: 30 },
        ]
    }
];

export const DAYS_OF_CODE_DATA: DayChallenge[] = [
    { day: 1, title: 'Problem of the Day', topic: 'Array, Strings', challengeId: 19 },
    { day: 2, title: 'Problem of the Day', topic: 'Brute Force, Strings, Array', challengeId: 3 },
    { day: 3, title: 'Problem of the Day', topic: 'Stack, Array, Strings', challengeId: 19 },
    { day: 4, title: 'Problem of the Day', topic: 'Graph, AD HOC, Tree, mathematics', challengeId: 17 },
    { day: 5, title: 'Problem of the Day', topic: 'Array, AD HOC, Strings', challengeId: 19 },
    { day: 6, title: 'Problem of the Day', topic: 'Array, sorting', challengeId: 20 },
    { day: 7, title: 'Problem of the Day', topic: 'Array, Strings, sorting', challengeId: 19 },
    { day: 8, title: 'Problem of the Day', topic: 'Bit-Manipulation, Array', challengeId: 9 },
    { day: 9, title: 'Problem of the Day', topic: 'Array', challengeId: 19 },
    { day: 10, title: 'Problem of the Day', topic: 'Strings, sorting', challengeId: 3 },
    { day: 11, title: 'Problem of the Day', topic: 'Bit-Manipulation, Graph, Strings', challengeId: 9 },
    { day: 12, title: 'Problem of the Day', topic: 'Two Pointer, Math, Strings, Binary Search', challengeId: 11 },
    { day: 13, title: 'Problem of the Day', topic: 'Number Theory, Grid, Matrix, sorting', challengeId: 21 },
    { day: 14, title: 'Problem of the Day', topic: 'HashTable, Geometry, Recursion', challengeId: 17 },
    { day: 15, title: 'Problem of the Day', topic: 'Strings, sorting', challengeId: 3 },
    { day: 16, title: 'Problem of the Day', topic: 'Strings, Array', challengeId: 19 },
    { day: 17, title: 'Problem of the Day', topic: 'Strings, Array, sorting', challengeId: 19 },
    { day: 18, title: 'Problem of the Day', topic: 'Math, Array', challengeId: 14 },
    { day: 19, title: 'Problem of the Day', topic: 'Binary Tree, Math', challengeId: 29 },
    { day: 20, title: 'Problem of the Day', topic: 'Binary Tree, Linked List', challengeId: 29 },
    { day: 21, title: 'Problem of the Day', topic: 'HashTable, Linked List', challengeId: 25 },
    { day: 22, title: 'Problem of the Day', topic: 'Binary Tree, Recursion', challengeId: 17 },
    { day: 23, title: 'Problem of the Day', topic: 'Linked List, HashTable', challengeId: 25 },
    { day: 24, title: 'Problem of the Day', topic: 'Stack, Math', challengeId: 14 },
    { day: 25, title: 'Problem of the Day', topic: 'Linked List, Array', challengeId: 19 },
    { day: 26, title: 'Problem of the Day', topic: 'HashTable, Stack', challengeId: 25 },
    { day: 27, title: 'Problem of the Day', topic: 'Binary Tree, Hashing, Priority Queue', challengeId: 29 },
    { day: 28, title: 'Problem of the Day', topic: 'Linked List, Array', challengeId: 19 },
    { day: 29, title: 'Problem of the Day', topic: 'Math, Tree', challengeId: 14 },
    { day: 30, title: 'Problem of the Day', topic: 'Strings, Math', challengeId: 3 },
    { day: 31, title: 'Problem of the Day', topic: 'Math, Array', challengeId: 14 },
    { day: 32, title: 'Problem of the Day', topic: 'Math, hashmap, Hashset, Sliding Window', challengeId: 14 },
    { day: 33, title: 'Problem of the Day', topic: 'Array, Tree', challengeId: 19 },
    { day: 34, title: 'Problem of the Day', topic: 'Math, Sliding Window, Array', challengeId: 14 },
    { day: 35, title: 'Problem of the Day', topic: 'Strings, Math', challengeId: 3 },
    { day: 36, title: 'Problem of the Day', topic: 'Dynamic Programming, Priority Queue, Array', challengeId: 19 },
    { day: 37, title: 'Problem of the Day', topic: 'Linked List, Tree', challengeId: 29 },
    { day: 38, title: 'Problem of the Day', topic: 'Strings', challengeId: 3 },
    { day: 39, title: 'Problem of the Day', topic: 'Dynamic Programming, Tree, Linked List', challengeId: 29 },
    { day: 40, title: 'Problem of the Day', topic: 'Dynamic Programming, Array', challengeId: 19 },
    { day: 41, title: 'Problem of the Day', topic: 'Math, Binary Search, Tree', challengeId: 11 },
    { day: 42, title: 'Problem of the Day', topic: 'Array, Binary Search Tree', challengeId: 19 },
    { day: 43, title: 'Problem of the Day', topic: 'Dynamic Programming, Array', challengeId: 19 },
    { day: 44, title: 'Problem of the Day', topic: 'Dynamic Programming, Tree', challengeId: 29 },
    { day: 45, title: 'Problem of the Day', topic: 'Array, Tree', challengeId: 19 },
    { day: 46, title: 'Problem of the Day', topic: 'Array, Tree', challengeId: 19 },
    { day: 47, title: 'Problem of the Day', topic: 'Dynamic Programming, Strings', challengeId: 3 },
    { day: 48, title: 'Problem of the Day', topic: 'Dynamic Programming, Strings', challengeId: 3 },
    { day: 49, title: 'Problem of the Day', topic: 'Dynamic Programming, Array', challengeId: 19 },
    { day: 50, title: 'Problem of the Day', topic: 'Subsets, Prefix Sum, Array', challengeId: 19 },
    { day: 51, title: 'Problem of the Day', topic: 'Array, Tree', challengeId: 19 },
    { day: 52, title: 'Problem of the Day', topic: 'Dynamic Programming, Tree', challengeId: 29 },
    { day: 53, title: 'Problem of the Day', topic: 'Strings, BFS, Array', challengeId: 19 },
    { day: 54, title: 'Problem of the Day', topic: 'Strings, Tree, Array', challengeId: 19 },
    { day: 55, title: 'Problem of the Day', topic: 'Array, Dynamic Programming, Priority Queue', challengeId: 19 },
    { day: 56, title: 'Problem of the Day', topic: 'Strings, Tree, Array', challengeId: 19 },
    { day: 57, title: 'Problem of the Day', topic: 'Array', challengeId: 19 },
    { day: 58, title: 'Problem of the Day', topic: 'Array, greedy', challengeId: 19 },
    { day: 59, title: 'Problem of the Day', topic: 'Linked List, Bitwise Manipulation, Bit-Manipulation', challengeId: 9 },
    { day: 60, title: 'Problem of the Day', topic: 'Backtracking, Array', challengeId: 19 },
    { day: 61, title: 'Problem of the Day', topic: 'Graph, Backtracking', challengeId: 17 },
    { day: 62, title: 'Problem of the Day', topic: 'Math, Strings, Graph', challengeId: 3 },
    { day: 63, title: 'Problem of the Day', topic: 'Array, Strings, Doubly LinkedList', challengeId: 19 },
    { day: 64, title: 'Problem of the Day', topic: 'Strings, Matrix', challengeId: 21 },
    { day: 65, title: 'Problem of the Day', topic: 'Strings, Array', challengeId: 19 },
    { day: 66, title: 'Problem of the Day', topic: 'Heap, Matrix, Array', challengeId: 21 },
    { day: 67, title: 'Problem of the Day', topic: 'Strings, Dynamic Programming', challengeId: 3 },
    { day: 68, title: 'Problem of the Day', topic: 'Strings, Dynamic Programming', challengeId: 3 },
    { day: 69, title: 'Problem of the Day', topic: 'Strings, Dynamic Programming', challengeId: 3 },
    { day: 70, title: 'Problem of the Day', topic: 'Dynamic Programming, Linked List', challengeId: 25 },
    { day: 71, title: 'Problem of the Day', topic: 'Array, Linked List', challengeId: 19 },
    { day: 72, title: 'Problem of the Day', topic: 'Strings, Arrays, Array', challengeId: 19 },
    { day: 73, title: 'Problem of the Day', topic: 'Math, greedy, Dynamic Programming', challengeId: 14 },
    { day: 74, title: 'Problem of the Day', topic: 'Array, Strings', challengeId: 19 },
    { day: 75, title: 'Problem of the Day', topic: 'Array, Dynamic Programming', challengeId: 19 },
    { day: 76, title: 'Problem of the Day', topic: 'Array, Dynamic Programming', challengeId: 19 },
    { day: 77, title: 'Problem of the Day', topic: 'Strings, Math', challengeId: 3 },
    { day: 78, title: 'Problem of the Day', topic: 'Dynamic Programming, Matrix, Math', challengeId: 21 },
    { day: 79, title: 'Problem of the Day', topic: 'Strings, Sliding Window, Map, Array', challengeId: 19 },
    { day: 80, title: 'Problem of the Day', topic: 'Array, Strings, Design', challengeId: 19 },
    { day: 81, title: 'Problem of the Day', topic: 'Strings, Math, Binary Search', challengeId: 11 },
    { day: 82, title: 'Problem of the Day', topic: 'Bit-Manipulation, Strings, greedy', challengeId: 9 },
    { day: 83, title: 'Problem of the Day', topic: 'Strings, Stack, Math, Graph', challengeId: 3 },
    { day: 84, title: 'Problem of the Day', topic: 'Array, Prefix Sum, Math', challengeId: 19 },
    { day: 85, title: 'Problem of the Day', topic: 'Design, Geometry, Strings', challengeId: 6 },
    { day: 86, title: 'Problem of the Day', topic: 'Linked List, Tree, Matrix', challengeId: 21 },
    { day: 87, title: 'Problem of the Day', topic: 'Strings, Binary Search, Array', challengeId: 11 },
    { day: 88, title: 'Problem of the Day', topic: 'Linked List, Implementation, Bit-Manipulation, Strings', challengeId: 9 },
    { day: 89, title: 'Problem of the Day', topic: 'Stack, Recursion, Bit-Manipulation, Array', challengeId: 9 },
    { day: 90, title: 'Problem of the Day', topic: 'Array, Strings', challengeId: 19 },
    { day: 91, title: 'Problem of the Day', topic: 'Tree, Graph, Dynamic Programming', challengeId: 29 },
    { day: 92, title: 'Problem of the Day', topic: 'Matrix, Bit-Manipulation, Stack', challengeId: 21 },
    { day: 93, title: 'Problem of the Day', topic: 'Matrix, Backtracking, Array', challengeId: 21 },
    { day: 94, title: 'Problem of the Day', topic: 'Dynamic Programming, Array', challengeId: 19 },
    { day: 95, title: 'Problem of the Day', topic: 'Graph, Dynamic Programming, Matrix, HashTable', challengeId: 21 },
    { day: 96, title: 'Problem of the Day', topic: 'Dynamic Programming, greedy, Recursion', challengeId: 17 },
    { day: 97, title: 'Problem of the Day', topic: 'Graph, Data Structures & Algorithms, Array, Stack', challengeId: 19 },
    { day: 98, title: 'Problem of the Day', topic: 'Graph, Dynamic Programming, Matrix', challengeId: 21 },
    { day: 99, title: 'Problem of the Day', topic: 'Math, Bit-Manipulation, Binary Tree', challengeId: 9 },
    { day: 100, title: 'Problem of the Day', topic: 'Backtracking, Bit-Manipulation, Linked List', challengeId: 9 },
];