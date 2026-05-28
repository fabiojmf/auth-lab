// Storage abstraction: localStorage for http, cookies for file://
var progress = (function() {
  var useLocal = window.location.protocol !== 'file:';

  function get(key) {
    if (useLocal) return localStorage.getItem(key);
    var match = document.cookie.match(new RegExp('(?:^|; )' + key + '=([^;]*)'));
    return match ? match[1] : null;
  }

  function set(key, val) {
    if (useLocal) { localStorage.setItem(key, val); return; }
    document.cookie = key + '=' + val + '; path=/; max-age=31536000; SameSite=Lax';
  }

  return { get: get, set: set };
})();

document.addEventListener('DOMContentLoaded', function() {
  var path = window.location.pathname;

  if (document.querySelector('.module-nav')) {
    // === Página de módulo: checkbox ===
    var folder = path.match(/trilhas\/([^/]+)/);
    var numMatch = path.match(/\/(\d+)-[^/]+\.html/);
    if (!folder || !numMatch) return;
    var key = 'authlab-done-' + folder[1] + '-' + numMatch[1];
    var nav = document.querySelector('.module-nav');
    var checked = progress.get(key) === '1';
    var div = document.createElement('div');
    div.className = 'study-check';
    div.innerHTML =
      '<label>' +
        '<input type="checkbox"' + (checked ? ' checked' : '') + '>' +
        '<span class="check-icon">✓</span>' +
        '<span class="check-text">' + (checked ? 'Módulo concluído' : 'Marcar como estudado') + '</span>' +
      '</label>';
    nav.parentNode.insertBefore(div, nav);
    div.querySelector('input').addEventListener('change', function() {
      progress.set(key, this.checked ? '1' : '0');
      div.querySelector('.check-text').textContent = this.checked ? 'Módulo concluído' : 'Marcar como estudado';
    });

  } else if (document.querySelector('.module-card')) {
    // === Index da trilha: badges nos module-cards ===
    var folder = path.match(/trilhas\/([^/]+)/);
    if (!folder) return;
    document.querySelectorAll('.module-card').forEach(function(card) {
      var href = card.getAttribute('href');
      var m = href && href.match(/^(\d+)-/);
      if (!m) return;
      if (progress.get('authlab-done-' + folder[1] + '-' + m[1]) === '1') {
        card.classList.add('is-done');
      }
    });

  } else if (document.querySelector('.trilhas-grid')) {
    // === Página principal: progresso em cada trilha ===
    var trilhas = {
      '01-fundamentos': 4,
      '02-instalacao-arquitetura': 5,
      '03-fluxos-oauth2': 5,
      '04-clients': 6,
      '05-usuarios-identidade': 5,
      '06-seguranca': 5,
      '07-integracao': 6,
      '08-operacao-producao': 6,
      '09-avancado': 6
    };

    document.querySelectorAll('.trilhas-grid .card').forEach(function(card) {
      var href = card.getAttribute('href') || '';
      var tm = href.match(/trilhas\/([^/]+)\//);
      if (!tm) return;
      var slug = tm[1];
      var total = trilhas[slug];
      if (!total) return;

      var done = 0;
      for (var i = 1; i <= total; i++) {
        var num = i < 10 ? '0' + i : '' + i;
        if (progress.get('authlab-done-' + slug + '-' + num) === '1') done++;
      }

      if (done === 0) return;

      var bar = document.createElement('div');
      bar.className = 'trilha-progress';
      bar.innerHTML =
        '<div class="trilha-progress-bar"><div class="trilha-progress-fill" style="width:' + Math.round(done / total * 100) + '%"></div></div>' +
        '<span class="trilha-progress-text">' + done + '/' + total + '</span>';
      card.querySelector('.trilha-info').appendChild(bar);

      if (done === total) {
        card.classList.add('trilha-complete');
      }
    });
  }
});
