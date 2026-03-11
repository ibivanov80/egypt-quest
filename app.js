// Quest state
let correctAnswers = 0;
let totalTasks = 7;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) {
    screen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function startQuest() {
  correctAnswers = 0;
  showScreen('screen-task-1');
}

function checkAnswer(btn, isCorrect) {
  const questionDiv = btn.closest('.task-question');
  const buttons = questionDiv.querySelectorAll('.btn--answer');
  const feedbackDiv = questionDiv.querySelector('.answer-feedback') ||
    btn.closest('.screen').querySelector('.answer-feedback');
  
  // Disable all buttons
  buttons.forEach(b => {
    b.classList.add('disabled');
    if (b === btn) {
      b.classList.add(isCorrect ? 'correct' : 'wrong');
    }
  });
  
  // Find the correct answer and highlight it if wrong
  if (!isCorrect) {
    buttons.forEach(b => {
      if (b.getAttribute('onclick') && b.getAttribute('onclick').includes('true')) {
        b.classList.remove('disabled');
        b.classList.add('correct');
      }
    });
  }
  
  // Show feedback
  if (feedbackDiv) {
    if (isCorrect) {
      correctAnswers++;
      feedbackDiv.textContent = 'Правильно! Молодец! ⭐';
      feedbackDiv.className = 'answer-feedback success';
    } else {
      feedbackDiv.textContent = 'Не совсем! Посмотри на правильный ответ ☝️';
      feedbackDiv.className = 'answer-feedback error';
    }
  }
  
  // Show next button
  const screen = btn.closest('.screen');
  const nextBtn = screen.querySelector('.btn--next');
  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    // Scroll to next button
    setTimeout(() => {
      nextBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}

function goToTask(taskNum) {
  showScreen('screen-task-' + taskNum);
}

function goToFinish() {
  showScreen('screen-finish');
  
  // Show stars based on correct answers
  const starsDiv = document.getElementById('finish-stars');
  let stars = '';
  for (let i = 0; i < correctAnswers; i++) {
    stars += '⭐';
  }
  if (correctAnswers === 0) stars = '🌟';
  starsDiv.textContent = stars;
  
  // Show score
  const scoreDiv = document.getElementById('finish-score');
  scoreDiv.textContent = 'Правильных ответов: ' + correctAnswers + ' из ' + totalTasks;
  
  // Set date
  const dateDiv = document.getElementById('cert-date');
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const now = new Date();
  dateDiv.textContent = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear() + ' года';
}

function restartQuest() {
  correctAnswers = 0;
  
  // Reset all buttons and feedback
  document.querySelectorAll('.btn--answer').forEach(btn => {
    btn.classList.remove('correct', 'wrong', 'disabled');
  });
  document.querySelectorAll('.answer-feedback').forEach(fb => {
    fb.textContent = '';
    fb.className = 'answer-feedback';
  });
  document.querySelectorAll('.btn--next').forEach(btn => {
    btn.classList.add('hidden');
  });
  
  showScreen('screen-start');
}
