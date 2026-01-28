/**
 * FietsQuiz - Main Application Logic
 *
 * A Duolingo-style educational game for learning Dutch cycling traffic rules.
 * Target audience: 9-year-old children
 *
 * Architecture:
 * - Vanilla JavaScript SPA with no external dependencies
 * - State managed in global GameState object
 * - localStorage for progress persistence
 * - Screen-based navigation with CSS transitions
 * - Full touch support for tablet devices
 *
 * Dependencies: js/data.js (must be loaded first)
 */

'use strict';

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * Global game state manager
 * Handles both persistent (saved) and transient (session-only) state
 */
const GameState = {
  // ===== Persistent State (saved to localStorage) =====
  xp: 0,
  completedLessons: [],       // array of lesson IDs like ["1-1", "1-2"]
  lessonStars: {},             // { "1-1": 3, "1-2": 2 }
  lessonBestScore: {},         // { "1-1": 10 } - best score per lesson
  badges: [],                  // array of earned badge IDs
  streak: 0,
  lastPlayDate: null,          // ISO date string
  totalCorrect: 0,
  totalAnswered: 0,
  flashcardsReviewed: [],      // array of reviewed flashcard lesson IDs
  settings: { sound: true },

  // ===== Transient State (not saved) =====
  currentScreen: 'splash',
  currentLevel: null,          // level object
  currentLesson: null,         // lesson object
  currentQuestionIndex: 0,
  lives: 3,
  score: 0,                    // correct answers in current lesson
  totalQuestions: 0,
  lessonStartTime: null,
  answers: [],                 // track answers for current lesson

  // ===== Memory Game State =====
  memoryState: {
    firstCard: null,
    secondCard: null,
    matchedPairs: 0,
    moves: 0,
    isProcessing: false
  },

  // ===== Matching Game State =====
  matchingState: {
    matchedCount: 0,
    draggedElement: null,
    dragClone: null,
    offsetX: 0,
    offsetY: 0
  },

  // ===== Flashcard State =====
  flashcardState: {
    currentIndex: 0,
    known: [],
    practice: [],
    isFlipped: false
  },

  // ===== Badge Tracking Flags =====
  _speedDemonEarned: false,
  _memoryMasterEarned: false,

  /**
   * Save persistent state to localStorage
   */
  save() {
    try {
      const persistentState = {
        xp: this.xp,
        completedLessons: this.completedLessons,
        lessonStars: this.lessonStars,
        lessonBestScore: this.lessonBestScore,
        badges: this.badges,
        streak: this.streak,
        lastPlayDate: this.lastPlayDate,
        totalCorrect: this.totalCorrect,
        totalAnswered: this.totalAnswered,
        flashcardsReviewed: this.flashcardsReviewed,
        settings: this.settings,
        _speedDemonEarned: this._speedDemonEarned,
        _memoryMasterEarned: this._memoryMasterEarned
      };
      localStorage.setItem('fietsquiz_progress', JSON.stringify(persistentState));
    } catch (error) {
      console.error('Failed to save progress:', error);
      showToast('Kon voortgang niet opslaan', 'error');
    }
  },

  /**
   * Load persistent state from localStorage
   */
  load() {
    try {
      const saved = localStorage.getItem('fietsquiz_progress');
      if (saved) {
        const data = JSON.parse(saved);
        this.xp = data.xp || 0;
        this.completedLessons = data.completedLessons || [];
        this.lessonStars = data.lessonStars || {};
        this.lessonBestScore = data.lessonBestScore || {};
        this.badges = data.badges || [];
        this.streak = data.streak || 0;
        this.lastPlayDate = data.lastPlayDate || null;
        this.totalCorrect = data.totalCorrect || 0;
        this.totalAnswered = data.totalAnswered || 0;
        this.flashcardsReviewed = data.flashcardsReviewed || [];
        this.settings = data.settings || { sound: true };
        this._speedDemonEarned = data._speedDemonEarned || false;
        this._memoryMasterEarned = data._memoryMasterEarned || false;
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
      showToast('Kon voortgang niet laden', 'error');
    }
  },

  /**
   * Reset all progress
   */
  reset() {
    this.xp = 0;
    this.completedLessons = [];
    this.lessonStars = {};
    this.lessonBestScore = {};
    this.badges = [];
    this.streak = 0;
    this.lastPlayDate = null;
    this.totalCorrect = 0;
    this.totalAnswered = 0;
    this.flashcardsReviewed = [];
    this.settings = { sound: true };
    this._speedDemonEarned = false;
    this._memoryMasterEarned = false;
    this.save();
  },

  /**
   * Get current player title based on XP
   * @returns {Object} Title object with minXP, title, icon
   */
  getPlayerTitle() {
    if (typeof PLAYER_TITLES === 'undefined') return { title: 'Fietser', icon: '🚲' };

    let currentTitle = PLAYER_TITLES[0];
    for (const titleObj of PLAYER_TITLES) {
      if (this.xp >= titleObj.minXP) {
        currentTitle = titleObj;
      } else {
        break;
      }
    }
    return currentTitle;
  },

  /**
   * Get next player title
   * @returns {Object|null} Next title object or null if at max level
   */
  getNextTitle() {
    if (typeof PLAYER_TITLES === 'undefined') return null;

    for (const titleObj of PLAYER_TITLES) {
      if (this.xp < titleObj.minXP) {
        return titleObj;
      }
    }
    return null;
  },

  /**
   * Get overall progress percentage
   * @returns {number} Percentage (0-100)
   */
  getPlayerProgress() {
    if (typeof LESSONS === 'undefined') return 0;
    const totalLessons = Object.keys(LESSONS).length;
    if (totalLessons === 0) return 0;
    return Math.round((this.completedLessons.length / totalLessons) * 100);
  },

  /**
   * Check if a lesson is unlocked
   * @param {string} lessonId - Lesson ID
   * @returns {boolean}
   */
  isLessonUnlocked(lessonId) {
    if (typeof LESSONS === 'undefined') return false;

    const lesson = LESSONS[lessonId];
    if (!lesson) return false;

    const level = LEVELS.find(l => l.id === lesson.levelId);
    if (!level) return false;

    const lessonIndex = level.lessons.indexOf(lessonId);

    // First lesson in level is always unlocked if level is unlocked
    if (lessonIndex === 0) {
      return this.isLevelUnlocked(lesson.levelId);
    }

    // Other lessons unlock when previous lesson is completed
    const previousLessonId = level.lessons[lessonIndex - 1];
    return this.completedLessons.includes(previousLessonId);
  },

  /**
   * Check if a level is unlocked
   * @param {number} levelId - Level ID
   * @returns {boolean}
   */
  isLevelUnlocked(levelId) {
    if (typeof LEVELS === 'undefined') return false;

    // First level is always unlocked
    if (levelId === 1) return true;

    // Other levels unlock when previous level has at least 1 completed lesson
    const previousLevel = LEVELS.find(l => l.id === levelId - 1);
    if (!previousLevel) return false;

    return previousLevel.lessons.some(lessonId =>
      this.completedLessons.includes(lessonId)
    );
  },

  /**
   * Get total stars earned for a level
   * @param {number} levelId - Level ID
   * @returns {number} Total stars
   */
  getLevelStars(levelId) {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return 0;

    let totalStars = 0;
    level.lessons.forEach(lessonId => {
      totalStars += this.lessonStars[lessonId] || 0;
    });
    return totalStars;
  },

  /**
   * Get maximum possible stars for a level
   * @param {number} levelId - Level ID
   * @returns {number} Max stars (3 per lesson)
   */
  getLevelMaxStars(levelId) {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return 0;
    return level.lessons.length * 3;
  },

  /**
   * Add XP with animation
   * @param {number} amount - XP amount to add
   */
  earnXP(amount) {
    const oldXP = this.xp;
    this.xp += amount;

    // Trigger XP animation if on home screen
    const xpDisplay = document.getElementById('current-xp');
    if (xpDisplay && this.currentScreen === 'home') {
      animateValue(xpDisplay, oldXP, this.xp, 1000);
    }
  },

  /**
   * Update daily streak
   */
  updateStreak() {
    const today = new Date().toISOString().split('T')[0];

    if (!this.lastPlayDate) {
      this.streak = 1;
      this.lastPlayDate = today;
      this.save();
      return;
    }

    const lastDate = new Date(this.lastPlayDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day, streak continues
    } else if (diffDays === 1) {
      // Next day, streak increases
      this.streak++;
      this.lastPlayDate = today;
    } else {
      // Streak broken
      this.streak = 1;
      this.lastPlayDate = today;
    }

    this.save();
  },

  /**
   * Check for newly earned badges
   * @returns {Array} Array of newly earned badge objects
   */
  checkBadges() {
    if (typeof BADGES === 'undefined') return [];

    const newBadges = [];

    BADGES.forEach(badge => {
      if (this.badges.includes(badge.id)) return; // Already earned

      let earned = false;

      switch(badge.id) {
        case 'first-ride':
          earned = this.completedLessons.length >= 1;
          break;

        case 'streak-3':
          earned = this.streak >= 3;
          break;

        case 'streak-7':
          earned = this.streak >= 7;
          break;

        case 'perfect-score':
          earned = Object.values(this.lessonStars).some(s => s === 3);
          break;

        case 'speed-demon':
          earned = this._speedDemonEarned;
          break;

        case 'sign-expert':
          if (LEVELS.length >= 2) {
            earned = LEVELS[1].lessons.every(id => this.completedLessons.includes(id));
          }
          break;

        case 'safety-first':
          if (LEVELS.length >= 4) {
            earned = LEVELS[3].lessons.every(id => this.completedLessons.includes(id));
          }
          break;

        case 'halfway':
          const totalLessons = Object.keys(LESSONS).length;
          earned = this.completedLessons.length >= totalLessons / 2;
          break;

        case 'champion':
          earned = this.completedLessons.length >= Object.keys(LESSONS).length;
          break;

        case 'xp-100':
          earned = this.xp >= 100;
          break;

        case 'xp-500':
          earned = this.xp >= 500;
          break;

        case 'xp-1000':
          earned = this.xp >= 1000;
          break;

        case 'three-stars':
          earned = Object.values(this.lessonStars).filter(s => s === 3).length >= 5;
          break;

        case 'memory-master':
          earned = this._memoryMasterEarned;
          break;
      }

      if (earned) {
        this.badges.push(badge.id);
        newBadges.push(badge);
      }
    });

    return newBadges;
  }
};

// ============================================================================
// SCREEN NAVIGATION
// ============================================================================

/**
 * Show a specific screen and hide all others
 * @param {string} screenId - ID of screen to show (without 'screen-' prefix)
 */
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Show target screen
  const targetScreen = document.getElementById(`screen-${screenId}`);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // Update bottom nav active state
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.screen === screenId) {
      btn.classList.add('active');
    }
  });

  // Update current screen
  GameState.currentScreen = screenId;

  // Show/hide bottom nav (hide during lessons, splash, results)
  const hideNavScreens = ['splash', 'lesson', 'results', 'level'];
  const bottomNavs = document.querySelectorAll('.bottom-nav');
  bottomNavs.forEach(nav => {
    if (hideNavScreens.includes(screenId)) {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
    }
  });

  // Call screen-specific init functions
  switch(screenId) {
    case 'home':
      renderHome();
      break;
    case 'map':
      renderMap();
      break;
    case 'badges':
      renderBadges();
      break;
    case 'flashcard-review':
      renderFlashcardReview();
      break;
  }
}

