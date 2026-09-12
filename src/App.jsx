import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { NeoProvider } from './context/NeoContext';
import Welcome from './pages/Welcome';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import StudyRoom from './pages/StudyRoom';
import Profile from './pages/Profile';
import Topics from './pages/Topics';
import TopicLesson from './pages/TopicLesson';
import TopicLessonEconomics from './pages/TopicLessonEconomics';
import TopicLessonMathsLit from './pages/TopicLessonMathsLit';
import TopicLessonBusiness from './pages/TopicLessonBusiness';
import TopicLessonGeography from './pages/TopicLessonGeography';
import TopicLessonPhysicalSciences from './pages/TopicLessonPhysicalSciences';
import Paywall from './pages/Paywall';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import GoogleCallback from './pages/GoogleCallback';
import SubjectSelection from './pages/SubjectSelection';
import './App.css';

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

// Router component that picks the right TopicLesson based on subject
const TopicLessonRouter = () => {
  const { subject } = useParams();
  
  // Economics
  if (subject === 'economics') {
    return <TopicLessonEconomics />;
  }
  
  // Mathematical Literacy
  if (subject === 'mathematical-literacy') {
    return <TopicLessonMathsLit />;
  }
  
  // Business Studies
  if (subject === 'business-studies') {
    return <TopicLessonBusiness />;
  }
  
  // Geography
  if (subject === 'geography') {
    return <TopicLessonGeography />;
  }
  
  // Physical Sciences
  if (subject === 'physical-sciences') {
    return <TopicLessonPhysicalSciences />;
  }
  
  // Default to Maths TopicLesson (for Mathematics, etc.)
  return <TopicLesson />;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      <NeoProvider>
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
            <Route path="/subjects/:subject" element={<Topics />} />
            <Route path="/lesson/:subject/:topicId" element={<TopicLessonRouter />} />
            <Route path="/paywall" element={<Paywall />} />
            <Route path="/payment-success" element={<PaymentSuccess />} /> {/* CHANGED - dash instead of slash */}
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            <Route path="/select-subjects" element={<SubjectSelection />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </NeoProvider>
    </Router>
  );
}

export default App;