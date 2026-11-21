// get logged in user
const user = JSON.parse(localStorage.getItem('skillswapCurrentUser') || 'null');

if (!user) {
  window.location.href = 'login.html';
}

const requestList = document.getElementById('requestList');
const demoBtn = document.getElementById('demoBtn');

document.getElementById('welcomeText').textContent =
  'Welcome back, ' + user.fullName.split(' ')[0];

// logout clears current user
document.getElementById('logoutBtn').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('skillswapCurrentUser');
  window.location.href = 'login.html';
});

// load demo data for testing
demoBtn.addEventListener('click', () => {
  const demo = [
    { id: 1, from: user.email, to: 'priya@mail.com', toName: 'Priya S.',
      skillWanted: 'UI/UX Design', skillOffered: user.teachSkills[0], status: 'Pending' },
    { id: 2, from: 'ankit@mail.com', fromName: 'Ankit R.', to: user.email,
      skillWanted: user.teachSkills[0], skillOffered: 'Guitar', status: 'Accepted' },
    { id: 3, from: user.email, to: 'meera@mail.com', toName: 'Meera K.',
      skillWanted: 'Spanish', skillOffered: user.teachSkills[0], status: 'Rejected' }
  ];
  const all = JSON.parse(localStorage.getItem('skillswapRequests') || '[]');
  localStorage.setItem('skillswapRequests', JSON.stringify(all.concat(demo)));
  loadDashboard();
});

function loadDashboard() {
  const all = JSON.parse(localStorage.getItem('skillswapRequests') || '[]');

  // keep only requests of this user
  const mine = all.filter(r => r.from === user.email || r.to === user.email);
  const sent = mine.filter(r => r.from === user.email);
  const received = mine.filter(r => r.to === user.email);
  const accepted = mine.filter(r => r.status === 'Accepted');

  document.getElementById('statSent').textContent = sent.length;
  document.getElementById('statReceived').textContent = received.length;
  document.getElementById('statAccepted').textContent = accepted.length;

  showRequests(mine);
}

function showRequests(list) {
  requestList.innerHTML = '';

  if (list.length === 0) {
    requestList.innerHTML = '<p class="empty-note">No swap requests yet.</p>';
    demoBtn.style.display = 'inline-block';
    return;
  }
  demoBtn.style.display = 'none';

  list.forEach(r => {
    const iSent = r.from === user.email;
    const person = iSent ? (r.toName || r.to) : (r.fromName || r.from);
    const text = iSent
      ? 'You asked ' + person + ' to teach ' + r.skillWanted
      : person + ' wants to learn ' + r.skillWanted;

    const row = document.createElement('div');
    row.className = 'request-row';
    row.innerHTML =
      '<div><strong>' + text + '</strong>' +
      '<span class="request-sub">In return for ' + r.skillOffered + '</span></div>' +
      '<span class="status-chip ' + r.status.toLowerCase() + '">' + r.status + '</span>';
    requestList.appendChild(row);
  });
}

loadDashboard();
