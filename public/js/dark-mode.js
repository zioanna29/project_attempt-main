// both files must be linked
//dark mode to body
//and dark mode onload to head

const toggle = document.querySelector('#dark-mode-toggle');

// // Check local storage for dark mode preference
// let isDarkModeEnabled = localStorage.getItem('dark-mode') === 'true';             is already declared in the head
if (isDarkModeEnabled) {
  // Enable dark mode if preference is stored
  setDarkMode(true);
}


// Function to set dark mode
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

// Event listener for toggle change
if (toggle) {
  toggle.addEventListener('change', function() {
    setDarkMode(this.checked);
    localStorage.setItem('dark-mode', this.checked ? 'true' : 'false');
  });
}