import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Zap, 
  Check, 
  X, 
  ChevronRight, 
  Code, 
  BookOpen, 
  Award, 
  Lock, 
  Play,
  Cpu,
  Activity,
  RefreshCw,
  AlertTriangle,
  FileBadge,
  Smartphone,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

/**
 * JS Lingo - Pro Edition
 * Features:
 * - "Quick Keys" bar for mobile coding
 * - Deep Curriculum (DOM, Events, ES6)
 * - Modern "Midnight" UI Theme
 * - Scoring only for Exams
 */

// --- CURRICULUM DATA ---
const CURRICULUM = [
  {
    id: 'unit-1',
    title: '01. The Foundations',
    description: 'Initialize your knowledge: I/O, State, and Types.',
    levels: [
      {
        id: '1-1',
        title: 'Talking to the Computer',
        type: 'lesson',
        xp: 0,
        theory: "System I/O is the first step.",
        challenges: [
          {
            type: 'instruction',
            title: "The Console",
            content: "The 'Console' is your direct line to the JavaScript engine. To print a message, use `console.log()`.\n\nThink of it as sending a log entry to the system.",
            codeSnippet: "console.log('System initialized...');"
          },
          {
            type: 'multiple-choice',
            question: "Which command prints to the console?",
            options: ["print()", "console.log()", "sys.out()", "echo"],
            correctIndex: 1,
            explanation: "`console.log()` is the standard method for output."
          },
          {
            type: 'write-code',
            question: "Print the string 'Hello World' to the console.",
            initialCode: "// Initialize output\n",
            expectedOutput: ["Hello World"],
            hint: "Use quotes for strings: 'Hello World'"
          }
        ]
      },
      {
        id: '1-2',
        title: 'Variables (Memory)',
        type: 'lesson',
        xp: 0,
        theory: "Storing data for later use.",
        challenges: [
          {
            type: 'instruction',
            title: "Variables let vs const",
            content: "We have two main ways to store data:\n\n1. **let**: For data that changes (like a score).\n2. **const**: For data that stays constant (like a user ID).\n\nAlways default to `const` unless you know the value needs to change.",
            codeSnippet: "let score = 0;\nconst userId = 12345;"
          },
          {
            type: 'fill-gap',
            question: "Declare a variable that can be changed.",
            codeSnippet: "___ health = 100;",
            correctAnswer: "let",
            explanation: "`let` allows reassignment."
          },
          {
            type: 'write-code',
            question: "Create a `const` named `PI` with value 3.14. Log it.",
            initialCode: "",
            expectedOutput: [3.14],
            validationRegex: /const\s+PI/
          }
        ]
      },
      {
        id: '1-3',
        title: 'Data Types',
        type: 'lesson',
        xp: 0,
        theory: "Categorizing data: Strings, Numbers, and Booleans.",
        challenges: [
          {
            type: 'instruction',
            title: "Primitive Types",
            content: "JavaScript has three core primitives:\n\n- **Number**: Math-safe values (`10`, `3.5`).\n- **String**: Text enclosed in quotes (`'Admin'`).\n- **Boolean**: Logical switches (`true`, `false`).",
            codeSnippet: "let x = 10;       // Number\nlet y = '10';     // String\nlet z = true;     // Boolean"
          },
          {
            type: 'write-code',
            question: "Create a variable `isLive` set to `true`. Log it.",
            initialCode: "",
            expectedOutput: [true]
          }
        ]
      },
      {
        id: '1-exam',
        title: 'UNIT 1 CERTIFICATION',
        type: 'exam',
        xp: 100,
        theory: "Prove your knowledge of Foundations.",
        challenges: [
          {
            type: 'multiple-choice',
            question: "Which variable declaration forbids reassignment?",
            options: ["let", "var", "const", "static"],
            correctIndex: 2
          },
          {
            type: 'fill-gap',
            question: "Output 'Error' to the console.",
            codeSnippet: "console.___('Error');",
            correctAnswer: "log"
          },
          {
            type: 'write-code',
            question: "EXAM TASK: Define a mutable variable `count` at 0. Then output it.",
            initialCode: "",
            expectedOutput: [0],
            validationRegex: /let\s+count/
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    title: '02. Logic & Flow',
    description: 'Control the execution path of your code.',
    levels: [
      {
        id: '2-1',
        title: 'Comparisons',
        type: 'lesson',
        xp: 0,
        theory: "Evaluating truth.",
        challenges: [
          {
            type: 'instruction',
            title: "Comparison Operators",
            content: "We compare values to get a Boolean result:\n\n`>` Greater than\n`<` Less than\n`===` Strict Equality (Value AND Type)\n`!==` Strict Inequality",
            codeSnippet: "console.log(5 > 2);   // true\nconsole.log(5 === '5'); // false (Number vs String)"
          },
          {
            type: 'multiple-choice',
            question: "Evaluate: `10 !== 10`",
            options: ["true", "false", "undefined", "NaN"],
            correctIndex: 1,
            explanation: "10 is equal to 10, so 'not equal' is false."
          }
        ]
      },
      {
        id: '2-2',
        title: 'Logical Operators',
        type: 'lesson',
        xp: 0,
        theory: "Combining multiple conditions.",
        challenges: [
          {
            type: 'instruction',
            title: "AND (&&) vs OR (||)",
            content: "Sometimes we need to check two things at once.\n\n`&&` (AND): Both sides must be true.\n`||` (OR): Only one side needs to be true.",
            codeSnippet: "const hasId = true;\nconst hasTicket = false;\n\n// Returns false because one is missing\nconsole.log(hasId && hasTicket);"
          },
          {
            type: 'fill-gap',
            question: "Check if A OR B is true.",
            codeSnippet: "if (A ___ B) { ... }",
            correctAnswer: "||",
            explanation: "The double pipe `||` represents logical OR."
          }
        ]
      },
      {
        id: '2-3',
        title: 'If / Else Branching',
        type: 'lesson',
        xp: 0,
        theory: "Conditional execution.",
        challenges: [
          {
            type: 'write-code',
            question: "If `speed` > 50 log 'Slow Down', else log 'Good'.",
            initialCode: "const speed = 80;\n// Write logic below\n",
            expectedOutput: ["Slow Down"],
            validationRegex: /if\s*\(.*speed.*50.*\)/
          }
        ]
      },
      {
        id: '2-exam',
        title: 'UNIT 2 CERTIFICATION',
        type: 'exam',
        xp: 100,
        theory: "Verify your logic skills.",
        challenges: [
          {
            type: 'multiple-choice',
            question: "Which operator represents 'Strict Equality'?",
            options: ["=", "==", "===", "equals"],
            correctIndex: 2
          },
          {
            type: 'write-code',
            question: "EXAM TASK: Check if 10 is greater than 5 AND 5 is greater than 1. Log the result.",
            initialCode: "",
            expectedOutput: [true],
            validationRegex: /&&/
          }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    title: '03. Loops (Iteration)',
    description: 'Automate repetitive tasks with loops.',
    levels: [
      {
        id: '3-1',
        title: 'The While Loop',
        type: 'lesson',
        xp: 0,
        theory: "Repeating code while a condition holds true.",
        challenges: [
          {
            type: 'instruction',
            title: "While Loops",
            content: "A `while` loop runs code over and over as long as the condition is true. Be careful! If the condition never becomes false, you get an infinite loop.",
            codeSnippet: "let i = 0;\nwhile (i < 3) {\n  console.log(i);\n  i = i + 1;\n}"
          },
          {
            type: 'write-code',
            question: "Create a loop that prints 0, then 1. Stop before 2.",
            initialCode: "let i = 0;\nwhile (i < ___) {\n  console.log(i);\n  i = i + 1;\n}",
            expectedOutput: [0, 1]
          }
        ]
      },
      {
        id: '3-2',
        title: 'The For Loop',
        type: 'lesson',
        xp: 0,
        theory: "The standard tool for iteration.",
        challenges: [
          {
            type: 'instruction',
            title: "For Loops",
            content: "The `for` loop packages the setup, condition, and update into one line.\n\nFormat: `for (start; stop; step)`",
            codeSnippet: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}"
          },
          {
            type: 'fill-gap',
            question: "Complete the loop header.",
            codeSnippet: "for (let i = 0; i < 5; i___) { }",
            correctAnswer: "++",
            explanation: "`i++` is shorthand for `i = i + 1`."
          },
          {
            type: 'write-code',
            question: "Write a for loop that logs numbers 0 to 4.",
            initialCode: "",
            expectedOutput: [0, 1, 2, 3, 4],
            validationRegex: /for\s*\(/
          }
        ]
      },
      {
        id: '3-exam',
        title: 'UNIT 3 CERTIFICATION',
        type: 'exam',
        xp: 120,
        theory: "Test your iteration capabilities.",
        challenges: [
          {
            type: 'multiple-choice',
            question: "What happens if you forget to increment the loop variable?",
            options: ["Syntax Error", "Infinite Loop", "Nothing", "It runs once"],
            correctIndex: 1
          },
          {
            type: 'write-code',
            question: "EXAM TASK: Write a for loop that logs 1, 2, 3.",
            initialCode: "",
            expectedOutput: [1, 2, 3],
            validationRegex: /for/
          }
        ]
      }
    ]
  },
  {
    id: 'unit-4',
    title: '04. Functions & Scope',
    description: 'Modular code and return values.',
    levels: [
      {
        id: '4-1',
        title: 'Basic Functions',
        type: 'lesson',
        xp: 0,
        theory: "Defining reusable subroutines.",
        challenges: [
          {
            type: 'instruction',
            title: "Defining Functions",
            content: "Functions are reusable blocks of code. You define them once, and call them many times.",
            codeSnippet: "function sayHi() {\n  console.log('Hi');\n}\nsayHi();"
          },
          {
            type: 'write-code',
            question: "Define a function `greet` that logs 'Hello'. Call it.",
            initialCode: "",
            expectedOutput: ["Hello"],
            validationRegex: /function\s+greet/
          }
        ]
      },
      {
        id: '4-2',
        title: 'Return Values',
        type: 'lesson',
        xp: 0,
        theory: "Getting data OUT of a function.",
        challenges: [
          {
            type: 'instruction',
            title: "The Return Keyword",
            content: "Most functions don't just log things; they calculate data and give it back. We use `return` for this.\n\nOnce a function hits `return`, it stops immediately.",
            codeSnippet: "function add(a, b) {\n  return a + b;\n}\n\nlet result = add(2, 2); // result is 4"
          },
          {
            type: 'write-code',
            question: "Write a function `getFive` that returns the number 5. Log the result of calling it.",
            initialCode: "",
            expectedOutput: [5],
            validationRegex: /return\s+5/
          }
        ]
      },
      {
        id: '4-exam',
        title: 'UNIT 4 CERTIFICATION',
        type: 'exam',
        xp: 150,
        theory: "Mastery of Modularization.",
        challenges: [
          {
            type: 'multiple-choice',
            question: "Does code run after the return statement?",
            options: ["Yes", "No", "Only if there is an error", "Sometimes"],
            correctIndex: 1
          },
          {
            type: 'write-code',
            question: "EXAM TASK: Create a function `square(n)` that returns n * n. Log `square(4)`.",
            initialCode: "",
            expectedOutput: [16],
            validationRegex: /return/
          }
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    title: '05. Data Structures',
    description: 'Arrays and Objects.',
    levels: [
      {
        id: '5-1',
        title: 'Arrays',
        type: 'lesson',
        xp: 0,
        theory: "Lists of data.",
        challenges: [
          {
            type: 'instruction',
            title: "Arrays",
            content: "Arrays allow you to store lists of data. They are Zero-indexed.",
            codeSnippet: "let nums = [10, 20, 30];\nconsole.log(nums[0]); // 10"
          },
          {
            type: 'write-code',
            question: "Create an array `list` with numbers 1 and 2. Log the second number.",
            initialCode: "",
            expectedOutput: [2]
          }
        ]
      },
      {
        id: '5-2',
        title: 'Objects',
        type: 'lesson',
        xp: 0,
        theory: "Key-Value pairs.",
        challenges: [
          {
            type: 'instruction',
            title: "Objects",
            content: "While Arrays are for ordered lists, **Objects** are for structured data with labels (keys).\n\nWe use curly braces `{ }`.",
            codeSnippet: "const player = {\n  name: 'Hero',\n  score: 100\n};\n\nconsole.log(player.name); // 'Hero'"
          },
          {
            type: 'fill-gap',
            question: "Access the `age` property of user.",
            codeSnippet: "console.log(user.___ );",
            correctAnswer: "age",
            explanation: "Dot notation `object.key` is used to access values."
          },
          {
            type: 'write-code',
            question: "Create an object `car` with key `color` set to 'red'. Log the color.",
            initialCode: "",
            expectedOutput: ["red"],
            validationRegex: /\{/
          }
        ]
      },
      {
        id: '5-exam',
        title: 'UNIT 5 CERTIFICATION',
        type: 'exam',
        xp: 200,
        theory: "The Final Data Test.",
        challenges: [
          {
            type: 'multiple-choice',
            question: "How do you access the value of key 'id' in object 'user'?",
            options: ["user[id]", "user.id", "user(id)", "user->id"],
            correctIndex: 1
          },
          {
            type: 'write-code',
            question: "EXAM TASK: Create an object `me` with a key `name` (string). Log the name.",
            initialCode: "",
            expectedOutput: (out) => typeof out[0] === 'string',
            validationRegex: /:/
          }
        ]
      }
    ]
  },
  {
    id: 'unit-6',
    title: '06. Modern JS (ES6)',
    description: 'Cleaner code with Template Literals & Destructuring.',
    levels: [
      {
        id: '6-1',
        title: 'Template Literals',
        type: 'lesson',
        xp: 0,
        theory: "A better way to write strings.",
        challenges: [
          {
            type: 'instruction',
            title: "Backticks ` `",
            content: "Instead of adding strings with `+`, use backticks `` ` `` to embed variables directly using `${}`.\n\nThis is called String Interpolation.",
            codeSnippet: "let name = 'Dev';\nconsole.log(`Hello ${name}`);"
          },
          {
            type: 'fill-gap',
            question: "Complete the template literal.",
            codeSnippet: "console.log(`User: ${user.___}`);",
            correctAnswer: "name",
            explanation: "We access the variable inside the curly braces."
          },
          {
            type: 'write-code',
            question: "Use backticks to log `Level: 5` where 5 is a variable `lvl`.",
            initialCode: "const lvl = 5;\n// Use backticks\n",
            expectedOutput: ["Level: 5"],
            validationRegex: /`/
          }
        ]
      },
      {
        id: '6-exam',
        title: 'UNIT 6 CERTIFICATION',
        type: 'exam',
        xp: 200,
        theory: "ES6 Fluency Check.",
        challenges: [
          {
            type: 'multiple-choice',
            question: "Which symbol is used for Template Literals?",
            options: ["' (Single Quote)", "\" (Double Quote)", "` (Backtick)", ". (Dot)"],
            correctIndex: 2
          },
          {
            type: 'write-code',
            question: "EXAM TASK: Create a variable `item` = 'Sword'. Log `Equipped: Sword` using backticks.",
            initialCode: "",
            expectedOutput: ["Equipped: Sword"],
            validationRegex: /`/
          }
        ]
      }
    ]
  },
  {
    id: 'unit-7',
    title: '07. The DOM',
    description: 'Interacting with the Web Page.',
    levels: [
      {
        id: '7-1',
        title: 'Selecting Elements',
        type: 'lesson',
        xp: 0,
        theory: "JavaScript lives in the browser.",
        challenges: [
          {
            type: 'instruction',
            title: "The Document Object",
            content: "The `document` object represents your webpage. To find an HTML element, use `document.querySelector()`.\n\nIt works like CSS selectors.",
            codeSnippet: "const btn = document.querySelector('.my-button');"
          },
          {
            type: 'fill-gap',
            question: "Select the element with ID 'title'.",
            codeSnippet: "document.querySelector('___title');",
            correctAnswer: "#",
            explanation: "ID selectors start with a hash #."
          }
        ]
      },
      {
        id: '7-exam',
        title: 'UNIT 7 CERTIFICATION',
        type: 'exam',
        xp: 250,
        theory: "Web Interaction Mastery.",
        challenges: [
          {
            type: 'multiple-choice',
            question: "What does `querySelector` return if nothing is found?",
            options: ["null", "undefined", "Error", "false"],
            correctIndex: 0
          },
          {
            type: 'instruction',
            title: "Mocking the DOM",
            content: "In this environment, we mock the DOM. `console.log` is essentially our way of proving we selected something correctly.",
            codeSnippet: "console.log('Element selected');"
          },
          {
            type: 'write-code',
            question: "EXAM TASK: Log the string 'Button Clicked' to simulate an event.",
            initialCode: "",
            expectedOutput: ["Button Clicked"]
          }
        ]
      }
    ]
  }
];

// --- UTILS ---

const runUserCode = (code) => {
  const logs = [];
  let loops = 0;
  
  const mockConsole = {
    log: (...args) => {
      logs.push(args.length === 1 ? args[0] : args); 
    },
    error: (e) => logs.push(`Error: ${e}`),
    warn: (w) => logs.push(`Warning: ${w}`)
  };

  // Mock document for DOM lessons
  const mockDocument = {
    querySelector: (selector) => ({ innerText: "Mock Element", selector }),
    getElementById: (id) => ({ innerText: "Mock Element", id })
  };

  try {
    // Basic infinite loop protection
    const safeCode = code.replace(/while\s*\((.*?)\)\s*\{/g, `
      let _safeguard = 0;
      while($1) {
        _safeguard++;
        if(_safeguard > 1000) throw new Error("Infinite Loop Detected");
    `).replace(/for\s*\((.*?)\)\s*\{/g, `
      let _safeguard = 0;
      for($1) {
        _safeguard++;
        if(_safeguard > 1000) throw new Error("Infinite Loop Detected");
    `);

    const fn = new Function('console', 'document', safeCode);
    fn(mockConsole, mockDocument);
  } catch (err) {
    logs.push(`Runtime Error: ${err.message}`);
  }
  return logs;
};

// --- COMPONENTS ---

const DashboardHeader = ({ hearts, xp, streak }) => (
  <header className="sticky top-0 z-50 bg-[#0b1120]/80 backdrop-blur-xl border-b border-slate-800/60 px-4 md:px-6 py-4 flex justify-between items-center w-full">
    <div className="flex items-center space-x-3 group cursor-pointer">
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
        <Terminal className="text-white w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <span className="font-sans font-bold text-slate-100 text-lg tracking-tight leading-none">JS Lingo</span>
        <span className="text-[10px] font-mono text-indigo-400 font-semibold tracking-wider uppercase">Pro Edition</span>
      </div>
    </div>
    
    <div className="flex items-center space-x-4 md:space-x-8">
      {/* Lives / System Integrity */}
      <div className="flex flex-col items-end">
         <div className="flex items-center space-x-1.5 mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Integrity</span>
            <Activity className="w-3 h-3 text-emerald-500" />
         </div>
         <div className="flex space-x-1">
           {[...Array(5)].map((_, i) => (
             <div key={i} className={`h-1.5 w-3 rounded-full transition-all duration-300 ${i < hearts ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-800'}`} />
           ))}
        </div>
      </div>

      {/* XP / Score - Only for Exams */}
      <div className="flex flex-col items-end min-w-[60px]">
        <div className="flex items-center space-x-1.5 mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cert. Score</span>
            <Award className="w-3 h-3 text-amber-500" />
         </div>
         <span className="font-mono font-bold text-slate-100">{xp}</span>
      </div>
    </div>
  </header>
);

const CurriculumView = ({ progress, onStartLevel }) => {
  return (
    <div className="pb-32 max-w-4xl mx-auto px-4 mt-8 md:mt-12">
      {CURRICULUM.map((unit, uIdx) => (
        <div key={unit.id} className="mb-12 animate-in slide-in-from-bottom-5 duration-500" style={{animationDelay: `${uIdx * 100}ms`}}>
          
          {/* Unit Header */}
          <div className="flex items-end justify-between mb-6 px-2">
             <div>
               <div className="flex items-center space-x-2 mb-2">
                 <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">Module {uIdx + 1}</span>
               </div>
               <h3 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">{unit.title.split('. ')[1]}</h3>
               <p className="text-slate-400 text-sm mt-1">{unit.description}</p>
             </div>
          </div>

          {/* Grid Layout for Levels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unit.levels.map((level, lIdx) => {
              const globalIdx = CURRICULUM.slice(0, uIdx).reduce((acc, u) => acc + u.levels.length, 0) + lIdx;
              const isCompleted = globalIdx < progress.completedLevels;
              const isCurrent = globalIdx === progress.completedLevels;
              const isLocked = globalIdx > progress.completedLevels;
              const isExam = level.type === 'exam';

              return (
                <button
                  key={level.id}
                  onClick={() => !isLocked && onStartLevel(unit, level, globalIdx)}
                  disabled={isLocked}
                  className={`
                    group relative overflow-hidden rounded-2xl p-0.5 text-left transition-all duration-300
                    ${isLocked ? 'opacity-60 cursor-not-allowed grayscale' : 'cursor-pointer hover:-translate-y-1 hover:shadow-2xl'}
                    ${isCurrent && !isLocked ? 'ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/20' : ''}
                    ${isExam ? 'md:col-span-2' : ''}
                  `}
                >
                  {/* Background Gradient Border Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${isExam ? 'from-amber-500 via-orange-500 to-red-500' : 'from-indigo-500 via-violet-500 to-blue-500'}`} />
                  
                  {/* Card Content */}
                  <div className={`
                    relative h-full bg-[#0f172a] rounded-[14px] p-5 flex items-center justify-between
                    ${isExam ? 'bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-indigo-500/30' : 'border border-slate-800'}
                  `}>
                    <div className="flex items-center space-x-4">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner
                        ${isCompleted 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                          : isCurrent
                             ? isExam ? 'bg-amber-500 text-white shadow-amber-500/40' : 'bg-indigo-600 text-white shadow-indigo-500/40'
                             : 'bg-slate-800 text-slate-500 border border-slate-700'}
                      `}>
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : (isExam ? <Award className="w-6 h-6"/> : lIdx + 1)}
                      </div>
                      
                      <div>
                         <h4 className={`font-bold text-base md:text-lg ${isCompleted ? 'text-slate-400' : 'text-slate-100'}`}>
                           {level.title}
                         </h4>
                         <div className="flex items-center space-x-2 mt-1">
                           <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${isExam ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-400'}`}>
                             {isExam ? 'CERTIFICATION EXAM' : 'LESSON'}
                           </span>
                           {isExam && (
                              <span className="text-xs font-mono text-amber-500 flex items-center">
                                <Award className="w-3 h-3 mr-1" /> {level.xp} PTS
                              </span>
                           )}
                         </div>
                      </div>
                    </div>

                    <div className="text-slate-600 pl-4">
                      {isLocked 
                        ? <Lock className="w-5 h-5" /> 
                        : isCompleted 
                          ? <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center"><Check className="w-4 h-4 text-emerald-500"/></div>
                          : <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isExam ? 'bg-amber-500/20 text-amber-500' : 'bg-indigo-500/20 text-indigo-400'}`}><Play className="w-4 h-4 fill-current"/></div>
                      }
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const QuickKeys = ({ onInsert }) => {
  const keys = ['{', '}', '(', ')', '[', ']', '=>', ';', '=', '"', "'", '`', 'const', 'let', 'return'];
  
  return (
    <div className="flex overflow-x-auto py-3 px-2 bg-[#0b1120] border-b border-slate-800 no-scrollbar space-x-3 items-center shadow-lg z-10">
      {keys.map(k => (
        <button 
          key={k} 
          onClick={() => onInsert(k)}
          className="flex-shrink-0 bg-slate-800 text-indigo-300 font-mono text-sm px-4 py-2 rounded-lg border border-slate-700 shadow-sm active:bg-indigo-600 active:text-white active:border-indigo-500 transition-colors"
        >
          {k}
        </button>
      ))}
    </div>
  );
};

const IdeEnvironment = ({ unit, level, onClose, onComplete }) => {
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [fillGapAnswer, setFillGapAnswer] = useState("");
  const [feedback, setFeedback] = useState(null); 
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [lives, setLives] = useState(5);
  const [logs, setLogs] = useState([]);
  const textAreaRef = useRef(null);
  const terminalEndRef = useRef(null);

  const challenge = level.challenges[currentChallengeIdx];
  const isLastChallenge = currentChallengeIdx === level.challenges.length - 1;
  const isInstruction = challenge.type === 'instruction';
  const isExam = level.type === 'exam';

  useEffect(() => {
    if (challenge.type === 'write-code') {
      setUserCode(challenge.initialCode || "");
    } else {
      setUserCode("");
    }
    setFillGapAnswer("");
    setFeedback(null);
    setLogs([]);
  }, [currentChallengeIdx, challenge]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const insertText = (text) => {
    if (!textAreaRef.current) return;
    const start = textAreaRef.current.selectionStart;
    const end = textAreaRef.current.selectionEnd;
    const newCode = userCode.substring(0, start) + text + userCode.substring(end);
    setUserCode(newCode);
    setTimeout(() => {
      if(textAreaRef.current) {
        textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = start + text.length;
        textAreaRef.current.focus();
      }
    }, 0);
  };

  const handleCheck = () => {
    if (isInstruction) {
      handleContinue();
      return;
    }

    let isCorrect = false;
    let msg = "";

    if (challenge.type === 'multiple-choice') {
      const selectedIdx = parseInt(userCode);
      if (selectedIdx === challenge.correctIndex) isCorrect = true;
      else msg = "Incorrect selection.";
    } 
    else if (challenge.type === 'fill-gap') {
      if (fillGapAnswer.trim() === challenge.correctAnswer) isCorrect = true;
      else msg = "Syntax Error: Token mismatch.";
    } 
    else if (challenge.type === 'write-code') {
      const output = runUserCode(userCode);
      setLogs(output);
      const lastLog = output[output.length - 1];
      const isLoop = lastLog && String(lastLog).includes("Infinite Loop");

      if (isLoop) {
        msg = "Fatal Error: Infinite Loop detected.";
        isCorrect = false;
      } else if (challenge.validationRegex && !challenge.validationRegex.test(userCode)) {
         msg = "Syntax Error: Code pattern mismatch.";
         isCorrect = false;
      } else if (challenge.expectedOutput) {
        if (typeof challenge.expectedOutput === 'function') {
           if (challenge.expectedOutput(output)) isCorrect = true;
           else msg = "Runtime Error: Unexpected output.";
        } else {
           if (JSON.stringify(output) === JSON.stringify(challenge.expectedOutput)) isCorrect = true;
           else msg = `Runtime Error: Expected ${JSON.stringify(challenge.expectedOutput)}, got ${JSON.stringify(output)}`;
        }
      } else {
        isCorrect = true;
      }
    }

    if (isCorrect) {
      setFeedback('success');
      setFeedbackMsg(challenge.explanation || "Execution successful.");
    } else {
      setFeedback('error');
      setFeedbackMsg(msg || "Execution failed.");
      setLives(l => Math.max(0, l - 1));
    }
  };

  const handleContinue = () => {
    if (isLastChallenge) {
      onComplete(level.xp);
    } else {
      setCurrentChallengeIdx(prev => prev + 1);
    }
  };

  if (lives === 0) {
    return (
      <div className="fixed inset-0 bg-[#0f172a] z-50 flex flex-col items-center justify-center p-6 text-center font-mono animate-in fade-in duration-500">
        <div className="bg-rose-500/10 p-8 rounded-full mb-8 ring-1 ring-rose-500/30 shadow-[0_0_40px_rgba(244,63,94,0.2)]">
           <Activity className="w-16 h-16 text-rose-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">System Integrity Critical</h2>
        <p className="text-slate-400 mb-10 text-lg">Process terminated. Reset required.</p>
        <button onClick={onClose} className="px-8 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors">
          Reboot System
        </button>
      </div>
    );
  }

  const progressPct = ((currentChallengeIdx) / level.challenges.length) * 100;

  return (
    <div className="fixed inset-0 bg-[#0f172a] z-50 flex flex-col h-full font-sans text-slate-200">
      
      {/* IDE Header */}
      <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-[#0b1120]">
        <button onClick={onClose} className="text-slate-400 hover:text-white transition p-2 hover:bg-slate-800 rounded-full">
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 mx-6 flex flex-col justify-center">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
             <span>Progress</span>
             <span>{Math.round(progressPct)}%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
             <div className={`h-full transition-all duration-500 ease-out shadow-[0_0_10px_currentColor] ${isExam ? 'bg-amber-500 text-amber-500' : 'bg-indigo-500 text-indigo-500'}`} style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
          <Activity className={`w-4 h-4 ${lives < 3 ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`} />
          <span className="font-mono font-bold text-sm text-slate-300">{lives}</span>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Panel: Content */}
        <div className={`
           flex-1 p-6 lg:p-10 lg:border-r border-slate-800 overflow-y-auto bg-slate-900/30
           ${challenge.type === 'write-code' ? 'max-h-[40vh] lg:max-h-full' : 'h-full'}
        `}>
           {isInstruction ? (
             <div className="animate-in fade-in slide-in-from-left-4 duration-500">
               <div className="flex items-center space-x-2 text-indigo-400 mb-6 font-mono text-xs uppercase tracking-widest">
                  <BookOpen className="w-4 h-4" />
                  <span>Documentation</span>
               </div>
               <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{challenge.title}</h1>
               <div className="prose prose-invert prose-p:text-slate-300 prose-p:text-lg prose-p:leading-relaxed prose-code:text-indigo-300 prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md max-w-none">
                 <p className="whitespace-pre-wrap">{challenge.content}</p>
               </div>
               {challenge.codeSnippet && (
                 <div className="mt-8 bg-[#0b1120] rounded-xl border border-slate-800 p-5 font-mono text-sm shadow-xl overflow-hidden">
                    <div className="flex space-x-1.5 mb-3 opacity-50">
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                    </div>
                    <pre className="text-indigo-300 overflow-x-auto selection:bg-indigo-500/30">{challenge.codeSnippet}</pre>
                 </div>
               )}
             </div>
           ) : (
             <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <div className={`flex items-center space-x-2 mb-6 font-mono text-xs uppercase tracking-widest ${isExam ? 'text-amber-500' : 'text-emerald-400'}`}>
                  {isExam ? <AlertTriangle className="w-4 h-4"/> : <Code className="w-4 h-4" />}
                  <span>{isExam ? 'Exam Question' : 'Task Required'}</span>
               </div>
               <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{challenge.question}</h2>
               
               {/* Multiple Choice */}
               {challenge.type === 'multiple-choice' && (
                 <div className="space-y-3">
                   {challenge.options.map((opt, idx) => (
                     <button
                        key={idx}
                        disabled={feedback !== null}
                        onClick={() => setUserCode(idx.toString())}
                        className={`
                          w-full p-5 text-left font-mono text-sm md:text-base rounded-xl border-2 transition-all duration-200 group
                          ${parseInt(userCode) === idx 
                            ? 'bg-indigo-900/40 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                            : 'bg-slate-800/50 border-transparent text-slate-300 hover:bg-slate-800 hover:border-slate-600'}
                          ${feedback && parseInt(userCode) === idx 
                             ? feedback === 'success' ? '!bg-emerald-900/40 !border-emerald-500 !text-white' : '!bg-rose-900/40 !border-rose-500 !text-white'
                             : ''}
                        `}
                     >
                       <span className="inline-block w-8 opacity-50 text-xs font-bold">0{idx + 1}</span>
                       {opt}
                     </button>
                   ))}
                 </div>
               )}

               {/* Fill Gap */}
               {challenge.type === 'fill-gap' && (
                 <div className="bg-[#0b1120] p-6 md:p-8 rounded-2xl border border-slate-800 font-mono text-lg md:text-xl text-slate-200 shadow-inner">
                    {challenge.codeSnippet.split('___').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        <span className="text-indigo-300">{part}</span>
                        {i < arr.length - 1 && (
                          <input
                            type="text"
                            disabled={feedback !== null}
                            value={fillGapAnswer}
                            onChange={(e) => setFillGapAnswer(e.target.value)}
                            className="mx-2 w-32 bg-slate-800 border-b-2 border-indigo-500 text-center focus:outline-none focus:bg-slate-700 text-white p-1 rounded-t transition-colors"
                            autoFocus
                            placeholder="?"
                          />
                        )}
                      </React.Fragment>
                    ))}
                 </div>
               )}
             </div>
           )}
        </div>

        {/* Right Panel: Editor / Terminal */}
        {(challenge.type === 'write-code' || window.innerWidth > 1024) && (
          <div className={`flex flex-col border-t lg:border-t-0 lg:w-1/2 bg-[#0b1120] h-full ${challenge.type !== 'write-code' && 'hidden lg:flex'}`}>
             
             {/* Editor Bar */}
             <div className="bg-[#0b1120] px-4 py-2 text-xs font-mono text-slate-500 border-b border-slate-800 flex justify-between items-center select-none">
                <div className="flex space-x-2">
                   <span className="text-indigo-400 font-bold">script.js</span>
                </div>
                <Smartphone className="w-3 h-3 lg:hidden text-indigo-500" />
             </div>

             {/* Mobile Quick Keys */}
             <div className="lg:hidden">
               <QuickKeys onInsert={insertText} />
             </div>

             {/* Code Area */}
             <div className="flex-1 relative min-h-[200px]">
                {challenge.type === 'write-code' ? (
                   <textarea
                     ref={textAreaRef}
                     value={userCode}
                     onChange={(e) => setUserCode(e.target.value)}
                     className="w-full h-full bg-[#0b1120] p-5 font-mono text-sm md:text-base text-slate-300 resize-none focus:outline-none leading-relaxed selection:bg-indigo-500/30"
                     spellCheck="false"
                     placeholder="// Initialize code sequence..."
                   />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 font-mono text-sm">
                    <Code className="w-12 h-12 mb-4 opacity-20" />
                    <span>// Awaiting input signal</span>
                  </div>
                )}
             </div>

             {/* Terminal Area */}
             <div className="h-48 md:h-56 bg-black border-t border-slate-800 flex flex-col font-mono text-xs md:text-sm">
                <div className="px-4 py-2 bg-slate-900 text-slate-500 flex justify-between items-center border-b border-slate-800">
                   <span className="font-bold tracking-wider text-[10px]">TERMINAL OUTPUT</span>
                   <button onClick={() => setLogs([])} className="hover:text-white transition"><RefreshCw className="w-3 h-3"/></button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto text-slate-300 space-y-1.5 font-medium">
                   {logs.length === 0 && <span className="opacity-30 italic"> Ready...</span>}
                   {logs.map((l, i) => (
                     <div key={i} className="flex group">
                       <span className="text-indigo-500 mr-3 select-none">➜</span>
                       <span className="group-hover:text-white transition-colors">{typeof l === 'object' ? JSON.stringify(l) : String(l)}</span>
                     </div>
                   ))}
                   <div ref={terminalEndRef} />
                </div>
             </div>
          </div>
        )}

      </div>

      {/* Action Bar */}
      <div className={`
        p-4 border-t transition-colors duration-300 flex justify-between items-center z-50
        ${feedback === 'success' ? 'bg-emerald-950/50 border-emerald-900 backdrop-blur' : 
          feedback === 'error' ? 'bg-rose-950/50 border-rose-900 backdrop-blur' : 'bg-[#0f172a] border-slate-800'}
      `}>
         <div className="flex-1">
           {feedback === 'success' && <div className="text-emerald-400 font-mono text-sm font-bold flex items-center animate-in slide-in-from-bottom-2"><CheckCircle2 className="w-5 h-5 mr-2"/> {feedbackMsg}</div>}
           {feedback === 'error' && <div className="text-rose-400 font-mono text-sm font-bold flex items-center animate-in slide-in-from-bottom-2"><AlertTriangle className="w-5 h-5 mr-2"/> {feedbackMsg}</div>}
         </div>

         <button 
           onClick={feedback || isInstruction ? handleContinue : handleCheck}
           className={`
             px-8 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5
             ${isInstruction 
               ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20' 
               : !feedback 
                 ? isExam ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20' : 'bg-white hover:bg-slate-200 text-slate-900 shadow-white/10' 
                 : feedback === 'success'
                   ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
                   : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'}
           `}
         >
           {isInstruction ? 'Continue' : feedback ? (isLastChallenge && feedback === 'success' ? 'Complete' : 'Next') : isExam ? 'Submit' : 'Execute'}
         </button>
      </div>

    </div>
  );
};

const CompletionScreen = ({ xp, onHome, isExam }) => (
  <div className="fixed inset-0 bg-[#0f172a] z-50 flex flex-col items-center justify-center p-8 text-center font-mono animate-in zoom-in duration-300">
     
     {/* Glow Background */}
     <div className={`absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none ${isExam ? 'bg-amber-500' : 'bg-emerald-500'}`} />

     <div className={`
        relative w-32 h-32 rounded-3xl flex items-center justify-center mb-8 shadow-2xl ring-1 
        ${isExam ? 'bg-gradient-to-br from-amber-500 to-orange-600 ring-amber-400/50 shadow-amber-500/30' : 'bg-gradient-to-br from-emerald-500 to-teal-600 ring-emerald-400/50 shadow-emerald-500/30'} 
     `}>
        {isExam ? <Award className="w-16 h-16 text-white" /> : <Sparkles className="w-16 h-16 text-white" />}
     </div>
     
     <h2 className="relative text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
       {isExam ? 'Certification Granted' : 'Module Complete'}
     </h2>
     
     <p className="relative text-slate-400 mb-10 text-lg max-w-md mx-auto">
       {isExam ? 'You have successfully demonstrated mastery of the unit concepts.' : 'Knowledge base updated. Ready for next sequence.'}
     </p>
     
     {isExam && (
       <div className="relative flex items-center space-x-3 bg-slate-900/80 backdrop-blur px-8 py-4 rounded-2xl border border-slate-800 mb-12 shadow-xl">
          <Award className="text-amber-400 w-6 h-6" />
          <span className="text-2xl text-slate-100 font-bold">+{xp} Score</span>
       </div>
     )}

     <button 
       onClick={onHome}
       className="relative px-12 py-4 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
     >
       Return to Dashboard
     </button>
  </div>
);

export default function App() {
  const [view, setView] = useState('map'); 
  const [activeUnit, setActiveUnit] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [earnedXP, setEarnedXP] = useState(0);

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('jslingo_pro_progress');
    return saved ? JSON.parse(saved) : {
      completedLevels: 0,
      xp: 0,
      hearts: 5,
      streak: 1
    };
  });

  useEffect(() => {
    localStorage.setItem('jslingo_pro_progress', JSON.stringify(progress));
  }, [progress]);

  const startLevel = (unit, level, globalIdx) => {
    if (progress.hearts <= 0) {
      return;
    }
    setActiveUnit(unit);
    setActiveLevel(level);
    setView('lesson');
  };

  const finishLevel = (xp) => {
    setEarnedXP(xp);
    setProgress(prev => {
      const unitIdx = CURRICULUM.findIndex(u => u.id === activeUnit.id);
      const levelIdx = activeUnit.levels.findIndex(l => l.id === activeLevel.id);
      const currentGlobalIdx = CURRICULUM.slice(0, unitIdx).reduce((acc, u) => acc + u.levels.length, 0) + levelIdx;
      
      const newCompleted = Math.max(prev.completedLevels, currentGlobalIdx + 1);
      
      return {
        ...prev,
        xp: prev.xp + xp,
        completedLevels: newCompleted
      };
    });
    setView('completed');
  };

  const goHome = () => {
    setView('map');
    setActiveLevel(null);
    setActiveUnit(null);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 selection:bg-indigo-500/30">
      {view === 'map' && (
        <>
          <DashboardHeader hearts={progress.hearts} xp={progress.xp} streak={progress.streak} />
          <CurriculumView progress={progress} onStartLevel={startLevel} />
        </>
      )}

      {view === 'lesson' && activeLevel && (
        <IdeEnvironment 
          unit={activeUnit} 
          level={activeLevel} 
          onClose={goHome} 
          onComplete={finishLevel}
        />
      )}

      {view === 'completed' && (
        <CompletionScreen 
           xp={earnedXP} 
           onHome={goHome} 
           isExam={activeLevel?.type === 'exam'}
        />
      )}
    </div>
  );
}
