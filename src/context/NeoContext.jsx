import { createContext, useContext, useState, useCallback } from 'react';

const NeoContext = createContext(null);

export const NeoProvider = ({ children }) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonHistory, setLessonHistory] = useState([]);
  const [isTeaching, setIsTeaching] = useState(false);
  const [neoMessage, setNeoMessage] = useState('');
  const [learningPath, setLearningPath] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'https://smartclass-wlgb.onrender.com';

  // Start a Neo lesson for a subject
  const startLesson = useCallback(async (subject, userData) => {
    setIsTeaching(true);
    
    const grade = userData?.grade || '10';
    const performance = userData?.performance?.[subject] || 'Fair';
    
    const lesson = {
      subject,
      grade,
      performance,
      startedAt: new Date().toISOString(),
      messages: [
        { 
          sender: 'Neo', 
          text: `Let's work on ${subject}. You're in Grade ${grade} and your current level is ${performance}. I'll teach you step by step. Ready?` 
        }
      ],
    };

    setCurrentLesson(lesson);

    // Get Neo's first lesson message
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Start teaching me ${subject}. I'm in Grade ${grade}, my current performance is ${performance}. Begin with an introduction and the first concept. Teach me like you're my personal tutor.`,
          subject,
          userId: userData?.id || userData?.email || 'student',
        })
      });

      const data = await response.json();
      
      if (data.reply) {
        setCurrentLesson(prev => ({
          ...prev,
          messages: [...prev.messages, { sender: 'Neo', text: data.reply }]
        }));
        setNeoMessage(data.reply);
      }
    } catch (err) {
      console.error('Neo lesson start failed:', err);
    } finally {
      setIsTeaching(false);
    }
  }, [API_URL]);

  // Continue the lesson — student asks or answers
  const continueLesson = useCallback(async (message) => {
    if (!currentLesson) return;

    const updatedMessages = [
      ...currentLesson.messages,
      { sender: 'Student', text: message }
    ];
    
    setCurrentLesson(prev => ({
      ...prev,
      messages: updatedMessages
    }));

    setIsTeaching(true);

    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Continue teaching me ${currentLesson.subject}. The student says: "${message}". Keep teaching step by step. If they got something right, celebrate. If wrong, guide them gently.`,
          subject: currentLesson.subject,
          userId: 'student',
        })
      });

      const data = await response.json();
      
      if (data.reply) {
        setCurrentLesson(prev => ({
          ...prev,
          messages: [...prev.messages, { sender: 'Neo', text: data.reply }]
        }));
        setNeoMessage(data.reply);
      }
    } catch (err) {
      console.error('Neo teaching failed:', err);
    } finally {
      setIsTeaching(false);
    }
  }, [currentLesson, API_URL]);

  // End the lesson
  const endLesson = useCallback(() => {
    if (currentLesson) {
      setLessonHistory(prev => [{
        ...currentLesson,
        endedAt: new Date().toISOString(),
      }, ...prev]);
    }
    setCurrentLesson(null);
    setIsTeaching(false);
  }, [currentLesson]);

  // Build learning path from assessment
  const buildLearningPath = useCallback(async (userData) => {
    const subjects = userData?.subjects || [];
    const performance = userData?.performance || {};
    
    // Find weakest subjects
    const sorted = [...subjects].sort((a, b) => {
      const scores = { 'Bad': 1, 'Fair': 2, 'Good': 3, 'Very Good': 4 };
      return (scores[performance[a]] || 2) - (scores[performance[b]] || 2);
    });

    const path = {
      focusSubject: sorted[0],
      secondarySubject: sorted[1],
      recommendation: `${sorted[0]} needs the most attention right now. Let's work on it together.`,
      allSubjects: sorted,
    };

    setLearningPath(path);
    return path;
  }, []);

  return (
    <NeoContext.Provider value={{
      currentLesson,
      lessonHistory,
      isTeaching,
      neoMessage,
      learningPath,
      startLesson,
      continueLesson,
      endLesson,
      buildLearningPath,
      setNeoMessage,
    }}>
      {children}
    </NeoContext.Provider>
  );
};

export const useNeo = () => {
  const context = useContext(NeoContext);
  if (!context) throw new Error('useNeo must be used within NeoProvider');
  return context;
};