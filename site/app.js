// Demo-only auth (client side). Do not use for real security.
const VALID = { username: 'admin', password: 'admin123' };

const form = document.getElementById('login-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value;
    const err = document.getElementById('error');
    if (!u || !p) {
      err.textContent = 'Username and password are required';
    } else if (u !== VALID.username || p !== VALID.password) {
      err.textContent = 'Invalid username or password';
    } else {
      sessionStorage.setItem('user', u);
      location.href = 'home.html';
      return;
    }
    err.hidden = false;
  });
}

const welcome = document.querySelector('[data-testid="welcome"]');
if (welcome) welcome.textContent = `Welcome, ${sessionStorage.getItem('user')}`;

const logout = document.getElementById('logout');
if (logout) {
  logout.addEventListener('click', () => {
    sessionStorage.removeItem('user');
    location.href = 'index.html';
  });
}