// ============================================================================
// SCREEN RENDERERS
// ============================================================================

/**
 * Render the home/dashboard screen
 */
function renderHome() {
  // Player title
  const currentTitle = GameState.getPlayerTitle();
  const playerTitleEl = document.getElementById('player-title');
  if (playerTitleEl) {
    playerTitleEl.textContent = `${currentTitle.icon} ${currentTitle.title}`;
  }

  // XP display
  const currentXpEl = document.getElementById('current-xp');
  if (currentXpEl) {
    currentXpEl.textContent = GameState.xp;
  }

  // Streak display
  const streakCountEl = document.getElementById('streak-count');
  if (streakCountEl) {
    streakCountEl.textContent = GameState.streak;
  }

  // Animate streak if > 0
  const streakDisplay = document.getElementById('streak-display');
  if (streakDisplay && GameState.streak > 0) {
    streakDisplay.classList.add('pulse');
    setTimeout(() => streakDisplay.classList.remove('pulse'), 1000);
  }

  // XP progress bar
  const nextTitle = GameState.getNextTitle();
  if (nextTitle) {
    const currentTitle = GameState.getPlayerTitle();
    const xpInCurrentLevel = GameState.xp - currentTitle.minXP;
    const xpNeededForNext = nextTitle.minXP - currentTitle.minXP;
    const progressPercent = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);

    const progressFill = document.getElementById('xp-progress-fill');
    if (progressFill) {
      progressFill.style.width = `${progressPercent}%`;
    }

    const xpToNext = document.getElementById('xp-to-next');
    const nextTitleEl = document.getElementById('next-title');
    if (xpToNext && nextTitleEl) {
      xpToNext.textContent = nextTitle.minXP - GameState.xp;
      nextTitleEl.textContent = nextTitle.title;
    }
  } else {
    // Max level reached
    const progressFill = document.getElementById('xp-progress-fill');
    if (progressFill) {
      progressFill.style.width = '100%';
    }

    const xpProgressText = document.querySelector('.xp-progress-text');
    if (xpProgressText) {
      xpProgressText.textContent = 'Maximaal niveau bereikt!';
    }
  }

  // Stats
  const lessonsCompletedEl = document.getElementById('lessons-completed');
  if (lessonsCompletedEl) {
    lessonsCompletedEl.textContent = GameState.completedLessons.length;
  }

  const starsEarnedEl = document.getElementById('stars-earned');
  if (starsEarnedEl) {
    const totalStars = Object.values(GameState.lessonStars).reduce((sum, stars) => sum + stars, 0);
    starsEarnedEl.textContent = totalStars;
  }

  const badgesEarnedEl = document.getElementById('badges-earned-count');
  if (badgesEarnedEl) {
    badgesEarnedEl.textContent = GameState.badges.length;
  }
}

/**
 * Render the level map screen
 */
function renderMap() {
  const levelPath = document.getElementById('level-path');
  if (!levelPath || typeof LEVELS === 'undefined') return;

  levelPath.innerHTML = '';

  LEVELS.forEach((level, index) => {
    const isUnlocked = GameState.isLevelUnlocked(level.id);
    const stars = GameState.getLevelStars(level.id);
    const maxStars = GameState.getLevelMaxStars(level.id);

    const levelNode = document.createElement('div');
    levelNode.className = `level-node ${isUnlocked ? 'bg-white rounded-3xl shadow-premium border border-gray-100 p-6 cursor-pointer hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex items-center gap-6' : 'bg-gray-100 rounded-3xl shadow-sm border border-gray-200 p-6 opacity-60 flex items-center gap-6'}`;
    levelNode.dataset.levelId = level.id;

    // Add connecting line (except for first level)
    if (index > 0) {
      const connector = document.createElement('div');
      connector.className = 'level-connector w-1 h-8 bg-gray-300 mx-auto rounded-full';
      levelPath.appendChild(connector);
    }

    levelNode.innerHTML = `
      <div class="level-icon w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-premium text-white" style="background: linear-gradient(135deg, ${level.color || '#4A90E2'} 0%, ${level.color || '#4A90E2'}dd 100%)">${level.icon}</div>
      <div class="level-info flex-1">
        <div class="level-name text-2xl font-black text-slate-900">${level.name}</div>
        ${isUnlocked ? `
          <div class="level-progress text-lg mt-2 flex items-center gap-3">
            <span class="stars drop-shadow">${'⭐'.repeat(Math.min(stars, 3))}</span>
            <span class="star-count font-bold text-slate-600">${stars}/${maxStars}</span>
          </div>
        ` : `
          <div class="level-locked mt-2">
            <span class="lock-icon text-3xl opacity-50">🔒</span>
          </div>
        `}
      </div>
    `;

    if (isUnlocked) {
      levelNode.addEventListener('click', () => {
        GameState.currentLevel = level;
        renderLevel(level.id);
        showScreen('level');
      });
    }

    levelPath.appendChild(levelNode);
  });
}

/**
 * Render the level detail screen with lesson list
 * @param {number} levelId - Level ID
 */
