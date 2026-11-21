// get logged in user
const me = JSON.parse(localStorage.getItem('skillswapCurrentUser') || 'null');

if (!me) {
  window.location.href = 'login.html';
}

// sample people so page is not empty
const sampleUsers = [
  { fullName: 'Meera K.', email: 'meera@mail.com', teachSkills: ['Spanish', 'Hindi'], learnSkills: ['Guitar', 'Python'] },
  { fullName: 'Priya S.', email: 'priya@mail.com', teachSkills: ['UI/UX Design', 'Figma'], learnSkills: ['Python', 'Guitar'] },
  { fullName: 'Ankit R.', email: 'ankit@mail.com', teachSkills: ['Guitar', 'Piano'], learnSkills: ['Figma', 'Spanish'] },
  { fullName: 'Rohan D.', email: 'rohan@mail.com', teachSkills: ['Python', 'Java'], learnSkills: ['Watercolor Painting', 'Yoga'] },
  { fullName: 'Simran A.', email: 'simran@mail.com', teachSkills: ['Watercolor Painting', 'Sketching'], learnSkills: ['Excel', 'Spanish'] },
  { fullName: 'Varun T.', email: 'varun@mail.com', teachSkills: ['Yoga', 'Strength Training'], learnSkills: ['Python', 'Piano'] }
];

const list = document.getElementById('matchList');
const avatarClasses = ['avatar-a', 'avatar-b', 'avatar-c'];

// two skills match if one contains the other
function sameSkill(a, b) {
  const x = a.toLowerCase().trim();
  const y = b.toLowerCase().trim();
  return x.includes(y) || y.includes(x);
}

// join sample users with signed up users
function getPeople() {
  const stored = JSON.parse(localStorage.getItem('skillswapUsers') || '[]');
  const all = sampleUsers.concat(stored);

  // remove myself and duplicate emails
  const seen = {};
  return all.filter(p => {
    if (p.email === me.email || seen[p.email]) return false;
    seen[p.email] = true;
    return true;
  });
}

function findMatches() {
  const matches = [];

  getPeople().forEach(person => {
    // skills they teach that I want to learn
    const theyTeach = (person.teachSkills || []).filter(t =>
      me.learnSkills.some(l => sameSkill(t, l))
    );
    if (theyTeach.length === 0) return;

    // skills I teach that they want to learn
    const iTeach = me.teachSkills.filter(t =>
      (person.learnSkills || []).some(l => sameSkill(t, l))
    );

    matches.push({
      person: person,
      theyTeach: theyTeach,
      iTeach: iTeach,
      mutual: iTeach.length > 0
    });
  });

  // mutual matches first
  matches.sort((a, b) => Number(b.mutual) - Number(a.mutual));
  return matches;
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

function showMatches() {
  const matches = findMatches();
  list.innerHTML = '';

  if (matches.length === 0) {
    list.innerHTML =
      '<p class="empty-note">No matches yet. Add more skills you want to learn on your ' +
      '<a href="profile.html" class="inline-link">profile</a>.</p>';
    return;
  }

  matches.forEach((m, i) => {
    const p = m.person;
    const learnSkill = m.theyTeach[0];

    // link to swap request page
    let link = 'swap-request.html?skill=' + encodeURIComponent(learnSkill) +
      '&teacher=' + encodeURIComponent(p.fullName) +
      '&email=' + encodeURIComponent(p.email);
    if (m.iTeach.length > 0) {
      link += '&offer=' + encodeURIComponent(m.iTeach[0]);
    }

    const badge = m.mutual
      ? '<span class="match-badge perfect">Perfect match</span>'
      : '<span class="match-badge">Can teach you</span>';

    let detail = 'Teaches <strong>' + safe(m.theyTeach.join(', ')) + '</strong>';
    if (m.mutual) {
      detail += ' and wants to learn <strong>' + safe(m.iTeach.join(', ')) + '</strong> from you';
    }

    const row = document.createElement('div');
    row.className = 'match-row';
    row.innerHTML =
      '<div class="match-person">' +
        '<div class="match-avatar ' + avatarClasses[i % 3] + '">' + safe(getInitials(p.fullName)) + '</div>' +
        '<div>' +
          '<div class="match-name">' + safe(p.fullName) + ' ' + badge + '</div>' +
          '<p class="match-detail">' + detail + '</p>' +
        '</div>' +
      '</div>' +
      '<a href="' + link + '" class="btn btn-ghost btn-small">Connect</a>';
    list.appendChild(row);
  });
}

showMatches();
