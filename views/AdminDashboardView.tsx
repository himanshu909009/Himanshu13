
import React, { useState } from 'react';
import type { Challenge, TestCase } from '../types';
import { COURSES, PRACTICE_LANGUAGES } from '../constants';

interface AdminDashboardViewProps {
  challenges: Challenge[];
  onAddChallenge: (challenge: Challenge) => void;
  onDeleteChallenge: (id: number) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ challenges, onAddChallenge, onDeleteChallenge }) => {
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Challenge>>({
    title: '',
    difficulty: 'Easy',
    category: '',
    maxScore: 10,
    successRate: '0%',
    description: '',
    objective: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    sampleInput: '',
    sampleOutput: '',
    boilerplateCode: `#include <iostream>

int main() {
    // Your code here
    return 0;
}`,
    solutionCode: '',
  });

  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: '1', input: '', expectedOutput: '', isLocked: true }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newData = { ...prev, [name]: value };
        
        // Auto-update boilerplate if category changes to a known language
        if (name === 'category') {
            if (value.includes('Python')) {
                newData.boilerplateCode = `# Your code here\nprint("Hello, World!")`;
            } else if (value.includes('Java')) {
                newData.boilerplateCode = `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n        System.out.println("Hello, World!");\n    }\n}`;
            } else if (value.includes('C++')) {
                 newData.boilerplateCode = `#include <iostream>\n\nint main() {\n    // Your code here\n    return 0;\n}`;
            } else if (value.includes('C') && !value.includes('C++')) { // specific for C
                 newData.boilerplateCode = `#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}`;
            } else if (value.includes('Javascript') || value.includes('HTML')) {
                 newData.boilerplateCode = `console.log("Hello, World!");`;
            }
        }
        return newData;
    });
  };

  const handleTestCaseChange = (index: number, field: keyof TestCase, value: string) => {
    const newTestCases = [...testCases];
    newTestCases[index] = { ...newTestCases[index], [field]: value };
    setTestCases(newTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { id: Date.now().toString(), input: '', expectedOutput: '', isLocked: true }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newChallenge: Challenge = {
      id: Date.now(),
      isSolved: false,
      testCases: testCases,
      ...formData as Challenge
    };

    onAddChallenge(newChallenge);
    alert('Problem added successfully!');
    
    // Go back to list view
    setIsCreating(false);

    // Reset form
    setFormData({
      title: '',
      difficulty: 'Easy',
      category: '',
      maxScore: 10,
      successRate: '0%',
      description: '',
      objective: '',
      inputFormat: '',
      outputFormat: '',
      constraints: '',
      sampleInput: '',
      sampleOutput: '',
      boilerplateCode: `#include <iostream>

int main() {
    // Your code here
    return 0;
}`,
      solutionCode: '',
    });
    setTestCases([{ id: '1', input: '', expectedOutput: '', isLocked: true }]);
  };

  const InputField = ({ label, name, type = 'text', value, required = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        required={required}
        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  const TextAreaField = ({ label, name, value, required = false, rows = 3 }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={handleInputChange}
        required={required}
        rows={rows}
        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  if (!isCreating) {
      return (
          <div className="p-6 max-w-6xl mx-auto h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                  <button 
                    onClick={() => setIsCreating(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Problem
                  </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl">
                  <table className="min-w-full divide-y divide-gray-800">
                      <thead className="bg-gray-800">
                          <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Difficulty</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                          {challenges.map(challenge => (
                              <tr key={challenge.id} className="hover:bg-gray-800/50 transition">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{challenge.id}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{challenge.title}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{challenge.category}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          challenge.difficulty === 'Easy' ? 'bg-green-900/50 text-green-200' : 
                                          challenge.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-200' : 
                                          'bg-red-900/50 text-red-200'
                                      }`}>
                                          {challenge.difficulty}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <button 
                                        onClick={() => {
                                            if(window.confirm('Are you sure you want to delete this problem?')) {
                                                onDeleteChallenge(challenge.id);
                                            }
                                        }}
                                        className="text-red-400 hover:text-red-300 transition"
                                      >
                                          Delete
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  {challenges.length === 0 && (
                      <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          <p className="text-lg">No challenges found.</p>
                          <p className="text-sm mt-2">Get started by clicking "Add New Problem" above.</p>
                      </div>
                  )}
              </div>
          </div>
      );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto h-full overflow-y-auto">
      <button 
        onClick={() => setIsCreating(false)}
        className="mb-6 flex items-center text-gray-400 hover:text-white transition group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold text-white mb-8">Add New Problem</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-800 pb-2">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Problem Title" name="title" value={formData.title} required />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Target Course / Practice</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                >
                    <option value="" disabled>Select Target</option>
                    <optgroup label="Courses">
                        {COURSES.map(course => (
                            <option key={course.title} value={course.title}>{course.title}</option>
                        ))}
                    </optgroup>
                    <optgroup label="Practice">
                        {PRACTICE_LANGUAGES.map(practice => (
                            <option key={practice.name} value={practice.name}>{practice.name}</option>
                        ))}
                    </optgroup>
                    <optgroup label="General Topics">
                         <option value="C++ (Basic)">C++ (Basic)</option>
                         <option value="Functions">Functions</option>
                         <option value="Arrays">Arrays</option>
                         <option value="Pointers">Pointers</option>
                         <option value="OOP">OOP</option>
                         <option value="Control Flow">Control Flow</option>
                    </optgroup>
                </select>
            </div>

            <InputField label="Max Score" name="maxScore" type="number" value={formData.maxScore} />
          </div>
          <TextAreaField label="Short Description" name="description" value={formData.description} required />
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-800 pb-2">Problem Statement & Formats</h2>
          <TextAreaField label="Full Problem Statement (Objective)" name="objective" value={formData.objective} rows={5} required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextAreaField label="Input Format" name="inputFormat" value={formData.inputFormat} rows={3} />
            <TextAreaField label="Output Format" name="outputFormat" value={formData.outputFormat} rows={3} />
          </div>
          <TextAreaField label="Constraints" name="constraints" value={formData.constraints} rows={3} />
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-800 pb-2">Samples & Code</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextAreaField label="Sample Input" name="sampleInput" value={formData.sampleInput} rows={4} />
            <TextAreaField label="Sample Output" name="sampleOutput" value={formData.sampleOutput} rows={4} />
          </div>
          <TextAreaField label="Boilerplate Code" name="boilerplateCode" value={formData.boilerplateCode} rows={6} />
          <TextAreaField label="Solution Code (Admin Only)" name="solutionCode" value={formData.solutionCode} rows={6} />
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
            <h2 className="text-xl font-semibold text-white">Test Cases</h2>
            <button type="button" onClick={addTestCase} className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 text-white">
              + Add Case
            </button>
          </div>
          
          {testCases.map((tc, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800 rounded border border-gray-700 relative">
              <span className="absolute top-2 right-2 text-xs text-gray-500">Case #{index + 1}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Input</label>
                    <textarea
                        value={tc.input}
                        onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm font-mono text-white"
                        rows={2}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Expected Output</label>
                    <textarea
                        value={tc.expectedOutput}
                        onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm font-mono text-white"
                        rows={2}
                    />
                </div>
              </div>
              {testCases.length > 1 && (
                <button type="button" onClick={() => removeTestCase(index)} className="mt-2 text-xs text-red-400 hover:text-red-300">
                  Remove Case
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
            <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-500 transition shadow-lg"
            >
                Create Challenge
            </button>
        </div>
      </form>
    </div>
  );
};