function renderLevel(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return;

  // Level header
  const levelIconLarge = document.getElementById('level-icon-large');
  const levelName = document.getElementById('level-name');
  const levelDescription = document.getElementById('level-description');
  const levelHeader = document.querySelector('.level-header');

  if (levelIconLarge) levelIconLarge.textContent = level.icon;
  if (levelName) levelName.textContent = level.name;
  if (levelDescription) levelDescription.textContent = level.description;
  if (levelHeader) levelHeader.style.backgroundColor = level.color || '#4A90E2';

  // Lesson list
  const lessonsList = document.getElementById('lessons-list');
  if (!lessonsList) return;

  lessonsList.innerHTML = '';

  level.lessons.forEach((lessonId, index) => {
    const lesson = LESSONS[lessonId];
    if (!lesson) return;

    const isUnlocked = GameState.isLessonUnlocked(lessonId);
    const isCompleted = GameState.completedLessons.includes(lessonId);
    const stars = GameState.lessonStars[lessonId] || 0;

    // Mode icon mapping
    const modeIcons = {
      quiz: '❓',
      truefalse: '⚡',
      memory: '🧠',
      matching: '🎯',
      flashcards: '📚',
      situation: '🚦'
    };

    const lessonCard = document.createElement('div');
    lessonCard.className = isCompleted
      ? 'lesson-card bg-white rounded-3xl shadow-premium border border-emerald-200 p-6 cursor-pointer hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 border-l-4 border-emerald-500'
      : `lesson-card ${isUnlocked ? 'bg-white rounded-3xl shadow-premium border border-gray-100 p-6 cursor-pointer hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex items-center gap-5' : 'bg-gray-100 rounded-3xl shadow-sm border border-gray-200 p-6 opacity-50 flex items-center gap-5'}`;
    lessonCard.dataset.lessonId = lessonId;

    lessonCard.innerHTML = `
      <div class="lesson-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-3xl shadow-sm border border-orange-200">${modeIcons[lesson.mode] || '📝'}</div>
      <div class="lesson-info flex-1">
        <h3 class="lesson-name text-xl font-black text-slate-900">${lesson.name}</h3>
        <div class="lesson-meta flex items-center gap-3 mt-2 text-sm">
          <span class="lesson-mode text-slate-600 font-semibold">${getModeDisplayName(lesson.mode)}</span>
          ${lesson.xpReward ? `<span class="lesson-xp font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">+${lesson.xpReward} XP</span>` : ''}
        </div>
      </div>
      ${isCompleted ? `
        <div class="lesson-status flex-shrink-0">
          <span class="stars text-2xl drop-shadow">${'⭐'.repeat(stars)}</span>
        </div>
      ` : isUnlocked ? `
        <div class="lesson-status flex-shrink-0">
          <button class="btn-start-lesson bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3 px-6 rounded-2xl text-sm shadow-premium hover:shadow-glow hover:-translate-y-0.5 active:scale-95 transition-all">Start</button>
        </div>
      ` : `
        <div class="lesson-status flex-shrink-0">
          <span class="lock-icon text-3xl opacity-50">🔒</span>
        </div>
      `}
    `;

    if (isUnlocked) {
      lessonCard.addEventListener('click', () => startLesson(lessonId));
    }

    lessonsList.appendChild(lessonCard);
  });
}

/**
 * Render the badges screen
 */
function renderBadges() {
  if (typeof BADGES === 'undefined') return;

  const badgesCount = document.getElementById('badges-count');
  if (badgesCount) {
    badgesCount.textContent = `${GameState.badges.length} van ${BADGES.length} badges verdiend`;
  }

  const badgesGrid = document.getElementById('badges-grid');
  if (!badgesGrid) return;

  badgesGrid.innerHTML = '';

  BADGES.forEach(badge => {
    const isEarned = GameState.badges.includes(badge.id);

    const badgeCard = document.createElement('div');
    badgeCard.className = `badge-card ${isEarned ? 'bg-white rounded-3xl shadow-premium border border-gray-100 p-7 text-center hover:shadow-glow hover:-translate-y-1 transition-all duration-300' : 'bg-gray-100 rounded-3xl shadow-sm border border-gray-200 p-7 text-center opacity-50'}`;
    badgeCard.dataset.badgeId = badge.id;

    badgeCard.innerHTML = `
      <div class="badge-icon text-6xl mb-4 block drop-shadow-lg">${isEarned ? badge.icon : '❓'}</div>
      <h3 class="badge-name text-xl font-black text-slate-900 mb-2">${isEarned ? badge.name : '???'}</h3>
      ${isEarned ? `<p class="badge-description text-sm text-slate-600 mt-2 font-semibold leading-relaxed">${badge.description}</p>` : ''}
    `;

    badgesGrid.appendChild(badgeCard);
  });
}

/**
 * Render the flashcard review screen
 */
function renderFlashcardReview() {
  const categoryGrid = document.getElementById('category-grid');
  if (!categoryGrid || typeof LESSONS === 'undefined') return;

  categoryGrid.innerHTML = '';

  // Find all flashcard lessons
  const flashcardLessons = Object.values(LESSONS).filter(lesson => lesson.mode === 'flashcards');

  flashcardLessons.forEach(lesson => {
    const level = LEVELS.find(l => l.id === lesson.levelId);
    const isReviewed = GameState.flashcardsReviewed.includes(lesson.id);
    const cardCount = lesson.questions ? lesson.questions.length : 0;

    const categoryCard = document.createElement('button');
    categoryCard.className = `category-card ${isReviewed ? 'bg-white rounded-3xl shadow-premium border border-emerald-200 p-7 text-center hover:shadow-glow hover:-translate-y-1 transition-all duration-300 w-full border-2 border-emerald-400' : 'bg-white rounded-3xl shadow-premium border border-gray-100 p-7 text-center hover:shadow-glow hover:-translate-y-1 transition-all duration-300 w-full'}`;
    categoryCard.dataset.lessonId = lesson.id;

    categoryCard.innerHTML = `
      <div class="category-icon text-5xl mb-4 block drop-shadow">${level ? level.icon : '📚'}</div>
      <h3 class="category-name text-xl font-black text-slate-900 mb-2">${lesson.name}</h3>
      <p class="category-meta text-sm text-slate-600 mt-3 font-bold space-x-2">
        <span class="category-level">${level ? level.name : ''}</span>
        <span class="category-count">• ${cardCount} kaarten</span>
      </p>
      ${isReviewed ? '<span class="reviewed-badge inline-block mt-3 bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full">✓ Bekeken</span>' : ''}
    `;

    categoryCard.addEventListener('click', () => {
      startStandaloneFlashcards(lesson.id);
    });

    categoryGrid.appendChild(categoryCard);
  });
}

// ============================================================================
// LESSON GAME ENGINE
// ============================================================================

/**
 * Start a lesson
 * @param {string} lessonId - Lesson ID
 */
function startLesson(lessonId) {
  const lesson = LESSONS[lessonId];
  if (!lesson) {
    console.error('Lesson not found:', lessonId);
    return;
  }

  // Initialize lesson state
  GameState.currentLesson = lesson;
  GameState.currentQuestionIndex = 0;
  GameState.lives = 3;
  GameState.score = 0;
  GameState.answers = [];
  GameState.lessonStartTime = Date.now();

  // Reset game-specific state
  GameState.memoryState = {
    firstCard: null,
    secondCard: null,
    matchedPairs: 0,
    moves: 0,
    isProcessing: false
  };

  GameState.matchingState = {
    matchedCount: 0,
    draggedElement: null,
    dragClone: null,
    offsetX: 0,
    offsetY: 0
  };

  GameState.flashcardState = {
    currentIndex: 0,
    known: [],
    practice: [],
    isFlipped: false
  };

  // Determine total questions based on mode
  if (lesson.mode === 'memory') {
    GameState.totalQuestions = lesson.questions[0].pairs.length / 2;
  } else if (lesson.mode === 'flashcards') {
    GameState.totalQuestions = lesson.questions.length;
  } else if (lesson.mode === 'matching') {
    GameState.totalQuestions = lesson.questions[0].items.length;
  } else {
    GameState.totalQuestions = lesson.questions.length;
  }

  showScreen('lesson');
  renderLessonUI();
  loadQuestion();
}

/**
 * Render lesson UI (progress, hearts, containers)
 */
function renderLessonUI() {
  const lesson = GameState.currentLesson;
  if (!lesson) return;

  // Hide all game containers
  document.querySelectorAll('.game-container').forEach(container => {
    container.style.display = 'none';
  });

  // Show appropriate container
  const containerId = `game-${lesson.mode}`;
  const container = document.getElementById(containerId);
  if (container) {
    container.style.display = 'block';
  }

  // Update progress bar
  updateProgressBar();

  // Update hearts
  updateHeartsDisplay();

  // Update question counter
  updateQuestionCounter();
}

/**
 * Load current question based on lesson mode
 */
