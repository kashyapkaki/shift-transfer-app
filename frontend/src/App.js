import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import TaskList from './components/TaskList';
import AddTaskForm from "./components/AddTaskForm";
import HandoverNotes from "./components/HandoverNotes";
import ShiftReport from "./components/ShiftReport";
import UserManagement from "./components/UserManagement";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Tasks</Link> | <Link to="/users">Users</Link> | <Link to="/add-task">Add Task</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTaskForm />} />
        <Route path="/handover-notes" element={<HandoverNotes shift="Morning" />} />
        <Route path="/shift-report" element={<ShiftReport shift="Morning" />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
