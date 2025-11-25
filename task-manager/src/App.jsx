import TaskManager from "./taskmanager/TasksManager";
import State from './STATE/usestate.jsx';
function App() {
  return (
    <>
      <div className="app-bg-decor" aria-hidden="true" />
      <div className="app-root">
        <TaskManager /> 
        {/* <State/> */}
      </div>
    </>
  );
}

export default App;