function calcularOutrosAtivos() {
  const camposBase = [
    'disponivel',
    'estoque',
    'contas',
    'impostos',
    'caixa'
  ];

  function getValor(id) {
    const el = document.getElementById(id);
    // Para input number, valor já vem com ponto decimal
    return el && el.value !== '' ? parseFloat(el.value) : 0;
  }

  function setValor(id, valor) {
    const el = document.getElementById(id);
    if (el) {
      // input number aceita ponto, então não substituí virgula
      el.value = valor.toFixed(2);
    }
  }

  // Pega valor total do ativo circulante vigente e anterior
  const ativoVigente = getValor('ativo_vigente');
  const ativoAnterior = getValor('ativo_anterior');

  // Soma dos campos base (vigente e anterior)
  const somaVigente = camposBase.reduce((acc, nome) => acc + getValor(`${nome}_vigente`), 0);
  const somaAnterior = camposBase.reduce((acc, nome) => acc + getValor(`${nome}_anterior`), 0);

  // Calcula 'outros ativos' = total ativo - soma dos outros campos (não pode ser negativo)
  const outrosVigente = ativoVigente - somaVigente >= 0 ? ativoVigente - somaVigente : 0;
  const outrosAnterior = ativoAnterior - somaAnterior >= 0 ? ativoAnterior - somaAnterior : 0;

  // Atualiza os inputs de 'outros ativos'
  setValor('outros_vigente', outrosVigente);
  setValor('outros_anterior', outrosAnterior);
}

// Salva todos os valores dos inputs no localStorage ao clicar em "Concluído"
document.querySelector('.btn-concluido').addEventListener('click', function (event) {
  event.preventDefault();

  const inputs = document.querySelectorAll('input[type="number"]');
  const dados = {};

  inputs.forEach(input => {
    // Salva o valor do input com vírgula
    dados[input.id] = input.value;
  });

  // Salva no localStorage
  localStorage.setItem('ativoCirculante', JSON.stringify(dados));

  // Redireciona após salvar
  window.location.href = "values.html";
});

// Modal: abrir e fechar
const btnInfo = document.getElementById('btnInfoAtivo');
const modal = document.getElementById('modalInfoAtivo');
const btnClose = document.getElementById('modalCloseBtn');

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

