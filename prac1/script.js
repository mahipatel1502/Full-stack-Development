// Initialize votes
const votes = {
  "JavaScript": 0,
  "Python": 0,
  "Java": 0,
  "C++": 0
};

// Vote function
function vote(language) {
  if (votes[language] !== undefined) {
    votes[language]++;
    updateVotes();
  }
}

// Update displayed vote counts
function updateVotes() {
  for (let lang in votes) {
    document.getElementById(lang).textContent = votes[lang];
  }
}

// Simulate real-time votes from other users
setInterval(() => {
  const languages = Object.keys(votes);
  const randomLang = languages[Math.floor(Math.random() * languages.length)];
  votes[randomLang]++;
  updateVotes();
}, 2000);
