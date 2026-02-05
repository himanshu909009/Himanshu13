import type { Language, LanguageOption, User, Course, PracticeProblem, Contest, PastContest, LeaderboardUser, ContestProblem, RecentActivityItem, CourseDetails, Challenge, Snippet, DayChallenge } from './types';

export const LANGUAGES: LanguageOption[] = [
  { id: 'c', name: 'C' },
  { id: 'cpp', name: 'C++' },
  { id: 'java', name: 'Java' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
];

export const DEFAULT_CODE: Record<Language, string> = {
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`,
  java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println("Hello, World!");\n    }\n}`,
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
  c: ['auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while', '#include', '#define', '#ifdef', '#ifndef', '#endif', '#if', '#else'],
  cpp: ['alignas', 'alignof', 'and', 'and_eq', 'asm', 'auto', 'bitand', 'bitor', 'bool', 'break', 'case', 'catch', 'char', 'char8_t', 'char16_t', 'char32_t', 'class', 'compl', 'concept', 'const', 'consteval', 'constexpr', 'constinit', 'const_cast', 'continue', 'co_await', 'co_return', 'co_yield', 'decltype', 'default', 'delete', 'do', 'double', 'dynamic_cast', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'not', 'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 'private', 'protected', 'public', 'register', 'reinterpret_cast', 'requires', 'return', 'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'wchar_t', 'while', 'xor', 'xor_eq', '#include', '#define'],
  java: ['abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null'],
  javascript: ['abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield', 'async', 'of'],
  python: ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
};

export const LANGUAGE_FUNCTIONS: Record<Language, string[]> = {
  c: ['printf', 'scanf', 'malloc', 'float', 'free', 'fopen', 'fclose', 'strcpy', 'strlen', 'sizeof'],
  cpp: ['std::cout', 'std::cin', 'std::endl', 'std::vector', 'std::string', 'std::sort', 'std::max', 'std::min', 'push_back', 'pop_back', 'size', 'begin', 'end'],
  java: ['System.out.println', 'Math.max', 'Math.min', 'String.length', 'ArrayList.add', 'ArrayList.get', 'HashMap.put', 'HashMap.get', 'Integer.parseInt'],
  javascript: ['console.log', 'Math.max', 'Math.min', 'Array.prototype.push', 'Array.prototype.pop', 'Array.prototype.map', 'Array.prototype.filter', 'String.prototype.length', 'JSON.parse', 'JSON.stringify', 'document.getElementById'],
  python: ['print', 'input', 'len', 'range', 'str', 'int', 'float', 'list.append', 'list.pop', 'dict.get', 'sorted', 'max', 'min']
};

// Generate some sample submissions for the heatmap, relative to Jan 2026
const getSampleSubmissions = (): RecentActivityItem[] => {
    const subs: RecentActivityItem[] = [];
    const now = new Date('2026-02-01'); // Anchoring demo data in early 2026
    
    // Days with activity
    const activityDays = [0, 1, 3, 7, 10, 15, 20, 25, 40, 60, 100, 120, 150, 200, 250];
    
    activityDays.forEach((daysAgo, idx) => {
        const date = new Date(now);
        date.setDate(now.getDate() - daysAgo);
        const count = (idx % 3) + 1; // 1 to 3 submissions
        
        for (let i = 0; i < count; i++) {
            subs.push({
                id: Date.now() - daysAgo * 86400000 - i,
                challengeId: 1 + (idx % 5),
                title: ['Welcome to C++', 'Integer Sum', 'Floating Point Product', 'Check Even or Odd', 'Factorial Calculation'][idx % 5],
                status: 'Accepted',
                timestamp: date.toISOString(),
                code: '// Sample code',
                language: 'cpp'
            });
        }
    });
    return subs;
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
    { label: 'Problems', value: 5 },
    { label: 'Points', value: 250 },
  ],
  submissions: getSampleSubmissions()
};

export const COURSES: Course[] = [
    { title: 'Object Oriented Programming in C++', category: 'Programming', lessons: 30, hours: 10, level: 'Beginner', color: 'bg-blue-500' },
    { title: 'Object oriented programming using java', category: 'Programming', lessons: 25, hours: 12, level: 'Beginner', color: 'bg-orange-500' },
    { title: 'Data Structures in Java', category: 'Algorithms', lessons: 32, hours: 18, level: 'Intermediate', color: 'bg-red-500' },
    { title: 'Data Structures Using C', category: 'Algorithms', lessons: 45, hours: 25, level: 'Intermediate', color: 'bg-green-500' },
];

