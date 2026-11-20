const diagram = document.querySelector('.diagram');
const buttons = document.querySelectorAll('[data-highlight]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.highlight;
    diagram.classList.remove('is-filtering','highlight-technology','highlight-data','highlight-flow');
    if (target !== 'all') {
      diagram.classList.add('is-filtering', `highlight-${target}`);
    }
  });
});
