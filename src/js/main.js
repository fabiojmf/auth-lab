// Apply theme immediately (before DOM renders) to prevent flash
(function() {
  const saved = localStorage.getItem('authlab-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('authlab-theme', next);
  updateToggleIcon(next);
}

function updateToggleIcon(theme) {
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.addEventListener('DOMContentLoaded', function() {
  const theme = document.documentElement.getAttribute('data-theme');
  updateToggleIcon(theme);

  // Add copy buttons to all <pre> blocks
  document.querySelectorAll('pre').forEach(function(pre) {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copiar código');
    btn.textContent = 'Copiar';
    btn.addEventListener('click', function() {
      const code = pre.querySelector('code') || pre;
      navigator.clipboard.writeText(code.textContent).then(function() {
        btn.textContent = '✓ Copiado';
        btn.classList.add('copied');
        setTimeout(function() { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2000);
      });
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
});
