   // Função que calcula e atualiza os "Outros Ativos Não Circulantes"
    function calcularOutrosAtivosNaoCirculantes() {
      const camposBase = [
        'imobilizado',
        'bensmoveis',
        'bensimobilizados',
        'intangivel',
        'aplicacoesfinanceiras'
      ];

      function getValor(id) {
        const el = document.getElementById(id);
        return el && el.value !== '' ? parseFloat(el.value) : 0;
      }

      function setValor(id, valor) {
        const el = document.getElementById(id);
        if (el) {
          el.value = valor.toFixed(2);
        }
      }

      const ativoNaoVigente = getValor('ativo_nao_vigente');
      const ativoNaoAnterior = getValor('ativo_nao_anterior');

      const somaVigente = camposBase.reduce((acc, nome) => acc + getValor(`${nome}_vigente`), 0);
      const somaAnterior = camposBase.reduce((acc, nome) => acc + getValor(`${nome}_anterior`), 0);

      const outrosVigente = ativoNaoVigente - somaVigente >= 0 ? ativoNaoVigente - somaVigente : 0;
      const outrosAnterior = ativoNaoAnterior - somaAnterior >= 0 ? ativoNaoAnterior - somaAnterior : 0;

      setValor('outrosativos_vigente', outrosVigente);
      setValor('outrosativos_anterior', outrosAnterior);
    }

    // Salvar no localStorage
    function salvarAtivoNaoCirculante() {
      const inputs = document.querySelectorAll('input[type="number"]');
      let dados = {};
      inputs.forEach(input => {
        dados[input.id] = input.value;
      });
      localStorage.setItem('ativoNaoCirculante', JSON.stringify(dados));
    }

    // Carregar dados do localStorage
    function carregarAtivoNaoCirculante() {
      const dados = JSON.parse(localStorage.getItem('ativoNaoCirculante'));
      if (!dados) return;
      Object.keys(dados).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = dados[id];
      });
      calcularOutrosAtivosNaoCirculantes();
    }

    // Executa ao carregar a página
    document.addEventListener('DOMContentLoaded', () => {
      carregarAtivoNaoCirculante();

      const btnConcluido = document.querySelector('.btn-concluido');
      if (btnConcluido) {
        btnConcluido.addEventListener('click', (e) => {
          e.preventDefault();
          salvarAtivoNaoCirculante();
          window.location.href = "/front/values.html";
        });
      }

      // Vincular cálculo para todos inputs number para atualizar automaticamente
      document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', calcularOutrosAtivosNaoCirculantes);
      });
    });
    document.addEventListener('DOMContentLoaded', () => {
  // === Carregar dados e calcular ===
  carregarAtivoNaoCirculante();

  const btnConcluido = document.querySelector('.btn-concluido');
  if (btnConcluido) {
    btnConcluido.addEventListener('click', (e) => {
      e.preventDefault();
      salvarAtivoNaoCirculante();
      window.location.href = "/front/values.html";
    });
  }

  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', calcularOutrosAtivosNaoCirculantes);
  });

  // === Modal Explicativo ===
  const btnInfo = document.getElementById('btnInfoAtivo');
  const modal = document.getElementById('modalInfoAtivo');
  const btnClose = document.getElementById('modalCloseBtn');

  if (btnInfo && modal && btnClose) {
    btnInfo.addEventListener('click', () => modal.classList.add('active'));
    btnClose.addEventListener('click', () => modal.classList.remove('active'));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    });
  }
});

