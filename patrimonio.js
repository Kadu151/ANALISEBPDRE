window.addEventListener('DOMContentLoaded', () => {
  carregarValoresSalvos();
  calcularTotal();

  // Adicionar evento a todos inputs do tipo number para recalcular e salvar
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      calcularTotal();
      salvarValores();
    });
  });
});

function calcularTotal() {
  const campos = ['Capital', 'Reserva', 'LucrosPrejuizos'];
  let totalVigente = 0;
  let totalAnterior = 0;

  campos.forEach(campo => {
    const vig = parseFloat(document.querySelector(`input[name="${campo}_vigente"]`).value) || 0;
    const ant = parseFloat(document.querySelector(`input[name="${campo}_anterior"]`).value) || 0;

    totalVigente += vig;
    totalAnterior += ant;
  });

  // Exibe os totais com vírgula para decimal
  document.getElementById('total_vigente').value = totalVigente.toFixed(2).replace('.', ',');
  document.getElementById('total_anterior').value = totalAnterior.toFixed(2).replace('.', ',');
}

function salvarValores() {
  const campos = ['Capital', 'Reserva', 'LucrosPrejuizos'];
  const dados = {};

  campos.forEach(campo => {
    const vig = document.querySelector(`input[name="${campo}_vigente"]`).value;
    const ant = document.querySelector(`input[name="${campo}_anterior"]`).value;

    dados[`${campo}_vigente`] = vig;
    dados[`${campo}_anterior`] = ant;
  });

  dados['total_vigente'] = document.getElementById('total_vigente').value;
  dados['total_anterior'] = document.getElementById('total_anterior').value;

  localStorage.setItem('Patrimonio', JSON.stringify(dados));
}

function carregarValoresSalvos() {
  const dados = JSON.parse(localStorage.getItem('Patrimonio'));
  if (!dados) return;

  Object.keys(dados).forEach(chave => {
    // Os inputs de números aceitam ponto, mas o valor salvo pode ter vírgula
    // Então convertemos vírgula para ponto para preencher corretamente
    const input = document.querySelector(`input[name="${chave}"]`);
    if (input) {
      input.value = dados[chave].replace(',', '.');
    }
  });

  // Atualiza também os totais (que são readonly e texto)
  if (dados.total_vigente) {
    document.getElementById('total_vigente').value = dados.total_vigente;
  }
  if (dados.total_anterior) {
    document.getElementById('total_anterior').value = dados.total_anterior;
  }
}
