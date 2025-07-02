document.addEventListener('DOMContentLoaded', () => {
  function parseNumber(value) {
    if (!value) return 0;
    const stringValue = value.toString();
    if (stringValue.includes(',')) {
      return parseFloat(stringValue.replace(/\./g, '').replace(',', '.')) || 0;
    } else {
      return parseFloat(stringValue) || 0;
    }
  }

  function getCampo(tabela, campo) {
    const dados = JSON.parse(localStorage.getItem(tabela));
    return parseNumber(dados?.[campo]);
  }

  function avaliarIndice(nome, valor) {
    if (nome.includes('Liquidez')) {
      if (valor >= 1.0) return 'Excelente';
      if (valor >= 0.8) return 'Boa';
      if (valor >= 0.4) return 'Regular';
      return 'Risco';
    }

    if (nome === 'Participação de Capitais de Terceiros') {
      if (valor <= 3.0) return 'Excelente';
      if (valor <= 4.0) return 'Boa';
      if (valor <= 5.0) return 'Regular';
      return 'Risco';
    }

    if (nome === 'Grau de Endividamento') {
      if (valor <= 3.0) return 'Excelente';
      if (valor <= 4.0) return 'Boa';
      return 'Risco';
    }

    if (nome === 'Participação de Exigível a Curto Prazo no Exigível Total') {
      if (valor <= 3.0) return 'Excelente';
      if (valor <= 4.0) return 'Boa';
      if (valor <= 5.0) return 'Regular';
      return 'Risco';
    }

    if (nome === 'ROA') {
      if (valor >= 10) return 'Boa';
      if (valor >= 1) return 'Regular';
      return 'Risco';
    }

    if (nome === 'ROE') {
      if (valor >= 15) return 'Boa';
      if (valor >= 10) return 'Regular';
      return 'Risco';
    }

    if (nome === 'ROI') {
      if (valor >= 10) return 'Boa';
      if (valor >= 1) return 'Regular';
      return 'Risco';
    }

    if (nome === 'Grau de Imobilizações') {
      return valor >= 0.5 ? 'Boa' : 'Risco';
    }

    if (nome === 'Total do Ativo') {
      const passivoTotal = passivoCirculante + passivoNaoCirculante;
      return (ativoCirculante.Ativo + ativoNaoCirculante.Ativonao) > passivoTotal ? 'Boa' : 'Risco';
    }

    if (nome === 'Total do Passivo') {
      const ativoTotal = ativoCirculante.Ativo + ativoNaoCirculante.Ativonao;
      return (passivoCirculante + passivoNaoCirculante) > ativoTotal ? 'Risco' : 'Boa';
    }

    return '';
  }

  // Dados ano vigente
  const ativoCirculante = {
    Ativo: getCampo('ativoCirculante', 'ativo_vigente'),
    disponivel: getCampo('ativoCirculante', 'disponivel_vigente'),
    estoque: getCampo('ativoCirculante', 'estoque_vigente'),
    contas: getCampo('ativoCirculante', 'contas_vigente'),
    impostos: getCampo('ativoCirculante', 'impostos_vigente'),
    caixa: getCampo('ativoCirculante', 'caixa_vigente'),
    outros: getCampo('ativoCirculante', 'outros_vigente')
  };

  const ativoNaoCirculante = {
    Ativonao: getCampo('ativoNaoCirculante', 'ativo_nao_vigente'),
    imobilizado: getCampo('ativoNaoCirculante', 'imobilizado_vigente')
  };

  const passivoCirculante = getCampo('passivoCirculante', 'passivo_vigente');
  const passivoNaoCirculante = getCampo('passivoNaoCirculante', 'total_vigente');
  const patrimonio = getCampo('Patrimonio', 'total_vigente');

  const dre = {
    lucroLiquido: getCampo('DRE', 'LucroLiquido_vigente'),
    lucroOperacional: getCampo('DRE', 'LucroOperacional_vigente'),
    receita: getCampo('DRE', 'Receita_vigente'),
    custo: getCampo('DRE', 'Custo_vigente'),
    Amortizacao: getCampo('DRE', 'Amortizacao_vigente'),
    Depreciacao: getCampo('DRE', 'Depreciacao_vigente')
  };

  // Dados ano anterior
  const ativoCirculanteAnt = {
    Ativo: getCampo('ativoCirculante', 'ativo_anterior'),
    disponivel: getCampo('ativoCirculante', 'disponivel_anterior'),
    estoque: getCampo('ativoCirculante', 'estoque_anterior'),
    contas: getCampo('ativoCirculante', 'contas_anterior'),
    impostos: getCampo('ativoCirculante', 'impostos_anterior'),
    caixa: getCampo('ativoCirculante', 'caixa_anterior'),
    outros: getCampo('ativoCirculante', 'outros_anterior')
  };

  const ativoNaoCirculanteAnt = {
    Ativonao: getCampo('ativoNaoCirculante', 'ativo_nao_anterior'),
    imobilizado: getCampo('ativoNaoCirculante', 'imobilizado_anterior')
  };

  const passivoCirculanteAnt = getCampo('passivoCirculante', 'passivo_anterior');
  const passivoNaoCirculanteAnt = getCampo('passivoNaoCirculante', 'total_anterior');
  const patrimonioAnt = getCampo('Patrimonio', 'total_anterior');

  const dreAnt = {
    lucroLiquido: getCampo('DRE', 'LucroLiquido_anterior'),
    lucroOperacional: getCampo('DRE', 'LucroOperacional_anterior'),
    receita: getCampo('DRE', 'Receita_anterior'),
    custo: getCampo('DRE', 'Custo_anterior'),
    Amortizacao: getCampo('DRE', 'Amortizacao_anterior'),
    Depreciacao: getCampo('DRE', 'Depreciacao_anterior')
  };

  // Função de formatação para moeda
  const formatarMoeda = valor => valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  // Índices ano vigente
  const indices = [
    { nome: 'Liquidez Corrente', valor: passivoCirculante ? ativoCirculante.Ativo / passivoCirculante : 0 },
    { nome: 'Liquidez Seca', valor: passivoCirculante ? (ativoCirculante.Ativo - ativoCirculante.estoque) / passivoCirculante : 0 },
    { nome: 'Liquidez Imediata', valor: passivoCirculante ? ativoCirculante.caixa / passivoCirculante : 0 },
    { nome: 'Liquidez Geral', valor: (passivoCirculante + passivoNaoCirculante) ? (ativoCirculante.Ativo + ativoNaoCirculante.Ativonao) / (passivoCirculante + passivoNaoCirculante) : 0 },
    { nome: 'Participação de Capitais de Terceiros', valor: patrimonio ? (passivoCirculante + passivoNaoCirculante) / patrimonio : 0 },
    { nome: 'Grau de Endividamento', valor: (patrimonio + passivoCirculante + passivoNaoCirculante) ? (passivoCirculante + passivoNaoCirculante) / (patrimonio + passivoCirculante + passivoNaoCirculante) : 0 },
    { nome: 'Participação de Exigível a Curto Prazo no Exigível Total', valor: (passivoCirculante + passivoNaoCirculante) ? passivoCirculante / (passivoCirculante + passivoNaoCirculante) : 0 },
    { nome: 'Ativo Circulante - Estoque', valor: ativoCirculante.estoque / ativoCirculante.Ativo },
    { nome: 'ROA', valor: (ativoCirculante.Ativo + ativoNaoCirculante.Ativonao) ? (dre.lucroLiquido / (ativoCirculante.Ativo + ativoNaoCirculante.Ativonao)) * 100 : 0 },
    { nome: 'ROE', valor: patrimonio ? (dre.lucroLiquido / patrimonio) * 100 : 0 },
    { nome: 'ROI', valor: dre.custo ? ((dre.receita - dre.custo) / dre.custo) * 100 : 0 },
    { nome: 'Grau de Imobilizações', valor: patrimonio ? ativoNaoCirculante.imobilizado / patrimonio : 0 },
    { nome: 'Total do Ativo', valor: formatarMoeda(ativoCirculante.Ativo + ativoNaoCirculante.Ativonao) },
    { nome: 'Total do Passivo', valor: formatarMoeda(passivoCirculante + passivoNaoCirculante) },
    { nome: 'EBITDA', valor: formatarMoeda(dre.lucroOperacional + dre.Amortizacao + dre.Depreciacao) }
  ];

  // Índices ano anterior
  const indicesAnterior = [
    { nome: 'Liquidez Corrente', valor: passivoCirculanteAnt ? ativoCirculanteAnt.Ativo / passivoCirculanteAnt : 0 },
    { nome: 'Liquidez Seca', valor: passivoCirculanteAnt ? (ativoCirculanteAnt.Ativo - ativoCirculanteAnt.estoque) / passivoCirculanteAnt : 0 },
    { nome: 'Liquidez Imediata', valor: passivoCirculanteAnt ? ativoCirculanteAnt.caixa / passivoCirculanteAnt : 0 },
    { nome: 'Liquidez Geral', valor: (passivoCirculanteAnt + passivoNaoCirculanteAnt) ? (ativoCirculanteAnt.Ativo + ativoNaoCirculanteAnt.Ativonao) / (passivoCirculanteAnt + passivoNaoCirculanteAnt) : 0 },
    { nome: 'Participação de Capitais de Terceiros', valor: patrimonioAnt ? (passivoCirculanteAnt + passivoNaoCirculanteAnt) / patrimonioAnt : 0 },
    { nome: 'Grau de Endividamento', valor: (patrimonioAnt + passivoCirculanteAnt + passivoNaoCirculanteAnt) ? (passivoCirculanteAnt + passivoNaoCirculanteAnt) / (patrimonioAnt + passivoCirculanteAnt + passivoNaoCirculanteAnt) : 0 },
    { nome: 'Participação de Exigível a Curto Prazo no Exigível Total', valor: (passivoCirculanteAnt + passivoNaoCirculanteAnt) ? passivoCirculanteAnt / (passivoCirculanteAnt + passivoNaoCirculanteAnt) : 0 },
    { nome: 'Ativo Circulante - Estoque', valor: ativoCirculanteAnt.estoque / ativoCirculanteAnt.Ativo },
    { nome: 'ROA', valor: (ativoCirculanteAnt.Ativo + ativoNaoCirculanteAnt.Ativonao) ? (dreAnt.lucroLiquido / (ativoCirculanteAnt.Ativo + ativoNaoCirculanteAnt.Ativonao)) * 100 : 0 },
    { nome: 'ROE', valor: patrimonioAnt ? (dreAnt.lucroLiquido / patrimonioAnt) * 100 : 0 },
    { nome: 'ROI', valor: dreAnt.custo ? ((dreAnt.receita - dreAnt.custo) / dreAnt.custo) * 100 : 0 },
    { nome: 'Grau de Imobilizações', valor: patrimonioAnt ? ativoNaoCirculanteAnt.imobilizado / patrimonioAnt : 0 },
    { nome: 'Total do Ativo', valor: formatarMoeda(ativoCirculanteAnt.Ativo + ativoNaoCirculanteAnt.Ativonao) },
    { nome: 'Total do Passivo', valor: formatarMoeda(passivoCirculanteAnt + passivoNaoCirculanteAnt) },
    { nome: 'EBITDA', valor: formatarMoeda(dreAnt.lucroOperacional + dreAnt.Amortizacao + dreAnt.Depreciacao) }
  ];

  // Logs para conferir os valores no console - ano vigente
  console.log('--- Índices Ano Vigente ---');
  indices.forEach(indice => {
    const valor = typeof indice.valor === 'number'
      ? indice.valor.toFixed(2)
      : indice.valor;
    console.log(`${indice.nome}: ${valor}`);
  });

  // Logs para conferir os valores no console - ano anterior
  console.log('--- Índices Ano Anterior ---');
  indicesAnterior.forEach(indice => {
    const valor = typeof indice.valor === 'number'
      ? indice.valor.toFixed(2)
      : indice.valor;
    console.log(`${indice.nome}: ${valor}`);
  });

  // Função para aplicar cor (se quiser usar, pode adaptar conforme antes)
function aplicarCor(select, avaliacao) {
  select.classList.remove('risco', 'alerta', 'boa', 'excelente');
  switch (avaliacao.toLowerCase()) {
    case 'risco':
      select.classList.add('risco');
      break;
    case 'alerta':
      select.classList.add('alerta');
      break;
    case 'boa':
      select.classList.add('boa');
      break;
    case 'excelente':
      select.classList.add('excelente');
      break;
  }
}

// Ano vigente
indices.forEach((item, index) => {
  const span = document.getElementById(`indice${index + 1}`);
  const select = document.getElementById(`resposta${index + 1}`);
  const avaliacao = avaliarIndice(item.nome, item.valor);

  if (span) {
    let valorFormatado = typeof item.valor === 'number'
      ? item.valor.toFixed(2).replace('.', ',')
      : item.valor;
    span.textContent = `${valorFormatado}`;
  }

  if (select) {
    select.value = avaliacao;
    aplicarCor(select, avaliacao);
    select.disabled = true; // bloqueia para evitar edição manual
  }
});

// Ano anterior
indicesAnterior.forEach((item, index) => {
  const spanAnterior = document.getElementById(`indice${index + 1}-anterior`);
  const selectAnterior = document.getElementById(`resposta${index + 1}-anterior`);
  const avaliacao = avaliarIndice(item.nome, item.valor);

  if (spanAnterior) {
    let valorFormatado = typeof item.valor === 'number'
      ? item.valor.toFixed(2).replace('.', ',')
      : item.valor;
    spanAnterior.textContent = `${valorFormatado} (${avaliacao})`;
  }

  if (selectAnterior) {
    selectAnterior.value = avaliacao;
    aplicarCor(selectAnterior, avaliacao);
    selectAnterior.disabled = true;
  }
});


});
