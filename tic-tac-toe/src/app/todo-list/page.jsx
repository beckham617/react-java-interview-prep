'use client';

import { useReducer, useState, createContext, useContext, useTransition, useDeferredValue, useMemo, useEffect } from 'react';

// Theme Context
const ThemeContext = createContext();

// Theme Provider Component
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };
    
    const value = {
        theme,
        toggleTheme,
        isDark: theme === 'dark'
    };
    
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use theme context
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Action types
const TODO_ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    TOGGLE_TASK: 'TOGGLE_TASK',
    DELETE_TASK: 'DELETE_TASK',
    REMOVE_COMPLETED: 'REMOVE_COMPLETED'
};

// Expensive calculation function to simulate slow render
function expensiveCalculation(tasks) {
    console.log('🔄 Starting expensive calculation...');
    const startTime = performance.now();
    
    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.random() * tasks.length;
    }
    
    // Additional expensive operations
    const taskStats = {
        total: tasks.length,
        completed: tasks.filter(task => task.completed).length,
        pending: tasks.filter(task => !task.completed).length,
        averageTextLength: tasks.reduce((sum, task) => sum + task.text.length, 0) / tasks.length || 0,
        longestTask: tasks.reduce((longest, task) => 
            task.text.length > longest.length ? task.text : longest, ''),
        shortestTask: tasks.reduce((shortest, task) => 
            task.text.length < shortest.length ? task.text : shortest, tasks[0]?.text || ''),
        // Simulate more expensive calculations
        fibonacci: (n) => {
            if (n <= 1) return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    };
    
    // Calculate fibonacci for demonstration (this is intentionally slow)
    taskStats.fibonacciResult = taskStats.fibonacci(Math.min(35, tasks.length + 20));
    
    const endTime = performance.now();
    console.log(`⏱️ Expensive calculation completed in ${(endTime - startTime).toFixed(2)}ms`);
    
    return {
        ...taskStats,
        calculationTime: endTime - startTime
    };
}

// Reducer function
function todoReducer(state, action) {
    switch (action.type) {
        case TODO_ACTIONS.ADD_TASK:
            return [...state, action.payload];
        
        case TODO_ACTIONS.TOGGLE_TASK:
            return state.map(task => 
                task.id === action.payload 
                    ? { ...task, completed: !task.completed }
                    : task
            );
        
        case TODO_ACTIONS.DELETE_TASK:
            return state.filter(task => task.id !== action.payload);
        
        case TODO_ACTIONS.REMOVE_COMPLETED:
            return state.filter(task => !task.completed);
        
        default:
            return state;
    }
}

function TextInput({onAddTask}) {
    const [task, setTask] = useState('');
    const { theme, isDark } = useTheme(); // Using theme context

    const handleAddTask = () => {
        if (!task.trim()) return;
        const newTask = {
            id: Date.now(),
            text: task,
            completed: false
        };
        onAddTask(newTask);
        setTask('');
    }

    const inputStyle = {
        padding: '8px 12px',
        border: `2px solid ${isDark ? '#555' : '#ddd'}`,
        borderRadius: '4px',
        backgroundColor: isDark ? '#333' : '#fff',
        color: isDark ? '#fff' : '#333',
        marginRight: '8px'
    };

    const buttonStyle = {
        padding: '8px 16px',
        backgroundColor: isDark ? '#007acc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Add a new todo" 
                value={task} 
                onChange={(e) => setTask(e.target.value)}
                style={inputStyle}
            />
            <button onClick={handleAddTask} style={buttonStyle}>
                Add
            </button>
        </div>
    );
}

