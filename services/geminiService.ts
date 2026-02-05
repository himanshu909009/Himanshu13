import { GoogleGenAI, Type } from "@google/genai";
// Fix: Use 'import type' for type-only imports and combine them.
import type { Language, SimulationOutput, VirtualFile, TestCase } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        compilation: {
            type: Type.OBJECT,
            properties: {
                status: { type: Type.STRING, enum: ["success", "error"] },
                message: { type: Type.STRING },
                line: { type: Type.NUMBER, description: "The line number of the error, if applicable." },
                column: { type: Type.NUMBER, description: "The column number or character position of the error, if applicable." },
            },
            required: ["status", "message"],
        },
        execution: {
            type: Type.OBJECT,
            properties: {
                stdin: { type: Type.STRING },
            },
            required: ["stdin"],
        },
        output: {
            type: Type.OBJECT,
            properties: {
                stdout: { type: Type.STRING },
                stderr: { type: Type.STRING },
                transcript: {
                    type: Type.ARRAY,
                    description: "A structured transcript of the interactive session, showing stdin and stdout interleaved chronologically.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING, enum: ["stdout", "stdin", "stderr"] },
                            content: { type: Type.STRING },
                        },
                        required: ["type", "content"],
                    }
                },
                timeUsage: { type: Type.NUMBER, description: "Execution time in milliseconds." },
                memoryUsage: { type: Type.NUMBER, description: "Memory usage in kilobytes." },
                isExecutionFinished: { type: Type.BOOLEAN, description: "Set to true if the program has run to completion. Set to false if it is currently blocked and waiting for more stdin." },
                files: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            name: { type: Type.STRING },
                            content: { type: Type.STRING },
                        },
                        required: ["id", "name", "content"],
                    }
                }
            },
            required: ["stdout", "stderr", "isExecutionFinished"],
        },
    },
    required: ["compilation", "execution", "output"],
};

export async function runCodeSimulation(
  language: Language,
  files: VirtualFile[],
  activeFileId: string,
  input: string
): Promise<SimulationOutput> {
  const activeFile = files.find(f => f.id === activeFileId);
  if (!activeFile) {
      throw new Error("No active file found to run.");
  }

  const prompt = `
    You are a virtual code runner with a file system, acting as an automated judge for a programming platform. Your task is to simulate the compilation and execution of the provided code.
    **Your entire response must be a single JSON object matching the provided schema. Do not output any text outside of the JSON object.**

    **Execution Context:**
    - The entrypoint for execution is the file named: "${activeFile.name}"
    - Language: ${language}

    **Virtual File System:**
    The user has provided the following files. The code can read from and write to these files as if they were on a local disk.
    ${files.map(f => `
    - File Name: "${f.name}"
      Content:
      \`\`\`
      ${f.content}
      \`\`\`
    `).join('')}

    **Standard Input / Command Line Arguments:**
    The following data is provided. If the code uses standard input (e.g., Scanner, cin, scanf, input()), treat this as stdin. If the code uses command-line arguments (e.g., String[] args in Java, sys.argv in Python), use this data as the arguments (split by whitespace if multiple).
    \`\`\`
    ${input}
    \`\`\`

    **Instructions:**
    1.  **Analyze and Compile:**
        *   Analyze the entrypoint file ("${activeFile.name}") for syntax errors.
        *   If there are compilation errors, stop. Report them in \`compilation\`. **If the error has a line/column, you MUST extract them.**
        *   If compilation succeeds, report success.
    2.  **Simulate Execution & Performance:**
        *   Run the code. If the provided input is not sufficient for the program to run to completion, simulate the execution up to the point where the program is waiting for the next piece of input.
        *   **Simulate performance:** Provide realistic estimates for \`timeUsage\` (in milliseconds) and \`memoryUsage\` (in kilobytes). For simple 'Hello World' programs, this should be very low (e.g., < 5ms, < 1024KB).
        *   **Simulate File I/O:** If the code writes to a file (new or existing), you must capture the final state of that file.
    3.  **Format the Output:**
        *   You MUST respond with a single, valid JSON object that strictly adheres to the schema.
        *   **Create a Structured Transcript:** In the \`output.transcript\` array, provide a structured log of the execution. This should be an array of objects, where each object represents a chunk of output (\`stdout\`, \`stderr\`) or input (\`stdin\`).
        *   The order of the array elements must represent the chronological order of events.
        *   Combine consecutive prints into a single \`stdout\` part.
        *   **Indicate Execution State:** In \`output.isExecutionFinished\`, you MUST set it to \`true\` if the program ran to completion or terminated with an error. Set it to \`false\` ONLY if the program is currently blocked and waiting for more input.
        *   **In the \`output.files\` array, return ONLY the files that were created or modified during execution.**

    **Strict Output Formatting:**
    *   The \`output.stdout\` field must contain ONLY the program's result output.
    *   **Exclude Input Prompts:** Prompts like "Enter your name: " MUST BE EXCLUDED from the \`output.stdout\` field.
    *   **No Extra Text:** DO NOT add any conversational text or explanations like "Program finished successfully." to the \`stdout\`.
    *   **Character Accuracy:** The content of \`stdout\` must be character-for-character identical to what an automated judge expects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (result.compilation && result.output) {
      return result as SimulationOutput;
    } else {
      throw new Error("Invalid JSON structure received from API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to simulate code execution: ${error.message}`);
    }
    throw new Error("An unknown error occurred during code simulation.");
  }
}

