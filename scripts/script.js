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

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.caixaSobreMim, .caixaHab, .caixaProj, .caixaCt')
    .forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

const toggleTema = document.getElementById('toggleTema');

// Mantém o tema salvo ao recarregar a página
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo) {
    document.documentElement.setAttribute('data-tema', temaSalvo);
    toggleTema.innerText = temaSalvo === 'claro' ? '☀️' : '🌙';
}

toggleTema.addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-tema');

    if (temaAtual === 'claro') {
        document.documentElement.removeAttribute('data-tema');
        toggleTema.innerText = '🌙';
        localStorage.setItem('tema', 'escuro');
    } else {
        document.documentElement.setAttribute('data-tema', 'claro');
        toggleTema.innerText = '☀️';
        localStorage.setItem('tema', 'claro');
    }
});

const filtros = document.querySelectorAll('.filtro');
const projetos = document.querySelectorAll('.caixaProj');

filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        // Atualiza botão ativo
        filtros.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');

        const filtro = btn.dataset.filtro;

        projetos.forEach(proj => {
            const techs = proj.dataset.techs;

            if (filtro === 'todos' || techs.includes(filtro)) {
                proj.classList.remove('escondido');
            } else {
                proj.classList.add('escondido');
            }
        });
    });
});

const loading = document.getElementById('loading');
const barra = document.querySelector('.barra');
const loadingTexto = document.querySelector('.loading-texto');

let progresso = 0;

const textos = [
    'Carregando...',
    'Preparando portfólio...',
    'Quase lá...',
    'Seja bem-vindo!'
];

const intervalo = setInterval(() => {
    progresso += 1;
    barra.style.width = progresso + '%';

    // Troca o texto conforme o progresso
    if (progresso === 25) loadingTexto.innerText = textos[1];
    if (progresso === 60) loadingTexto.innerText = textos[2];
    if (progresso === 90) loadingTexto.innerText = textos[3];

    if (progresso >= 100) {
        clearInterval(intervalo);
        setTimeout(() => {
            loading.classList.add('sumir');
        }, 400); // pequena pausa antes de sumir
    }
}, 20); // 20ms * 100 = ~2 segundos no total

const menuToggle = document.getElementById('menuToggle');
const menuNav = document.getElementById('menuNav');

menuToggle.addEventListener('click', () => {
    menuNav.classList.toggle('aberto');

    if (menuNav.classList.contains('aberto')) {
        menuToggle.innerText = '✕';
    } else {
        menuToggle.innerText = '☰';
    }
});
menuNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuNav.classList.remove('aberto');
        menuToggle.innerText = '☰';
    });
});