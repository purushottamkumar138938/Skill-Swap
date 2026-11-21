// sample skills so page is never empty
const sampleSkills = [
  { title: 'Guitar Basics for Beginners', category: 'Music', teacher: 'Ankit R.', rating: 4 },
  { title: 'UI/UX Design in Figma', category: 'Tech', teacher: 'Priya S.', rating: 5 },
  { title: 'Conversational Spanish', category: 'Language', teacher: 'Meera K.', rating: 4 },
  { title: 'Python for Beginners', category: 'Tech', teacher: 'Rohan D.', rating: 5 },
  { title: 'Watercolor Painting', category: 'Art', teacher: 'Simran A.', rating: 4 },
  { title: 'Beginner Strength Training', category: 'Fitness', teacher: 'Varun T.', rating: 4 },
  { title: 'Piano for Beginners', category: 'Music', teacher: 'Neha P.', rating: 5 },
  { title: 'French Speaking Practice', category: 'Language', teacher: 'Karan M.', rating: 4 }
];

// keywords to guess category of user skills
const keywordMap = {
  Tech: ['python', 'java', 'html', 'css', 'code', 'coding', 'web', 'excel', 'figma', 'design', 'react'],
  Music: ['guitar', 'piano', 'sing', 'drum', 'violin', 'music'],
  Art: ['paint', 'draw', 'sketch', 'art', 'photo'],
  Language: ['english', 'hindi', 'spanish', 'french', 'german', 'language'],
  Fitness: ['gym', 'yoga', 'fitness', 'workout', 'run', 'strength']
};

const grid = document.getElementById('skillGrid');
const countText = document.getElementById('resultCount');
const searchInput = document.getElementById('searchInput');
const pills = document.querySelectorAll('.filter-pill');

let activeCategory = 'All';
let searchText = '';

// join sample skills with signed up users skills
function getAllSkills() {
  const all = sampleSkills.slice();
  const users = JSON.parse(localStorage.getItem('skillswapUsers') || '[]');

  users.forEach(user => {
    (user.teachSkills || []).forEach(skill => {
      all.push({
        title: skill,
        category: guessCategory(skill),
        teacher: user.fullName,
        rating: 0
      });
    });
  });
  return all;
}

function guessCategory(skill) {
  const lower = skill.toLowerCase();
  for (const cat in keywordMap) {
    if (keywordMap[cat].some(word => lower.includes(word))) {
      return cat;
    }
  }
  return 'Other';
}

// pick gradient class by category
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

function stars(rating) {
  if (rating === 0) return 'New';
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function showSkills() {
  const all = getAllSkills();

  // apply category + search filter
  const filtered = all.filter(skill => {
    const matchCat = activeCategory === 'All' || skill.category === activeCategory;
    const text = (skill.title + ' ' + skill.teacher + ' ' + skill.category).toLowerCase();
    const matchSearch = text.includes(searchText);
    return matchCat && matchSearch;
  });

  grid.innerHTML = '';
  countText.textContent = filtered.length + ' skill(s) found';

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="empty-note">No skills match your search.</p>';
    return;
  }

  filtered.forEach(skill => {
    const card = document.createElement('article');
    card.className = 'skill-card';
    card.innerHTML =
      '<div class="thumb ' + thumbClass(skill.category) + '">' +
        '<span class="thumb-letter">' + skill.title.charAt(0).toUpperCase() + '</span>' +
      '</div>' +
      '<div class="skill-body">' +
        '<span class="tag">' + skill.category + '</span>' +
        '<h3>' + skill.title + '</h3>' +
        '<p class="teacher">Taught by ' + skill.teacher + '</p>' +
        '<div class="rating">' + stars(skill.rating) + '</div>' +
        '<a class="card-link" href="skill-detail.html?skill=' + encodeURIComponent(skill.title) + '">View details</a>' +
      '</div>';
    grid.appendChild(card);
  });
}

// category pill click
pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeCategory = pill.dataset.cat;
    showSkills();
  });
});

// live search while typing
searchInput.addEventListener('input', () => {
  searchText = searchInput.value.trim().toLowerCase();
  showSkills();
});

// stop form reload on enter
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
});

showSkills();
