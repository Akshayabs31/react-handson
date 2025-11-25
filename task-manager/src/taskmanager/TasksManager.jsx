import TaskForm from "./TaskForm.jsx";
export default function TasksManager() {
    return <div
  className="taskmanager"
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  }}
>
  <TaskForm />
</div>


};