import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import AddTaskForm from "./components/AddTaskForm";
import HandoverNotes from "./components/HandoverNotes";
import ShiftReport from "./components/ShiftReport";
import UserManagement from "./components/UserManagement";
import TaskHistory from "./components/TaskHistory";
import TaskList from "./components/TaskList";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link className="nav-link" to="/">Tasks</Link>
        <Link className="nav-link" to="/users">Users</Link>
        <Link className="nav-link" to="/add-task">Add Task</Link>
        <Link className="nav-link" to="/handover-notes">Handover Notes</Link>
        <Link className="nav-link" to="/shift-report">Shift Report</Link>
        <Link className="nav-link" to="/task-history">Task History</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTaskForm />} />
        <Route path="/handover-notes" element={<HandoverNotes />} />
        <Route path="/shift-report" element={<ShiftReport />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/task-history" element={<TaskHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