export async function getAiErrorExplanation(language: Language, code: string, errorMessage: string): Promise<string> {
    const prompt = `
        You are a friendly and supportive coding assistant like the one in LeetCode or CodeChef. 
        A user has a compilation error. Your goal is to explain it clearly and help them fix it.

        **Tone:** Friendly, encouraging, and clear. Start with a warm greeting like "Hello there!" or "Let's figure this out together!".
        
        **Your Goal:** Explain the error concisely. Point out the specific line or token that caused the problem. 

        **Language:** ${language}

        **The user's code:**
        \`\`\`${language}
        ${code}
        \`\`\`

        **The error message:**
        \`\`\`
        ${errorMessage}
        \`\`\`

        **Instructions:**
        1.  **Greeting:** Start with something friendly.
        2.  **Explain the Error:** Translate the technical error into simple English.
        3.  **The "Spot":** Tell them exactly where the issue is (e.g., "Look at line 5").
        4.  **The Fix:** Give a hint or a small example of how it *should* look, but don't just rewrite their whole program.
        5.  **Markdown:** Use bold text for emphasis and code blocks for short snippets.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting AI explanation:", error);
        return "Sorry, I couldn't analyze the error. Please check your syntax.";
    }
}

export async function getAiFailureAnalysis(
    language: Language, 
    code: string, 
    testCaseInput: string,
    expectedOutput: string,
    actualOutput: string, 
    isRuntimeError: boolean
): Promise<string> {
    const failureType = isRuntimeError ? "produced a runtime error" : "produced the wrong output";
    const actualOutputDescription = isRuntimeError ? "Runtime Error (stderr)" : "Actual Output (stdout)";

    const prompt = `
        You are a friendly and helpful AI coding tutor. A programmer's code has failed a test case.
        Your task is to analyze the code, the input, and the output to explain the logical error and suggest a fix.

        **Language:** ${language}

        **The user's code:**
        \`\`\`${language}
        ${code}
        \`\`\`

        **Test Case Details:**
        - **Input (stdin/args):**
        \`\`\`
        ${testCaseInput || "(empty)"}
        \`\`\`
        - **Expected Output (stdout):**
        \`\`\`
        ${expectedOutput}
        \`\`\`
        - **Result:** The code ${failureType}.
        - **${actualOutputDescription}:**
        \`\`\`
        ${actualOutput}
        \`\`\`

        **Instructions:**
        1.  Start by greeting the user in a friendly tone.
        2.  Explain the discrepancy. What was the code supposed to do? What did it do instead?
        3.  Analyze the user's code to find the most likely logical error.
        4.  Explain *why* this part of the code is incorrect.
        5.  Suggest a clear and specific way to fix the code. Provide a corrected code snippet if helpful.
        6.  Keep your tone encouraging.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting AI failure analysis:", error);
        return "Sorry, I couldn't analyze this test case failure. Please try again.";
    }
}

interface CodeCompletionResponse {
    suggestions: string[];
}

const completionResponseSchema = {
    type: Type.OBJECT,
    properties: {
        suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of code completion suggestions as strings."
        }
    },
    required: ["suggestions"]
};

export async function getAiCodeCompletion(
  language: Language,
  code: string,
  cursorPosition: number
): Promise<string[]> {
  const codeBeforeCursor = code.substring(0, cursorPosition);
  const codeAfterCursor = code.substring(cursorPosition);

  const lineBeforeCursor = codeBeforeCursor.substring(codeBeforeCursor.lastIndexOf('\n') + 1);
  if (lineBeforeCursor.trim() === '' && codeAfterCursor.trim() === '') {
      return [];
  }

  const prompt = `
    You are an expert AI programming assistant specializing in code completion.
    Your task is to provide relevant, concise code completion suggestions based on the user's current code and cursor position.

    Language: ${language}

    Code before cursor:
    \`\`\`${language}
    ${codeBeforeCursor}
    \`\`\`

    Code after cursor:
    \`\`\`${language}
    ${codeAfterCursor}
    \`\`\`

    **Instructions:**
    1.  Analyze the code context.
    2.  Provide a list of up to 5 most likely code completion suggestions.
    3.  The suggestions should be what the user might type *next*, starting from the cursor position.
    4.  Do not repeat the code already before the cursor.
    5.  Respond with a single, valid JSON object that strictly adheres to the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: completionResponseSchema,
        temperature: 0.2, 
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as CodeCompletionResponse;
    
    return result.suggestions || [];
  } catch (error) {
    console.error("Error getting AI code completion:", error);
    return []; 
  }
}