// get logged in user
const me = JSON.parse(localStorage.getItem('skillswapCurrentUser') || 'null');

if (!me) {
  window.location.href = 'login.html';
}

const form = document.getElementById('requestForm');
const msg = document.getElementById('formMsg');
const sendBtn = document.getElementById('sendBtn');
const statusBox = document.getElementById('requestStatus');

// read values sent from other pages
const params = new URLSearchParams(window.location.search);
let teacherName = params.get('teacher') || '';

// fill form from url values
document.getElementById('toEmail').value = params.get('email') || '';
document.getElementById('skillWanted').value = params.get('skill') || '';
document.getElementById('skillOffered').value =
  params.get('offer') || (me.teachSkills ? me.teachSkills[0] : '');

if (teacherName) {
  document.getElementById('requestIntro').textContent =
    'You are asking ' + teacherName + ' to teach you. Tell them what you can teach in return.';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const toEmail = document.getElementById('toEmail').value.trim();
  const skillWanted = document.getElementById('skillWanted').value.trim();
  const skillOffered = document.getElementById('skillOffered').value.trim();
  const message = document.getElementById('message').value.trim();

  // basic validation
  if (!toEmail || !skillWanted || !skillOffered) {
    showMsg('Please fill in email and both skills.', false);
    return;
  }
  if (toEmail.toLowerCase() === me.email.toLowerCase()) {
    showMsg('You cannot send a request to yourself.', false);
    return;
  }

  const all = JSON.parse(localStorage.getItem('skillswapRequests') || '[]');

  // block same pending request twice
  const duplicate = all.some(r =>
    r.from === me.email && r.to === toEmail &&
    r.skillWanted.toLowerCase() === skillWanted.toLowerCase() &&
    r.status === 'Pending'
  );
  if (duplicate) {
    showMsg('You already sent this request. It is still pending.', false);
    return;
  }

  // find teacher name if not in url
  if (!teacherName) {
    const users = JSON.parse(localStorage.getItem('skillswapUsers') || '[]');
    const found = users.find(u => u.email.toLowerCase() === toEmail.toLowerCase());
    teacherName = found ? found.fullName : toEmail;
  }

  // same format dashboard reads
  all.push({
    id: Date.now(),
    from: me.email,
    fromName: me.fullName,
    to: toEmail,
    toName: teacherName,
    skillWanted: skillWanted,
    skillOffered: skillOffered,
    message: message,
    status: 'Pending',
    date: new Date().toISOString()
  });
  localStorage.setItem('skillswapRequests', JSON.stringify(all));

  showMsg('Request sent successfully!', true);
  sendBtn.disabled = true;
  sendBtn.textContent = 'Request Sent';
  statusBox.style.display = 'flex';
});

function showMsg(text, success) {
  msg.textContent = text;
  msg.className = 'form-msg ' + (success ? 'msg-success' : 'msg-error');
}
