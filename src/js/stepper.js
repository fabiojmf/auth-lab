/**
 * Stepper component — inicializa automaticamente qualquer container com [data-stepper].
 * 
 * Uso no HTML:
 *   <div data-stepper>
 *     <div class="stepper-step active" data-step="1">...</div>
 *     <div class="stepper-step" data-step="2">...</div>
 *   </div>
 *   <div class="scene-controls">
 *     <button class="btn btn-secondary" data-stepper-prev>← Anterior</button>
 *     <span data-stepper-indicator>1 / 2</span>
 *     <button class="btn" data-stepper-next>Próximo →</button>
 *   </div>
 *
 * Para flow steps com dados JS, use data-stepper-flow com steps em <script type="application/json">:
 *   <div data-stepper-flow>
 *     <div class="flow-step-detail">
 *       <div data-flow-visual></div>
 *       <div data-flow-text></div>
 *       <div data-flow-http></div>
 *     </div>
 *     <script type="application/json" data-flow-steps>[{...}]</script>
 *   </div>
 */
document.addEventListener('DOMContentLoaded', function() {
  // Simple steppers (analogias, etc)
  document.querySelectorAll('[data-stepper]').forEach(initStepper);
  // Flow steppers (trilha 03 com dados JSON)
  document.querySelectorAll('[data-stepper-flow]').forEach(initFlowStepper);
});

function initStepper(container) {
  const steps = container.querySelectorAll('.stepper-step');
  const parent = container.closest('.interactive-box') || container.parentElement;
  const prev = parent.querySelector('[data-stepper-prev]');
  const next = parent.querySelector('[data-stepper-next]');
  const indicator = parent.querySelector('[data-stepper-indicator]');
  let current = 0;

  function show(n) {
    steps.forEach(s => s.classList.remove('active'));
    steps[n].classList.add('active');
    if (indicator) indicator.textContent = `${n + 1} / ${steps.length}`;
    if (prev) prev.disabled = n === 0;
    if (next) next.disabled = n === steps.length - 1;
    // Announce to screen readers
    steps[n].setAttribute('aria-live', 'polite');
  }

  if (prev) prev.addEventListener('click', () => { if (current > 0) show(--current); });
  if (next) next.addEventListener('click', () => { if (current < steps.length - 1) show(++current); });
  show(current);
}

function initFlowStepper(container) {
  const parent = container.closest('.interactive-box') || container.parentElement;
  const stepsData = JSON.parse(container.querySelector('[data-flow-steps]').textContent);
  const visual = container.querySelector('[data-flow-visual]');
  const text = container.querySelector('[data-flow-text]');
  const http = container.querySelector('[data-flow-http]');
  const prev = parent.querySelector('[data-stepper-prev]');
  const next = parent.querySelector('[data-stepper-next]');
  const indicator = parent.querySelector('[data-stepper-indicator]');
  let current = 0;

  function render() {
    const step = stepsData[current];
    if (visual) visual.innerHTML = step.visual || '';
    if (text) text.innerHTML = step.text || '';
    if (http) http.innerHTML = step.http ? `<div class="http-block">${step.http}</div>` : '';
    if (indicator) indicator.textContent = `${current + 1} / ${stepsData.length}`;
    if (prev) prev.disabled = current === 0;
    if (next) next.disabled = current === stepsData.length - 1;
  }

  if (prev) prev.addEventListener('click', () => { if (current > 0) { current--; render(); } });
  if (next) next.addEventListener('click', () => { if (current < stepsData.length - 1) { current++; render(); } });
  render();
}
