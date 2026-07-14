import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import StudyRoom from './pages/StudyRoom';
import Profile from './pages/Profile';
import './App.css';

// Splash Screen Component
const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img src="/SM-LOGO.png" alt="SmartClass" className="splash-logo" />
        <h1 className="splash-title">SmartClass</h1>
      </div>
    </div>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/studyroom" element={<StudyRoom />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;