function loadQuestion() {
  const lesson = GameState.currentLesson;
  if (!lesson) return;

  switch(lesson.mode) {
    case 'quiz':
      loadQuizQuestion();
      break;
    case 'truefalse':
      loadTrueFalseQuestion();
      break;
    case 'memory':
      loadMemoryGame();
      break;
    case 'matching':
      loadMatchingGame();
      break;
    case 'flashcards':
      loadFlashcards();
      break;
    case 'situation':
      loadSituationQuestion();
      break;
    default:
      console.error('Unknown lesson mode:', lesson.mode);
  }
}

// ============================================================================
// QUIZ MODE
// ============================================================================

/**
 * Load a quiz question
 */
function loadQuizQuestion() {
  const question = GameState.currentLesson.questions[GameState.currentQuestionIndex];
  if (!question) return;

  // Update UI
  updateProgressBar();
  updateQuestionCounter();

  // Set question text
  const questionTextEl = document.getElementById('quiz-question');
  if (questionTextEl) {
    questionTextEl.textContent = question.question;
  }

  // Create option buttons
  const optionsContainer = document.getElementById('quiz-options');
  if (!optionsContainer) return;

  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn bg-white border-2 border-gray-200 rounded-2xl p-5 text-left text-lg font-semibold text-slate-700 hover:border-orange-400 hover:bg-orange-50/30 hover:shadow-premium hover:-translate-y-0.5 transition-all duration-200 w-full flex items-center gap-3';
    button.dataset.option = index;

    const labels = ['A', 'B', 'C', 'D'];
    button.innerHTML = `<span class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-slate-600">${labels[index]}</span><span class="flex-1">${option}</span>`;

    button.addEventListener('click', () => handleQuizAnswer(index));

    optionsContainer.appendChild(button);
  });
}

/**
 * Handle quiz answer selection
 * @param {number} selectedIndex - Index of selected option
 */
function handleQuizAnswer(selectedIndex) {
  const question = GameState.currentLesson.questions[GameState.currentQuestionIndex];
  const correct = selectedIndex === question.correct;

  // Disable all option buttons
  const optionButtons = document.querySelectorAll('#quiz-options .option-btn');
  optionButtons.forEach(btn => {
    btn.disabled = true;
    const btnIndex = parseInt(btn.dataset.option);

    // Highlight correct answer
    if (btnIndex === question.correct) {
      btn.classList.add('correct');
    }

    // Highlight selected answer if wrong
    if (btnIndex === selectedIndex && !correct) {
      btn.classList.add('incorrect');
      btn.classList.add('shake');
    }
  });

  // Update state
  if (correct) {
    GameState.score++;
    GameState.totalCorrect++;
  } else {
    GameState.lives--;
    updateHeartsDisplay();
  }

  GameState.totalAnswered++;
  GameState.answers.push({
    correct,
    questionIndex: GameState.currentQuestionIndex,
    selectedIndex,
    correctIndex: question.correct
  });

  // Show feedback after short delay
  setTimeout(() => {
    showFeedback(correct, question.explanation);
  }, 600);
}

// ============================================================================
// TRUE/FALSE MODE
// ============================================================================

/**
 * Load a true/false question
 */
function loadTrueFalseQuestion() {
  const question = GameState.currentLesson.questions[GameState.currentQuestionIndex];
  if (!question) return;

  // Update UI
  updateProgressBar();
  updateQuestionCounter();

  // Set statement text
  const statementTextEl = document.getElementById('truefalse-statement');
  if (statementTextEl) {
    statementTextEl.textContent = question.statement;
  }

  // Enable buttons
  const trueBtn = document.getElementById('btn-true');
  const falseBtn = document.getElementById('btn-false');

  if (trueBtn) {
    trueBtn.disabled = false;
    trueBtn.classList.remove('correct', 'incorrect');
    trueBtn.onclick = () => handleTrueFalseAnswer(true);
  }

  if (falseBtn) {
    falseBtn.disabled = false;
    falseBtn.classList.remove('correct', 'incorrect');
    falseBtn.onclick = () => handleTrueFalseAnswer(false);
  }

  // Optional: Start timer (15 seconds)
  // startTrueFalseTimer();
}

/**
 * Handle true/false answer
 * @param {boolean} answer - User's answer
 */
function handleTrueFalseAnswer(answer) {
  const question = GameState.currentLesson.questions[GameState.currentQuestionIndex];
  const correct = answer === question.correct;

  // Disable buttons
  const trueBtn = document.getElementById('btn-true');
  const falseBtn = document.getElementById('btn-false');

  if (trueBtn) trueBtn.disabled = true;
  if (falseBtn) falseBtn.disabled = true;

  // Highlight correct answer
  const correctBtn = question.correct ? trueBtn : falseBtn;
  if (correctBtn) correctBtn.classList.add('correct');

  // Highlight selected if wrong
  if (!correct) {
    const selectedBtn = answer ? trueBtn : falseBtn;
    if (selectedBtn) {
      selectedBtn.classList.add('incorrect');
      selectedBtn.classList.add('shake');
    }
  }

  // Update state
  if (correct) {
    GameState.score++;
    GameState.totalCorrect++;
  } else {
    GameState.lives--;
    updateHeartsDisplay();
  }

  GameState.totalAnswered++;
  GameState.answers.push({
    correct,
    questionIndex: GameState.currentQuestionIndex,
    userAnswer: answer
  });

  // Show feedback
  setTimeout(() => {
    showFeedback(correct, question.explanation);
  }, 600);
}

// ============================================================================
// MEMORY GAME MODE
// ============================================================================

/**
 * Load memory game
 */
function loadMemoryGame() {
  const memoryData = GameState.currentLesson.questions[0];
  if (!memoryData) return;

  // Reset memory state
  GameState.memoryState = {
    firstCard: null,
    secondCard: null,
    matchedPairs: 0,
    moves: 0,
    isProcessing: false
  };

  // Update UI
  const matchCounter = document.getElementById('match-counter');
  if (matchCounter) {
    matchCounter.textContent = `Gevonden: 0/${memoryData.pairs.length / 2}`;
  }

  // Create and shuffle cards
  const cards = [...memoryData.pairs];
  const shuffledCards = shuffleArray(cards);

  // Render memory grid
  const memoryGrid = document.getElementById('memory-grid');
  if (!memoryGrid) return;

  memoryGrid.innerHTML = '';

  // Determine grid size based on number of cards
  const cardCount = shuffledCards.length;
  const columns = cardCount <= 12 ? 3 : 4;
  memoryGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'memory-card w-full aspect-square';
    cardElement.dataset.cardId = index;
    cardElement.dataset.matchId = card.match;

    cardElement.innerHTML = `
      <div class="memory-card-inner w-full h-full">
        <div class="memory-card-front card-front bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-4xl text-white font-black shadow-premium border-2 border-orange-300"></div>
        <div class="memory-card-back card-back bg-white rounded-2xl flex items-center justify-center p-3 text-sm font-bold text-slate-800 shadow-premium border-2 border-orange-400">
          <div class="card-content">${card.back || card.front}</div>
        </div>
      </div>
    `;

    cardElement.addEventListener('click', () => handleMemoryCardClick(cardElement));

    memoryGrid.appendChild(cardElement);
  });

  // Start timer
  const timerEl = document.getElementById('memory-timer');
  if (timerEl) {
    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      timerEl.textContent = `Tijd: ${minutes}:${seconds.toString().padStart(2, '0')}`;

      // Stop timer when all matched
      if (GameState.memoryState.matchedPairs >= memoryData.pairs.length / 2) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }
}

/**
 * Handle memory card click
 * @param {HTMLElement} cardElement - Clicked card element
 */
