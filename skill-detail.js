// sample skills with extra detail
const sampleSkills = [
  { title: 'Guitar Basics for Beginners', category: 'Music', teacher: 'Ankit R.', rating: 4,
    about: 'Learn to hold the guitar, tune it and play your first songs using simple chords.',
    learn: ['Basic open chords', 'Strumming patterns', 'Reading simple tabs'] },
  { title: 'UI/UX Design in Figma', category: 'Tech', teacher: 'Priya S.', rating: 5,
    about: 'A hands-on start to designing app screens, from wireframes to clickable prototypes.',
    learn: ['Frames and auto layout', 'Colors and typography', 'Making a prototype'] },
  { title: 'Conversational Spanish', category: 'Language', teacher: 'Meera K.', rating: 4,
    about: 'Practice everyday Spanish through short conversations so you can speak with confidence.',
    learn: ['Greetings and small talk', 'Common phrases', 'Basic pronunciation'] },
  { title: 'Python for Beginners', category: 'Tech', teacher: 'Rohan D.', rating: 5,
    about: 'Start programming with Python, step by step, using small practice problems.',
    learn: ['Variables and loops', 'Functions', 'Simple mini programs'] },
  { title: 'Watercolor Painting', category: 'Art', teacher: 'Simran A.', rating: 4,
    about: 'Explore colors and brush control while painting simple landscapes and flowers.',
    learn: ['Mixing colors', 'Brush techniques', 'Painting a landscape'] },
  { title: 'Beginner Strength Training', category: 'Fitness', teacher: 'Varun T.', rating: 4,
    about: 'Build a safe gym routine with correct form for the main beginner exercises.',
    learn: ['Warm up basics', 'Correct exercise form', 'A weekly workout plan'] },
  { title: 'Piano for Beginners', category: 'Music', teacher: 'Neha P.', rating: 5,
    about: 'Get comfortable with the keys and play simple melodies with both hands.',
    learn: ['Finding notes', 'Easy melodies', 'Basic rhythm'] },
  { title: 'French Speaking Practice', category: 'Language', teacher: 'Karan M.', rating: 4,
    about: 'Improve your French speaking through guided practice and simple dialogues.',
    learn: ['Useful daily phrases', 'Pronunciation tips', 'Short dialogues'] }
];

const sampleReviews = [
  { name: 'Aarav M.', stars: 5, text: 'Very patient and explained everything clearly.' },
  { name: 'Diya K.', stars: 4, text: 'Good session, I learned a lot in one hour.' }
];

const area = document.getElementById('detailArea');

// read skill name from url
const params = new URLSearchParams(window.location.search);
const skillName = params.get('skill') || '';

const skill = findSkill(skillName);

if (!skill) {
  area.innerHTML =
    '<div class="detail-missing"><h1>Skill not found</h1>' +
    '<p>We could not find that skill.</p>' +
    '<a href="browse.html" class="btn btn-primary">Back to Browse</a></div>';
} else {
  showSkill(skill);
}

function findSkill(name) {
  // check sample skills first
  const sample = sampleSkills.find(s => s.title.toLowerCase() === name.toLowerCase());
  if (sample) {
    return { ...sample, reviews: sampleReviews, isSample: true };
  }

  // then skills added by signed up users
  const users = JSON.parse(localStorage.getItem('skillswapUsers') || '[]');
  for (const user of users) {
    const found = (user.teachSkills || []).find(s => s.toLowerCase() === name.toLowerCase());
    if (found) {
      return {
        title: found,
        category: 'Skill',
        teacher: user.fullName,
        email: user.email,
        rating: 0,
        about: user.fullName + ' is offering to teach ' + found + ' in exchange for another skill.',
        learn: ['Basics of ' + found, 'Practice with feedback'],
        reviews: []
      };
    }
  }
  return null;
}

function thumbClass(category) {
  const classes = {
    Tech: 'thumb-code',
    Music: 'thumb-sound',
    Art: 'thumb-art',
    Language: 'thumb-lang',
    Fitness: 'thumb-fit'
  };
  return classes[category] || 'thumb-design';
}

function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

// stop user text from breaking html
function safe(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getInitials(name) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
}

function showSkill(s) {
  document.title = s.title + ' — SkillSwap';

  const learnItems = s.learn.map(item => '<li>' + safe(item) + '</li>').join('');

  let reviewHtml = '<p class="empty-note">No reviews yet.</p>';
  if (s.reviews.length > 0) {
    reviewHtml = s.reviews.map(r =>
      '<div class="review-row">' +
        '<div class="review-top"><strong>' + safe(r.name) + '</strong>' +
        '<span class="rating">' + stars(r.stars) + '</span></div>' +
        '<p>' + safe(r.text) + '</p>' +
      '</div>'
    ).join('');
  }

  const ratingText = s.rating > 0 ? stars(s.rating) : 'New teacher';

  // link to swap request page
  let requestLink = 'swap-request.html?skill=' + encodeURIComponent(s.title) +
    '&teacher=' + encodeURIComponent(s.teacher);
  if (s.email) {
    requestLink += '&email=' + encodeURIComponent(s.email);
  }

  area.innerHTML =
    '<div class="detail-main">' +
      '<a href="browse.html" class="back-link">← Back to Browse</a>' +
      '<div class="detail-hero ' + thumbClass(s.category) + '">' +
        '<span class="detail-letter">' + safe(s.title.charAt(0).toUpperCase()) + '</span>' +
      '</div>' +
      '<span class="tag">' + safe(s.category) + '</span>' +
      '<h1>' + safe(s.title) + '</h1>' +
      '<p class="detail-about">' + safe(s.about) + '</p>' +
      '<h2>What you will learn</h2>' +
      '<ul class="detail-list">' + learnItems + '</ul>' +
      '<h2>Teacher Reviews</h2>' +
      reviewHtml +
    '</div>' +
    '<aside class="teacher-box">' +
      '<div class="profile-avatar">' + safe(getInitials(s.teacher)) + '</div>' +
      '<h3>' + safe(s.teacher) + '</h3>' +
      '<div class="rating">' + ratingText + '</div>' +
      '<p class="teacher-note">Teaches ' + safe(s.title) + '</p>' +
      '<a href="' + requestLink + '" class="btn btn-primary btn-block">Request Swap</a>' +
    '</aside>';
}
