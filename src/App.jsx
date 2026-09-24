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
import TopicLessonLifeSciences from './pages/TopicLessonLifeSciences';
import TopicLessonAccounting from './pages/TopicLessonAccounting';
import TopicLessonHistory from './pages/TopicLessonHistory';
import TopicLessonEnglish from './pages/TopicLessonEnglish';
import TopicLessonMaths from './pages/TopicLessonMaths';
import Paywall from './pages/Paywall';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import GoogleCallback from './pages/GoogleCallback';
import SubjectSelection from './pages/SubjectSelection';
import SwapSuccess from './pages/SwapSuccess';
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

  if (subject === 'economics') {
    return <TopicLessonEconomics />;
  }

  if (
    subject === 'mathematical-literacy' ||
    subject === 'mathslit' ||
    subject === 'maths-lit' ||
    subject === 'maths-literacy'
  ) {
    return <TopicLessonMathsLit />;
  }

  if (subject === 'business-studies' || subject === 'business') {
    return <TopicLessonBusiness />;
  }

  if (subject === 'geography') {
    return <TopicLessonGeography />;
  }

  if (subject === 'physical-sciences' || subject === 'physical-science' || subject === 'physics') {
    return <TopicLessonPhysicalSciences />;
  }

  if (
    subject === 'life-sciences' ||
    subject === 'life-science' ||
    subject === 'lifesciences' ||
    subject === 'lifescience'
  ) {
    return <TopicLessonLifeSciences />;
  }

  if (subject === 'accounting') {
    return <TopicLessonAccounting />;
  }

  if (subject === 'history') {
    return <TopicLessonHistory />;
  }

  if (
    subject === 'english' ||
    subject === 'english-fal' ||
    subject === 'english-first-additional-language'
  ) {
    return <TopicLessonEnglish />;
  }

  if (
    subject === 'mathematics' ||
    subject === 'maths' ||
    subject === 'pure-maths' ||
    subject === 'math'
  ) {
    return <TopicLessonMaths />;
  }

  return <TopicLesson />;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Wake up the Render backend + warm DeepInfra on app load
  useEffect(() => {
    const API_URL = 'https://smartclass-wlgb.onrender.com';

    fetch(`${API_URL}/api/neo/health`)
      .then((r) => r.json())
      .then((d) => console.log('Backend:', d))
      .catch(() => {});

    fetch(`${API_URL}/api/neo/speak`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Hello.' }),
    }).catch(() => {});
  }, []);

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
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            <Route path="/select-subjects" element={<SubjectSelection />} />
            <Route path="/swap-success" element={<SwapSuccess />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </NeoProvider>
    </Router>
  );
}

export default App;