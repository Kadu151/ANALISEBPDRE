window.addEventListener('DOMContentLoaded', () => {
  // Limpar confirmações anteriores ao carregar a página
  const tabelas = [
    'ativoCirculanteDados',
    'ativoNaoCirculanteDados',
    'passivocirculante',
    'passivoNaoCirculanteDados',
    'Patrimonio',
    'DREDados'
  ];

  tabelas.forEach(tabelaId => {
    localStorage.removeItem(`${tabelaId}_confirmado`);
  });

  // Exibir os dados nas tabelas
  exibirAtivoCirculante();
  exibirAtivoNaoCirculante();
  exibirPassivoCirculante();
  exibirPassivoNaoCirculante();
  exibirPatrimonio();
  exibirDRE();

  // Adicionar os listeners de confirmação
  document.querySelectorAll('.btn-confirmar').forEach(botao => {
    botao.addEventListener('click', () => {
      const tabelaId = botao.getAttribute('data-tabela');
      localStorage.setItem(`${tabelaId}_confirmado`, 'true');
      botao.disabled = true;
      botao.textContent = 'Confirmado 👍';
    });
  });
});


function exibirAtivoCirculante() {
  const dados = JSON.parse(localStorage.getItem('ativoCirculante'));
  const tbody = document.querySelector('#ativoCirculanteDados tbody');

  if (!dados) {
    tbody.innerHTML = '<tr><td colspan="3">Nenhum dado disponível</td></tr>';
    return;
  }

  const campos = [
    { descricao: 'Disponível', vigente: 'disponivel_vigente', anterior: 'disponivel_anterior' },
    { descricao: 'Estoque', vigente: 'estoque_vigente', anterior: 'estoque_anterior' },
    { descricao: 'Contas a Receber', vigente: 'contas_vigente', anterior: 'contas_anterior' },
    { descricao: 'Impostos a Recuperar', vigente: 'impostos_vigente', anterior: 'impostos_anterior' },
    { descricao: 'Caixas e Equivalentes a Caixa', vigente: 'caixa_vigente', anterior: 'caixa_anterior' },
    { descricao: 'Outros Ativos', vigente: 'outros_vigente', anterior: 'outros_anterior' }
  ];

  let html = '';

  // Linha de grupo: Ativo Circulante com valores preenchidos
  html += `
    <tr>
      <td style="font-weight: bold; background-color: #f0f0f0;">Ativo Circulante</td>
      <td style="font-weight: bold; background-color: #f0f0f0;">${dados.ativo_vigente || '0,00'}</td>
      <td style="font-weight: bold; background-color: #f0f0f0;">${dados.ativo_anterior || '0,00'}</td>
    </tr>
  `;

  // Linhas detalhadas (indentadas visualmente com padding-left)
  campos.forEach(campo => {
    const vigente = dados[campo.vigente] || '0,00';
    const anterior = dados[campo.anterior] || '0,00';

    html += `
      <tr>
        <td style="padding-left: 20px;">${campo.descricao}</td>
        <td>${vigente}</td>
        <td>${anterior}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}



function exibirAtivoNaoCirculante() {
  const dados = JSON.parse(localStorage.getItem('ativoNaoCirculante'));
  const tbody = document.querySelector('#ativoNaoCirculanteDados tbody');

  if (!dados) {
    tbody.innerHTML = '<tr><td colspan="3">Nenhum dado disponível</td></tr>';
    return;
  }

  const campos = [
    { descricao: 'Imobilizado', vigente: 'imobilizado_vigente', anterior: 'imobilizado_anterior' },
    { descricao: 'Bens móveis', vigente: 'bensmoveis_vigente', anterior: 'bensmoveis_anterior' },
    { descricao: 'Bens imobilizados', vigente: 'bensimobilizados_vigente', anterior: 'bensimobilizados_anterior' },
    { descricao: 'Intangível', vigente: 'intangivel_vigente', anterior: 'intangivel_anterior' },
    { descricao: 'Aplicações Financeiras', vigente: 'aplicacoesfinanceiras_vigente', anterior: 'aplicacoesfinanceiras_anterior' },
    { descricao: 'Outros Ativos Não Circulantes', vigente: 'outrosativos_vigente', anterior: 'outrosativos_anterior' }
  ];

  let html = `
    <tr>
      <td style="font-weight: bold;">Ativo Não Circulante</td>
      <td>${dados['ativo_nao_vigente'] || '0,00'}</td>
      <td>${dados['ativo_nao_anterior'] || '0,00'}</td>
    </tr>
  `;

  campos.forEach(campo => {
    const vigente = dados[campo.vigente] || '0,00';
    const anterior = dados[campo.anterior] || '0,00';

    html += `
      <tr>
        <td style="padding-left: 20px;">${campo.descricao}</td>
        <td>${vigente}</td>
        <td>${anterior}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}


function exibirPassivoCirculante() {
  const dados = JSON.parse(localStorage.getItem('passivoCirculante'));
  const tbody = document.querySelector('#passivocirculante tbody');

  if (!dados) {
    tbody.innerHTML = '<tr><td colspan="3">Nenhum dado disponível</td></tr>';
    return;
  }

  const campos = [
    { descricao: 'Financiamento', vigente: 'financiamento_vigente', anterior: 'financiamento_anterior' },
    { descricao: 'Empréstimos', vigente: 'emprestimo_vigente', anterior: 'emprestimo_anterior' },
    { descricao: 'Fornecedores', vigente: 'fornecedores_vigente', anterior: 'fornecedores_anterior' },
    { descricao: 'Outros Passivos', vigente: 'outrospassivos_vigente', anterior: 'outrospassivos_anterior' }
  ];

  let html = `
    <tr>
      <td style="font-weight: bold;">Passivo Circulante</td>
      <td>${dados['passivo_vigente'] || '0,00'}</td>
      <td>${dados['passivo_anterior'] || '0,00'}</td>
    </tr>
  `;

  campos.forEach(campo => {
    const vigente = dados[campo.vigente] || '0,00';
    const anterior = dados[campo.anterior] || '0,00';

    html += `
      <tr>
        <td style="padding-left: 20px;">${campo.descricao}</td>
        <td>${vigente}</td>
        <td>${anterior}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}


function exibirPassivoNaoCirculante() {
  const dados = JSON.parse(localStorage.getItem('passivoNaoCirculante'));
  const tbody = document.querySelector('#passivoNaoCirculanteDados tbody');

  if (!dados) {
    tbody.innerHTML = '<tr><td colspan="3">Nenhum dado disponível</td></tr>';
    return;
  }

  const campos = [
    { descricao: 'Financiamento a longo prazo', vigente: 'financiamentolongo_vigente', anterior: 'financiamentolongo_anterior' },
    { descricao: 'Empréstimos a longo prazo', vigente: 'emprestimolongo_vigente', anterior: 'emprestimolongo_anterior' },
    { descricao: 'Parcelamento de Imposto', vigente: 'parcelamentoimposto_vigente', anterior: 'parcelamentoimposto_anterior' },
    { descricao: 'Outros passivos não circulantes', vigente: 'outrospassivosnao_vigente', anterior: 'outrospassivosnao_anterior' }
  ];

  let html = `
    <tr>
      <td style="font-weight: bold;">Passivo Não Circulante</td>
      <td>${dados['total_vigente'] || '0,00'}</td>
      <td>${dados['total_anterior'] || '0,00'}</td>
    </tr>
  `;

  campos.forEach(campo => {
    const vigente = dados[campo.vigente] || '0,00';
    const anterior = dados[campo.anterior] || '0,00';

    html += `
      <tr>
        <td style="padding-left: 20px;">${campo.descricao}</td>
        <td>${vigente}</td>
        <td>${anterior}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function exibirPatrimonio() {
  const dados = JSON.parse(localStorage.getItem('Patrimonio'));
  const tbody = document.querySelector('#Patrimonio tbody');
  if (!dados) {
    tbody.innerHTML = '<tr><td colspan="3">Nenhum dado disponível</td></tr>';
    return;
  }

  const campos = [
    { descricao: 'Capital Social', vigente: 'Capital_vigente', anterior: 'Capital_anterior' },
    { descricao: 'Reserva de Lucros', vigente: 'Reserva_vigente', anterior: 'Reserva_anterior' },
    { descricao: 'Lucros ou Prejuízos', vigente: 'LucrosPrejuizos_vigente', anterior: 'LucrosPrejuizos_anterior' }
  ];

  let html = '';
  campos.forEach(campo => {
    const vig = dados[campo.vigente] || '0,00';
    const ant = dados[campo.anterior] || '0,00';
    html += `<tr>
      <td>${campo.descricao}</td>
      <td>${vig}</td>
      <td>${ant}</td>
    </tr>`;
  });

  html += `<tr>
    <th>Patrimonio Liquido</th>
    <th>${dados.total_vigente || '0,00'}</th>
    <th>${dados.total_anterior || '0,00'}</th>
  </tr>`;

  tbody.innerHTML = html;
}
function exibirDRE() {
  const dados = JSON.parse(localStorage.getItem('DRE'));
  const tbody = document.querySelector('#DREDados tbody');
  if (!dados) {
    tbody.innerHTML = '<tr><td colspan="3">Nenhum dado disponível</td></tr>';
    return;
  }

  const campos = [
    { descricao: 'Receita', vigente: 'Receita_vigente', anterior: 'Receita_anterior' },
    { descricao: 'Custo', vigente: 'Custo_vigente', anterior: 'Custo_anterior' },
    { descricao: 'Lucro Operacional', vigente: 'LucroOperacional_vigente', anterior: 'LucroOperacional_anterior' },
    { descricao: 'Lucro Líquido', vigente: 'LucroLiquido_vigente', anterior: 'LucroLiquido_anterior' },
    { descricao: 'Lucro Bruto', vigente: 'LucroBruto_vigente', anterior: 'LucroBruto_anterior' },
    { descricao: 'Receitas Líquidas', vigente: 'ReceitasLiquidas_vigente', anterior: 'ReceitasLiquidas_anterior' },
    { descricao: 'Amortização', vigente: 'Amortizacao_vigente', anterior: 'Amortizacao_anterior' },
    { descricao: 'Depreciação', vigente: 'Depreciacao_vigente', anterior: 'Depreciacao_anterior' }

  ];

  let html = '';
  campos.forEach(campo => {
    const vig = dados[campo.vigente] || '0,00';
    const ant = dados[campo.anterior] || '0,00';
    html += `<tr>
      <td>${campo.descricao}</td>
      <td>${vig}</td>
      <td>${ant}</td>
    </tr>`;
  });

  tbody.innerHTML = html;
}
document.addEventListener('DOMContentLoaded', () => {
    const btnConfirmarList = document.querySelectorAll('.btn-confirmar');
    const btnVerResultados = document.querySelector('.btn-acessar');
    const clickedButtons = new Set();

    btnConfirmarList.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (!clickedButtons.has(index)) {
          clickedButtons.add(index);
          btn.disabled = true;
          btn.style.opacity = '0.6';
          btn.style.cursor = 'default';
        }

        // Quando todos os botões forem clicados
        if (clickedButtons.size === btnConfirmarList.length) {
          btnVerResultados.classList.remove('disabled');
          btnVerResultados.removeAttribute('tabindex');
          btnVerResultados.removeAttribute('aria-disabled');
        }
      });
    });

    // Bloqueia o clique no link enquanto estiver desabilitado
    btnVerResultados.addEventListener('click', function(event) {
      if (btnVerResultados.classList.contains('disabled')) {
        event.preventDefault();
      }
    });
  });