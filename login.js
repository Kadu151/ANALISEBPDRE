document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  const usuarios = [
    { username: 'admin', password: '36551618', nomeCompleto: 'Kadu' },
    { username: 'cintia.kawakami@unifisa.com.br', password: 'uni001', nomeCompleto: 'Cintia Kawakami' },
    { username: 'maisa.magordo@unifisa.com.br', password: 'uni00', nomeCompleto: 'Maisa Magordo' }
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const usuarioValido = usuarios.find(user => user.username === username && user.password === password);

    if (usuarioValido) {
      localStorage.setItem('usuarioLogado', JSON.stringify({
        username: usuarioValido.username,
        nome: usuarioValido.nomeCompleto
      }));

      alert('Login bem-sucedido!');
      window.location.href = '/front/registration.html';
    } else {
      alert('Usuário ou senha incorretos. Tente novamente.');
    }
  });
});
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === "" || password === "") {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-message').innerText = "Por favor, preencha todos os campos.";
  } else {
    // Aqui você pode fazer o envio real para o backend
    this.submit();
  }
});
