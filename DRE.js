window.addEventListener('DOMContentLoaded', () => {
  carregarValoresSalvos();

  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      salvarValores();
    });
  });
});

function salvarValores() {
  const dadosDRE = {};
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    dadosDRE[input.name] = input.value;
  });
  localStorage.setItem('DRE', JSON.stringify(dadosDRE));
}

function carregarValoresSalvos() {
  const dadosSalvos = JSON.parse(localStorage.getItem('DRE'));
  if (!dadosSalvos) return;
  for (const chave in dadosSalvos) {
    const input = document.querySelector(`input[name="${chave}"]`);
    if (input) {
      input.value = dadosSalvos[chave];
    }
  }
}
