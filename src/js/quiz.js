/**
 * Quiz component — inicializa quizzes a partir de <div data-quiz> com perguntas em JSON.
 *
 * Uso:
 *   <div data-quiz>
 *     <script type="application/json">[
 *       {"q": "Pergunta?", "options": ["A", "B", "C"], "answer": 0, "explanation": "Porque..."}
 *     ]</script>
 *   </div>
 */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-quiz]').forEach(initQuiz);
});

function initQuiz(container) {
  const questions = JSON.parse(container.querySelector('script[type="application/json"]').textContent);
  let current = 0;
  let score = 0;
  let answered = false;

  const ui = document.createElement('div');
  ui.className = 'quiz-ui';
  ui.setAttribute('aria-label', 'Quiz de fixação');
  container.appendChild(ui);

  function render() {
    if (current >= questions.length) {
      ui.innerHTML = `
        <div class="quiz-result">
          <h4>Resultado: ${score}/${questions.length}</h4>
          <p>${score === questions.length ? '🎉 Perfeito!' : score >= questions.length / 2 ? '👍 Bom trabalho!' : '📖 Revise o conteúdo acima.'}</p>
          <button class="btn btn-secondary quiz-retry">Refazer</button>
        </div>`;
      ui.querySelector('.quiz-retry').addEventListener('click', () => { current = 0; score = 0; render(); });
      return;
    }

    const q = questions[current];
    answered = false;
    ui.innerHTML = `
      <div class="quiz-header">
        <span class="quiz-counter">${current + 1}/${questions.length}</span>
        <h4 class="quiz-question">${q.q}</h4>
      </div>
      <div class="quiz-options" role="radiogroup" aria-label="Opções">
        ${q.options.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-feedback" aria-live="polite"></div>`;

    ui.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const idx = parseInt(btn.dataset.idx);
        const correct = idx === q.answer;
        if (correct) score++;

        ui.querySelectorAll('.quiz-option').forEach((b, i) => {
          b.classList.add(i === q.answer ? 'correct' : 'wrong');
          b.disabled = true;
        });
        btn.classList.add('selected');

        const feedback = ui.querySelector('.quiz-feedback');
        feedback.innerHTML = `<p class="${correct ? 'feedback-correct' : 'feedback-wrong'}">${correct ? '✓ Correto!' : '✗ Incorreto.'} ${q.explanation || ''}</p>`;

        setTimeout(() => { current++; render(); }, 2000);
      });
    });
  }

  render();
}
