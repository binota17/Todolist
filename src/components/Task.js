import React, { useState } from "react";
import "./Task.css";

function Task({ item, updateTask }) {
    const [updatedName, setUpdatedName] = useState(item.nameTask);
    const [updatedDescription, setUpdatedDescription] = useState(
        item.description
    );
    const [updatedDate, setUpdatedDate] = useState(item.dueDate);
    const [updatedPriority, setUpdatedPriority] = useState(item.priority);

    const updateTasks = () => {
        const updatedData = {
            nameTask: updatedName,
            description: updatedDescription,
            dueDate: updatedDate,
            priority: updatedPriority,
        };

        updateTask(updatedData);
    }
    return (
        <div className="task-container">
            <label htmlFor="taskInput"></label>
            <input
                className="inputName"
                id="taskInput"
                type="text"
                value={updatedName}
                placeholder="Add new Task"
                onChange={(e) => setUpdatedName(e.target.value)}
            />

            <label htmlFor="descriptionInput">Description:</label>
            <textarea
                className="description"
                id="descriptionInput"
                value={updatedDescription}
                type="text"
                onChange={(e) => setUpdatedDescription(e.target.value)}
            />

            <div className="attributes">
                <div className="form-group">
                    <label htmlFor="dueDateInput">Due Date:</label>
                    <input
                        className="inputField"
                        id="dueDateInput"
                        type="date"
                        value={updatedDate}
                        onChange={(e) => setUpdatedDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priorityInput">Priority:</label>
                    <select
                        className="inputField"
                        id="priorityInput"
                        value={updatedPriority}
                        onChange={(e) => setUpdatedPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            <button className="add" onClick={updateTasks}>
                Update
            </button>
        </div>
    );
}

export default Task;
