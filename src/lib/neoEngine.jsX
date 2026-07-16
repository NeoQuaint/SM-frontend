// Neo OS Engine — No ML, just context + rules + LLM

const API_URL = 'https://smartclass-wlgb.onrender.com';

class NeoEngine {
  constructor() {
    this.memory = {};
    this.patterns = {};
    this.preferences = {};
  }

  // Load student's full memory from backend
  async loadMemory(userId) {
    try {
      const response = await fetch(`${API_URL}/api/neo/memory/${userId}`);
      const data = await response.json();
      this.memory = data.memory || {};
      this.patterns = data.patterns || {};
      this.preferences = data.preferences || {};
      return this.memory;
    } catch (err) {
      console.error('Memory load failed:', err);
      return {};
    }
  }

  // Build rich context for every Neo interaction
  buildContext(userData, currentPage, additionalContext = {}) {
    const grade = userData?.grade || '10';
    const level = userData?.education_level || 'highschool';
    const subjects = userData?.subjects || [];
    const performance = userData?.performance || {};
    
    // Calculate learning metrics
    const weakestSubject = this.getWeakestSubject(performance, subjects);
    const strongestSubject = this.getStrongestSubject(performance, subjects);
    const studyStreak = this.calculateStreak();
    const timeOfDay = this.getTimeOfDay();
    const lastLesson = this.memory.lastLesson || null;
    const hoursSinceLastStudy = lastLesson 
      ? Math.round((Date.now() - new Date(lastLesson).getTime()) / 3600000) 
      : 999;

    return {
      // Student profile
      grade,
      level,
      subjects,
      performance,
      
      // Insights
      weakestSubject,
      strongestSubject,
      studyStreak,
      timeOfDay,
      hoursSinceLastStudy,
      lastLesson,
      
      // Current state
      currentPage,
      ...additionalContext,
      
      // Learning preferences (learned over time)
      preferences: this.preferences,
      
      // Patterns Neo has noticed
      patterns: this.patterns,
    };
  }

  // Build the system prompt that makes Neo feel like an OS
  buildSystemPrompt(context) {
    const { 
      grade, level, subjects, performance, 
      weakestSubject, strongestSubject, studyStreak,
      timeOfDay, hoursSinceLastStudy, currentPage,
      preferences, patterns 
    } = context;

    return `You are Neo, the AI operating system of SmartClass. You are not a chatbot. You are the platform's intelligence layer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STUDENT STATE (What you know right now)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Grade: ${grade} (${level})
Subjects: ${subjects.join(', ')}
Performance: ${JSON.stringify(performance)}
Weakest subject: ${weakestSubject}
Strongest subject: ${strongestSubject}
Study streak: ${studyStreak} days
Time of day: ${timeOfDay}
Hours since last study: ${hoursSinceLastStudy}
Current page: ${currentPage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEARNED PATTERNS (What you've noticed about this student)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${JSON.stringify(patterns, null, 2)}
Preferred teaching style: ${preferences.teachingStyle || 'step-by-step'}
Best time to study: ${preferences.bestStudyTime || 'unknown'}
Attention span: ${preferences.attentionSpan || 'unknown'} minutes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR ROLE AS THE OS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ANTICIPATE — Don't wait to be asked. If you notice they're struggling with ${weakestSubject}, proactively offer help. If they haven't studied in ${hoursSinceLastStudy} hours, gently check in.

2. REMEMBER — Reference past lessons naturally: "Last time we worked on quadratic equations, you picked it up quickly. Ready for the next step?"

3. ADAPT — If they're getting things right, increase difficulty. If wrong, slow down and try a different approach. You've noticed they learn best with ${preferences.teachingStyle || 'step-by-step explanations'}.

4. ORCHESTRATE — Connect everything. If they're studying ${currentPage === 'dashboard' ? 'their dashboard' : currentPage}, suggest what to do next based on their goals.

5. BE HUMAN — Warm, encouraging, concise. Like a brilliant tutor who really knows this student. Use their patterns to personalize every interaction.

6. CONTEXT MATTERS — ${timeOfDay === 'morning' ? 'Morning energy — keep it upbeat and focused.' : timeOfDay === 'night' ? 'Late night studying — be supportive but suggest rest if needed.' : 'Afternoon — good time for deeper learning.'}

7. CELEBRATE PROGRESS — They've studied for ${studyStreak} days in a row. Acknowledge their consistency.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Never just give answers — guide
- Break everything into steps
- Use South African context where natural
- Keep responses warm and conversational
- Maximum 3-4 paragraphs unless teaching a full lesson`;
  }

