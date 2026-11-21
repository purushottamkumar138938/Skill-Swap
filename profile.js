// read logged-in user from storage
const user = JSON.parse(localStorage.getItem('skillswapCurrentUser') || 'null');

if (!user) {
  // no one logged in, send to login
  window.location.href = 'login.html';
} else {
  renderProfile(user);
}

function renderProfile(user) {
  document.getElementById('profileName').textContent = user.fullName;
  document.getElementById('profileEmail').textContent = user.email;
  document.getElementById('profileAvatar').textContent = getInitials(user.fullName);

  renderSkillList('teachList', user.teachSkills, 'Active', false);
  renderSkillList('learnList', user.learnSkills, 'Searching', true);
}

function renderSkillList(containerId, skills, status, isSearching) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (!skills || skills.length === 0) {
    container.innerHTML = '<p class="empty-note">Nothing added yet.</p>';
    return;
  }

  const chipClass = isSearching ? 'status-chip searching' : 'status-chip';

  skills.forEach(skill => {
    const row = document.createElement('div');
    row.className = 'skill-row';
    row.innerHTML = `<span>${skill}</span><span class="${chipClass}">${status}</span>`;
    container.appendChild(row);
  });
}

function getInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
