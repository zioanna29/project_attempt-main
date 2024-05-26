

const toggle = document.querySelector('#dark-mode-toggle');

if (isDarkModeEnabled) {
  setDarkMode(true);
}

function setDarkMode(enabled) {
  if (enabled) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }
  if (toggle) {
    toggle.checked = enabled;
  }
}

if (toggle) {
  toggle.addEventListener('change', function() {
    setDarkMode(this.checked);
    localStorage.setItem('dark-mode', this.checked ? 'true' : 'false');
  });
}