function TodoList({tasks, onToggleTask, onDeleteTask}) {
    const { isDark } = useTheme(); // Using theme context

    const listStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0
    };

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px',
        margin: '4px 0',
        backgroundColor: isDark ? '#444' : '#f8f9fa',
        borderRadius: '4px',
        border: `1px solid ${isDark ? '#555' : '#e9ecef'}`
    };

    const checkboxStyle = {
        cursor: 'pointer'
    };

    const textStyle = {
        flex: 1,
        color: isDark ? '#fff' : '#333',
        textDecoration: 'line-through'
    };

    const deleteButtonStyle = {
        padding: '4px 8px',
        backgroundColor: isDark ? '#dc3545' : '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
    };

    return (
        <div>
            <ul style={listStyle}>
                {tasks.map((task) => (
                    <li key={task.id} style={itemStyle}>
                        <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={() => onToggleTask(task.id)}
                            style={checkboxStyle}
                        />
                        <span style={{
                            ...textStyle,
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.6 : 1
                        }}>
                            {task.text}
                        </span>
                        <button 
                            onClick={() => onDeleteTask(task.id)}
                            style={deleteButtonStyle}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function RemoveCompletedTasks({onRemoveCompleted}) {
    const { isDark } = useTheme(); // Using theme context

    const buttonStyle = {
        padding: '8px 16px',
        backgroundColor: isDark ? '#6c757d' : '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '16px'
    };

    return (
        <div>
            <button onClick={onRemoveCompleted} style={buttonStyle}>
                Remove Completed Tasks
            </button>
        </div>
    );
}

// Theme Toggle Component - demonstrates context usage
function ThemeToggle() {
    const { theme, toggleTheme, isDark } = useTheme(); // Using theme context

    const buttonStyle = {
        padding: '8px 16px',
        backgroundColor: isDark ? '#ffc107' : '#ffc107',
        color: isDark ? '#000' : '#000',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '16px',
        fontWeight: 'bold'
    };

    return (
        <div>
            <button onClick={toggleTheme} style={buttonStyle}>
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </div>
    );
}

// Component demonstrating useTransition for expensive operations
function TaskStatsWithTransition({ tasks }) {
    const [isPending, startTransition] = useTransition();
    const [showStats, setShowStats] = useState(false);
    const [stats, setStats] = useState(null);

    const handleCalculateStats = () => {
        startTransition(() => {
            console.log('🚀 Starting transition for expensive calculation...');
            const result = expensiveCalculation(tasks);
            setStats(result);
            setShowStats(true);
        });
    };

    const { isDark } = useTheme();

    const containerStyle = {
        margin: '20px 0',
        padding: '16px',
        backgroundColor: isDark ? '#333' : '#f8f9fa',
        borderRadius: '8px',
        border: `1px solid ${isDark ? '#555' : '#e9ecef'}`
    };

    const buttonStyle = {
        padding: '8px 16px',
        backgroundColor: isPending ? '#6c757d' : '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: isPending ? 'not-allowed' : 'pointer',
        marginRight: '8px',
        opacity: isPending ? 0.7 : 1
    };

    const loadingStyle = {
        color: isDark ? '#ffc107' : '#007bff',
        fontWeight: 'bold',
        marginLeft: '8px'
    };

    return (
        <div style={containerStyle}>
            <h3 style={{ color: isDark ? '#fff' : '#333', marginTop: 0 }}>
                📊 Task Statistics (useTransition Demo)
            </h3>
            <p style={{ color: isDark ? '#ccc' : '#666', fontSize: '14px' }}>
                This demonstrates useTransition - the UI stays responsive during expensive calculations.
            </p>
            
            <button 
                onClick={handleCalculateStats} 
                style={buttonStyle}
                disabled={isPending}
            >
                {isPending ? 'Calculating...' : 'Calculate Expensive Stats'}
            </button>
            
            {isPending && (
                <span style={loadingStyle}>
                    ⏳ Processing... (UI remains responsive!)
                </span>
            )}
            
            {showStats && stats && (
                <div style={{ marginTop: '16px' }}>
                    <h4 style={{ color: isDark ? '#fff' : '#333' }}>📈 Statistics:</h4>
                    <ul style={{ color: isDark ? '#ccc' : '#666' }}>
                        <li>Total Tasks: {stats.total}</li>
                        <li>Completed: {stats.completed}</li>
                        <li>Pending: {stats.pending}</li>
                        <li>Average Text Length: {stats.averageTextLength.toFixed(1)} characters</li>
                        <li>Longest Task: "{stats.longestTask}"</li>
                        <li>Shortest Task: "{stats.shortestTask}"</li>
                        <li>Fibonacci Result: {stats.fibonacciResult}</li>
                        <li>Calculation Time: {stats.calculationTime.toFixed(2)}ms</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

// Component demonstrating useDeferredValue for search
function TaskSearchWithDeferred({ tasks, onFilterTasks }) {
    const [searchTerm, setSearchTerm] = useState('');
    const deferredSearchTerm = useDeferredValue(searchTerm);
    const { isDark } = useTheme();

    // This expensive filtering will be deferred
    const filteredTasks = useMemo(() => {
        if (!deferredSearchTerm) return tasks;
        
        console.log('🔍 Filtering tasks with deferred value...');
        const startTime = performance.now();
        
        // Simulate expensive filtering
        const result = tasks.filter(task => {
            // Simulate some expensive string matching
            let match = false;
            for (let i = 0; i < 10000; i++) {
                match = task.text.toLowerCase().includes(deferredSearchTerm.toLowerCase());
            }
            return match;
        });
        
        const endTime = performance.now();
        console.log(`⏱️ Filtering completed in ${(endTime - startTime).toFixed(2)}ms`);
        
        return result;
    }, [tasks, deferredSearchTerm]);

    // Update parent with filtered results
    useMemo(() => {
        onFilterTasks(filteredTasks);
    }, [filteredTasks, onFilterTasks]);

    const inputStyle = {
        padding: '8px 12px',
        border: `2px solid ${isDark ? '#555' : '#ddd'}`,
        borderRadius: '4px',
        backgroundColor: isDark ? '#333' : '#fff',
        color: isDark ? '#fff' : '#333',
        width: '100%',
        maxWidth: '300px'
    };

    const containerStyle = {
        margin: '20px 0',
        padding: '16px',
        backgroundColor: isDark ? '#333' : '#f8f9fa',
        borderRadius: '8px',
        border: `1px solid ${isDark ? '#555' : '#e9ecef'}`
    };

    const isStale = searchTerm !== deferredSearchTerm;

    return (
        <div style={containerStyle}>
            <h3 style={{ color: isDark ? '#fff' : '#333', marginTop: 0 }}>
                🔍 Task Search (useDeferredValue Demo)
            </h3>
            <p style={{ color: isDark ? '#ccc' : '#666', fontSize: '14px' }}>
                This demonstrates useDeferredValue - search input stays responsive while filtering is deferred.
            </p>
            
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    ...inputStyle,
                    opacity: isStale ? 0.7 : 1
                }}
            />
            
            {isStale && (
                <div style={{ 
                    color: isDark ? '#ffc107' : '#007bff', 
                    fontSize: '12px', 
                    marginTop: '4px' 
                }}>
                    ⏳ Updating results...
                </div>
            )}
            
            <div style={{ 
                color: isDark ? '#ccc' : '#666', 
                fontSize: '12px', 
                marginTop: '8px' 
            }}>
                Showing {filteredTasks.length} of {tasks.length} tasks
                {deferredSearchTerm && ` matching "${deferredSearchTerm}"`}
            </div>
        </div>
    );
}

function TodoListDashboard() {
    const [tasks, dispatch] = useReducer(todoReducer, []);
    const [displayedTasks, setDisplayedTasks] = useState([]);
    const { isDark } = useTheme(); // Using theme context

    // Initialize with some sample tasks for demonstration
    useEffect(() => {
        if (tasks.length === 0) {
            const sampleTasks = [
                { id: Date.now() + 1, text: "Learn React useTransition hook", completed: false },
                { id: Date.now() + 2, text: "Implement useDeferredValue for search", completed: true },
                { id: Date.now() + 3, text: "Optimize expensive calculations", completed: false },
                { id: Date.now() + 4, text: "Build responsive UI components", completed: false },
                { id: Date.now() + 5, text: "Test performance improvements", completed: true },
                { id: Date.now() + 6, text: "Document React 18 features", completed: false },
                { id: Date.now() + 7, text: "Create demo applications", completed: false },
                { id: Date.now() + 8, text: "Review code quality", completed: true },
                { id: Date.now() + 9, text: "Deploy to production", completed: false },
                { id: Date.now() + 10, text: "Monitor application performance", completed: false }
            ];
            sampleTasks.forEach(task => {
                dispatch({ type: TODO_ACTIONS.ADD_TASK, payload: task });
            });
        }
    }, []);

    // Update displayed tasks when tasks change
    useEffect(() => {
        setDisplayedTasks(tasks);
    }, [tasks]);

    const handleAddTask = (newTask) => {
        dispatch({ type: TODO_ACTIONS.ADD_TASK, payload: newTask });
    };

    const handleToggleTask = (taskId) => {
        dispatch({ type: TODO_ACTIONS.TOGGLE_TASK, payload: taskId });
    };

    const handleDeleteTask = (taskId) => {
        dispatch({ type: TODO_ACTIONS.DELETE_TASK, payload: taskId });
    };

    const handleRemoveCompleted = () => {
        dispatch({ type: TODO_ACTIONS.REMOVE_COMPLETED });
    };

    const handleFilterTasks = (filteredTasks) => {
        setDisplayedTasks(filteredTasks);
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: isDark ? '#222' : '#fff',
        color: isDark ? '#fff' : '#333',
        minHeight: '100vh',
        transition: 'all 0.3s ease'
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: isDark ? '#fff' : '#333'
    };

    return (
        <div style={containerStyle}>
            <div>
                <h1 style={titleStyle}>Todo List - Performance Demo</h1>
            </div>
            <div>
                <ThemeToggle />
            </div>
            
            {/* Performance Demo Components */}
            <TaskStatsWithTransition tasks={tasks} />
            <TaskSearchWithDeferred tasks={tasks} onFilterTasks={handleFilterTasks} />
            
            <div>
                <TextInput onAddTask={handleAddTask}/>
            </div>
            <div>
                <TodoList 
                    tasks={displayedTasks} 
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                />
            </div>
            <div>
                <RemoveCompletedTasks onRemoveCompleted={handleRemoveCompleted}/>
            </div>
            
            {/* Performance Info */}
            <div style={{
                margin: '20px 0',
                padding: '16px',
                backgroundColor: isDark ? '#1a1a1a' : '#e9ecef',
                borderRadius: '8px',
                border: `1px solid ${isDark ? '#333' : '#dee2e6'}`
            }}>
                <h4 style={{ color: isDark ? '#fff' : '#333', marginTop: 0 }}>
                    🚀 Performance Features Demonstrated:
                </h4>
                <ul style={{ color: isDark ? '#ccc' : '#666', fontSize: '14px' }}>
                    <li><strong>useTransition:</strong> Keeps UI responsive during expensive calculations</li>
                    <li><strong>useDeferredValue:</strong> Defers expensive search filtering while keeping input responsive</li>
                    <li><strong>useMemo:</strong> Memoizes expensive computations to prevent unnecessary recalculations</li>
                    <li><strong>Context API:</strong> Avoids prop drilling for theme state</li>
                    <li><strong>useReducer:</strong> Centralized state management for complex state updates</li>
                </ul>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <TodoListDashboard/>
        </ThemeProvider>
    );
}