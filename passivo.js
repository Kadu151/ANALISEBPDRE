   // Função para obter valor numérico do input (retorna 0 se vazio)
    function getValor(id) {
      const el = document.getElementById(id);
      return el && el.value !== '' ? parseFloat(el.value) : 0;
    }

    // Função para setar valor formatado em input
    function setValor(id, valor) {
      const el = document.getElementById(id);
      if (el) {
        el.value = valor.toFixed(2);
      }
    }

    // Calcula e atualiza "Outros Passivos"
    function calcularOutrosPassivosCirculantes() {
      const passivoVigente = getValor('passivo_vigente');
      const passivoAnterior = getValor('passivo_anterior');

      const financiamentoVigente = getValor('financiamento_vigente');
      const financiamentoAnterior = getValor('financiamento_anterior');

      const emprestimoVigente = getValor('emprestimo_vigente');
      const emprestimoAnterior = getValor('emprestimo_anterior');

      const fornecedoresVigente = getValor('fornecedores_vigente');
      const fornecedoresAnterior = getValor('fornecedores_anterior');

      const outrosVigente = Math.max(0, passivoVigente - (financiamentoVigente + emprestimoVigente + fornecedoresVigente));
      const outrosAnterior = Math.max(0, passivoAnterior - (financiamentoAnterior + emprestimoAnterior + fornecedoresAnterior));

      setValor('outrospassivos_vigente', outrosVigente);
      setValor('outrospassivos_anterior', outrosAnterior);

      salvarNoLocalStorage();
    }

    // Salva dados no localStorage
    function salvarNoLocalStorage() {
      const campos = [
        'passivo_vigente',
        'passivo_anterior',
        'financiamento_vigente',
        'financiamento_anterior',
        'emprestimo_vigente',
        'emprestimo_anterior',
        'fornecedores_vigente',
        'fornecedores_anterior',
        'outrospassivos_vigente',
        'outrospassivos_anterior',
      ];

      const dados = {};
      campos.forEach(id => {
        const el = document.getElementById(id);
        dados[id] = el && el.value ? el.value : "0.00";
      });

      localStorage.setItem('passivoCirculante', JSON.stringify(dados));
    }

    // Carrega dados do localStorage e atualiza campos
    function carregarValoresSalvos() {
      const dados = JSON.parse(localStorage.getItem('passivoCirculante'));
      if (!dados) return;

      for (const id in dados) {
        const el = document.getElementById(id);
        if (el) {
          el.value = dados[id];
        }
      }

      // Atualiza cálculo para garantir consistência
      calcularOutrosPassivosCirculantes();
    }

    // Inicialização ao carregar página
    document.addEventListener('DOMContentLoaded', () => {
      carregarValoresSalvos();

      // Adiciona listener para recalcular e salvar ao digitar
      [
        'passivo_vigente', 'passivo_anterior',
        'financiamento_vigente', 'financiamento_anterior',
        'emprestimo_vigente', 'emprestimo_anterior',
        'fornecedores_vigente', 'fornecedores_anterior'
      ].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener('input', calcularOutrosPassivosCirculantes);
        }
      });
    });

// === Modal Explicativo ===
  const btnInfo = document.getElementById('btnInfoPassivo');
  const modal = document.getElementById('modalInfoPassivo');
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