function handleMemoryCardClick(cardElement) {
  const memState = GameState.memoryState;

  // Ignore if processing, already flipped, or already matched
  if (memState.isProcessing ||
      cardElement.classList.contains('flipped') ||
      cardElement.classList.contains('matched')) {
    return;
  }

  // Flip card
  cardElement.classList.add('flipped');

  if (!memState.firstCard) {
    // First card selected
    memState.firstCard = cardElement;
  } else if (!memState.secondCard) {
    // Second card selected
    memState.secondCard = cardElement;
    memState.moves++;
    memState.isProcessing = true;

    // Check for match
    const firstMatch = memState.firstCard.dataset.matchId;
    const secondMatch = memState.secondCard.dataset.matchId;

    if (firstMatch === secondMatch) {
      // Match found!
      setTimeout(() => {
        memState.firstCard.classList.add('matched');
        memState.secondCard.classList.add('matched');
        memState.matchedPairs++;

        // Update counter
        const matchCounter = document.getElementById('match-counter');
        if (matchCounter) {
          const totalPairs = GameState.currentLesson.questions[0].pairs.length / 2;
          matchCounter.textContent = `Gevonden: ${memState.matchedPairs}/${totalPairs}`;
        }

        // Reset selection
        memState.firstCard = null;
        memState.secondCard = null;
        memState.isProcessing = false;

        // Check if all matched
        const totalPairs = GameState.currentLesson.questions[0].pairs.length / 2;
        if (memState.matchedPairs >= totalPairs) {
          // Calculate score based on moves (fewer moves = better)
          const perfectMoves = totalPairs;
          const goodMoves = totalPairs * 1.5;

          if (memState.moves <= perfectMoves) {
            GameState.score = GameState.totalQuestions; // Perfect!
          } else if (memState.moves <= goodMoves) {
            GameState.score = Math.ceil(GameState.totalQuestions * 0.8);
          } else {
            GameState.score = Math.ceil(GameState.totalQuestions * 0.6);
          }

          // Check for memory master badge
          if (memState.moves <= perfectMoves) {
            GameState._memoryMasterEarned = true;
          }

          setTimeout(() => {
            endLesson(true);
          }, 1000);
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        memState.firstCard.classList.remove('flipped');
        memState.secondCard.classList.remove('flipped');
        memState.firstCard = null;
        memState.secondCard = null;
        memState.isProcessing = false;
      }, 1000);
    }
  }
}

// ============================================================================
// MATCHING/DRAG MODE
// ============================================================================

/**
 * Load matching game
 */
function loadMatchingGame() {
  const matchData = GameState.currentLesson.questions[0];
  if (!matchData) return;

  // Reset matching state
  GameState.matchingState = {
    matchedCount: 0,
    draggedElement: null,
    dragClone: null,
    offsetX: 0,
    offsetY: 0
  };

  // Update score display
  const matchingScore = document.getElementById('matching-score');
  if (matchingScore) {
    matchingScore.textContent = `Score: 0/${matchData.items.length}`;
  }

  // Shuffle items
  const shuffledItems = shuffleArray([...matchData.items]);
  const shuffledTargets = shuffleArray([...matchData.targets]);

  // Render left column (draggable items)
  const leftColumn = document.getElementById('matching-left');
  if (!leftColumn) return;

  leftColumn.innerHTML = '';
  shuffledItems.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'matching-item draggable bg-white rounded-2xl shadow-premium border-2 border-gray-200 p-5 text-base font-bold text-slate-700 cursor-grab hover:border-orange-400 hover:shadow-glow hover:-translate-y-0.5 transition-all';
    itemEl.dataset.matchId = item.target;
    itemEl.textContent = item.content;

    leftColumn.appendChild(itemEl);
  });

  // Render right column (drop targets)
  const rightColumn = document.getElementById('matching-right');
  if (!rightColumn) return;

  rightColumn.innerHTML = '';
  shuffledTargets.forEach((target, index) => {
    const targetEl = document.createElement('div');
    targetEl.className = 'matching-target drop-target bg-orange-50 rounded-2xl shadow-sm p-5 text-base font-bold text-slate-700 border-2 border-dashed border-orange-400 min-h-[70px] flex items-center justify-center';
    targetEl.dataset.matchId = target.id;
    targetEl.innerHTML = `<div class="target-content">${target.content}</div>`;

    rightColumn.appendChild(targetEl);
  });

  // Initialize drag and drop
  initDragAndDrop(document.getElementById('game-matching'));
}

/**
 * Initialize drag and drop for matching game
 * Supports both mouse and touch events
 * @param {HTMLElement} container - Game container
 */
function initDragAndDrop(container) {
  if (!container) return;

  const draggables = container.querySelectorAll('.draggable');
  const targets = container.querySelectorAll('.drop-target');

  draggables.forEach(el => {
    // Mouse events
    el.addEventListener('mousedown', startDrag);

    // Touch events (critical for tablets!)
    el.addEventListener('touchstart', startDrag, { passive: false });
  });

  function startDrag(e) {
    e.preventDefault();

    const el = e.currentTarget;
    if (el.classList.contains('matched')) return;

    el.classList.add('dragging');
    const rect = el.getBoundingClientRect();

    // Get client coordinates (touch or mouse)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    // Create clone for dragging
    const clone = el.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.zIndex = '1000';
    clone.style.pointerEvents = 'none';
    clone.style.opacity = '0.8';
    clone.classList.add('dragging-clone');
    document.body.appendChild(clone);

    // Position clone
    clone.style.left = (clientX - offsetX) + 'px';
    clone.style.top = (clientY - offsetY) + 'px';

    function onMove(e) {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;

      clone.style.left = (cx - offsetX) + 'px';
      clone.style.top = (cy - offsetY) + 'px';

      // Highlight target under cursor
      let foundTarget = false;
      targets.forEach(t => {
        if (t.classList.contains('matched')) return;

        const tr = t.getBoundingClientRect();
        if (cx >= tr.left && cx <= tr.right && cy >= tr.top && cy <= tr.bottom) {
          t.classList.add('over');
          foundTarget = true;
        } else {
          t.classList.remove('over');
        }
      });
    }

    function onEnd(e) {
      const cx = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const cy = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

      clone.remove();
      el.classList.remove('dragging');

      // Check if dropped on target
      let dropped = false;
      targets.forEach(t => {
        if (t.classList.contains('matched')) return;

        t.classList.remove('over');
        const tr = t.getBoundingClientRect();
        if (cx >= tr.left && cx <= tr.right && cy >= tr.top && cy <= tr.bottom) {
          dropped = true;
          handleDrop(el, t);
        }
      });

      // Cleanup listeners
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    }

    // Add listeners
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  }

  function handleDrop(item, target) {
    const itemMatch = item.dataset.matchId;
    const targetMatch = target.dataset.matchId;

    if (itemMatch === targetMatch) {
      // Correct match!
      item.classList.add('matched');
      target.classList.add('matched');

      // Visual feedback
      target.classList.add('correct-match');

      GameState.matchingState.matchedCount++;
      GameState.score++;

      // Update score display
      const matchingScore = document.getElementById('matching-score');
      if (matchingScore) {
        const total = GameState.currentLesson.questions[0].items.length;
        matchingScore.textContent = `Score: ${GameState.matchingState.matchedCount}/${total}`;
      }

      // Check if all matched
      const total = GameState.currentLesson.questions[0].items.length;
      if (GameState.matchingState.matchedCount >= total) {
        setTimeout(() => {
          endLesson(true);
        }, 1000);
      }
    } else {
      // Wrong match
      GameState.lives--;
      updateHeartsDisplay();

      // Visual feedback
      item.classList.add('shake', 'incorrect');
      target.classList.add('shake');

      setTimeout(() => {
        item.classList.remove('shake', 'incorrect');
        target.classList.remove('shake');
      }, 600);

      // Check if out of lives
      if (GameState.lives <= 0) {
        setTimeout(() => {
          endLesson(false);
        }, 1000);
      }
    }
  }
}

// ============================================================================
// FLASHCARD MODE
// ============================================================================

/**
 * Load flashcards in lesson mode
 */
function loadFlashcards() {
  const lesson = GameState.currentLesson;
  const cards = lesson.questions;

  if (!cards || cards.length === 0) return;

  // Reset flashcard state
  GameState.flashcardState = {
    currentIndex: 0,
    known: [],
    practice: [],
    isFlipped: false
  };

  loadFlashcard();
}

/**
 * Load current flashcard
 */
function loadFlashcard() {
  const lesson = GameState.currentLesson;
  const cards = lesson.questions;
  const currentCard = cards[GameState.flashcardState.currentIndex];

  if (!currentCard) return;

  // Reset flip state
  GameState.flashcardState.isFlipped = false;
  const flashcardInner = document.getElementById('flashcard-inner');
  if (flashcardInner) {
    flashcardInner.classList.remove('flipped');
  }

  // Update card content
  const frontContent = document.getElementById('flashcard-front-content');
  const backContent = document.getElementById('flashcard-back-content');

  if (frontContent) frontContent.textContent = currentCard.front;
  if (backContent) backContent.textContent = currentCard.back;

  // Update navigation
  updateFlashcardNavigation();

  // Update progress dots
  renderFlashcardDots();
}

/**
 * Flip flashcard
 */
function flipFlashcard() {
  GameState.flashcardState.isFlipped = !GameState.flashcardState.isFlipped;
  const flashcardInner = document.getElementById('flashcard-inner');
  if (flashcardInner) {
    if (GameState.flashcardState.isFlipped) {
      flashcardInner.classList.add('flipped');
    } else {
      flashcardInner.classList.remove('flipped');
    }
  }
}