export const PRACTICE_LANGUAGES: PracticeProblem[] = [
    { name: 'Practice C++', description: 'Solve C++ Practice problems online with the Practice C++ path on CodeChef. Answer MCQs exercise...', problems: 206, level: 'Beginner level', icon: `<svg width="32" height="32" viewBox="0 0 128 128"><path d="M51.4 128C23.1 128 0 104.9 0 76.6 0 48.3 23.1 25.2 51.4 25.2c10.2 0 19.8 3 27.9 8.2l-11.4 19.7c-3.8-2.2-8.3-3.6-13.3-3.6-8.9 0-16.7 5.1-20.2 12.6-1.5 3.2-2.3 6.7-2.3 10.4 0 3.7.8 7.2 2.3 10.4 3.5 7.5 11.3 12.6 20.2 12.6 5.1 0 9.7-1.4 13.6-3.8l11.2 19.5c-8.2 5.3-18.1 8.6-28.8 8.6zm50-51.4h-22v-22h-17.4v22h-22v17.4h22v22h17.4v-22h22V76.6z" fill="#004482"/></svg>`, color: 'bg-blue-500' },
    { name: 'Practice Python', description: 'Solve Python coding problems online with Practice Python on CodeChef. Write code for over 19...', problems: 192, level: 'Beginner level', icon: `<svg width="32" height="32" viewBox="0 0 128 128"><path d="M64 128c35.4 0 64-28.6 64-64S99.4 0 64 0 0 28.6 0 64s28.6 64 64 64z" fill="#306998"/><path d="M87.6 92.8H64c-3.2 0-5.8-2.6-5.8-5.8V70.4c0-4.6 3.6-8.5 8.1-8.9l14.4-1.1c2.2-.2 4-2.1 4-4.4V40.4c0-2.4-1.9-4.4-4.3-4.4H42.7c-2.4 0-4.3 2-4.3 4.4v9.3c0 2.4 2 4.4 4.4 4.4h21.4c3.2 0 5.8 2.6 5.8 5.8v16.6c0 4.6-3.6-8.5-8.1 8.9l-14.4 1.1c-2.2-.2-4 2.1-4 4.4v15.6c0 2.4 1.9 4.4 4.3 4.4h45c2.4 0 4.3-2 4.3-4.4v-9.3c.1-2.4-1.9-4.4-4.3-4.4z" fill="#FFD43B"/><ellipse cx="53.4" cy="51.8" rx="5.8" ry="5.8" fill="#306998"/><ellipse cx="74.6" cy="76.2" rx="5.8" ry="5.8" fill="#306998"/></svg>`, color: 'bg-yellow-500' },
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
        description: 'An in-depth course on C++, covering everything from basic syntax to advanced features like templates, STL, and modern C++ standards. Perfect for beginners.',
        icon: `<svg width="32" height="32" viewBox="0 0 128 128"><path d="M51.4 128C23.1 128 0 104.9 0 76.6 0 48.3 23.1 25.2 51.4 25.2c10.2 0 19.8 3 27.9 8.2l-11.4 19.7c-3.8-2.2-8.3-3.6-13.3-3.6-8.9 0-16.7 5.1-20.2 12.6-1.5 3.2-2.3 6.7-2.3 10.4 0 3.7.8 7.2 2.3 10.4 3.5 7.5 11.3 12.6 20.2 12.6 5.1 0 9.7-1.4 13.6-3.8l11.2 19.5c-8.2 5.3-18.1 8.6-28.8 8.6zm50-51.4h-22v-22h-17.4v22h-22v17.4h22v22h17.4v-22h22V76.6z" fill="#004482"/></svg>`,
        tags: { certification: true, rating: '4.8 (1,234 reviews)' },
        stats: { lessons: 48, hours: 30, problems: 120 },
        modules: [{ id: 1, title: 'Basics', lessons: [{ id: 1, title: 'Intro', duration: '10 min', type: 'video' }] }]
    }
};

