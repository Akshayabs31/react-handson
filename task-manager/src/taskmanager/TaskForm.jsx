import { useState } from "react";
import "./TaskForm.css";

export default function TaskForm() {
  const [value, setValue] = useState([]);

  const toggleCompleted = (id) => {
    setValue(
      value.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const deleteTask = (id) => {
    setValue((prev) => prev.filter((task) => task.id !== id));
  };

   
  


  return (
    <div className="task-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.target.text.value.trim();

          if (text !== "") {
            setValue([
              ...value,
              { id: Date.now(), text, completed: false },
            ]);
          }
          e.target.reset();
        }}
      >
        <h2 className="title">Task Manager</h2>

        <div className="subtitle">Organize your work — quick and simple</div>

        <div className="input-row">
          <input
            className="task-input"
            type="text"
            name="text"
            placeholder="Enter a task..."
            aria-label="New task"
          />

          <button className="add-btn" type="submit">
            Add Task
          </button>
        </div>

        <div className="task-list">
          {value.map((task) => (
            <div key={task.id} className="task-row">

              <p className={`task ${task.completed ? 'done' : ''}`}>
                {task.text}
              </p>

              <div className="task-actions">
                <button
                  className={`status-btn ${task.completed ? 'completed' : ''}`}
                  onClick={() => toggleCompleted(task.id)}
                  type="button"
                >
                  {task.completed ? "Completed" : "Mark Done"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

          <p>Task count: {value.length}</p>
        </div>
      </form>
    </div>
  );
}
