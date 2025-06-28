import { useState, useRef, useEffect } from 'react';
import editIcon from './assets/edit.svg';
import deleteIcon from './assets/delete.svg';
import addIcon from './assets/add.svg';

export default function Todo() {

    // State to manage tasks
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState(() => {
        const stored = localStorage.getItem('tasks');
        return stored ? JSON.parse(stored) : [];
    });


    // use effects
    const inputRef = useRef(null);     // <--- input Reference
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // Load from localStorage on mount
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Save to localStorage on tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const add = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { text: task.trim(), completed: false }]);
            setTask('');
            inputRef.current.focus();
        }
    };

    const edit = (index) => {
        const unTask = tasks.filter((_, i) => i === index)[0].text;
        setTask(unTask);
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        inputRef.current.focus();

    }

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const toggleTask = (index) => {
        const newTasks = tasks.map((t, i) => {
            if (i === index) {
                return { ...t, completed: !t.completed };
            }
            return t;
        });
        setTasks(newTasks);
    };

    const clearTasks = () => {
        localStorage.clear();
        setTasks([]);
    };

    return (

                                              //---UI---
                                              
        <div className="appContainer">
            <div className="todoApp">
                <h1 className="title">To Do</h1>


                {/* display task */}
                <div className="tasks">
                    {tasks.map((task, index) => (
                        <div className="displayTasks" key={index}>
                            <p className="taskContainer">
                                <li
                                    onClick={() => toggleTask(index)}
                                    style={{
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                    }} className='taskItem'
                                >
                                    {task.text}
                                </li>
                                <button className="edit btn btn-primary" onClick={() => edit(index)}> <img src={editIcon} alt="Edit" className="edit-icon" />
                                </button>
                                <button onClick={() => deleteTask(index)} className="delete btn btn-danger"><img src={deleteIcon} alt="delete" className="delete-icon" /></button>
                            </p>
                        </div>
                    ))}
                </div>

                {/* input field */}
                <div className="addTaskContainer">
                    <input
                        ref={inputRef}
                        type="text"
                        className="text"
                        value={task}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                add(); 
                            }
                        }}
                        placeholder="Add new task..."
                    />

                    {/* Add tasks */}
                    <button className="add btn btn-primary" onClick={add}>
                        <img src={addIcon} alt="add" className='add-icon' />
                    </button>

                    {/* Clear tasks */}
                    <button onClick={clearTasks} className="clear btn btn-danger"><img src={deleteIcon} height="20" width="20" alt="delete" className="delete-icon" /></button>
                </div>
            </div>
        </div>
    );
}