export const JAVA_CHALLENGES: Challenge[] = [
    {
        id: 101, title: 'Introduction to Java', difficulty: 'Easy', category: 'Java (Basic)', maxScore: 10, successRate: '99%', description: 'Print a hello world message in Java.', isSolved: false,
        objective: 'Welcome to Java! Your task is to print the message "Hello, World!" to the console.',
        outputFormat: 'Print `Hello, World!`',
        sampleOutput: 'Hello, World!',
        boilerplateCode: `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'Hello, World!', isLocked: true }]
    },
    {
        id: 102, title: 'Java Scanner', difficulty: 'Easy', category: 'Java (Basic)', maxScore: 10, successRate: '98%', description: 'Read a string and an integer.', isSolved: false,
        objective: 'Use the Scanner class to read a string and an integer from input.',
        inputFormat: 'A string and an integer on separate lines.',
        outputFormat: 'Print "String: [s]" then "Int: [n]".',
        sampleInput: 'Java\\n42',
        sampleOutput: 'String: Java\\nInt: 42',
        boilerplateCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Read input\n    }\n}`,
        testCases: [{ id: '1', input: 'Hello 10', expectedOutput: 'String: Hello\nInt: 10', isLocked: true }]
    },
    {
        id: 103, title: 'Parity Check', difficulty: 'Easy', category: 'Java (Logic)', maxScore: 10, successRate: '97%', description: 'Determine if a number is even or odd.', isSolved: false,
        objective: 'Given an integer, print "Even" or "Odd".',
        inputFormat: 'One integer.',
        outputFormat: 'Even or Odd.',
        sampleInput: '4',
        sampleOutput: 'Even',
        boilerplateCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Logical check\n    }\n}`,
        testCases: [{ id: '1', input: '7', expectedOutput: 'Odd', isLocked: true }]
    },
    {
        id: 104, title: 'Java Factorial', difficulty: 'Easy', category: 'Java (Logic)', maxScore: 20, successRate: '95%', description: 'Calculate factorial of N.', isSolved: false,
        objective: 'Write a loop to calculate the factorial of a given number n.',
        inputFormat: 'Integer n.',
        outputFormat: 'Result of n!',
        sampleInput: '5',
        sampleOutput: '120',
        boilerplateCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Factorial loop\n    }\n}`,
        testCases: [{ id: '1', input: '5', expectedOutput: '120', isLocked: true }]
    },
    {
        id: 105, title: 'Array Mean', difficulty: 'Easy', category: 'Java (Arrays)', maxScore: 20, successRate: '94%', description: 'Calculate the average of array elements.', isSolved: false,
        objective: 'Read n numbers and find their average (mean).',
        inputFormat: 'Integer n followed by n integers.',
        outputFormat: 'Integer average.',
        sampleInput: '3 10 20 30',
        sampleOutput: '20',
        boilerplateCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Read array and sum\n    }\n}`,
        testCases: [{ id: '1', input: '3 10 20 30', expectedOutput: '20', isLocked: true }]
    },
    {
        id: 106, title: 'Java: Student Class', difficulty: 'Medium', category: 'OOP (Basic)', maxScore: 30, successRate: '90%', description: 'Basic class structure.', isSolved: false,
        objective: 'Create a Student class with name and age. Print their details.',
        inputFormat: 'String name and integer age.',
        outputFormat: 'Name: [name], Age: [age]',
        sampleInput: 'Bob 20',
        sampleOutput: 'Name: Bob, Age: 20',
        boilerplateCode: `import java.util.Scanner;\n\nclass Student {\n    // Fields and Methods\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Create Student object\n    }\n}`,
        testCases: [{ id: '1', input: 'Bob 20', expectedOutput: 'Name: Bob, Age: 20', isLocked: true }]
    },
    {
        id: 107, title: 'Java: Constructor Overloading', difficulty: 'Medium', category: 'OOP (Basic)', maxScore: 30, successRate: '88%', description: 'Multiple constructors.', isSolved: false,
        objective: 'Implement a Rectangle class with constructors for a square (1 param) and a rectangle (2 params).',
        inputFormat: 'Two integers.',
        outputFormat: 'Area of rectangle.',
        sampleInput: '5 10',
        sampleOutput: '50',
        boilerplateCode: `import java.util.Scanner;\n\nclass Rectangle {\n    // Constructors\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Initialize and print area\n    }\n}`,
        testCases: [{ id: '1', input: '5 10', expectedOutput: '50', isLocked: true }]
    },
    {
        id: 108, title: 'Java: Inheritance', difficulty: 'Medium', category: 'OOP (Inheritance)', maxScore: 40, successRate: '85%', description: 'Animal and Mammal classes.', isSolved: false,
        objective: 'Demonstrate inheritance by creating a Mammal that inherits from Animal.',
        outputFormat: 'I am an animal\\nI am a mammal',
        sampleOutput: 'I am an animal\\nI am a mammal',
        boilerplateCode: `class Animal {\n    void speak() { System.out.println("I am an animal"); }\n}\n\n// Extend Animal\n\npublic class Main {\n    public static void main(String[] args) {\n        // Call inherited methods\n    }\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'I am an animal\nI am a mammal', isLocked: true }]
    },
    {
        id: 109, title: 'Java: Method Overriding', difficulty: 'Medium', category: 'OOP (Polymorphism)', maxScore: 40, successRate: '82%', description: 'Polymorphism in action.', isSolved: false,
        objective: 'Override the makeSound() method in Dog and Cat classes.',
        inputFormat: 'Choice (1=Dog, 2=Cat).',
        outputFormat: 'Woof or Meow.',
        sampleInput: '1',
        sampleOutput: 'Woof',
        boilerplateCode: `import java.util.Scanner;\n\nclass Animal { void makeSound() {} }\n// Overriding classes\n\npublic class Main {\n    public static void main(String[] args) {\n        // Polymorphic call\n    }\n}`,
        testCases: [{ id: '1', input: '1', expectedOutput: 'Woof', isLocked: true }, { id: '2', input: '2', expectedOutput: 'Meow', isLocked: true }]
    },
    {
        id: 110, title: 'Java: Abstract Classes', difficulty: 'Hard', category: 'OOP (Polymorphism)', maxScore: 50, successRate: '75%', description: 'Use abstract keywords.', isSolved: false,
        objective: 'Create an abstract Shape class with an abstract area() method.',
        inputFormat: 'Double radius.',
        outputFormat: 'Area of circle.',
        sampleInput: '1.0',
        sampleOutput: '3.14',
        boilerplateCode: `import java.util.Scanner;\n\nabstract class Shape { abstract double area(); }\n// Concrete class\n\npublic class Main {\n    public static void main(String[] args) {\n        // Calculate area\n    }\n}`,
        testCases: [{ id: '1', input: '1', expectedOutput: '3.14', isLocked: true }]
    },
    {
        id: 111, title: 'Java: Interfaces', difficulty: 'Hard', category: 'OOP (Basic)', maxScore: 50, successRate: '72%', description: 'Implementing interfaces.', isSolved: false,
        objective: 'Implement a Drawable interface in Circle and Square.',
        outputFormat: 'Drawing Circle\\nDrawing Square',
        sampleOutput: 'Drawing Circle\\nDrawing Square',
        boilerplateCode: `interface Drawable { void draw(); }\n// Implementations\n\npublic class Main {\n    public static void main(String[] args) {\n        // Call draw\n    }\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'Drawing Circle\nDrawing Square', isLocked: true }]
    },
    {
        id: 112, title: 'Java: ArrayList Basics', difficulty: 'Medium', category: 'Collections', maxScore: 30, successRate: '80%', description: 'Dynamic arrays.', isSolved: false,
        objective: 'Add 3 elements to an ArrayList and print the second one.',
        inputFormat: '3 strings.',
        outputFormat: 'The second string.',
        sampleInput: 'A B C',
        sampleOutput: 'B',
        boilerplateCode: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Use ArrayList\n    }\n}`,
        testCases: [{ id: '1', input: 'A B C', expectedOutput: 'B', isLocked: true }]
    },
    {
        id: 113, title: 'Java: HashMap Lookup', difficulty: 'Medium', category: 'Collections', maxScore: 40, successRate: '78%', description: 'Key-value pairs.', isSolved: false,
        objective: 'Store student names and grades, then lookup a grade by name.',
        inputFormat: 'Name to search.',
        outputFormat: 'Grade value.',
        sampleInput: 'Alice',
        sampleOutput: 'A',
        boilerplateCode: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Use HashMap with demo values\n    }\n}`,
        testCases: [{ id: '1', input: 'Alice', expectedOutput: 'A', isLocked: true }]
    },
    {
        id: 114, title: 'Java: Exception Handling', difficulty: 'Hard', category: 'Java (Advanced)', maxScore: 50, successRate: '65%', description: 'Try-catch for arithmetic.', isSolved: false,
        objective: 'Handle ArithmeticException when dividing by zero.',
        inputFormat: 'Two integers.',
        outputFormat: 'Result or "Error".',
        sampleInput: '10 0',
        sampleOutput: 'Error',
        boilerplateCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // try-catch block\n    }\n}`,
        testCases: [{ id: '1', input: '10 0', expectedOutput: 'Error', isLocked: true }]
    },
    {
        id: 115, title: 'Java: Static Keyword', difficulty: 'Medium', category: 'OOP (Advanced)', maxScore: 30, successRate: '82%', description: 'Static variables.', isSolved: false,
        objective: 'Count objects using a static variable.',
        outputFormat: 'Count: 3',
        sampleOutput: 'Count: 3',
        boilerplateCode: `class Counter {\n    static int c = 0;\n    Counter() { c++; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Create 3 and print count\n    }\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'Count: 3', isLocked: true }]
    }
];

export const CPP_CHALLENGES: Challenge[] = [
    {
        id: 1, title: 'Welcome to C++', difficulty: 'Easy', category: 'C++ (Basic)', maxScore: 10, successRate: '99%', description: 'Print a hello world message.', isSolved: false,
        objective: 'Your task is to print the message "Hello, World!" to the console using C++. This is a classic first program that demonstrates basic output syntax.',
        inputFormat: 'No input is required for this problem.',
        outputFormat: 'Print `Hello, World!` exactly.',
        sampleOutput: 'Hello, World!',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    // Print Hello, World! here\n    return 0;\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'Hello, World!', isLocked: true }]
    },
    {
        id: 2, title: 'Integer Sum', difficulty: 'Easy', category: 'C++ (Basic)', maxScore: 10, successRate: '98%', description: 'Read two integers and print their sum.', isSolved: false,
        objective: 'Write a C++ program that reads two integers from the standard input and displays their sum.',
        inputFormat: 'Two space-separated integers, `a` and `b`.',
        outputFormat: 'A single integer representing the sum.',
        sampleInput: '5 7',
        sampleOutput: '12',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int a, b;\n    // Use std::cin to read input and std::cout to print the sum\n    return 0;\n}`,
        testCases: [{ id: '1', input: '10 20', expectedOutput: '30', isLocked: true }, { id: '2', input: '-5 5', expectedOutput: '0', isLocked: true }]
    },
    {
        id: 3, title: 'Floating Point Product', difficulty: 'Easy', category: 'C++ (Basic)', maxScore: 10, successRate: '97%', description: 'Multiply two float numbers.', isSolved: false,
        objective: 'Calculate the product of two floating-point numbers provided as input.',
        inputFormat: 'Two float numbers `f1` and `f2`.',
        outputFormat: 'The product of the two numbers.',
        sampleInput: '2.5 4.0',
        sampleOutput: '10',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    float f1, f2;\n    // Read input and print product\n    return 0;\n}`,
        testCases: [{ id: '1', input: '1.5 2.0', expectedOutput: '3', isLocked: true }]
    },
    {
        id: 4, title: 'Check Even or Odd', difficulty: 'Easy', category: 'C++ (Logic)', maxScore: 10, successRate: '98%', description: 'Determine if a number is even or odd.', isSolved: false,
        objective: 'Check if a given integer is even or odd and print the result.',
        inputFormat: 'A single integer `n`.',
        outputFormat: 'Print "Even" if the number is even, otherwise "Odd".',
        sampleInput: '4',
        sampleOutput: 'Even',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int n;\n    // Read input and check parity\n    return 0;\n}`,
        testCases: [{ id: '1', input: '7', expectedOutput: 'Odd', isLocked: true }]
    },
    {
        id: 5, title: 'Factorial Calculation', difficulty: 'Easy', category: 'C++ (Logic)', maxScore: 20, successRate: '95%', description: 'Calculate the factorial of a given number.', isSolved: false,
        objective: 'Find the factorial of a non-negative integer `n`. Factorial of `n` (n!) is the product of all positive integers less than or equal to `n`.',
        inputFormat: 'An integer `n` (0 ≤ n ≤ 12).',
        outputFormat: 'The factorial value.',
        sampleInput: '5',
        sampleOutput: '120',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int n;\n    // Use a loop to calculate factorial\n    return 0;\n}`,
        testCases: [{ id: '1', input: '5', expectedOutput: '120', isLocked: true }]
    },
    {
        id: 6, title: 'Reverse a Number', difficulty: 'Easy', category: 'C++ (Logic)', maxScore: 20, successRate: '94%', description: 'Reverse the digits of an integer.', isSolved: false,
        objective: 'Take an integer input and print its digits in reverse order.',
        inputFormat: 'A single integer `n`.',
        outputFormat: 'The reversed integer.',
        sampleInput: '1234',
        sampleOutput: '4321',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int n;\n    // Extract digits and reverse\n    return 0;\n}`,
        testCases: [{ id: '1', input: '1234', expectedOutput: '4321', isLocked: true }]
    },
    {
        id: 7, title: 'Largest of Three', difficulty: 'Easy', category: 'C++ (Logic)', maxScore: 10, successRate: '96%', description: 'Find the maximum of three input numbers.', isSolved: false,
        objective: 'Given three integers, find and print the largest among them.',
        inputFormat: 'Three space-separated integers.',
        outputFormat: 'The largest integer.',
        sampleInput: '10 50 20',
        sampleOutput: '50',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int a, b, c;\n    // Find max of a, b, c\n    return 0;\n}`,
        testCases: [{ id: '1', input: '10 50 20', expectedOutput: '50', isLocked: true }]
    },
    {
        id: 8, title: 'Simple Calculator', difficulty: 'Easy', category: 'C++ (Logic)', maxScore: 20, successRate: '93%', description: 'Implement basic + - * / operations.', isSolved: false,
        objective: 'Build a calculator that takes two numbers and an operator (+, -, *, /) and prints the result.',
        inputFormat: 'Two integers and one char operator.',
        outputFormat: 'The calculated result.',
        sampleInput: '10 5 +',
        sampleOutput: '15',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int a, b;\n    char op;\n    // Use switch or if-else\n    return 0;\n}`,
        testCases: [{ id: '1', input: '10 5 +', expectedOutput: '15', isLocked: true }]
    },
    {
        id: 9, title: 'Prime Number Check', difficulty: 'Medium', category: 'C++ (Algorithms)', maxScore: 30, successRate: '88%', description: 'Efficiently check for prime numbers.', isSolved: false,
        objective: 'Determine if a number is prime. A prime number is greater than 1 and has no positive divisors other than 1 and itself.',
        inputFormat: 'An integer `n`.',
        outputFormat: 'Print "Prime" or "Not Prime".',
        sampleInput: '13',
        sampleOutput: 'Prime',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int n;\n    // Optimized prime check loop\n    return 0;\n}`,
        testCases: [{ id: '1', input: '13', expectedOutput: 'Prime', isLocked: true }, { id: '2', input: '10', expectedOutput: 'Not Prime', isLocked: true }]
    },
    {
        id: 10, title: 'Fibonacci Series', difficulty: 'Medium', category: 'C++ (Algorithms)', maxScore: 30, successRate: '87%', description: 'Generate N terms of Fibonacci sequence.', isSolved: false,
        objective: 'Generate the first `n` terms of the Fibonacci sequence: 0, 1, 1, 2, 3, 5...',
        inputFormat: 'An integer `n`.',
        outputFormat: 'Space-separated first `n` Fibonacci numbers.',
        sampleInput: '5',
        sampleOutput: '0 1 1 2 3',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int n;\n    // Use a loop to track two previous terms\n    return 0;\n}`,
        testCases: [{ id: '1', input: '5', expectedOutput: '0 1 1 2 3', isLocked: true }]
    },
    {
        id: 11, title: 'Array Sum and Average', difficulty: 'Easy', category: 'C++ (Arrays)', maxScore: 20, successRate: '92%', description: 'Process array elements.', isSolved: false,
        objective: 'Calculate the sum and average of elements in an integer array.',
        inputFormat: 'Size of array `n`, followed by `n` integers.',
        outputFormat: 'Sum and Average (integer division).',
        sampleInput: '3 10 20 30',
        sampleOutput: '60 20',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int n;\n    // Read size, then array elements\n    return 0;\n}`,
        testCases: [{ id: '1', input: '3 10 20 30', expectedOutput: '60 20', isLocked: true }]
    },
    {
        id: 12, title: 'Matrix Addition', difficulty: 'Easy', category: 'C++ (Arrays)', maxScore: 30, successRate: '91%', description: 'Add two 2D matrices.', isSolved: false,
        objective: 'Perform addition of two 2x2 matrices.',
        inputFormat: 'Eight integers (first matrix values then second).',
        outputFormat: 'Resultant matrix values.',
        sampleInput: '1 1 1 1 2 2 2 2',
        sampleOutput: '3 3 3 3',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int m1[2][2], m2[2][2];\n    // Read both matrices and output sum\n    return 0;\n}`,
        testCases: [{ id: '1', input: '1 1 1 1 2 2 2 2', expectedOutput: '3 3 3 3', isLocked: true }]
    },
    {
        id: 13, title: 'String Length and Reverse', difficulty: 'Easy', category: 'C++ (Strings)', maxScore: 10, successRate: '95%', description: 'Basic string manipulation.', isSolved: false,
        objective: 'Find the length of a string and display it reversed.',
        inputFormat: 'A single word string.',
        outputFormat: 'Length followed by the reversed string.',
        sampleInput: 'Hello',
        sampleOutput: '5 olleH',
        boilerplateCode: `#include <iostream>\n#include <string>\n#include <algorithm>\n\nint main() {\n    std::string s;\n    // Read input, find length, and reverse\n    return 0;\n}`,
        testCases: [{ id: '1', input: 'Hello', expectedOutput: '5 olleH', isLocked: true }]
    },
    {
        id: 14, title: 'Palindrome Check', difficulty: 'Medium', category: 'C++ (Strings)', maxScore: 30, successRate: '85%', description: 'Check if string is palindrome.', isSolved: false,
        objective: 'Verify if a given string reads the same backwards as forwards.',
        inputFormat: 'A string `s`.',
        outputFormat: 'Print "Palindrome" or "Not Palindrome".',
        sampleInput: 'madam',
        sampleOutput: 'Palindrome',
        boilerplateCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string s;\n    // Check if string equals its reverse\n    return 0;\n}`,
        testCases: [{ id: '1', input: 'madam', expectedOutput: 'Palindrome', isLocked: true }]
    },
    {
        id: 15, title: 'Class Basics: Student', difficulty: 'Medium', category: 'OOP (Classes)', maxScore: 40, successRate: '82%', description: 'Define a Student class with attributes.', isSolved: false,
        objective: 'Create a class `Student` with data members `name` and `rollNo`. Create an object and display its values.',
        inputFormat: 'String `name` and integer `rollNo`.',
        outputFormat: 'Name: `name`, Roll No: `rollNo` on new lines.',
        sampleInput: 'Alice 101',
        sampleOutput: 'Name: Alice\nRoll No: 101',
        boilerplateCode: `#include <iostream>\n#include <string>\n\nclass Student {\npublic:\n    std::string name;\n    int rollNo;\n    // Add methods if needed\n};\n\nint main() {\n    // Create object, read input, and display\n    return 0;\n}`,
        testCases: [{ id: '1', input: 'Alice 101', expectedOutput: 'Name: Alice\nRoll No: 101', isLocked: true }]
    },
    {
        id: 16, title: 'Constructor Overloading', difficulty: 'Medium', category: 'OOP (Classes)', maxScore: 40, successRate: '80%', description: 'Use multiple constructors.', isSolved: false,
        objective: 'Demonstrate constructor overloading by creating a class `Box` with multiple constructors to initialize dimensions.',
        inputFormat: 'Dimensions `l`, `w`, `h`.',
        outputFormat: 'Volume of the box.',
        sampleInput: '2 3 4',
        sampleOutput: '24',
        boilerplateCode: `#include <iostream>\n\nclass Box {\n    int length, width, height;\npublic:\n    // Define constructors here\n    int volume() { return length * width * height; }\n};\n\nint main() {\n    // Initialize Box with input dimensions and print volume\n    return 0;\n}`,
        testCases: [{ id: '1', input: '2 3 4', expectedOutput: '24', isLocked: true }]
    },
    {
        id: 17, title: 'Single Inheritance', difficulty: 'Medium', category: 'OOP (Inheritance)', maxScore: 50, successRate: '78%', description: 'Base and Derived classes.', isSolved: false,
        objective: 'Create a base class `Animal` and a derived class `Dog`. Inherit the functionality to display sounds.',
        inputFormat: 'No input.',
        outputFormat: 'Animal sounds: Barking',
        sampleOutput: 'Animal sounds: Barking',
        boilerplateCode: `#include <iostream>\n\nclass Animal {\npublic:\n    void sound() { std::cout << "Animal sounds: "; }\n};\n\nclass Dog : public Animal {\npublic:\n    void bark() { std::cout << "Barking"; }\n};\n\nint main() {\n    // Create Dog object and call methods\n    return 0;\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'Animal sounds: Barking', isLocked: true }]
    },
    {
        id: 18, title: 'Multiple Inheritance', difficulty: 'Medium', category: 'OOP (Inheritance)', maxScore: 50, successRate: '75%', description: 'Inheriting from multiple classes.', isSolved: false,
        objective: 'Create classes `A` and `B` and a class `C` that inherits from both. Display values from all.',
        inputFormat: 'Two integers.',
        outputFormat: 'Sum from A and B.',
        sampleInput: '10 20',
        sampleOutput: '30',
        boilerplateCode: `#include <iostream>\n\nclass A {\npublic:\n    int a;\n};\n\nclass B {\npublic:\n    int b;\n};\n\nclass C : public A, public B {\npublic:\n    void displaySum() { std::cout << a + b; }\n};\n\nint main() {\n    // Use multiple inheritance\n    return 0;\n}`,
        testCases: [{ id: '1', input: '10 20', expectedOutput: '30', isLocked: true }]
    },
    {
        id: 19, title: 'Function Overriding', difficulty: 'Medium', category: 'OOP (Polymorphism)', maxScore: 50, successRate: '77%', description: 'Redefining base class methods.', isSolved: false,
        objective: 'Override a method `draw()` in derived classes `Circle` and `Square` inherited from class `Shape`.',
        inputFormat: 'Choice (1 for Circle, 2 for Square).',
        outputFormat: 'Drawing Circle or Drawing Square.',
        sampleInput: '1',
        sampleOutput: 'Drawing Circle',
        boilerplateCode: `#include <iostream>\n\nclass Shape {\npublic:\n    virtual void draw() { std::cout << "Drawing Shape"; }\n};\n\n// Override draw() in Circle and Square\n\nint main() {\n    int choice;\n    // Execute overriding\n    return 0;\n}`,
        testCases: [{ id: '1', input: '1', expectedOutput: 'Drawing Circle', isLocked: true }, { id: '2', input: '2', expectedOutput: 'Drawing Square', isLocked: true }]
    },
    {
        id: 20, title: 'Virtual Functions', difficulty: 'Hard', category: 'OOP (Polymorphism)', maxScore: 60, successRate: '70%', description: 'Achieve runtime polymorphism.', isSolved: false,
        objective: 'Use a base class pointer to call a virtual function in a derived class to demonstrate dynamic binding.',
        inputFormat: 'No input.',
        outputFormat: 'Base class display\nDerived class display',
        sampleOutput: 'Base class display\nDerived class display',
        boilerplateCode: `#include <iostream>\n\nclass Base {\npublic:\n    virtual void display() { std::cout << "Base class display" << std::endl; }\n};\n\nclass Derived : public Base {\npublic:\n    void display() override { std::cout << "Derived class display" << std::endl; }\n};\n\nint main() {\n    // Use pointers to demonstrate virtual functions\n    return 0;\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'Base class display\nDerived class display', isLocked: true }]
    },
    {
        id: 21, title: 'Friend Functions', difficulty: 'Medium', category: 'OOP (Advanced)', maxScore: 40, successRate: '74%', description: 'Access private members.', isSolved: false,
        objective: 'Create a class with a private member and use a friend function to access and double the value.',
        inputFormat: 'An integer `n`.',
        outputFormat: 'The doubled value.',
        sampleInput: '10',
        sampleOutput: '20',
        boilerplateCode: `#include <iostream>\n\nclass Number {\n    int val;\npublic:\n    Number(int v) : val(v) {}\n    // Declare friend function here\n};\n\n// Define friend function here\n\nint main() {\n    // Double the private value\n    return 0;\n}`,
        testCases: [{ id: '1', input: '10', expectedOutput: '20', isLocked: true }]
    },
    {
        id: 22, title: 'Static Members', difficulty: 'Medium', category: 'OOP (Advanced)', maxScore: 40, successRate: '79%', description: 'Count objects using static vars.', isSolved: false,
        objective: 'Use a static variable to keep track of the number of objects created for a class.',
        inputFormat: 'No input.',
        outputFormat: 'Object count: 3',
        sampleOutput: 'Object count: 3',
        boilerplateCode: `#include <iostream>\n\nclass Counter {\npublic:\n    static int count;\n    Counter() { count++; }\n};\n\n// Initialize static member\n\nint main() {\n    // Create 3 objects and print count\n    return 0;\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'Object count: 3', isLocked: true }]
    },
    {
        id: 23, title: 'Template Basics', difficulty: 'Hard', category: 'C++ (Advanced)', maxScore: 60, successRate: '65%', description: 'Create a generic swap function.', isSolved: false,
        objective: 'Write a template function `swapData()` that can swap values of any data type (int, float, char).',
        inputFormat: 'Two space-separated integers.',
        outputFormat: 'Swapped integers.',
        sampleInput: '5 10',
        sampleOutput: '10 5',
        boilerplateCode: `#include <iostream>\n\n// Define template swap function here\n\nint main() {\n    int a, b;\n    // Read input and swap\n    return 0;\n}`,
        testCases: [{ id: '1', input: '5 10', expectedOutput: '10 5', isLocked: true }]
    },
    {
        id: 24, title: 'Exception Handling', difficulty: 'Hard', category: 'C++ (Advanced)', maxScore: 60, successRate: '68%', description: 'Try-catch blocks.', isSolved: false,
        objective: 'Demonstrate exception handling by catching a division by zero error.',
        inputFormat: 'Two integers `a` and `b`.',
        outputFormat: 'Quotient or "Error: Division by zero".',
        sampleInput: '10 0',
        sampleOutput: 'Error: Division by zero',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int a, b;\n    // Implement try-catch for division\n    return 0;\n}`,
        testCases: [{ id: '1', input: '10 0', expectedOutput: 'Error: Division by zero', isLocked: true }]
    },
    {
        id: 25, title: 'File Write Operation', difficulty: 'Medium', category: 'File I/O', maxScore: 40, successRate: '81%', description: 'Write data to a file.', isSolved: false,
        objective: 'Write the string "Hello File" to a file named "data.txt".',
        inputFormat: 'No input.',
        outputFormat: 'File written successfully',
        sampleOutput: 'File written successfully',
        boilerplateCode: `#include <iostream>\n#include <fstream>\n\nint main() {\n    // Use std::ofstream\n    return 0;\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'File written successfully', isLocked: true }]
    },
    {
        id: 26, title: 'File Read Operation', difficulty: 'Medium', category: 'File I/O', maxScore: 40, successRate: '80%', description: 'Read data from a file.', isSolved: false,
        objective: 'Simulate reading the content of a file and printing it to the console.',
        inputFormat: 'No input.',
        outputFormat: 'Content of file',
        sampleOutput: 'Content of file',
        boilerplateCode: `#include <iostream>\n#include <fstream>\n#include <string>\n\nint main() {\n    // Use std::ifstream\n    return 0;\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'Content of file', isLocked: true }]
    },
    {
        id: 27, title: 'Pointer Arithmetic', difficulty: 'Medium', category: 'Memory', maxScore: 30, successRate: '83%', description: 'Navigate arrays using pointers.', isSolved: false,
        objective: 'Iterate through an array of 5 integers using only pointers and print the values.',
        inputFormat: '5 space-separated integers.',
        outputFormat: 'Space-separated integers.',
        sampleInput: '1 2 3 4 5',
        sampleOutput: '1 2 3 4 5',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int arr[5];\n    int *ptr = arr;\n    // Read input using pointer and print\n    return 0;\n}`,
        testCases: [{ id: '1', input: '1 2 3 4 5', expectedOutput: '1 2 3 4 5', isLocked: true }]
    },
    {
        id: 28, title: 'Dynamic Allocation', difficulty: 'Hard', category: 'Memory', maxScore: 50, successRate: '72%', description: 'Use new and delete.', isSolved: false,
        objective: 'Dynamically allocate memory for an integer array of size `n` and then free it.',
        inputFormat: 'Integer `n`.',
        outputFormat: 'Memory allocated for `n` items.',
        sampleInput: '10',
        sampleOutput: 'Memory allocated for 10 items.',
        boilerplateCode: `#include <iostream>\n\nint main() {\n    int n;\n    // Use new and delete keywords\n    return 0;\n}`,
        testCases: [{ id: '1', input: '10', expectedOutput: 'Memory allocated for 10 items.', isLocked: true }]
    },
    {
        id: 29, title: 'Standard Template Library (STL)', difficulty: 'Hard', category: 'C++ (Advanced)', maxScore: 70, successRate: '60%', description: 'Use vector and sort.', isSolved: false,
        objective: 'Read `n` integers, store them in a `std::vector`, sort them using `std::sort`, and print.',
        inputFormat: 'Size `n` and `n` integers.',
        outputFormat: 'Sorted integers.',
        sampleInput: '4 40 10 30 20',
        sampleOutput: '10 20 30 40',
        boilerplateCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    int n;\n    // Read into vector and sort\n    return 0;\n}`,
        testCases: [{ id: '1', input: '4 40 10 30 20', expectedOutput: '10 20 30 40', isLocked: true }]
    },
    {
        id: 30, title: 'Project: Employee Management', difficulty: 'Hard', category: 'OOP (Project)', maxScore: 100, successRate: '55%', description: 'Full system implementation.', isSolved: false,
        objective: 'Build a small system with an `Employee` base class and `Developer` / `Manager` subclasses. Calculate total salary.',
        inputFormat: 'No input.',
        outputFormat: 'Total Salary: 50000',
        sampleOutput: 'Total Salary: 50000',
        boilerplateCode: `#include <iostream>\n\nclass Employee {\npublic:\n    virtual int getSalary() = 0;\n};\n\n// Implement Developer and Manager here\n\nint main() {\n    // Output final static sum\n    std::cout << "Total Salary: 50000";\n    return 0;\n}`,
        testCases: [{ id: '1', input: '', expectedOutput: 'Total Salary: 50000', isLocked: true }]
    }
];

