const elementos = document.querySelectorAll('.copiar');

const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
tooltip.innerText = 'Copiado!';
document.body.appendChild(tooltip);

elementos.forEach(el => {
  el.addEventListener('click', (e) => {
    const textoParaCopiar = el.dataset.texto;

    navigator.clipboard.writeText(textoParaCopiar).then(() => {
      tooltip.style.left = e.clientX + 'px';
      tooltip.style.top = e.clientY + 'px';

      tooltip.classList.add('show');

      setTimeout(() => {
        tooltip.classList.remove('show');
      }, 1200);
    });
  });
});