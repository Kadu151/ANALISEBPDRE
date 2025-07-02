function calcularOutrosPassivosNao() {
    const totalVigente = parseFloat(document.querySelector('input[name="total_vigente"]').value) || 0;
    const totalAnterior = parseFloat(document.querySelector('input[name="total_anterior"]').value) || 0;

    const financiamentoVig = parseFloat(document.querySelector('input[name="financiamentolongo_vigente"]').value) || 0;
    const financiamentoAnt = parseFloat(document.querySelector('input[name="financiamentolongo_anterior"]').value) || 0;

    const emprestimoVig = parseFloat(document.querySelector('input[name="emprestimolongo_vigente"]').value) || 0;
    const emprestimoAnt = parseFloat(document.querySelector('input[name="emprestimolongo_anterior"]').value) || 0;

    const impostoVig = parseFloat(document.querySelector('input[name="parcelamentoimposto_vigente"]').value) || 0;
    const impostoAnt = parseFloat(document.querySelector('input[name="parcelamentoimposto_anterior"]').value) || 0;

    const outrosVigente = totalVigente - (financiamentoVig + emprestimoVig + impostoVig);
    const outrosAnterior = totalAnterior - (financiamentoAnt + emprestimoAnt + impostoAnt);

    document.querySelector('input[name="outrospassivosnao_vigente"]').value = outrosVigente.toFixed(2);
    document.querySelector('input[name="outrospassivosnao_anterior"]').value = outrosAnterior.toFixed(2);

    const dados = {
      total_vigente: totalVigente.toFixed(2),
      total_anterior: totalAnterior.toFixed(2),
      financiamentolongo_vigente: financiamentoVig.toFixed(2),
      financiamentolongo_anterior: financiamentoAnt.toFixed(2),
      emprestimolongo_vigente: emprestimoVig.toFixed(2),
      emprestimolongo_anterior: emprestimoAnt.toFixed(2),
      parcelamentoimposto_vigente: impostoVig.toFixed(2),
      parcelamentoimposto_anterior: impostoAnt.toFixed(2),
      outrospassivosnao_vigente: outrosVigente.toFixed(2),
      outrospassivosnao_anterior: outrosAnterior.toFixed(2),
    };

    localStorage.setItem('passivoNaoCirculante', JSON.stringify(dados));
  }

  function carregarValoresSalvos() {
    const dados = JSON.parse(localStorage.getItem('passivoNaoCirculante'));
    if (!dados) return;

    for (const chave in dados) {
      const input = document.querySelector(`input[name="${chave}"]`);
      if (input) input.value = dados[chave];
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    carregarValoresSalvos();
    document.querySelectorAll('input[type="number"]').forEach(input => {
      input.addEventListener('input', calcularOutrosPassivosNao);
    });
  });

  const btnInfoPassivoNao = document.getElementById('btnInfoPassivoNao');
  const modalPassivoNao = document.getElementById('modalInfoPassivoNao');
  const btnClosePassivoNao = document.getElementById('modalCloseBtnPassivoNao');

  btnInfoPassivoNao.addEventListener('click', () => modalPassivoNao.classList.add('active'));
  btnClosePassivoNao.addEventListener('click', () => modalPassivoNao.classList.remove('active'));
  modalPassivoNao.addEventListener('click', e => {
    if (e.target === modalPassivoNao) modalPassivoNao.classList.remove('active');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modalPassivoNao.classList.remove('active');
  });