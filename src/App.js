import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentOnboarding from './pages/StudentOnboarding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentOnboarding />} />
      </Routes>
    </Router>
  );
}

export default App;