  // Ask Neo with full context
  async ask(message, userData, currentPage, additionalContext = {}) {
    const context = this.buildContext(userData, currentPage, additionalContext);
    const systemPrompt = this.buildSystemPrompt(context);

    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          subject: additionalContext.subject || context.weakestSubject,
          userId: userData?.id || userData?.email || 'student',
          systemPrompt, // Override default system prompt
          context, // Full context for memory storage
        })
      });

      const data = await response.json();
      
      // Save this interaction to memory
      this.recordInteraction(message, data.reply, context);
      
      return data;
    } catch (err) {
      console.error('Neo ask failed:', err);
      return { reply: 'I\'m having trouble connecting. Try again.' };
    }
  }

  // Record every interaction to learn patterns
  async recordInteraction(message, response, context) {
    this.memory.lastLesson = new Date().toISOString();
    this.memory.totalInteractions = (this.memory.totalInteractions || 0) + 1;
    
    // Detect patterns
    if (message.toLowerCase().includes('don\'t understand') || message.toLowerCase().includes('confused')) {
      this.patterns.struggleTopics = this.patterns.struggleTopics || [];
      if (!this.patterns.struggleTopics.includes(context.subject)) {
        this.patterns.struggleTopics.push(context.subject);
      }
    }
    
    // Learn preferences
    if (context.timeOfDay && !this.preferences.bestStudyTime) {
      this.preferences.bestStudyTime = context.timeOfDay;
    }
    
    // Save to backend
    try {
      await fetch(`${API_URL}/api/neo/memory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: context.userId || 'student',
          memory: this.memory,
          patterns: this.patterns,
          preferences: this.preferences,
        })
      });
    } catch (err) {
      console.error('Memory save failed:', err);
    }
  }

  // Generate proactive suggestions
  generateSuggestion(context) {
    const { hoursSinceLastStudy, weakestSubject, studyStreak, timeOfDay } = context;
    
    const suggestions = [];
    
    if (hoursSinceLastStudy > 24) {
      suggestions.push({
        type: 'comeback',
        message: `Welcome back! It's been ${hoursSinceLastStudy} hours. Ready for a quick ${weakestSubject} refresher?`,
        action: `lesson/${weakestSubject}`,
        priority: 'high',
      });
    }
    
    if (studyStreak > 0 && studyStreak % 5 === 0) {
      suggestions.push({
        type: 'celebration',
        message: `🔥 ${studyStreak} day streak! You're building a real habit. Let's keep it going!`,
        priority: 'medium',
      });
    }
    
    if (timeOfDay === 'morning') {
      suggestions.push({
        type: 'daily_plan',
        message: `Good morning! Today's focus: 20 minutes of ${weakestSubject} to start strong.`,
        action: `lesson/${weakestSubject}`,
        priority: 'high',
      });
    }
    
    return suggestions;
  }

  // Helper methods
  getWeakestSubject(performance, subjects) {
    const scores = { 'Bad': 1, 'Fair': 2, 'Good': 3, 'Very Good': 4 };
    return subjects.reduce((worst, subj) => 
      (scores[performance[worst]] || 4) > (scores[performance[subj]] || 4) ? subj : worst
    , subjects[0]);
  }

  getStrongestSubject(performance, subjects) {
    const scores = { 'Bad': 1, 'Fair': 2, 'Good': 3, 'Very Good': 4 };
    return subjects.reduce((best, subj) => 
      (scores[performance[best]] || 0) < (scores[performance[subj]] || 0) ? subj : best
    , subjects[0]);
  }

  calculateStreak() {
    return this.memory.studyStreak || 0;
  }

  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'night';
  }
}

// Singleton
const neoEngine = new NeoEngine();
export default neoEngine;