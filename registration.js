document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne envio real

    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    const grupoCota = document.getElementById('grupoCota').value.trim();
    const ramo = document.getElementById('ramo').value.trim();

    // Salvar no localStorage
    const dadosCliente = {
      nomeCliente: nomeCliente,
      grupoCota: grupoCota,
      ramo: ramo
    };

    localStorage.setItem('cliente', JSON.stringify(dadosCliente));

    // Redirecionar
    window.location.href = 'values.html';
  });
});
