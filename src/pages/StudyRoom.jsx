import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/StudyRoom.css';
import { useNeo } from '../context/NeoContext';
import NeoVoice from '../components/NeoVoice';
import {
  FaHome, FaTasks, FaUser, FaComments, FaTimes, FaSignOutAlt,
  FaCog, FaQuestionCircle, FaPlus, FaPaperPlane, FaLink,
  FaStopwatch, FaUsers, FaLock, FaUnlock,
  FaCopy, FaTrash, FaPlay, FaPause, FaRedo,
  FaChalkboardTeacher, FaBookOpen, FaEraser,
  FaArrowLeft, FaLightbulb, FaShare,
  FaClock, FaHourglassHalf, FaBell
} from 'react-icons/fa';

const StudyRoom = () => {
  const navigate = useNavigate();
  const { startLesson } = useNeo();
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Room state
  const [inRoom, setInRoom] = useState(false);
  const [roomView, setRoomView] = useState('lobby');
  const [rooms, setRooms] = useState([]);
  
  // Create room form
  const [roomName, setRoomName] = useState('');
  const [roomSubject, setRoomSubject] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [roomScheduledTime, setRoomScheduledTime] = useState('');
  
  // Join room form
  const [joinCode, setJoinCode] = useState('');
  const [joinPassword, setJoinPassword] = useState('');
  const [joinError, setJoinError] = useState('');
  
  // Current room
  const [currentRoom, setCurrentRoom] = useState(null);
  
  // Chat
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [newMessageToast, setNewMessageToast] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [neoSpokenMessage, setNeoSpokenMessage] = useState('');
  const chatEndRef = useRef(null);
  
  // Timer
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('focus');
  const timerRef = useRef(null);
  
  // Tasks
  const [tasks, setTasks] = useState([]);
  const [showTaskBuilder, setShowTaskBuilder] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTimeLimit, setTaskTimeLimit] = useState('');
  const [taskQuestions, setTaskQuestions] = useState([]);
  const [newTaskQuestion, setNewTaskQuestion] = useState({ question: '', options: ['', '', '', ''], correct: 0 });
  const [activeTask, setActiveTask] = useState(null);
  const [taskAnswers, setTaskAnswers] = useState({});
  const [taskSubmitted, setTaskSubmitted] = useState(false);
  const [taskScore, setTaskScore] = useState(0);
  const [taskTimerMinutes, setTaskTimerMinutes] = useState(0);
  const [taskTimerSeconds, setTaskTimerSeconds] = useState(0);
  const [taskTimerRunning, setTaskTimerRunning] = useState(false);
  const taskTimerRef = useRef(null);
  
  // Whiteboard
  const [whiteboardContent, setWhiteboardContent] = useState('');
  const [whiteboardColor, setWhiteboardColor] = useState('#1a1a1a');
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  
  // Quiz
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: '', options: ['', '', '', ''], correct: 0 });
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  // Participants
  const [participants, setParticipants] = useState([]);
  
  // Active content tab
  const [contentTab, setContentTab] = useState('tasks');

  const API_URL = import.meta.env.VITE_API_URL || 'https://smartclass-wlgb.onrender.com';

  useEffect(() => {
    const data = localStorage.getItem('smartclass_user');
    if (data) setUserData(JSON.parse(data));
    else navigate('/');
    
    const savedRooms = localStorage.getItem('smartclass_rooms');
    if (savedRooms) setRooms(JSON.parse(savedRooms));
    
    const savedWB = localStorage.getItem('smartclass_whiteboard');
    if (savedWB) setWhiteboardContent(savedWB);
  }, [navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('smartclass_rooms', JSON.stringify(rooms));
  }, [rooms]);

  // Global timer
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev === 0) {
            if (timerMinutes === 0) {
              clearInterval(timerRef.current);
              setTimerRunning(false);
              handleTimerComplete();
              return 0;
            }
            setTimerMinutes(m => m - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timerMinutes]);

  // Task timer
  useEffect(() => {
    if (taskTimerRunning) {
      taskTimerRef.current = setInterval(() => {
        setTaskTimerSeconds(prev => {
          if (prev === 0) {
            if (taskTimerMinutes === 0) {
              clearInterval(taskTimerRef.current);
              setTaskTimerRunning(false);
              handleTaskTimeUp();
              return 0;
            }
            setTaskTimerMinutes(m => m - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(taskTimerRef.current);
  }, [taskTimerRunning, taskTimerMinutes]);

  const handleLogout = () => {
    localStorage.removeItem('smartclass_user');
    navigate('/');
  };

  const openNeoLesson = () => {
    if (currentRoom?.subject) {
      navigate(`/lesson/${currentRoom.subject}`);
    }
  };

  const handleCreateRoom = () => {
    if (!roomName.trim()) return;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newRoom = {
      id: Date.now(),
      name: roomName.trim(),
      subject: roomSubject || 'General',
      password: roomPassword,
      code,
      scheduledTime: roomScheduledTime || null,
      createdBy: userData?.fullName || 'Anonymous',
      createdAt: new Date().toISOString(),
      participants: [userData?.fullName || 'Anonymous'],
      messages: [],
      tasks: [],
      whiteboard: '',
    };
    const updatedRooms = [...rooms, newRoom];
    setRooms(updatedRooms);
    setCurrentRoom(newRoom);
    setParticipants([userData?.fullName || 'Anonymous']);
    setTasks([]);
    setMessages([]);
    setInRoom(true);
    setRoomView('room');
    
    setRoomName('');
    setRoomSubject('');
    setRoomPassword('');
    setRoomScheduledTime('');
  };

  const handleJoinRoom = () => {
    setJoinError('');
    const room = rooms.find(r => r.code === joinCode.toUpperCase());
    if (!room) {
      setJoinError('Room not found. Check the code and try again.');
      return;
    }
    if (room.password && room.password !== joinPassword) {
      setJoinError('Incorrect password.');
      return;
    }
    const userName = userData?.fullName || 'Anonymous';
    const updatedRoom = {
      ...room,
      participants: room.participants.includes(userName) 
        ? room.participants 
        : [...room.participants, userName]
    };
    const updatedRooms = rooms.map(r => r.id === room.id ? updatedRoom : r);
    setRooms(updatedRooms);
    setCurrentRoom(updatedRoom);
    setParticipants(updatedRoom.participants);
    setMessages(room.messages || []);
    setTasks(room.tasks || []);
    setWhiteboardContent(room.whiteboard || '');
    setInRoom(true);
    setRoomView('room');
    setJoinCode('');
    setJoinPassword('');
  };

  const handleSendMessage = async (text = null) => {
    const msgText = text || chatInput.trim();
    if (!msgText) return;
    
    const newMsg = {
      id: Date.now(),
      sender: userData?.fullName || 'Anonymous',
      avatar: userData?.avatar || 'AVO',
      text: msgText,
      timestamp: new Date().toISOString(),
      isUser: true,
    };
    
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    
    if (currentRoom) {
      const updatedRoom = { ...currentRoom, messages: updatedMessages };
      setCurrentRoom(updatedRoom);
      const updatedRooms = rooms.map(r => r.id === currentRoom.id ? updatedRoom : r);
      setRooms(updatedRooms);
    }
    
    setChatInput('');

    // If message is for Neo
    if (msgText.startsWith('@neo') || msgText.toLowerCase().includes('neo')) {
      const typingMsg = {
        id: 'typing',
        sender: 'Neo',
        avatar: null,
        text: '...',
        timestamp: new Date().toISOString(),
        isNeo: true,
        isTyping: true,
      };
      setMessages(prev => [...prev, typingMsg]);

      try {
        const cleanMessage = msgText.replace(/@neo/i, '').trim();
        const response = await fetch(`${API_URL}/api/neo/ask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: cleanMessage,
            subject: currentRoom?.subject,
            userId: userData?.id || userData?.email || 'student',
          })
        });
        const data = await response.json();

        setMessages(prev => {
          const withoutTyping = prev.filter(m => m.id !== 'typing');
          return [...withoutTyping, {
            id: Date.now() + 1,
            sender: 'Neo',
            avatar: null,
            text: data.reply || 'Sorry, try again.',
            timestamp: new Date().toISOString(),
            isNeo: true,
          }];
        });
        setNeoSpokenMessage(data.reply || '');
      } catch (err) {
        setMessages(prev => {
          const withoutTyping = prev.filter(m => m.id !== 'typing');
          return [...withoutTyping, {
            id: Date.now() + 1,
            sender: 'Neo',
            avatar: null,
            text: 'I\'m having trouble. Try again.',
            timestamp: new Date().toISOString(),
            isNeo: true,
          }];
        });
      }
    } else {
      // Show toast for regular messages
      if (!chatOpen) {
        setUnreadCount(prev => prev + 1);
        setNewMessageToast({ sender: newMsg.sender, text: newMsg.text });
        setTimeout(() => setNewMessageToast(null), 4000);
      }
    }
  };

  const openChat = () => {
    setChatOpen(true);
    setUnreadCount(0);
    setNewMessageToast(null);
  };

  const handleTimerComplete = () => {
    handleSendMessage(`⏰ ${timerMode === 'focus' ? 'Focus session' : 'Break'} complete!`);
    if (timerMode === 'focus') {
      setTimerMode('break');
      setTimerMinutes(5);
      setTimerSeconds(0);
    } else {
      setTimerMode('focus');
      setTimerMinutes(25);
      setTimerSeconds(0);
    }
  };

  const toggleTimer = () => setTimerRunning(!timerRunning);

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerMinutes(timerMode === 'focus' ? 25 : 5);
    setTimerSeconds(0);
  };

  // Tasks
  const addTaskQuestion = () => {
    if (!newTaskQuestion.question.trim()) return;
    if (newTaskQuestion.options.some(o => !o.trim())) return;
    setTaskQuestions([...taskQuestions, { ...newTaskQuestion }]);
    setNewTaskQuestion({ question: '', options: ['', '', '', ''], correct: 0 });
  };

  const removeTaskQuestion = (index) => {
    setTaskQuestions(taskQuestions.filter((_, i) => i !== index));
  };

  const publishTask = () => {
    if (!taskTitle.trim()) return;
    const task = {
      id: Date.now(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      timeLimit: taskTimeLimit ? parseInt(taskTimeLimit) : null,
      questions: taskQuestions,
      createdBy: userData?.fullName || 'Anonymous',
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    if (currentRoom) {
      const updatedRoom = { ...currentRoom, tasks: updatedTasks };
      setCurrentRoom(updatedRoom);
      const updatedRooms = rooms.map(r => r.id === currentRoom.id ? updatedRoom : r);
      setRooms(updatedRooms);
    }
    handleSendMessage(`📋 New task: "${taskTitle}"${taskTimeLimit ? ` — ${taskTimeLimit} min time limit` : ''}`);
    setShowTaskBuilder(false);
    setTaskTitle('');
    setTaskDescription('');
    setTaskTimeLimit('');
    setTaskQuestions([]);
  };

  const startTask = (task) => {
    setActiveTask(task);
    setTaskAnswers({});
    setTaskSubmitted(false);
    setTaskScore(0);
    if (task.timeLimit) {
      setTaskTimerMinutes(task.timeLimit);
      setTaskTimerSeconds(0);
      setTaskTimerRunning(true);
    }
  };

  const handleTaskTimeUp = () => {
    if (activeTask && !taskSubmitted) {
      submitTask();
    }
  };

  const submitTask = () => {
    if (!activeTask) return;
    let correct = 0;
    activeTask.questions.forEach((q, i) => {
      if (taskAnswers[i] === q.correct) correct++;
    });
    const score = activeTask.questions.length > 0 
      ? Math.round((correct / activeTask.questions.length) * 100) 
      : 100;
    setTaskScore(score);
    setTaskSubmitted(true);
    setTaskTimerRunning(false);
    handleSendMessage(`${userData?.fullName} scored ${score}% on "${activeTask.title}"`);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    if (currentRoom) {
      const updatedRoom = { ...currentRoom, tasks: updatedTasks };
      setCurrentRoom(updatedRoom);
      const updatedRooms = rooms.map(r => r.id === currentRoom.id ? updatedRoom : r);
      setRooms(updatedRooms);
    }
  };

  // Quiz
  const addQuizQuestion = () => {
    if (!newQuestion.question.trim()) return;
    if (newQuestion.options.some(o => !o.trim())) return;
    setQuizQuestions([...quizQuestions, { ...newQuestion }]);
    setNewQuestion({ question: '', options: ['', '', '', ''], correct: 0 });
  };

  const removeQuizQuestion = (index) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
  };

  const publishQuiz = () => {
    if (!quizTitle.trim() || quizQuestions.length === 0) return;
    const quiz = {
      id: Date.now(),
      title: quizTitle,
      questions: quizQuestions,
      createdBy: userData?.fullName || 'Anonymous',
    };
    setActiveQuiz(quiz);
    handleSendMessage(`📝 Quiz: "${quizTitle}" — ${quizQuestions.length} questions. Take it now!`);
    setShowQuizBuilder(false);
    setQuizTitle('');
    setQuizQuestions([]);
  };

  const submitQuiz = () => {
    if (!activeQuiz) return;
    let correct = 0;
    activeQuiz.questions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) correct++;
    });
    const score = Math.round((correct / activeQuiz.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    handleSendMessage(`${userData?.fullName} scored ${score}% on "${activeQuiz.title}"`);
  };

  const saveWhiteboard = () => {
    localStorage.setItem('smartclass_whiteboard', whiteboardContent);
    if (currentRoom) {
      const updatedRoom = { ...currentRoom, whiteboard: whiteboardContent };
      setCurrentRoom(updatedRoom);
      const updatedRooms = rooms.map(r => r.id === currentRoom.id ? updatedRoom : r);
      setRooms(updatedRooms);
    }
    handleSendMessage('📝 Whiteboard updated');
  };

  const handleLeaveRoom = () => {
    setInRoom(false);
    setCurrentRoom(null);
    setRoomView('lobby');
    setMessages([]);
    setTasks([]);
    setWhiteboardContent('');
    setActiveQuiz(null);
    setActiveTask(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setTaskSubmitted(false);
    setTimerRunning(false);
    setTaskTimerRunning(false);
    setTimerMinutes(25);
    setTimerSeconds(0);
    setChatOpen(false);
    setUnreadCount(0);
  };

  const copyRoomCode = () => {
    if (currentRoom) {
      navigator.clipboard.writeText(currentRoom.code);
    }
  };

  const avatarMap = { 'AVO': '/AVO.png', 'CAT': '/CAT.png', 'STRAW': '/STRAW.png', 'ORANGE': '/ORANGE.png', 'DOG': '/DOG.png' };

  const subjects = [
    'Mathematics', 'Physical Sciences', 'English', 'Life Sciences', 
    'Geography', 'Accounting', 'Business Studies', 'History', 'CAT', 
    'Afrikaans', 'Economics', 'Computer Science', 'General Study'
  ];

  if (!userData) {
    return (
      <div className="sr-loading">
        <div className="sr-spinner"></div>
      </div>
    );
  }

  const formatTime = (mins, secs) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="sr-app">
      {/* Header */}
      <header className="sr-header">
        <span className="header-greeting">
          {inRoom ? currentRoom?.name : 'Study Room'}
        </span>
        <button className="dash-profile-btn" onClick={() => setSidebarOpen(true)}>
          <img src={avatarMap[userData.avatar]} alt="" className="dash-avatar" />
        </button>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
            <div className="sidebar-profile">
              <img src={avatarMap[userData.avatar]} alt="" className="sidebar-avatar" />
              <h3>{userData.fullName}</h3>
            </div>
            <div className="sidebar-menu">
              <button className="sidebar-item"><FaUser /> Profile</button>
              <button className="sidebar-item"><FaCog /> Settings</button>
              <button className="sidebar-item"><FaQuestionCircle /> Help</button>
            </div>
            <button className="sidebar-logout" onClick={handleLogout}><FaSignOutAlt /> Sign Out</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="sr-main">
        {/* ========== LOBBY VIEW ========== */}
        {!inRoom && roomView === 'lobby' && (
          <div className="sr-lobby">
            <div className="sr-hero">
              <div className="sr-hero-icon">📚</div>
              <h2>Study Together</h2>
              <p>Create or join a virtual study room. Neo is here to help you learn.</p>
            </div>

            <div className="sr-lobby-actions">
              <button className="sr-lobby-btn create" onClick={() => setRoomView('create')}>
                <FaPlus /> Create a Room
              </button>
              <button className="sr-lobby-btn join" onClick={() => setRoomView('join')}>
                <FaUsers /> Join a Room
              </button>
            </div>

            {rooms.length > 0 && (
              <div className="sr-active-rooms">
                <h3>Active Rooms</h3>
                {rooms.map(room => (
                  <button key={room.id} className="sr-room-preview" onClick={() => { setJoinCode(room.code); setRoomView('join'); }}>
                    <div className="sr-room-preview-info">
                      <span className="sr-room-preview-name">{room.name}</span>
                      <span className="sr-room-preview-subject">{room.subject} • {room.participants.length} online</span>
                    </div>
                    <span className="sr-room-preview-code">{room.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========== CREATE ROOM VIEW ========== */}
        {!inRoom && roomView === 'create' && (
          <div className="sr-form-card">
            <button className="sr-back-btn" onClick={() => setRoomView('lobby')}><FaArrowLeft /> Back</button>
            <h2>Create a Study Room</h2>
            <p className="sr-form-subtitle">Set up your virtual study space</p>

            <div className="sr-form-group">
              <label>Room Name</label>
              <input type="text" placeholder="e.g., Friday Math Grind" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            </div>

            <div className="sr-form-group">
              <label>Subject</label>
              <select value={roomSubject} onChange={(e) => setRoomSubject(e.target.value)}>
                <option value="">Select a subject</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="sr-form-group">
              <label>Password (optional)</label>
              <div className="sr-password-wrap">
                <input type="text" placeholder="Leave blank for public room" value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)} />
                {roomPassword ? <FaLock className="sr-pw-icon" /> : <FaUnlock className="sr-pw-icon" />}
              </div>
            </div>

            <div className="sr-form-group">
              <label>Scheduled Time (optional)</label>
              <input type="datetime-local" value={roomScheduledTime} onChange={(e) => setRoomScheduledTime(e.target.value)} />
            </div>

            <button className="sr-form-submit" onClick={handleCreateRoom} disabled={!roomName.trim()}>
              <FaPlus /> Create Room
            </button>
          </div>
        )}

        {/* ========== JOIN ROOM VIEW ========== */}
        {!inRoom && roomView === 'join' && (
          <div className="sr-form-card">
            <button className="sr-back-btn" onClick={() => { setRoomView('lobby'); setJoinError(''); }}><FaArrowLeft /> Back</button>
            <h2>Join a Study Room</h2>
            <p className="sr-form-subtitle">Enter the room code shared with you</p>

            {joinError && <div className="sr-join-error">{joinError}</div>}

            <div className="sr-form-group">
              <label>Room Code</label>
              <input type="text" placeholder="e.g., A3X9K2" value={joinCode} onChange={(e) => { setJoinCode(e.target.value.toUpperCase()); setJoinError(''); }} maxLength={6} className="sr-code-input" />
            </div>

            <div className="sr-form-group">
              <label>Password (if required)</label>
              <input type="text" placeholder="Enter room password" value={joinPassword} onChange={(e) => { setJoinPassword(e.target.value); setJoinError(''); }} />
            </div>

            <button className="sr-form-submit join-btn" onClick={handleJoinRoom} disabled={joinCode.length < 6}>
              <FaUsers /> Join Room
            </button>
          </div>
        )}

        {/* ========== INSIDE ROOM VIEW ========== */}
        {inRoom && currentRoom && (
          <div className="sr-room-wrapper">
            {/* Room Top Bar */}
            <div className="sr-room-topbar">
              <button className="sr-room-leave" onClick={handleLeaveRoom}><FaArrowLeft /> Leave</button>
              <div className="sr-room-info">
                <span className="sr-room-name">{currentRoom.name}</span>
                <span className="sr-room-subject">{currentRoom.subject}</span>
              </div>
              <div className="sr-room-actions-top">
                <span className="sr-participant-count" title={`${participants.length} participants`}>
                  <FaUsers /> {participants.length}
                </span>
                <button className="sr-room-code-btn" onClick={openNeoLesson} style={{ background: '#7E57C2', color: '#FFF', marginRight: '6px' }}>
                  💜 Neo
                </button>
                <button className="sr-room-code-btn" onClick={copyRoomCode} title="Copy room code">
                  <FaCopy /> {currentRoom.code}
                </button>
              </div>
            </div>

            {/* Slim Timer Bar */}
            <div className="sr-timer-bar">
              <div className="sr-timer-bar-left">
                <FaStopwatch className="sr-timer-bar-icon" />
                <span className="sr-timer-bar-text">{formatTime(timerMinutes, timerSeconds)}</span>
                <span className="sr-timer-bar-mode">{timerMode === 'focus' ? '🎯 Focus' : '☕ Break'}</span>
              </div>
              <div className="sr-timer-bar-controls">
                <button onClick={toggleTimer} className={`sr-timer-btn-sm ${timerRunning ? 'pause' : 'play'}`}>
                  {timerRunning ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={resetTimer} className="sr-timer-btn-sm reset"><FaRedo /></button>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="sr-content-tabs">
              <button className={`sr-content-tab ${contentTab === 'tasks' ? 'active' : ''}`} onClick={() => setContentTab('tasks')}>
                <FaBookOpen /> Tasks
              </button>
              <button className={`sr-content-tab ${contentTab === 'whiteboard' ? 'active' : ''}`} onClick={() => setContentTab('whiteboard')}>
                <FaChalkboardTeacher /> Whiteboard
              </button>
              <button className={`sr-content-tab ${contentTab === 'participants' ? 'active' : ''}`} onClick={() => setContentTab('participants')}>
                <FaUsers /> People ({participants.length})
              </button>
            </div>

            {/* Main Content Area */}
            <div className="sr-content-area">
              {/* Tasks Tab */}
              {contentTab === 'tasks' && (
                <div className="sr-tasks-content">
                  <button className="sr-create-task-btn" onClick={() => setShowTaskBuilder(!showTaskBuilder)}>
                    <FaPlus /> {showTaskBuilder ? 'Cancel' : 'Create Task'}
                  </button>
                  <button className="sr-create-task-btn quiz" onClick={() => setShowQuizBuilder(!showQuizBuilder)}>
                    <FaLightbulb /> {showQuizBuilder ? 'Cancel Quiz' : 'Quick Quiz'}
                  </button>

                  {showTaskBuilder && (
                    <div className="sr-task-builder">
                      <h4>Create a Task</h4>
                      <input type="text" placeholder="Task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="sr-task-input" />
                      <textarea placeholder="Task description or reading material..." value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="sr-task-textarea" />
                      <div className="sr-task-time-row">
                        <FaClock />
                        <input type="number" placeholder="Time limit (minutes)" value={taskTimeLimit} onChange={(e) => setTaskTimeLimit(e.target.value)} min="1" />
                      </div>
                      
                      <div className="sr-task-questions-section">
                        <h5>Questions</h5>
                        {taskQuestions.map((q, i) => (
                          <div key={i} className="sr-task-q-preview">
                            <span>Q{i + 1}: {q.question}</span>
                            <button onClick={() => removeTaskQuestion(i)}><FaTrash /></button>
                          </div>
                        ))}
                        <div className="sr-task-new-q">
                          <input type="text" placeholder="Question" value={newTaskQuestion.question} onChange={(e) => setNewTaskQuestion({ ...newTaskQuestion, question: e.target.value })} />
                          {newTaskQuestion.options.map((opt, i) => (
                            <div key={i} className="sr-task-opt-row">
                              <input type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => {
                                const newOpts = [...newTaskQuestion.options];
                                newOpts[i] = e.target.value;
                                setNewTaskQuestion({ ...newTaskQuestion, options: newOpts });
                              }} />
                              <input type="radio" name="task-correct" checked={newTaskQuestion.correct === i} onChange={() => setNewTaskQuestion({ ...newTaskQuestion, correct: i })} />
                            </div>
                          ))}
                          <button onClick={addTaskQuestion} disabled={!newTaskQuestion.question.trim()} className="sr-task-add-q-btn">
                            <FaPlus /> Add Question
                          </button>
                        </div>
                      </div>
                      <button onClick={publishTask} disabled={!taskTitle.trim()} className="sr-task-publish-btn">
                        <FaShare /> Publish Task
                      </button>
                    </div>
                  )}

                  {showQuizBuilder && (
                    <div className="sr-task-builder">
                      <h4>Quick Quiz</h4>
                      <input type="text" placeholder="Quiz title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} className="sr-task-input" />
                      {quizQuestions.map((q, i) => (
                        <div key={i} className="sr-task-q-preview">
                          <span>Q{i + 1}: {q.question}</span>
                          <button onClick={() => removeQuizQuestion(i)}><FaTrash /></button>
                        </div>
                      ))}
                      <div className="sr-task-new-q">
                        <input type="text" placeholder="Question" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} />
                        {newQuestion.options.map((opt, i) => (
                          <div key={i} className="sr-task-opt-row">
                            <input type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => {
                              const newOpts = [...newQuestion.options];
                              newOpts[i] = e.target.value;
                              setNewQuestion({ ...newQuestion, options: newOpts });
                            }} />
                            <input type="radio" name="quiz-correct" checked={newQuestion.correct === i} onChange={() => setNewQuestion({ ...newQuestion, correct: i })} />
                          </div>
                        ))}
                        <button onClick={addQuizQuestion} disabled={!newQuestion.question.trim()} className="sr-task-add-q-btn">
                          <FaPlus /> Add Question
                        </button>
                      </div>
                      <button onClick={publishQuiz} disabled={!quizTitle.trim() || quizQuestions.length === 0} className="sr-task-publish-btn quiz">
                        <FaShare /> Publish Quiz ({quizQuestions.length} Qs)
                      </button>
                    </div>
                  )}

                  <div className="sr-task-list">
                    <h4>Available Tasks & Quizzes</h4>
                    {tasks.length === 0 && !activeQuiz && (
                      <p className="sr-empty-hint">No tasks yet. Create one or wait for the teacher.</p>
                    )}
                    {tasks.map(task => (
                      <div key={task.id} className="sr-task-card">
                        <div className="sr-task-card-header">
                          <div>
                            <h5>{task.title}</h5>
                            {task.description && <p>{task.description}</p>}
                            <span className="sr-task-meta">
                              by {task.createdBy} • {task.questions.length} questions
                              {task.timeLimit && ` • ${task.timeLimit} min`}
                            </span>
                          </div>
                          <div className="sr-task-card-actions">
                            <button onClick={() => startTask(task)} className="sr-task-start-btn">
                              <FaPlay /> Start
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="sr-task-delete-btn">
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {activeQuiz && !quizSubmitted && (
                      <div className="sr-task-card quiz-card">
                        <div className="sr-task-card-header">
                          <div>
                            <h5>📝 {activeQuiz.title}</h5>
                            <span className="sr-task-meta">by {activeQuiz.createdBy} • {activeQuiz.questions.length} questions</span>
                          </div>
                          <button onClick={() => setActiveQuiz(null)} className="sr-task-delete-btn">
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Whiteboard Tab */}
              {contentTab === 'whiteboard' && (
                <div className="sr-whiteboard-content">
                  <div className="sr-whiteboard-colors-inline">
                    {['#1a1a1a', '#E57373', '#42A5F5', '#4CAF50', '#FF9800', '#7E57C2'].map(color => (
                      <button key={color} className={`sr-color-dot ${whiteboardColor === color ? 'active' : ''}`} style={{ background: color }} onClick={() => setWhiteboardColor(color)} />
                    ))}
                  </div>
                  <textarea className="sr-whiteboard-textarea" placeholder="Type, paste, or solve problems here together..." value={whiteboardContent} onChange={(e) => setWhiteboardContent(e.target.value)} style={{ color: whiteboardColor }} />
                  <div className="sr-whiteboard-actions">
                    <button onClick={saveWhiteboard}>Save & Share</button>
                    <button onClick={() => setWhiteboardContent('')} className="clear-btn"><FaEraser /> Clear</button>
                  </div>
                </div>
              )}

              {/* Participants Tab */}
              {contentTab === 'participants' && (
                <div className="sr-participants-content">
                  <h4>People in this room</h4>
                  <div className="sr-participants-list-vertical">
                    {participants.map((p, i) => (
                      <div key={i} className="sr-participant-row">
                        <img src={avatarMap[userData.avatar] || '/AVO.png'} alt="" className="sr-participant-avatar-sm" />
                        <span>{p}</span>
                        {p === currentRoom.createdBy && <span className="sr-host-badge">Host</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Active Task Overlay */}
            {activeTask && !taskSubmitted && (
              <div className="sr-overlay">
                <div className="sr-task-take">
                  <div className="sr-task-take-header">
                    <h3>{activeTask.title}</h3>
                    {activeTask.timeLimit && (
                      <div className="sr-task-take-timer">
                        <FaHourglassHalf /> {formatTime(taskTimerMinutes, taskTimerSeconds)}
                      </div>
                    )}
                  </div>
                  {activeTask.description && <p className="sr-task-take-desc">{activeTask.description}</p>}
                  
                  {activeTask.questions.map((q, qi) => (
                    <div key={qi} className="sr-task-q-block">
                      <p className="sr-task-q-text">{qi + 1}. {q.question}</p>
                      <div className="sr-task-options">
                        {q.options.map((opt, oi) => (
                          <button key={oi} className={`sr-task-opt ${taskAnswers[qi] === oi ? 'selected' : ''}`} onClick={() => setTaskAnswers({ ...taskAnswers, [qi]: oi })}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <button className="sr-task-submit-btn" onClick={submitTask} disabled={activeTask.questions.length > 0 && Object.keys(taskAnswers).length < activeTask.questions.length}>
                    Submit Task
                  </button>
                  <button className="sr-task-close-btn" onClick={() => { setActiveTask(null); setTaskTimerRunning(false); }}>
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Task Results */}
            {activeTask && taskSubmitted && (
              <div className="sr-overlay">
                <div className="sr-task-results">
                  <h3>Task Complete: {activeTask.title}</h3>
                  <div className="sr-task-score-circle">
                    <span className="sr-task-score-num">{taskScore}%</span>
                  </div>
                  <p>{taskScore >= 70 ? 'Great work! 🎉' : taskScore >= 40 ? 'Keep going! 💪' : 'Room to grow! 📚'}</p>
                  <button onClick={() => { setActiveTask(null); setTaskSubmitted(false); }}>Done</button>
                </div>
              </div>
            )}

            {/* Quiz Take Overlay */}
            {activeQuiz && !quizSubmitted && (
              <div className="sr-overlay">
                <div className="sr-task-take">
                  <h3>{activeQuiz.title}</h3>
                  <p className="sr-task-take-desc">by {activeQuiz.createdBy} • {activeQuiz.questions.length} questions</p>
                  {activeQuiz.questions.map((q, qi) => (
                    <div key={qi} className="sr-task-q-block">
                      <p className="sr-task-q-text">{qi + 1}. {q.question}</p>
                      <div className="sr-task-options">
                        {q.options.map((opt, oi) => (
                          <button key={oi} className={`sr-task-opt ${quizAnswers[qi] === oi ? 'selected' : ''}`} onClick={() => setQuizAnswers({ ...quizAnswers, [qi]: oi })}>{opt}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button className="sr-task-submit-btn" onClick={submitQuiz} disabled={Object.keys(quizAnswers).length < activeQuiz.questions.length}>
                    Submit Quiz
                  </button>
                  <button className="sr-task-close-btn" onClick={() => { setActiveQuiz(null); setQuizAnswers({}); }}>Close</button>
                </div>
              </div>
            )}

            {/* Quiz Results */}
            {activeQuiz && quizSubmitted && (
              <div className="sr-overlay">
                <div className="sr-task-results">
                  <h3>Quiz Results: {activeQuiz.title}</h3>
                  <div className="sr-task-score-circle"><span className="sr-task-score-num">{quizScore}%</span></div>
                  <p>{quizScore >= 70 ? 'Great job! 🎉' : quizScore >= 40 ? 'Keep practicing! 💪' : 'Room to improve! 📚'}</p>
                  <button onClick={() => { setActiveQuiz(null); setQuizAnswers({}); setQuizSubmitted(false); }}>Done</button>
                </div>
              </div>
            )}

            {/* Chat Icon + Toast + Slide-out Panel */}
            <div className="sr-chat-zone">
              {newMessageToast && !chatOpen && (
                <div className="sr-chat-toast" onClick={openChat}>
                  <strong>{newMessageToast.sender}:</strong> {newMessageToast.text}
                </div>
              )}
              
              <button className="sr-chat-toggle-btn" onClick={() => { if (chatOpen) { setChatOpen(false); } else { openChat(); } }}>
                <FaComments />
                {unreadCount > 0 && <span className="sr-chat-badge">{unreadCount}</span>}
              </button>

              {chatOpen && (
                <div className="sr-chat-panel">
                  <div className="sr-chat-panel-header">
                    <span>Chat</span>
                    <NeoVoice 
                      onSpeechResult={(transcript) => handleSendMessage(transcript)}
                      neoMessage={neoSpokenMessage}
                    />
                    <button onClick={() => setChatOpen(false)}><FaTimes /></button>
                  </div>
                  <div className="sr-chat-panel-messages">
                    {messages.map(msg => (
                      <div key={msg.id} className={`sr-chat-msg ${msg.isNeo ? 'neo' : ''}`}>
                        {msg.isNeo ? (
                          <div className="sr-chat-msg-body neo-body">
                            <span className="sr-chat-msg-sender neo-sender">💜 Neo</span>
                            <p className="sr-chat-msg-text">{msg.text}</p>
                          </div>
                        ) : (
                          <>
                            <img src={avatarMap[msg.avatar] || '/AVO.png'} alt="" className="sr-chat-msg-avatar" />
                            <div className="sr-chat-msg-body">
                              <span className="sr-chat-msg-sender">{msg.sender}</span>
                              <p className="sr-chat-msg-text">{msg.text}</p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="sr-chat-panel-input">
                    <input type="text" placeholder="Type @neo to ask Neo..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                    <button onClick={() => handleSendMessage()} disabled={!chatInput.trim()}><FaPaperPlane /></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="dash-footer">
        <button className="ftab" onClick={() => navigate('/dashboard')}><FaHome /></button>
        <button className="ftab" onClick={() => navigate('/tasks')}><FaTasks /></button>
        <button className="ftab active"><FaComments /></button>
        <button className="ftab" onClick={() => navigate('/profile')}><FaUser /></button>
      </footer>
    </div>
  );
};

export default StudyRoom;