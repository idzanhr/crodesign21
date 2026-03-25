const toggle = document.getElementById('darkModeToggle');
const body = document.body;

// 1. Check if the user already chose a theme in the past
const savedTheme = localStorage.getItem('theme');

// 2. Check the Operating System's preference
const prefersDarkOS = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// 3. Determine the initial theme based on priority
let currentTheme = 'light'; // default fallback

if (savedTheme) {
    // User's saved choice takes highest priority
    currentTheme = savedTheme;
} else if (prefersDarkOS) {
    // If no saved choice, use the OS preference
    currentTheme = 'dark';
}

// 4. Apply the theme to the page and update the toggle switch
body.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
    toggle.checked = true;
}

// 5. Listen for clicks on the toggle switch
toggle.addEventListener('change', function(e) {
    if (e.target.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Save user preference
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // Save user preference
    }
});

// Optional bonus: Listen for OS theme changes in real-time
// If the user changes their OS theme while the page is open, update it automatically
// (but ONLY if they haven't manually saved a preference for this specific site yet)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!localStorage.getItem('theme')) {
        const newTheme = event.matches ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        toggle.checked = event.matches;
    }
});