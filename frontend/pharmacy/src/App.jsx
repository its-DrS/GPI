import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthSystem from './components/LoginRegister';  // Assuming you saved it as LoginRegister.jsx
import Dashboard from './components/Dashboard';  // Your dashboard component
import './components/LoginRegister.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthSystem />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;