export const SYLLABUS_MODULES = [
    { id: 1, title: 'C++ Basics', description: 'I/O and simple arithmetic.', problems: [{ title: 'Welcome to C++', difficulty: 'Easy', challengeId: 1 }, { title: 'Integer Sum', difficulty: 'Easy', challengeId: 2 }, { title: 'Floating Point Product', difficulty: 'Easy', challengeId: 3 }] },
    { id: 2, title: 'Control Flow', description: 'Loops and conditionals.', problems: [{ title: 'Check Even or Odd', difficulty: 'Easy', challengeId: 4 }, { title: 'Factorial Calculation', difficulty: 'Easy', challengeId: 5 }, { title: 'Reverse a Number', difficulty: 'Easy', challengeId: 6 }] },
    { id: 3, title: 'OOP Foundations', description: 'Classes and Objects.', problems: [{ title: 'Class Basics: Student', difficulty: 'Medium', challengeId: 15 }, { title: 'Constructor Overloading', difficulty: 'Medium', challengeId: 16 }] },
    { id: 4, title: 'Advanced OOP', description: 'Inheritance and Polymorphism.', problems: [{ title: 'Single Inheritance', difficulty: 'Medium', challengeId: 17 }, { title: 'Virtual Functions', difficulty: 'Hard', challengeId: 20 }] }
];

export const DAYS_OF_CODE_DATA: DayChallenge[] = [
    { day: 1, title: 'POD', topic: 'Arithmetic', challengeId: 1 },
    { day: 2, title: 'POD', topic: 'Cmd Args', challengeId: 2 },
    { day: 3, title: 'POD', topic: 'Strings', challengeId: 3 },
    { day: 4, title: 'POD', topic: 'Iteration', challengeId: 4 },
    { day: 5, title: 'POD', topic: 'Recursion', challengeId: 5 },
    { day: 6, title: 'POD', topic: '2D Arrays', challengeId: 6 },
    { day: 7, title: 'POD', topic: 'Sorting', challengeId: 7 },
    { day: 8, title: 'POD', topic: 'Strings', challengeId: 8 },
    { day: 9, title: 'POD', topic: 'Arrays', challengeId: 9 },
    { day: 10, title: 'POD', topic: 'OOP', challengeId: 10 },
];