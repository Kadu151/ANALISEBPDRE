document.addEventListener('DOMContentLoaded', function() {

  function criarGraficoHorizontal(canvasId, labels, dataVigente, dataAnterior) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ano Vigente',
            data: dataVigente,
            backgroundColor: '#1d4ed8'
          },
          {
            label: 'Ano Anterior',
            data: dataAnterior,
            backgroundColor: '#60a5fa'
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 15,
              padding: 10
            }
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  }

  function montarDadosParaGrafico(tabelaId, campos) {
    const dados = JSON.parse(localStorage.getItem(tabelaId));
    const labels = [];
    const vigente = [];
    const anterior = [];

    if (dados) {
      campos.forEach(campo => {
        labels.push(campo.descricao);
        vigente.push(parseFloat(dados[campo.vigente]?.replace(',', '.') || 0));
        anterior.push(parseFloat(dados[campo.anterior]?.replace(',', '.') || 0));
      });
    }

    return { labels, vigente, anterior };
  }

  // Configuração dos campos de cada tabela
  const configuracoes = [
    {
      id: 'ativoCirculante',
      canvas: 'graficoAtivoCirculante',
      campos: [
        { descricao: 'Disponível', vigente: 'disponivel_vigente', anterior: 'disponivel_anterior' },
        { descricao: 'Estoque', vigente: 'estoque_vigente', anterior: 'estoque_anterior' },
        { descricao: 'Contas a Receber', vigente: 'contas_vigente', anterior: 'contas_anterior' },
        { descricao: 'Impostos a Recuperar', vigente: 'impostos_vigente', anterior: 'impostos_anterior' },
        { descricao: 'Caixas e Equivalentes', vigente: 'caixa_vigente', anterior: 'caixa_anterior' },
        { descricao: 'Outros Créditos', vigente: 'outros_vigente', anterior: 'outros_anterior' }
      ]
    },
    {
      id: 'ativoNaoCirculante',
      canvas: 'graficoAtivoNaoCirculante',
      campos: [
        { descricao: 'Imobilizado', vigente: 'imobilizado_vigente', anterior: 'imobilizado_anterior' },
        { descricao: 'Bens móveis', vigente: 'bensmoveis_vigente', anterior: 'bensmoveis_anterior' },
        { descricao: 'Bens imobilizados', vigente: 'bensimobilizados_vigente', anterior: 'bensimobilizados_anterior' },
        { descricao: 'Intangível', vigente: 'intangivel_vigente', anterior: 'intangivel_anterior' },
        { descricao: 'Aplicações Financeiras', vigente: 'aplicacoesfinanceiras_vigente', anterior: 'aplicacoesfinanceiras_anterior' },
        { descricao: 'Outros Ativos', vigente: 'outrosativos_vigente', anterior: 'outrosativos_anterior' }
      ]
    },
    {
      id: 'passivoCirculante',
      canvas: 'graficoPassivoCirculante',
      campos: [
        { descricao: 'Financiamentos', vigente: 'financiamentoemprestimo_vigente', anterior: 'financiamentoemprestimo_anterior' },
        { descricao: 'Fornecedores', vigente: 'fornecedores_vigente', anterior: 'fornecedores_anterior' },
        { descricao: 'Outros', vigente: 'outrospassivos_vigente', anterior: 'outrospassivos_anterior' }
      ]
    },
    {
      id: 'passivoNaoCirculante',
      canvas: 'graficoPassivoNaoCirculante',
      campos: [
        { descricao: 'Financiamento Longo Prazo', vigente: 'financiamentolongo_vigente', anterior: 'financiamentolongo_anterior' },
        { descricao: 'Parcelamento de Imposto', vigente: 'parcelamentoimposto_vigente', anterior: 'parcelamentoimposto_anterior' }
      ]
    },
    {
      id: 'Patrimonio',
      canvas: 'graficoPatrimonio',
      campos: [
        { descricao: 'Capital Social', vigente: 'Capital_vigente', anterior: 'Capital_anterior' },
        { descricao: 'Reserva de Lucros', vigente: 'Reserva_vigente', anterior: 'Reserva_anterior' },
        { descricao: 'Lucros ou Prejuízos', vigente: 'LucrosPrejuizos_vigente', anterior: 'LucrosPrejuizos_anterior' }
      ]
    },
    {
      id: 'DRE',
      canvas: 'graficoDRE',
      campos: [
        { descricao: 'Receita', vigente: 'Receita_vigente', anterior: 'Receita_anterior' },
        { descricao: 'Custo', vigente: 'Custo_vigente', anterior: 'Custo_anterior' },
        { descricao: 'Lucro Operacional', vigente: 'LucroOperacional_vigente', anterior: 'LucroOperacional_anterior' },
        { descricao: 'Lucro Líquido', vigente: 'LucroLiquido_vigente', anterior: 'LucroLiquido_anterior' },
        { descricao: 'Lucro Bruto', vigente: 'LucroBruto_vigente', anterior: 'LucroBruto_anterior' },
        { descricao: 'Receitas Líquidas', vigente: 'ReceitasLiquidas_vigente', anterior: 'ReceitasLiquidas_anterior' },
        { descricao: 'Amortização', vigente: 'Amortizacao_vigente', anterior: 'Amortizacao_anterior' },
        { descricao: 'Depreciação', vigente: 'Depreciacao_vigente', anterior: 'Depreciacao_anterior' }
      ]
    }
  ];

  // Criar os gráficos de cada tabela
  configuracoes.forEach(config => {
    const dados = montarDadosParaGrafico(config.id, config.campos);
    if (dados.labels.length > 0) {
      criarGraficoHorizontal(config.canvas, dados.labels, dados.vigente, dados.anterior);
    }
  });

});
