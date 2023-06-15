import React, { useEffect, useState } from "react";
import "./Home.css";
import Task from "../components/Task";

function Home() {
    const [nameTask, setNameTask] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [priority, setPriority] = useState("normal");
    const [task, setTask] = useState([]);
    const [idTask, setIdTask] = useState(0);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTodos, setSelectedTodos] = useState([]);
    const [showError, setShowError] = useState(false);

    const checkboxChange = (index) => {
        if (selectedTodos.includes(index)) {
            setSelectedTodos(selectedTodos.filter((item) => item !== index));
        } else {
            setSelectedTodos([...selectedTodos, index]);
        }
    };

    const handleRemoveSelected = () => {
        const updatedTodos = task.filter(
            (_, index) => !selectedTodos.includes(index)
        );
        setTask(updatedTodos);
        setSelectedTodos([]);
    };

    const toggleDetails = (id) => {
        setTask((prevTask) =>
            prevTask.map((task) =>
                task.id === id
                    ? { ...task, detailsVisible: !task.detailsVisible }
                    : task
            )
        );
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const filtered = task.filter(
            (item) => item.nameTask.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filtered);
    }, [search, task]);

    function NameTaskChange(event) {
        setNameTask(event.target.value);
    }

    function DescriptionChange(event) {
        setDescription(event.target.value);
    }

    function DueDateChange(event) {
        setDueDate(event.target.value);
    }

    function PriorityChange(event) {
        setPriority(event.target.value);
    }

    const AddTask = (event) => {
        if (nameTask.trim() === "") {
            setShowError(true);
            console.log("Vui lòng nhập tên task");
            return; 
          }

          setShowError(false);
        const newTask = {
            nameTask: nameTask,
            description: description,
            dueDate: dueDate,
            priority: priority,
            id: idTask,
            detailsVisible: false,
        };

        setTask([...task, newTask]);
        setNameTask("");
        setDescription("");
        setDueDate(new Date().toISOString().slice(0, 10));
        setPriority("normal");
        setIdTask(idTask + 1);
        setSearch(event.target.value);
    };

    function removeTask(taskId) {
        setTask(task.filter((task) => task.id !== taskId));
    }

    const handleUpdateTask = (taskId, updatedData) => {
        const updatedTasks = task.map((item) => {
            if (item.id === taskId) {
                return { ...item, ...updatedData };
            }
            return item;
        });

        setTask(updatedTasks);
    };

    return (
        <div className="container">
            <div className="newTask">
                <h1>New Task</h1>

                <label htmlFor="taskInput"></label>
                <input
                    className={showError ? "error" : "inputName"}
                    id="taskInput"
                    type="text"
                    value={nameTask}
                    placeholder="Add new Task"
                    onChange={NameTaskChange}
                />
                {showError && <span className="error-message">Vui lòng nhập tên task</span>}

                <label htmlFor="descriptionInput">Description:</label>
                <textarea
                    className="description"
                    id="descriptionInput"
                    value={description}
                    wrap="soft"
                    onChange={DescriptionChange}
                />

                <div className="attributes">
                    <div className="form-group">
                        <label htmlFor="dueDateInput">Due Date:</label>
                        <input
                            className="inputField"
                            id="dueDateInput"
                            type="date"
                            value={dueDate}
                            onChange={DueDateChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="priorityInput">Priority:</label>
                        <select
                            className="inputField"
                            id="priorityInput"
                            value={priority}
                            onChange={PriorityChange}
                        >
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <button className="add" onClick={AddTask}>
                    Add
                </button>
            </div>
            <div className="toDoList">
                <h1>To Do List</h1>
                
                <input
                    className="search"
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                />
                {searchResults.length > 0 && (
                    <ul className="listTask">
                        {searchResults.map((item, index) => (
                            <li key={index}>
                                <div className="task">
                                    <div className="action">
                                        <input
                                            className="checkbox"
                                            type="checkbox"
                                            checked={selectedTodos.includes(
                                                index
                                            )}
                                            onChange={() =>
                                                checkboxChange(index)
                                            }
                                        />
                                        <span className="taskName">
                                            {item.nameTask}
                                        </span>
                                        <button
                                            className="detailButton"
                                            onClick={() =>
                                                toggleDetails(item.id)
                                            }
                                        >
                                            Detail
                                        </button>
                                        <button
                                            className="removeButton"
                                            onClick={() => removeTask(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {item.detailsVisible && (
                                        <div className="taskDetails">
                                            <Task
                                                item={item}
                                                updateTask={(updatedData) =>
                                                    handleUpdateTask(
                                                        item.id,
                                                        updatedData
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {selectedTodos.length > 0 && (
                    <div className="bulkAction">
                        <span className="bulk">
                            Bulk Action:
                        </span>
                        <button className="doneBulk">Done</button>
                        <button
                            className="removeBulk"
                            onClick={handleRemoveSelected}
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
