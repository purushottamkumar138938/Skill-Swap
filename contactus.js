// toggle FAQ accordion items
const triggers = document.querySelectorAll('.accordion-trigger');

triggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.parentElement;
    const isOpen = item.classList.contains('open');

    // close any other open item first
    document.querySelectorAll('.accordion-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

// handle contact form submit
const form = document.getElementById('contactForm');
const msg = document.getElementById('contactMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('cname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const message = document.getElementById('cmessage').value.trim();

  if (!name || !email || !message) {
    showMsg('Please fill in every field.', false);
    return;
  }

  // store message as our "database"
  const messages = JSON.parse(localStorage.getItem('skillswapMessages') || '[]');
  messages.push({ name, email, message, sent: new Date().toISOString() });
  localStorage.setItem('skillswapMessages', JSON.stringify(messages));

  showMsg('Message sent! We\'ll get back to you soon.', true);
  form.reset();
});

function showMsg(text, success) {
  msg.textContent = text;
  msg.className = 'form-msg ' + (success ? 'msg-success' : 'msg-error');
}
