// logged in user (can be empty)
const me = JSON.parse(localStorage.getItem('skillswapCurrentUser') || 'null');

// sample reviews so page is not empty
const sampleReviews = [
  { name: 'Aarav M.', teacher: 'Priya S.', skill: 'UI/UX Design in Figma', stars: 5, text: 'Very patient and explained everything clearly.' },
  { name: 'Diya K.', teacher: 'Ankit R.', skill: 'Guitar Basics', stars: 4, text: 'Good session, I learned my first three chords in one hour.' },
  { name: 'Kabir S.', teacher: 'Rohan D.', skill: 'Python for Beginners', stars: 5, text: 'Great teacher. The practice problems were really helpful.' },
  { name: 'Ishita P.', teacher: 'Meera K.', skill: 'Conversational Spanish', stars: 4, text: 'Fun and relaxed way to practice speaking.' }
];

const reviewList = document.getElementById('reviewList');
const form = document.getElementById('reviewForm');
const msg = document.getElementById('formMsg');
const starButtons = document.querySelectorAll('#starPicker button');

let rating = 0;

// stop user text from breaking html
function safe(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

// stored reviews first, then samples
function getReviews() {
  const stored = JSON.parse(localStorage.getItem('skillswapReviews') || '[]');
  return stored.slice().reverse().concat(sampleReviews);
}

function showReviews() {
  const all = getReviews();

  // work out average rating
  const total = all.reduce((sum, r) => sum + r.stars, 0);
  const average = all.length ? total / all.length : 0;

  document.getElementById('avgRating').textContent = average.toFixed(1);
  document.getElementById('avgStars').textContent = stars(Math.round(average));
  document.getElementById('reviewCount').textContent = all.length + ' review(s)';

  reviewList.innerHTML = '';

  all.forEach(r => {
    const card = document.createElement('div');
    card.className = 'review-row';
    card.innerHTML =
      '<div class="review-top"><strong>' + safe(r.name) + '</strong>' +
      '<span class="rating">' + stars(r.stars) + '</span></div>' +
      '<span class="review-meta">Learned ' + safe(r.skill) + ' from ' + safe(r.teacher) + '</span>' +
      '<p>' + safe(r.text) + '</p>';
    reviewList.appendChild(card);
  });
}

// star picker click
starButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    rating = Number(btn.dataset.value);
    starButtons.forEach(b => {
      b.classList.toggle('on', Number(b.dataset.value) <= rating);
    });
  });
});

// only logged in users can write
if (!me) {
  document.getElementById('formFields').innerHTML =
    '<p class="empty-note">Please <a href="login.html" class="inline-link">log in</a> to write a review.</p>';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!me) return;

  const teacher = document.getElementById('teacherName').value.trim();
  const skill = document.getElementById('skillName').value.trim();
  const text = document.getElementById('reviewText').value.trim();

  // basic validation
  if (!teacher || !skill || !text) {
    showMsg('Please fill in every field.', false);
    return;
  }
  if (rating === 0) {
    showMsg('Please choose a star rating.', false);
    return;
  }
  if (teacher.toLowerCase() === me.fullName.toLowerCase()) {
    showMsg('You cannot review yourself.', false);
    return;
  }

  // save review as our "database"
  const stored = JSON.parse(localStorage.getItem('skillswapReviews') || '[]');
  stored.push({
    id: Date.now(),
    name: me.fullName,
    teacher: teacher,
    skill: skill,
    stars: rating,
    text: text,
    date: new Date().toISOString()
  });
  localStorage.setItem('skillswapReviews', JSON.stringify(stored));

  // reset form and refresh list
  form.reset();
  rating = 0;
  starButtons.forEach(b => b.classList.remove('on'));
  showMsg('Thanks! Your review was added.', true);
  showReviews();
});

function showMsg(text, success) {
  msg.textContent = text;
  msg.className = 'form-msg ' + (success ? 'msg-success' : 'msg-error');
}

showReviews();
