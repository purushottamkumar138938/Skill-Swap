// handles login form submit
const form = document.getElementById('loginForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMsg('Please enter both email and password.', false);
    return;
  }

  // check email + password against stored users
  const users = JSON.parse(localStorage.getItem('skillswapUsers') || '[]');
  const match = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!match) {
    showMsg('Incorrect email or password.', false);
    return;
  }

  // save logged-in user for other pages to read
  localStorage.setItem('skillswapCurrentUser', JSON.stringify(match));

  showMsg('Login successful! Redirecting…', true);
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
});

function showMsg(text, success) {
  msg.textContent = text;
  msg.className = 'form-msg ' + (success ? 'msg-success' : 'msg-error');
}