/**
 * Update flashcard navigation buttons
 */
function updateFlashcardNavigation() {
  const prevBtn = document.getElementById('btn-flashcard-prev');
  const nextBtn = document.getElementById('btn-flashcard-next');

  const cards = GameState.currentLesson.questions;
  const currentIndex = GameState.flashcardState.currentIndex;

  if (prevBtn) {
    prevBtn.disabled = currentIndex === 0;
  }

  if (nextBtn) {
    nextBtn.disabled = currentIndex >= cards.length - 1;
  }
}

/**
 * Render flashcard progress dots
 */
function renderFlashcardDots() {
  const dotsContainer = document.getElementById('flashcard-dots');
  if (!dotsContainer) return;

  const cards = GameState.currentLesson.questions;
  dotsContainer.innerHTML = '';

  cards.forEach((card, index) => {
    const dot = document.createElement('span');
    dot.className = `progress-dot ${index === GameState.flashcardState.currentIndex ? 'active' : ''}`;
    dotsContainer.appendChild(dot);
  });
}

/**
 * Navigate to previous flashcard
 */
function prevFlashcard() {
  if (GameState.flashcardState.currentIndex > 0) {
    GameState.flashcardState.currentIndex--;
    loadFlashcard();
  }
}

/**
 * Navigate to next flashcard
 */
function nextFlashcard() {
  const cards = GameState.currentLesson.questions;
  if (GameState.flashcardState.currentIndex < cards.length - 1) {
    GameState.flashcardState.currentIndex++;
    loadFlashcard();
  }
}

/**
 * Mark flashcard as known
 */
function flashcardKnown() {
  const currentIndex = GameState.flashcardState.currentIndex;
  if (!GameState.flashcardState.known.includes(currentIndex)) {
    GameState.flashcardState.known.push(currentIndex);
  }

  const cards = GameState.currentLesson.questions;
  if (GameState.flashcardState.currentIndex < cards.length - 1) {
    nextFlashcard();
  } else {
    // End of flashcards
    completeFlashcards();
  }
}

/**
 * Mark flashcard for practice
 */
function flashcardPractice() {
  const currentIndex = GameState.flashcardState.currentIndex;
  if (!GameState.flashcardState.practice.includes(currentIndex)) {
    GameState.flashcardState.practice.push(currentIndex);
  }

  const cards = GameState.currentLesson.questions;
  if (GameState.flashcardState.currentIndex < cards.length - 1) {
    nextFlashcard();
  } else {
    // End of flashcards
    completeFlashcards();
  }
}

/**
 * Complete flashcard lesson
 */
function completeFlashcards() {
  const cards = GameState.currentLesson.questions;
  const knownCount = GameState.flashcardState.known.length;
  const totalCards = cards.length;

  // Score based on known cards
  GameState.score = knownCount;
  GameState.totalQuestions = totalCards;

  // Mark as reviewed
  if (!GameState.flashcardsReviewed.includes(GameState.currentLesson.id)) {
    GameState.flashcardsReviewed.push(GameState.currentLesson.id);
  }

  endLesson(true);
}

// ============================================================================
// SITUATION MODE
// ============================================================================

/**
 * Load a situation question
 */
function loadSituationQuestion() {
  const question = GameState.currentLesson.questions[GameState.currentQuestionIndex];
  if (!question) return;

  // Update UI
  updateProgressBar();
  updateQuestionCounter();

  // Set scenario text
  const scenarioTextEl = document.getElementById('situation-scenario-text');
  if (scenarioTextEl) {
    scenarioTextEl.textContent = question.scenario;
  }

  // Set visual illustration if available
  const visualEl = document.getElementById('situation-visual');
  if (visualEl && question.image) {
    visualEl.className = `situation-visual ${question.image}`;
  }

  // Create option buttons
  const optionsContainer = document.getElementById('situation-options');
  if (!optionsContainer) return;

  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn bg-white border-2 border-gray-200 rounded-2xl p-5 text-left text-lg font-semibold text-slate-700 hover:border-orange-400 hover:bg-orange-50/30 hover:shadow-premium hover:-translate-y-0.5 transition-all duration-200 w-full flex items-center gap-3';
    button.dataset.option = index;

    const labels = ['A', 'B', 'C', 'D'];
    button.innerHTML = `<span class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-slate-600">${labels[index]}</span><span class="flex-1">${option}</span>`;

    button.addEventListener('click', () => handleSituationAnswer(index));

    optionsContainer.appendChild(button);
  });
}

/**
 * Handle situation answer
 * @param {number} selectedIndex - Selected option index
 */
function handleSituationAnswer(selectedIndex) {
  const question = GameState.currentLesson.questions[GameState.currentQuestionIndex];
  const correct = selectedIndex === question.correct;

  // Disable all option buttons
  const optionButtons = document.querySelectorAll('#situation-options .option-btn');
  optionButtons.forEach(btn => {
    btn.disabled = true;
    const btnIndex = parseInt(btn.dataset.option);

    // Highlight correct answer
    if (btnIndex === question.correct) {
      btn.classList.add('correct');
    }

    // Highlight selected answer if wrong
    if (btnIndex === selectedIndex && !correct) {
      btn.classList.add('incorrect');
      btn.classList.add('shake');
    }
  });

  // Update state
  if (correct) {
    GameState.score++;
    GameState.totalCorrect++;
  } else {
    GameState.lives--;
    updateHeartsDisplay();
  }

  GameState.totalAnswered++;
  GameState.answers.push({
    correct,
    questionIndex: GameState.currentQuestionIndex,
    selectedIndex,
    correctIndex: question.correct
  });

  // Show feedback after short delay
  setTimeout(() => {
    showFeedback(correct, question.explanation);
  }, 600);
}

// ============================================================================
// STANDALONE FLASHCARD REVIEW
// ============================================================================

/**
 * Start standalone flashcard review
 * @param {string} lessonId - Flashcard lesson ID
 */
function startStandaloneFlashcards(lessonId) {
  const lesson = LESSONS[lessonId];
  if (!lesson || lesson.mode !== 'flashcards') return;

  GameState.currentLesson = lesson;
  GameState.flashcardState = {
    currentIndex: 0,
    known: [],
    practice: [],
    isFlipped: false
  };

  // Show flashcard container
  const categorySelector = document.querySelector('.category-selector');
  const reviewContainer = document.getElementById('review-flashcard-container');

  if (categorySelector) categorySelector.style.display = 'none';
  if (reviewContainer) reviewContainer.style.display = 'block';

  loadStandaloneFlashcard();
}

/**
 * Load standalone flashcard
 */
function loadStandaloneFlashcard() {
  const lesson = GameState.currentLesson;
  const cards = lesson.questions;
  const currentCard = cards[GameState.flashcardState.currentIndex];

  if (!currentCard) return;

  // Reset flip state
  GameState.flashcardState.isFlipped = false;
  const flashcardInner = document.getElementById('review-flashcard-inner');
  if (flashcardInner) {
    flashcardInner.classList.remove('flipped');
  }

  // Update card content
  const frontContent = document.getElementById('review-flashcard-front-content');
  const backContent = document.getElementById('review-flashcard-back-content');

  if (frontContent) frontContent.textContent = currentCard.front;
  if (backContent) backContent.textContent = currentCard.back;

  // Update progress
  const currentEl = document.getElementById('review-current');
  const totalEl = document.getElementById('review-total');
  if (currentEl) currentEl.textContent = GameState.flashcardState.currentIndex + 1;
  if (totalEl) totalEl.textContent = cards.length;

  // Update navigation
  const prevBtn = document.getElementById('btn-review-prev');
  const nextBtn = document.getElementById('btn-review-next');

  if (prevBtn) prevBtn.disabled = GameState.flashcardState.currentIndex === 0;
  if (nextBtn) nextBtn.disabled = GameState.flashcardState.currentIndex >= cards.length - 1;
}

/**
 * Flip standalone flashcard
 */
function flipStandaloneFlashcard() {
  GameState.flashcardState.isFlipped = !GameState.flashcardState.isFlipped;
  const flashcardInner = document.getElementById('review-flashcard-inner');
  if (flashcardInner) {
    if (GameState.flashcardState.isFlipped) {
      flashcardInner.classList.add('flipped');
    } else {
      flashcardInner.classList.remove('flipped');
    }
  }
}

/**
 * Navigate standalone flashcard
 * @param {number} direction - -1 for prev, 1 for next
 */
