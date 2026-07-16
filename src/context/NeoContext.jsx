import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import neoEngine from '../lib/neoEngine';

const NeoContext = createContext(null);

export const NeoProvider = ({ children }) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonHistory, setLessonHistory] = useState([]);
  const [isTeaching, setIsTeaching] = useState(false);
  const [neoMessage, setNeoMessage] = useState('');
  const [learningPath, setLearningPath] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isMemoryLoaded, setIsMemoryLoaded] = useState(false);

  // Load user data and Neo's memory on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    if (data.fullName || data.email) {
      setUserData(data);
      const userId = data.id || data.email || data.fullName;
      neoEngine.loadMemory(userId).then(() => {
        setIsMemoryLoaded(true);
        buildLearningPath(data);
      });
    }
  }, []);

  // Start a Neo lesson for a subject
  const startLesson = useCallback(async (subject, userData) => {
    setIsTeaching(true);
    
    const context = neoEngine.buildContext(userData, 'lesson', { subject });
    
    const lesson = {
      subject,
      startedAt: new Date().toISOString(),
      messages: [
        { 
          sender: 'Neo', 
          text: `Let's work on ${subject}. Based on your progress, I'll teach you step by step. Ready?` 
        }
      ],
    };

    setCurrentLesson(lesson);

    try {
      const data = await neoEngine.ask(
        `Start teaching me ${subject}. Begin with an introduction and the first concept.`,
        userData,
        'lesson',
        { subject }
      );
      
      if (data && data.reply) {
        setCurrentLesson(prev => prev ? {
          ...prev,
          messages: [...(prev.messages || []), { sender: 'Neo', text: data.reply }]
        } : prev);
        setNeoMessage(data.reply);
      }
    } catch (err) {
      console.error('Neo lesson start failed:', err);
    } finally {
      setIsTeaching(false);
    }
  }, []);

  // Continue the lesson
  const continueLesson = useCallback(async (message) => {
    if (!currentLesson || !userData) return;

    const updatedMessages = [
      ...(currentLesson.messages || []),
      { sender: 'Student', text: message }
    ];
    
    setCurrentLesson(prev => prev ? {
      ...prev,
      messages: updatedMessages
    } : prev);

    setIsTeaching(true);

    try {
      const data = await neoEngine.ask(
        message,
        userData,
        'lesson',
        { subject: currentLesson.subject }
      );
      
      if (data && data.reply) {
        setCurrentLesson(prev => prev ? {
          ...prev,
          messages: [...(prev.messages || []), { sender: 'Neo', text: data.reply }]
        } : prev);
        setNeoMessage(data.reply);
      }
    } catch (err) {
      console.error('Neo teaching failed:', err);
    } finally {
      setIsTeaching(false);
    }
  }, [currentLesson, userData]);

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
  const buildLearningPath = useCallback(async (data) => {
    if (!data?.subjects) return;
    
    const context = neoEngine.buildContext(data, 'dashboard');
    
    const path = {
      focusSubject: context.weakestSubject,
      secondarySubject: context.strongestSubject,
      recommendation: `Let's focus on ${context.weakestSubject} — that's where we'll see the biggest improvement.`,
      allSubjects: data.subjects,
    };

    setLearningPath(path);
    
    // Generate proactive suggestions
    const newSuggestions = neoEngine.generateSuggestion(context);
    setSuggestions(newSuggestions || []);
    
    return path;
  }, []);

  // Ask Neo a direct question from anywhere in the app
  const askNeo = useCallback(async (message, currentPage = 'general', additionalContext = {}) => {
    if (!userData) return { reply: 'Please complete onboarding first.' };
    
    try {
      const data = await neoEngine.ask(message, userData, currentPage, additionalContext);
      setNeoMessage(data?.reply || '');
      return data || { reply: '' };
    } catch (err) {
      console.error('Ask Neo failed:', err);
      return { reply: 'I\'m having trouble connecting. Try again.' };
    }
  }, [userData]);

  return (
    <NeoContext.Provider value={{
      currentLesson,
      lessonHistory,
      isTeaching,
      neoMessage,
      learningPath,
      suggestions,
      userData,
      isMemoryLoaded,
      startLesson,
      continueLesson,
      endLesson,
      buildLearningPath,
      setNeoMessage,
      askNeo,
      neoEngine,
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