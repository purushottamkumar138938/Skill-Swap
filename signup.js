// handles sign up form submit
const form = document.getElementById('signupForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const teachSkills = document.getElementById('teachSkills').value.trim();
  const learnSkills = document.getElementById('learnSkills').value.trim();

  // basic validation
  if (!fullName || !email || !password || !teachSkills || !learnSkills) {
    showMsg('Please fill in every field.', false);
    return;
  }
  if (password.length < 6) {
    showMsg('Password must be at least 6 characters.', false);
    return;
  }

  // load existing users, block duplicate email
  const users = JSON.parse(localStorage.getItem('skillswapUsers') || '[]');
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    showMsg('An account with this email already exists.', false);
    return;
  }

  // store new user as our "database"
  users.push({
    fullName,
    email,
    password,
    teachSkills: teachSkills.split(',').map(s => s.trim()),
    learnSkills: learnSkills.split(',').map(s => s.trim()),
    joined: new Date().toISOString()
  });
  localStorage.setItem('skillswapUsers', JSON.stringify(users));

  showMsg('Account created! Redirecting to login…', true);
  setTimeout(() => { window.location.href = 'login.html'; }, 1200);
});

function showMsg(text, success) {
  msg.textContent = text;
  msg.className = 'form-msg ' + (success ? 'msg-success' : 'msg-error');
}