function navigateStandaloneFlashcard(direction) {
  const cards = GameState.currentLesson.questions;
  const newIndex = GameState.flashcardState.currentIndex + direction;

  if (newIndex >= 0 && newIndex < cards.length) {
    GameState.flashcardState.currentIndex = newIndex;
    loadStandaloneFlashcard();
  }
}

/**
 * Exit standalone flashcard review
 */
function exitStandaloneFlashcards() {
  // Mark as reviewed
  if (GameState.currentLesson && !GameState.flashcardsReviewed.includes(GameState.currentLesson.id)) {
    GameState.flashcardsReviewed.push(GameState.currentLesson.id);
    GameState.save();
  }

  // Show category selector
  const categorySelector = document.querySelector('.category-selector');
  const reviewContainer = document.getElementById('review-flashcard-container');

  if (categorySelector) categorySelector.style.display = 'block';
  if (reviewContainer) reviewContainer.style.display = 'none';

  // Re-render categories to update reviewed status
  renderFlashcardReview();
}

// ============================================================================
// FEEDBACK SYSTEM
// ============================================================================

/**
 * Show feedback overlay
 * @param {boolean} correct - Whether answer was correct
 * @param {string} explanation - Explanation text
 */
function showFeedback(correct, explanation) {
  const overlay = document.getElementById('feedback-overlay');
  const content = document.getElementById('feedback-content');
  const icon = document.getElementById('feedback-icon');
  const text = document.getElementById('feedback-text');
  const exp = document.getElementById('feedback-explanation');

  if (!overlay || !content) return;

  if (correct) {
    icon.textContent = '✅';
    text.textContent = getRandomEncouragement();
    content.classList.add('correct');
    content.classList.remove('incorrect');
  } else {
    icon.textContent = '❌';
    text.textContent = getRandomWrongMessage();
    content.classList.add('incorrect');
    content.classList.remove('correct');
  }

  if (exp) {
    exp.textContent = explanation || '';
    exp.style.display = explanation ? 'block' : 'none';
  }

  overlay.classList.add('active');

  // Continue button handler
  const continueBtn = document.getElementById('feedback-continue');
  if (continueBtn) {
    continueBtn.onclick = () => {
      overlay.classList.remove('active');

      if (GameState.lives <= 0) {
        endLesson(false); // Failed
        return;
      }

      GameState.currentQuestionIndex++;
      if (GameState.currentQuestionIndex >= GameState.totalQuestions) {
        endLesson(true); // Completed
      } else {
        loadQuestion();
      }
    };
  }
}

/**
 * Get random encouragement message
 * @returns {string}
 */
function getRandomEncouragement() {
  if (typeof ENCOURAGEMENTS === 'undefined' || ENCOURAGEMENTS.length === 0) {
    return 'Goed gedaan!';
  }
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}

/**
 * Get random wrong answer message
 * @returns {string}
 */
function getRandomWrongMessage() {
  if (typeof WRONG_ANSWER_MESSAGES === 'undefined' || WRONG_ANSWER_MESSAGES.length === 0) {
    return 'Helaas, dat was niet juist.';
  }
  return WRONG_ANSWER_MESSAGES[Math.floor(Math.random() * WRONG_ANSWER_MESSAGES.length)];
}

// ============================================================================
// LESSON COMPLETION
// ============================================================================

/**
 * End current lesson and show results
 * @param {boolean} completed - Whether lesson was completed successfully
 */
function endLesson(completed) {
  const lesson = GameState.currentLesson;
  if (!lesson) return;

  const percentage = GameState.score / GameState.totalQuestions;
  const timeTaken = (Date.now() - GameState.lessonStartTime) / 1000;

  // Calculate stars
  let stars = 0;
  if (completed && percentage >= 0.7) stars = 1;
  if (completed && percentage >= 0.85) stars = 2;
  if (completed && percentage >= 1.0) stars = 3;

  // Calculate XP
  let xpEarned = 0;
  if (completed && stars > 0) {
    xpEarned = lesson.xpReward * stars;

    // Bonus XP for speed (under 60 seconds)
    if (timeTaken < 60) {
      xpEarned += 10;
      GameState._speedDemonEarned = true;
    }

    // Bonus for perfect score
    if (percentage === 1.0) {
      xpEarned += 15;
    }
  }

  // Update state
  if (stars > 0) {
    if (!GameState.completedLessons.includes(lesson.id)) {
      GameState.completedLessons.push(lesson.id);
    }

    // Only update stars if better than previous
    const prevStars = GameState.lessonStars[lesson.id] || 0;
    if (stars > prevStars) {
      GameState.lessonStars[lesson.id] = stars;
    }

    // Track best score
    const prevBest = GameState.lessonBestScore[lesson.id] || 0;
    if (GameState.score > prevBest) {
      GameState.lessonBestScore[lesson.id] = GameState.score;
    }

    GameState.earnXP(xpEarned);
  }

  // Check for new badges
  const newBadges = GameState.checkBadges();

  GameState.save();

  // Show results screen
  showResults({
    completed,
    stars,
    score: GameState.score,
    total: GameState.totalQuestions,
    xpEarned,
    newBadges,
    timeTaken,
    lessonId: lesson.id
  });
}

/**
 * Show results screen
 * @param {Object} results - Results data
 */
function showResults(results) {
  showScreen('results');

  const { completed, stars, score, total, xpEarned, newBadges, timeTaken, lessonId } = results;

  // Star animation
  const starAnimation = document.getElementById('star-animation');
  if (starAnimation) {
    const starElements = starAnimation.querySelectorAll('.star');
    starElements.forEach((star, index) => {
      star.style.opacity = '0.2';
      star.classList.remove('animate');

      if (index < stars) {
        setTimeout(() => {
          star.style.opacity = '1';
          star.classList.add('animate');
        }, index * 300);
      }
    });
  }

  // Results title
  const resultsTitle = document.querySelector('.results-title');
  if (resultsTitle) {
    if (completed && stars > 0) {
      resultsTitle.textContent = 'Les Voltooid!';
    } else {
      resultsTitle.textContent = 'Probeer het nog eens!';
    }
  }

  // Score display
  const resultScore = document.getElementById('result-score');
  if (resultScore) {
    resultScore.textContent = `${score} van ${total} goed!`;
  }

  // XP display
  const resultXP = document.getElementById('result-xp');
  if (resultXP) {
    if (xpEarned > 0) {
      resultXP.textContent = `+${xpEarned} XP`;
      animateValue(resultXP, 0, xpEarned, 1000);
    } else {
      resultXP.textContent = '0 XP';
    }
  }

  // New badges
  const badgesEarned = document.getElementById('badges-earned');
  if (badgesEarned && newBadges.length > 0) {
    badgesEarned.innerHTML = '<h3 class="text-2xl font-bold text-gray-800 mb-4">Nieuwe Badges!</h3>';
    newBadges.forEach((badge, index) => {
      const badgeEl = document.createElement('div');
      badgeEl.className = 'badge-earned inline-flex flex-col items-center gap-3 bg-white rounded-3xl shadow-premium border border-gray-100 p-6 m-2';
      badgeEl.innerHTML = `
        <div class="badge-icon text-5xl drop-shadow-lg">${badge.icon}</div>
        <div class="badge-name text-base font-black text-slate-900">${badge.name}</div>
      `;

      setTimeout(() => {
        badgesEarned.appendChild(badgeEl);
        badgeEl.classList.add('animate');
      }, 1000 + index * 300);
    });
  } else if (badgesEarned) {
    badgesEarned.innerHTML = '';
  }

  // Confetti for good performance
  if (stars >= 2) {
    setTimeout(() => triggerConfetti(), 800);
  }

  // Button handlers
  const btnNextLesson = document.getElementById('btn-next-lesson');
  const btnRetry = document.getElementById('btn-retry-lesson');
  const btnBackToOverview = document.getElementById('btn-back-to-overview');

  if (btnNextLesson) {
    const nextLessonId = getNextLessonId(lessonId);
    if (nextLessonId && completed) {
      btnNextLesson.style.display = 'block';
      btnNextLesson.onclick = () => startLesson(nextLessonId);
    } else {
      btnNextLesson.style.display = 'none';
    }
  }

  if (btnRetry) {
    btnRetry.onclick = () => startLesson(lessonId);
  }

  if (btnBackToOverview) {
    btnBackToOverview.onclick = () => {
      if (GameState.currentLevel) {
        renderLevel(GameState.currentLevel.id);
        showScreen('level');
      } else {
        showScreen('map');
      }
    };
  }
}

// ============================================================================
// VISUAL EFFECTS
// ============================================================================

/**
 * Trigger confetti animation
 */
function triggerConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  container.innerHTML = '';
  const colors = ['#f97316', '#fb923c', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
  const shapes = ['circle', 'square', 'triangle'];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 1.5 + 's';
    piece.style.animationDuration = (Math.random() * 2 + 2.5) + 's';

    const size = Math.random() * 10 + 6;
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';

    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape === 'circle') {
      piece.style.borderRadius = '50%';
    } else if (shape === 'triangle') {
      piece.style.width = '0';
      piece.style.height = '0';
      piece.style.borderLeft = size/2 + 'px solid transparent';
      piece.style.borderRight = size/2 + 'px solid transparent';
      piece.style.borderBottom = size + 'px solid ' + piece.style.backgroundColor;
      piece.style.backgroundColor = 'transparent';
    }

    piece.style.opacity = Math.random() * 0.5 + 0.5;
    container.appendChild(piece);
  }

  container.classList.add('active');

  setTimeout(() => {
    container.classList.remove('active');
    container.innerHTML = '';
  }, 5000);
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, info)
 * @param {number} duration - Display duration in ms
 */
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('active'));

  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ============================================================================
// UI HELPERS
// ============================================================================

/**
 * Update progress bar
 */
function updateProgressBar() {
  const progressFill = document.getElementById('lesson-progress-fill');
  if (!progressFill) return;

  const progress = (GameState.currentQuestionIndex / GameState.totalQuestions) * 100;
  progressFill.style.width = `${progress}%`;
}

/**
 * Update hearts display
 */
function updateHeartsDisplay() {
  const hearts = document.querySelectorAll('.heart');
  hearts.forEach((heart, index) => {
    if (index < GameState.lives) {
      heart.classList.add('full');
      heart.classList.remove('lost');
      heart.style.opacity = '1';
    } else {
      heart.classList.add('lost');
      heart.classList.remove('full');
    }
  });
}

/**
 * Update question counter
 */
function updateQuestionCounter() {
  const counter = document.getElementById('question-counter');
  if (!counter) return;

  counter.textContent = `${GameState.currentQuestionIndex + 1}/${GameState.totalQuestions}`;
}

/**
 * Animate a numeric value
 * @param {HTMLElement} element - Element to update
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Animation duration in ms
 */
function animateValue(element, start, end, duration = 1000) {
  if (!element) return;

  const range = end - start;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.floor(start + range * eased);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Shuffle an array (Fisher-Yates algorithm)
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Get next lesson ID
 * @param {string} currentLessonId - Current lesson ID
 * @returns {string|null} Next lesson ID or null
 */
function getNextLessonId(currentLessonId) {
  if (typeof LESSONS === 'undefined' || typeof LEVELS === 'undefined') return null;

  const currentLesson = LESSONS[currentLessonId];
  if (!currentLesson) return null;

  const level = LEVELS.find(l => l.id === currentLesson.levelId);
  if (!level) return null;

  const lessonIndex = level.lessons.indexOf(currentLessonId);

  // Check if there's a next lesson in current level
  if (lessonIndex < level.lessons.length - 1) {
    return level.lessons[lessonIndex + 1];
  }

  // Check if there's a next level
  const nextLevel = LEVELS.find(l => l.id === level.id + 1);
  if (nextLevel && nextLevel.lessons.length > 0) {
    return nextLevel.lessons[0];
  }

  return null;
}

/**
 * Get display name for game mode
 * @param {string} mode - Game mode
 * @returns {string} Display name
 */
function getModeDisplayName(mode) {
  const modeNames = {
    quiz: 'Quiz',
    truefalse: 'Waar of Niet Waar',
    memory: 'Memory',
    matching: 'Matching',
    flashcards: 'Flashcards',
    situation: 'Situatie'
  };
  return modeNames[mode] || 'Quiz';
}

/**
 * Format time in seconds to readable string
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time
 */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

/**
 * Reset all progress (with confirmation)
 */
function resetProgress() {
  if (confirm('Weet je zeker dat je al je voortgang wilt wissen?')) {
    GameState.reset();
    showScreen('home');
    showToast('Voortgang gewist', 'info');
  }
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
  // Bottom navigation
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.dataset.screen;
      if (screen) showScreen(screen);
    });
  });

  // Home screen - Start Learning button
  const btnStartLearning = document.getElementById('btn-start-learning');
  if (btnStartLearning) {
    btnStartLearning.addEventListener('click', () => showScreen('map'));
  }

  // Level screen - Back button
  const btnBackToMap = document.getElementById('btn-back-to-map');
  if (btnBackToMap) {
    btnBackToMap.addEventListener('click', () => showScreen('map'));
  }

  // Lesson screen - Close button
  const btnCloseLesson = document.getElementById('btn-close-lesson');
  if (btnCloseLesson) {
    btnCloseLesson.addEventListener('click', () => {
      if (confirm('Wil je de les echt stoppen? Je voortgang gaat verloren.')) {
        if (GameState.currentLevel) {
          renderLevel(GameState.currentLevel.id);
          showScreen('level');
        } else {
          showScreen('map');
        }
      }
    });
  }

  // Flashcard controls (lesson mode)
  const btnFlip = document.getElementById('btn-flip');
  if (btnFlip) {
    btnFlip.addEventListener('click', flipFlashcard);
  }

  // Click-to-flip on the card itself
  const flashcardEl = document.getElementById('flashcard');
  if (flashcardEl) {
    flashcardEl.addEventListener('click', flipFlashcard);
  }

  const btnFlashcardPrev = document.getElementById('btn-flashcard-prev');
  if (btnFlashcardPrev) {
    btnFlashcardPrev.addEventListener('click', prevFlashcard);
  }

  const btnFlashcardNext = document.getElementById('btn-flashcard-next');
  if (btnFlashcardNext) {
    btnFlashcardNext.addEventListener('click', nextFlashcard);
  }

  const btnFlashcardKnow = document.getElementById('btn-flashcard-know');
  if (btnFlashcardKnow) {
    btnFlashcardKnow.addEventListener('click', flashcardKnown);
  }

  const btnFlashcardPractice = document.getElementById('btn-flashcard-practice');
  if (btnFlashcardPractice) {
    btnFlashcardPractice.addEventListener('click', flashcardPractice);
  }

  // Standalone flashcard review controls
  const btnReviewFlip = document.getElementById('btn-review-flip');
  if (btnReviewFlip) {
    btnReviewFlip.addEventListener('click', flipStandaloneFlashcard);
  }

  // Click-to-flip on the review card itself
  const reviewFlashcardEl = document.getElementById('review-flashcard');
  if (reviewFlashcardEl) {
    reviewFlashcardEl.addEventListener('click', flipStandaloneFlashcard);
  }

  const btnReviewPrev = document.getElementById('btn-review-prev');
  if (btnReviewPrev) {
    btnReviewPrev.addEventListener('click', () => navigateStandaloneFlashcard(-1));
  }

  const btnReviewNext = document.getElementById('btn-review-next');
  if (btnReviewNext) {
    btnReviewNext.addEventListener('click', () => navigateStandaloneFlashcard(1));
  }

  const btnBackToCategories = document.getElementById('btn-back-to-categories');
  if (btnBackToCategories) {
    btnBackToCategories.addEventListener('click', exitStandaloneFlashcards);
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('FietsQuiz starting...');

  // Check for required data
  if (typeof LEVELS === 'undefined' || typeof LESSONS === 'undefined') {
    console.error('Game data not loaded! Make sure data.js is loaded before app.js');
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; padding: 2rem; text-align: center;">
        <h1>⚠️ Laadprobleem</h1>
        <p>Game data kon niet worden geladen. Controleer of data.js correct is geladen.</p>
      </div>
    `;
    return;
  }

  // Load saved progress
  GameState.load();

  // Update daily streak
  GameState.updateStreak();

  // Initialize event listeners
  initEventListeners();

  // Show splash screen
  showScreen('splash');

  // Auto-transition to home after 2 seconds
  setTimeout(() => {
    showScreen('home');
  }, 2000);

  console.log('FietsQuiz initialized successfully!');
});

// ============================================================================
// GLOBAL ERROR HANDLING
// ============================================================================

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  showToast('Er is iets misgegaan. Probeer het opnieuw.', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  showToast('Er is iets misgegaan. Probeer het opnieuw.', 'error');
});

// ============================================================================
// EXPORT FOR DEBUGGING (development only)
// ============================================================================

if (typeof window !== 'undefined') {
  window.FietsQuiz = {
    GameState,
    showScreen,
    startLesson,
    resetProgress,
    // Add other functions for debugging
  };
}
